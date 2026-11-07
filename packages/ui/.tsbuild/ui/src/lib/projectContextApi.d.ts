/**
 * Client for the OpenChamber project context routes.
 *
 * Notes, todos, and plan markdown are owned by the server
 * (`packages/web/server/lib/project-context`). This module only speaks HTTP:
 * it resolves no storage paths and never reads or writes plan files directly.
 * The only paths it sees are the ones the server reports (a plan's `path`, the
 * shared plans folder), and those only name files to the user or an agent.
 *
 * Every function throws on failure. An authoritative read must never resolve
 * to an empty value that a caller could mistake for "the project has nothing".
 */
export interface ProjectTodoItem {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
}
export interface ProjectPlanLink {
    id: string;
    file: string;
    title: string;
    createdAt: number;
    pinned: boolean;
    /** The user's own plan, or one from the team's shared plans folder. */
    source?: 'shared' | 'personal';
    /** Ticked and total steps of the plan's `## Steps` checklist; absent without one. */
    progress?: ProjectPlanProgress;
    /** The session the plan was last sent to with Implement or Improve. */
    session?: ProjectPlanSession;
    /** Cost and token totals of the linked session, read live by the server; absent when unknown. */
    metrics?: ProjectPlanMetrics;
}
export interface ProjectPlanProgress {
    done: number;
    total: number;
}
export interface ProjectPlanSession {
    sessionId: string;
    linkedAt: number;
}
export interface ProjectPlanMetrics {
    /** USD cost; null when neither OpenCode nor the catalog could price the session. */
    costUsd: number | null;
    /** Where `costUsd` came from; null exactly when `costUsd` is. */
    costSource: 'opencode' | 'catalog' | null;
    tokens: ProjectPlanTokenTotals | null;
}
interface ProjectPlanTokenTotals {
    input: number;
    output: number;
    reasoning: number;
    cacheRead: number;
    cacheWrite: number;
    total: number;
}
export type ProjectNoteSource = 'manual' | 'selection' | 'agent';
export interface ProjectNote {
    id: string;
    body: string;
    createdAt: number;
    updatedAt: number;
    source: ProjectNoteSource;
    pinned: boolean;
    /** The message this note was distilled from, when it came from a chat. */
    origin?: {
        sessionId: string;
        messageId?: string;
    };
}
interface ProjectContextData {
    notes: ProjectNote[];
    todos: ProjectTodoItem[];
    plans: ProjectPlanLink[];
    /** Absolute path of the team's shared plans folder when the project has one. */
    sharedPlansDir: string | null;
}
interface ProjectPlanContent extends ProjectPlanLink {
    body: string;
    raw: string;
    /**
     * Absolute path of the plan's markdown on the server's machine. Only for
     * naming the plan to an agent (comments quote it); reads and writes stay
     * addressed by id through these routes.
     */
    path?: string;
}
export interface ProjectRef {
    id: string;
    path: string;
}
/**
 * A saved project plan plus the project that owns it, carried as one value so
 * a viewer can never end up with a plan id whose owner it has to guess.
 * PlanView resolves no owner on its own: the panel (or the persisted tab,
 * or the mobile surface) that opened the plan knows the owner exactly.
 */
export interface SavedProjectPlanTarget {
    projectRef: ProjectRef;
    planId: string;
}
export declare const PROJECT_NOTE_BODY_MAX_LENGTH = 3000;
export declare const PROJECT_TODO_TEXT_MAX_LENGTH = 1000;
/** The server clamps plan titles to the same length. */
export declare const PROJECT_PLAN_TITLE_MAX_LENGTH = 160;
/**
 * Split a plan document into title and body, mirroring the server's own rule so
 * an unsaved editor buffer and an imported file title exactly the way the
 * stored file will.
 */
export declare const parsePlanMarkdown: (raw: string, fallback: string) => {
    title: string;
    body: string;
};
/**
 * The storage id is derived from the project path, not from `project.id`.
 * Project ids in settings have churned across versions; the path-derived id is
 * what the server uses to name the config file, so both sides must agree on it.
 */
export declare const resolveProjectContextId: (project: ProjectRef | null | undefined) => string;
export declare const fetchProjectContext: (project: ProjectRef, options?: {
    signal?: AbortSignal;
}) => Promise<ProjectContextData>;
export declare const saveProjectTodos: (project: ProjectRef, todos: ProjectTodoItem[]) => Promise<ProjectContextData>;
/** One todo at a time; see `writeProjectTodo`. */
export type ProjectTodoChange = {
    kind: 'create';
    id: string;
    text: string;
} | {
    kind: 'complete';
    id: string;
    completed: boolean;
} | {
    kind: 'delete';
    id: string;
};
/**
 * Write one todo. The server applies the change to its current list, so a
 * todo an agent added since this client last read survives it. Answers with
 * the whole committed list, or null when the todo is already gone.
 */
export declare const writeProjectTodo: (project: ProjectRef, change: ProjectTodoChange) => Promise<ProjectContextData | null>;
export declare const createProjectNote: (project: ProjectRef, value: {
    body: string;
    source?: ProjectNoteSource;
    origin?: {
        sessionId: string;
        messageId?: string;
    };
}) => Promise<{
    note: ProjectNote;
    context: ProjectContextData;
}>;
/**
 * Patch a note. Only the supplied fields are sent, so pinning cannot roll back
 * an edit that landed between the two requests.
 *
 * Resolves `null` when the note is gone.
 */
export declare const updateProjectNote: (project: ProjectRef, noteId: string, patch: {
    body?: string;
    pinned?: boolean;
}) => Promise<ProjectNote | null>;
export declare const deleteProjectNote: (project: ProjectRef, noteId: string) => Promise<ProjectContextData>;
/** Resolves `null` when the plan is gone. */
export declare const setProjectPlanPinned: (project: ProjectRef, planId: string, pinned: boolean) => Promise<ProjectPlanLink | null>;
/**
 * Plans are addressed by id. The caller supplies content, never a path, so a
 * plan can only ever be created inside the project's own plans directory.
 */
export declare const createProjectPlan: (project: ProjectRef, value: {
    title: string;
    body: string;
}) => Promise<{
    plan: ProjectPlanLink;
    context: ProjectContextData;
}>;
/** Resolves `null` only when the plan or its markdown is genuinely gone. */
export declare const fetchProjectPlan: (project: ProjectRef, planId: string, options?: {
    signal?: AbortSignal;
}) => Promise<ProjectPlanContent | null>;
/**
 * Overwrite a plan's markdown with the editor's exact buffer.
 *
 * Resolves `null` when the plan or its file is gone, so an editor open on a
 * deleted plan reports that instead of silently recreating it.
 */
export declare const updateProjectPlan: (project: ProjectRef, planId: string, raw: string) => Promise<{
    plan: ProjectPlanLink;
    raw: string;
} | null>;
export declare const deleteProjectPlan: (project: ProjectRef, planId: string) => Promise<ProjectContextData>;
/**
 * Record the session a plan was just sent to. Resolves `null` when the plan is
 * gone.
 */
export declare const linkProjectPlanSession: (project: ProjectRef, planId: string, sessionId: string) => Promise<{
    plan: ProjectPlanLink;
    context: ProjectContextData;
} | null>;
export declare const shareProjectPlan: (project: ProjectRef, planId: string) => Promise<{
    plan: ProjectPlanLink;
    context: ProjectContextData;
} | null>;
export declare const unshareProjectPlan: (project: ProjectRef, planId: string) => Promise<{
    plan: ProjectPlanLink;
    context: ProjectContextData;
} | null>;
export {};
