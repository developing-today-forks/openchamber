import React from 'react';
import type { SidebarPeek } from './useSidebarPeek';
interface SidebarProps {
    isOpen: boolean;
    isMobile: boolean;
    children: React.ReactNode;
    className?: string;
    /** Fixed strip rendered above the scrollable content (e.g. toggle + project actions). */
    topBar?: React.ReactNode;
    /** The collapsed sidebar shown over the chat on hover (`useSidebarPeek`). */
    peek?: SidebarPeek;
}
export declare const Sidebar: React.FC<SidebarProps>;
export {};
