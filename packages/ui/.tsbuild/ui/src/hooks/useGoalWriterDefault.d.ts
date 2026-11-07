type GoalWriterDefault = {
    providerID: string;
    modelID: string;
    variant: string | null;
} | null;
/**
 * The Settings writer model and effort, read once when a goal window opens.
 * Null until read, and when Settings name no writer model (the session's own
 * model writes then).
 */
export declare function useGoalWriterDefault(): GoalWriterDefault;
export {};
