/**
 * Client for the project setup routes: worktree setup commands, project
 * actions, and pinned draft starters.
 *
 * A project's setup is the merge of two files the server (or the VS Code
 * extension host) owns: the personal one in `~/.config/openchamber/projects/`
 * and, when a team shares it, `<repo>/.openchamber/project.json`. The merged
 * view says what runs; its `shared` and `personal` blocks say where each
 * entry came from, so a Settings page edits the personal block and never
 * copies a teammate's entry into it. This module only speaks HTTP: it
 * resolves no home directory and composes no path, so the same code serves
 * web, desktop, VS Code, and the phone, including a phone driving a remote
 * instance.
 *
 * Reads keep the contract callers were written against: a failed read logs
 * and resolves to the empty setup, because worktree creation and the new
 * session screen must keep working when the config cannot be fetched.
 * Writes resolve `false` on failure.
 */
import { z } from 'zod';
import { type DraftStarterRef } from './draftStarters';
type ProjectRef = {
    id: string;
    path: string;
};
type OpenChamberProjectActionPlatform = 'macos' | 'linux' | 'windows';
/** Where a merged entry came from: the repo's shared file or the user's own file. */
export type ProjectSetupSource = 'shared' | 'personal';
export interface OpenChamberProjectAction {
    id: string;
    name: string;
    command: string;
    icon?: string | null;
    runIn?: 'parent';
    platforms?: OpenChamberProjectActionPlatform[];
    autoOpenUrl?: boolean;
    openUrl?: string;
    desktopOpenSshForward?: string;
    /** Present on merged entries only. */
    source?: ProjectSetupSource;
}
export interface OpenChamberProjectActionsState {
    actions: OpenChamberProjectAction[];
    primaryActionId: string | null;
}
export type ProjectDraftStarter = DraftStarterRef & {
    source: ProjectSetupSource;
};
declare const projectSetupSchema: z.ZodObject<{
    trust: z.ZodObject<{
        hash: z.ZodNullable<z.ZodString>;
        trusted: z.ZodBoolean;
    }, z.core.$strip>;
    setupWorktree: z.ZodArray<z.ZodString>;
    setupWorktreeWait: z.ZodBoolean;
    projectActions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        command: z.ZodString;
        icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        runIn: z.ZodOptional<z.ZodLiteral<"parent">>;
        platforms: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            linux: "linux";
            macos: "macos";
            windows: "windows";
        }>>>;
        autoOpenUrl: z.ZodOptional<z.ZodLiteral<true>>;
        openUrl: z.ZodOptional<z.ZodString>;
        desktopOpenSshForward: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<{
            personal: "personal";
            shared: "shared";
        }>;
    }, z.core.$strip>>;
    projectActionsPrimaryId: z.ZodNullable<z.ZodString>;
    draftStarters: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            command: "command";
            skill: "skill";
        }>;
        name: z.ZodString;
        source: z.ZodEnum<{
            personal: "personal";
            shared: "shared";
        }>;
    }, z.core.$strip>>;
    shared: z.ZodObject<{
        status: z.ZodEnum<{
            invalid: "invalid";
            missing: "missing";
            ok: "ok";
        }>;
        reason: z.ZodOptional<z.ZodString>;
        path: z.ZodString;
        setupWorktree: z.ZodArray<z.ZodString>;
        setupWorktreeWait: z.ZodNullable<z.ZodBoolean>;
        projectActions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            command: z.ZodString;
            icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            runIn: z.ZodOptional<z.ZodLiteral<"parent">>;
            platforms: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                linux: "linux";
                macos: "macos";
                windows: "windows";
            }>>>;
            autoOpenUrl: z.ZodOptional<z.ZodLiteral<true>>;
            openUrl: z.ZodOptional<z.ZodString>;
            desktopOpenSshForward: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        draftStarters: z.ZodPipe<z.ZodUnknown, z.ZodTransform<DraftStarterRef[], unknown>>;
        plansDir: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>;
    personal: z.ZodObject<{
        setupWorktree: z.ZodArray<z.ZodString>;
        setupWorktreeWait: z.ZodNullable<z.ZodBoolean>;
        setupWorktreeMode: z.ZodEnum<{
            append: "append";
            replace: "replace";
        }>;
        projectActions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            command: z.ZodString;
            icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            runIn: z.ZodOptional<z.ZodLiteral<"parent">>;
            platforms: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                linux: "linux";
                macos: "macos";
                windows: "windows";
            }>>>;
            autoOpenUrl: z.ZodOptional<z.ZodLiteral<true>>;
            openUrl: z.ZodOptional<z.ZodString>;
            desktopOpenSshForward: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        projectActionsPrimaryId: z.ZodNullable<z.ZodString>;
        draftStarters: z.ZodPipe<z.ZodUnknown, z.ZodTransform<DraftStarterRef[], unknown>>;
        hiddenSharedActionIds: z.ZodArray<z.ZodString>;
        sharedTrust: z.ZodNullable<z.ZodObject<{
            hash: z.ZodString;
            trustedAt: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ProjectSetup = z.infer<typeof projectSetupSchema>;
/** What a client may change: the personal file only. */
export type ProjectSetupPatch = Partial<{
    setupWorktree: string[];
    setupWorktreeWait: boolean;
    setupWorktreeMode: 'append' | 'replace';
    projectActions: OpenChamberProjectAction[];
    projectActionsPrimaryId: string | null;
    draftStarters: DraftStarterRef[];
    hiddenSharedActionIds: string[];
    /** The trust answer for the shared commands with this hash; `null` forgets it. */
    sharedTrustHash: string | null;
}>;
/**
 * The project's merged setup; throws when it cannot be read. For editors: a
 * list written back after a failed read would replace what is on disk.
 */
export declare function fetchProjectSetup(project: ProjectRef): Promise<ProjectSetup>;
/** The project's merged setup, or the empty setup when it cannot be read. */
export declare function getProjectSetup(project: ProjectRef): Promise<ProjectSetup>;
/** Change the personal part of the project's setup. */
export declare function updateProjectSetup(project: ProjectRef, patch: ProjectSetupPatch): Promise<boolean>;
/** What a client may change in the team's shared file; every named key replaces the current value. */
export type SharedProjectSetupPatch = Partial<{
    setupWorktree: string[];
    setupWorktreeWait: boolean | null;
    projectActions: OpenChamberProjectAction[];
    draftStarters: DraftStarterRef[];
    plansDir: string | null;
}>;
/**
 * Change the team's shared file in the checkout (`<repo>/.openchamber/project.json`).
 * The server removes the file when nothing is left in it, and records trust
 * for the commands this instance just shared. Resolves the merged view, or
 * `null` on failure so a caller can tell "saved nothing" from "saved and empty".
 */
export declare function updateSharedProjectSetup(project: ProjectRef, patch: SharedProjectSetupPatch): Promise<ProjectSetup | null>;
/**
 * The commands a new worktree runs: shared first, then personal (or personal
 * only in replace mode). Code that is about to run them goes through
 * `resolveWorktreeSetupCommands` in `lib/sharedTrustConfirmation.ts` instead,
 * which asks for trust the first time the shared ones would run.
 */
export declare function getWorktreeSetupCommands(project: ProjectRef): Promise<string[]>;
export declare function saveWorktreeSetupCommands(project: ProjectRef, commands: string[]): Promise<boolean>;
export declare function getWorktreeSetupWaitEnabled(project: ProjectRef): Promise<boolean>;
export declare function saveWorktreeSetupWaitEnabled(project: ProjectRef, enabled: boolean): Promise<boolean>;
/** The starters pinned for this project, shared ones first, each marked with its source. */
export declare function getProjectDraftStarters(project: ProjectRef): Promise<ProjectDraftStarter[]>;
/** Replace the user's own project starters; shared ones are untouched. */
export declare function saveProjectDraftStarters(project: ProjectRef, starters: DraftStarterRef[]): Promise<boolean>;
/** The actions the project offers to run: merged, each marked with its source. */
export declare function getProjectActionsState(project: ProjectRef): Promise<OpenChamberProjectActionsState>;
/** Replace the user's own project actions; shared ones are untouched. */
export declare function saveProjectActionsState(project: ProjectRef, value: OpenChamberProjectActionsState): Promise<boolean>;
/**
 * Substitute variables in a command string.
 * Supported variables:
 * - $ROOT_PROJECT_PATH: The root project directory path
 * - $ROOT_WORKTREE_PATH: Legacy alias for $ROOT_PROJECT_PATH
 */
export declare function substituteCommandVariables(command: string, variables: {
    rootWorktreePath: string;
}): string;
export type { ProjectRef };
