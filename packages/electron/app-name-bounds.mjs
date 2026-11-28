// Bounds for renderer-controlled installed-app name lists (#2722).
//
// The desktop_filter_installed_apps / desktop_fetch_app_icons /
// desktop_get_installed_apps IPC handlers take an `apps` array straight
// from the renderer. Without bounds, one call could force the main
// process to scan thousands of names — each miss can spawn subprocesses
// (mdfind / where.exe / PowerShell / sips) or walk the filesystem — and a
// single megabyte-long name would flow into path joins, subprocess args,
// and mkdtemp prefixes. Sibling IPC already bounds analogous inputs
// (tray-menu slice caps, SSE seed caps); these are the shared bounds for
// the installed-apps surface. Keep the values in sync with the UI: the
// app picker works at UI scale, so 100 names is generous.

// At most this many app names are probed per request; extra names are
// truncated, never processed.
export const MAX_INSTALLED_APP_NAMES = 100;

// A name longer than this is not a plausible app name; the entry is
// skipped before it can reach a path join or a subprocess argument.
export const MAX_APP_NAME_LENGTH = 128;

// How many per-name probes (e.g. macOS mdfind lookups) may run at once.
export const INSTALLED_APP_PROBE_CONCURRENCY = 8;

// Normalize a renderer-supplied apps list: non-arrays become [], entries
// are stringified and trimmed, empty and over-length entries are skipped,
// duplicates are dropped, and the result is capped at
// MAX_INSTALLED_APP_NAMES.
export const boundedAppNames = (apps) => {
  if (!Array.isArray(apps)) return [];
  const seen = new Set();
  const names = [];
  for (const raw of apps) {
    const name = String(raw || '').trim();
    if (!name || name.length > MAX_APP_NAME_LENGTH || seen.has(name)) continue;
    seen.add(name);
    names.push(name);
    if (names.length >= MAX_INSTALLED_APP_NAMES) break;
  }
  return names;
};

// Promise.all with a bounded number of workers: at most `limit` calls to
// `fn` are in flight at once, and results keep input order.
export const mapWithConcurrency = async (items, limit, fn) => {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.max(1, Math.min(limit, items.length));
  const workers = Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
};
