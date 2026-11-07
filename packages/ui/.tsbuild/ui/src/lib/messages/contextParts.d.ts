/**
 * Structured context attached to an outgoing message.
 *
 * Every user-attached context item — an inline code comment, a terminal
 * selection, a browser annotation, a GitHub PR comment or failed check, a
 * linked issue or PR — is sent as its own synthetic text part. The part's
 * `text` is what the model reads; the part's `metadata[CONTEXT_METADATA_KEY]`
 * carries the same information structured, so the timeline can render the
 * context as a dedicated block after the message round-trips through the
 * OpenCode server (which persists part metadata verbatim).
 *
 * This module owns both directions: building the part at send time and
 * parsing the metadata back at render time. Keeping them together is what
 * guarantees they cannot drift apart.
 */
import { z } from 'zod';
import type { SourceControlProvider } from '@/lib/api/types';
import type { JsonValue } from '@openchamber/sdk';
import type { Metadata } from '@/lib/opencode/model';
import type { InlineCommentDraft } from '@/stores/useInlineCommentDraftStore';
import { type ChatQuoteAnchor } from '@/lib/chatQuoteAnchor';
export declare const CONTEXT_METADATA_KEY = "openchamberContext";
declare const OPENCODE_COMMENT_METADATA_KEY = "opencodeComment";
export type CodeCommentContext = {
    kind: 'code-comment';
    source: 'diff' | 'file' | 'plan';
    fileLabel: string;
    startLine: number;
    endLine: number;
    side?: 'original' | 'modified';
    language: string;
    code: string;
    text: string;
};
type TerminalContextPayload = {
    kind: 'terminal';
    terminalId: string;
    terminalLabel: string;
    startLine: number;
    endLine: number;
    output: string;
};
type BrowserAnnotationContext = {
    kind: 'browser-annotation';
    pageUrl: string;
    /** The full annotation prompt shown to the model. */
    prompt: string;
    text: string;
};
type PrCommentContext = {
    kind: 'pr-comment';
    label: string;
    body: string;
    text: string;
    /** Absent on messages from before GitLab: those are GitHub. */
    provider?: SourceControlProvider;
};
type PrCheckContext = {
    kind: 'pr-check';
    label: string;
    output: string;
    text: string;
    /** Absent on messages from before GitLab: those are GitHub. */
    provider?: SourceControlProvider;
};
type RepositoryIssueContext = {
    kind: 'repository-issue';
    /** Absent on messages from before GitLab: those are GitHub. */
    provider?: SourceControlProvider;
    number: number;
    title: string;
    url: string;
};
type FileQuoteContext = {
    kind: 'file-quote';
    fileLabel: string;
    /** Present when the fragment could be located in the file source. */
    startLine?: number;
    endLine?: number;
    quote: string;
    text: string;
};
type ChatQuoteContext = {
    kind: 'chat-quote';
    /** The message the quote came from, when known. */
    messageId?: string;
    /** Where the quote sits in that message's rendered text, when captured. */
    anchor?: ChatQuoteAnchor;
    quote: string;
    text: string;
};
type ChangeRequestContext = {
    kind: 'change-request';
    /** Absent on messages written before providers other than GitHub existed. */
    provider?: SourceControlProvider;
    number: number;
    title: string;
    url: string;
};
type LinearIssueContext = {
    kind: 'linear-issue';
    identifier: string;
    title: string;
    url: string;
};
type GuestIssueContext = {
    kind: 'guest-issue';
    providerId: string;
    id: string;
    title: string;
    url: string;
    /** Opaque guest payload; stored for the round trip back to the guest, never rendered. */
    data?: JsonValue;
};
type GuestPrContext = {
    kind: 'guest-pr';
    providerId: string;
    id: string;
    title: string;
    url: string;
    data?: JsonValue;
};
export type ContextPartPayload = CodeCommentContext | TerminalContextPayload | BrowserAnnotationContext | PrCommentContext | PrCheckContext | FileQuoteContext | ChatQuoteContext | RepositoryIssueContext | ChangeRequestContext | LinearIssueContext | GuestIssueContext | GuestPrContext;
type OpenCodeCommentMetadata = {
    path: string;
    selection?: {
        startLine: number;
        endLine: number;
        startChar?: number;
        endChar?: number;
    };
    comment: string;
    preview?: string;
    origin?: 'file' | 'review';
};
export type ContextPartMetadata = {
    [CONTEXT_METADATA_KEY]: ContextPartPayload;
    [OPENCODE_COMMENT_METADATA_KEY]?: OpenCodeCommentMetadata;
};
/**
 * One context item as it goes on the wire: a synthetic message whose `text` is
 * what the model reads and whose metadata carries the same information
 * structured, so the timeline can render it as a dedicated block.
 */
export type ContextPart = {
    text: string;
    metadata: ContextPartMetadata;
};
/**
 * The model-facing text for a context payload. The wording intentionally
 * matches what OpenChamber sent before parts carried metadata, so model
 * behavior does not change with the transport format.
 */
export declare function formatContextText(payload: ContextPartPayload): string;
/**
 * Build the synthetic part for one context payload. `text` overrides the
 * derived text; repository-issue/change-request payloads require it because their
 * model-facing context is fetched by the picker, not derived from metadata.
 */
export declare function createContextPart(payload: ContextPartPayload, text?: string): ContextPart;
/** Map a composer context draft to its structured payload. */
export declare function contextPayloadFromDraft(draft: InlineCommentDraft): ContextPartPayload;
/**
 * Part metadata carrying a context payload, for parsing at a trust boundary
 * (a queued message coming back from the server, for instance). The OpenCode
 * Desktop mirror rides along so a queued comment keeps it too.
 */
export declare const contextPartMetadataSchema: z.ZodObject<{
    openchamberContext: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"code-comment">;
        source: z.ZodEnum<{
            diff: "diff";
            file: "file";
            plan: "plan";
        }>;
        fileLabel: z.ZodString;
        startLine: z.ZodNumber;
        endLine: z.ZodNumber;
        side: z.ZodOptional<z.ZodEnum<{
            modified: "modified";
            original: "original";
        }>>;
        language: z.ZodString;
        code: z.ZodString;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"terminal">;
        terminalId: z.ZodString;
        terminalLabel: z.ZodString;
        startLine: z.ZodNumber;
        endLine: z.ZodNumber;
        output: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"browser-annotation">;
        pageUrl: z.ZodString;
        prompt: z.ZodString;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"pr-comment">;
        label: z.ZodString;
        body: z.ZodString;
        text: z.ZodString;
        provider: z.ZodOptional<z.ZodEnum<{
            github: "github";
            gitlab: "gitlab";
        }>>;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"pr-check">;
        label: z.ZodString;
        output: z.ZodString;
        text: z.ZodString;
        provider: z.ZodOptional<z.ZodEnum<{
            github: "github";
            gitlab: "gitlab";
        }>>;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"file-quote">;
        fileLabel: z.ZodString;
        startLine: z.ZodOptional<z.ZodNumber>;
        endLine: z.ZodOptional<z.ZodNumber>;
        quote: z.ZodString;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"chat-quote">;
        messageId: z.ZodOptional<z.ZodString>;
        anchor: z.ZodOptional<z.ZodObject<{
            text: z.ZodString;
            prefix: z.ZodString;
            suffix: z.ZodString;
            start: z.ZodNumber;
            page: z.ZodOptional<z.ZodObject<{
                partId: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        quote: z.ZodString;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"repository-issue">;
        provider: z.ZodOptional<z.ZodEnum<{
            github: "github";
            gitlab: "gitlab";
        }>>;
        number: z.ZodNumber;
        title: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"change-request">;
        provider: z.ZodOptional<z.ZodEnum<{
            github: "github";
            gitlab: "gitlab";
        }>>;
        number: z.ZodNumber;
        title: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"linear-issue">;
        identifier: z.ZodString;
        title: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"guest-issue">;
        providerId: z.ZodString;
        id: z.ZodString;
        title: z.ZodString;
        url: z.ZodString;
        data: z.ZodOptional<z.ZodJSONSchema>;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"guest-pr">;
        providerId: z.ZodString;
        id: z.ZodString;
        title: z.ZodString;
        url: z.ZodString;
        data: z.ZodOptional<z.ZodJSONSchema>;
    }, z.core.$strip>], "kind">, z.ZodPipe<z.ZodObject<{
        kind: z.ZodLiteral<"github-issue">;
        number: z.ZodNumber;
        title: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodTransform<RepositoryIssueContext, {
        kind: "github-issue";
        number: number;
        title: string;
        url: string;
    }>>, z.ZodPipe<z.ZodObject<{
        kind: z.ZodLiteral<"github-pr">;
        number: z.ZodNumber;
        title: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodTransform<ChangeRequestContext, {
        kind: "github-pr";
        number: number;
        title: string;
        url: string;
    }>>]>;
    opencodeComment: z.ZodOptional<z.ZodObject<{
        path: z.ZodString;
        selection: z.ZodOptional<z.ZodObject<{
            startLine: z.ZodNumber;
            endLine: z.ZodNumber;
            startChar: z.ZodOptional<z.ZodNumber>;
            endChar: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        comment: z.ZodString;
        preview: z.ZodOptional<z.ZodString>;
        origin: z.ZodOptional<z.ZodEnum<{
            file: "file";
            review: "review";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * The subset of a record that context read-back inspects. Context now travels
 * as synthetic messages, which carry no `type`; the optional field keeps the
 * reader usable for anything else that carries the same metadata.
 */
export type ContextCarrierPart = {
    type?: string;
    metadata?: Metadata;
};
/**
 * Read the structured context payload from a message part, if it carries one.
 * The part comes from the server or an optimistic insert, so the payload is
 * schema-validated before it is trusted.
 */
export declare function readContextPart(part: ContextCarrierPart): ContextPartPayload | null;
/** Whether a message carries any user-attached context part. */
export declare function hasContextParts(parts: ContextCarrierPart[]): boolean;
/**
 * The composer draft a context payload came from, so reverting or forking a
 * message can put its attached context back on the chips instead of dropping
 * it. Linked issues/PRs have no draft form — they are owned by their own
 * pickers — so they map to null.
 */
export declare function draftFromContextPayload(payload: ContextPartPayload): Omit<InlineCommentDraft, 'id' | 'createdAt' | 'sessionKey'> | null;
export {};
