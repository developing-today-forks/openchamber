import type { Agent, Model, Provider } from '@/lib/opencode/model';
/**
 * Last known provider/model and agent catalogs, per runtime and config
 * directory, so the model and agent pickers render at once on the next start
 * while OpenCode is still starting. The stored catalog is display continuity
 * only: the live load always revalidates it, and nothing destructive ever
 * reads it.
 *
 * IndexedDB rather than localStorage: VS Code gives every OpenChamber webview
 * one origin, and a localStorage write reaches every webview in every window
 * as a StorageEvent carrying the old and new value. IndexedDB fires none.
 *
 * Only what the pickers and the composer show is stored. Provider, model and
 * variant `settings`/`headers`/`body` and an agent's request carry API keys and
 * authorization headers, and an agent's system prompt is user content; none of
 * them is ever written. Records are built field by field from an allowlist and
 * read back through strict schemas, so a record holding anything else is
 * dropped.
 */
export type CachedProvider = Provider & {
    models: Model[];
};
export type CachedCatalog = {
    providers?: CachedProvider[];
    defaultProviders?: Record<string, string>;
    agents?: Agent[];
};
/** Bump when the stored provider, model or agent shape changes; older records are dropped. */
export declare const CATALOG_CACHE_SCHEMA = 2;
/** Directories kept across all runtimes; the least recently saved go first. */
export declare const CATALOG_CACHE_MAX_RECORDS = 24;
/**
 * The cached catalog for a runtime and directory; null when there is none,
 * IndexedDB is unavailable, or the record is corrupt (corrupt records are
 * deleted).
 */
export declare const readCachedCatalog: (runtimeKey: string, directoryKey: string) => Promise<CachedCatalog | null>;
/**
 * Stores the part of a catalog a live load just produced, keeping the other
 * part of the record. Callers write only authoritative, non-empty catalogs.
 */
export declare const writeCachedCatalog: (runtimeKey: string, directoryKey: string, update: CachedCatalog) => Promise<void>;
/**
 * How long a loaded catalog must go without a newer catalog event before it is
 * stored. OpenCode announces a starting location's full catalog about two
 * seconds after its first, partial answer.
 */
export declare const CATALOG_PERSIST_SETTLE_MS = 3000;
/**
 * Stores a loaded catalog after the settle delay, unless `isSuperseded` says a
 * newer load replaces it by then (a catalog event, a runtime switch).
 */
export declare const writeCachedCatalogWhenSettled: (runtimeKey: string, directoryKey: string, update: CachedCatalog, isSuperseded: () => boolean, schedule?: (callback: () => void, delayMs: number) => void) => void;
/**
 * Whether a freshly loaded catalog may replace one shown from the cache on
 * its first load. A location OpenCode is still starting answers empty, then
 * partial (no plugin providers or agents), and complete about two seconds
 * later; a first answer with fewer entries than the cache is held back once
 * and re-read, and the re-read replaces the cache whatever it holds.
 */
export declare const shouldHoldFirstLoadAgainstCache: (cachedCount: number, loadedCount: number) => boolean;
export declare const resetCatalogCacheForTests: () => void;
