import type { Message, Part } from "@/lib/opencode/model";
export declare function hasUserMessage(messages: Message[] | undefined): boolean;
export declare function shouldFetchSessionForRenderableSync(input: {
    hasSession: boolean;
    shouldLoadMessages: boolean;
    force?: boolean;
}): boolean;
export declare function useSync(): {
    ensureSessionRenderable: (sessionID: string, force?: boolean, directoryOverride?: string) => Promise<void>;
    syncSession: (sessionID: string, force?: boolean, directoryOverride?: string) => Promise<void>;
    prefetchSession: (sessionID: string, targetDirectory: string) => Promise<void>;
    loadMore: (sessionID: string, targetDirectory: string) => Promise<void>;
    hasMore: (sessionID: string, directoryOverride?: string) => boolean;
    isLoading: (sessionID: string, directoryOverride?: string) => boolean;
    isComplete: (sessionID: string, directoryOverride?: string) => boolean;
    recoverPendingQuestions: (sessionID: string, directoryOverride?: string) => Promise<boolean>;
    optimistic: {
        add: (input: {
            sessionID: string;
            directory?: string | null;
            message: Message;
            parts: Part[];
        }) => void;
        remove: (input: {
            sessionID: string;
            directory?: string | null;
            messageID: string;
        }) => void;
        confirm: (input: {
            sessionID: string;
            directory?: string | null;
            messageID: string;
        }) => void;
    };
};
export declare function usePrefetchSessionMessages(): ({ directory, sessionID }: {
    directory: string;
    sessionID: string;
}) => Promise<void>;
export declare function useSessionMessageRecordsForExport(): ({ directory, sessionID }: {
    directory: string;
    sessionID: string;
}) => Promise<{
    info: Message;
    parts: Part[];
}[] | null>;
