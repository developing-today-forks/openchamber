import type { GitHubReferenceKind } from '@/lib/api/types';
/** The repository's own host (GitHub or GitLab), or Linear. */
export type SourceBoardTab = 'repository' | 'linear';
type SourceBoardChoice = {
    /** The project whose repository the board lists; independent of the app's selected project. */
    projectId: string | null;
    tab: SourceBoardTab;
    /** Null lists every team. */
    linearTeamId: string | null;
    /**
     * Per project id, the nested repository the board lists while that project's
     * root is not a repository itself; the board's own, never the Git screen's
     * selection. Ignored once the repository is no longer among the discovered ones.
     */
    repositoryByProject: Record<string, string>;
    /**
     * Per project id, whether the board lists every repository under the folder
     * together (true) or just the one in `repositoryByProject` (false). Absent:
     * the board's default, all of them unless a single repository was remembered.
     */
    allRepositoriesByProject: Record<string, boolean>;
};
type SourceBoardState = {
    /** Keyed by runtime: project and team ids belong to one server. */
    choices: Record<string, SourceBoardChoice>;
    /** A Linear issue another surface asked the board to show; taken once. */
    linearFocus: string | null;
    /** Merges `patch` into the choice; the per-project maps merge into the existing ones. */
    update: (patch: Partial<SourceBoardChoice>) => void;
    /** Switches to Linear and previews the issue `identifier` names; the caller opens the board. */
    focusLinearIssue: (identifier: string) => void;
    clearLinearFocus: () => void;
    /** An issue or PR another surface asked the board to show: its tab and its link; taken once. */
    repositoryFocus: {
        kind: GitHubReferenceKind;
        query: string;
    } | null;
    /** Switches to `projectId`'s repository tab and previews the item the link `query` names; the caller opens the board. */
    focusRepositoryItem: (projectId: string, kind: GitHubReferenceKind, query: string) => void;
    clearRepositoryFocus: () => void;
    /** The list column's width in pixels; null until the user drags it. Not per runtime: it is about the screen. */
    listWidth: number | null;
    setListWidth: (width: number) => void;
};
/**
 * What the board was last left on, so it reopens there. Changing it never
 * touches the project the rest of the app has selected.
 */
export declare const useSourceBoardStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SourceBoardState>, "persist" | "setState"> & {
    setState(partial: Partial<SourceBoardState> | SourceBoardState | ((state: SourceBoardState) => Partial<SourceBoardState> | SourceBoardState), replace?: false | undefined): unknown;
    setState(state: SourceBoardState | ((state: SourceBoardState) => SourceBoardState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SourceBoardState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SourceBoardState) => void) => () => void;
        onFinishHydration: (fn: (state: SourceBoardState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SourceBoardState, unknown, unknown>>;
    };
}>;
export declare const useSourceBoardChoice: () => SourceBoardChoice;
export {};
