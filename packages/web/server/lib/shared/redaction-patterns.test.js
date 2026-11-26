import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { redactGitText } from '../git/redaction.js';
import { redactSensitiveText } from '../source-control/url-redaction.js';
import { SENSITIVE_TEXT_KEY_PATTERN } from './redaction-patterns.js';

// Convergence pin (#2592): the two redaction surfaces share one key set via
// redaction-patterns.js. Expanding the alternation must reproduce this exact
// list; adding or removing a key is a deliberate act that updates both the
// list here and the behaviour assertions below.
const expandAlternative = (alternative) =>
  alternative.includes('[-_]')
    ? [alternative.replace('[-_]', '_'), alternative.replace('[-_]', '-')]
    : [alternative];

const PROBE_KEYS = SENSITIVE_TEXT_KEY_PATTERN.split('|').flatMap(expandAlternative).sort();

describe('shared redaction key set (#2592)', () => {
  it('pins the converged key set', () => {
    expect(PROBE_KEYS).toEqual([
      'access-token',
      'access_token',
      'api-key',
      'api_key',
      'authorization',
      'client-secret',
      'client_secret',
      'oauth-token',
      'oauth_token',
      'password',
      'private-token',
      'private_token',
      'secret',
      'token',
      'x-api-key',
    ]);
  });

  it.each(PROBE_KEYS)('both surfaces redact plain, quoted and scheme-headed %s', (key) => {
    const secret = `SECRET-${key}`;
    for (const input of [`${key}=${secret}`, `"${key}": "${secret}"`, `${key}=Bearer ${secret}`]) {
      for (const redact of [redactSensitiveText, redactGitText]) {
        const output = redact(input);
        expect(output).not.toContain(secret);
        expect(output).toContain('[redacted]');
      }
    }
  });

  it('both redactors consume the shared module with no local pattern copy', () => {
    for (const source of ['../git/redaction.ts', '../source-control/url-redaction.ts']) {
      const text = readFileSync(new URL(source, import.meta.url), 'utf8');
      expect(text).toContain('shared/redaction-patterns.js');
      expect(text).not.toContain('SENSITIVE_TEXT_KEY_PATTERN =');
      expect(text).not.toContain('sensitiveKeyPattern =');
    }
  });
});
