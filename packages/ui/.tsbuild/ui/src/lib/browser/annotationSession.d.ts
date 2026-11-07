/**
 * Drives one annotation session end to end.
 *
 * The overlay resolves only after tearing its own chrome down and waiting for a
 * repaint, so the capture that follows shows the page and none of our UI. The
 * page itself is never modified: annotation marks what is there, it does not
 * edit it.
 */
import { type BrowserAnnotationOverlayLabels, type BrowserAnnotationOverlayTheme } from './annotationOverlay';
import { type BrowserAnnotationPayload, type BrowserRect } from './contract';
export type PageCapture = {
    readonly mime: string;
    readonly base64: string;
    readonly width: number;
    readonly height: number;
    /**
     * The part of the page's viewport the capture shows, in CSS pixels. Absent
     * when it shows the whole viewport; a page in the chat is often taller than
     * the window, and only the part on screen can be photographed.
     */
    readonly viewportArea?: BrowserRect;
};
/**
 * The capabilities an annotation session needs from its host, named so the
 * session can be exercised without a live `<webview>`.
 */
export type AnnotationHost = {
    readonly executeJavaScript: (code: string, userGesture?: boolean) => Promise<unknown>;
    readonly capturePage: () => Promise<PageCapture | null>;
};
export type AnnotationSessionResult = {
    readonly payload: BrowserAnnotationPayload;
    readonly screenshot: File | null;
};
/** Best-effort cleanup of an overlay left behind by a previous session. */
export declare const cancelAnnotationSession: (host: AnnotationHost) => Promise<void>;
export declare const runAnnotationSession: ({ host, theme, labels, }: {
    host: AnnotationHost;
    theme: BrowserAnnotationOverlayTheme;
    labels: BrowserAnnotationOverlayLabels;
}) => Promise<AnnotationSessionResult | null>;
