import { type MessageQueueUpdatedEvent } from '@/stores/messageQueueStore';
import { type SessionWarmingSnapshot } from '@/stores/useSessionWarmingStore';
import { z } from 'zod';
import { trackedItemRecordsSchema } from './trackedItems/model';
type ScheduledTaskRanEvent = {
    type: 'scheduled-task-ran';
    projectId: string;
    taskId: string;
    ranAt: number;
    status: 'running' | 'success' | 'error';
    sessionId?: string;
};
type SessionCreatedEvent = {
    type: 'session-created';
    sessionId: string;
    directory: string;
    projectId?: string;
    createdAt: number;
    promptDispatched: boolean;
    dispatchedAsCommand: boolean;
};
/**
 * The set of linked worktrees of one repository changed: created or removed by
 * this server, by an agent, or from a terminal. `directories` are the
 * directories inside that repository the server has seen requests for, so a
 * listener can map them onto its registered projects and refresh only those.
 */
type WorktreeChangedEvent = {
    type: 'worktree-changed';
    directories: string[];
    changedAt: number;
};
/**
 * One in-app browser action requested by the agent tool. Broadcast to every
 * connected client; only the one owning a browser view answers.
 */
type BrowserControlRequestEvent = {
    type: 'browser-control-request';
    requestId: string;
    action: string;
    parameters: Record<string, unknown>;
    context: BrowserControlRequestContext;
};
/**
 * The session that called the browser tool and the project it works in, each
 * null when unknown (an older server, or a caller with no session).
 */
declare const browserControlRequestContextSchema: z.ZodObject<{
    directory: z.ZodCatch<z.ZodNullable<z.ZodString>>;
    sessionId: z.ZodCatch<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type BrowserControlRequestContext = z.infer<typeof browserControlRequestContextSchema>;
/**
 * The agent asked for a file to be shown in the user's file panel. Every
 * client receives it; one showing that project opens the file.
 */
declare const fileOpenRequestSchema: z.ZodObject<{
    path: z.ZodString;
    directory: z.ZodNullable<z.ZodString>;
    sessionId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type FileOpenRequestEvent = {
    type: 'file-open-request';
} & z.infer<typeof fileOpenRequestSchema>;
/**
 * The agent asked for a saved plan to be shown. `projectId` is the storage
 * owner; `directory` is where the asking session works, so the window that
 * shows that project opens the plan.
 */
declare const planOpenRequestSchema: z.ZodObject<{
    projectId: z.ZodString;
    planId: z.ZodString;
    title: z.ZodString;
    directory: z.ZodNullable<z.ZodString>;
    sessionId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type PlanOpenRequestEvent = {
    type: 'plan-open-request';
} & z.infer<typeof planOpenRequestSchema>;
/**
 * The agent changed what it remembers. Carries only which store moved, not the
 * entries: listeners re-read from the server, so the event cannot go stale
 * between being sent and being handled.
 */
type AgentMemoryChangedEvent = {
    type: 'agent-memory-changed';
    scope: 'global' | 'project';
    projectId?: string;
};
declare const projectContextChangedSchema: z.ZodObject<{
    projectId: z.ZodString;
}, z.core.$strip>;
type ProjectContextChangedEvent = {
    type: 'project-context-changed';
} & z.infer<typeof projectContextChangedSchema>;
/** A client changed the chat folders; `updatedAt` is the stored revision, so a client already showing it skips the read. */
declare const sessionFoldersChangedSchema: z.ZodObject<{
    updatedAt: z.ZodNumber;
}, z.core.$strip>;
type SessionFoldersChangedEvent = {
    type: 'session-folders-changed';
} & z.infer<typeof sessionFoldersChangedSchema>;
/**
 * The extension chosen as browser provider can no longer serve (paused,
 * removed, or approval withdrawn), so the server put the in-app browser back.
 * The setting is already written; listeners update the store and tell the user.
 */
declare const browserProviderResetSchema: z.ZodObject<{
    guestId: z.ZodString;
    guestName: z.ZodString;
}, z.core.$strip>;
type BrowserProviderResetEvent = {
    type: 'browser-provider-reset';
} & z.infer<typeof browserProviderResetSchema>;
/** Jev routing events; each carries what the routing store needs and nothing the UI must re-derive. */
declare const routingUpdatedSchema: z.ZodObject<{
    available: z.ZodBoolean;
    autoReady: z.ZodBoolean;
    jevAvailable: z.ZodDefault<z.ZodBoolean>;
    tokenPresent: z.ZodBoolean;
    jevSource: z.ZodEnum<{
        typesafe: "typesafe";
        "zen-free": "zen-free";
    }>;
}, z.core.$strip>;
declare const routingDecisionSchema: z.ZodObject<{
    sessionId: z.ZodString;
    at: z.ZodNumber;
    category: z.ZodNullable<z.ZodString>;
    confidence: z.ZodNumber;
    reason: z.ZodEnum<{
        error: "error";
        "low-confidence": "low-confidence";
        "not-ready": "not-ready";
        routed: "routed";
        "unknown-category": "unknown-category";
    }>;
    providerID: z.ZodOptional<z.ZodString>;
    modelID: z.ZodOptional<z.ZodString>;
    variant: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    agent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    error: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const routingPermissionHeldSchema: z.ZodObject<{
    permissionId: z.ZodString;
    sessionId: z.ZodString;
    directory: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    score: z.ZodNumber;
    kind: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
declare const routingSafetySkippedSchema: z.ZodObject<{
    permissionId: z.ZodString;
    sessionId: z.ZodString;
    directory: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    error: z.ZodString;
}, z.core.$strip>;
type RoutingUpdatedEvent = {
    type: 'routing-updated';
} & z.infer<typeof routingUpdatedSchema>;
type RoutingDecisionEvent = {
    type: 'routing-decision';
    decision: z.infer<typeof routingDecisionSchema>;
};
type RoutingPermissionHeldEvent = {
    type: 'routing-permission-held';
} & z.infer<typeof routingPermissionHeldSchema>;
type RoutingSafetySkippedEvent = {
    type: 'routing-safety-skipped';
} & z.infer<typeof routingSafetySkippedSchema>;
/** Followed pull requests, merge requests or issues whose state the server saw move. */
type TrackedItemsChangedEvent = {
    type: 'tracked-items-changed';
    records: z.infer<typeof trackedItemRecordsSchema>;
};
declare const notificationPropertiesSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    tag: z.ZodOptional<z.ZodString>;
    kind: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodOptional<z.ZodString>;
    directory: z.ZodOptional<z.ZodString>;
    requireHidden: z.ZodOptional<z.ZodBoolean>;
    showWhenFocused: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
type OpenChamberEvent = {
    type: 'notification';
    payload: z.infer<typeof notificationPropertiesSchema>;
}
/** `connectionId` names this connection on the server; absent from servers before tracked items. */
 | {
    type: 'event-stream-ready';
    connectionId: string | null;
} | TrackedItemsChangedEvent
/** An agent turn finished in `directory`; its branches may have a new pull request. */
 | {
    type: 'source-control-activity';
    directory: string;
} | RoutingUpdatedEvent | RoutingDecisionEvent | RoutingPermissionHeldEvent | RoutingSafetySkippedEvent | MessageQueueUpdatedEvent
/** Which sessions the server keeps warm, as a full snapshot. */
 | {
    type: 'session-warming';
    snapshot: SessionWarmingSnapshot;
}
/** The host follows this space's queue again; what changed in a gap is read from the space. */
 | {
    type: 'space-queue-stream';
    spaceId: string;
} | ScheduledTaskRanEvent | SessionCreatedEvent | WorktreeChangedEvent | BrowserControlRequestEvent | FileOpenRequestEvent | PlanOpenRequestEvent | BrowserProviderResetEvent | ProjectContextChangedEvent | SessionFoldersChangedEvent | AgentMemoryChangedEvent;
type Listener = (event: OpenChamberEvent) => void;
export declare const subscribeOpenchamberEvents: (listener: Listener) => (() => void);
export {};
