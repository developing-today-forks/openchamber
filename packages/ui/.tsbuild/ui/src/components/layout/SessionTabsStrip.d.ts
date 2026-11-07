import React from 'react';
import type { Session } from '@/lib/opencode/model';
export type SessionTabMenuComponents = {
    Item: React.ComponentType<{
        className?: string;
        disabled?: boolean;
        onClick?: React.MouseEventHandler;
        children?: React.ReactNode;
    }>;
    Separator: React.ComponentType<{
        className?: string;
    }>;
};
export type SessionTabMenuArgs = {
    session: Session;
    open: boolean;
    isActive: boolean;
    select: () => void;
    closeOtherTabs: () => void;
    /** Menu primitives for the surface the menu opens in (dropdown or context menu). */
    components: SessionTabMenuComponents;
};
/**
 * The header's horizontal working set of sessions (web/desktop only).
 *
 * A session the user opens shows in the italic preview tab until pinned (see
 * `useSessionTabsStore`); the tab whose session is current renders `children` — the header's title/rename block — inside a
 * selected pill. Closing a tab only removes it from the strip; closing the
 * active one activates its neighbour. Ids whose session has not loaded (or
 * was archived/deleted) stay in the store but do not render, so a partial
 * session list never destroys the working set.
 */
export declare const SessionTabsStrip: React.FC<{
    /** Menu items for one tab's session, supplied by the header. */
    renderMenu: (args: SessionTabMenuArgs) => React.ReactNode;
    /** Fires when a tab menu finishes opening/closing (deferred rename hook). */
    onMenuOpenChangeComplete?: (open: boolean) => void;
    /** While the active tab renames, its hover controls stay hidden. */
    suppressActiveTabControls?: boolean;
    children: React.ReactNode;
}>;
