import type { StoreApi, UseBoundStore } from "zustand";
export type SkillScope = 'user' | 'project';
export type SkillSource = 'opencode' | 'claude' | 'agents';
export interface SupportingFile {
    name: string;
    path: string;
    fullPath: string;
}
interface SkillSources {
    md: {
        exists: boolean;
        path: string | null;
        dir: string | null;
        fields: string[];
        scope?: SkillScope | null;
        source?: SkillSource | null;
        supportingFiles: SupportingFile[];
        supportingFilesTruncated?: boolean;
        name?: string;
        description?: string;
        instructions?: string;
        /** The model only loads the skill when asked for it by name. */
        disableModelInvocation?: boolean;
    };
    projectMd?: {
        exists: boolean;
        path: string | null;
    };
    claudeMd?: {
        exists: boolean;
        path: string | null;
    };
    userMd?: {
        exists: boolean;
        path: string | null;
    };
    userClaudeMd?: {
        exists: boolean;
        path: string | null;
    };
    userAgentsMd?: {
        exists: boolean;
        path: string | null;
    };
}
export interface DiscoveredSkill {
    name: string;
    path: string;
    scope: SkillScope;
    source: SkillSource;
    description?: string;
    /** Domain folder parsed from file path, e.g. "automation-ai", "lark-ecosystem" */
    group?: string;
    /** Authoritative server flag: skill lives under a managed root and can be renamed in place. */
    renamable?: boolean;
}
export interface SkillConfig {
    name: string;
    description: string;
    instructions?: string;
    scope?: SkillScope;
    source?: SkillSource;
    targetPath?: string;
    supportingFiles?: Array<{
        path: string;
        content: string;
    }>;
    disableModelInvocation?: boolean;
}
export interface PendingFile {
    path: string;
    content: string;
}
interface SkillDraft {
    name: string;
    scope: SkillScope;
    source?: SkillSource;
    description: string;
    instructions?: string;
    pendingFiles?: PendingFile[];
}
interface SkillDetail {
    name: string;
    sources: SkillSources;
    scope?: SkillScope | null;
    source?: SkillSource | null;
}
interface SkillsStore {
    selectedSkillName: string | null;
    /** Skills of the project the app is on. Chat and autocompletes read this one. */
    skills: DiscoveredSkill[];
    /** Every directory loaded so far, including the ambient one. */
    skillsByDirectory: Record<string, DiscoveredSkill[]>;
    isLoading: boolean;
    skillDraft: SkillDraft | null;
    setSelectedSkill: (name: string | null) => void;
    setSkillDraft: (draft: SkillDraft | null) => void;
    loadSkills: (directory?: string | null) => Promise<boolean>;
    getSkillDetail: (name: string, directory?: string | null) => Promise<SkillDetail | null>;
    createSkill: (config: SkillConfig, directory?: string | null) => Promise<boolean>;
    updateSkill: (name: string, config: Partial<SkillConfig>, directory?: string | null) => Promise<boolean>;
    renameSkill: (name: string, newName: string, directory?: string | null) => Promise<boolean>;
    /** `location` deletes only the copy in that scope and source; without it every copy of the name goes. */
    deleteSkill: (name: string, directory?: string | null, location?: {
        scope: SkillScope;
        source: SkillSource;
    }) => Promise<boolean>;
    getSkillByName: (name: string, directory?: string | null) => DiscoveredSkill | undefined;
    /**
     * Skills are discovered on the connected instance and cached by directory,
     * which two instances can share — so a switch must drop the caches rather
     * than report the previous instance's skills for the new one.
     */
    resetForRuntimeSwitch: () => void;
    readSupportingFile: (skillName: string, filePath: string, directory?: string | null) => Promise<string | null>;
    writeSupportingFile: (skillName: string, filePath: string, content: string, directory?: string | null) => Promise<boolean>;
    deleteSupportingFile: (skillName: string, filePath: string, directory?: string | null) => Promise<boolean>;
}
declare global {
    interface Window {
        __zustand_skills_store__?: UseBoundStore<StoreApi<SkillsStore>>;
    }
}
export declare const invalidateSkillsLoadCache: (directory?: string | null) => void;
/**
 * Skills of one project. Returns a stored array so components can select it
 * directly; an omitted directory means the project the app is on.
 */
export declare const selectSkillsForDirectory: (state: Pick<SkillsStore, 'skillsByDirectory'>, directory?: string | null) => DiscoveredSkill[];
export declare const useSkillsStore: UseBoundStore<Omit<Omit<StoreApi<SkillsStore>, "devtools" | "setState"> & {
    setState(partial: Partial<SkillsStore> | SkillsStore | ((state: SkillsStore) => Partial<SkillsStore> | SkillsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: SkillsStore | ((state: SkillsStore) => SkillsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<SkillsStore> | SkillsStore | ((state: SkillsStore) => Partial<SkillsStore> | SkillsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: SkillsStore | ((state: SkillsStore) => SkillsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SkillsStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SkillsStore) => void) => () => void;
        onFinishHydration: (fn: (state: SkillsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SkillsStore, unknown, unknown>>;
    };
}>;
export declare function refreshSkillsAfterOpenCodeRestart(options?: {
    message?: string;
    delayMs?: number;
}): Promise<void>;
export {};
