import React from 'react';
import type { DesktopWindowControlsSide } from '@/lib/desktop';
type WindowsWindowControlsProps = {
    visible: boolean;
    position?: DesktopWindowControlsSide;
};
export declare const WindowsWindowControls: React.MemoExoticComponent<({ visible, position, }: WindowsWindowControlsProps) => import("react/jsx-runtime").JSX.Element | null>;
export {};
