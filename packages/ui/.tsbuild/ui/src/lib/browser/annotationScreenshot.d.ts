/**
 * Turns a native page capture plus an annotation payload into the image the
 * agent receives.
 *
 * The image is the whole visible page, with the marked targets drawn on top —
 * not a crop around them. A tight crop answers "what does this element look
 * like" but destroys the answer to "where is it and what is it next to", which
 * is usually the more useful half of pointing at something.
 *
 * The capture arrives in device pixels while every rectangle in the payload is
 * in CSS pixels, so everything is scaled by the ratio between the two rather
 * than by `devicePixelRatio` — the page may be zoomed, and the measured ratio
 * stays correct when it is.
 */
import type { BrowserAnnotationPayload, BrowserPoint } from './contract';
export declare const renderAnnotationScreenshot: ({ base64, mime, captureWidth, captureHeight, cssWidth, cssHeight, cssOrigin, payload, accentColor, accentFill, }: {
    base64: string;
    mime: string;
    captureWidth: number;
    captureHeight: number;
    cssWidth: number;
    cssHeight: number;
    /** Where the captured area starts in the page's viewport, when the capture shows only part of it. */
    cssOrigin?: BrowserPoint;
    payload: BrowserAnnotationPayload;
    /** Solid outline color. */
    accentColor: string;
    /**
     * Translucent fill, resolved by the caller. Never derive this by appending an
     * alpha suffix to `accentColor`: theme colors are not necessarily hex, and an
     * invalid value leaves canvas on its default opaque black, which paints over
     * the very element the screenshot is meant to show.
     */
    accentFill: string;
}) => Promise<File | null>;
