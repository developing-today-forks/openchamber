import type { ChildStoreManager } from '@/sync/child-store';
import type { SessionGroup } from '../types';
import type { ProjectSection } from '../projects/sessionProjectRender';
import type { SessionSidebarGroupStatus } from '../sessionSidebarRowModel';
export declare const useSidebarGroupStatus: ({ childStores, sections, chatGroup, canGrantAccess, }: {
    childStores: ChildStoreManager;
    sections: readonly ProjectSection[];
    chatGroup: SessionGroup | null;
    canGrantAccess: boolean;
}) => {
    groupStatusByKey: Map<string, SessionSidebarGroupStatus>;
    bootstrapSnapshot: string;
};
