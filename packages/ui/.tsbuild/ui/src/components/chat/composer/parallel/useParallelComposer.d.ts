export type ParallelModel = {
    providerID: string;
    modelID: string;
    variant?: string;
    displayName?: string;
    count: number;
};
export type ParallelVariant = {
    id: string;
    text: string;
    models: ParallelModel[];
};
export type ParallelFuseJudge = {
    providerID: string;
    modelID: string;
    variant?: string;
    displayName?: string;
};
export type ParallelComposerState = {
    variants: ParallelVariant[];
    active: number;
    isolate: boolean;
    baseBranch: string;
    /** Null until the project's commands are loaded. */
    setupCommands: string[] | null;
    fuse: ParallelFuseJudge | null;
};
export type ParallelComposerModelInput = Omit<ParallelModel, 'count'>;
/**
 * "Run in parallel" state of the composer. The editor keeps showing one
 * prompt, the active variant's: switching tabs stores the editor text in the
 * variant it leaves and loads the one it opens, so autocomplete, drafts and
 * attachments stay the composer's own. Only offered on a new-session draft.
 */
export declare function useParallelComposer(input: {
    enabled: boolean;
    draftOpen: boolean;
    draftProjectId: string | null;
    message: string;
    setMessage: (text: string) => void;
}): {
    state: ParallelComposerState | null;
    isActive: boolean;
    isLaunching: boolean;
    runCount: number;
    enter: (text?: string) => void;
    exit: () => void;
    addModel: (model: ParallelComposerModelInput) => void;
    setModelVariant: (index: number, variant: string | undefined) => void;
    incrementModel: (index: number) => void;
    decrementModel: (index: number) => void;
    addVariant: () => void;
    switchVariant: (target: number) => void;
    removeVariant: (target: number) => void;
    setIsolate: (isolate: boolean) => void;
    setBaseBranch: (baseBranch: string) => void;
    setSetupCommands: (setupCommands: string[]) => void;
    setFuse: (fuse: ParallelFuseJudge | null) => void;
    launch: () => Promise<void>;
};
export type ParallelComposer = ReturnType<typeof useParallelComposer>;
