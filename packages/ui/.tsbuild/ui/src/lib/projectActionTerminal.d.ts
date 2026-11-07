import type { CreateTerminalOptions, TerminalAPI, TerminalServerSession, TerminalSession, TerminalSessionPurpose } from './api/types';
type TerminalActionMutationRevisions = ReadonlyMap<string, number>;
type ProjectActionTerminalCreateOptions = Omit<Extract<CreateTerminalOptions, {
    mode: 'command';
}>, 'mode' | 'command' | 'sessionId'>;
type CreateProjectActionTerminalSessionOptions = {
    terminal: TerminalAPI;
    createOptions: ProjectActionTerminalCreateOptions;
    command: string;
    isRunStillExpected: () => boolean;
    purpose: Extract<TerminalSessionPurpose, {
        type: 'project-action';
    }>;
};
type StopProjectActionTerminalSessionOptions = {
    terminal: TerminalAPI;
    sessionId: string;
    isExecutionStillCurrent: () => boolean;
    markStopping: () => void;
    restoreRunning: () => void;
    clearSession: () => void;
    finalizeExit: () => void;
    timeoutMs?: number;
};
export declare const normalizeProjectActionCommand: (command: string) => string;
type ReconcileTerminalSessionAuthorityOptions = {
    captureStartedActionMutationRevisions?: (directory: string) => TerminalActionMutationRevisions;
};
type ReconcileTerminalSessionAuthorityResult = {
    sessions: TerminalServerSession[];
    startedActionMutationRevisions: TerminalActionMutationRevisions;
};
export declare const createProjectActionTerminalSession: ({ terminal, createOptions, command, isRunStillExpected, purpose, }: CreateProjectActionTerminalSessionOptions) => Promise<TerminalSession>;
export declare const waitForTerminalExit: (terminal: TerminalAPI, sessionId: string, timeoutMs: number) => Promise<boolean>;
export declare const stopProjectActionTerminalSession: ({ terminal, sessionId, isExecutionStillCurrent, markStopping, restoreRunning, clearSession, finalizeExit, timeoutMs, }: StopProjectActionTerminalSessionOptions) => Promise<void>;
export declare const reconcileTerminalSessionAuthority: (terminal: TerminalAPI, directory: string, options?: ReconcileTerminalSessionAuthorityOptions) => Promise<ReconcileTerminalSessionAuthorityResult | null>;
/** Groups a whole-server listing into the directory keys the terminal store uses. */
export declare const groupTerminalSessionsByDirectory: (sessions: TerminalServerSession[]) => Map<string, TerminalServerSession[]>;
export {};
