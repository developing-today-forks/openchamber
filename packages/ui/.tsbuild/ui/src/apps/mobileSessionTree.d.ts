import type { Session } from '@/lib/opencode/model';
export type MobileSessionTree = {
    childrenByParent: Map<string, Session[]>;
    roots: Session[];
};
/** Groups one bucket's sessions into the tree the mobile sheet renders.
    Sessions whose parent sits outside the bucket count as roots, so an
    orphan still shows. A parent cycle has no root at all, so after the
    normal roots claim their descendants, each session nobody claimed
    becomes a root itself, in input order. Every session in the bucket
    ends up reachable from exactly one root. The children map holds only
    edges the render walk can follow: an edge back to a session already
    claimed earlier in the walk is dropped, so the closing node of a
    cycle and a self-parented session report no children. Callers still
    guard their rendering walk with a visited set as a backstop. */
export declare const buildMobileSessionTree: (sessions: readonly Session[]) => MobileSessionTree;
