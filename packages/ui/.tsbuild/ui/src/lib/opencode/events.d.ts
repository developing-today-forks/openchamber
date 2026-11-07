/**
 * Sync events: the vocabulary the sync layer reduces.
 *
 * OpenCode v2 publishes a durable event log (`session.text.delta`,
 * `session.tool.called`, `session.step.ended`, ...). The sync stores keep
 * working in terms of messages and parts, so every wire event is translated
 * here into one or more `SyncEvent`s that name the store field they touch:
 * a message appeared, a part grew, a tool call changed state. The reducer
 * never sees wire shapes, and this translation is pure (no store access), so
 * the pipeline can coalesce deltas before the reducer runs.
 *
 * Part identity follows `partIds` in `./model`: text and reasoning items are
 * addressed by `(assistantMessageID, ordinal)`, tool calls by their call id.
 */
import type { OpenCodeEvent, PersistentPtyInfo } from "@opencode/client";
import { type FilePart, type FormRequest, type JsonValue, type Message, type Metadata, type ModelRef, type Part, type PermissionRequest, type PermissionRuleset, type Session, type SessionStatus, type SessionOutcome, type StructuredError, type TokenUsageInfo } from "./model";
import { type RunningShell, type ShellEnd } from "./background-shell";
import type { MessagingCreated } from "./messaging";
/** Fields of a session that change after creation. `null` clears a value. */
export type SessionPatch = {
    title?: string;
    directory?: string;
    projectID?: string;
    subpath?: string | null;
    agent?: string;
    model?: ModelRef;
    cost?: number;
    tokens?: TokenUsageInfo;
    permissions?: PermissionRuleset;
    revert?: Session["revert"] | null;
    outcome?: Session["outcome"];
    /** Full replacement of the session's metadata. */
    metadata?: Metadata;
    /** `archived: null` restores an archived session. */
    time?: Partial<Omit<Session["time"], "archived">> & {
        archived?: number | null;
    };
};
/** Fields of a message that change after it appeared. */
export type MessagePatch = {
    time?: {
        created?: number;
        streamed?: number;
        completed?: number;
    };
    finish?: Extract<Message, {
        role: "assistant";
    }>["finish"];
    error?: StructuredError;
    cost?: number;
    tokens?: TokenUsageInfo;
    snapshot?: {
        start?: string;
        end?: string;
        files?: string[];
    };
    retry?: Extract<Message, {
        role: "assistant";
    }>["retry"] | null;
    /** Shell messages: exit status and captured output. */
    shell?: {
        status: "running" | "exited" | "timeout" | "killed";
        exit?: number;
        signal?: string;
        output?: Extract<Message, {
            role: "shell";
        }>["output"];
    };
};
/** State transitions of a tool call that need the part's existing state to apply. */
export type ToolTransition = {
    kind: "input";
    raw: string;
} | {
    kind: "called";
    input: Record<string, JsonValue>;
    executed: boolean;
    start: number;
} | {
    kind: "progress";
    metadata: Metadata;
} | {
    kind: "success";
    output: string;
    attachments?: FilePart[];
    metadata?: Metadata;
    executed: boolean;
    end: number;
} | {
    kind: "failed";
    error: string;
    output?: string;
    metadata?: Metadata;
    executed: boolean;
    end: number;
};
/**
 * What OpenCode rebuilt. v2 watches its own config files and announces the
 * rebuilt slice without saying which entry changed, so each kind names the
 * lists that have to be re-read.
 */
export type CatalogKind = "config" | "agent" | "command" | "skill" | "plugin" | "provider" | "model" | "credential" | "project"
/** Web search providers or the default choice changed (`websearch.updated`). */
 | "websearch";
export type SyncEvent = {
    type: "server.connected";
    properties: Record<never, never>;
} | {
    type: "installation.update-available";
    properties: {
        version: string;
    };
} | {
    type: "session.created";
    properties: {
        info: Session;
    };
} | {
    type: "session.patched";
    properties: {
        sessionID: string;
        patch: SessionPatch;
    };
} | {
    type: "session.deleted";
    properties: {
        sessionID: string;
    };
}
/**
 * A session was forked. OpenCode 2.x publishes no `session.created` for the
 * fork and this event carries ids only, so the sync layer reads the fork's
 * record and applies it as a `session.created`.
 */
 | {
    type: "session.forked";
    properties: {
        sessionID: string;
        parentID: string;
    };
}
/**
 * A staged revert became permanent: OpenCode deleted the boundary message
 * `to` and everything after it. The reducer trims the same range locally,
 * because no `message.removed` follows and a later fetch keeps whatever the
 * store still holds.
 */
 | {
    type: "session.revert.committed";
    properties: {
        sessionID: string;
        to: string;
    };
} | {
    type: "session.status";
    properties: {
        sessionID: string;
        status: SessionStatus;
    };
}
/**
 * `outcome` is set when the event ends a turn (`session.execution.*`) and
 * absent for a bare status change. Only `interrupted` is an explicit stop.
 */
 | {
    type: "session.idle";
    properties: {
        sessionID: string;
        outcome?: SessionOutcome;
    };
} | {
    type: "session.error";
    properties: {
        sessionID: string;
        error: StructuredError;
    };
} | {
    type: "message.updated";
    properties: {
        info: Message;
    };
} | {
    type: "message.patched";
    properties: {
        sessionID: string;
        messageID: string;
        patch: MessagePatch;
    };
} | {
    type: "message.removed";
    properties: {
        sessionID: string;
        messageID: string;
    };
} | {
    type: "message.part.updated";
    properties: {
        sessionID: string;
        part: Part;
    };
} | {
    type: "message.part.delta";
    properties: {
        sessionID: string;
        messageID: string;
        partID: string;
        field: "text" | "raw";
        delta: string;
    };
} | {
    type: "message.tool.transition";
    properties: {
        sessionID: string;
        messageID: string;
        partID: string;
        transition: ToolTransition;
    };
} | {
    type: "message.parts.replaced";
    properties: {
        sessionID: string;
        messageID: string;
        parts: Part[];
    };
}
/** Text appended to the summary of the compaction currently running in the session. */
 | {
    type: "message.compaction.delta";
    properties: {
        sessionID: string;
        delta: string;
    };
} | {
    type: "permission.asked";
    properties: PermissionRequest;
} | {
    type: "permission.replied";
    properties: {
        sessionID: string;
        requestID: string;
    };
} | {
    type: "form.created";
    properties: {
        form: FormRequest;
    };
} | {
    type: "form.settled";
    properties: {
        sessionID: string;
        formID: string;
    };
}
/** A session's shell command started; commands that belong to no session are not reported. */
 | {
    type: "shell.started";
    properties: {
        shell: RunningShell;
    };
}
/** A shell command exited or was removed. */
 | {
    type: "shell.ended";
    properties: {
        shellID: string;
        end: ShellEnd;
        endedAt: number;
    };
}
/** A terminal the agent started with the pty tool. */
 | {
    type: "persistent-pty.added";
    properties: {
        sessionID: string;
        terminal: PersistentPtyInfo;
    };
} | {
    type: "persistent-pty.removed";
    properties: {
        sessionID: string;
        ptyID: string;
    };
} | {
    type: "vcs.branch.updated";
    properties: {
        branch?: string;
    };
} | {
    type: "mcp.status.changed";
    properties: {
        server: string;
    };
} | {
    type: "catalog.updated";
    properties: {
        kind: CatalogKind;
    };
}
/**
 * OpenCode dropped the cached services for this directory (idle eviction or
 * an explicit reload). Everything read from it is now suspect.
 */
 | {
    type: "location.shutdown";
    properties: Record<never, never>;
} | {
    type: "openchamber.notification";
    properties: OpenchamberNotification;
} | {
    type: "openchamber.permission-auto-accept";
    properties: {
        sessions: Record<string, boolean>;
        modes?: Record<string, "ask" | "safety" | "auto">;
        revision?: number;
        spaceId?: string;
    };
}
/** The server did not answer this request on the user's behalf: it waits for the user. */
 | {
    type: "openchamber.permission-left-for-user";
    properties: {
        permissionId: string;
        sessionId: string;
        directory: string | null;
        spaceId?: string;
    };
}
/** A page an agent showed waits for the user's answer (render.page with awaitAnswer). */
 | {
    type: "openchamber.page-waiting";
    properties: {
        sessionID: string;
        directory: string | null;
        page: {
            id: string;
            title: string;
        };
    };
}
/** That page stopped waiting: answered, answered in the chat, or its turn ended. */
 | {
    type: "openchamber.page-settled";
    properties: {
        sessionID: string;
        pageID: string;
    };
}
/** A message was written to a messaging topic (OpenCode builds with messaging; global, no directory). */
 | {
    type: "messaging.message.created";
    properties: MessagingCreated;
}
/** The server started or stopped waiting to write a session's recap and suggestion. */
 | {
    type: "openchamber.session-assist";
    properties: {
        sessionID: string;
        directory: string | null;
        pending: boolean;
    };
};
/** Agent-completion / restart notices the OpenChamber server publishes for non-web runtimes. */
export type OpenchamberNotification = {
    kind?: string;
    sessionId?: string;
    directory?: string;
    title?: string;
    body?: string;
    tag?: string;
    requireHidden?: boolean;
    showWhenFocused?: boolean;
    desktopNotificationDelivered?: boolean;
    desktopStdoutActive?: boolean;
};
/** A translated event together with the directory it belongs to. */
export type RoutedSyncEvent = {
    directory: string;
    event: SyncEvent;
};
export declare const GLOBAL_EVENT_DIRECTORY = "global";
/** Server events and the messages they create share one id space (`evt_` → `msg_`). */
export declare const messageIdFromEvent: (eventID: string) => string;
/**
 * Translates one wire event. Returns nothing for events the sync layer does
 * not model (usage records, inbox delivery changes, TUI events, ...).
 */
export declare function translateWireEvent(event: OpenCodeEvent): SyncEvent[];
/** Translates a wire event and tags every resulting sync event with its directory. */
export declare function routeWireEvent(event: OpenCodeEvent): RoutedSyncEvent[];
/** Session an event addresses, when it addresses one. */
export declare function syncEventSessionID(event: SyncEvent): string | undefined;
/** Message an event addresses, when it addresses one. */
export declare function syncEventMessageID(event: SyncEvent): string | undefined;
