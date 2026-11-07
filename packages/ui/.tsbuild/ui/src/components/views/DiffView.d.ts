import React from 'react';
import { type PendingDiffScope } from '@/stores/useUIStore';
import type { GitStatus, GitSubmoduleState } from '@/lib/api/types';
import { type DiffFindWordRequest, type PierreDiffViewerHandle } from './PierreDiffViewer';
import { type FileDiffMetadata } from '@pierre/diffs';
type FileEntry = GitStatus['files'][number] & {
    insertions: number;
    deletions: number;
    isNew: boolean;
};
type DiffContextMode = 'patch' | 'full';
type DiffData = {
    original: string;
    modified: string;
    isBinary?: boolean;
    patch?: string;
    fileDiff?: FileDiffMetadata;
    contextMode?: DiffContextMode;
    /** Set for a live working or staged diff of a submodule; its patch alone can be empty. */
    submodule?: GitSubmoduleState | null;
};
type DiffScope = 'all' | PendingDiffScope;
type ComparisonDiffResult = {
    status: 'loading';
} | {
    status: 'ready';
    data: DiffData;
} | {
    status: 'error';
    message: string;
};
/** A find jump into a file: its entry renders it even past the large-diff gate. */
interface DiffFindReveal {
    /** The match's source key: a file path, or a nested repository row plus the nested path. */
    key: string;
    nonce: number;
}
interface MultiFileDiffEntryProps {
    visible?: boolean;
    directory: string;
    file: FileEntry;
    layout: 'inline' | 'side-by-side';
    wrapLines: boolean;
    /** Show lines that changed only by whitespace as unchanged, without hunk actions. */
    hideWhitespace?: boolean;
    isSelected: boolean;
    isExpanded: boolean;
    isMounted: boolean;
    onSelect: (path: string) => void;
    onExpandedChange: (path: string, expanded: boolean) => void;
    registerSectionRef: (path: string, node: HTMLDivElement | null) => void;
    showOpenInEditorAction?: boolean;
    isOpeningInEditor?: boolean;
    onOpenInEditor?: (filePath: string, diffData: DiffData | null) => void;
    staged?: boolean;
    /**
     * Start with full file contents instead of the 3-line patch. Off in the
     * app: a file loads in full when the user expands its collapsed context.
     */
    loadFullFiles?: boolean;
    initialDiffData?: DiffData | null;
    comparisonDiff?: ComparisonDiffResult;
    onRetryComparisonDiff?: () => void;
    /** Full-context variant of `comparisonDiff` for this file, fetched when the user expands collapsed context. */
    loadFullComparisonDiff?: (filePath: string) => Promise<ComparisonDiffResult>;
    /** Hide stage/unstage/revert actions for branch and commit comparisons. */
    readOnlyActions?: boolean;
    /** Hunk mutations require a live working/index diff, never a turn snapshot. */
    hunkActionsEnabled?: boolean;
    /**
     * Bumped when the working tree may have changed without the status row
     * changing: an edit inside an already-modified line keeps `+1/-1`. A live
     * diff older than this revision is refetched in place, behind the data it
     * still shows.
     */
    contentRevision?: number;
    /** Find-in-diff: register this file's rendered viewer handle. */
    registerViewerRef?: (path: string, handle: PierreDiffViewerHandle | null) => void;
    /** Reports a primary-modifier word click on `path` so the owner can open find on it. */
    onFindWordRequest?: (path: string, request: DiffFindWordRequest) => void;
    /** Reports whether this entry shows the whole file, so find reads it the same way. */
    onFullContextChange?: (path: string, full: boolean) => void;
    /** A find jump into this entry; null when the active match is elsewhere. */
    findReveal?: DiffFindReveal | null;
}
export declare const MultiFileDiffEntry: React.NamedExoticComponent<MultiFileDiffEntryProps>;
interface DiffViewProps {
    visible?: boolean;
    hideStackedFileSidebar?: boolean;
    stackedDefaultCollapsedAll?: boolean;
    pinSelectedFileHeaderToTopOnNavigate?: boolean;
    showOpenInEditorAction?: boolean;
    /**
     * Null opens on the default: Branch on a branch that has one, else the
     * working tree. A scope the person picks is reported and passed back.
     */
    diffScope?: DiffScope | null;
    onDiffScopeChange?: (scope: PendingDiffScope) => void;
    targetFilePath?: string | null;
    /** Render diff content flush with the container edges (no outer padding). */
    flushContent?: boolean;
    /**
     * Another project's folder, for a pull request opened from the Tracker:
     * the view then shows that PR only, read through that project, with
     * nothing tied to the session on screen. Null works in the panel's own.
     */
    directory?: string | null;
}
export declare const DiffView: React.FC<DiffViewProps>;
export {};
