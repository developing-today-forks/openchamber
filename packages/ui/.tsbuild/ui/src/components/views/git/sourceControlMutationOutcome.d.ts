export declare const hasUnknownMutationOutcomeCode: (error: Error) => boolean;
export declare function reconcileUnknownMutationOutcome(options: {
    error: Error;
    isCurrent: () => boolean;
    refresh: () => Promise<void>;
    scheduleRefresh: () => void;
}): Promise<boolean>;
