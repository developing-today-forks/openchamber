import * as React from 'react';
import type { ReferencePickerItem, ReferencePickerSelection } from '@/components/references/referencePickerItems';
import type { GitHubPullReference, SourceControlReadContext } from '@/lib/api/types';
/** A project the board acts in: its id and root folder. */
export type SourceBoardProject = {
    id: string;
    path: string;
};
/**
 * What the board does with the previewed item: start work on it, or merge
 * a pull request.
 *
 * `project` is where work starts; for a Linear issue the board picks it from
 * the team's mapping. `context` reads and changes the project's repository.
 */
export declare const SourceBoardActions: React.FC<{
    item: ReferencePickerItem;
    project: SourceBoardProject | null;
    context: SourceControlReadContext | null;
    onStartWorktree: (project: SourceBoardProject, selection: ReferencePickerSelection) => void;
    onChanged: () => void;
    /** Left of the actions: where a Linear issue's session starts, with a way to pick another project. */
    startIn?: React.ReactNode;
    /** The phone shell's page closes once a session starts; the desktop page closes on its own. */
    onLeave?: () => void;
    /** False for an item of a repository under the project's root: a worktree needs the project itself to be one. */
    worktreeAvailable: boolean;
}>;
/**
 * Where to look at a PR's changes: the diff view's PR comparison, or its
 * walkthrough. Both open in the panel beside the chat on screen and read the
 * PR through the project's own folder: the folder the app shows when it
 * belongs to the project, else the project's root, without the app moving
 * there; a PR of a repository under a root that is not one is read through
 * that repository, leaving the Git selection alone. With no chat on screen
 * the app opens a draft of the project first. The phone shell has no side
 * panel: there Changes opens the workspace drawer's Git tab on the PR, in the
 * project's draft when the app shows another, `onLeave` gives the chat back
 * underneath it, and the walkthrough is not offered.
 */
export declare const SourceBoardPullLinks: React.FC<{
    pull: GitHubPullReference;
    project: SourceBoardProject;
    /** The folder the board reads; a repository under the project's root when the root is not one. */
    repository: string | null;
    context: SourceControlReadContext;
    projectOwnsDirectory: (directory: string | undefined) => boolean;
    currentDirectory: string | undefined;
    onLeave?: () => void;
}>;
/**
 * Close or reopen for the previewed issue or PR, as items of its state pill's
 * menu. Null for a merged PR or Linear, which have neither here.
 */
export declare const SourceBoardStateMenuItems: React.FC<{
    item: ReferencePickerItem;
    context: SourceControlReadContext;
    onChanged: () => void;
}>;
