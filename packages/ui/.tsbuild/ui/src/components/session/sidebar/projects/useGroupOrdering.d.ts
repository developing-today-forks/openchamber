import type { SessionGroup } from '../types';
export declare const useGroupOrdering: (groupOrderByProject: Map<string, string[]>) => {
    getOrderedGroups: (projectId: string, groups: SessionGroup[]) => SessionGroup[];
};
