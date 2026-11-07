import React from 'react';
type Project = {
    id: string;
    path: string;
    normalizedPath: string;
};
type Args = {
    enabled?: boolean;
    normalizedProjects: Project[];
    gitRepoStatus: Map<string, {
        isGitRepo: boolean | null;
        branch: string | null;
    }>;
    setProjectRepoStatus: React.Dispatch<React.SetStateAction<Map<string, boolean | null>>>;
    setProjectRootBranches: React.Dispatch<React.SetStateAction<Map<string, string>>>;
};
export declare const useProjectRepoStatus: (args: Args) => void;
export {};
