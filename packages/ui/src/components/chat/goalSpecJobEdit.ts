import { opencodeClient } from '@/lib/opencode/client';
import { getRuntimeKey } from '@/lib/runtime-switch';
import { useGoalSpecJobStore, type GoalSpecJob } from '@/stores/goalSpecJobStore';
import { useSessionGoalArmStore } from '@/stores/useSessionGoalArmStore';
import { useInputStore, type ComposerEditTarget } from '@/sync/input-store';
import { useSessionUIStore } from '@/sync/session-ui-store';
import { getSyncMessages } from '@/sync/sync-refs';

/**
 * Back to edit: the job ends and its message, files and chips included, goes
 * back to a composer; an armed goal is armed again, as before the send. The
 * composer is the session's, unless the job is a new chat's: the composer
 * made that session from the draft for this message, and while nothing was
 * sent in it, the session is removed and a new-session draft takes the
 * message, so no empty session stays behind.
 */
export async function takeGoalSpecJobBack(job: GoalSpecJob): Promise<void> {
    const runtimeKey = getRuntimeKey();
    const message = await useGoalSpecJobStore.getState().editJob(job);
    const target = job.newSession ? await replaceEmptySessionWithDraft(job, runtimeKey) : null;
    useInputStore.getState().requestComposerEdit({
        runtimeKey,
        target: target ?? { kind: 'session', sessionId: job.sessionId },
        content: message.content,
        attachments: message.attachments,
        context: message.context,
    });
    // The arm belongs to no runtime, so after a switch away from the job's it
    // would make the next send on the runtime now active a goal.
    if (job.trigger === 'armed' && getRuntimeKey() === runtimeKey) useSessionGoalArmStore.getState().setArmed(true);
}

/**
 * Removes the session a new chat's job was made in. If the user is still on
 * that session, opens a new-session draft in its place. If they switch sessions
 * while removal is pending, returns the selected session or draft as the
 * message's composer target. Returns null when the session stays because it is
 * not on screen, has a message (in this window or on the server), OpenCode
 * could not say, removal failed, or the runtime changed.
 */
async function replaceEmptySessionWithDraft(job: GoalSpecJob, runtimeKey: string): Promise<ComposerEditTarget | null> {
    const emptyOnScreen = () => useSessionUIStore.getState().currentSessionId === job.sessionId
        && getSyncMessages(job.sessionId, job.directory).length === 0;
    if (!emptyOnScreen()) return null;
    let empty: boolean;
    try {
        const page = await opencodeClient.getSessionMessages(job.sessionId, { limit: 1 }, job.directory);
        empty = page.items.length === 0;
    } catch (error) {
        console.warn('[goal-spec-jobs] could not check the session before removing it:', error);
        return null;
    }
    if (!empty || runtimeKey !== getRuntimeKey() || !emptyOnScreen()) return null;
    const draftIdBeforeDelete = useSessionUIStore.getState().newSessionDraft.draftId;
    if (!(await useSessionUIStore.getState().deleteSession(job.sessionId, { expectedRuntimeKey: runtimeKey }))) return null;
    if (runtimeKey !== getRuntimeKey()) return null;
    const sessionUI = useSessionUIStore.getState();
    if (sessionUI.currentSessionId && sessionUI.currentSessionId !== job.sessionId) {
        return { kind: 'session', sessionId: sessionUI.currentSessionId };
    }
    if (sessionUI.currentSessionId === null
        && sessionUI.newSessionDraft.open
        && sessionUI.newSessionDraft.draftId !== draftIdBeforeDelete) {
        return { kind: 'draft', draftId: sessionUI.newSessionDraft.draftId };
    }
    const deletionClearedSelection = sessionUI.currentSessionId === null
        && sessionUI.newSessionDraft.draftId === draftIdBeforeDelete;
    if (sessionUI.currentSessionId !== job.sessionId && !deletionClearedSelection) return null;
    // A chat's directory names no project, so it opens another chat.
    sessionUI.openNewSessionDraft({ directoryOverride: job.directory });
    return { kind: 'draft', draftId: useSessionUIStore.getState().newSessionDraft.draftId };
}
