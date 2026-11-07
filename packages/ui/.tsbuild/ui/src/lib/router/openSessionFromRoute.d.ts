/**
 * Opens a session link and, for a message link, asks the session's timeline
 * to show that message: on entry, or right away if the session is open.
 */
export declare function openSessionLink(sessionId: string, messageId: string | null): Promise<void>;
/**
 * Select a session named by `/?session=`. Cold loads often do not know the
 * owning directory yet, so a first selection may guess the active project.
 * After the global session list is available, re-select with that directory
 * unless the user already moved to a different session.
 */
export declare function openSessionFromRoute(sessionId: string): Promise<void>;
