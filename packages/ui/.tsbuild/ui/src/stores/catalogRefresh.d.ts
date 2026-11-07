/**
 * Re-reads the Settings-facing lists after OpenCode rebuilt a catalog.
 *
 * OpenCode v2 watches its own config files and publishes what it rebuilt, so a
 * file written by OpenChamber, by the user's editor, or by another client all
 * arrive the same way. The sync layer refreshes its own slices; this module
 * refreshes the stores the Settings pages and the composer read, so an agent
 * added on disk shows up in the list without anyone pressing a button.
 *
 * Every refresh is best-effort: a failed list leaves the previous one in place
 * and the next event or a page visit re-reads it.
 */
import type { CatalogKind } from "@/lib/opencode/events";
/** The lists a catalog kind invalidates, in the order they are re-read. */
export declare function catalogRefreshTasks(kind: CatalogKind, eventDirectories?: readonly string[]): Array<() => Promise<void>>;
export declare function refreshStoresForCatalogKind(kind: CatalogKind, eventDirectories?: readonly string[]): Promise<void>;
