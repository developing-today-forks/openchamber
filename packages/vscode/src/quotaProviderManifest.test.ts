import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Conformance for the quota provider manifest (design #1808, phase 1 #1809):
// the VS Code dispatch switch and the listConfiguredQuotaProviders configured
// set are surfaces of the one logical provider set the manifest states (the
// canonical file lives with the web quota module; this test reads it from
// the repo tree by relative path). A provider that appears in a list but not
// the manifest fails, and so does a manifest provider silently absent from a
// list - a surface absence is only ever a named exception in the manifest,
// never a silent one (contract rule 2).

const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  fs.readFileSync(path.join(here, '../../web/server/lib/quota/provider-manifest.json'), 'utf8')
);
const source = fs.readFileSync(path.join(here, 'quotaProviders.ts'), 'utf8');

const expectedFor = (surface: string) => new Set<string>(
  [...manifest.providers, ...manifest.aliases]
    .filter((row: { surfaces: Record<string, boolean> }) => row.surfaces[surface])
    .map((row: { id: string }) => row.id)
);

const dispatchIds = () => {
  const start = source.indexOf('switch (providerId)');
  assert.notEqual(start, -1, 'dispatch switch not found');
  const window = source.slice(start, start + 12000);
  const body = window.slice(0, window.indexOf('default:'));
  return new Set([...body.matchAll(/case\s+'([^']+)'/g)].map((match) => match[1]));
};

const configuredIds = () => {
  const start = source.indexOf('export const listConfiguredQuotaProviders');
  assert.notEqual(start, -1, 'listConfiguredQuotaProviders not found');
  const rest = source.slice(start);
  const end = rest.indexOf('\nexport const ', 10);
  const body = end === -1 ? rest : rest.slice(0, end);
  return new Set([...body.matchAll(/configured\.add\('([^']+)'\)/g)].map((match) => match[1]));
};

describe('quota provider manifest (vscode)', () => {
  it('the dispatch switch is exactly the manifest vscode_dispatch surface', () => {
    assert.deepEqual(dispatchIds(), expectedFor('vscode_dispatch'));
  });

  it('the configured set is exactly the manifest vscode_configured surface', () => {
    assert.deepEqual(configuredIds(), expectedFor('vscode_configured'));
  });

  it('dispatch and configured sets agree with each other', () => {
    assert.deepEqual(dispatchIds(), configuredIds());
  });
});
