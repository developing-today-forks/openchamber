import assert from 'node:assert/strict';
import fs from 'node:fs';
import { describe, it } from 'node:test';

// Conformance for the quota provider manifest (design #1808 phase 1, #1809):
// the VS Code dispatch cases and the listConfiguredQuotaProviders configured
// set must each equal the manifest's present-set for their surface, and
// every absence must be a named exception or an alias record.

interface ManifestException {
  issue: number;
  reason: string;
}

interface ManifestEntry {
  id: string;
  name: string;
  surfaces: { [surface: string]: boolean };
  exceptions?: { [surface: string]: ManifestException };
}

interface Manifest {
  contract: string[];
  surfaces: string[];
  providers: ManifestEntry[];
  aliases: ManifestEntry[];
}

const manifest: Manifest = JSON.parse(
  fs.readFileSync(new URL('../../web/server/lib/quota/provider-manifest.json', import.meta.url), 'utf8'),
);

const source = fs.readFileSync(new URL('./quotaProviders.ts', import.meta.url), 'utf8');

const presentOn = (surface: string): string[] =>
  [
    ...manifest.providers.filter((provider) => provider.surfaces[surface]).map((provider) => provider.id),
    ...manifest.aliases.filter((alias) => alias.surfaces[surface]).map((alias) => alias.id),
  ].sort();

const dispatchIds = (): string[] => {
  const ids = new Set<string>();
  for (const match of source.matchAll(/case '([a-z0-9-]+)':/g)) {
    ids.add(match[1]);
  }
  return [...ids].sort();
};

const configuredIds = (): string[] => {
  const start = source.indexOf('export const listConfiguredQuotaProviders');
  assert.notEqual(start, -1, 'listConfiguredQuotaProviders not found');
  const rest = source.slice(start);
  const end = rest.indexOf('\nexport const', 1);
  const body = end === -1 ? rest : rest.slice(0, end);
  const ids = new Set<string>();
  for (const match of body.matchAll(/configured\.add\('([a-z0-9-]+)'\)/g)) {
    ids.add(match[1]);
  }
  return [...ids].sort();
};

describe('quota provider manifest (vscode)', () => {
  it('names an exception for every provider absence', () => {
    for (const provider of manifest.providers) {
      for (const surface of manifest.surfaces) {
        if (!provider.surfaces[surface]) {
          const exception = provider.exceptions?.[surface];
          assert.ok(exception, `${provider.id} is absent from ${surface} with no named exception`);
          assert.ok(Number.isInteger(exception.issue));
        }
      }
    }
  });

  it('dispatch cases equal the manifest vscode_dispatch surface', () => {
    assert.deepEqual(dispatchIds(), presentOn('vscode_dispatch'));
  });

  it('configured set equals the manifest vscode_configured surface', () => {
    assert.deepEqual(configuredIds(), presentOn('vscode_configured'));
  });
});
