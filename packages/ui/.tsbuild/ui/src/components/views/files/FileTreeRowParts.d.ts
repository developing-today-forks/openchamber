import React from 'react';
import { type FileTreeGitStatus } from './fileTreeRow';
/** One guide per ancestor level, centred under that ancestor's chevron. */
export declare const FileTreeIndentGuides: React.FC<{
    depth: number;
}>;
export declare const FileTreeChevron: React.FC<{
    expanded: boolean;
}>;
export declare const FileTreeStatusLetter: React.FC<{
    code: string;
    color: string;
    label: string;
}>;
/** Right-hand markers of a file row: open in a tab (dot), then its git state. */
export declare const FileTreeFileMarkers: React.FC<{
    isOpen: boolean;
    status: FileTreeGitStatus | null | undefined;
}>;
export declare const FileTreeFolderBadge: React.FC<{
    badge: {
        modified: number;
        added: number;
    };
}>;
