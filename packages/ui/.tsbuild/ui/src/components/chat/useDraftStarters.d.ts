import type { IconName } from '@/components/icon/icons';
import { type DraftStarterRef, type DraftStarterType } from '@/lib/draftStarters';
type StarterGroup = 'global' | 'project';
export type ResolvedStarter = {
    id: string;
    ref: DraftStarterRef;
    group: StarterGroup;
    label: string;
    icon: IconName;
    submitText: string;
    /** Pinned by the team in the repo's shared config; not removable here. */
    shared: boolean;
};
export type PinnableSection = 'built-in' | 'command' | 'skill';
export type PinnableItem = {
    type: DraftStarterType;
    name: string;
    label: string;
    icon: IconName;
    section: PinnableSection;
    scope: 'user' | 'project';
};
export type UseDraftStartersResult = {
    global: ResolvedStarter[];
    project: ResolvedStarter[];
    pinnable: PinnableItem[];
    hasProject: boolean;
    ensureLoaded: () => void;
    addStarter: (item: PinnableItem) => void;
    removeStarter: (group: StarterGroup, ref: DraftStarterRef) => void;
    reorder: (group: StarterGroup, fromId: string, toId: string) => void;
    /** Move one of the user's project starters into the repo's shared file. */
    shareStarter: (ref: DraftStarterRef) => void;
    /** Move a shared project starter back into the user's own list. */
    unshareStarter: (ref: DraftStarterRef) => void;
};
export declare function useDraftStarters(): UseDraftStartersResult;
export {};
