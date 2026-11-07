import type { Session } from '@/lib/opencode/model';
import type { SessionNode } from '../types';
export type SwitcherItem = {
    node: SessionNode;
    projectId: string | null;
    groupDirectory: string | null;
    secondaryMeta: {
        projectLabel?: string | null;
        branchLabel?: string | null;
    } | null;
};
type SwitcherItemsOptions = {
    scopeProjectId?: string | null;
    currentSessionId?: string | null;
    /** How many parent sessions to return (default 7 — the desktop dropdown). */
    maxParents?: number;
};
export declare const findSwitcherItemAncestorIds: (items: SwitcherItem[], sessionId: string) => string[] | null;
export declare const selectSwitcherParents: (activeSessions: Session[], pinnedSessionIds: Set<string>, sessionOrderRanks: Map<string, number>, scopeProjectId: string | null, currentSessionId: string | null, getProjectId: (session: Session) => string | null, maxParents?: number, isExcluded?: (session: Session) => boolean) => Session[];
export declare const useSwitcherItems: (enabled: boolean, options?: SwitcherItemsOptions) => SwitcherItem[];
export {};
