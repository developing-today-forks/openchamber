import { getRuntimeKey, subscribeRuntimeEndpointChanged } from '@/lib/runtime-switch';
import { useGoalSpecJobStore, type GoalSpecJob, type GoalSpecJobChoice, type GoalSpecJobMessage, type GoalSpecJobSettlement } from '@/stores/goalSpecJobStore';
import { createMessageQueueTarget } from '@/stores/messageQueueStore';
import { createGoalArm } from '@/stores/useSessionGoalArmStore';
import { useSessionUIStore } from '@/sync/session-ui-store';
import { toServerFileUrl } from './composer/attachments/filePaths';
import { buildOutgoingMessage } from './composer/submit/buildOutgoingMessage';

/**
 * Sends what the user picked on a goal writer card. The server sends a plain
 * message itself. A message with attachments or attached context is sent from
 * this window, since the server sends only text: the server hands back the
 * full message (`claim`), the session's send path delivers it with its goal
 * the way the composer sends a queued message it took back, and the server
 * hears how it went (`settle`). A failed send leaves the job open with the
 * reason, so nothing is lost.
 *
 * Into a working session the claim follows the user's follow-up setting, as a
 * message from the composer does: with queue the server holds it until the
 * agent's turn is over and then hands it to this window, which sends it then.
 *
 * The claim, the send and the report belong to the runtime that showed the
 * card. A claim answered after a switch to another runtime is not sent, since
 * this window can no longer reach the server that holds it. A send under way
 * when the window switches away goes unreported, so that server releases the
 * claim when it expires with a reason that says the message may have been
 * sent, and the card waits for the user to check the session first.
 */
export async function sendGoalSpecJob(job: GoalSpecJob, choice: GoalSpecJobChoice): Promise<void> {
    const jobs = useGoalSpecJobStore.getState();
    if (!job.composerOnly) {
        await jobs.sendJob(job, choice);
        return;
    }

    const runtimeKey = getRuntimeKey();
    const claimed = await jobs.claimJob(job, choice.kind, runtimeKey);
    if (getRuntimeKey() !== runtimeKey) throw new Error('The message was not sent because the runtime changed.');
    if (!claimed.waiting) {
        // The job as the claim found it, since its session may have moved to
        // another directory after the card showed it.
        await sendClaimed(claimed.job ?? job, choice, claimed.message, claimed.claimId, runtimeKey);
        return;
    }
    if (!claimed.claimId) throw new Error('The server queued the message without naming its claim');
    holdUntilHandedOver({ claimId: claimed.claimId, jobId: job.id, sessionId: job.sessionId, choice, message: claimed.message, runtimeKey });
}

/** A claim the server holds until the agent's turn is over; this window sends it when it is handed over. */
interface HeldClaim {
    claimId: string;
    jobId: string;
    sessionId: string;
    choice: GoalSpecJobChoice;
    message: GoalSpecJobMessage;
    runtimeKey: string;
}

/** Claims this window holds, by claim id. */
const heldClaims = new Map<string, HeldClaim>();
let stopWatchingJobs: (() => void) | null = null;

interface PendingSettlement {
    claimId: string;
    jobId: string;
    sessionId: string;
    settlement: GoalSpecJobSettlement;
    runtimeKey: string;
}
/** Settlements deferred because the runtime that holds the claim was not active. */
const pendingSettlements = new Map<string, PendingSettlement>();

const deferSettlement = (job: GoalSpecJob, claimId: string, settlement: GoalSpecJobSettlement, runtimeKey: string): void => {
    pendingSettlements.set(claimId, { claimId, jobId: job.id, sessionId: job.sessionId, settlement, runtimeKey });
};

export const flushGoalSpecJobSettlements = async (): Promise<void> => {
    const jobs = useGoalSpecJobStore.getState();
    for (const pending of Array.from(pendingSettlements.values())) {
        if (pending.runtimeKey !== getRuntimeKey()) continue;
        const job = jobs.jobs[pending.sessionId];
        if (!job || job.id !== pending.jobId) {
            pendingSettlements.delete(pending.claimId);
            continue;
        }
        try {
            await jobs.settleJob(job, pending.settlement, pending.runtimeKey);
            pendingSettlements.delete(pending.claimId);
        } catch (error) {
            console.warn('[goal-spec-jobs] deferred settlement failed:', error);
        }
    }
};

/**
 * Sends each held claim the server has handed over, once. A claim the job no
 * longer names (taken back, released, or followed by another window's claim
 * while this window was not listening) is dropped unsent.
 */
const sendHandedOver = () => {
    const { jobs } = useGoalSpecJobStore.getState();
    for (const held of Array.from(heldClaims.values())) {
        const current = jobs[held.sessionId];
        const named = current?.id === held.jobId && current.claimId === held.claimId;
        if (named && current.waiting) continue;
        heldClaims.delete(held.claimId);
        if (!named || !current.sending || held.runtimeKey !== getRuntimeKey()) continue;
        void sendClaimed(current, held.choice, held.message, held.claimId, held.runtimeKey).catch((error) => {
            // The job carries the reason: the failed send was reported with it.
            console.warn('[goal-spec-jobs] the queued message was not sent:', error);
        });
    }
    if (heldClaims.size === 0) {
        stopWatchingJobs?.();
        stopWatchingJobs = null;
    }
};

const holdUntilHandedOver = (held: HeldClaim) => {
    heldClaims.set(held.claimId, held);
    stopWatchingJobs ??= useGoalSpecJobStore.subscribe(sendHandedOver);
    // The hand-over can arrive before the claim's answer.
    sendHandedOver();
};

/**
 * Sends a claimed message through the session's send path and reports the
 * outcome under the claim, so a report from a window whose claim expired
 * never settles a newer one. The send and the report go to the runtime that
 * holds the claim; after a switch away from it the report is left out, since
 * `settleJob` reaches only the active runtime.
 */
async function sendClaimed(job: GoalSpecJob, choice: GoalSpecJobChoice, message: GoalSpecJobMessage, claimId: string | null, runtimeKey: string): Promise<void> {
    const jobs = useGoalSpecJobStore.getState();
    const claim = claimId ? { claimId } : {};
    const target = createMessageQueueTarget(job.sessionId, job.directory, runtimeKey);
    const outgoing = buildOutgoingMessage({
        queued: [{
            text: choice.kind === 'spec' && choice.sendMode === 'goal-as-message' ? choice.spec : message.text,
            agentMention: message.agentMention,
            attachments: message.attachments,
            context: message.context,
        }],
        composerText: null,
        composerAttachments: [],
        inlineComments: [],
        syntheticTexts: [],
        references: [],
    }, {
        // Captured like a queued message: mentions and skills were resolved then.
        parseAgentMention: (text) => ({ text }),
        extractFileMentions: (text) => ({ text, attachments: [] }),
        sanitizeAttachments: (files) => (files ?? []).map((file) => (
            file.source === 'server' && file.serverPath ? { ...file, dataUrl: toServerFileUrl(file.serverPath) } : file
        )),
        collectSkillNames: () => [],
    });

    // This send carries its goal. On the composer's shared arm it would go to
    // whichever held send consumes the arm first while OpenCode starts, and
    // arming or disarming the target meanwhile would replace it. The card's
    // length limit switch goes with it.
    const ignoreLimit = choice.ignoreLimit === true;
    const goalArm = choice.kind === 'spec'
        ? createGoalArm(true, choice.spec, { settled: true, briefAgent: choice.sendMode === 'with-message', ignoreLimit, tokenBudget: job.tokenBudget })
        : createGoalArm(job.trigger === 'armed', null, { settled: true, ignoreLimit, tokenBudget: job.tokenBudget });
    // The user message this send creates: a sent card hides once a user message follows it.
    let messageId: string | undefined;
    try {
        if (!target) throw new Error('The session of this goal spec has no directory');
        await useSessionUIStore.getState().sendMessage(
            outgoing.primaryText,
            job.sendConfig.providerID,
            job.sendConfig.modelID,
            job.sendConfig.agent,
            outgoing.primaryAttachments,
            outgoing.agentMentionName,
            outgoing.additionalParts.length > 0 ? outgoing.additionalParts : undefined,
            job.sendConfig.variant,
            'normal',
            { target, userInitiated: true, goalArm, onMessageID: (id) => { messageId = id; } },
        );
    } catch (error) {
        const reason = error instanceof Error && error.message ? error.message : 'The message could not be sent';
        const settlement = { outcome: null, error: reason, ...claim } as const;
        if (getRuntimeKey() === runtimeKey) {
            await jobs.settleJob(job, settlement as GoalSpecJobSettlement, runtimeKey).catch(() => undefined);
        } else if (claimId) {
            // The report cannot reach the runtime that holds the claim now;
            // keep it for when that runtime becomes active again.
            deferSettlement(job, claimId, settlement as GoalSpecJobSettlement, runtimeKey);
        }
        throw error;
    }
    const settlement = (choice.kind === 'spec'
        ? { outcome: { kind: 'spec', sendMode: choice.sendMode }, spec: choice.spec, messageId, ...claim }
        : { outcome: { kind: 'original', withGoal: job.trigger === 'armed' }, messageId, ...claim }) as GoalSpecJobSettlement;
    if (getRuntimeKey() !== runtimeKey) {
        if (claimId) deferSettlement(job, claimId, settlement, runtimeKey);
        return;
    }
    await jobs.settleJob(job, settlement, runtimeKey).catch((error) => {
        console.warn('[goal-spec-jobs] the sent message was reported after the runtime changed:', error);
    });
}

export const resetGoalSpecJobSendForRuntimeSwitch = (): void => {
    heldClaims.clear();
    if (stopWatchingJobs) {
        stopWatchingJobs();
        stopWatchingJobs = null;
    }
};

if (typeof window !== 'undefined') {
    subscribeRuntimeEndpointChanged(() => {
        void flushGoalSpecJobSettlements();
    });
}
