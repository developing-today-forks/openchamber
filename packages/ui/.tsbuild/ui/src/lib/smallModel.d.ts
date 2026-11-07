/**
 * Distills a chat selection into a compact note via the small model. Falls
 * back to the original text on any failure or when no small model is
 * available within the session's provider (explicit settings/config picks
 * are still honored server-side).
 */
export declare function summarizeSelectionForNotes(text: string, sessionId?: string | null): Promise<string>;
/**
 * Distills an oversized goal objective into audit-sized completion criteria
 * via the small model. Returns null on any failure — callers fall back to a
 * head+tail excerpt.
 */
export declare function distillGoalObjective(planContent: string, charLimit: number): Promise<string | null>;
