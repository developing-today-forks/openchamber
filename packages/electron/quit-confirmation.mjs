// Quit-confirmation lifecycle transitions for the Electron main process.
//
// main.mjs owns the Electron wiring (before-quit, the dialog, the window
// close handler); the state transitions live here so the lifecycle can be
// pinned by tests. The bug they guard against (#2581): before-quit marks
// the quit as requested, and the macOS confirmation dialog used to settle
// only its own pending flag, so cancelling left quitRequested set — the
// next window close destroyed the window instead of hiding it.

// Settles the quit confirmation dialog against the quit state.
// `response` is the dialog's button index: 0 is Quit; anything else
// (Cancel, dismissal, or undefined when the dialog itself failed) means
// the quit is abandoned and the pre-quit state is restored, so window
// closes hide exactly as they did before the quit was requested.
// Returns 'confirmed' or 'cancelled'.
export const settleQuitConfirmation = (state, response) => {
  state.quitConfirmationPending = false;
  if (response === 0) {
    return 'confirmed';
  }
  state.quitRequested = false;
  return 'cancelled';
};
