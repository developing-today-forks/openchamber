/**
 * Renders a browser annotation into the text the agent actually reads.
 *
 * The body is deliberately English regardless of UI locale: it is prompt
 * content, not interface copy. Only the caller-supplied intro is translated,
 * because that line is echoed back to the user in the composer.
 */
import type { BrowserAnnotationPayload } from './contract';
export declare const formatBrowserAnnotationPrompt: ({ payload, screenshotAttached, intro, }: {
    payload: BrowserAnnotationPayload;
    screenshotAttached: boolean;
    intro: string;
}) => string;
