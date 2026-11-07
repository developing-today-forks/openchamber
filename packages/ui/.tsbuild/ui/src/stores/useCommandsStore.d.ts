import type { StoreApi, UseBoundStore } from "zustand";
export type CommandScope = 'user' | 'project';
/**
 * The command entity as OpenChamber persists it, i.e. the OpenCode 2 shape the
 * config routes read and write. `template` is the markdown body of a `.md`
 * command; `model` is the joined `provider/model#variant` string; `subagent`
 * runs the command in a child session instead of the current one.
 */
export interface CommandConfig {
    name: string;
    description?: string;
    agent?: string | null;
    model?: string | null;
    source?: string;
    template?: string;
    subagent?: boolean;
    scope?: CommandScope;
}
export interface Command extends CommandConfig {
    isBuiltIn?: boolean;
    /** The file OpenChamber would rewrite on the next save. */
    path?: string | null;
    /** The file still uses v1 spellings; the next save rewrites it in v2. */
    legacy?: boolean;
}
export declare const isCommandBuiltIn: (command: Command) => boolean;
export declare const invalidateCommandsLoadCache: (directory?: string | null) => void;
interface CommandDraft {
    name: string;
    scope: CommandScope;
    description?: string;
    agent?: string | null;
    model?: string | null;
    template?: string;
    subagent?: boolean;
}
interface CommandsStore {
    selectedCommandName: string | null;
    /** Commands of the project the app is on. Chat and autocompletes read this one. */
    commands: Command[];
    /** Every directory loaded so far, including the ambient one. */
    commandsByDirectory: Record<string, Command[]>;
    isLoading: boolean;
    commandDraft: CommandDraft | null;
    setSelectedCommand: (name: string | null) => void;
    setCommandDraft: (draft: CommandDraft | null) => void;
    loadCommands: (directory?: string | null) => Promise<boolean>;
    resetForRuntimeSwitch: () => void;
    createCommand: (config: CommandConfig, directory?: string | null) => Promise<boolean>;
    updateCommand: (name: string, config: Partial<CommandConfig>, directory?: string | null) => Promise<boolean>;
    deleteCommand: (name: string, directory?: string | null) => Promise<boolean>;
    getCommandByName: (name: string, directory?: string | null) => Command | undefined;
}
declare global {
    interface Window {
        __zustand_commands_store__?: UseBoundStore<StoreApi<CommandsStore>>;
    }
}
/**
 * Commands of one project. Returns a stored array so components can select it
 * directly; an omitted directory means the project the app is on.
 */
export declare const selectCommandsForDirectory: (state: Pick<CommandsStore, 'commandsByDirectory'>, directory?: string | null) => Command[];
export declare const useCommandsStore: UseBoundStore<Omit<Omit<StoreApi<CommandsStore>, "devtools" | "setState"> & {
    setState(partial: CommandsStore | Partial<CommandsStore> | ((state: CommandsStore) => CommandsStore | Partial<CommandsStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: CommandsStore | ((state: CommandsStore) => CommandsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: CommandsStore | Partial<CommandsStore> | ((state: CommandsStore) => CommandsStore | Partial<CommandsStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: CommandsStore | ((state: CommandsStore) => CommandsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<CommandsStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: CommandsStore) => void) => () => void;
        onFinishHydration: (fn: (state: CommandsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<CommandsStore, unknown, unknown>>;
    };
}>;
export {};
