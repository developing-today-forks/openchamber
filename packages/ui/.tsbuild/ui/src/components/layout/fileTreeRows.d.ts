/**
 * The sidebar file tree as the flat list of rows it renders, for its
 * virtualizer: every entry of every expanded folder in display order, with
 * a folder's load error right under it.
 */
type FileTreeRowNode = {
    path: string;
    type: 'file' | 'directory';
};
export type FileTreeRow<Node extends FileTreeRowNode> = {
    kind: 'node';
    key: string;
    node: Node;
    depth: number;
    isExpanded: boolean;
} | {
    kind: 'error';
    key: string;
    directory: string;
    depth: number;
    message: string;
};
export declare const buildFileTreeRows: <Node extends FileTreeRowNode>({ root, childrenByDir, expandedPaths, loadErrorsByDir, }: {
    root: string;
    childrenByDir: Readonly<Record<string, readonly Node[]>>;
    expandedPaths: ReadonlySet<string>;
    loadErrorsByDir: Readonly<Record<string, string>>;
}) => FileTreeRow<Node>[];
/**
 * The virtualizer's range plus rows that must stay mounted wherever they are
 * scrolled: the row being dragged (its drag end would never reach React
 * otherwise) and the row holding focus (focus would fall to the page). Sorted,
 * as the virtualizer expects.
 */
export declare const withPinnedRowIndexes: (range: readonly number[], pinned: readonly number[], count: number) => number[];
export {};
