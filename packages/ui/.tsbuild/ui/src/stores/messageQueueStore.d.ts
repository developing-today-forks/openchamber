import { z } from 'zod';
import type { SyncEvent } from '@/lib/opencode/events';
import type { AttachedFile } from './types/sessionTypes';
import { type ContextPartMetadata } from '@/lib/messages/contextParts';
export type FollowUpBehavior = 'steer' | 'queue';
/**
 * Who delivers the queue. Web, desktop, and mobile talk to an OpenChamber
 * server that owns the queue and sends it whether or not any UI is open. VS
 * Code has no server of its own, so the extension UI keeps the local queue
 * and the foreground auto-send hook.
 */
export declare const isServerOwnedMessageQueue: () => boolean;
export interface QueuedMessageSendConfig {
    providerID: string;
    modelID: string;
    agent?: string;
    variant?: string;
}
/**
 * "Run as goal" captured with a queued message: the goal starts when this
 * message is delivered, never with whichever message happens to go out first.
 * `objective` is present only when the arming flow supplied one (the plan
 * flow); otherwise the delivered text is the objective.
 */
export interface QueuedMessageGoal {
    objective?: string;
    tokenBudget: number | null;
    /** The composer's goal flags (`useSessionGoalArmStore`), carried to delivery; present only when true. */
    settled?: boolean;
    briefAgent?: boolean;
    ignoreLimit?: boolean;
}
/**
 * Context captured with a queued message: whatever the composer had attached
 * when the message was queued. It leaves the composer with the message, so
 * delivery (by the server, or by the auto-send hook in VS Code) carries it and
 * editing the message brings it back.
 */
export type QueuedContextPart = {
    /** An attached context item: a draft chip or a linked issue/PR. Restored on edit. */
    kind: 'context';
    text: string;
    metadata: ContextPartMetadata;
    /**
     * Delivered as its own synthetic part right before this one. Nothing writes it any
     * more (attached PRs no longer carry review instructions); messages queued before
     * that still do, and are delivered as they were captured.
     */
    instructions?: string;
} | {
    /** Derived from the message text (the skill instruction); re-derived when the text is sent again, so never restored. */
    kind: 'instruction';
    text: string;
} | {
    /** Handed to the composer by another surface (conflict resolution); restored as pending on edit. */
    kind: 'synthetic';
    text: string;
};
export interface QueuedMessage {
    id: string;
    /** What the user typed, for display and editing. */
    content: string;
    /** What is delivered: `content` without its leading agent mention, file mentions already resolved. */
    text: string;
    /** Agent mentioned at the start of `content`, delivered as an agent part. */
    agentMention?: string;
    attachments?: AttachedFile[];
    /** Absent on a server projection item; a take brings it back. */
    context?: QueuedContextPart[];
    /** Bounded display-only context summary retained in server projections. */
    contextPreview?: string;
    createdAt: number;
    /** Send config captured at queue time — used as-is when auto-sending */
    sendConfig?: QueuedMessageSendConfig;
    goal?: QueuedMessageGoal;
    scheduledTask?: z.infer<typeof scheduledTaskSchema>;
}
interface QueuedMessageInput {
    content: string;
    /** Defaults to `content`. */
    text?: string;
    agentMention?: string;
    attachments?: AttachedFile[];
    context?: QueuedContextPart[];
    sendConfig?: QueuedMessageSendConfig;
    goal?: QueuedMessageGoal;
}
export type MessageQueueTarget = {
    runtimeKey: string;
    directory: string;
    sessionId: string;
};
export declare const createMessageQueueTarget: (sessionId: string, directory: string | null | undefined, runtimeKey?: string) => MessageQueueTarget | null;
export declare const getMessageQueueKey: (target: MessageQueueTarget) => string;
export declare const parseMessageQueueKey: (key: string) => MessageQueueTarget | null;
declare const scheduledTaskSchema: z.ZodObject<{
    projectId: z.ZodString;
    taskId: z.ZodString;
}, z.core.$strip>;
declare const serverSessionSchema: z.ZodObject<{
    sessionId: z.ZodString;
    directory: z.ZodString;
    items: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        id: z.ZodString;
        createdAt: z.ZodNumber;
        content: z.ZodString;
        text: z.ZodString;
        agentMention: z.ZodOptional<z.ZodString>;
        attachments: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            filename: z.ZodString;
            mimeType: z.ZodString;
            size: z.ZodNumber;
            source: z.ZodEnum<{
                local: "local";
                server: "server";
                vscode: "vscode";
            }>;
            serverPath: z.ZodOptional<z.ZodString>;
            dataUrl: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        context: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"context">;
            text: z.ZodString;
            metadata: z.ZodObject<{
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
                }, z.core.$strip>, z.ZodTransform<{
                    kind: 'repository-issue';
                    provider?: import("../lib/source-control/types").SourceControlProvider;
                    number: number;
                    title: string;
                    url: string;
                }, {
                    kind: "github-issue";
                    number: number;
                    title: string;
                    url: string;
                }>>, z.ZodPipe<z.ZodObject<{
                    kind: z.ZodLiteral<"github-pr">;
                    number: z.ZodNumber;
                    title: z.ZodString;
                    url: z.ZodString;
                }, z.core.$strip>, z.ZodTransform<{
                    kind: 'change-request';
                    provider?: import("../lib/source-control/types").SourceControlProvider;
                    number: number;
                    title: string;
                    url: string;
                }, {
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
            instructions: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"instruction">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"synthetic">;
            text: z.ZodString;
        }, z.core.$strip>], "kind">>>;
        contextPreview: z.ZodOptional<z.ZodString>;
        goal: z.ZodOptional<z.ZodObject<{
            objective: z.ZodOptional<z.ZodString>;
            tokenBudget: z.ZodNullable<z.ZodNumber>;
            settled: z.ZodOptional<z.ZodBoolean>;
            briefAgent: z.ZodOptional<z.ZodBoolean>;
            ignoreLimit: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>;
        scheduledTask: z.ZodObject<{
            projectId: z.ZodString;
            taskId: z.ZodString;
        }, z.core.$strip>;
        sendConfig: z.ZodObject<{
            providerID: z.ZodOptional<z.ZodString>;
            modelID: z.ZodOptional<z.ZodString>;
            agent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            variant: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        id: z.ZodString;
        createdAt: z.ZodNumber;
        content: z.ZodString;
        text: z.ZodString;
        agentMention: z.ZodOptional<z.ZodString>;
        attachments: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            filename: z.ZodString;
            mimeType: z.ZodString;
            size: z.ZodNumber;
            source: z.ZodEnum<{
                local: "local";
                server: "server";
                vscode: "vscode";
            }>;
            serverPath: z.ZodOptional<z.ZodString>;
            dataUrl: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        context: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"context">;
            text: z.ZodString;
            metadata: z.ZodObject<{
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
                }, z.core.$strip>, z.ZodTransform<{
                    kind: 'repository-issue';
                    provider?: import("../lib/source-control/types").SourceControlProvider;
                    number: number;
                    title: string;
                    url: string;
                }, {
                    kind: "github-issue";
                    number: number;
                    title: string;
                    url: string;
                }>>, z.ZodPipe<z.ZodObject<{
                    kind: z.ZodLiteral<"github-pr">;
                    number: z.ZodNumber;
                    title: z.ZodString;
                    url: z.ZodString;
                }, z.core.$strip>, z.ZodTransform<{
                    kind: 'change-request';
                    provider?: import("../lib/source-control/types").SourceControlProvider;
                    number: number;
                    title: string;
                    url: string;
                }, {
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
            instructions: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"instruction">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"synthetic">;
            text: z.ZodString;
        }, z.core.$strip>], "kind">>>;
        contextPreview: z.ZodOptional<z.ZodString>;
        sendConfig: z.ZodObject<{
            providerID: z.ZodString;
            modelID: z.ZodString;
            agent: z.ZodOptional<z.ZodString>;
            variant: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        goal: z.ZodOptional<z.ZodObject<{
            objective: z.ZodOptional<z.ZodString>;
            tokenBudget: z.ZodNullable<z.ZodNumber>;
            settled: z.ZodOptional<z.ZodBoolean>;
            briefAgent: z.ZodOptional<z.ZodBoolean>;
            ignoreLimit: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>>;
    }, z.core.$strip>]>>;
    sendingId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type ServerQueueSession = z.infer<typeof serverSessionSchema>;
interface MessageQueueState {
    queuedMessages: Record<string, QueuedMessage[]>;
    quarantinedLegacyMessages: Record<string, QueuedMessage[]>;
    followUpBehavior: FollowUpBehavior;
    /**
     * Queued messages whose send is currently awaiting the server, per target.
     *
     * A queued item is removed only after its send resolves, so between
     * dispatch and resolution it is still visible to every other reader — and
     * a composer submit merges the whole queue into its own send. Over a relay
     * that window is seconds, long enough for the same message to be delivered
     * twice. Dispatchers must skip entries listed here.
     *
     * Never persisted: a restart has no in-flight sends, and a stale flag would
     * strand a queued message permanently. With a server-owned queue this
     * mirrors the server's in-flight item.
     */
    sendingIds: Record<string, string[]>;
}
interface MessageQueueActions {
    addToQueue: (target: MessageQueueTarget, message: QueuedMessageInput) => Promise<void>;
    removeFromQueue: (target: MessageQueueTarget, messageId: string) => void;
    reorderQueue: (target: MessageQueueTarget, fromId: string, toId: string) => void;
    /** Removes the message and returns it in full, attachments included. */
    popToInput: (target: MessageQueueTarget, messageId: string) => Promise<QueuedMessage | null>;
    /**
     * Removes what the composer is about to send itself — one message or every
     * message not already being delivered — and returns it in full.
     */
    takeForSend: (target: MessageQueueTarget, messageId?: string) => Promise<QueuedMessage[]>;
    clearQueue: (target: MessageQueueTarget) => void;
    /** Drops the local projection only (the session is gone); never a server call. */
    forgetQueue: (target: MessageQueueTarget) => void;
    clearAllQueues: () => void;
    markSending: (target: MessageQueueTarget, messageId: string) => void;
    clearSending: (target: MessageQueueTarget, messageId: string) => void;
    getSendableQueue: (target: MessageQueueTarget) => QueuedMessage[];
    setFollowUpBehavior: (behavior: FollowUpBehavior) => void;
    getQueueForTarget: (target: MessageQueueTarget) => QueuedMessage[];
    /** Server-owned queue: load the authoritative queue for the active runtime. */
    hydrate: () => Promise<void>;
    /** Server-owned queue: re-read after an event-stream gap. */
    resync: () => Promise<void>;
    /** Server-owned queue: re-read one isolated space's queue, which its own server owns. */
    refreshSpaceQueue: (spaceId: string) => Promise<void>;
    /**
     * Server-owned queue: apply one session's authoritative state (broadcast or response) from its
     * owner, the host ('') or a space; a session the owner may not speak for is ignored.
     */
    applyServerSession: (session: ServerQueueSession, revision: number, expectedRuntimeKey: string, owner?: string) => void;
    /** Server-owned queue: tell the server that owns the session's queue to hold or release its delivery. */
    setServerHold: (sessionId: string, directory: string, held: boolean) => Promise<void>;
    resetForRuntimeSwitch: (previousRuntimeKey: string | null | undefined) => void;
}
type MessageQueueStore = MessageQueueState & MessageQueueActions;
export declare const migrateMessageQueueState: (persistedState: unknown, version: number) => Partial<MessageQueueStore>;
export declare const useMessageQueueStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<MessageQueueStore>, "devtools" | "setState"> & {
    setState(partial: Partial<MessageQueueStore> | ((state: MessageQueueStore) => Partial<MessageQueueStore> | MessageQueueStore) | MessageQueueStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ((state: MessageQueueStore) => MessageQueueStore) | MessageQueueStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<MessageQueueStore> | ((state: MessageQueueStore) => Partial<MessageQueueStore> | MessageQueueStore) | MessageQueueStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: ((state: MessageQueueStore) => MessageQueueStore) | MessageQueueStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<MessageQueueStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: MessageQueueStore) => void) => () => void;
        onFinishHydration: (fn: (state: MessageQueueStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<MessageQueueStore, unknown, unknown>>;
    };
}>;
export declare const messageQueueUpdatedEventSchema: z.ZodObject<{
    type: z.ZodLiteral<"openchamber:message-queue.updated">;
    properties: z.ZodObject<{
        revision: z.ZodNumber;
        session: z.ZodObject<{
            sessionId: z.ZodString;
            directory: z.ZodString;
            items: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
                id: z.ZodString;
                createdAt: z.ZodNumber;
                content: z.ZodString;
                text: z.ZodString;
                agentMention: z.ZodOptional<z.ZodString>;
                attachments: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    filename: z.ZodString;
                    mimeType: z.ZodString;
                    size: z.ZodNumber;
                    source: z.ZodEnum<{
                        local: "local";
                        server: "server";
                        vscode: "vscode";
                    }>;
                    serverPath: z.ZodOptional<z.ZodString>;
                    dataUrl: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                context: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"context">;
                    text: z.ZodString;
                    metadata: z.ZodObject<{
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
                        }, z.core.$strip>, z.ZodTransform<{
                            kind: 'repository-issue';
                            provider?: import("../lib/source-control/types").SourceControlProvider;
                            number: number;
                            title: string;
                            url: string;
                        }, {
                            kind: "github-issue";
                            number: number;
                            title: string;
                            url: string;
                        }>>, z.ZodPipe<z.ZodObject<{
                            kind: z.ZodLiteral<"github-pr">;
                            number: z.ZodNumber;
                            title: z.ZodString;
                            url: z.ZodString;
                        }, z.core.$strip>, z.ZodTransform<{
                            kind: 'change-request';
                            provider?: import("../lib/source-control/types").SourceControlProvider;
                            number: number;
                            title: string;
                            url: string;
                        }, {
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
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodObject<{
                    kind: z.ZodLiteral<"instruction">;
                    text: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    kind: z.ZodLiteral<"synthetic">;
                    text: z.ZodString;
                }, z.core.$strip>], "kind">>>;
                contextPreview: z.ZodOptional<z.ZodString>;
                goal: z.ZodOptional<z.ZodObject<{
                    objective: z.ZodOptional<z.ZodString>;
                    tokenBudget: z.ZodNullable<z.ZodNumber>;
                    settled: z.ZodOptional<z.ZodBoolean>;
                    briefAgent: z.ZodOptional<z.ZodBoolean>;
                    ignoreLimit: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>>;
                scheduledTask: z.ZodObject<{
                    projectId: z.ZodString;
                    taskId: z.ZodString;
                }, z.core.$strip>;
                sendConfig: z.ZodObject<{
                    providerID: z.ZodOptional<z.ZodString>;
                    modelID: z.ZodOptional<z.ZodString>;
                    agent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                    variant: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                }, z.core.$strip>;
            }, z.core.$strip>, z.ZodObject<{
                id: z.ZodString;
                createdAt: z.ZodNumber;
                content: z.ZodString;
                text: z.ZodString;
                agentMention: z.ZodOptional<z.ZodString>;
                attachments: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    filename: z.ZodString;
                    mimeType: z.ZodString;
                    size: z.ZodNumber;
                    source: z.ZodEnum<{
                        local: "local";
                        server: "server";
                        vscode: "vscode";
                    }>;
                    serverPath: z.ZodOptional<z.ZodString>;
                    dataUrl: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                context: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    kind: z.ZodLiteral<"context">;
                    text: z.ZodString;
                    metadata: z.ZodObject<{
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
                        }, z.core.$strip>, z.ZodTransform<{
                            kind: 'repository-issue';
                            provider?: import("../lib/source-control/types").SourceControlProvider;
                            number: number;
                            title: string;
                            url: string;
                        }, {
                            kind: "github-issue";
                            number: number;
                            title: string;
                            url: string;
                        }>>, z.ZodPipe<z.ZodObject<{
                            kind: z.ZodLiteral<"github-pr">;
                            number: z.ZodNumber;
                            title: z.ZodString;
                            url: z.ZodString;
                        }, z.core.$strip>, z.ZodTransform<{
                            kind: 'change-request';
                            provider?: import("../lib/source-control/types").SourceControlProvider;
                            number: number;
                            title: string;
                            url: string;
                        }, {
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
                    instructions: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodObject<{
                    kind: z.ZodLiteral<"instruction">;
                    text: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    kind: z.ZodLiteral<"synthetic">;
                    text: z.ZodString;
                }, z.core.$strip>], "kind">>>;
                contextPreview: z.ZodOptional<z.ZodString>;
                sendConfig: z.ZodObject<{
                    providerID: z.ZodString;
                    modelID: z.ZodString;
                    agent: z.ZodOptional<z.ZodString>;
                    variant: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                goal: z.ZodOptional<z.ZodObject<{
                    objective: z.ZodOptional<z.ZodString>;
                    tokenBudget: z.ZodNullable<z.ZodNumber>;
                    settled: z.ZodOptional<z.ZodBoolean>;
                    briefAgent: z.ZodOptional<z.ZodBoolean>;
                    ignoreLimit: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>>;
            }, z.core.$strip>]>>;
            sendingId: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>;
        spaceId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type MessageQueueUpdatedEvent = z.infer<typeof messageQueueUpdatedEventSchema>;
/** `openchamber:message-queue.updated` broadcast → projection. */
export declare const applyMessageQueueUpdatedEvent: (payload: SyncEvent | MessageQueueUpdatedEvent, expectedRuntimeKey: string) => void;
export {};
