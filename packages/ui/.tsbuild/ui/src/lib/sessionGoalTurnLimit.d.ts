/**
 * How many automatic turns a goal may take before it stops for the user. The
 * server applies the same bounds (`session-goal/runtime.js`).
 */
export declare const DEFAULT_SESSION_GOAL_MAX_AUTO_TURNS = 20;
export declare const SESSION_GOAL_MAX_AUTO_TURNS_LIMIT = 200;
export declare const isSessionGoalMaxAutoTurns: (value: number) => boolean;
