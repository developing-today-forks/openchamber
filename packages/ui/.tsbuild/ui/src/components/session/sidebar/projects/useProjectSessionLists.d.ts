import type { SessionOwnershipIndex } from '../sessions/sessionOwnership';
type Args = {
    ownership: SessionOwnershipIndex;
};
export declare const useProjectSessionLists: (args: Args) => {
    getSessionsForProject: (projectId: string) => import("../../../../lib/opencode/model").Session[];
    getArchivedSessionsForProject: (projectId: string) => import("../../../../lib/opencode/model").Session[];
};
export {};
