import React from 'react';
type Project = {
    id: string;
};
type SessionProjectViewStateArgs = {
    isVSCode: boolean;
    projects: readonly Project[];
};
export declare const useSessionProjectViewState: ({ isVSCode, projects, }: SessionProjectViewStateArgs) => {
    state: {
        collapsedProjects: Set<string>;
        collapsedGroups: Set<string>;
        collapsedActivities: Set<string>;
        groupOrderByProject: Map<string, string[]>;
    };
    actions: {
        setCollapsedProjects: React.Dispatch<React.SetStateAction<Set<string>>>;
        toggleProject: (projectId: string) => void;
        collapseAll: () => void;
        expandAll: () => void;
        scheduleCollapsedProjectsPersist: (collapsed: Set<string>) => void;
        setCollapsedGroups: React.Dispatch<React.SetStateAction<Set<string>>>;
        setCollapsedActivities: React.Dispatch<React.SetStateAction<Set<string>>>;
        toggleGroup: (key: string) => void;
        setGroupOrderByProject: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
        getOrderedGroups: (projectId: string, groups: import("../types").SessionGroup[]) => import("../types").SessionGroup[];
    };
};
export {};
