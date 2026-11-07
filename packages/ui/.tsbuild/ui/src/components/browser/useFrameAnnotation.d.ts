import React from 'react';
import type { BrowserAnnotationPayload } from '@/lib/browser/contract';
/**
 * Annotation for a page the app shows in a sandboxed frame (an HTML file's
 * preview, a page an agent drew in the chat): the browser panel's overlay,
 * run inside the frame through the page's bridge, attached to the composer the
 * same way.
 */
export declare const useFrameAnnotation: ({ frameRef, directory, pageKey, intro, describePage, }: {
    frameRef: React.RefObject<HTMLIFrameElement | null>;
    directory: string;
    /** Changes when the frame shows another page; a running session ends with it. */
    pageKey: string;
    /** The first line of the prompt: where the annotated page comes from. */
    intro: string;
    /** Names the page for the agent in place of the frame's own address. */
    describePage: (payload: BrowserAnnotationPayload) => BrowserAnnotationPayload;
}) => {
    isAnnotating: boolean;
    toggle: () => void;
};
