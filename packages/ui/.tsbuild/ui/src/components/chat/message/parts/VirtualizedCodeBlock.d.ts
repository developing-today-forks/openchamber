/**
 * VirtualizedCodeBlock — PERF-007
 *
 * Renders large code/read outputs without mounting one highlighter per line:
 *   1. ONE worker tokenization of the whole block (off the main thread)
 *   2. @tanstack/react-virtual to only render visible rows
 *
 * Tokenizing the whole block at once also preserves cross-line syntax context
 * (multi-line strings/comments) that per-line highlighting loses. Colors resolve
 * through the `--md-syntax-*` CSS variables on the container.
 */
import React from 'react';
export interface CodeLine {
    text: string;
    lineNumber?: number | null;
    isInfo?: boolean;
    /** For diff lines */
    type?: 'context' | 'added' | 'removed';
}
interface VirtualizedCodeBlockProps {
    lines: CodeLine[];
    language: string;
    /** Max visible height in CSS (default: 60vh) */
    maxHeight?: string;
    /** Show line numbers (default: true) */
    showLineNumbers?: boolean;
    /** Styles per line type (for diffs) */
    lineStyles?: (line: CodeLine) => React.CSSProperties | undefined;
}
export declare const VirtualizedCodeBlock: React.FC<VirtualizedCodeBlockProps>;
export {};
