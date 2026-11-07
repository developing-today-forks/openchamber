import type { SessionStatus } from "@/lib/opencode/model";
/** Marks a prompt for `sessionId` as sent; call the returned release once it settles. */
export declare function trackPromptInFlight(sessionId: string): () => void;
export declare const hasPromptInFlight: (sessionId: string) => boolean;
/** `snapshot` with the active status `current` holds for each session whose prompt is still being sent. */
export declare function withPromptsInFlight(snapshot: Record<string, SessionStatus>, current: Record<string, SessionStatus>): Record<string, SessionStatus>;
