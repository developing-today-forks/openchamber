import type { ChatMessageEntry } from './types';
interface TurnFileChange {
    /** Path relative to the message's project root, as the turn diff lists it. */
    path: string;
    /** Absent when a call's per-file numbers could not be recovered. */
    additions?: number;
    deletions?: number;
}
export interface LiveActivitySummary {
    files: number;
    /** Files the turn's own edit/write/patch calls touched, in first-touch order. */
    changedFiles: TurnFileChange[];
    additions: number;
    deletions: number;
    hasCompleteDiff: boolean;
    explored: boolean;
    commands: number;
    researched: boolean;
    subagents: number;
}
export declare function summarizeLiveActivity(messages: readonly ChatMessageEntry[]): LiveActivitySummary;
export {};
