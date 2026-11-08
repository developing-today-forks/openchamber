import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// Conformance for the quota provider manifest (design #1808 phase 1, #1809):
// the web registry and the DOCUMENTATION.md dispatcher table must each equal
// the manifest's present-set for their surface, and every absence must be a
// named exception or an alias record — never a silent omission.

const here = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(here, 'provider-manifest.json'), 'utf8'));

const presentOn = (surface) => [
  ...manifest.providers.filter((provider) => provider.surfaces[surface]).map((provider) => provider.id),
  ...manifest.aliases.filter((alias) => alias.surfaces[surface]).map((alias) => alias.id),
].sort();

const registryIds = () => {
  const source = fs.readFileSync(path.join(here, 'providers/index.js'), 'utf8');
  const block = source.match(/const registry = \{([\s\S]*?)\n\};/);
  expect(block, 'registry block not found in providers/index.js').not.toBeNull();
  const ids = [];
  for (const match of block[1].matchAll(/^ {2}(?:'([a-z0-9-]+)'|([a-z][a-z0-9]*)): \{/gm)) {
    ids.push(match[1] ?? match[2]);
  }
  return ids.sort();
};

const docsTableIds = () => {
  const source = fs.readFileSync(path.join(here, 'DOCUMENTATION.md'), 'utf8');
  const ids = [];
  for (const match of source.matchAll(/^\| `([a-z0-9-]+)` \|/gm)) {
    ids.push(match[1]);
  }
  return [...new Set(ids)].sort();
};

describe('quota provider manifest (web)', () => {
  it('states the five registry-contract rules', () => {
    expect(manifest.contract).toHaveLength(5);
  });

  it('covers every provider id once, with a display name', () => {
    const ids = manifest.providers.map((provider) => provider.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const provider of manifest.providers) {
      expect(provider.name.length).toBeGreaterThan(0);
    }
  });

  it('names an exception for every provider absence', () => {
    for (const provider of manifest.providers) {
      for (const surface of manifest.surfaces) {
        if (!provider.surfaces[surface]) {
          const exception = provider.exceptions?.[surface];
          expect(exception, `${provider.id} is absent from ${surface} with no named exception`).toBeDefined();
          expect(Number.isInteger(exception.issue)).toBe(true);
        }
      }
    }
  });

  it('web registry registrations equal the manifest web surface', () => {
    expect(registryIds()).toEqual(presentOn('web'));
  });

  it('DOCUMENTATION.md dispatcher table equals the manifest docs surface', () => {
    expect(docsTableIds()).toEqual(presentOn('docs'));
  });
});
