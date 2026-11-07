export type LastSessionRestoreResult = 
/** The session left open last time is selected again. */
'restored'
/** Nothing to restore: no pointer, the session is gone, or something else was opened meanwhile. */
 | 'none'
/** The session list could not be read; the pointer is kept for a later attempt. */
 | 'failed';
/**
 * Reopens the session that was open when the app last closed, on launch.
 *
 * The pointer is written on every session switch and dropped when the user
 * opens a draft themselves (`openNewSessionDraft`), so it names exactly what
 * was on screen at close. The automatic boot draft does not count as a
 * choice and is replaced. Anything opened while the session list loads (a
 * link, a click) wins, as does a user draft, which clears the pointer.
 */
export declare const restoreLastActiveSession: (options: {
    /** Read the session list fresh rather than accept one already loaded (mobile reconnects). */
    readonly refresh: boolean;
}) => Promise<LastSessionRestoreResult>;
/**
 * Launch restore for the web and desktop shell. Call it before the chat's
 * first passive effects, which open the automatic draft when nothing is
 * selected. With `selectNow` it selects the last session at once when its
 * directory is known; otherwise, or without a directory, it waits for the
 * session list as `restoreLastActiveSession` does. Returns the confirmation
 * attempt; `failed` means the session list could not be read yet, and the
 * caller runs the attempt again once startup completes.
 */
export declare const beginLastSessionRestore: (options: {
    /** False when a route already names a session to open. */
    readonly selectNow: boolean;
}) => (() => Promise<LastSessionRestoreResult>);
