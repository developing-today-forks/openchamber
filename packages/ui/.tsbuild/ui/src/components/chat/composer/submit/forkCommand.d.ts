/**
 * `/fork [text]`: fork the current session after its last finished turn, open
 * the fork, and send the text there. The source session, including a turn it
 * is still running, is never touched.
 *
 * A failed fork throws so the composer restores the command and reports it.
 * A fork that succeeded but whose send failed must not lose the text: it goes
 * into the fork's composer, where the user now is.
 */
import type { Session } from '@/lib/opencode/model';
import type { ChatDraftIdentity } from '@/lib/chatDraftPersistence';
export interface ForkSendSelection {
    providerID: string;
    modelID: string;
    agent?: string;
    variant?: string;
}
export interface ForkCommandDeps {
    fork: (sessionId: string) => Promise<Session | null>;
    directoryFor: (session: Session) => string | null;
    send: (text: string, selection: ForkSendSelection, target: {
        sessionId: string;
        directory?: string;
    }) => Promise<void>;
    draftIdentity: (directory: string | null, sessionId: string) => ChatDraftIdentity | null;
    restoreText: (target: ChatDraftIdentity, text: string) => void;
}
/** `forked`: opened, nothing to send. `sent`: the text went out. `send-failed`: the text waits in the fork's composer. `stale`: the runtime changed mid-fork. */
export type ForkCommandOutcome = 'forked' | 'sent' | 'send-failed' | 'stale';
export declare function runForkCommand(sourceSessionId: string, prompt: string, selection: ForkSendSelection, deps: ForkCommandDeps): Promise<ForkCommandOutcome>;
