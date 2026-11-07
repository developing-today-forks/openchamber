/**
 * Steps the current session back (-1) or forward (+1) through this window's
 * open history. Entries whose session no longer exists in the loaded list are
 * skipped and dropped. Returns false when there is nowhere to go.
 */
export declare const navigateSessionHistory: (delta: -1 | 1) => boolean;
