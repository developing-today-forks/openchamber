/**
 * Assembling what the composer actually sends.
 *
 * A single send can carry more than what the user just typed: messages queued
 * while the previous turn ran, inline review comments, `@file` references
 * resolved to attachments, linked issues and PRs, synthetic parts from
 * conflict resolution, and the skills mentioned inline.
 *
 * OpenCode takes one primary message plus additional parts, so all of that has
 * to be flattened into that shape — and the flattening has rules that are easy
 * to get wrong and impossible to see when they are spread through a 400-line
 * handler. They are stated here, as a pure function over injected resolvers,
 * so the ordering can be tested rather than trusted.
 */
import type { JsonValue } from '@openchamber/sdk';
import type { AttachedFile } from '@/stores/types/sessionTypes';
import type { SourceControlProvider } from '@/lib/api/types';
import type { InlineCommentDraft } from '@/stores/useInlineCommentDraftStore';
import type { QueuedContextPart, QueuedMessage } from '@/stores/messageQueueStore';
import { type ContextPartMetadata } from '@/lib/messages/contextParts';
export interface OutgoingPart {
    text: string;
    attachments?: AttachedFile[];
    /** Synthetic parts are context for the model, not shown as user content. */
    synthetic?: boolean;
    /** Structured context (see contextParts.ts), persisted with the part. */
    metadata?: ContextPartMetadata;
}
export interface OutgoingMessage {
    primaryText: string;
    primaryAttachments: AttachedFile[];
    additionalParts: OutgoingPart[];
    /** The agent the first `@agent` mention routed to, if any. */
    agentMentionName?: string;
    /**
     * Skills the composer text names inline, deduped in order of appearance.
     * The send attaches them to the prompt (see `SkillMentions`); queued
     * messages already carry the instruction they were queued with.
     */
    skillNames: string[];
    /** True when there is nothing worth sending. */
    isEmpty: boolean;
}
/**
 * A queued message is already resolved: its agent mention was stripped, its
 * file mentions became attachments, and the context the composer had attached
 * travels with it. Assembly only places it.
 */
export interface QueuedInput {
    text: string;
    agentMention?: string;
    attachments?: AttachedFile[];
    context?: readonly QueuedContextPart[];
}
export declare const selectComposerQueue: (messages: readonly QueuedMessage[]) => readonly QueuedMessage[];
/** An issue, PR or tracker item attached to the composer, as it is sent. */
export type ComposerContextReference = {
    kind: 'repository-issue';
    provider?: SourceControlProvider;
    number: number;
    title: string;
    url: string;
    contextText: string;
} | {
    kind: 'change-request';
    provider: SourceControlProvider;
    number: number;
    title: string;
    url: string;
    context: string;
} | {
    kind: 'linear-issue';
    identifier: string;
    title: string;
    url: string;
    contextText: string;
} | {
    kind: 'guest';
    providerId: string;
    id: string;
    title: string;
    url: string;
    contextText: string;
    thread?: 'issue' | 'pull';
    /** Opaque guest payload; rides the context part metadata, not its text. */
    data?: JsonValue;
};
/** What the composer has attached besides text and files. */
export interface ComposerContextInput {
    /** Context drafts (code comments, terminal selections, annotations, PR context). */
    inlineComments: readonly InlineCommentDraft[];
    /** Synthetic context produced elsewhere (conflict resolution, and such). */
    syntheticTexts: readonly string[];
    /** Attached issues, PRs and tracker items, in the order they were attached. */
    references: readonly ComposerContextReference[];
}
export interface OutgoingMessageInput extends ComposerContextInput {
    /** Messages queued while a turn was running, oldest first. */
    queued: readonly QueuedInput[];
    /** The composer's own text, or null when this send skips it. */
    composerText: string | null;
    composerAttachments: readonly AttachedFile[];
}
/**
 * The parts of assembly that depend on stores or async config, injected so the
 * assembly itself stays pure.
 */
export interface OutgoingMessageDeps {
    /** Strip a leading `@agent` mention and report which agent it named. */
    parseAgentMention: (text: string) => {
        text: string;
        agentName?: string;
    };
    /** Resolve `@path` references into server-side attachments. */
    extractFileMentions: (text: string) => {
        text: string;
        attachments: AttachedFile[];
    };
    /** Normalize attachments for transport (server paths become file URLs). */
    sanitizeAttachments: (files: readonly AttachedFile[] | undefined) => AttachedFile[];
    /** Skills named with `$name`. */
    collectSkillNames: (text: string) => string[];
}
export declare function buildOutgoingMessage(input: OutgoingMessageInput, deps: OutgoingMessageDeps): OutgoingMessage;
/**
 * Everything the composer has attached besides text and files, in send
 * order. Each attached context item becomes its own synthetic part carrying
 * structured metadata, so the timeline can render it as a context block after
 * the server echoes the message back. Used both when sending and when queueing:
 * a queued message takes this context with it, so whoever delivers it later
 * sends exactly what the composer would have.
 */
export declare function buildComposerContext(input: ComposerContextInput, skillInstruction: string | null): QueuedContextPart[];
/** The synthetic parts a captured context is delivered as, in order. */
export declare function queuedContextToParts(context: readonly QueuedContextPart[]): OutgoingPart[];
/**
 * Expand `#snippet` references in the words of each attached comment, before
 * the comments become synthetic context. Only `text` expands: the quoted code
 * or message the comment points at is the user's evidence and stays verbatim.
 * A comment whose expansion fails is sent as written.
 */
export declare function expandCommentSnippets(drafts: readonly InlineCommentDraft[], expandText: (text: string) => Promise<string>): Promise<InlineCommentDraft[]>;
