/**
 * Input Store — pending input text, synthetic parts, and attached files.
 * Extracted from session-ui-store for subscription isolation.
 */
import type { AttachIssueRequest } from '@openchamber/sdk';
import type { ContextPartMetadata } from '@/lib/messages/contextParts';
import type { AttachedFile } from "@/stores/types/sessionTypes";
import { type ChatDraftIdentity } from "@/lib/chatDraftPersistence";
export declare const prepareLocalAttachments: (file: File, reservedFilenames?: Iterable<string>) => Promise<AttachedFile[] | undefined>;
export type SyntheticContextPart = {
    text: string;
    attachments?: AttachedFile[];
    synthetic?: boolean;
    metadata?: ContextPartMetadata;
};
type PendingBtwComposerRequest = {
    parentSessionId: string;
    text: string;
};
export type VSCodeActiveEditorFile = {
    filePath: string;
    fileName: string;
    relativePath: string;
    fileSize: number | null;
    selection: {
        startLine: number;
        endLine: number;
        text: string;
    } | null;
};
export type InputState = {
    pendingComposerRestore: {
        target: ChatDraftIdentity;
        text: string;
        files: Array<{
            url: string;
            mimeType: string;
            filename: string;
        }>;
    } | null;
    consumePendingComposerRestore: (target: ChatDraftIdentity | null) => InputState["pendingComposerRestore"];
    pendingInputText: string | null;
    pendingInputMode: "replace" | "append" | "append-inline";
    /**
     * Who the pending text is for. Null is the main chat's composer, which
     * app-wide sources (plugins, git dialogs, file selections) write to; a
     * session id is the composer of a chat pinned in the side panel on that
     * session, which text quoted inside that chat is written to.
     */
    pendingInputTarget: string | null;
    /** Pending context for the main chat's composer. */
    pendingSyntheticParts: SyntheticContextPart[] | null;
    /** Pending context for pinned composers, by their session id. */
    pinnedSyntheticParts: Map<string, SyntheticContextPart[]>;
    /**
     * Text a draft preset chip asked to submit immediately. Set by surfaces that
     * render the chips outside ChatInput (e.g. under the welcome message on
     * narrow layouts); consumed by ChatInput, which owns the command-aware submit.
     */
    pendingPresetSubmit: {
        text: string;
        type: "command" | "skill";
    } | null;
    /**
     * A first message to send from one new-session draft as soon as its
     * composer can send (a native Shortcuts request). Bound to the draft's id,
     * so it never goes out from another draft or a session; a composer that
     * finds a different draft open drops it.
     */
    pendingDraftSubmit: {
        draftId: number;
        text: string;
    } | null;
    /**
     * Texts to send in one chat's session, asked for from its transcript (a
     * question answered again from its tool row), queued in request order: a
     * second answer never replaces one still waiting to be sent. `target`
     * names the composer like `pendingInputTarget`: null for the main chat,
     * the session id for a chat pinned in the side panel. That composer sends
     * each queued text only while it shows `sessionId`, and drops it
     * otherwise; other composers leave it alone.
     */
    pendingSessionSubmits: {
        target: string | null;
        sessionId: string;
        text: string;
    }[];
    /** Guest rail/dialog attach. ChatInput consumes this into the composer chip. */
    pendingGuestIssue: AttachIssueRequest | null;
    pendingBtwComposerRequest: PendingBtwComposerRequest | null;
    attachedFiles: AttachedFile[];
    attachmentDraftKey: string | null;
    attachmentDrafts: Map<string, AttachedFile[]>;
    selectAttachmentDraft: (target: ChatDraftIdentity | null) => void;
    restoreAttachedFiles: (files: AttachedFile[], target: ChatDraftIdentity | null) => void;
    /** Moves one draft's files onto another draft's, as when `/btw` takes over the typed prompt. */
    moveAttachedFiles: (from: ChatDraftIdentity | null, to: ChatDraftIdentity | null) => void;
    activeEditorFile: VSCodeActiveEditorFile | null;
    setPendingInputText: (text: string | null, mode?: "replace" | "append" | "append-inline", target?: string | null) => void;
    consumePendingInputText: (target?: string | null) => {
        text: string;
        mode: "replace" | "append" | "append-inline";
    } | null;
    requestPresetSubmit: (text: string, type: "command" | "skill") => void;
    consumePendingPresetSubmit: () => {
        text: string;
        type: "command" | "skill";
    } | null;
    requestDraftSubmit: (draftId: number, text: string) => void;
    /** Takes the pending text when it belongs to this draft; any other pending request is dropped. */
    consumePendingDraftSubmit: (draftId: number | null) => string | null;
    requestSessionSubmit: (request: {
        target: string | null;
        sessionId: string;
        text: string;
    }) => void;
    /** Takes the earliest queued text for this composer; a queued request for this composer and another session is dropped. */
    consumePendingSessionSubmit: (target: string | null, sessionId: string | null) => string | null;
    setPendingGuestIssue: (issue: AttachIssueRequest | null) => void;
    consumePendingGuestIssue: () => AttachIssueRequest | null;
    requestBtwComposer: (request: PendingBtwComposerRequest) => void;
    consumePendingBtwComposerRequest: (parentSessionId: string | null) => PendingBtwComposerRequest | null;
    setPendingSyntheticParts: (parts: SyntheticContextPart[] | null, target?: string | null) => void;
    consumePendingSyntheticParts: (target?: string | null) => SyntheticContextPart[] | null;
    getPendingSyntheticParts: (target?: string | null) => SyntheticContextPart[] | null;
    addAttachedFile: (file: File) => Promise<boolean>;
    removeAttachedFile: (id: string) => void;
    setAttachedFiles: (files: AttachedFile[], target?: ChatDraftIdentity | null) => void;
    clearAttachedFiles: (target?: ChatDraftIdentity | null) => void;
    addVSCodeFileAttachment: (path: string, name: string, fileSize: number | null) => void;
    addVSCodeSelectionAttachment: (path: string, file: File) => Promise<void>;
    setActiveEditorFile: (file: VSCodeActiveEditorFile | null) => void;
    /** Add attachments restored from a reverted message (file already on server) */
    addRestoredAttachment: (file: {
        url: string;
        mimeType: string;
        filename: string;
    }) => void;
};
export declare const useInputStore: import("zustand").UseBoundStore<import("zustand").StoreApi<InputState>>;
/**
 * The attachments of one composer draft, whether or not it holds the selected
 * slot. Two composers can be on screen at once (a chat pinned in the side
 * panel); each shows its own files while only the one the user last worked
 * in holds `attachedFiles`. With a single composer the draft is always the
 * selected one, so this reads `attachedFiles`.
 */
export declare const useDraftAttachedFiles: (target: ChatDraftIdentity | null | undefined) => AttachedFile[];
export {};
