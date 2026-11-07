import React from 'react';
export declare const ApplyPatchFileButtons: ({ animate, currentDirectory, metadata, onFileClick, openDiffLabel, showFileIcons, textClassName, }: {
    animate?: boolean;
    /** Paths in the chips are shown relative to this directory. */
    currentDirectory?: string;
    metadata: Record<string, unknown> | undefined;
    onFileClick?: (file: Record<string, unknown>, event: React.MouseEvent<HTMLButtonElement>) => void;
    openDiffLabel: string;
    showFileIcons?: boolean;
    textClassName?: string;
}) => React.ReactNode;
