/**
 * What the open session does when the user marks it done or archives it.
 *
 * The session actions own the state change; where the user goes next depends
 * on what the sidebar shows, so the desktop sidebar registers a planner while
 * it is mounted. The plan is made before the request goes out, from the list
 * the user is looking at, and applied only once the server confirmed the
 * change and only if that session is still the open one. Without a planner
 * (the phone sheet, VS Code before its sidebar mounts) done keeps the session
 * open and archive closes it, as before.
 */
type SessionLeaveKind = 'done' | 'archive';
export type SessionLeavePlan = {
    /**
     * The session to open once the action succeeded. Null keeps a session
     * marked done open, and opens nothing in place of an archived one.
     */
    next: {
        id: string;
        directory: string | null;
    } | null;
    /** Runs after the action succeeded and `next` was applied. */
    afterCommit?: () => void;
    /** Undoes what planning changed, when the action failed. */
    cancel?: () => void;
};
type SessionLeavePlanner = (sessionId: string, kind: SessionLeaveKind, leavingIds: ReadonlySet<string>) => SessionLeavePlan | null;
export type PlannedSessionLeave = {
    sessionId: string;
    plan: SessionLeavePlan;
};
/** Registers the planner; the returned function unregisters it unless another one replaced it. */
export declare const registerSessionLeavePlanner: (next: SessionLeavePlanner) => (() => void);
/**
 * The plan for the open session when `ids` leave their place, or null when
 * the open session is not among them or no planner is registered.
 */
export declare const planOpenSessionLeave: (currentSessionId: string | null, ids: readonly string[], kind: SessionLeaveKind) => PlannedSessionLeave | null;
export {};
