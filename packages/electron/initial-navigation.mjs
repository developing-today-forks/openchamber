// A window's first navigation starts fire-and-forget: createBrowserWindow
// returns the window synchronously, so no caller remains to await the load.
// navigateWindow only swallows benign aborts; any other loadURL failure
// would otherwise surface as an unhandled rejection, which can terminate
// the Electron main process. Start the navigation here so the rejection is
// always observed and reported, and the window is left in place for the
// user to close or retry from.
export const startInitialNavigation = ({ navigate, browserWindow, url, allowAbort = false, reportFailure }) => {
  const navigation = navigate(browserWindow, url, { allowAbort });
  navigation.catch((error) => {
    try {
      reportFailure?.(error);
    } catch {
      // A failing reporter must not turn a handled load failure back into
      // an unhandled rejection.
    }
  });
  return navigation;
};
