import { describe, expect, it, vi } from 'vitest';
import { classifyGiteaFailure, createGiteaClient } from './client.js';
import { fakeGitea, ORIGIN } from './fixtures/fake-fetch.js';

const noDelay = async () => {};

const MiB = 1024 * 1024;
// A body streamed in 64 KiB chunks with no content-length, recording how much
// was pulled and whether the reader cancelled it. Oracle: an over-cap answer
// is refused after pulling little more than the cap, and its stream is
// cancelled instead of drained whole.
const streamedBody = (totalBytes) => {
  const state = { pulled: 0, cancelled: false };
  const chunk = new Uint8Array(64 * 1024).fill(0x61);
  const body = new ReadableStream({
    pull(controller) {
      if (state.pulled >= totalBytes) {
        controller.close();
        return;
      }
      state.pulled += chunk.byteLength;
      controller.enqueue(chunk);
    },
    cancel() {
      state.cancelled = true;
    },
  });
  return { body, state };
};

describe('Gitea client', () => {
  it('sends the token as a token header to the instance API only, never following redirects', async () => {
    const { fetch, calls } = fakeGitea({ 'GET /user': { id: 1, login: 'alice' } });
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch });

    await client.get('/user');

    expect(calls).toHaveLength(1);
    expect(calls[0].url.origin).toBe(ORIGIN);
    expect(calls[0].url.pathname).toBe('/api/v1/user');
    expect(calls[0].headers.authorization).toBe('token pat-1');
    expect(calls[0].redirect).toBe('manual');
  });

  it('refuses a redirect instead of sending the token on to its target', async () => {
    const { fetch, calls } = fakeGitea({
      'GET /user': new Response(null, { status: 302, headers: { location: 'https://elsewhere.example.com/collect' } }),
    });
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch, delay: noDelay });

    await expect(client.get('/user')).rejects.toThrow('redirect');
    expect(calls).toHaveLength(1);
    expect(calls.every((call) => call.url.origin === ORIGIN)).toBe(true);
  });

  it('refuses a path that would leave the instance API before sending anything', async () => {
    const { fetch, calls } = fakeGitea();
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch });

    await expect(client.get('../../user/settings')).rejects.toThrow('leaves the instance API');
    await expect(client.get('repos/%2e%2e/%2e%2e/%2e%2e/admin')).rejects.toThrow('leaves the instance API');
    expect(calls).toHaveLength(0);
    // A protocol-relative path stays a path under the API.
    await client.get('//elsewhere.example.com/collect').catch(() => {});
    expect(calls[0].url.href).toBe(`${ORIGIN}/api/v1/elsewhere.example.com/collect`);
  });

  it('reads a named API namespace on the same origin and keeps every path inside it', async () => {
    const { fetch, calls } = fakeGitea({ 'GET /forgejo/version': { version: '16.0.6+gitea-1.22.0' } });
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch, namespace: 'forgejo' });

    await expect(client.get('/version')).resolves.toMatchObject({ version: '16.0.6+gitea-1.22.0' });
    expect(calls[0].url.pathname).toBe('/api/forgejo/v1/version');
    expect(calls[0].headers.authorization).toBe('token pat-1');
    await expect(client.get('../../user')).rejects.toThrow('leaves the instance API');
    expect(calls).toHaveLength(1);
    expect(() => createGiteaClient({ origin: ORIGIN, fetch, namespace: '../forgejo' })).toThrow('plain API namespace');
  });

  it('retries a read after 502 and 429, but sends a write once', async () => {
    let reads = 0;
    const { fetch, calls } = fakeGitea({
      'GET /user': () => {
        reads += 1;
        if (reads === 1) return new Response('bad gateway', { status: 502 });
        if (reads === 2) return new Response('slow down', { status: 429 });
        return { id: 1, login: 'alice' };
      },
      'POST /repos/team/app/pulls': new Response('bad gateway', { status: 502 }),
    });
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch, delay: noDelay });

    await expect(client.get('/user')).resolves.toMatchObject({ login: 'alice' });
    await expect(client.post('/repos/team/app/pulls', { title: 'x' })).rejects.toMatchObject({ status: 502 });
    expect(calls.filter((call) => call.method === 'POST')).toHaveLength(1);
  });

  it('does not retry a read on other failures and names a refused token', async () => {
    const { fetch, calls } = fakeGitea({ 'GET /user': new Response(JSON.stringify({ message: 'token is required' }), { status: 401 }) });
    const client = createGiteaClient({ origin: ORIGIN, token: 'bad', fetch, delay: noDelay });

    const error = await client.get('/user').catch((failure) => failure);
    expect(error).toMatchObject({ status: 401, kind: 'invalid-token', message: 'token is required' });
    expect(classifyGiteaFailure(error)).toBe('invalid-token');
    expect(calls).toHaveLength(1);
  });

  it('pages by the Link header, else by the total count', async () => {
    const { fetch } = fakeGitea({
      'GET /repos/team/app/branches': (call) => new Response(JSON.stringify([{ name: `b${call.url.searchParams.get('page')}` }]), {
        headers: call.url.searchParams.get('page') === '1'
          ? { link: `<${ORIGIN}/api/v1/repos/team/app/branches?page=2>; rel="next"` }
          : {},
      }),
      'GET /repos/team/app/labels': new Response(JSON.stringify([{ name: 'a' }]), { headers: { 'x-total-count': '3' } }),
    });
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch });

    await expect(client.collection('/repos/team/app/branches')).resolves.toEqual([{ name: 'b1' }, { name: 'b2' }]);
    await expect(client.page('/repos/team/app/labels', {}, { page: 1, limit: 1 })).resolves.toMatchObject({ hasMore: true, total: 3 });
  });

  it('fails a collection past its bound instead of returning part of it', async () => {
    const fetch = vi.fn(async () => new Response(JSON.stringify([{ name: 'x' }]), { headers: { link: '<x>; rel="next"' } }));
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch });

    await expect(client.collection('/repos/team/app/branches', {}, { limit: 1, maxItems: 3, message: 'too many' })).rejects.toThrow('too many');
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it('classifies network failures as unreachable', () => {
    expect(classifyGiteaFailure(Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNREFUSED' } }))).toBe('unreachable');
    expect(classifyGiteaFailure(Object.assign(new Error('aborted'), { name: 'AbortError' }))).toBe('unreachable');
  });
  it.each([
    ['a JSON read', (client) => client.get('/user')],
    ['a text read', (client) => client.text('/repos/team/app/raw/README.md')],
    ['a bytes read', (client) => client.bytes('/repos/team/app/media/logo.png')],
  ])('refuses an over-cap success body on %s without buffering it or retrying', async (_name, read) => {
    const { body, state } = streamedBody(32 * MiB);
    const fetch = vi.fn(async () => new Response(body, { status: 200 }));
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch, delay: noDelay });

    const error = await read(client).catch((failure) => failure);
    expect(error).toMatchObject({ name: 'GiteaRequestError', kind: 'provider-error', status: 200 });
    expect(error.message).toContain('more than');
    expect(classifyGiteaFailure(error)).toBe('provider-error');
    expect(state.cancelled).toBe(true);
    expect(state.pulled).toBeLessThan(17 * MiB);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('keeps the status of a refusal whose error body is over the cap, without its text', async () => {
    const { body, state } = streamedBody(4 * MiB);
    const fetch = vi.fn(async () => new Response(body, { status: 422 }));
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch });

    const error = await client.post('/repos/team/app/pulls', { title: 'x' }).catch((failure) => failure);
    expect(error).toMatchObject({ status: 422, kind: 'provider-error', message: 'Gitea request failed with status 422' });
    expect(state.cancelled).toBe(true);
    expect(state.pulled).toBeLessThan(MiB);
  });

  it('still reads in-cap JSON, text and bytes answers unchanged', async () => {
    const answers = {
      '/api/v1/user': () => new Response('\uFEFF{"login":"alice"}'),
      '/api/v1/repos/team/app/raw/README.md': () => new Response('\uFEFFhello'),
      '/api/v1/repos/team/app/media/logo.png': () => new Response(new Uint8Array([0xef, 0xbb, 0xbf, 1, 2])),
    };
    const fetch = vi.fn(async (url) => answers[new URL(url).pathname]());
    const client = createGiteaClient({ origin: ORIGIN, token: 'pat-1', fetch });

    await expect(client.get('/user')).resolves.toEqual({ login: 'alice' });
    await expect(client.text('/repos/team/app/raw/README.md')).resolves.toBe('hello');
    await expect(client.bytes('/repos/team/app/media/logo.png')).resolves.toEqual(Buffer.from([0xef, 0xbb, 0xbf, 1, 2]));
  });
});
