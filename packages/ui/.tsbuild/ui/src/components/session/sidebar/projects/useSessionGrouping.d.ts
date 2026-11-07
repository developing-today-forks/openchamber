import type { Session } from '@/lib/opencode/model';
import type { WorktreeMetadata } from '@/types/worktree';
import type { WorktreeSortOrder } from '@/stores/useSessionDisplayStore';
import type { SessionGroup, SessionNode } from '../types';
import type { SpaceMark } from '@/lib/spaces/spaces-store';
type Args = {
    homeDirectory: string | null;
    worktreeMetadata: Map<string, WorktreeMetadata>;
    pinnedSessionIds: Set<string>;
    sessionOrderRanks: ReadonlyMap<string, number>;
    gitBranches: Map<string, string | null>;
    isVSCode: boolean;
    worktreeSortOrder: WorktreeSortOrder;
    sessionOwners?: ReadonlyMap<string, {
        scopeDirectory: string;
    }>;
    /** The isolated spaces of each project, by the project's normalized root. */
    spacesByProject?: ReadonlyMap<string, readonly SpaceMark[]>;
    /**
     * Members of active multi-runs. They list under the project root, where the
     * row model collapses them into one run row, instead of each lane's worktree
     * forming its own group.
     */
    runKeyBySessionId?: ReadonlyMap<string, string>;
};
export declare const useSessionGrouping: (args: Args) => {
    buildGroupSearchText: (group: SessionGroup) => string;
    buildSessionSearchText: (session: Session) => string;
    filterSessionNodesForSearch: (nodes: SessionNode[], query: string) => SessionNode[];
    buildGroupedSessions: (projectSessions: Session[], projectRoot: string | null, availableWorktrees: WorktreeMetadata[], projectRootBranch: string | null, projectIsRepo: boolean) => SessionGroup[];
};
export {};
