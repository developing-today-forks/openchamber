interface DirectoryStore {
    currentDirectory: string;
    directoryHistory: string[];
    historyIndex: number;
    homeDirectory: string;
    hasPersistedDirectory: boolean;
    isHomeReady: boolean;
    isSwitchingDirectory: boolean;
    setDirectory: (path: string, options?: {
        showOverlay?: boolean;
    }) => void;
    goBack: () => void;
    goForward: () => void;
    goToParent: () => void;
    /** Where the app goes once the last project is removed: see `noProjectDirectory`. */
    goToNoProjectDirectory: () => Promise<void>;
    synchronizeHomeDirectory: (path: string, chatsRoot?: string | null) => void;
    /**
     * Forgets a working directory that belonged to another host. The directory
     * is unknown until the host now connected names its home, which then becomes
     * the directory through `synchronizeHomeDirectory`.
     */
    resetForRuntimeSwitch: () => void;
}
/**
 * No working directory yet: the host has not named its home and nothing else
 * set one (`/`, at a browser's first visit before login and after
 * `resetForRuntimeSwitch`), or no project is open and the server has not
 * named the chats root yet (empty).
 */
export declare const isDirectoryUnknown: (state: Pick<DirectoryStore, 'currentDirectory' | 'isHomeReady'>) => boolean;
export declare const useDirectoryStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<DirectoryStore>, "devtools" | "setState"> & {
    setState(partial: DirectoryStore | Partial<DirectoryStore> | ((state: DirectoryStore) => DirectoryStore | Partial<DirectoryStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: DirectoryStore | ((state: DirectoryStore) => DirectoryStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
/**
 * Resolves the home directory again when the startup attempt could not. A
 * server with a UI password answers /api/fs/home only after login, so on a
 * browser's first visit the attempt at page load falls back to "/". The
 * session gate calls this right after authentication, before the app mounts.
 * A resolution still in flight is awaited first rather than superseded: on a
 * server without a password it is the one that succeeds.
 */
export declare const ensureHomeDirectoryResolved: () => Promise<void>;
export {};
