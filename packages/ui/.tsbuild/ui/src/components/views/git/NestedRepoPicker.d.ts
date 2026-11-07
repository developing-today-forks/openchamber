import React from 'react';
type NestedRepoPickerProps = {
    /** Discovered repository paths under the project root. */
    repositories: string[];
    /** Currently selected repository path (the operating directory). */
    selectedRepository: string | null;
    onSelectRepository: (repository: string) => void;
    /** Root the repository paths are relative to for display labels. */
    repositoryRoot?: string;
};
/**
 * Repository switcher shown on git surfaces when nested repositories were
 * discovered under a project root that is not itself a git repository, or is
 * one with no commits yet (then the root is listed first).
 */
export declare const NestedRepoPicker: React.FC<NestedRepoPickerProps>;
export {};
