import React from 'react';
interface MobileOverlayPanelProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    contentMaxHeightClassName?: string;
    renderHeader?: (closeButton: React.ReactNode) => React.ReactNode;
}
export declare const MobileOverlayPanel: React.FC<MobileOverlayPanelProps>;
export {};
