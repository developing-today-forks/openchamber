import { type PermissionMode } from '@/stores/utils/permissionAutoAccept';
import type { Message, Part, Session } from '@/lib/opencode/model';
import { type SkillMentions } from '@/lib/opencode/client';
import type { ContextPartMetadata } from '@/lib/messages/contextParts';
import type { AttachedFile } from '@/stores/types/sessionTypes';
/**
 * `/btw <question>`: fork the main session into a temporary session and send
 * the question there.
 *
 * A fork (not an empty child) gives the agent the full inherited conversation
 * as its window context. The fork is created through the SDK directly (like
 * reviewFlow) so the main chat's `currentSessionId` is never switched; the
 * prompt is routed to the fork with `SendMessageOptions.sessionId`.
 *
 * The parent session's metadata carries `openchamber.btwSessionID` (see
 * `sessionBtwMetadata`), so the panel belongs to the parent session alone,
 * follows the user as they navigate between sessions, and survives reloads.
 */
export type StartBtwInput = {
    parentSessionId: string;
    expectedRuntimeKey?: string;
    question: string;
    directory: string;
    providerID: string;
    modelID: string;
    agent?: string;
    variant?: string | null;
    /** Absent: the fork is a new session and the server writes the default mode. */
    permissionMode?: PermissionMode;
    attachments?: AttachedFile[];
    additionalParts?: Array<{
        text: string;
        attachments?: AttachedFile[];
        synthetic?: boolean;
        metadata?: ContextPartMetadata;
    }>;
    /** Skills the question names inline, attached to its prompt. */
    skills?: SkillMentions;
};
/**
 * Sent as a synthetic part with every message inside a btw session.
 *
 * A btw session is a fork, so the model receives the parent's whole
 * conversation — including whatever plan was in flight when `/btw` was typed.
 * Without this the fork reads that plan as its own active task and carries on
 * with it instead of answering the side question, which is the opposite of
 * what `/btw` is for.
 *
 * The wording is deliberately position-independent: it names the history
 * inherited from the parent thread rather than "everything before this
 * boundary". The instruction rides along with each send instead of being
 * pinned once at fork time, so a positional phrasing would be re-anchored
 * every turn and would end up telling the model to disregard the btw
 * session's own earlier turns.
 */
export declare const BTW_BOUNDARY_INSTRUCTION: string;
/**
 * Sent with every message in a session that was promoted out of `/btw`.
 *
 * `BTW_BOUNDARY_INSTRUCTION` is persisted on each message the session sent
 * while it was a side conversation, and there is no API to remove a message
 * part after the fact — so promotion cannot delete those lines, only answer
 * them. Without this, a promoted session keeps reading "no sub-agents, do not
 * touch the workspace" out of its own history, in a session that is no longer
 * a side conversation.
 *
 * It rides along with every send for the same reason the boundary does: the
 * instructions it revokes are re-read on every turn, so a one-shot notice
 * would lose its position relative to them as the conversation grows.
 */
export declare const BTW_PROMOTION_NOTICE: string;
/**
 * The btw framing texts a composer send carries.
 *
 * The boundary instruction rides with every send routed to an active btw fork,
 * so the inherited transcript stays reference material for the whole side
 * conversation. The promotion notice is the opposite case: it tells a promoted
 * session that the btw constraints in its own history are lifted. A send routed
 * to a fresh fork is never that session, so the two never travel together.
 */
export declare const buildBtwSyntheticTexts: (state: {
    isBtwActive: boolean;
    isPromotedBtwSession: boolean;
}) => string[];
/**
 * The parent's last assistant turn that actually finished.
 *
 * `/btw` is typically typed *while* the main thread is working — that is the
 * moment a side question comes up. Forking at HEAD then clones a turn that is
 * still streaming: the fork inherits a truncated assistant message and the
 * user instruction that provoked it as the newest, most salient thing in its
 * context. Anchoring the fork to the last completed turn instead means the
 * inherited transcript is always a settled conversation.
 *
 * Returns `null` when the parent has no completed assistant turn yet (a brand
 * new session); the caller then keeps the previous fork-at-HEAD behavior.
 */
export declare const findLastCompletedAssistantMessageID: (messages: readonly Message[]) => string | null;
export declare const btwSessionTitle: (question: string) => string;
/** Preparation can be discarded until the server-side fork starts. */
export declare function preparePendingBtwSend(parentSessionId: string, expectedRuntimeKey: string, prepare: () => Promise<void>): Promise<symbol | null>;
export declare function startBtwSession(input: StartBtwInput): Promise<Session>;
/**
 * Records are a chronologically ordered suffix of the session. Keep everything
 * after the inherited-history marker; an absent marker is outside that suffix.
 * Message IDs are identities, not timestamps (including client-generated IDs).
 */
export declare function filterBtwTailMessages(records: Array<{
    info: Message;
    parts: Part[];
}>, boundaryMessageID: string | null): Array<{
    info: Message;
    parts: Part[];
}>;
export type BtwSessionRef = {
    parentSessionId: string;
    btwSessionId: string;
    directory: string;
};
/**
 * Destroy the temporary fork. The panel disappears immediately (optimistic
 * `destroying` flag); the parent is unlinked and the fork deleted in the
 * background. Resolves `false` when the server could not confirm deletion —
 * the fork then remains in the sidebar and the caller should surface that.
 */
export declare function destroyBtwSession(ref: BtwSessionRef): Promise<boolean>;
/**
 * Keep the fork as a normal session: unlink it from the parent, drop its btw
 * marker, and navigate to it. The conversation continues there as a regular
 * session.
 */
export declare function promoteBtwSession(ref: BtwSessionRef): Promise<void>;
