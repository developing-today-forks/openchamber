import type { Message, Part } from '@/lib/opencode/model';
import type { SessionGoalAutoCreate, SessionGoalWriterSendMode } from '@/stores/useUIStore';
export type GoalSpecResult = {
    ok: true;
    spec: string;
    providerID: string;
    modelID: string;
    variant: string | null;
} | {
    ok: false;
    message: string;
};
/** A writer model and effort chosen in a goal window; it wins over the Settings writer model. */
export interface GoalWriterChoice {
    providerID: string;
    modelID: string;
    /** Null is the model's default effort. */
    variant: string | null;
}
/** How a send that went through the goal writer carries its goal. */
export type GoalSubmitChoice = {
    kind: 'spec';
    spec: string;
    sendMode: SessionGoalWriterSendMode;
    ignoreLimit: boolean;
}
/** The typed message is the objective, as it is without the writer. */
 | {
    kind: 'unchanged';
}
/** No goal: the message goes out as an ordinary one. */
 | {
    kind: 'none';
};
/**
 * Why the composer stops a send to write a goal: the user armed one, or the
 * session has none and "start a goal from the next message" is on.
 */
export type GoalWriterTrigger = 'armed' | 'auto-create';
export interface GoalWriterPlan {
    trigger: GoalWriterTrigger;
    /** Show the spec for approval; false sends it as soon as it is written. */
    review: boolean;
}
export interface GoalSpecRequest {
    /** What the spec is written from: the typed message or the goal text. */
    request: string;
    conversation?: string;
    openItems?: string;
    /** Scopes the model to the session's location, a space's included. */
    directory?: string | null;
    /** The session's model; the server uses it unless Settings names a writer model. */
    providerID?: string | null;
    modelID?: string | null;
    writer?: GoalWriterChoice | null;
    /** Write without the goal length limit. */
    ignoreLimit?: boolean;
    signal?: AbortSignal;
}
/** Ask the server for a goal spec. Never throws: a failure comes back with its reason. */
export declare function requestGoalSpec(input: GoalSpecRequest): Promise<GoalSpecResult>;
/**
 * Whether a send stops for the goal writer, and how. `eligible` is false for
 * sends the writer never touches: shell input, slash commands, side
 * questions, queue flushes and sends without text.
 */
export declare function planGoalWriter(input: {
    eligible: boolean;
    /** Goal mode can run here: enabled, outside VS Code, with a progress check available. */
    goalsAvailable: boolean;
    armed: boolean;
    /** The target session already carries a goal, in any status. */
    hasGoal: boolean;
    writerEnabled: boolean;
    rewriteAll: boolean;
    review: boolean;
    autoCreate: SessionGoalAutoCreate;
}): GoalWriterPlan | null;
/**
 * The goal-mode reminder sent with the first goal message. With a spec the
 * message is not the objective, so the spec goes along; the server builds the
 * same text for the goals it creates (`buildGoalIntroText` in
 * packages/web/server/lib/session-goal/create.js).
 */
export declare function buildGoalIntroReminder(tokenBudget: number | null, spec: string | null): string;
/**
 * Sent with a message the user wrote while changing a running goal: an edit
 * in place sends no intro reminder, so without this the agent works the
 * message's turn against the objective it was given before.
 */
export declare function buildGoalUpdateReminder(tokenBudget: number | null, objective: string): string;
type MessageRecord = {
    info: Message;
    parts: Part[];
};
/**
 * Earlier requests and the latest answers, so the writer can carry over what
 * is still unfinished. The session's first request always stays: it is often
 * the larger task the newest message continues. Then the newest turns, each
 * with the assistant's final response, as many as fit the budget.
 */
export declare function formatGoalWriterConversation(records: readonly MessageRecord[]): string;
export interface GoalWriterOpenItems {
    todos: readonly string[];
    plans: readonly string[];
    queued: readonly string[];
    subtasks: readonly string[];
}
/** Open work around the message, as labelled lists; empty when there is none. */
export declare function formatGoalWriterOpenItems(items: GoalWriterOpenItems): string;
export {};
