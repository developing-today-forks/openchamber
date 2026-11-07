import React from 'react';
import type { IconName } from '@/components/icon/icons';
/** Sidebar tooltips that list PRs or issues linger this long after the pointer
    leaves, so it can travel into them and open a link. */
export declare const SIDEBAR_REF_TOOLTIP_CLOSE_DELAY_MS = 750;
/** One PR or issue a sidebar tooltip lists. */
export type SidebarRefLink = {
    key: string;
    icon: IconName;
    /** Number or identifier with its state, e.g. `#12 · Open`. */
    text: string;
    title: string | null;
    /** Theme PR colour; absent shows it muted (state unknown). */
    color?: string | null;
    url: string | null;
};
export declare const SidebarRefLinks: React.FC<{
    items: readonly SidebarRefLink[];
    directory: string | null;
}>;
