import { z } from 'zod';
declare const shortcutRequestSchema: z.ZodObject<{
    projectId: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type NativeShortcutRequest = z.infer<typeof shortcutRequestSchema>;
/**
 * Hands each request to `handler` once: the one waiting at subscribe time, then each new
 * one as the plugin announces it. Unsubscribe, and a no-op outside the iOS app.
 */
export declare const subscribeToNativeShortcutRequests: (handler: (request: NativeShortcutRequest) => void) => (() => void);
export {};
