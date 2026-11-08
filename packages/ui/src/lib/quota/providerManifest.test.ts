import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';

// Conformance for the quota provider manifest (design #1808 phase 1, #1809):
// the UI catalog and the QuotaProviderId type union must each equal the
// manifest's present-set for their surface, and every absence must be a
// named exception or an alias record — never a silent omission.

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
  fs.readFileSync(new URL('../../../../web/server/lib/quota/provider-manifest.json', import.meta.url), 'utf8'),
);

const presentOn = (surface: string): string[] =>
  [
    ...manifest.providers.filter((provider) => provider.surfaces[surface]).map((provider) => provider.id),
    ...manifest.aliases.filter((alias) => alias.surfaces[surface]).map((alias) => alias.id),
  ].sort();

const catalogIds = (): string[] => {
  const source = fs.readFileSync(new URL('./providers/index.ts', import.meta.url), 'utf8');
  const ids: string[] = [];
  for (const match of source.matchAll(/\{ id: '([a-z0-9-]+)', name:/g)) {
    ids.push(match[1]);
  }
  return ids.sort();
};

const unionIds = (): string[] => {
  const source = fs.readFileSync(new URL('../../types/quota.ts', import.meta.url), 'utf8');
  const start = source.indexOf('export type QuotaProviderId =');
  expect(start).toBeGreaterThan(-1);
  const end = source.indexOf(';', start);
  const ids: string[] = [];
  for (const match of source.slice(start, end).matchAll(/'([a-z0-9-]+)'/g)) {
    ids.push(match[1]);
  }
  return ids.sort();
};

describe('quota provider manifest (ui)', () => {
  test('names an exception for every provider absence', () => {
    for (const provider of manifest.providers) {
      for (const surface of manifest.surfaces) {
        if (!provider.surfaces[surface]) {
          const exception = provider.exceptions?.[surface];
          if (!exception) {
            throw new Error(`${provider.id} is absent from ${surface} with no named exception`);
          }
          expect(Number.isInteger(exception.issue)).toBe(true);
        }
      }
    }
  });

  test('QUOTA_PROVIDERS catalog equals the manifest ui_catalog surface', () => {
    expect(catalogIds()).toEqual(presentOn('ui_catalog'));
  });

  test('QuotaProviderId union equals the manifest ui_union surface', () => {
    expect(unionIds()).toEqual(presentOn('ui_union'));
  });
});
