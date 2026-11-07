import { type BrowserHistoryEntry } from '@/lib/browser/history';
type BrowserHistoryState = {
    byProject: Record<string, BrowserHistoryEntry[]>;
    recordVisit: (directory: string, visit: {
        url: string;
        title?: string;
    }) => void;
    forget: (directory: string, url: string) => void;
    clear: (directory: string) => void;
};
export declare const useBrowserHistoryStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<BrowserHistoryState>, "persist" | "setState"> & {
    setState(partial: BrowserHistoryState | Partial<BrowserHistoryState> | ((state: BrowserHistoryState) => BrowserHistoryState | Partial<BrowserHistoryState>), replace?: false | undefined): unknown;
    setState(state: BrowserHistoryState | ((state: BrowserHistoryState) => BrowserHistoryState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<BrowserHistoryState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: BrowserHistoryState) => void) => () => void;
        onFinishHydration: (fn: (state: BrowserHistoryState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<BrowserHistoryState, unknown, unknown>>;
    };
}>;
export declare const selectBrowserHistory: (directory: string) => (state: BrowserHistoryState) => readonly BrowserHistoryEntry[];
export {};
