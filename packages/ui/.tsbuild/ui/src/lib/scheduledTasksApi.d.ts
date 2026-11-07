export type ScheduledTaskStatus = 'idle' | 'running' | 'success' | 'error' | 'queued' | 'sent' | 'skipped' | 'failed' | 'cancelled' | 'timeout';
export type ScheduledTask = {
    id: string;
    name: string;
    enabled: boolean;
    targetSessionId?: string;
    /** Absolute path of the `.agents/loops/*.md` file driving this task, when
     *  any. Present only for loop-sourced tasks; unknown to older clients. */
    loopFile?: string;
    /** Per-task run limit in milliseconds (#765). Absent = inherit the
     *  server-wide `scheduledTasksMaxRunDurationMs` setting / shipped default. */
    maxRunDurationMs?: number;
    /** Why a repository loop whose file says `enabled: true` is paused here:
     *  never enabled on this machine (`required`), or changed since it was
     *  (`outdated`). Absent when nothing holds the loop back. */
    loopApproval?: 'required' | 'outdated';
    schedule: {
        kind: 'daily' | 'weekly' | 'once' | 'cron';
        times?: string[];
        time?: string;
        date?: string;
        weekdays?: number[];
        cron?: string;
        timezone?: string;
    };
    execution: {
        prompt: string;
        /** Absent on a task that follows the session defaults and was never pinned. */
        providerID?: string;
        modelID?: string;
        /** Model, thinking level and agent come from the session defaults at run time. */
        useDefaults?: boolean;
        variant?: string;
        agent?: string;
        goalEnabled?: boolean;
        goalTokenBudget?: number;
        permissionAutoAccept?: boolean;
    };
    state: {
        createdAt: number;
        updatedAt: number;
        lastRunAt?: number;
        lastStatus?: ScheduledTaskStatus;
        lastError?: string;
        lastDurationMs?: number;
        lastSessionId?: string;
        nextRunAt?: number;
    };
};
export declare const fetchScheduledTasks: (projectID: string) => Promise<ScheduledTask[]>;
export declare const upsertScheduledTask: (projectID: string, task: Partial<ScheduledTask>) => Promise<ScheduledTask[]>;
/**
 * Which of the candidates a save or run would accept, answered by the
 * scheduler's own membership rule so the picker can never disagree with it.
 * The route takes at most 500 candidates, so larger lists go in batches. A
 * failed request or a malformed answer throws: the caller shows an error
 * instead of an empty list that looks like "no sessions".
 */
export declare const fetchEligibleScheduledTaskTargets: (projectID: string, candidates: Array<{
    sessionId: string;
    directory: string;
}>, signal?: AbortSignal) => Promise<Set<string>>;
export declare const deleteScheduledTask: (projectID: string, taskID: string) => Promise<ScheduledTask[]>;
export declare const setLoopScheduledTaskEnabled: (projectID: string, taskID: string, enabled: boolean) => Promise<void>;
export declare const deleteScheduledTaskLoopFile: (projectID: string, taskID: string) => Promise<void>;
export declare const syncScheduledTaskLoops: (projectID: string) => Promise<void>;
/** Run now refused because the task already has a run in flight or queued. */
export declare class ScheduledTaskBusyError extends Error {
    readonly busy: 'running' | 'queued';
    constructor(busy: 'running' | 'queued', message: string);
}
export declare const runScheduledTaskNow: (projectID: string, taskID: string) => Promise<{
    sessionId?: string;
    directory?: string;
    persistError?: string;
}>;
