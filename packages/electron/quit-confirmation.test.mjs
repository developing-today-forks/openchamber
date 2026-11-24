// #2581: cancelling the macOS quit confirmation left state.quitRequested
// set, so the next window close destroyed the window instead of hiding it,
// and before-quit had already torn the dev tunnels down. These tests pin
// the lifecycle: the dialog outcome settles the quit flags through
// settleQuitConfirmation, tunnel teardown waits for a quit that is really
// happening, and a confirmed quit still exits.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import { settleQuitConfirmation } from './quit-confirmation.mjs';

// The state as before-quit and the dialog leave it while an answer pends.
const pendingQuitState = () => ({
  quitRequested: true,
  quitConfirmationPending: true,
});

test('a confirmed dialog keeps the quit in progress', () => {
  const state = pendingQuitState();
  assert.equal(settleQuitConfirmation(state, 0), 'confirmed');
  assert.equal(state.quitRequested, true);
  assert.equal(state.quitConfirmationPending, false);
});

test('a cancelled dialog restores the pre-quit state', () => {
  const state = pendingQuitState();
  assert.equal(settleQuitConfirmation(state, 1), 'cancelled');
  assert.equal(state.quitRequested, false);
  assert.equal(state.quitConfirmationPending, false);
  // The window close handler gates every hide path on !state.quitRequested
  // (hide to tray, hide the quake window, hide on macOS), so a false flag
  // here is what makes the next close hide again.
  assert.equal(!state.quitRequested, true);
});

test('a dialog that fails to open also restores the pre-quit state', () => {
  const state = pendingQuitState();
  assert.equal(settleQuitConfirmation(state, undefined), 'cancelled');
  assert.equal(state.quitRequested, false);
  assert.equal(state.quitConfirmationPending, false);
});

test('a quit that follows a cancelled quit still confirms', () => {
  const state = pendingQuitState();
  settleQuitConfirmation(state, 1);
  // Second Cmd+Q: before-quit marks the request again and the dialog is
  // shown again; confirming this time keeps the quit in progress.
  state.quitRequested = true;
  state.quitConfirmationPending = true;
  assert.equal(settleQuitConfirmation(state, 0), 'confirmed');
  assert.equal(state.quitRequested, true);
});

// Structural pins on main.mjs, in the spawn-sync-timeouts.test.mjs idiom:
// the transitions above only matter if the wiring uses them.
const mainSource = fs.readFileSync(new URL('./main.mjs', import.meta.url), 'utf8');

const bodyFrom = (anchor) => {
  const start = mainSource.indexOf(anchor);
  assert.notEqual(start, -1, `anchor not found: ${anchor}`);
  const ends = ['\n};', '\n});']
    .map((marker) => mainSource.indexOf(marker, start))
    .filter((index) => index !== -1);
  return mainSource.slice(start, Math.min(...ends));
};

test('the dialog outcome settles through settleQuitConfirmation', () => {
  const body = bodyFrom('const requestQuitWithConfirmation');
  assert.ok(body.includes('settleQuitConfirmation(state, result.response)'));
  assert.ok(body.includes('settleQuitConfirmation(state, undefined)'));
});

test('before-quit leaves the dev tunnels up while a darwin quit awaits confirmation', () => {
  const body = bodyFrom("app.on('before-quit'");
  const branch = body.indexOf('!state.quitConfirmed');
  assert.notEqual(branch, -1);
  const branchReturn = body.indexOf('return;', branch);
  assert.equal(body.slice(branch, branchReturn).includes('closeAllDevTunnels'), false);
  // Teardown still happens on the paths where the quit proceeds.
  assert.notEqual(body.indexOf('closeAllDevTunnels()', branchReturn), -1);
});

test('a confirmed quit closes the dev tunnels', () => {
  const body = bodyFrom('const performConfirmedQuit');
  assert.ok(body.includes('closeAllDevTunnels();'));
});
