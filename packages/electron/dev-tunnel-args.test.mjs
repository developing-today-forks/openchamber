import assert from 'node:assert/strict';
import test from 'node:test';

import { parseDevTunnelCloseArgs, parseDevTunnelOpenArgs } from './dev-tunnel-args.mjs';

test('supported relay open keeps trimmed fields and the space id', () => {
  assert.deepEqual(parseDevTunnelOpenArgs({
    baseUrl: '  https://tunnel.example  ',
    port: 8080,
    spaceId: 'abcdef123456',
    relay: true,
    targetKey: '  key-1  ',
  }), {
    baseUrl: 'https://tunnel.example',
    port: 8080,
    spaceId: 'abcdef123456',
    relay: true,
    targetKey: 'key-1',
    headers: {},
  });
});

test('supported direct open copies string headers and adds the bearer token', () => {
  assert.deepEqual(parseDevTunnelOpenArgs({
    baseUrl: 'https://tunnel.example',
    port: 8080,
    requestHeaders: { 'x-team': 'a', 'x-empty': '', 'x-count': 3, 'x-list': ['a'] },
    clientToken: 'tok-1',
  }), {
    baseUrl: 'https://tunnel.example',
    port: 8080,
    spaceId: null,
    relay: false,
    targetKey: '',
    headers: { 'x-team': 'a', Authorization: 'Bearer tok-1' },
  });
});

test('absent baseUrl throws before any other check', () => {
  assert.throws(() => parseDevTunnelOpenArgs({ port: 8080 }), /baseUrl is required/);
});

test('whitespace-only baseUrl throws', () => {
  assert.throws(() => parseDevTunnelOpenArgs({ baseUrl: '   ', port: 8080 }), /baseUrl is required/);
});

test('non-string baseUrl throws', () => {
  for (const baseUrl of [8080, null, ['https://tunnel.example']]) {
    assert.throws(() => parseDevTunnelOpenArgs({ baseUrl, port: 8080 }), /baseUrl is required/);
  }
});

test('fractional ports truncate toward the open range', () => {
  assert.equal(parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port: 8080.9 }).port, 8080);
});

test('ports outside 1-65535 throw, whatever their representation', () => {
  for (const port of [0, -1, 65536, Number.NaN, Number.POSITIVE_INFINITY, '8080', null]) {
    assert.throws(
      () => parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port }),
      /A valid port is required/,
    );
  }
});

test('space id absent selects null, invalid selects the space error', () => {
  assert.equal(parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port: 8080 }).spaceId, null);
  assert.equal(parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port: 8080, spaceId: null }).spaceId, null);
  assert.throws(
    () => parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port: 8080, spaceId: 'nope' }),
    /A valid space id is required/,
  );
  assert.throws(
    () => parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port: 8080, spaceId: 7 }),
    /A valid space id is required/,
  );
});

test('malformed args throw the baseUrl error', () => {
  for (const args of [undefined, null, 0, 'https://tunnel.example', [['https://tunnel.example']]]) {
    assert.throws(() => parseDevTunnelOpenArgs(args), /baseUrl is required/);
  }
});

test('malformed headers select no headers without discarding the open', () => {
  for (const requestHeaders of [undefined, null, 'x-team=a', 7, ['x-team']]) {
    assert.deepEqual(
      parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port: 8080, requestHeaders }).headers,
      {},
    );
  }
});

test('absent or non-string tokens send no authorization header', () => {
  for (const clientToken of [undefined, null, '', 7, ['tok-1']]) {
    assert.deepEqual(
      parseDevTunnelOpenArgs({ baseUrl: 'https://tunnel.example', port: 8080, clientToken }).headers,
      {},
    );
  }
});

test('supported close keeps trimmed fields and the space id', () => {
  assert.deepEqual(parseDevTunnelCloseArgs({
    baseUrl: '  https://tunnel.example  ',
    port: 8080,
    spaceId: 'abcdef123456',
  }), {
    baseUrl: 'https://tunnel.example',
    port: 8080,
    spaceId: 'abcdef123456',
  });
});

test('close keeps the looser greater-than-zero port check', () => {
  assert.equal(parseDevTunnelCloseArgs({ baseUrl: 'https://tunnel.example', port: 70000 }).port, 70000);
  assert.equal(parseDevTunnelCloseArgs({ baseUrl: 'https://tunnel.example', port: 0 }), null);
  assert.equal(parseDevTunnelCloseArgs({ baseUrl: '', port: 8080 }), null);
});

test('close maps an invalid space id to null instead of throwing', () => {
  assert.deepEqual(parseDevTunnelCloseArgs({ baseUrl: 'https://tunnel.example', port: 8080, spaceId: 'nope' }), {
    baseUrl: 'https://tunnel.example',
    port: 8080,
    spaceId: null,
  });
});

test('malformed close args select no close', () => {
  for (const args of [undefined, null, 0, 'https://tunnel.example']) {
    assert.equal(parseDevTunnelCloseArgs(args), null);
  }
});
