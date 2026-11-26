import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { clearLinearAuth, setLinearAuth, setLinearSessionCommentsEnabled } from './auth.js';
import { setStoredLinearMapping } from './mapping.js';
import { postLinearSessionStatus } from './status.js';

const makeTempDir = () => fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-linear-tmp-mode-'));

const jsonResponse = (payload, status = 200) => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

const issueNode = {
  id: 'issue-uuid-1',
  identifier: 'ENG-12',
  title: 'Broken login',
  url: 'https://linear.app/openchamber/issue/ENG-12',
  state: { name: 'In Progress', type: 'started' },
  assignee: null,
  team: { id: 'team-eng', key: 'ENG', name: 'Engineering' },
  description: null,
  comments: { nodes: [] },
};

function stubLinearGraphql() {
  return vi.fn(async (_url, options) => {
    const body = JSON.parse(options.body);
    if (body.query.includes('query GetLinearIssue')) {
      return jsonResponse({ data: { issue: issueNode } });
    }
    if (body.query.includes('mutation CommentCreate')) {
      return jsonResponse({
        data: { commentCreate: { success: true, comment: { id: 'comment-1' } } },
      });
    }
    throw new Error(`unexpected query: ${body.query}`);
  });
}

// Capture every fs.writeFileSync call made to a `.tmp` path while fn runs,
// so the test can assert the mode passed at creation time (issue #2614:
// the temp file must be created 0600, not chmodded down from the umask
// default after the token payload is already on disk).
async function captureTmpWrites(fn) {
  const spy = vi.spyOn(fs, 'writeFileSync');
  try {
    await fn();
    return spy.mock.calls.filter(([target]) => String(target).endsWith('.tmp'));
  } finally {
    spy.mockRestore();
  }
}

function expectAllTmpWritesPrivate(calls) {
  expect(calls.length).toBeGreaterThan(0);
  for (const [, , options] of calls) {
    expect(options).toMatchObject({ mode: 0o600 });
  }
}

describe('Linear writers create temp files with mode 0600', () => {
  let dataDir;
  let previousDataDir;
  let previousPort;

  beforeEach(() => {
    previousDataDir = process.env.OPENCHAMBER_DATA_DIR;
    previousPort = process.env.OPENCHAMBER_PORT;
    dataDir = makeTempDir();
    process.env.OPENCHAMBER_DATA_DIR = dataDir;
    process.env.OPENCHAMBER_PORT = '3001';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    try {
      clearLinearAuth();
    } catch {
      void 0;
    }
    if (previousDataDir === undefined) {
      delete process.env.OPENCHAMBER_DATA_DIR;
    } else {
      process.env.OPENCHAMBER_DATA_DIR = previousDataDir;
    }
    if (previousPort === undefined) {
      delete process.env.OPENCHAMBER_PORT;
    } else {
      process.env.OPENCHAMBER_PORT = previousPort;
    }
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  it('auth writer passes mode 0600 when creating its temp file', async () => {
    const calls = await captureTmpWrites(async () => {
      setLinearAuth({
        accessToken: 'access-1',
        refreshToken: 'refresh-1',
        expiresAt: Date.now() + 60_000,
      });
    });
    expectAllTmpWritesPrivate(calls);
  });

  it('mapping writer passes mode 0600 when creating its temp file', async () => {
    const calls = await captureTmpWrites(async () => {
      setStoredLinearMapping({
        defaultProjectPath: '/Users/ada/openchamber',
        teamProjectPaths: {},
      });
    });
    expectAllTmpWritesPrivate(calls);
  });

  it('status writer passes mode 0600 when creating its temp file', async () => {
    setLinearAuth({
      accessToken: 'access-1',
      refreshToken: 'refresh-1',
      tokenType: 'Bearer',
      expiresAt: Date.now() + 86_400_000,
      scope: 'read,write,comments:create',
    });
    setLinearSessionCommentsEnabled(true);
    vi.stubGlobal('fetch', stubLinearGraphql());
    const calls = await captureTmpWrites(async () => {
      await postLinearSessionStatus({
        kind: 'started',
        sessionId: 'ses_1',
        issueIdentifier: 'ENG-12',
        sessionOrigin: 'https://app.example.com',
      });
    });
    expectAllTmpWritesPrivate(calls);
  });
});
