export declare const FILE_TREE_INDENT_PX = 12;
export declare const FILE_TREE_BASE_PADDING_PX = 8;
export type FileTreeGitStatus = 'git-modified' | 'git-added' | 'git-deleted';
/** `basePaddingPx` lets a tree sitting under a differently inset header line up with it. */
export declare const fileTreeRowPaddingLeft: (depth: number, basePaddingPx?: number) => string;
export declare const fileTreeRowStateClassName: (isActive: boolean) => string;
