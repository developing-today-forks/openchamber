import type { GoalSpecResult, GoalSubmitChoice, GoalWriterChoice, GoalWriterTrigger } from '@/lib/goalWriter';
import { type SessionGoalWriterSendMode } from '@/stores/useUIStore';
export interface GoalSpecDialogRequest {
    /** A new id starts a new writing run. */
    id: number;
    trigger: GoalWriterTrigger;
    /** False sends the spec as soon as it is written; the dialog only shows progress or a failure. */
    review: boolean;
    defaultSendMode: SessionGoalWriterSendMode;
    /** The model the message is sent with; it writes when Settings name no writer model. */
    sessionModel: {
        providerID: string;
        modelID: string;
    } | null;
    directory: string | null;
    /** Length of the message the goal is written from; only its size bucket is recorded. */
    inputLength: number;
    /** `writer` is a model picked in the dialog; null keeps the default. */
    write: (signal: AbortSignal, options: {
        writer: GoalWriterChoice | null;
        ignoreLimit: boolean;
    }) => Promise<GoalSpecResult>;
}
interface GoalSpecDialogProps {
    /** Non-null while a send waits on the goal writer. */
    request: GoalSpecDialogRequest | null;
    onCancel: () => void;
    onSubmit: (choice: GoalSubmitChoice) => void;
}
/**
 * The goal writer's step between pressing send and the message going out:
 * the spec is written, shown for approval (or sent at once when review is
 * off), and sent with the typed message or in its place. The composer keeps
 * the message until a choice is made, so closing the dialog loses nothing.
 */
export declare function GoalSpecDialog({ request, onCancel, onSubmit }: GoalSpecDialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
