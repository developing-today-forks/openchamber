/**
 * In-memory expand state for parent sessions (with subsessions) in the mobile
 * sessions sheet. Deliberately NOT persisted: it survives closing and
 * reopening the sheet (the sheet unmounts on close, but this module-level store
 * does not), and resets on a full page reload.
 */
type MobileSessionExpansionStore = {
    expandedParents: Record<string, boolean>;
    toggleParent: (sessionId: string) => void;
};
export declare const useMobileSessionExpansionStore: import("zustand").UseBoundStore<import("zustand").StoreApi<MobileSessionExpansionStore>>;
export {};
