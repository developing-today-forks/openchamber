import React from 'react';
import type { FileContentSearchMatch } from '@/lib/api/types';
import { type FileContentSearchState } from './useFileContentSearch';
type Props = {
    state: FileContentSearchState;
    /** The one result marked as open; other lines of the same file stay plain. */
    activeMatchKey: string | null;
    onOpen: (match: FileContentSearchMatch, options?: {
        pin?: boolean;
    }) => void;
    onDragStart?: (event: React.DragEvent<HTMLButtonElement>, match: FileContentSearchMatch) => void;
    onDragEnd?: (event: React.DragEvent<HTMLButtonElement>, match: FileContentSearchMatch) => void;
};
/**
 * Find-in-files results as rows of a files tree list: one card per matching
 * line, the file on top and the line with its matches marked below. Renders
 * `<li>` elements, so it sits inside the tree's own `<ul>`.
 */
export declare const FileContentSearchResults: React.FC<Props>;
export {};
