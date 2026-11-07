import React from 'react';
import type { ProjectFileSearchHit } from '@/lib/opencode/client';
type FileInfo = ProjectFileSearchHit;
export interface FileMentionHandle {
    handleKeyDown: (key: string) => void;
}
interface FileMentionAutocompleteProps {
    searchQuery: string;
    onFileSelect: (file: FileInfo) => void;
    onAgentSelect?: (agentName: string) => void;
    onClose: () => void;
    style?: React.CSSProperties;
}
export declare const FileMentionAutocomplete: React.ForwardRefExoticComponent<FileMentionAutocompleteProps & React.RefAttributes<FileMentionHandle>>;
export {};
