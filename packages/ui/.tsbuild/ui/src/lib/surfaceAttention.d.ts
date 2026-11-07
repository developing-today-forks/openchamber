import { z } from "zod";
export declare const hostViewerStateSchema: z.ZodObject<{
    windowFocused: z.ZodBoolean;
    surfaceVisible: z.ZodBoolean;
}, z.core.$strip>;
type HostViewerState = z.infer<typeof hostViewerStateSchema>;
export declare function reportHostViewerState(next: HostViewerState): void;
export declare function isSurfaceAttended(): boolean;
/**
 * Calls `markSeen` whenever a host report changes the viewer state to seen,
 * e.g. VS Code regains focus or a collapsed chat view opens again.
 */
export declare function onHostSurfaceSeen(markSeen: () => void): () => void;
export {};
