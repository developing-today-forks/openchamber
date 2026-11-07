/**
 * The mobile composer's pill ↔ full-composer state machine.
 *
 * With the keyboard closed the composer collapses into a narrow pill; any
 * interaction expands it back. The swap commits synchronously and, in the
 * native iOS shell, plays as a FLIP morph timed to the keyboard
 * (mobileComposerMorph.ts), while the transcript glides on the same curve
 * (keyboardFollowGlide.ts), so keyboard, composer and chat move as one
 * motion rather than a staircase.
 *
 * Most of the code here is not the state machine itself but the corrections
 * that keep it from fighting the platform: mobile browsers dismiss the
 * keyboard on a tap before the click lands, iOS refuses programmatic focus
 * outside a gesture, WebKit leaves the layout viewport panned after the
 * keyboard hides, and overlay chains hand off through a frame where nothing
 * is open. Every timeout and flushSync below marks one of those, and none of
 * them is verifiable outside a real device.
 */
import React from 'react';
import type { ComposerEditorHandle } from '../editor/ComposerEditor';
/**
 * Everything that must keep the composer expanded even with the keyboard
 * down. Collapsing under an open sheet would unmount the focused editor and
 * kill the keyboard the sheet is about to hand back.
 */
interface MobileComposerHolders {
    controlsPanelOpen: boolean;
    attachMenuOpen: boolean;
    draftPickerOpen: boolean;
    /** The GitHub or Linear reference picker. */
    referencePickerOpen: boolean;
    isDragging: boolean;
}
export interface MobileComposerShellOptions {
    isMobile: boolean;
    editorRef: React.RefObject<ComposerEditorHandle | null>;
    formRef: React.RefObject<HTMLFormElement | null>;
    setExpandedInput: (expanded: boolean) => void;
    holders: MobileComposerHolders;
    /**
     * Keep the full composer up permanently and never fall back to the pill.
     * The pill exists to buy screen back from the soft keyboard; with a
     * hardware keyboard on a tablet there is no soft keyboard to hide from,
     * and collapsing between keystrokes would only cost the user a tap.
     */
    alwaysExpanded?: boolean;
}
export interface MobileComposerShell {
    /** The full composer is showing rather than the collapsed pill. */
    expanded: boolean;
    /** The editor has focus; the best keyboard proxy a browser offers. */
    focused: boolean;
    /** A MobileOverlayPanel is mounted in the shared portal root. */
    overlayHostBusy: boolean;
    dictationActive: boolean;
    /** Expand and focus, synchronously, from inside a user gesture. */
    expand: () => void;
    onDictationActiveChange: (active: boolean) => void;
    /**
     * Hold the composer open through a dictation insert-and-send submit.
     * The transcript resolves asynchronously; without this the 30ms
     * dictation-end collapse runs first and folds the composer into the pill
     * while the submit is still assembling — the editor unmounts mid-send.
     * Released once the submit settles (sent or failed).
     */
    holdDictationSend: (held: boolean) => void;
    onEditorFocus: () => void;
    onEditorBlur: () => void;
    /** Suppress the keyboard restore when another overlay opens next. */
    skipNextOverlayCloseRestore: () => void;
    /** Cancel a pending keyboard restore entirely (a native picker takes over). */
    cancelOverlayCloseRestore: () => void;
}
export declare function useMobileComposerShell(options: MobileComposerShellOptions): MobileComposerShell;
export {};
