import React from 'react';
import type { ChatDraftIdentity } from '@/lib/chatDraftPersistence';
import type { ToolPopupContent } from './message/types';
interface AttachedFilesListProps {
    onShowPopup?: (content: ToolPopupContent) => void;
    className?: string;
    /** The composer draft whose files to show; its own even while another composer holds the slot. */
    draftIdentity?: ChatDraftIdentity | null;
}
export declare const AttachedVSCodeFileChips: React.MemoExoticComponent<({ onShowPopup, draftIdentity }: AttachedFilesListProps) => import("react/jsx-runtime").JSX.Element | null>;
export declare const AttachedFilesList: React.MemoExoticComponent<({ onShowPopup, className, draftIdentity }: AttachedFilesListProps) => import("react/jsx-runtime").JSX.Element | null>;
export declare const ActiveEditorFileSuggestion: React.MemoExoticComponent<() => import("react/jsx-runtime").JSX.Element | null>;
interface FilePart {
    type: string;
    mime?: string;
    url?: string;
    filename?: string;
    size?: number;
    source?: Record<string, unknown>;
}
interface MessageFilesDisplayProps {
    files: FilePart[];
    onShowPopup?: (content: ToolPopupContent) => void;
    compact?: boolean;
    /** Compact only: replaces the default top margin, for placement above content. */
    className?: string;
}
export declare const MessageFilesDisplay: React.MemoExoticComponent<({ files, onShowPopup, compact, className }: MessageFilesDisplayProps) => import("react/jsx-runtime").JSX.Element | null>;
export {};
