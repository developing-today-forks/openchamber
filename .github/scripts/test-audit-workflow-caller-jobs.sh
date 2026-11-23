#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
audit="$script_dir/audit-workflow-caller-jobs.py"
tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

# A caller job carrying timeout-minutes is the #1399 failure itself.
cat >"$tmp_dir/bad.yml" <<'YAML'
name: bad
on: push
jobs:
  call:
    uses: ./.github/workflows/other.yml
    timeout-minutes: 5
YAML

# A caller job with only allowed keys, beside an ordinary job that may
# carry anything, is valid.
cat >"$tmp_dir/good.yml" <<'YAML'
name: good
on: push
jobs:
  call:
    name: Call it
    uses: ./.github/workflows/other.yml
    needs: [prep]
    if: github.ref == 'refs/heads/main'
    permissions: { contents: read }
    secrets: inherit
    with: { flag: true }
  plain:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - run: echo ok
YAML

if python3 "$audit" "$tmp_dir/bad.yml" >"$tmp_dir/bad.out" 2>&1; then
  echo "expected the audit to fail on bad.yml" >&2
  exit 1
fi
grep -q 'job "call"' "$tmp_dir/bad.out"
grep -q '"timeout-minutes"' "$tmp_dir/bad.out"

python3 "$audit" "$tmp_dir/good.yml" >/dev/null

# A reusable workflow whose jobs declare actions: read and contents: write
# between them (#2560): the union a caller must cover.
mkdir -p "$tmp_dir/under" "$tmp_dir/over"
for dir in under over; do
  cat >"$tmp_dir/$dir/called.yml" <<'YAML'
name: called
on: workflow_call
jobs:
  gate:
    permissions:
      actions: read
      contents: read
    runs-on: ubuntu-latest
    steps:
      - run: echo ok
  publish:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - run: echo ok
YAML
done

# A caller granting only contents: write under-grants: the called
# workflow also requires actions: read (the #2554 failure shape).
cat >"$tmp_dir/under/under.yml" <<'YAML'
name: under
on: push
jobs:
  call:
    uses: ./.github/workflows/called.yml
    permissions:
      contents: write
YAML

if python3 "$audit" "$tmp_dir/under" >"$tmp_dir/under.out" 2>&1; then
  echo "expected the audit to fail on the under-granting caller" >&2
  exit 1
fi
grep -q 'job "call"' "$tmp_dir/under.out"
grep -q '"actions: none"' "$tmp_dir/under.out"
grep -q '"actions: read"' "$tmp_dir/under.out"

# A caller whose grant covers the called workflow's union passes.
cat >"$tmp_dir/over/covering.yml" <<'YAML'
name: over
on: push
jobs:
  call:
    uses: ./.github/workflows/called.yml
    permissions:
      actions: read
      contents: write
YAML

python3 "$audit" "$tmp_dir/over" >/dev/null
echo "test-audit-workflow-caller-jobs: ok"
