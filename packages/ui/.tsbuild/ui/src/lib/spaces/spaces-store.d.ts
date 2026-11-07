import { z } from 'zod';
import { type SpaceCustomProvider, type SpaceEntry, type SpaceFailure, type SpaceGrant } from './spaces-api';
import type { SpaceProgress } from '@/sync/event-pipeline';
/**
 * How the last answer of a space stood when the host merged the list: `complete`, `partial`
 * when the space had more pages than the host read, `stale` when its last known list stands in
 * for an answer that did not come, `unknown` when it never answered and has no records.
 */
export type SpaceListState = 'complete' | 'partial' | 'stale' | 'unknown';
export type SpaceMark = {
    id: string;
    name: string;
    state: SpaceListState;
    /** The registered host project the space was made for, or null when the host no longer has it. */
    projectDirectory: string | null;
    /** The project's path inside the space, or null with `projectDirectory`. */
    directory: string | null;
};
export declare const spaceMarkSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodDefault<z.ZodString>;
    state: z.ZodEnum<{
        complete: "complete";
        partial: "partial";
        stale: "stale";
        unknown: "unknown";
    }>;
    projectDirectory: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    directory: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** The actions on a space the user can take from its group, from soft to hard; `setup` runs the project's setup commands again. */
export type SpaceAction = 'start' | 'stop' | 'restart_opencode' | 'restart' | 'setup' | 'remove';
/**
 * Chats a delete could not save to the Archive page: the titles of those too large to save and
 * how many others failed. The confirmation asks again, with "Delete anyway".
 */
export type SpaceUnsavedChats = {
    tooLarge: readonly string[];
    failed: number;
};
/** An action this window started on a space: under way, or failed with the server's reason. */
export type SpaceActionState = {
    kind: 'running';
    action: SpaceAction;
} | {
    kind: 'failed';
    action: SpaceAction;
    failure: SpaceFailure;
};
type SpacesState = {
    spaces: ReadonlyMap<string, SpaceMark>;
    /**
     * The journey route's list, the one source that knows a space still being made or one whose
     * making failed; null until it answered once for this runtime. The steps of a creation that
     * arrive as events after a read began win over that read's answer.
     */
    journey: ReadonlyMap<string, SpaceEntry> | null;
    /** Counts progress events, so a read can tell which of them it has not seen. */
    progressRevision: number;
    /** Replaces the journey entries with a complete list whose read began at `revision`. */
    applyJourney: (entries: readonly SpaceEntry[], revision: number) => void;
    /** A creation step announced by the host. Resolves whether the space was known to the list. */
    noteProgress: (progress: SpaceProgress) => boolean;
    /** A creation this window started, shown at once, before the next read of the list. */
    addJourneyEntry: (entry: SpaceEntry) => void;
    /**
     * A grant the host just accepted, entered into the space's entry at once and counted like a
     * step, so a read of the list that began before it cannot take it away; the next read that
     * begins after it is the host's word again.
     */
    noteGrantGiven: (spaceId: string, grant: SpaceGrant) => void;
    /**
     * The providers of the user's own per project directory, read from the host for the dialogs
     * and for the composer's rule on a model the space has no access to; absent until read.
     */
    customProviders: ReadonlyMap<string, readonly SpaceCustomProvider[]>;
    noteCustomProviders: (projectDirectory: string, providers: readonly SpaceCustomProvider[]) => void;
    /** The grant dialog, open on one space and, when opened for a missing key, on its provider. */
    accessDialog: {
        spaceId: string;
        providerId: string | null;
    } | null;
    openAccessDialog: (spaceId: string, providerId?: string | null) => void;
    closeAccessDialog: () => void;
    /** The action under way or failed per space, in this window, for the group's status line and menu. */
    actions: ReadonlyMap<string, SpaceActionState>;
    noteAction: (spaceId: string, state: SpaceActionState | null) => void;
    /** The apply dialog, open on one space. */
    applyDialog: string | null;
    openApplyDialog: (spaceId: string) => void;
    closeApplyDialog: () => void;
    /** The confirmation before a space is deleted, open on one space. */
    deleteDialog: string | null;
    /** Set when the confirmation opened again because the space's chats could not be saved. */
    deleteUnsaved: SpaceUnsavedChats | null;
    openDeleteDialog: (spaceId: string, unsaved?: SpaceUnsavedChats | null) => void;
    closeDeleteDialog: () => void;
    /** The name of a space whose chats just went to the Archive page, for the notice that says so. */
    archivedNotice: string | null;
    noteChatsArchived: (name: string | null) => void;
    /** The window with the end of a failed setup command's output, open on one space. */
    setupOutputDialog: string | null;
    openSetupOutputDialog: (spaceId: string) => void;
    closeSetupOutputDialog: () => void;
    /** The phone's sheet of a space's actions, where the desktop has the group's menu. */
    actionsSheet: string | null;
    openActionsSheet: (spaceId: string) => void;
    closeActionsSheet: () => void;
    /** Replaces the marks with those of a complete global list. */
    applyMarks: (marks: readonly SpaceMark[]) => void;
    /** The space's event connection came or went; a gap shows the space as stale until the next list. */
    noteStream: (spaceId: string, status: 'connected' | 'disconnected') => void;
    /** A per-directory read of the space answered, so it is reachable again. */
    noteReachable: (spaceId: string) => void;
    resetForRuntimeSwitch: () => void;
    /** The feature was turned off here: none of its spaces is reachable until it is on again. */
    forgetForSwitchOff: () => void;
};
export declare const useSpacesStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SpacesState>>;
/** Counts runtime switches, so work started before one can tell that its answer is no longer wanted. */
export declare const spacesRuntimeGeneration: () => number;
/**
 * Reads the journey list again and keeps it. A read that fails leaves the last list in place and
 * rejects, so a failure never reads as "no spaces"; one that a runtime switch overtook is dropped.
 */
export declare const refreshSpacesJourney: () => Promise<void>;
/**
 * Reads the providers of the user's own for a project from the host and keeps them in the
 * store; one read per project at a time. A read that fails keeps what the store has, and a
 * project never read stays absent, so the composer refuses nothing on a guess.
 */
export declare const loadSpaceCustomProviders: (projectDirectory: string) => Promise<void>;
/** Whether this runtime has any isolated space at all, reachable or not. */
export declare const hasIsolatedSpaces: () => boolean;
export declare const getSpaceMark: (spaceId: string) => SpaceMark | null;
export declare const isSpaceStopped: (spaceId: string) => boolean;
export declare const useSpaceTakesNoNewSession: (spaceId: string | null | undefined) => boolean;
export declare const isSpaceDirectoryStopped: (directory: string | null | undefined) => boolean;
/** The spaces this window knows: those the session list marked and those the journey list holds. */
export declare const knownSpaceIds: (state: Pick<SpacesState, 'spaces' | 'journey'>) => ReadonlySet<string>;
/**
 * Whether a directory may seed from this browser's cache: a host directory always, a space's
 * directory only while this window knows the space. The chats of a deleted space moved to the
 * archive, so a cached list of its directory would show them where the space was and address
 * them through a prefix the host answers with 404; and at start-up, before the first lists, a
 * space's list is a few hundred milliseconds away rather than painted from the cache.
 */
export declare const isDirectoryOfKnownSpace: (directory: string | null | undefined) => boolean;
/** The spaces `previous` knew that `next` knows no more: deleted here, or from another window. */
export declare const spaceIdsGone: (previous: ReadonlySet<string>, next: ReadonlySet<string>) => string[];
export declare const useSpaceDirectoryStopped: (directory: string | null | undefined) => boolean;
/** `enabled: false` reads nothing and returns no spaces, for a caller that needs them only some of the time. */
export declare const useSidebarSpaces: (enabled?: boolean) => SpaceMark[];
/** The spaces of one registered project, in the host's order, for its spaces page (journey step 9). */
export declare const spacesOfProject: (journey: ReadonlyMap<string, SpaceEntry>, projectPath: string) => SpaceEntry[];
/**
 * The spaces whose project is no longer registered on this host: removed from OpenChamber, or
 * added again under another path. Nothing else lists them, so Settings does.
 */
export declare const spacesWithoutProject: (journey: ReadonlyMap<string, SpaceEntry>) => SpaceEntry[];
/**
 * How a screen that lists spaces stands with the journey list: it asks for a fresh read when it
 * opens, shows what the store already holds meanwhile, and a read that failed is kept apart from
 * the list, so it never reads as "no spaces".
 */
type SpacesJourneyRead = {
    journey: ReadonlyMap<string, SpaceEntry> | null;
    error: Error | null;
};
export declare const useSpacesJourneyRead: () => SpacesJourneyRead;
export {};
