import { opencodeClient } from '@/lib/opencode/client';
import { getRuntimeKey } from '@/lib/runtime-switch';
import { createChatDraftIdentity } from '@/lib/chatDraftPersistence';
import { CHAT_DRAFT_PROJECT_ID } from '@/lib/chatDirectories';
import { useGoalSpecJobStore, type GoalSpecJob } from '@/stores/goalSpecJobStore';
import { useSessionGoalArmStore } from '@/stores/useSessionGoalArmStore';
import { useInputStore } from '@/sync/input-store';
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
    const draftId = job.newSession ? await replaceEmptySessionWithDraft(job, runtimeKey) : null;
    const target = createChatDraftIdentity(
        runtimeKey,
        draftId === null ? job.directory : CHAT_DRAFT_PROJECT_ID,
        draftId === null ? job.sessionId : null,
    );
    if (target) {
        useInputStore.setState({
            pendingComposerRestore: {
                target,
                text: message.content,
                files: message.attachments.map(({ dataUrl, mimeType, filename }) => ({ url: dataUrl, mimeType, filename })),
            },
            pendingComposerContextRestore: message.context.length > 0 ? { target, context: message.context } : null,
        });
    }
    // The arm belongs to no runtime, so after a switch away from the job's it
    // would make the next send on the runtime now active a goal.
    if (job.trigger === 'armed' && getRuntimeKey() === runtimeKey) useSessionGoalArmStore.getState().setArmed(true);
}

/**
 * Removes the session a new chat's job was made in and opens a new-session
 * draft in its place. Answers the draft's id, or null when the session
 * stays: it is not the one on screen, it has a message (in this window or on
 * the server), OpenCode could not say, or the removal failed. A session with
 * any message is never removed. The window is checked again once OpenCode
 * answers, since a message sent from it or a switch to another session or
 * runtime during that read keeps the session too.
 */
async function replaceEmptySessionWithDraft(job: GoalSpecJob, runtimeKey: string): Promise<number | null> {
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
    if (!(await useSessionUIStore.getState().deleteSession(job.sessionId, { expectedRuntimeKey: runtimeKey }))) return null;
    // A chat's directory names no project, so it opens another chat.
    useSessionUIStore.getState().openNewSessionDraft({ directoryOverride: job.directory });
    return useSessionUIStore.getState().newSessionDraft.draftId;
}
