import type { Metadata, Session } from '@/lib/opencode/model';
/** Source-owned keys removed from the fork; everything else is kept as copied. */
export declare function withoutSourceOwnedLinks(metadata: Metadata): Metadata;
export interface ForkInheritanceDeps {
    /** The fork's current goal id, read from the authoritative session record. */
    readGoalId: (sessionId: string) => Promise<string | null>;
    readObjective: (sessionId: string) => Promise<string | null>;
    writeObjective: (sessionId: string, content: string) => Promise<boolean>;
    patchMetadata: (sessionId: string, updater: (metadata: Metadata) => Metadata) => Promise<void>;
}
/**
 * Repair a freshly created fork's metadata. Best-effort: the fork already
 * exists and is usable, so every failure is logged and swallowed.
 */
export declare function applyForkInheritance(sourceSessionId: string, fork: Session, deps: ForkInheritanceDeps): Promise<void>;
