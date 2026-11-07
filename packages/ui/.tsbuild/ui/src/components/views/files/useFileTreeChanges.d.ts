/**
 * A folder whose last listing had more entries than this is not re-listed on
 * its own: each re-list sends the whole listing again. The refresh button and
 * expanding it still read it.
 */
export declare const AUTO_RELIST_MAX_ENTRIES = 1000;
/**
 * `directories` are the listings under the root that changed; `null` means
 * anything under the root may have changed.
 */
export type FileTreeChangeBatch = {
    directories: string[] | null;
};
type Options = {
    root: string;
    /** The surface is on screen. Batches wait for it, and for the window to be visible. */
    active: boolean;
    /**
     * What happens to changes while `active` is false: `drop` when the surface
     * refreshes itself on reopening anyway, `hold` to receive them on reopening.
     */
    whileInactive: 'drop' | 'hold';
    onChanges: (batch: FileTreeChangeBatch) => void;
};
/**
 * Delivers file changes under `root` (see `lib/fileTreeChanges`) in batches.
 * Nothing runs while no change arrives: no timer, no request.
 */
export declare const useFileTreeChanges: ({ root, active, whileInactive, onChanges }: Options) => void;
export {};
