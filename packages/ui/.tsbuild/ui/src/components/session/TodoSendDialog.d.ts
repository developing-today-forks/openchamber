type TodoSendTarget = 'session' | 'worktree';
export type TodoSendExecution = {
    providerID: string;
    modelID: string;
    variant: string;
    agent: string;
    runAsGoal?: boolean;
};
type TodoSendDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    target: TodoSendTarget;
    projectDirectory: string | null;
    submitting?: boolean;
    /** Offer a "Run as goal" checkbox (hidden in VS Code, where the loop does not run). */
    allowRunAsGoal?: boolean;
    onConfirm: (execution: TodoSendExecution) => Promise<void> | void;
};
export declare function TodoSendDialog(props: TodoSendDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
