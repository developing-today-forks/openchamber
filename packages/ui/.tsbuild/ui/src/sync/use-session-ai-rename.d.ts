export declare function useIsSessionAiRenamePending(sessionID: string, directory: string | null | undefined): boolean;
export declare function useSessionAiRename(sessionID: string, directory: string | null | undefined): {
    prepare: (signal: AbortSignal) => Promise<{
        session: import("../lib/opencode/model").Session;
        turns: {
            user: {
                info: import("../lib/opencode/model").Message;
                parts: import("../lib/opencode/model").Part[];
            };
            context: import("../lib/opencode/model").SyntheticMessage[];
            assistant: {
                info: import("../lib/opencode/model").AssistantMessage;
                parts: import("../lib/opencode/model").Part[];
            };
        }[];
    }>;
    rename: () => Promise<void>;
};
