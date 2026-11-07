import type { GitStatus } from '@/lib/api/types';
export declare const TREE_INDENT_PX = 14;
type TreeFile = {
    path: string;
};
export type ChangesTreeDirectoryNode<F extends TreeFile = GitStatus['files'][number]> = {
    id: string;
    path: string;
    name: string;
    children: Map<string, ChangesTreeDirectoryNode<F>>;
    directFiles: F[];
    files: F[];
};
export type FlattenedTreeRow<F extends TreeFile = GitStatus['files'][number]> = {
    key: string;
    kind: 'directory';
    depth: number;
    /** Display label; merged single-child chains read `ui/src`. */
    label: string;
    directory: ChangesTreeDirectoryNode<F>;
} | {
    key: string;
    kind: 'file';
    depth: number;
    file: F;
};
/**
 * Last segment of a changed path, for rows that show the name alone. Status
 * lists a nested repository or an unexpanded untracked directory as `dir/`;
 * that keeps its trailing slash so the row reads `dir/` instead of empty.
 */
export declare const changedPathName: (path: string) => string;
export declare const buildChangesTree: <F extends TreeFile>(entries: F[]) => ChangesTreeDirectoryNode<F>;
/**
 * Follows a chain of directories that hold nothing but one subdirectory, so
 * `packages/ui/src` renders as one row instead of three. The returned node is
 * the deepest one; its path keys expansion state.
 */
export declare const compactDirectory: <F extends TreeFile>(directory: ChangesTreeDirectoryNode<F>) => {
    node: ChangesTreeDirectoryNode<F>;
    label: string;
};
export declare const flattenChangesTree: <F extends TreeFile>(root: ChangesTreeDirectoryNode<F>, expandedDirectories: Set<string>) => FlattenedTreeRow<F>[];
export {};
