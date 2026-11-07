import { z } from 'zod';
import type { Metadata, Session } from '@/lib/opencode/model';
declare const membershipSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    sessionID: z.ZodNullable<z.ZodString>;
    group: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"id">;
        id: z.ZodUUID;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"legacy">;
        scope: z.ZodString;
    }, z.core.$strip>], "kind">;
    groupSlug: z.ZodString;
    runGroup: z.ZodOptional<z.ZodString>;
    providerID: z.ZodString;
    modelID: z.ZodString;
    index: z.ZodOptional<z.ZodNumber>;
    role: z.ZodEnum<{
        fusion: "fusion";
        run: "run";
    }>;
    title: z.ZodOptional<z.ZodString>;
    autoFusion: z.ZodOptional<z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
        variant: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodString>;
        launcherId: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MultiRunMembership = z.infer<typeof membershipSchema>;
export type MultiRunIdentity = Omit<MultiRunMembership, 'version' | 'sessionID'> & {
    key: string;
};
export declare const multiRunGroupKey: (group: MultiRunMembership['group'], groupSlug: string) => string;
export declare function getMultiRunMembership(session: Session): MultiRunMembership | null;
/** A present marker is authoritative, even if pending, invalid, or inherited by a fork. */
export declare function getMultiRunIdentity(session: Session, legacyDirectory?: string): MultiRunIdentity | null;
export declare function withMultiRunMembership(session: Pick<Session, 'metadata'>, membership: MultiRunMembership): Metadata;
/**
 * The marker on its own, shaped as an RFC 7386 merge patch for
 * `/api/openchamber/sessions/:id/metadata`. Nested keys merge, so writing the
 * membership cannot erase what another feature stored under `openchamber`.
 */
export declare const multiRunMembershipPatch: (membership: MultiRunMembership) => Metadata;
/** Compare only the metadata this feature renders, without scanning other sessions. */
export declare function sameMultiRunIdentity(a: Session, b: Session): boolean;
export {};
