/**
 * Composer dictation controls: a mic button for the composer footer plus a
 * full-composer overlay while dictation is active (recording, transcribing,
 * or failed). The overlay mirrors the composer's own layout — the transcript
 * area uses the same paddings/typography as the textarea and the action row
 * reuses the footer icon-button styling — so toggling dictation causes no
 * vertical shift.
 *
 * No text appears while recording. The server transcribes the audio once the
 * user stops, so the overlay shows the recording state and then Transcribing.
 * The only transcript rendered here is the salvage text of a failed dictation.
 */
import React from 'react';
interface ComposerDictationProps {
    radius?: number | string;
    isMobile: boolean;
    footerIconButtonClass: string;
    footerPaddingClass: string;
    iconSizeClass: string;
    sendIconSizeClass: string;
    disabled?: boolean;
    onInsert: (text: string) => void;
    onInsertAndSend: (text: string) => void;
    /** Called once when a dictation leaves idle, before any transcript exists,
        so the host can record which draft the dictation belongs to. */
    onStart?: () => void;
    /** Called when the record-and-send button is pressed, before the async
        transcript resolves; the host holds the composer open until onInsert
        or onInsertAndSend settles. */
    onSendStart?: () => void;
    /** Reports whether dictation is active (recording/transcribing/failed overlay shown). */
    onActiveChange?: (active: boolean) => void;
    /** Reports the height (px) failed-dictation salvage text needs, so the host
        can grow the composer like typed text would; null when none is shown. */
    onContentHeightChange?: (height: number | null) => void;
    /** Render the mic trigger button (default). Pass false when the host renders
        its own trigger and only needs the overlay + recording engine. */
    renderTrigger?: boolean;
    /** Rendered at the very top of the active overlay (e.g. the mobile composer
        drag handle, so swipe-expand keeps working in Listening mode). */
    topAccessory?: React.ReactNode;
}
export declare const ComposerDictation: React.FC<ComposerDictationProps>;
export {};
