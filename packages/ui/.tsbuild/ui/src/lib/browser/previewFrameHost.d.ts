import type { AnnotationHost, PageCapture } from './annotationSession';
import type { BrowserRect } from './contract';
export declare const PREVIEW_BRIDGE_CHANNEL = "openchamber-preview-bridge";
export type PreviewFrameHost = AnnotationHost & {
    /** Resolves when the page answers within `timeoutMs`; a page without the bridge never does. */
    readonly probe: (timeoutMs: number) => Promise<boolean>;
    readonly dispose: () => void;
};
export declare const createPreviewFrameHost: ({ frame, capturePage, }: {
    frame: HTMLIFrameElement;
    capturePage: () => Promise<PageCapture | null>;
}) => PreviewFrameHost;
type Edges = {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
};
/**
 * The part of a frame that is on screen: the frame's box cut by every box
 * that clips it (the window, the scrolling chat), as a rectangle in the
 * window to photograph and the same rectangle in the page's viewport. A page
 * in the chat is as tall as its content, so it is often only partly on
 * screen. Null when none of it is.
 */
export declare const visibleFrameArea: (frame: Edges, clips: ReadonlyArray<Edges>) => {
    window: BrowserRect;
    viewport: BrowserRect;
} | null;
/**
 * The file a preview URL serves (`/api/fs/preview/<grant>/<path>`), or the URL
 * unchanged. The grant is a credential for the page's folder and has no place
 * in a prompt; the path is what the agent can act on.
 */
export declare const previewUrlToFilePath: (pageUrl: string) => string;
export {};
