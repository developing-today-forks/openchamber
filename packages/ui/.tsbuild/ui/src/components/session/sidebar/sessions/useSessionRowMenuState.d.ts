type SessionRowMenuStateArgs = {
    menuInstanceKey: string;
    /** Null for rows rendered without an occurrence key; their context menu keeps local state. */
    contextMenuInstanceKey: string | null;
    openSidebarMenuKey: string | null;
    setOpenSidebarMenuKey: (key: string | null) => void;
    /** True when a menu item deferred work (inline rename) until the close transition completes. */
    hasDeferredCloseWork: () => boolean;
    /** Runs once the menu has fully closed, before the row releases its open-menu key. */
    onCloseComplete: () => void;
};
/**
 * Owns the open state of a session row's overflow and context menus.
 *
 * The shared `openSidebarMenuKey` also pins the row occurrence in the
 * virtualizer, so it must stay set until close completion when a menu item
 * deferred work to `onOpenChangeComplete`. The controlled `open` prop cannot
 * follow that key directly: a close request that leaves it set keeps the menu
 * open, `onOpenChangeComplete(false)` never fires, and the deferred rename
 * never starts. A local close request hides the menu while the key stays
 * pinned until completion.
 */
export declare const useSessionRowMenuState: ({ menuInstanceKey, contextMenuInstanceKey, openSidebarMenuKey, setOpenSidebarMenuKey, hasDeferredCloseWork, onCloseComplete, }: SessionRowMenuStateArgs) => {
    isMenuOpen: boolean;
    isContextMenuOpen: boolean;
    handleMenuOpenChange: (open: boolean) => void;
    handleContextMenuOpenChange: (open: boolean) => void;
    handleMenuOpenChangeComplete: (open: boolean) => void;
};
export {};
