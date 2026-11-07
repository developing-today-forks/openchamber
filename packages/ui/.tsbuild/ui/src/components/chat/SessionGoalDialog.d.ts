import { type GoalEditDraft } from '@/stores/useGoalEditStore';
interface SessionGoalDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sessionId: string;
    directory?: string;
    /** An edit that did not land, brought back by the card above the composer. */
    initialDraft?: GoalEditDraft;
}
export declare function SessionGoalDialog({ open, onOpenChange, sessionId, directory, initialDraft }: SessionGoalDialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
