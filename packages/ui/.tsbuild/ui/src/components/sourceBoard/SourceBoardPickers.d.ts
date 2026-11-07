/**
 * The board's scope pickers, drawn like the draft composer's project picker:
 * a quiet trigger with the project's icon and name, and a searchable list.
 */
import * as React from 'react';
import type { LinearTeamMapping, ProjectEntry } from '@/lib/api/types';
/** `toolbar`: the board's scope, beside the search. `inline`: a smaller one inside a sentence. */
type PickerSize = 'toolbar' | 'inline';
export declare const SourceBoardProjectPicker: React.FC<{
    projects: readonly ProjectEntry[];
    selected: ProjectEntry;
    onSelect: (projectId: string) => void;
    ariaLabel: string;
    size: PickerSize;
    /** The phone shell picks from a bottom sheet: a popup there cannot scroll far enough for a long list. */
    sheet?: boolean;
}>;
/**
 * Which repository under the project's folder the board lists, or all of them
 * together, shown beside the project picker while the folder is not a
 * repository itself.
 */
export declare const SourceBoardRepositoryPicker: React.FC<{
    repositories: readonly string[];
    /** The listed repository's folder; null while the board lists all of them. */
    selected: string | null;
    /** The project's folder the repository paths are shown relative to. */
    root: string;
    /** Offers "All repositories" first; not where the runtime cannot list across repositories. */
    allAvailable: boolean;
    /** A repository's folder, or null for all of them. */
    onSelect: (repository: string | null) => void;
    /** The phone shell picks from a bottom sheet, like the project picker. */
    sheet?: boolean;
}>;
/**
 * Which Linear team the board lists, and which workspace when more than one
 * is connected: workspaces are few and switched rarely, so they share the menu.
 */
export declare const SourceBoardTeamPicker: React.FC<{
    teams: readonly LinearTeamMapping[];
    selectedTeamId: string | null;
    onSelectTeam: (teamId: string | null) => void;
    onWorkspaceSwitched: () => void;
}>;
export {};
