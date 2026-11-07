import { z } from 'zod';
import { type SidebarLayout } from './sidebarLayout';
type ProjectSortOrder = 'manual' | 'a-z' | 'z-a' | 'date-added' | 'recent';
type WorktreeSortOrder = 'recent' | 'manual' | 'a-z';
export type SidebarViewMode = 'projects' | 'timeline';
type ListSessionGrouping = 'project' | 'time';
type ProjectDisplayMode = 'all' | 'single';
/** Tree zone rows (Pinned, In work): one line like the tree, or two with branch, PR and model. */
export type SessionRowLines = 'one' | 'two';
/**
 * Optional row elements, shown where the row already has a slot for them.
 * Live status and permission/question badges are not here: a row always
 * says when it needs the user.
 */
export type SessionRowElements = {
    showBranch: boolean;
    showPrBadge: boolean;
    showProviderLogo: boolean;
    showProjectIcon: boolean;
    showGoal: boolean;
    showTime: boolean;
};
/** Which row lines the Tree zones take, and which optional elements rows show. */
export type SessionRowDisplay = {
    zoneLines: SessionRowLines;
} & SessionRowElements;
export declare const DEFAULT_SESSION_ROW_ELEMENTS: SessionRowElements;
/**
 * A stored row display, completed with the defaults: a field that is
 * missing or holds a value this version does not know falls back to its
 * default, so a display saved by a newer version still applies what this
 * one understands. Anything that is not an object fails to parse.
 */
export declare const sessionRowDisplaySchema: z.ZodPipe<z.ZodObject<{
    zoneLines: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        one: "one";
        two: "two";
    }>>>;
    showBranch: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    showPrBadge: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    showProviderLogo: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    showProjectIcon: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    showGoal: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
    showTime: z.ZodCatch<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>, z.ZodTransform<SessionRowDisplay, {
    zoneLines?: "one" | "two" | undefined;
    showBranch?: boolean | undefined;
    showPrBadge?: boolean | undefined;
    showProviderLogo?: boolean | undefined;
    showProjectIcon?: boolean | undefined;
    showGoal?: boolean | undefined;
    showTime?: boolean | undefined;
}>>;
type SessionDisplayStore = {
    projectDisplayMode: ProjectDisplayMode;
    singleProjectId: string | null;
    setProjectDisplayMode: (mode: ProjectDisplayMode) => void;
    setSingleProjectId: (projectId: string) => void;
    sidebarViewMode: SidebarViewMode;
    setSidebarViewMode: (mode: SidebarViewMode) => void;
    listSessionGrouping: ListSessionGrouping;
    setListSessionGrouping: (grouping: ListSessionGrouping) => void;
    /** Local display preference; motion remains opt-in. */
    animatedActivityIndicators: boolean;
    setAnimatedActivityIndicators: (enabled: boolean) => void;
    /** The managed Chats block in the sidebar (web and desktop). */
    showChatsSection: boolean;
    /** The In work block; hidden, its sessions stay in their projects. */
    showWorkSection: boolean;
    /** The Pinned block above In work; off by default. Hidden, pinned sessions stay in their projects. */
    showPinnedSection: boolean;
    /** Pinned and In work rows in the Tree view: one line by default, two with branch, PR and model when set. */
    sessionRowDisplay: SessionRowDisplay;
    setSessionRowDisplay: (patch: Partial<SessionRowDisplay>) => void;
    setSessionRowElement: <K extends keyof SessionRowElements>(key: K, value: SessionRowElements[K]) => void;
    showArchivedSessions: boolean;
    projectSortOrder: ProjectSortOrder;
    worktreeSortOrder: WorktreeSortOrder;
    /** Section order, attention sections, the open session's hold and the List layout (`sidebarLayout.ts`). */
    sidebarLayout: SidebarLayout;
    setSidebarLayout: (layout: SidebarLayout) => void;
    setShowChatsSection: (show: boolean) => void;
    setShowWorkSection: (show: boolean) => void;
    setShowPinnedSection: (show: boolean) => void;
    setShowArchivedSessions: (show: boolean) => void;
    toggleArchivedSessions: () => void;
    setProjectSortOrder: (order: ProjectSortOrder) => void;
    setWorktreeSortOrder: (order: WorktreeSortOrder) => void;
};
export declare const migrateSessionDisplayState: (persisted: unknown, version: number) => Partial<SessionDisplayStore>;
export declare const useSessionDisplayStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SessionDisplayStore>, "persist" | "setState"> & {
    setState(partial: Partial<SessionDisplayStore> | SessionDisplayStore | ((state: SessionDisplayStore) => Partial<SessionDisplayStore> | SessionDisplayStore), replace?: false | undefined): unknown;
    setState(state: SessionDisplayStore | ((state: SessionDisplayStore) => SessionDisplayStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SessionDisplayStore, Partial<SessionDisplayStore>, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SessionDisplayStore) => void) => () => void;
        onFinishHydration: (fn: (state: SessionDisplayStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SessionDisplayStore, Partial<SessionDisplayStore>, unknown>>;
    };
}>;
export type { ProjectSortOrder, WorktreeSortOrder };
