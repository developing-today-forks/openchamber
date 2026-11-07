/** Pure keyboard navigation shared by list, select, menu, and tabs. No DOM here. */
export type NavigableItem = {
    id: string;
    disabled?: boolean;
};
export type NavigationKey = 'next' | 'previous' | 'first' | 'last';
type KeyLike = {
    key: string;
    ctrlKey: boolean;
};
/** Maps a keyboard event to a navigation step. Ctrl+N / Ctrl+P mirror the arrow keys, as in the host. */
export declare const navigationKey: (event: KeyLike, axis?: 'vertical' | 'horizontal') => NavigationKey | null;
/**
 * Returns the id that `key` lands on from `currentId`, skipping disabled items and
 * stopping at the edges. Returns `null` when nothing is enabled.
 */
export declare const moveListSelection: (items: readonly NavigableItem[], currentId: string | null, key: NavigationKey) => string | null;
export {};
