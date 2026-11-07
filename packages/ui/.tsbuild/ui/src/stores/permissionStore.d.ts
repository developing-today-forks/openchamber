import { type PermissionMode, type PermissionModeMap, type PermissionPolicySnapshot } from "./utils/permissionAutoAccept";
interface PermissionStore {
    /** The host's policy: every session that is not in an isolated space. */
    modes: PermissionModeMap;
    /**
     * Each isolated space's own policy, by space id: the server inside the space keeps the modes
     * of its sessions and answers their requests, so it is read and written there.
     */
    spaceModes: Readonly<Record<string, PermissionModeMap>>;
    loaded: boolean;
    saving: boolean;
    lastAppliedRevision: number;
    legacyCandidate: Record<string, boolean> | null;
    legacyRuntimeKey: string | null;
    hydrate: () => Promise<void>;
    /** Applies a policy from its owner: the host (`''`, the default) or the space with that id. */
    applySnapshot: (snapshot: PermissionPolicySnapshot, expectedRuntimeKey?: string, owner?: string) => void;
    /** Reads one isolated space's policy from that space; a space that cannot be read keeps what was known. */
    refreshSpaceModes: (spaceId: string) => Promise<boolean>;
    reset: () => void;
    getSessionMode: (sessionId: string) => PermissionMode;
    setSessionMode: (sessionId: string, mode: PermissionMode) => Promise<void>;
}
export declare const usePermissionStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<PermissionStore>, "persist" | "setState"> & {
    setState(partial: Partial<PermissionStore> | PermissionStore | ((state: PermissionStore) => Partial<PermissionStore> | PermissionStore), replace?: false | undefined): unknown;
    setState(state: PermissionStore | ((state: PermissionStore) => PermissionStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<PermissionStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: PermissionStore) => void) => () => void;
        onFinishHydration: (fn: (state: PermissionStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<PermissionStore, unknown, unknown>>;
    };
}>;
export {};
