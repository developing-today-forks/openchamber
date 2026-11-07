import React from 'react';
interface LongErrorTextProps {
    text: string;
    /** Renders the visible part of the error: the preview while collapsed, the full text once expanded. */
    children: (visibleText: string) => React.ReactNode;
    buttonClassName?: string;
}
/**
 * Shows a long error collapsed to its first lines with a button to reveal the
 * rest. Short errors render unchanged. The full text is never rendered while
 * collapsed, so a huge error costs nothing until someone asks to read it.
 */
export declare const LongErrorText: React.FC<LongErrorTextProps>;
export {};
