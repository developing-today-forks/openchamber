import type { GitStatus } from '@/lib/api/types';
type DirectoryNode = {
    name: string;
    path: string;
    type: 'file' | 'directory';
    extension?: string;
    relativePath?: string;
};
export declare const areDirectoryNodesEqual: (left: readonly DirectoryNode[], right: readonly DirectoryNode[]) => boolean;
type FileStatus = 'git-added' | 'git-deleted' | 'git-modified';
type FolderBadge = {
    modified: number;
    added: number;
};
export declare const buildFileTreeStatusIndex: (files: GitStatus['files']) => {
    statusByPath: Map<string, FileStatus | null>;
    badgeByDir: Map<string, FolderBadge>;
};
export {};
