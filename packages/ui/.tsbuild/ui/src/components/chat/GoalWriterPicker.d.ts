import type { GoalWriterChoice } from '@/lib/goalWriter';
interface GoalWriterPickerProps {
    directory?: string | null;
    /** The model the session works with; it writes when Settings name no writer model. */
    sessionModel: {
        providerID: string;
        modelID: string;
    } | null;
    /** A choice made in this window, or null to keep the default. */
    value: GoalWriterChoice | null;
    onChange: (value: GoalWriterChoice) => void;
    disabled?: boolean;
}
/**
 * Which model, at which effort, writes this goal spec. It starts on the
 * default (the Settings writer model, else the session's model); a change
 * applies to this window only unless the user remembers it, or Settings say
 * to remember every choice.
 */
export declare function GoalWriterPicker({ directory, sessionModel, value, onChange, disabled }: GoalWriterPickerProps): import("react/jsx-runtime").JSX.Element;
export {};
