/**
 * Send-failure classification.
 *
 * Pure predicates over an unknown error value: no store, SDK, or transport
 * imports. They live outside `session-actions` so callers (and their tests) can
 * use the real classifier instead of re-implementing a partial mirror of it.
 */
export declare function getErrorStatus(error: unknown): number | null;
export declare function isAmbiguousSendFailure(error: unknown): boolean;
