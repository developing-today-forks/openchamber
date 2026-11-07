import React from 'react';
interface JsonTreeViewProps {
    jsonString: string;
    format?: 'json' | 'jsonc';
    className?: string;
    maxHeight?: string;
    initiallyExpandedDepth?: number;
}
declare const JsonTreeView: React.MemoExoticComponent<({ jsonString, format, className, maxHeight, initiallyExpandedDepth, }: JsonTreeViewProps) => import("react/jsx-runtime").JSX.Element | null>;
export { JsonTreeView };
