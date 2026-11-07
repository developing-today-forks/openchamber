import { type OpenChamberProjectAction, type ProjectRef } from '@/lib/openchamberConfig';
export type ProjectActionRunStatus = 'running' | 'waiting-for-preview' | 'stopping';
export interface ProjectActionRun {
    directory: string;
    actionId: string;
    tabId: string;
    sessionId: string;
    executionId: string;
    status: ProjectActionRunStatus;
}
export interface ProjectActionsRunnerOptions {
    projectRef: ProjectRef | null;
    directory: string;
    /** Test seam: the phone layout runs no actions. */
    allowMobile?: boolean;
}
export interface ProjectActionsRunner {
    /** False where actions cannot run: VS Code, phones, or no project. */
    available: boolean;
    /** The project's own actions, then auto-discovery where it is offered. */
    actions: OpenChamberProjectAction[];
    /** The action the Work Status row shows: a running one wins over the stored pick. */
    shown: OpenChamberProjectAction | null;
    isLoading: boolean;
    /**
     * Keeps run states current until the returned release is called: while any
     * view showing them asks, the server's terminals are listed every few
     * seconds, which picks up runs another client started or a process that
     * ended. Nothing polls while nothing shows.
     */
    observe: () => () => void;
    runOf: (action: OpenChamberProjectAction) => ProjectActionRun | null;
    /** Remembers the action as this project's pick. */
    select: (action: OpenChamberProjectAction) => void;
    /** Runs the action, through the shared-setup trust prompt when it comes from the repo. */
    run: (action: OpenChamberProjectAction) => void;
    stop: (action: OpenChamberProjectAction) => void;
    /** Stops a running action, runs an idle one, and ignores one already stopping. */
    toggle: (action: OpenChamberProjectAction) => void;
    openSettings: () => void;
}
export declare const useProjectActionsRunner: ({ projectRef, directory, allowMobile, }: ProjectActionsRunnerOptions) => ProjectActionsRunner;
