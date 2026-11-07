import type { Message, Part } from "@/lib/opencode/model";
import type { SessionMessageLoader, SessionMessageTarget } from './session-message-loader';
/** Share the normal loader's requests, stopping as soon as three pairs are covered. */
export declare function loadSessionTitleTurns(input: {
    loader: Pick<SessionMessageLoader, 'getSnapshot' | 'ensure' | 'loadOlder'>;
    target: SessionMessageTarget;
    getRecords: () => {
        info: Message;
        parts: Part[];
    }[];
    revertMessageID?: string;
    signal: AbortSignal;
}): Promise<{
    user: {
        info: Message;
        parts: Part[];
    };
    context: import("@/lib/opencode/model").SyntheticMessage[];
    assistant: {
        info: import("@/lib/opencode/model").AssistantMessage;
        parts: Part[];
    };
}[]>;
