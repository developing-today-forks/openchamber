export declare const CHAT_DRAFT_PROJECT_ID = "openchamber:chats";
export declare function getChatsRootFromDirectory(directory: string | null | undefined): string | null;
export declare function isChatDirectoryPath(directory: string | null | undefined): boolean;
export declare function isChatDirectoryForHome(directory: string | null | undefined, home: string | null | undefined): boolean;
/**
 * The chats root the server named, or null until it has. Never a guess: with
 * OPENCHAMBER_DATA_DIR the root is outside the home, and the home's legacy
 * folder does not exist, so a guessed root failed to open.
 */
export declare function getChatsRoot(): string | null;
/** Notifies once the server names a chats root for a runtime. */
export declare function subscribeChatsRoot(listener: () => void): () => void;
/** Required before a global snapshot can classify or persist managed chats. */
export declare function ensureChatsRootDirectory(): Promise<void>;
/**
 * The chats root from the server's answer itself. The cache behind
 * `getChatsRoot` is keyed by the runtime key at request time, which can still
 * change while the page starts up.
 */
export declare function resolveChatsRootDirectory(): Promise<string>;
export declare function warmChatsRootDirectory(): Promise<void>;
/**
 * Drops the server-provided roots for every runtime. Only tests need this: the
 * cache is keyed by runtime for the app, while every test file in a process
 * starts from the same runtime key and would otherwise see a previous file's
 * home directory.
 */
export declare function resetChatsRootCacheForTests(): void;
export declare function createChatDirectory(now?: Date): Promise<string>;
export declare function deleteChatDirectory(directory: string): Promise<void>;
