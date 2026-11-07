import React from 'react';
type MobileFullscreenSurfaceProps = {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    trailing?: React.ReactNode;
    /** If true, leave Escape available to nested content instead of dismissing the surface. */
    disableEscapeDismiss?: boolean;
    /** If true, render no header and let the child render its own (with its own back button). */
    headerless?: boolean;
    /** Drop the header's bottom divider (quiet single-page surfaces). */
    noHeaderBorder?: boolean;
    ariaLabel?: string;
    /**
     * `dialog` packs the same surface into a centered card over a scrim instead
     * of covering the app. Tablets use it: a settings or instances page stretched
     * across a 13" screen is mostly empty space, and losing the chat entirely for
     * an app-level page is a heavier context switch than the content deserves.
     */
    variant?: 'fullscreen' | 'dialog';
    /**
     * What the dialog centers on. App-level pages (settings, instances) belong to
     * the whole window; content that came out of the chat column stays with it.
     */
    dialogAlign?: 'chat' | 'app';
    children: React.ReactNode;
};
/** Fullscreen overlay surface for the phone layout: covers the whole app
    (including the header), slides in from the right like a navigation push,
    and closes via the header back arrow, Escape, or the Android back button. */
export declare const MobileFullscreenSurface: React.FC<MobileFullscreenSurfaceProps>;
export {};
