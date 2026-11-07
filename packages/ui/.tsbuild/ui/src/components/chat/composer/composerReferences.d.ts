/**
 * Issues, pull requests and tracker tickets attached to the composer.
 *
 * A message may carry any number of them, from any source: repository issues
 * and change requests (GitHub, or GitLab on a message restored from the
 * queue), Linear issues, and items extensions hand over through `attach`. Each
 * one becomes its own context part on send, in the order it was attached.
 * Attaching an item that is already on the composer replaces it in place,
 * so reopening the picker to toggle a PR's diff never duplicates the chip.
 */
import type { JsonValue } from '@openchamber/sdk';
import type { SourceControlProvider } from '@/lib/api/types';
import { type LinkedIssue } from '@/lib/linkedIssues';
import type { ComposerContextReference } from './submit/buildOutgoingMessage';
export type ComposerReferenceAuthor = {
    login: string;
    avatarUrl?: string;
};
export type ComposerReference = {
    kind: 'repository-issue';
    /** Absent on issues restored from messages written before GitLab: those are GitHub. */
    provider?: SourceControlProvider;
    number: number;
    title: string;
    url: string;
    contextText: string;
    author?: ComposerReferenceAuthor;
} | {
    kind: 'change-request';
    provider: SourceControlProvider;
    number: number;
    title: string;
    url: string;
    /** Empty when restored from a queued message: branches were not captured. */
    head: string;
    base: string;
    includeDiff: boolean;
    contextText: string;
    author?: ComposerReferenceAuthor;
} | {
    kind: 'linear-issue';
    identifier: string;
    title: string;
    url: string;
    contextText: string;
    author?: ComposerReferenceAuthor;
} | {
    kind: 'guest';
    providerId: string;
    id: string;
    title: string;
    url: string;
    contextText: string;
    thread: 'issue' | 'pull';
    author?: string;
    head?: string;
    base?: string;
    /** Opaque guest payload from `attach`; handed back on chip click, never shown. */
    data?: JsonValue;
};
/** One key per item, whichever way it reached the composer. */
export declare const composerReferenceKey: (reference: ComposerReference) => string;
/** Append new items; an item already attached is replaced where it stands. */
export declare const withComposerReferences: (current: readonly ComposerReference[], added: readonly ComposerReference[]) => ComposerReference[];
export declare const withoutComposerReference: (current: readonly ComposerReference[], key: string) => ComposerReference[];
/** The session snapshot a sent reference leaves behind (see `linkedIssues.ts`). */
export declare const toLinkedIssue: (reference: ComposerReference, linkedAt: number) => LinkedIssue;
/** What the submission builder needs from a reference: text and identity, not chip details. */
export declare const toContextReference: (reference: ComposerReference) => ComposerContextReference;
