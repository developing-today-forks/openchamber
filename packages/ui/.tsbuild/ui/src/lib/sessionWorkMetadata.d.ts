import { z } from 'zod';
import type { Metadata, Session } from '@/lib/opencode/model';
/**
 * "In work", stored under `session.metadata.openchamber.work`. The server's
 * session-work runtime opens a session when the user sends a message in it
 * and stamps `suggestDoneAt` when Jev says a turn looks like the end of the
 * work; the user alone closes. The review offer (`session.metadata.openchamber.reviewOffer`) is
 * written by the same runtime but does not depend on work. The shape is owned by `packages/web/server/lib/session-work/state.js`.
 */
declare const workSchema: z.ZodObject<{
    state: z.ZodEnum<{
        done: "done";
        open: "open";
    }>;
    openedAt: z.ZodOptional<z.ZodNumber>;
    openedBy: z.ZodOptional<z.ZodEnum<{
        auto: "auto";
        jev: "jev";
        user: "user";
    }>>;
    doneAt: z.ZodOptional<z.ZodNumber>;
    suggestDoneAt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type SessionWork = z.infer<typeof workSchema>;
export declare function getSessionWork(session: Session | null | undefined): SessionWork | null;
/** Membership in the sidebar's "In work" block. */
export declare function isSessionInWork(session: Session | null | undefined): boolean;
/**
 * Whether Jev's "looks done" hint is current. The server writes it after a
 * turn ended and deletes it when the next one starts; the `time.idle` check
 * retires a hint that outlived that (another process, a missed event), the
 * same rule the session assist uses. Callers still hide it while a turn runs.
 */
export declare function isDoneSuggested(session: Session | null | undefined): boolean;
/**
 * Whether Jev's "changes are ready to look over" offer is current: the same
 * freshness rule, and a current done hint takes the slot instead.
 */
export declare function isReviewSuggested(session: Session | null | undefined): boolean;
/**
 * The metadata after the user tracked the session (`open`) or marked it done.
 * Done keeps when and by whom the work was opened and drops Jev's hints.
 */
export declare function withSessionWorkState(metadata: Metadata, state: SessionWork['state'], now: number): Metadata;
export {};
