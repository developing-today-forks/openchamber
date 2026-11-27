import assert from 'node:assert/strict';
import test from 'node:test';

import { parseFocusMainWindowArgs } from './focus-main-window-args.mjs';

test('trims a supported focus route and drops unknown fields', () => {
  assert.deepEqual(parseFocusMainWindowArgs({
    sessionId: '  ses_1  ',
    directory: '\t/workspace\t',
    mode: ' draft ',
    projectId: ' proj-1 ',
    webContentsId: 42,
  }), {
    sessionId: 'ses_1',
    directory: '/workspace',
    mode: 'draft',
    projectId: 'proj-1',
  });
});

test('missing fields select no route', () => {
  assert.deepEqual(parseFocusMainWindowArgs({}), {
    sessionId: '',
    directory: '',
    mode: '',
    projectId: '',
  });
});

test('non-string fields select no route for that field without discarding valid fields', () => {
  assert.deepEqual(parseFocusMainWindowArgs({
    sessionId: ' ses_1 ',
    directory: null,
    mode: ['draft'],
    projectId: ' proj-1 ',
  }), {
    sessionId: 'ses_1',
    directory: '',
    mode: '',
    projectId: 'proj-1',
  });
});

test('whitespace-only fields select no route', () => {
  assert.deepEqual(parseFocusMainWindowArgs({
    sessionId: '   ',
    directory: '\n\t ',
    mode: ' ',
    projectId: '',
  }), {
    sessionId: '',
    directory: '',
    mode: '',
    projectId: '',
  });
});

for (const args of [undefined, null, 0, 'ses_1', [['ses_1']]]) {
  test(`malformed args select no route: ${JSON.stringify(args) ?? String(args)}`, () => {
    assert.deepEqual(parseFocusMainWindowArgs(args), {
      sessionId: '',
      directory: '',
      mode: '',
      projectId: '',
    });
  });
}

test('values other than draft pass through for the domain branch', () => {
  assert.equal(parseFocusMainWindowArgs({ mode: 'session' }).mode, 'session');
});
