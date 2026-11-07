export type ChatDraftIdentity = {
    runtimeKey: string;
    directory: string;
    sessionId: string | null;
};
export type ChatDraftSnapshot = {
    text: string;
    confirmedMentions: Set<string>;
};
export declare const createChatDraftIdentity: (runtimeKey: string, directory: string | null | undefined, sessionId: string | null) => ChatDraftIdentity | null;
export declare const getChatDraftIdentityKey: (identity: ChatDraftIdentity) => string;
export declare const readChatDraft: (identity: ChatDraftIdentity | null) => ChatDraftSnapshot;
export declare const writeChatDraft: (identity: ChatDraftIdentity | null, text: string, confirmedMentions: Iterable<string>) => void;
export declare const clearChatDraft: (identity: ChatDraftIdentity, notify?: boolean) => void;
export declare const subscribeChatDraftDeletion: (listener: (identity: ChatDraftIdentity) => void) => (() => void);
