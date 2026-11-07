import type { Session } from '@/lib/opencode/model';
import { type MultiRunIdentity } from './identity';
/** One member session of a run: a lane (`run`) or a fused result (`fusion`). */
export type MultiRunMember = {
    sessionId: string;
    identity: MultiRunIdentity;
};
/** A multi-run as the sidebar, overview and tabs see it, derived from session metadata. */
export type MultiRunSummary = {
    key: string;
    title: string;
    groupSlug: string;
    /** Lanes in variant order, then creation order. */
    lanes: readonly MultiRunMember[];
    /** Fused results, newest first. */
    fusions: readonly MultiRunMember[];
    /** Fusions first, then lanes: the order rows and cards render in. */
    memberIds: readonly string[];
    /** Distinct lane providers in lane order, for the stacked logos. */
    providerIDs: readonly string[];
    /** Distinct prompt variants (`runGroup`) in order; `undefined` is the single-prompt variant. */
    variants: readonly (string | undefined)[];
    createdAt: number;
    lastActivity: number;
    autoFusion?: MultiRunIdentity['autoFusion'];
};
export type MultiRunIndex = {
    runs: ReadonlyMap<string, MultiRunSummary>;
    runKeyBySessionId: ReadonlyMap<string, string>;
};
export declare const EMPTY_MULTI_RUN_INDEX: MultiRunIndex;
export declare const readMultiRunIdentity: (session: Session, scope: string | null) => MultiRunIdentity | null;
/** `g1` → `A`, `g2` → `B`; a single-prompt run is `A`. */
export declare const multiRunVariantLabel: (runGroup: string | undefined) => string;
/**
 * Groups active root sessions into runs. A run needs at least two active
 * members: after "Keep" leaves a single survivor, it is an ordinary session
 * again. Archived sessions never form or join a run.
 */
export declare function buildMultiRunIndex(sessions: Iterable<Session>, resolveLegacyScope: (session: Session) => string | null): MultiRunIndex;
