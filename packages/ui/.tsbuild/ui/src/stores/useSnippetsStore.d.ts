import type { Snippet } from '@/types/snippet';
export type SnippetScope = 'global' | 'project';
interface SnippetDraft {
    name: string;
    scope: SnippetScope;
    content?: string;
    aliases?: string[];
    description?: string;
}
interface SnippetsStore {
    snippets: Snippet[];
    isLoading: boolean;
    selectedSnippetName: string | null;
    snippetDraft: SnippetDraft | null;
    setSelectedSnippet: (name: string | null) => void;
    setSnippetDraft: (draft: SnippetDraft | null) => void;
    loadSnippets: () => Promise<boolean>;
    createSnippet: (name: string, content: string, options?: {
        aliases?: string[];
        description?: string;
        scope?: SnippetScope;
    }) => Promise<boolean>;
    updateSnippet: (name: string, updates: {
        content?: string;
        aliases?: string[];
        description?: string;
    }) => Promise<boolean>;
    deleteSnippet: (name: string) => Promise<boolean>;
    expandText: (text: string) => Promise<string>;
    getSnippetByName: (name: string) => Snippet | undefined;
}
export declare const useSnippetsStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SnippetsStore>, "devtools" | "setState"> & {
    setState(partial: Partial<SnippetsStore> | SnippetsStore | ((state: SnippetsStore) => Partial<SnippetsStore> | SnippetsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: SnippetsStore | ((state: SnippetsStore) => SnippetsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export {};
