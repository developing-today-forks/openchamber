import type { PersistentPtyInfo } from '@opencode/client';
import type { SyncEvent } from '@/lib/opencode/events';
export type TrackedPty = PersistentPtyInfo & {
    directory: string;
};
type PersistentPtysState = {
    byId: ReadonlyMap<string, TrackedPty>;
};
export declare const usePersistentPtysStore: import("zustand").UseBoundStore<import("zustand").StoreApi<PersistentPtysState>>;
export declare const applyPersistentPtyEvents: (directory: string, events: readonly SyncEvent[]) => void;
export declare const replaceSessionTerminals: (sessionID: string, directory: string, terminals: readonly PersistentPtyInfo[]) => void;
export {};
