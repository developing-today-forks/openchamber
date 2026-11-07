/**
 * What the project page edits in a project's setup, and how each edit maps
 * onto the two files behind it: the team's `.openchamber/project.json` in the
 * repo (`shared`) and the user's own config (`personal`).
 *
 * The page shows one list per kind with every entry marked by where it lives,
 * so an edit writes the file the entry is in, and a move between the files is
 * a write to the destination followed by a removal from the source. The
 * server merges actions by id with the personal copy winning, so a move whose
 * second write fails leaves the entry visible once rather than losing it.
 */
import type { IconName } from '@/components/icon/icons';
import type { OpenChamberProjectAction, ProjectSetup, ProjectSetupSource } from '@/lib/openchamberConfig';
/** An action without an icon, or with one this build does not know, shows the play icon. */
export declare const projectActionIconName: (icon: string | null | undefined) => IconName;
export type ProjectActionPlatform = NonNullable<OpenChamberProjectAction['platforms']>[number];
/** Operating system names, shown as they are in every language. */
export declare const PROJECT_ACTION_PLATFORMS: Array<{
    value: ProjectActionPlatform;
    label: string;
}>;
export type ProjectActionEntry = {
    action: OpenChamberProjectAction;
    source: ProjectSetupSource;
    /** A team action the user hid from their own run menu. */
    hidden: boolean;
};
/**
 * Every action the user can see or bring back: the team's (a personal action
 * with the same id overrides it, so it shows once, as personal) then their own.
 */
export declare const listProjectActions: (setup: ProjectSetup) => ProjectActionEntry[];
/** A file the team shares can be written only when it was read: a write replaces a broken file. */
export declare const canWriteShared: (setup: ProjectSetup) => boolean;
export type ProjectSetupWriters = {
    personalActions: (actions: OpenChamberProjectAction[]) => Promise<boolean>;
    sharedActions: (actions: OpenChamberProjectAction[]) => Promise<boolean>;
    hiddenSharedActionIds: (ids: string[]) => Promise<boolean>;
    personalCommands: (commands: string[]) => Promise<boolean>;
    sharedCommands: (commands: string[]) => Promise<boolean>;
};
/**
 * Save `action` into `to`. `from` is where it lives now, or null for a new
 * one. Resolves false when a write failed; the caller reloads either way.
 */
export declare const saveProjectAction: (setup: ProjectSetup, write: ProjectSetupWriters, action: OpenChamberProjectAction, from: ProjectSetupSource | null, to: ProjectSetupSource) => Promise<boolean>;
export declare const deleteProjectAction: (setup: ProjectSetup, write: ProjectSetupWriters, entry: ProjectActionEntry) => Promise<boolean>;
export declare const setSharedActionHidden: (setup: ProjectSetup, write: ProjectSetupWriters, id: string, hidden: boolean) => Promise<boolean>;
type SetupCommandEntry = {
    command: string;
    source: ProjectSetupSource;
    /** Position in its own file's list. */
    index: number;
    /** A team command the user's "only my commands" mode leaves out. */
    skipped: boolean;
};
/** The commands in the order a new worktree runs them: the team's, then the user's. */
export declare const listSetupCommands: (setup: ProjectSetup) => SetupCommandEntry[];
/** Replace a command's text; empty text removes it. */
export declare const editSetupCommand: (setup: ProjectSetup, write: ProjectSetupWriters, entry: SetupCommandEntry, text: string) => Promise<boolean>;
export declare const addSetupCommand: (setup: ProjectSetup, write: ProjectSetupWriters, text: string) => Promise<boolean>;
export declare const removeSetupCommand: (setup: ProjectSetup, write: ProjectSetupWriters, entry: SetupCommandEntry) => Promise<boolean>;
/** Move a command to the other file, appended to the end of its list there. */
export declare const moveSetupCommand: (setup: ProjectSetup, write: ProjectSetupWriters, entry: SetupCommandEntry) => Promise<boolean>;
export {};
