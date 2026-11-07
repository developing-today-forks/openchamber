export interface SessionFolder {
    id: string;
    name: string;
    sessionIds: string[];
    createdAt: number;
    /** If set, this folder is a sub-folder of the parent folder with this id */
    parentId?: string | null;
}
export type SessionFoldersMap = Record<string, SessionFolder[]>;
interface SessionFoldersState {
    foldersMap: SessionFoldersMap;
    collapsedFolderIds: Set<string>;
}
interface SessionFoldersActions {
    getFoldersForScope: (scopeKey: string) => SessionFolder[];
    /** `id` fixes the folder's id, so every client creating the same folder makes one. */
    createFolder: (scopeKey: string, name: string, parentId?: string | null, id?: string) => SessionFolder;
    renameFolder: (scopeKey: string, folderId: string, name: string) => void;
    deleteFolder: (scopeKey: string, folderId: string) => void;
    addSessionToFolder: (scopeKey: string, folderId: string, sessionId: string) => void;
    addSessionsToFolder: (scopeKey: string, folderId: string, sessionIds: string[]) => void;
    removeSessionFromFolder: (scopeKey: string, sessionId: string) => void;
    removeSessionEverywhere: (runtimeKey: string, sessionId: string) => void;
    removeSessionsFromFolders: (scopeKey: string, sessionIds: string[]) => void;
    /** Drop every folder of these scopes, for a project that was closed. */
    forgetScopes: (scopeKeys: string[]) => void;
    toggleFolderCollapse: (folderId: string) => void;
    getSessionFolderId: (scopeKey: string, sessionId: string) => string | null;
    resetForRuntimeSwitch: (runtimeKey: string) => void;
}
type SessionFoldersStore = SessionFoldersState & SessionFoldersActions;
/** Another client changed the folders; read them unless this answer is already shown. */
export declare const handleSessionFoldersChanged: (updatedAt: number) => void;
/** The event stream (re)connected: anything may have changed meanwhile, and waiting changes can go now. */
export declare const handleSessionFoldersStreamReady: () => void;
export declare const useSessionFoldersStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SessionFoldersStore>, "devtools" | "setState"> & {
    setState(partial: Partial<SessionFoldersStore> | ((state: SessionFoldersStore) => Partial<SessionFoldersStore> | SessionFoldersStore) | SessionFoldersStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ((state: SessionFoldersStore) => SessionFoldersStore) | SessionFoldersStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export {};
