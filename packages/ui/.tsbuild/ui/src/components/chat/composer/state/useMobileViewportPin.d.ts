/**
 * Pinning the composer to the visual viewport in mobile browsers.
 *
 * Capacitor has a keyboard choreography that resizes the shell, so the
 * composer stays where it belongs on its own. A mobile browser has nothing of
 * the sort: Safari pans the visual viewport over an unchanged layout instead
 * of shrinking it, so a composer positioned in normal flow ends up partly
 * off-screen or behind the keyboard. Every effect here exists to put it back,
 * and all are deliberately restricted to non-Capacitor mobile browsers — the
 * last one to the iPad Home Screen app, at any width.
 *
 * The WebKit behaviors they correct are only verifiable on a device, and every
 * guard in them marks a case that was observed breaking; tests cover the iPad
 * lift's arithmetic and when the keyboard pins measure.
 */
import React from 'react';
import type { ComposerEditorHandle } from '../editor/ComposerEditor';
export interface MobileViewportPinOptions {
    isMobile: boolean;
    /** Composer expanded to fullscreen on mobile. */
    isFullscreen: boolean;
    /** The new-session draft screen is showing. */
    isDraftScreen: boolean;
    /** The composer has focus, i.e. the keyboard is up. */
    isFocused: boolean;
    formRef: React.RefObject<HTMLFormElement | null>;
    editorRef: React.RefObject<ComposerEditorHandle | null>;
}
export declare function useMobileViewportPin(options: MobileViewportPinOptions): void;
