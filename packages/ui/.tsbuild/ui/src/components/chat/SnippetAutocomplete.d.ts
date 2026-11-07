import React from 'react';
import type { Snippet } from '@/types/snippet';
export interface SnippetAutocompleteHandle {
    handleKeyDown: (key: string) => void;
}
interface SnippetAutocompleteProps {
    searchQuery: string;
    onSnippetSelect: (snippet: Snippet, trigger: string) => void;
    onClose: () => void;
    style?: React.CSSProperties;
}
export declare const SnippetAutocomplete: React.ForwardRefExoticComponent<SnippetAutocompleteProps & React.RefAttributes<SnippetAutocompleteHandle>>;
export {};
