import type { ProjectRef } from '@/lib/projectContextApi';
/**
 * The model a session works with, for the goal writer to fall back on: the
 * composer's pick for the session, else the model of its last reply, else the
 * current picker.
 */
export declare function resolveSessionWriterModel(sessionId: string): {
    providerID: string | null;
    modelID: string | null;
};
/**
 * What "start a goal from the next message" hands the writer besides the
 * message: the session's earlier requests and answers, and the open work
 * around it. Best effort: a source that cannot be read leaves its part out,
 * since the message alone still makes a goal.
 */
export declare function collectGoalWriterContext(input: {
    sessionId: string | null;
    directory: string | null;
    project: ProjectRef | null;
    queuedMessages: readonly string[];
}): Promise<{
    conversation: string;
    openItems: string;
}>;
