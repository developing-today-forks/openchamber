import React from 'react';
/**
 * Settings → Chat → Assistance → Model choices: whether the server records
 * the models and efforts picked by hand, how many choices it keeps, and a
 * button that clears them. Not offered in VS Code, which has no OpenChamber
 * server.
 */
export declare const ModelChoiceSettings: React.FC;
/**
 * The goal writer default the recorded goal-window picks support, shown
 * under the goal writer model field with Approve and Decline. Approve has the
 * server write the setting and hands the written values back so the field
 * shows them; either answer is final, and the server never offers that
 * suggestion again. Nothing shows while recording is off, the history cannot
 * be read, or no habit is clear.
 */
export declare const GoalWriterChoiceSuggestion: React.FC<{
    disabled?: boolean;
    onApproved: (settings: {
        sessionGoalWriterModel: string;
        sessionGoalWriterVariant: string;
    }) => void;
}>;
