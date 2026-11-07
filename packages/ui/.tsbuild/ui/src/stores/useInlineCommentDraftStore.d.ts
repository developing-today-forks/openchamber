import type { SourceControlProvider } from '@/lib/source-control/types';
import { z } from 'zod';
import { type ChatQuoteAnchor } from '@/lib/chatQuoteAnchor';
export type InlineCommentSource = 'diff' | 'plan' | 'file' | 'preview-annotation' | 'terminal' | 'pr-comment' | 'pr-check' | 'chat-quote' | 'file-quote';
export type InlineCommentDraftTarget = {
    directory: string;
    sessionKey: string;
};
export interface InlineCommentDraft {
    id: string;
    sessionKey: string;
    source: InlineCommentSource;
    fileLabel: string;
    startLine: number;
    endLine: number;
    side?: 'original' | 'modified';
    code: string;
    language: string;
    text: string;
    /** Owning terminal session; set only for `source: 'terminal'`. */
    terminalId?: string;
    /** Where the quote sits in its message; set only for `source: 'chat-quote'`. */
    anchor?: ChatQuoteAnchor;
    /** Whose change request it came from; set only for `pr-comment` and `pr-check`, absent means GitHub. */
    provider?: SourceControlProvider;
    createdAt: number;
}
export declare const EMPTY_INLINE_COMMENT_DRAFTS: InlineCommentDraft[];
interface InlineCommentDraftState {
    drafts: Record<string, InlineCommentDraft[]>;
    touchedAt: Record<string, number>;
}
interface InlineCommentDraftActions {
    addDraft: (target: InlineCommentDraftTarget, draft: Omit<InlineCommentDraft, 'id' | 'createdAt' | 'sessionKey'> & {
        id?: string;
    }) => string | null;
    updateDraft: (target: InlineCommentDraftTarget, draftId: string, updates: Partial<Omit<InlineCommentDraft, 'id' | 'createdAt' | 'sessionKey'>>) => void;
    removeDraft: (target: InlineCommentDraftTarget, draftId: string) => void;
    clearDrafts: (target: InlineCommentDraftTarget) => void;
    getDrafts: (target: InlineCommentDraftTarget) => InlineCommentDraft[];
    consumeDrafts: (target: InlineCommentDraftTarget) => InlineCommentDraft[];
    restoreDrafts: (target: InlineCommentDraftTarget, drafts: InlineCommentDraft[]) => void;
    getDraftCount: (target: InlineCommentDraftTarget) => number;
    hasDrafts: (target: InlineCommentDraftTarget) => boolean;
    clearSessionDrafts: (runtimeKey: string, directory: string, sessionId: string) => void;
}
type InlineCommentDraftStore = InlineCommentDraftState & InlineCommentDraftActions;
export declare const getInlineCommentDraftKey: (runtimeKey: string, directory: string, sessionKey: string) => string | null;
export declare const persistedDraftEnvelopeSchema: z.ZodObject<{
    drafts: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodUnknown>>;
    touchedAt: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, z.core.$strip>;
type PersistedDraftEnvelopeResult = z.ZodSafeParseResult<z.infer<typeof persistedDraftEnvelopeSchema>>;
/**
 * v2 → v3: terminal drafts carried their terminal id in `language`; move it to
 * the dedicated `terminalId` field. Drafts from the removed 'preview-console'
 * source are dropped, as are malformed entries. Pre-v2 or unreadable payloads
 * reset entirely (the pre-v3 behavior).
 */
export declare const migratePersistedDrafts: (envelope: PersistedDraftEnvelopeResult, version: number) => InlineCommentDraftState;
export declare const useInlineCommentDraftStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<InlineCommentDraftStore>, "devtools" | "setState"> & {
    setState(partial: Partial<InlineCommentDraftStore> | ((state: InlineCommentDraftStore) => Partial<InlineCommentDraftStore> | InlineCommentDraftStore) | InlineCommentDraftStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ((state: InlineCommentDraftStore) => InlineCommentDraftStore) | InlineCommentDraftStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<InlineCommentDraftStore> | ((state: InlineCommentDraftStore) => Partial<InlineCommentDraftStore> | InlineCommentDraftStore) | InlineCommentDraftStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: ((state: InlineCommentDraftStore) => InlineCommentDraftStore) | InlineCommentDraftStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<InlineCommentDraftStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: InlineCommentDraftStore) => void) => () => void;
        onFinishHydration: (fn: (state: InlineCommentDraftStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<InlineCommentDraftStore, unknown, unknown>>;
    };
}>;
export {};
