export type PreparedMarkdownImage = {
    status: 'ready';
    path: string;
    outsideWorkspace?: boolean;
} | {
    status: 'missing' | 'error';
};
export declare const isLocalMarkdownImageSource: (source: string) => boolean;
export declare const prepareLocalMarkdownImages: ({ sources, directory, sessionId, messageId, signal, }: {
    sources: readonly string[];
    directory: string;
    sessionId: string;
    messageId: string;
    signal: AbortSignal;
}) => Promise<Map<string, PreparedMarkdownImage>>;
export declare const resolveMarkdownImageSource: (source: string, signal: AbortSignal) => Promise<string>;
/**
 * VS Code has no OpenChamber server route for message-scoped temporary-file
 * grants. Preserve its existing workspace-only gallery path through the local
 * filesystem bridge, including the same size and signature validation.
 */
export declare const resolveWorkspaceMarkdownImageSource: (source: string, directory: string, signal: AbortSignal) => Promise<string>;
export declare const getPreparedMarkdownImageUrl: (image: Extract<PreparedMarkdownImage, {
    status: 'ready';
}>, directory: string) => string;
/** A prepared local image as a data URL, for a page that cannot load the asset URL (see loadRawImageAsDataUrl). */
export declare const loadPreparedImageAsDataUrl: (image: Extract<PreparedMarkdownImage, {
    status: 'ready';
}>, directory: string, signal: AbortSignal) => Promise<string>;
