/**
 * Where a new session will run: the project and the directory within it.
 *
 * Desktop uses a searchable project popup and an inline branch/worktree
 * select; mobile uses bottom sheets, because a native select over a
 * keyboard-resized viewport is unusable. Both render the same options from
 * the same hook, and both offer creating a worktree inline so the user does
 * not have to leave the draft to make one.
 */
import React from 'react';
import type { Theme } from '@/types/theme';
import { type DraftTargetProject } from '../state/useDraftTarget';
interface BranchOption {
    value: string;
    label: string;
    pending?: boolean;
}
export interface DraftTargetProps {
    projects: readonly DraftTargetProject[];
    selectedProject: DraftTargetProject;
    selectedDirectory: string | null;
    selectedBranchLabel: string | null;
    selectedBranchIsKnown: boolean;
    /** Shows the warning icon; its explanation opens on hover only. */
    hasUncommittedChanges: boolean;
    projectRootBranchOption: BranchOption | null;
    worktreeBranchOptions: readonly BranchOption[];
    branchItems: readonly BranchOption[];
    showBranchSelector: boolean;
    onProjectChange: (projectId: string) => void;
    onDirectoryChange: (directory: string) => void;
    /** Re-reads the branch and worktree data behind the picker, throttled by the owner. */
    onRefreshTarget?: () => void;
    /**
     * Opens the create dialog of an isolated space; absent where the entry is not offered: while
     * the feature's switch is off, and always in VS Code (decision 16 of the design).
     */
    onCreateSpace?: () => void;
    /** Opens the New Worktree dialog (name, branch, PR or issue) for the draft's project. */
    onCreateCustomWorktree?: () => void;
    theme: Theme;
}
/** A project's icon (custom image, configured icon, or a folder) plus its name. */
export declare function ProjectLabel({ project, theme }: {
    project: DraftTargetProject;
    theme: Theme;
}): import("react/jsx-runtime").JSX.Element;
/** Desktop: inline project and branch selects. */
declare function DraftTargetSelectorsView(props: DraftTargetProps): import("react/jsx-runtime").JSX.Element;
/** Mobile: buttons that open the bottom sheets below. */
export declare function MobileDraftTargetTriggers(props: Pick<DraftTargetProps, 'selectedProject' | 'selectedBranchLabel' | 'showBranchSelector' | 'theme'> & {
    onOpenPicker: (picker: 'project' | 'branch') => void;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Mobile: bottom-sheet project picker shared by the composer draft target and
 * the settings sections' project selector. A bottom sheet rather than a select
 * because a native select over a keyboard-resized viewport is unusable.
 */
interface ProjectPickerSheetProps {
    open: boolean;
    onClose: () => void;
    projects: readonly DraftTargetProject[];
    selectedProjectId: string;
    onSelectProject: (projectId: string) => void;
    theme: Theme;
    title: string;
    searchPlaceholder: string;
}
export declare function ProjectPickerSheet({ open, onClose, projects, selectedProjectId, onSelectProject, theme, title, searchPlaceholder, }: ProjectPickerSheetProps): import("react/jsx-runtime").JSX.Element;
/**
 * Mobile: the project and branch sheets. Bottom sheets rather than selects
 * because a native select over a keyboard-resized viewport is unusable.
 */
export declare function MobileDraftTargetSheets(props: DraftTargetProps & {
    openPicker: 'project' | 'branch' | null;
    onOpenPickerChange: (picker: 'project' | 'branch' | null) => void;
}): import("react/jsx-runtime").JSX.Element;
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const DraftTargetSelectors: React.MemoExoticComponent<typeof DraftTargetSelectorsView>;
export {};
