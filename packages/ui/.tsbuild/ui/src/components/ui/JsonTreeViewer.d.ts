import React from 'react';
interface JsonTreeViewerProps {
    data: unknown;
    className?: string;
    maxHeight?: string;
    initiallyExpandedDepth?: number;
    onCopyPath?: (path: string) => void;
}
declare const JsonTreeViewer: React.ForwardRefExoticComponent<JsonTreeViewerProps & React.RefAttributes<{
    expandAll: () => void;
    collapseAll: () => void;
}>>;
export { JsonTreeViewer };
