/** A source, or the name it was given, that names a video file. */
export declare const isVideoSource: (source: string, name?: string) => boolean;
/** A bare URL that stands for a clip when it is alone on its line. */
export declare const isBareVideoUrl: (url: string) => boolean;
/** Marks a player drawn for a file on this machine. */
export declare const LOCAL_VIDEO_ATTR = "data-openchamber-markdown-local-video";
/**
 * `metadata` reads the first frame and the length right away; `none` reads
 * nothing until the user presses play, for a server the user did not choose.
 */
export declare const renderMarkdownVideo: ({ href, title }: {
    href: string;
    title?: string | null;
}, preload: 'metadata' | 'none') => string;
/** Whether the player may try a fresh address now; records the try. */
export declare const claimVideoRetry: (video: HTMLVideoElement) => boolean;
/** Points the player at a fresh address and goes on where it was. */
export declare const swapVideoSource: (video: HTMLVideoElement, url: string) => void;
/**
 * A clip the browser cannot load (a private repository, an expired link, a
 * format it does not play) becomes its fallback; one whose URL token expired
 * first tries a fresh one. Media errors do not bubble, hence the capture
 * listener.
 */
export declare const attachMarkdownVideoFallback: (container: HTMLElement) => (() => void);
