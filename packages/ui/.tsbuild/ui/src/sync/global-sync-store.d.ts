import type { GlobalState } from "./types";
type GlobalSyncStore = GlobalState & {
    actions: {
        set: (patch: Partial<GlobalState>) => void;
        reset: () => void;
    };
};
export declare const useGlobalSyncStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GlobalSyncStore>>;
export {};
