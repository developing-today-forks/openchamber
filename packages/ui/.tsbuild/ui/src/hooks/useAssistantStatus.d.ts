import type { Message, ModelRef, Part, StructuredError } from '@/lib/opencode/model';
import type { MessageStreamPhase } from '@/stores/types/sessionTypes';
type AssistantActivity = 'idle' | 'streaming' | 'tooling' | 'cooldown' | 'permission';
interface WorkingSummary {
    activity: AssistantActivity;
    hasWorkingContext: boolean;
    hasActiveTools: boolean;
    isWorking: boolean;
    isStreaming: boolean;
    isCooldown: boolean;
    lifecyclePhase: MessageStreamPhase | null;
    statusText: string | null;
    isGenericStatus: boolean;
    isWaitingForPermission: boolean;
    canAbort: boolean;
    compactionDeadline: number | null;
    activePartType?: 'text' | 'tool' | 'reasoning' | 'editing';
    activeToolName?: string;
    wasAborted: boolean;
    abortActive: boolean;
    lastCompletionId: string | null;
    isComplete: boolean;
    retryInfo: {
        attempt?: number;
        next?: number;
        resetsAt?: number;
    } | null;
    /**
     * The turn waits on work OpenCode can move to the background: a running
     * shell command or a subagent it delegated to (`session.background`),
     * including one running inside a Code Mode `execute` call.
     */
    canBackground: boolean;
}
interface FormingSummary {
    isActive: boolean;
    characterCount: number;
}
export interface AssistantStatusSnapshot {
    activeModel: ActiveAssistantModel | null;
    forming: FormingSummary;
    working: WorkingSummary;
}
interface ActiveAssistantModel {
    providerId: string;
    modelId: string;
}
interface ActiveAssistantContext {
    assistantId: string | null;
    model: ActiveAssistantModel | null;
}
type ParsedStatusResult = {
    activePartType: 'text' | 'tool' | 'reasoning' | 'editing' | undefined;
    activeToolName: string | undefined;
    statusText: string;
    isGenericStatus: boolean;
    canBackground: boolean;
};
/**
 * The turn waits on a job OpenCode can move to the background: a shell command
 * or a subagent call that already runs. A pending call has not started yet (or
 * waits for a permission), and a background call settles at once, so neither
 * counts. A running Code Mode `execute` counts when a shell or subagent runs
 * inside it.
 */
export declare const hasBackgroundableWork: (parts: readonly Part[]) => boolean;
export declare const createParsedStatus: (parts: Part[], genericKey: string) => ParsedStatusResult;
/**
 * `sessionModel` is the session record's own model: in OpenCode v2 a send
 * switches the session before the prompt goes out, so it names what the next
 * turn runs on before any assistant record exists.
 */
export declare const getActiveAssistantContext: (messages: Message[], sessionModel?: ModelRef | null) => ActiveAssistantContext;
/**
 * When a provider's rate limit lifts, from a `resets_at` field in the 429
 * body (top level or under `error`; an ISO date or epoch seconds/ms). OpenCode
 * caps a retry delay at 15 minutes, so a limit that lifts hours later shows
 * a retry that is bound to fail again; this time is the one that matters.
 * Only the body reaches the client: reset headers stay in OpenCode.
 */
export declare function limitResetsAt(error: StructuredError | undefined): number | undefined;
export declare function useAssistantStatus(): AssistantStatusSnapshot;
export {};
