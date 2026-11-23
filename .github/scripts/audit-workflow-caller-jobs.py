#!/usr/bin/env python3
"""Audit workflow files for invalid reusable-workflow caller jobs (#1399).

A job that calls a reusable workflow (`uses:` at job level) may only carry
a fixed keyword list; any other key (the classic case: `timeout-minutes`)
makes the whole workflow file invalid, and every run of it fails at
startup with zero jobs. That mistake has broken main twice (#118, #1399),
so this audit runs in CI on workflow changes (workflow-audit.yml).

Caller jobs are also checked for under-granting (#2560): when a caller
job declares `permissions:`, any scope it omits is granted as none, so a
caller narrower than the permissions the called workflow's jobs declare
kills every run at startup the same way (#2554: canary's mobile callers
granted only `contents: write` while mobile-release.yml needs
`actions: read`). For each caller of a local reusable workflow, this
audit computes the union of the called workflow's declared permissions
(its job-level blocks, floored by its top-level block) and fails the
caller when its effective grant does not cover that union.

Full actionlint would catch this too, but repo-wide it also reports
hundreds of unrelated findings (custom runner labels, the concurrency
`queue` key its version predates); this script checks only the caller-job
rules, so its answer is never buried.

Usage: audit-workflow-caller-jobs.py [workflow-file-or-dir ...]
Exit 0 when every caller job is valid, 1 with one line per violation.
"""
import os
import re
import sys

ALLOWED_CALLER_JOB_KEYS = {
    "name",
    "uses",
    "with",
    "secrets",
    "strategy",
    "needs",
    "if",
    "concurrency",
    "permissions",
}

JOB_ID = re.compile(r"^  ([A-Za-z0-9_.-]+):\s*(#.*)?$")
JOB_KEY = re.compile(r"^    ([a-z][a-z0-9-]*):")
PERM_ENTRY = re.compile(r"^([a-z][a-z0-9-]*):\s*(none|read|write)\s*(#.*)?$")

LEVELS = {"none": 0, "read": 1, "write": 2}
LEVEL_NAMES = {0: "none", 1: "read", 2: "write"}

# The scopes GitHub defines for the GITHUB_TOKEN; `read-all` / `write-all`
# expand over this set.
KNOWN_SCOPES = {
    "actions",
    "attestations",
    "checks",
    "contents",
    "deployments",
    "discussions",
    "id-token",
    "issues",
    "models",
    "packages",
    "pages",
    "pull-requests",
    "repository-projects",
    "security-events",
    "statuses",
}


def parse_permissions_value(text):
    """Parse the text after `permissions:` on the same line.

    Returns ("scalar", level) for read-all/write-all, ("map", dict) for a
    flow mapping, or None when the value is a block mapping on following
    lines (or empty).
    """
    text = text.strip()
    if not text:
        return None
    if text in ("read-all", "write-all"):
        return ("scalar", LEVELS[text.split("-")[0]])
    if text.startswith("{"):
        entries = {}
        for part in text.strip("{}").split(","):
            part = part.strip()
            if not part:
                continue
            match = PERM_ENTRY.match(part)
            if match:
                entries[match.group(1)] = LEVELS[match.group(2)]
        return ("map", entries)
    return None


def expand_permissions(parsed, block_entries):
    """Resolve a parsed permissions declaration to a scope -> level dict.

    `parsed` is the same-line value from parse_permissions_value;
    `block_entries` are the following-line mapping entries when the
    declaration is a block. Returns None when nothing is declared.
    """
    if parsed is not None:
        kind, value = parsed
        if kind == "scalar":
            return {scope: value for scope in KNOWN_SCOPES}
        return dict(value)
    if block_entries:
        return dict(block_entries)
    return None


def parse_workflow(path):
    """Parse a workflow file's permission-relevant structure.

    Returns {"top": scope->level dict or None,
             "jobs": {job_id: {"uses": (value, line_no) or None,
                               "permissions": scope->level dict or None}}}
    """
    top = None
    jobs = {}
    state = {
        "in_jobs": False,
        "job_id": None,
        # Open permissions blocks: ("top"|"job", parsed-same-line, entries)
        "perm_block": None,
    }

    def close_perm_block():
        if state["perm_block"] is None:
            return
        where, parsed, entries = state["perm_block"]
        resolved = expand_permissions(parsed, entries)
        if where == "top":
            nonlocal_top[0] = resolved
        elif state["job_id"] is not None:
            jobs[state["job_id"]]["permissions"] = resolved
        state["perm_block"] = None

    nonlocal_top = [None]
    with open(path, encoding="utf-8") as handle:
        lines = handle.readlines()
    for line_no, raw in enumerate(lines, start=1):
        line = raw.rstrip("\n")
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        indent = len(line) - len(line.lstrip(" "))
        if indent == 0:
            close_perm_block()
            state["job_id"] = None
            state["in_jobs"] = stripped.startswith("jobs:")
            if stripped.startswith("permissions:"):
                state["perm_block"] = (
                    "top",
                    parse_permissions_value(stripped[len("permissions:"):]),
                    {},
                )
            continue
        if state["perm_block"] is not None:
            where = state["perm_block"][0]
            entry_indent = 2 if where == "top" else 6
            if indent == entry_indent:
                match = PERM_ENTRY.match(stripped)
                if match:
                    state["perm_block"][2][match.group(1)] = LEVELS[match.group(2)]
                    continue
            close_perm_block()
            # Fall through: this line starts whatever follows the block.
        if not state["in_jobs"]:
            continue
        if indent == 2:
            match = JOB_ID.match(line)
            if match:
                state["job_id"] = match.group(1)
                jobs[state["job_id"]] = {"uses": None, "permissions": None}
            continue
        if indent == 4 and state["job_id"] is not None:
            match = JOB_KEY.match(line)
            if not match:
                continue
            key = match.group(1)
            rest = stripped[len(key) + 1:]
            if key == "uses":
                value = rest.strip().strip("'\"")
                value = value.split(" #")[0].strip()
                jobs[state["job_id"]]["uses"] = (value, line_no)
            elif key == "permissions":
                state["perm_block"] = (
                    "job",
                    parse_permissions_value(rest),
                    {},
                )
    close_perm_block()
    top = nonlocal_top[0]
    return {"top": top, "jobs": jobs}


def audit_file(path):
    findings = []
    state = {"in_jobs": False, "job_id": None, "job_keys": []}

    def flush():
        if state["job_id"] is not None and "uses" in [key for key, _ in state["job_keys"]]:
            for key, line_no in state["job_keys"]:
                if key not in ALLOWED_CALLER_JOB_KEYS:
                    findings.append(
                        f"{path}:{line_no}: job \"{state['job_id']}\" calls a reusable workflow "
                        f"but carries \"{key}\", which caller jobs may not use "
                        f"(allowed: {', '.join(sorted(ALLOWED_CALLER_JOB_KEYS))})"
                    )

    with open(path, encoding="utf-8") as handle:
        lines = handle.readlines()
    for line_no, raw in enumerate(lines, start=1):
        line = raw.rstrip("\n")
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        indent = len(line) - len(line.lstrip(" "))
        if indent == 0:
            flush()
            state["job_id"] = None
            state["job_keys"] = []
            state["in_jobs"] = stripped.startswith("jobs:")
            continue
        if not state["in_jobs"]:
            continue
        if indent == 2:
            match = JOB_ID.match(line)
            if match:
                flush()
                state["job_id"] = match.group(1)
                state["job_keys"] = []
            continue
        if indent == 4 and state["job_id"] is not None:
            match = JOB_KEY.match(line)
            if match:
                state["job_keys"].append((match.group(1), line_no))
    flush()
    return findings


def required_permissions(called):
    """Union of a called workflow's declared permissions.

    Each job contributes its own permissions block, or the workflow's
    top-level block when it declares none; the top-level block also
    floors the union.
    """
    required = {}
    sources = []
    if called["top"]:
        sources.append(called["top"])
    for job in called["jobs"].values():
        if job["permissions"] is not None:
            sources.append(job["permissions"])
        elif called["top"]:
            sources.append(called["top"])
    for source in sources:
        for scope, level in source.items():
            if level > required.get(scope, 0):
                required[scope] = level
    return required


def audit_grants(parsed_by_path):
    """Fail caller jobs whose grant misses a scope the called workflow
    declares (#2560). Callers declaring no permissions anywhere (job or
    workflow level) inherit repository defaults this audit cannot see,
    so they are not judged; called workflows outside the audited set are
    likewise skipped.
    """
    by_basename = {}
    for path in parsed_by_path:
        by_basename.setdefault(os.path.basename(path), path)
    findings = []
    for path, parsed in parsed_by_path.items():
        for job_id, job in parsed["jobs"].items():
            if job["uses"] is None:
                continue
            uses, line_no = job["uses"]
            if not uses.startswith("./"):
                continue
            called_path = by_basename.get(os.path.basename(uses))
            if called_path is None or called_path == path:
                sibling = os.path.join(os.path.dirname(path), os.path.basename(uses))
                if os.path.isfile(sibling):
                    called_path = sibling
                else:
                    continue
            if called_path not in parsed_by_path:
                continue
            grant = job["permissions"] if job["permissions"] is not None else parsed["top"]
            if grant is None:
                continue
            required = required_permissions(parsed_by_path[called_path])
            for scope in sorted(required):
                needed = required[scope]
                granted = grant.get(scope, 0)
                if granted < needed:
                    findings.append(
                        f"{path}:{line_no}: job \"{job_id}\" calls {uses} "
                        f"but grants \"{scope}: {LEVEL_NAMES[granted]}\" "
                        f"while the called workflow requires \"{scope}: {LEVEL_NAMES[needed]}\""
                    )
    return findings


def main(argv):
    roots = argv[1:] or [".github/workflows"]
    files = []
    for root in roots:
        if os.path.isfile(root):
            files.append(root)
        else:
            for name in sorted(os.listdir(root)):
                if name.endswith((".yml", ".yaml")):
                    files.append(os.path.join(root, name))
    findings = []
    for path in files:
        findings.extend(audit_file(path))
    parsed_by_path = {}
    for path in files:
        try:
            parsed_by_path[path] = parse_workflow(path)
        except OSError:
            continue
    findings.extend(audit_grants(parsed_by_path))
    for finding in findings:
        print(finding)
    if findings:
        print(f"audit-workflow-caller-jobs: {len(findings)} invalid caller job(s)", file=sys.stderr)
        return 1
    print(f"audit-workflow-caller-jobs: {len(files)} workflow files, no invalid caller jobs")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
