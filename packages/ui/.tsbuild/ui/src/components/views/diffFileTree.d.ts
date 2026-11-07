type DiffTreeRow<F extends {
    path: string;
}> = {
    kind: 'directory';
    key: string;
    depth: number;
    path: string;
    label: string;
    fileCount: number;
    expanded: boolean;
} | {
    kind: 'file';
    key: string;
    depth: number;
    name: string;
    file: F;
};
/**
 * Flattens changed files into visible tree rows. A directory whose only
 * content is one subdirectory merges into it (`packages/ui/src`), so deep
 * monorepo paths don't cost one row per segment. Directories are expanded
 * unless their (merged) path is in `collapsed`.
 */
export declare const buildDiffTreeRows: <F extends {
    path: string;
}>(files: F[], collapsed: ReadonlySet<string>) => DiffTreeRow<F>[];
export {};
