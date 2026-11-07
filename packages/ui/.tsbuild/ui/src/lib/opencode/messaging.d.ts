/**
 * Inter-session messaging from OpenCode's `/api/messaging/*` routes: topics,
 * messages, session chains and logs, template variables and the local
 * embedding model, translated into the shapes the Messages panel, the chat
 * notices and Settings → Messaging read.
 *
 * The routes come from the OpenCode build this fork pairs with. The pinned
 * `@opencode/client` predates them, so this module calls them through
 * `runtimeFetch` and parses every response with zod; it is the only place
 * that knows their wire shapes. The routes are global: they take no directory
 * and start no location.
 *
 * A server without the routes answers 404 to the model status probe, which
 * `probeMessaging` reports as `unsupported`. Every other failure throws an
 * `OpencodeApiError` that keeps the HTTP status and OpenCode's message; a
 * failed read is never an empty result.
 */
import { z } from "zod";
import type { Message } from "./model";
export type MessagingDelivery = "none" | "inbox" | "wake";
export type MessagingWriteMode = "open" | "readonly" | "limited";
export type MessagingMatchMode = "exact" | "regex" | "fuzzy" | "semantic" | "hybrid" | "advanced";
type MessagingHiddenMode = "exclude" | "include" | "only";
export type MessagingLogPart = "user" | "output" | "thinking" | "tools" | "results" | "system" | "synthetic" | "shell" | "events" | "compaction";
export declare const MESSAGING_MATCH_MODES: readonly MessagingMatchMode[];
export declare const MESSAGING_DELIVERIES: readonly MessagingDelivery[];
/** Log parts in the order the panel offers them. */
export declare const MESSAGING_LOG_PARTS: readonly MessagingLogPart[];
/** The writer OpenCode records for messages a person sends through the API. */
export declare const MESSAGING_USER = "user";
declare const writerSchema: z.ZodObject<{
    session: z.ZodString;
    children: z.ZodOptional<z.ZodBoolean>;
    ancestors: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type MessagingWriter = z.infer<typeof writerSchema>;
declare const topicSchema: z.ZodObject<{
    name: z.ZodString;
    exists: z.ZodBoolean;
    kind: z.ZodString;
    preset: z.ZodOptional<z.ZodString>;
    owner: z.ZodOptional<z.ZodString>;
    creator: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    mode: z.ZodEnum<{
        limited: "limited";
        open: "open";
        readonly: "readonly";
    }>;
    writers: z.ZodArray<z.ZodObject<{
        session: z.ZodString;
        children: z.ZodOptional<z.ZodBoolean>;
        ancestors: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    policy: z.ZodString;
    messages: z.ZodNumber;
    created: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
    last: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
    unread: z.ZodOptional<z.ZodNumber>;
    subscribed: z.ZodOptional<z.ZodEnum<{
        inbox: "inbox";
        none: "none";
        wake: "wake";
    }>>;
    writersWindow: z.ZodOptional<z.ZodObject<{
        total: z.ZodNumber;
        first: z.ZodArray<z.ZodObject<{
            session: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            reads: z.ZodNumber;
            writes: z.ZodNumber;
            first: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            last: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
        latest: z.ZodArray<z.ZodObject<{
            session: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            reads: z.ZodNumber;
            writes: z.ZodNumber;
            first: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            last: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    readersWindow: z.ZodOptional<z.ZodObject<{
        total: z.ZodNumber;
        first: z.ZodArray<z.ZodObject<{
            session: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            reads: z.ZodNumber;
            writes: z.ZodNumber;
            first: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            last: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
        latest: z.ZodArray<z.ZodObject<{
            session: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            reads: z.ZodNumber;
            writes: z.ZodNumber;
            first: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            last: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    allowedWindow: z.ZodOptional<z.ZodObject<{
        total: z.ZodNumber;
        first: z.ZodArray<z.ZodObject<{
            session: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            reads: z.ZodNumber;
            writes: z.ZodNumber;
            first: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            last: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
        latest: z.ZodArray<z.ZodObject<{
            session: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            reads: z.ZodNumber;
            writes: z.ZodNumber;
            first: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            last: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MessagingTopic = z.infer<typeof topicSchema>;
declare const opSchema: z.ZodObject<{
    seq: z.ZodNumber;
    kind: z.ZodString;
    writer: z.ZodString;
    time: z.ZodNumber;
    viewers: z.ZodArray<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MessagingOp = z.infer<typeof opSchema>;
declare const messageSchema: z.ZodObject<{
    id: z.ZodNumber;
    topic: z.ZodString;
    seq: z.ZodNumber;
    kind: z.ZodString;
    type: z.ZodString;
    writer: z.ZodString;
    time: z.ZodNumber;
    data: z.ZodString;
    reply: z.ZodOptional<z.ZodNumber>;
    hidden: z.ZodDefault<z.ZodBoolean>;
    score: z.ZodOptional<z.ZodNumber>;
    ops: z.ZodOptional<z.ZodArray<z.ZodObject<{
        seq: z.ZodNumber;
        kind: z.ZodString;
        writer: z.ZodString;
        time: z.ZodNumber;
        viewers: z.ZodArray<z.ZodString>;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type MessagingMessage = z.infer<typeof messageSchema>;
declare const sendResultSchema: z.ZodObject<{
    topic: z.ZodString;
    seq: z.ZodNumber;
    created: z.ZodBoolean;
    forced: z.ZodDefault<z.ZodBoolean>;
    delivered: z.ZodArray<z.ZodObject<{
        session: z.ZodString;
        delivery: z.ZodEnum<{
            inbox: "inbox";
            none: "none";
            wake: "wake";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MessagingSendResult = z.infer<typeof sendResultSchema>;
declare const sessionNodeSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    parentID: z.ZodOptional<z.ZodString>;
    depth: z.ZodNumber;
    agent: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    directory: z.ZodString;
    status: z.ZodEnum<{
        idle: "idle";
        running: "running";
    }>;
    project: z.ZodOptional<z.ZodString>;
    original: z.ZodOptional<z.ZodString>;
    created: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
    updated: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
    outcome: z.ZodOptional<z.ZodString>;
    children: z.ZodOptional<z.ZodNumber>;
    descendants: z.ZodOptional<z.ZodNumber>;
    messages: z.ZodOptional<z.ZodNumber>;
    cost: z.ZodOptional<z.ZodNumber>;
    tokens: z.ZodOptional<z.ZodNumber>;
    topics: z.ZodOptional<z.ZodNumber>;
    childWindow: z.ZodOptional<z.ZodObject<{
        total: z.ZodNumber;
        first: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            agent: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<{
                idle: "idle";
                running: "running";
            }>;
            created: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            updated: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
        latest: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodOptional<z.ZodString>;
            agent: z.ZodOptional<z.ZodString>;
            status: z.ZodEnum<{
                idle: "idle";
                running: "running";
            }>;
            created: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            updated: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MessagingSessionNode = z.infer<typeof sessionNodeSchema>;
declare const chainSchema: z.ZodObject<{
    chain: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        parentID: z.ZodOptional<z.ZodString>;
        depth: z.ZodNumber;
        agent: z.ZodOptional<z.ZodString>;
        model: z.ZodOptional<z.ZodString>;
        directory: z.ZodString;
        status: z.ZodEnum<{
            idle: "idle";
            running: "running";
        }>;
        project: z.ZodOptional<z.ZodString>;
        original: z.ZodOptional<z.ZodString>;
        created: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        updated: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
        outcome: z.ZodOptional<z.ZodString>;
        children: z.ZodOptional<z.ZodNumber>;
        descendants: z.ZodOptional<z.ZodNumber>;
        messages: z.ZodOptional<z.ZodNumber>;
        cost: z.ZodOptional<z.ZodNumber>;
        tokens: z.ZodOptional<z.ZodNumber>;
        topics: z.ZodOptional<z.ZodNumber>;
        childWindow: z.ZodOptional<z.ZodObject<{
            total: z.ZodNumber;
            first: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                title: z.ZodOptional<z.ZodString>;
                agent: z.ZodOptional<z.ZodString>;
                status: z.ZodEnum<{
                    idle: "idle";
                    running: "running";
                }>;
                created: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
                updated: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            }, z.core.$strip>>;
            latest: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                title: z.ZodOptional<z.ZodString>;
                agent: z.ZodOptional<z.ZodString>;
                status: z.ZodEnum<{
                    idle: "idle";
                    running: "running";
                }>;
                created: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
                updated: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    root: z.ZodString;
    depth: z.ZodNumber;
}, z.core.$strip>;
export type MessagingChain = z.infer<typeof chainSchema>;
declare const logEntrySchema: z.ZodObject<{
    session: z.ZodString;
    message: z.ZodString;
    index: z.ZodNumber;
    part: z.ZodEnum<{
        compaction: "compaction";
        events: "events";
        output: "output";
        results: "results";
        shell: "shell";
        synthetic: "synthetic";
        system: "system";
        thinking: "thinking";
        tools: "tools";
        user: "user";
    }>;
    time: z.ZodNumber;
    text: z.ZodString;
    tool: z.ZodOptional<z.ZodString>;
    match: z.ZodOptional<z.ZodBoolean>;
    score: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type MessagingLogEntry = z.infer<typeof logEntrySchema>;
declare const varSchema: z.ZodObject<{
    name: z.ZodString;
    kind: z.ZodEnum<{
        constant: "constant";
        context: "context";
        custom: "custom";
        time: "time";
    }>;
    description: z.ZodString;
    template: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodString>;
    scope: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MessagingVar = z.infer<typeof varSchema>;
declare const modelStatusSchema: z.ZodObject<{
    state: z.ZodEnum<{
        downloading: "downloading";
        error: "error";
        off: "off";
        pending: "pending";
        ready: "ready";
        starting: "starting";
        unavailable: "unavailable";
    }>;
    tier: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    dimensions: z.ZodOptional<z.ZodNumber>;
    path: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
    server: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodString>;
    remote: z.ZodDefault<z.ZodBoolean>;
    progress: z.ZodDefault<z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        received: z.ZodNumber;
        total: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    error: z.ZodOptional<z.ZodString>;
    indexed: z.ZodOptional<z.ZodNumber>;
    pending: z.ZodOptional<z.ZodNumber>;
    tiers: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        model: z.ZodString;
        size: z.ZodString;
        hardware: z.ZodString;
        available: z.ZodBoolean;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type MessagingModelStatus = z.infer<typeof modelStatusSchema>;
declare const queryResultSchema: z.ZodObject<{
    messages: z.ZodPipe<z.ZodArray<z.ZodUnknown>, z.ZodTransform<{
        id: number;
        topic: string;
        seq: number;
        kind: string;
        type: string;
        writer: string;
        time: number;
        data: string;
        reply?: number | undefined;
        hidden: boolean;
        score?: number | undefined;
        ops?: {
            seq: number;
            kind: string;
            writer: string;
            time: number;
            viewers: string[];
            reason?: string | undefined;
        }[] | undefined;
    }[], unknown[]>>;
    more: z.ZodBoolean;
    match: z.ZodOptional<z.ZodEnum<{
        advanced: "advanced";
        exact: "exact";
        fuzzy: "fuzzy";
        hybrid: "hybrid";
        regex: "regex";
        semantic: "semantic";
    }>>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MessagingQueryResult = z.infer<typeof queryResultSchema>;
declare const sessionListSchema: z.ZodObject<{
    sessions: z.ZodPipe<z.ZodArray<z.ZodUnknown>, z.ZodTransform<{
        id: string;
        title?: string | undefined;
        parentID?: string | undefined;
        depth: number;
        agent?: string | undefined;
        model?: string | undefined;
        directory: string;
        status: "idle" | "running";
        project?: string | undefined;
        original?: string | undefined;
        created?: number | undefined;
        updated?: number | undefined;
        outcome?: string | undefined;
        children?: number | undefined;
        descendants?: number | undefined;
        messages?: number | undefined;
        cost?: number | undefined;
        tokens?: number | undefined;
        topics?: number | undefined;
        childWindow?: {
            total: number;
            first: {
                id: string;
                title?: string | undefined;
                agent?: string | undefined;
                status: "idle" | "running";
                created?: number | undefined;
                updated?: number | undefined;
            }[];
            latest: {
                id: string;
                title?: string | undefined;
                agent?: string | undefined;
                status: "idle" | "running";
                created?: number | undefined;
                updated?: number | undefined;
            }[];
        } | undefined;
    }[], unknown[]>>;
    total: z.ZodNumber;
}, z.core.$strip>;
type MessagingSessionList = z.infer<typeof sessionListSchema>;
declare const logSchema: z.ZodObject<{
    entries: z.ZodPipe<z.ZodArray<z.ZodUnknown>, z.ZodTransform<{
        session: string;
        message: string;
        index: number;
        part: "compaction" | "events" | "output" | "results" | "shell" | "synthetic" | "system" | "thinking" | "tools" | "user";
        time: number;
        text: string;
        tool?: string | undefined;
        match?: boolean | undefined;
        score?: number | undefined;
    }[], unknown[]>>;
    total: z.ZodNumber;
    more: z.ZodBoolean;
    match: z.ZodOptional<z.ZodEnum<{
        advanced: "advanced";
        exact: "exact";
        fuzzy: "fuzzy";
        hybrid: "hybrid";
        regex: "regex";
        semantic: "semantic";
    }>>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MessagingLog = z.infer<typeof logSchema>;
declare const varsSchema: z.ZodObject<{
    presets: z.ZodPipe<z.ZodArray<z.ZodUnknown>, z.ZodTransform<{
        name: string;
        template: string;
        description: string;
        policy: string;
        value?: string | undefined;
    }[], unknown[]>>;
    vars: z.ZodPipe<z.ZodArray<z.ZodUnknown>, z.ZodTransform<{
        name: string;
        kind: "constant" | "context" | "custom" | "time";
        description: string;
        template?: string | undefined;
        value?: string | undefined;
        scope?: string | undefined;
    }[], unknown[]>>;
    rendered: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MessagingVars = z.infer<typeof varsSchema>;
export type MessagingProbe = {
    kind: "supported";
    model: MessagingModelStatus;
} | {
    kind: "unsupported";
};
/**
 * Whether the connected OpenCode serves messaging, read from the model status
 * route every messaging build has. A 404, or a web page where an API answer
 * belongs, means the routes are missing; anything else that fails throws.
 */
export declare function probeMessaging(): Promise<MessagingProbe>;
export declare const getMessagingModelStatus: () => Promise<MessagingModelStatus>;
/**
 * Selects the model for the running server. A tier replaces a configured URL
 * or path; omitting all three keeps the configured model, so `{ start: true }`
 * only starts it. The selection lasts until OpenCode applies its config again.
 */
export declare const configureMessagingModel: (input: {
    tier?: string;
    url?: string;
    path?: string;
    start?: boolean;
}) => Promise<MessagingModelStatus>;
type MessagingTopicsInput = {
    as?: string;
    topics?: string[];
    sessions?: string[];
    role?: "any" | "reader" | "writer" | "subscriber";
    kinds?: string[];
    search?: string;
    standard?: boolean;
    sort?: "created" | "last";
    order?: "asc" | "desc";
    limit?: number;
    offset?: number;
    expand?: number;
};
export declare const listMessagingTopics: (input: MessagingTopicsInput) => Promise<{
    topics: MessagingTopic[];
    total: number;
}>;
export declare const getMessagingTopic: (input: {
    as?: string;
    topic: string;
    expand?: number;
}) => Promise<MessagingTopic>;
type MessagingQueryInput = {
    as?: string;
    topics?: string[];
    query?: string;
    match?: MessagingMatchMode;
    from?: string[];
    types?: string[];
    kinds?: string[];
    since?: string;
    until?: string;
    after?: number;
    before?: number;
    hidden?: MessagingHiddenMode;
    hiddenBy?: string[];
    /** Only messages addressed to the person: those written to sessions' user topics. */
    inbox?: boolean;
    limit?: number;
    order?: "asc" | "desc";
    markRead?: boolean;
};
export declare const queryMessaging: (input: MessagingQueryInput) => Promise<MessagingQueryResult>;
type MessagingSendInput = {
    as?: string;
    topic?: string;
    to?: string;
    text: string;
    type?: string;
    reply?: number;
    force?: boolean;
    deliver?: MessagingDelivery;
};
/** A soft write limit refuses with 409 (`ConflictError`); `force` writes anyway. */
export declare const sendMessagingMessage: (input: MessagingSendInput) => Promise<MessagingSendResult>;
export declare const inspectMessagingMessage: (input: {
    as?: string;
    topic: string;
    seq: number;
}) => Promise<MessagingMessage>;
/** Hides or restores messages, or the topic default when `seqs` is omitted. `for` defaults to the actor; `*` is everyone. */
export declare const changeMessagingVisibility: (input: {
    as?: string;
    topic: string;
    action: "hide" | "restore";
    seqs?: number[];
    for?: string[];
    reason?: string;
}) => Promise<{
    seq: number;
    targets: number[];
}>;
export declare const updateMessagingTopicSettings: (input: {
    as?: string;
    topic: string;
    mode?: MessagingWriteMode;
    writers?: MessagingWriter[];
    description?: string;
}) => Promise<MessagingTopic>;
/** Subscribes a session to a topic, or removes its subscription. */
export declare const subscribeMessagingTopic: (input: {
    as: string;
    topic: string;
    delivery?: MessagingDelivery;
    remove?: boolean;
}) => Promise<MessagingTopic>;
export declare const getMessagingChain: (input: {
    session: string;
    depth?: "self" | "parent" | "all";
    detail?: "brief" | "full";
    expand?: number;
}) => Promise<MessagingChain>;
export declare const listMessagingSessions: (input: {
    search?: string;
    active?: boolean;
    parent?: string;
    ancestor?: string;
    agent?: string;
    sort?: "created" | "updated";
    order?: "asc" | "desc";
    limit?: number;
    detail?: "brief" | "full";
}) => Promise<MessagingSessionList>;
type MessagingLogInput = {
    sessions: string[];
    op?: "head" | "tail" | "grep" | "search" | "pull";
    include?: MessagingLogPart[];
    query?: string;
    match?: MessagingMatchMode;
    context?: number;
    scope?: "all" | "context";
    limit?: number;
    offset?: number;
    chars?: number;
};
export declare const readMessagingLog: (input: MessagingLogInput) => Promise<MessagingLog>;
export declare const listMessagingVars: (input: {
    as?: string;
    values?: boolean;
    render?: string;
}) => Promise<MessagingVars>;
/** Sets a custom variable, or removes it when `value` is omitted. `scope` is a session ID (inherited by its subsessions) or `global`. */
export declare function setMessagingVar(input: {
    scope: string;
    name: string;
    value?: string;
}): Promise<void>;
/** A message written to any topic, announced on OpenCode's global event stream. */
export type MessagingCreated = {
    topic: string;
    seq: number;
    kind: string;
    type: string;
    writer: string;
    time: number;
    /** The first 200 characters of the message. */
    preview: string;
    /** Addressed to the person: written to a session's user topic. */
    inbox: boolean;
};
/**
 * The `messaging.message.created` payload on the event stream. The sync
 * pipeline parses with it; `data` is a `MessagingCreated`.
 */
export declare const messagingCreatedEvent: z.ZodObject<{
    type: z.ZodLiteral<"messaging.message.created">;
    data: z.ZodObject<{
        topic: z.ZodString;
        seq: z.ZodNumber;
        kind: z.ZodString;
        type: z.ZodString;
        writer: z.ZodString;
        time: z.ZodNumber;
        preview: z.ZodString;
        inbox: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * A message OpenCode delivered into a session's transcript: a synthetic
 * message whose metadata names `source: "messaging"`. Its text wraps the body
 * in a `<message …>` envelope for the model; `body` is the text without it.
 */
export type MessagingNotice = {
    topic: string;
    seq: number;
    /** Session ID of the writer, or `user`. */
    from: string;
    /** The writer's session title, when the envelope carries one. */
    fromTitle?: string;
    type: string;
    /** Sent up to the person. Only those notices carry an audience; the type is a free label any writer sets. */
    toYou: boolean;
    /** False for a message to the person that OpenCode keeps out of the model's context. */
    agentSees: boolean;
    body: string;
};
export declare function readMessagingNotice(message: Message): MessagingNotice | undefined;
/** Whether a writer is a session, as opposed to the person using the API. */
export declare const isMessagingSession: (writer: string) => boolean;
export {};
