/**
 * How long a goal objective may be, and how much of it the progress check
 * reads. The server applies the same bounds (`goalObjectiveLimits` in
 * `session-goal/objectives.js`) and reads both from Settings itself.
 */
export declare const DEFAULT_SESSION_GOAL_OBJECTIVE_CHAR_LIMIT = 5000;
export declare const DEFAULT_SESSION_GOAL_CHECK_OBJECTIVE_CHAR_LIMIT = 20000;
export declare const SESSION_GOAL_CHAR_LIMIT_MIN = 1000;
/** Also the most a goal keeps when its limit is switched off. */
export declare const SESSION_GOAL_CHAR_LIMIT_MAX = 1000000;
export declare const isSessionGoalCharLimit: (value: number) => boolean;
