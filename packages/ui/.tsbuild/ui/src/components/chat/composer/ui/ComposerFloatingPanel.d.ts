import React from 'react';
interface ComposerFloatingPanelProps {
    header: React.ReactNode;
    children?: React.ReactNode;
    compact?: boolean;
    role?: 'dialog' | 'region';
    ariaLabel?: string;
}
export declare function ComposerFloatingPanel({ header, children, compact, role, ariaLabel }: ComposerFloatingPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
