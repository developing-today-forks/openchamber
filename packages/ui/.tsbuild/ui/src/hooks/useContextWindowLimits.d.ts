import { type ContextWindowLimits } from '@/lib/routing/contextWindowLimits';
/**
 * Which model's window the context readouts measure against.
 *
 * OpenCode 2.x keeps the model on the session record, and that is what the
 * next turn runs on: a manual switch and an Auto-routed turn both land there
 * before any answer exists, so the record is measured against first. The
 * newest answer's model stands in when the record names none (older sessions),
 * and the composer's model only before the first answer. Under Auto the
 * composer names no real model at all (the server picks one per turn), so
 * without the record or an answer Auto reads as "no limit" and the readouts
 * divide by the 200k default.
 */
export declare const useContextWindowLimits: (sessionId: string | null, directory?: string) => ContextWindowLimits;
