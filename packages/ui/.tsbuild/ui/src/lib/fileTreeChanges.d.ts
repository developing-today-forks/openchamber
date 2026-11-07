/**
 * Tells file browsers which listings may be out of date, from signals the
 * client already receives. There is no watcher and no timer: OpenCode 2.x
 * reports no file events (its `filesystem.changed` covers the repository HEAD
 * only), so the agent's own activity is the source.
 *
 * - A finished `write` or `patch` names its files: their directories change.
 * - A finished `shell`, `execute`, MCP or plugin call could touch anything.
 *   Its session is remembered until the step ends; the step's snapshot then
 *   says whether any file changed. A step that changed nothing costs nothing,
 *   which is the common case for read-only commands.
 * - A finished user shell command and a revert are unknown changes.
 *
 * Changes outside the agent (an editor, a terminal) are not seen here.
 */
import { type Part } from '@/lib/opencode/model';
/**
 * `paths` are absolute, normalized files whose parent listings changed.
 * Without `paths` anything under `directory` may have changed.
 */
export type FileTreeChange = {
    directory: string;
    paths?: string[];
};
type FileTreeChangeListener = (change: FileTreeChange) => void;
export declare const subscribeFileTreeChanges: (listener: FileTreeChangeListener) => (() => void);
export declare const notifyFileTreeChanged: (change: FileTreeChange) => void;
export declare const fileTreeChanges: {
    toolTransition(directory: string, previousPart: Part | undefined, nextPart: Part): void;
    /**
     * A step ended. `files` is its snapshot's changed files, or undefined when
     * there is no snapshot (snapshots off, not a Git repository, a failed step).
     */
    stepCompleted(directory: string, sessionID: string, files: readonly string[] | undefined): void;
    unknownChange(directory: string): void;
};
/**
 * The directories of `root`'s tree a change can affect: each named file's
 * parent, or `null` when the whole tree is in question. An empty list means
 * the change is elsewhere.
 */
export declare const affectedDirectories: (change: FileTreeChange, root: string) => string[] | null;
export {};
