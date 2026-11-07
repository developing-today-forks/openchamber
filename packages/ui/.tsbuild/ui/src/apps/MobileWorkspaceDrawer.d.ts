import React from 'react';
import { type MobileWorkspaceTab } from '@/lib/mobileWorkspaceTabs';
import type { ProjectRef } from '@/lib/projectContextApi';
/** The workspace surfaces as tabs (Changes / Files / Terminal / Notes / MCP).

    Two hosts, same content and same state:
     - `drawer` (default) covers the app and slides in from the right edge —
       the phone, and a tablet in portrait where a side panel would leave no
       usable chat column;
     - `panel` renders inline so the caller can size it as a real sidebar
       beside the chat (tablet, landscape). The caller owns the width and the
       open/close animation there; this component only fills it.

    Closes via the header X, a left-edge swipe back toward the right (the
    mirror of the gesture that opened it), Escape (unless the terminal tab owns
    the keys), or the Android back button (handled by MobileShell). */
export declare const MobileWorkspaceDrawer: React.FC<{
    open: boolean;
    onClose: () => void;
    tab: MobileWorkspaceTab;
    onTabChange: (tab: MobileWorkspaceTab) => void;
    /** When set, the Changes tab opens directly into the per-file diff. */
    pendingChangesDiff: {
        path: string;
        staged: boolean;
    } | null;
    /** Notes tab: opens a plan fullscreen (layered above the drawer). */
    onOpenPlan: (plan: {
        id: string;
        title: string;
        projectRef: ProjectRef;
    }) => void;
    /** MCP tab: jump to the MCP settings page pre-seeded with a new server draft. */
    onOpenMcpSettings: () => void;
    variant?: 'drawer' | 'panel';
}>;
