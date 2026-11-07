import React from 'react';
export type ReviewFlowExecution = {
    providerID: string;
    modelID: string;
    variant: string;
    agent: string;
    generateHandoff: boolean;
    autoReview: boolean;
};
type ReviewFlowDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectDirectory: string | null;
    submitting?: boolean;
    onConfirm: (execution: ReviewFlowExecution) => Promise<void> | void;
};
declare function ReviewFlowDialogView({ open, onOpenChange, projectDirectory, submitting, onConfirm, }: ReviewFlowDialogProps): import("react/jsx-runtime").JSX.Element;
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const ReviewFlowDialog: React.MemoExoticComponent<typeof ReviewFlowDialogView>;
export {};
