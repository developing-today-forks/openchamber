import assert from 'node:assert/strict';
import test from 'node:test';

import {
  parseFileOpenWithAppRequest,
  parseProjectOpenWithAppRequest,
} from './path-open-utils.mjs';

test('open-with-app requests keep the required-field errors for absent input', () => {
  assert.throws(() => parseProjectOpenWithAppRequest(), {
    message: 'Project path, app id, and app name are required',
  });
  assert.throws(() => parseFileOpenWithAppRequest(), {
    message: 'File path, app id, and app name are required',
  });
});

test('open-with-app requests reject malformed fields through the same required-field errors', () => {
  assert.throws(() => parseProjectOpenWithAppRequest({
    projectPath: 7,
    appId: null,
    appName: false,
  }), {
    message: 'Project path, app id, and app name are required',
  });
  assert.throws(() => parseFileOpenWithAppRequest({
    filePath: null,
    appId: 'vscode',
    appName: 'Visual Studio Code',
  }), {
    message: 'File path, app id, and app name are required',
  });
});

test('open-with-app requests trim paths and names and lowercase app ids', () => {
  assert.deepEqual(parseProjectOpenWithAppRequest({
    projectPath: ' /projects/example ',
    filePath: '/ignored/file.txt',
    appId: ' VSCode ',
    appName: ' Visual Studio Code ',
  }), {
    path: '/projects/example',
    appId: 'vscode',
    appName: 'Visual Studio Code',
  });
  assert.deepEqual(parseFileOpenWithAppRequest({
    projectPath: '/ignored/project',
    filePath: ' /projects/example/src/main.ts ',
    appId: ' VSCODE ',
    appName: ' Visual Studio Code ',
  }), {
    path: '/projects/example/src/main.ts',
    appId: 'vscode',
    appName: 'Visual Studio Code',
  });
});
