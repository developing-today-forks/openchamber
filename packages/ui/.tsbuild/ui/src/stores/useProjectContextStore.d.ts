/**
 * Project context store: notes, todos, and plan links, keyed by project.
 *
 * Replaces the `openchamber:project-notes-updated` / `openchamber:project-plan-saved`
 * window events that previously forced every mounted panel to re-read the whole
 * config. Writers now mutate the store and every reader re-renders from it.
 *
 * Storage is server-owned; this store is a cache with optimistic mutations.
 * See `packages/web/server/lib/project-context/DOCUMENTATION.md`.
 */
import { type ProjectNote, type ProjectNoteSource, type ProjectPlanLink, type ProjectRef, type ProjectTodoChange, type ProjectTodoItem } from '@/lib/projectContextApi';
interface ProjectContextEntry {
    notes: ProjectNote[];
    todos: ProjectTodoItem[];
    plans: ProjectPlanLink[];
    /** The team's shared plans folder, when the project has one; sharing a plan needs it. */
    sharedPlansDir: string | null;
    /** True once an authoritative load has succeeded at least once. */
    loaded: boolean;
    loading: boolean;
    /** Last load or save failure. Never clears cached data on its own. */
    error: string | null;
}
interface ProjectContextState {
    entries: Record<string, ProjectContextEntry>;
}
interface ProjectContextActions {
    getEntry: (project: ProjectRef | null | undefined) => ProjectContextEntry;
    load: (project: ProjectRef, options?: {
        force?: boolean;
    }) => Promise<void>;
    saveTodos: (project: ProjectRef, todos: ProjectTodoItem[], change?: ProjectTodoChange) => Promise<boolean>;
    createNote: (project: ProjectRef, value: {
        body: string;
        source?: ProjectNoteSource;
        origin?: {
            sessionId: string;
            messageId?: string;
        };
    }) => Promise<ProjectNote | null>;
    saveNoteBody: (project: ProjectRef, noteId: string, body: string) => Promise<boolean>;
    setNotePinned: (project: ProjectRef, noteId: string, pinned: boolean) => Promise<boolean>;
    deleteNote: (project: ProjectRef, noteId: string) => Promise<boolean>;
    createPlan: (project: ProjectRef, value: {
        title: string;
        body: string;
    }) => Promise<ProjectPlanLink | null>;
    savePlan: (project: ProjectRef, planId: string, raw: string) => Promise<boolean>;
    setPlanPinned: (project: ProjectRef, planId: string, pinned: boolean) => Promise<boolean>;
    deletePlan: (project: ProjectRef, planId: string) => Promise<boolean>;
    /** Move a plan into the team's shared folder, or back; the plan gets a new id. */
    movePlan: (project: ProjectRef, planId: string, direction: 'share' | 'unshare') => Promise<boolean>;
    /** Remember the session a plan was just sent to; its card then leads there. */
    linkPlanSession: (project: ProjectRef, planId: string, sessionId: string) => Promise<boolean>;
    reset: () => void;
}
type ProjectContextStore = ProjectContextState & ProjectContextActions;
export declare const EMPTY_PROJECT_CONTEXT_ENTRY: ProjectContextEntry;
export declare const useProjectContextStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ProjectContextStore>>;
export {};
