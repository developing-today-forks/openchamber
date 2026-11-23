// Splash colors from a theme update persist fire-and-forget: the
// desktop_set_window_theme handler applies the theme synchronously, so no
// caller remains to await the settings write. mutateSettingsRoot keeps its
// internal chain alive across a failed write so later mutations still flow,
// but the promise it returns still rejects; left unobserved, that rejection
// is unhandled and can terminate the Electron main process on a transient
// filesystem error. Persist through here so the rejection is always
// observed and reported, and the app stays alive.
export const persistSplashColors = ({ mutateSettingsRoot, colors, reportFailure }) => {
  const mutation = mutateSettingsRoot((root) => ({ ...root, desktopSplashColors: colors }));
  mutation.catch((error) => {
    try {
      reportFailure?.(error);
    } catch {
      // A failing reporter must not turn a handled save failure back into
      // an unhandled rejection.
    }
  });
  return mutation;
};
