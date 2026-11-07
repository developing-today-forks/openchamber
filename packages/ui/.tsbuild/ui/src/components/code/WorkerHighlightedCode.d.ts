import React from 'react';
interface WorkerHighlightedCodeProps {
    code: string;
    language: string;
    className?: string;
    /** Inline styles for the host container (mirrors react-syntax-highlighter `customStyle`). */
    style?: React.CSSProperties;
    /** Inline styles applied to the `<code>` element (mirrors `codeTagProps.style`). */
    codeStyle?: React.CSSProperties;
    /** Wrap long lines instead of horizontal scroll. */
    wrap?: boolean;
}
export declare const WorkerHighlightedCode: React.FC<WorkerHighlightedCodeProps>;
export {};
