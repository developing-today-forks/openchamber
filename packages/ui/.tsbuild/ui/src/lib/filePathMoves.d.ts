/**
 * Lets an open editor follow its file through a move or rename.
 *
 * The editor holds unsaved edits for one path. A move has two moments that
 * matter to it: while the rename request is in flight a save would write the
 * old path and recreate the file there, and once the move lands the editor
 * must adopt the new path instead of re-reading the file (which would drop the
 * draft). Paths are normalized workspace paths with forward slashes and no
 * trailing slash.
 */
type FilePathMoveEvent = {
    runtimeKey: string;
    from: string;
    to: string;
};
type FilePathMoveListener = (move: FilePathMoveEvent) => void;
type FilePathMove = {
    /** The rename landed: editors under `from` now live under `to`. */
    commit: (to: string) => void;
    /** The rename failed: nothing moved. */
    abort: () => void;
};
/** `path` rebased from `from` to `to`, or null when `path` is not `from` or inside it. */
export declare const rebaseMovedPath: (path: string, from: string, to: string) => string | null;
/** A copy of a path-keyed record with keys at or under `from` moved under `to`. */
export declare const rebaseMovedPathKeys: <T>(record: Record<string, T>, from: string, to: string) => Record<string, T>;
export declare const beginFilePathMove: (from: string) => FilePathMove;
/** True while a move of `path`, or of a folder containing it, is in flight. */
export declare const isFilePathMoveInFlight: (path: string) => boolean;
/** Listeners run synchronously on commit, before the tab stores are rebased. */
export declare const subscribeToFilePathMoves: (listener: FilePathMoveListener) => (() => void);
export {};
