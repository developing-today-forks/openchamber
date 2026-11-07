import type { ProjectSortOrder } from '@/stores/useSessionDisplayStore';
/** The fields any project list needs to be sortable. Both the desktop sidebar
    and the mobile sessions drawer build their own richer project shapes on top
    of the store entries, so this stays structural. */
type SortableProject = {
    id: string;
    label?: string | null;
    path: string;
    addedAt?: number | null;
    lastOpenedAt?: number | null;
};
/** One ordering for every surface that lists projects, so the sidebar and the
    mobile drawer answer the same setting the same way. `manualOrder` is the
    user's drag order (`useProjectsStore.manualProjectOrder`); projects missing
    from it keep their incoming position at the end. */
export declare const sortProjectsByOrder: <T extends SortableProject>(projects: readonly T[], order: ProjectSortOrder, manualOrder: readonly string[]) => T[];
/**
 * The "recent" order once sessions are known: newest session activity in the
 * project (its root and worktrees) first. Projects with no session keep their
 * incoming order after the active ones, so the last-opened order still breaks
 * ties. Every other sort passes through unchanged.
 */
export declare const rankByLatestActivity: <T>(items: readonly T[], order: ProjectSortOrder, projectIdOf: (item: T) => string, sessionsByProject: ReadonlyMap<string, ReadonlyArray<{
    time: {
        updated: number;
    };
}>>) => readonly T[];
/**
 * `items` sorted by `rankById` (project id to position). Items without a rank
 * stay ahead in their incoming order: the composer lists its Chat target
 * before the projects.
 */
export declare const orderByProjectRank: <T extends {
    id: string;
}>(items: readonly T[], rankById: ReadonlyMap<string, number>) => T[];
/**
 * Keep `items` in a previously shown order. Items in `heldIds` keep their
 * place; items that appeared since follow in their live order. Used to stop
 * the "recent" sort from reshuffling projects under the pointer.
 */
export declare const holdOrder: <T>(items: readonly T[], heldIds: readonly string[], idOf: (item: T) => string) => readonly T[];
export {};
