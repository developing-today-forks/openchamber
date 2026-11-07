/**
 * The header's working set of sessions, shown as tabs on web/desktop.
 *
 * Only session ids and their order are owned here — titles, directories and
 * liveness come from the session stores at render time. Tabs are a per-client
 * projection: opening a session anywhere adds it once, closing a tab only
 * removes it from the strip and never touches the session itself. Ids whose
 * session is unknown are kept (a partially loaded global list must not
 * destroy the working set) and simply do not render until the session loads.
 *
 * A session opened by browsing lands in the one preview tab, which the next
 * opened session replaces in place. Double-clicking the tab, dragging it, or
 * sending a message in the session pins it: a pinned tab stays until closed.
 */
interface SessionTabsStore {
    tabIds: string[];
    /** The replaceable preview tab; null when every tab is pinned. */
    previewTabId: string | null;
    /**
     * Sessions pinned before their tab exists (a draft's first message creates
     * the session ahead of its tab). Their tab opens pinned. Not persisted.
     */
    pinOnOpenIds: string[];
    /**
     * Opens the session's tab as the preview, replacing the current preview.
     * `slotIds` are sessions that share one tab with it (the members of a
     * multi-run): an existing tab of any of them is reused in place, keeping
     * that tab's pinned or preview state.
     */
    ensureTab: (sessionId: string, slotIds?: readonly string[]) => void;
    /** Turns the session's preview tab into a pinned one. */
    pinTab: (sessionId: string) => void;
    closeTab: (sessionId: string) => void;
    closeOtherTabs: (sessionId: string) => void;
    /** Moves a tab and pins it: arranging a tab means keeping it. */
    reorderTabs: (activeId: string, overId: string) => void;
    /** Drop ids the caller has authoritatively confirmed no longer exist. */
    removeTabs: (sessionIds: readonly string[]) => void;
}
export declare const useSessionTabsStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<SessionTabsStore>, "devtools" | "setState"> & {
    setState(partial: Partial<SessionTabsStore> | SessionTabsStore | ((state: SessionTabsStore) => Partial<SessionTabsStore> | SessionTabsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: SessionTabsStore | ((state: SessionTabsStore) => SessionTabsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<SessionTabsStore> | SessionTabsStore | ((state: SessionTabsStore) => Partial<SessionTabsStore> | SessionTabsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: SessionTabsStore | ((state: SessionTabsStore) => SessionTabsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SessionTabsStore, {
            tabIds: string[];
            previewTabId: string | null;
        }, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SessionTabsStore) => void) => () => void;
        onFinishHydration: (fn: (state: SessionTabsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SessionTabsStore, {
            tabIds: string[];
            previewTabId: string | null;
        }, unknown>>;
    };
}>;
export {};
