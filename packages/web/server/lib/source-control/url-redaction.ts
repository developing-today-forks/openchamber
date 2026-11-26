import crypto from 'node:crypto';

import {
  sensitiveAssignmentRegExp,
  sensitiveQuotedValueRegExp,
  sensitiveSchemeValueRegExp,
} from '../shared/redaction-patterns.js';

const scpRemotePattern = /^([^@/:\s]+)@([^:/\s]+):(.+)$/;
const urlPattern = /[a-z][a-z0-9+.-]*:\/\/[^\s<>"']+/gi;

export function isDiskPathRemoteUrl(url: string | null | undefined, platform = process.platform) {
  if (!url) return false;
  if (/^file:\/\//i.test(url) || /^[A-Za-z]:\\/.test(url)) return true;
  if (platform === 'win32' && /^[A-Za-z]:\//.test(url)) return true;
  const colon = url.indexOf(':');
  const slash = url.indexOf('/');
  return colon < 0 || (slash >= 0 && slash < colon);
}

export function redactRemoteUrl(value: string | null | undefined) {
  const remote = String(value || '').trim();
  if (!remote) return '';

  try {
    const url = new URL(remote);
    url.username = '';
    url.password = '';
    url.hostname = url.hostname.toLowerCase();
    url.search = '';
    url.hash = '';
    return url.toString().replace(/\/$/, '');
  } catch {
    if (remote.includes('://')) return '';
    const scpRemote = remote.match(scpRemotePattern);
    if (!scpRemote) return remote.replace(/[?#].*$/, '');
    return `${scpRemote[1]}@${scpRemote[2]?.toLowerCase()}:${scpRemote[3]?.replace(/[?#].*$/, '')}`;
  }
}

export function fingerprintRemoteUrl(value: string | null | undefined) {
  const remote = String(value || '').trim();
  let authority = remote;
  try {
    const url = new URL(remote);
    url.username = '';
    url.password = '';
    url.hostname = url.hostname.toLowerCase();
    authority = url.toString().replace(/\/$/, '');
  } catch {
    const scpRemote = remote.match(scpRemotePattern);
    if (scpRemote) authority = `${scpRemote[1]}@${scpRemote[2]?.toLowerCase()}:${scpRemote[3]}`;
  }
  return crypto.createHash('sha256').update(authority).digest('base64url');
}

// The scheme pattern runs first so 'authorization: Bearer <value>' loses the value,
// not just the scheme word.
export function redactSensitiveText<Value>(value: Value) {
  return String(value || '')
    .replace(urlPattern, (match) => {
      let suffix = '';
      let remote = match;
      while (/[),.;\]}]$/.test(remote)) {
        suffix = remote.slice(-1) + suffix;
        remote = remote.slice(0, -1);
      }
      return `${redactRemoteUrl(remote)}${suffix}`;
    })
    .replace(/([a-z][a-z0-9+.-]*:\/\/)([^\s/@]+)@/gi, '$1')
    .replace(/\b(authorization\s*:\s*(?:bearer|basic))\s+[^\s,;]+/gi, '$1 [redacted]')
    // #2074/#2128: quoted values (JSON/Python-dumped headers/config) — the quote between
    // key and colon defeated both neighbours, and a quoted value must keep
    // its quotes: redact only the credential inside them, preserving the
    // key, separator, scheme word, and JSON structure.
    .replace(sensitiveQuotedValueRegExp(), '$1$2$3[redacted]')
    // #2074: scheme-headed assignment values for any sensitive key
    // (authorization=Bearer <t>, api_key: Bearer <t>) — the plain assignment
    // pattern below refuses bearer/basic-headed values to protect the
    // scheme word, so redact the credential after it explicitly.
    .replace(sensitiveSchemeValueRegExp(), '$1$2 [redacted]')
    .replace(sensitiveAssignmentRegExp(), '$1=[redacted]');
}
