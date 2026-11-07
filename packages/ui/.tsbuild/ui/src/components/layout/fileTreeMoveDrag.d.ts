/**
 * Drag-to-move in the files tree.
 *
 * Rows already start a native drag that carries the file path for the chat.
 * The same drag moves the entry when it is dropped on a folder in the tree, so
 * the drop target alone decides what happens. During `dragover` the browser
 * hides the drag data, so the row records here what is being dragged. Only
 * one native drag runs at a time, which makes module state safe.
 */
export type FileTreeEntry = {
    path: string;
    type: 'file' | 'directory';
};
export declare const setFileTreeDragSource: (source: FileTreeEntry | null) => void;
export declare const getFileTreeDragSource: () => FileTreeEntry | null;
/**
 * The folder a drop would move `source` into, or null when the drop changes
 * nothing or cannot work. A file row stands for the folder it is in, and
 * empty space below the tree (`over` null) for `root`, as in VS Code.
 */
export declare const getFileTreeMoveTarget: (source: FileTreeEntry, over: FileTreeEntry | null, root: string) => string | null;
/** Where `source` lands when moved into `directory`. */
export declare const getFileTreeMovedPath: (source: FileTreeEntry, directory: string) => string;
