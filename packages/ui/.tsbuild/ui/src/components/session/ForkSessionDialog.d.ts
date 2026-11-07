export type ForkSessionExecution = {
    providerID: string;
    modelID: string;
    variant: string;
    agent: string;
    instructions: string;
    createWorktree?: boolean;
    runAsGoal?: boolean;
};
type ForkSessionDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectDirectory: string | null;
    sourceSessionId: string | null;
    worktreeProjectDirectory: string | null;
    submitting?: boolean;
    onConfirm: (execution: ForkSessionExecution) => Promise<void> | void;
};
export declare function ForkSessionDialog(props: ForkSessionDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
