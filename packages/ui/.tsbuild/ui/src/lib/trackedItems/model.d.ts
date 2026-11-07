import { z } from 'zod';
import type { GitHubIssueLiveSummary, GitHubPullRequestLiveSummary, LinearIssueLiveSummary } from '@/lib/api/types';
/**
 * A pull request, merge request or issue whose live state the server follows
 * for this client. The key is the server's: `trackedItemKey` here and in
 * `packages/web/server/lib/tracked-items/items.js` must agree.
 */
/**
 * `accountId` names the account a repository is bound to (a branch's pull
 * request); without it the host's current account reads the item (a link).
 */
export type TrackedThread<Kind extends 'pull' | 'issue' = 'pull' | 'issue'> = {
    provider: 'github';
    kind: Kind;
    owner: string;
    repo: string;
    number: number;
    accountId?: string;
} | {
    provider: 'gitlab';
    instance: string;
    kind: Kind;
    owner: string;
    repo: string;
    number: number;
    accountId?: string;
};
export type TrackedLinearIssue = {
    provider: 'linear';
    identifier: string;
};
export type TrackedItem = TrackedThread<'pull'> | TrackedThread<'issue'> | TrackedLinearIssue;
export declare const trackedItemKey: (item: TrackedItem) => string;
/**
 * What the server knows of one item. `state` is null while unknown (never
 * answered, or no longer answered); `fetchedAt` is when it last answered.
 */
export type TrackedItemState = {
    type: 'pull';
    item: TrackedThread<'pull'>;
    state: GitHubPullRequestLiveSummary | null;
    fetchedAt: number;
} | {
    type: 'issue';
    item: TrackedThread<'issue'>;
    state: GitHubIssueLiveSummary | null;
    fetchedAt: number;
} | {
    type: 'linear';
    item: TrackedLinearIssue;
    state: LinearIssueLiveSummary | null;
    fetchedAt: number;
};
type ParsedRecord = {
    key: string;
    record: TrackedItemState;
};
/**
 * One record as it arrives over HTTP, the event stream or storage; null when
 * it does not hold together (its key must name its item, its state must fit
 * its kind).
 */
export declare const trackedItemRecordSchema: z.ZodCatch<z.ZodNullable<z.ZodPipe<z.ZodObject<{
    key: z.ZodString;
    item: z.ZodDiscriminatedUnion<[z.ZodObject<{
        owner: z.ZodString;
        repo: z.ZodString;
        number: z.ZodNumber;
        kind: z.ZodEnum<{
            issue: "issue";
            pull: "pull";
        }>;
        accountId: z.ZodOptional<z.ZodString>;
        provider: z.ZodLiteral<"github">;
    }, z.core.$strip>, z.ZodObject<{
        owner: z.ZodString;
        repo: z.ZodString;
        number: z.ZodNumber;
        kind: z.ZodEnum<{
            issue: "issue";
            pull: "pull";
        }>;
        accountId: z.ZodOptional<z.ZodString>;
        provider: z.ZodLiteral<"gitlab">;
        instance: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        provider: z.ZodLiteral<"linear">;
        identifier: z.ZodString;
    }, z.core.$strip>], "provider">;
    state: z.ZodUnknown;
    fetchedAt: z.ZodNumber;
}, z.core.$strip>, z.ZodTransform<ParsedRecord | null, {
    key: string;
    item: {
        owner: string;
        repo: string;
        number: number;
        kind: "issue" | "pull";
        accountId?: string | undefined;
        provider: "github";
    } | {
        owner: string;
        repo: string;
        number: number;
        kind: "issue" | "pull";
        accountId?: string | undefined;
        provider: "gitlab";
        instance: string;
    } | {
        provider: "linear";
        identifier: string;
    };
    state: unknown;
    fetchedAt: number;
}>>>>;
/** Every record that holds together; malformed ones are dropped, never guessed. */
export declare const trackedItemRecordsSchema: z.ZodPipe<z.ZodCatch<z.ZodArray<z.ZodUnknown>>, z.ZodTransform<ParsedRecord[], unknown[]>>;
export {};
