import { type SpaceApplyOutcome, type SpaceApplyRequest, type SpaceFailure, type SpaceReportedPaths } from './spaces-api';
/**
 * The branch an apply suggests: the space's name, which the create dialog fills from the same
 * generator as a worktree's branch, made into a name git takes. The server checks it again.
 */
export declare const branchNameOfSpace: (name: string) => string;
/**
 * Why an apply did not go through, as the dialog tells it. `changes_closed` and `partly_applied`
 * close the way of uncommitted changes for good, so the dialog turns to the branch.
 */
export type SpaceApplyRefusal = {
    kind: 'changes_closed';
} | {
    kind: 'part_thrown_away';
    stillThere: SpaceReportedPaths;
} | {
    kind: 'ignored_in_the_way';
    path: string;
} | {
    kind: 'filtered_in_the_way';
} | {
    kind: 'undecided';
} | {
    kind: 'partly_applied';
} | {
    kind: 'nothing_to_apply';
} | {
    kind: 'too_large';
} | {
    kind: 'name_not_allowed';
    path: string;
} | {
    kind: 'case_only_rename';
    path: string;
    other: string;
} | {
    kind: 'branch_exists';
    branch: string;
} | {
    kind: 'invalid_branch';
} | {
    kind: 'not_running';
} | {
    kind: 'other';
    failure: SpaceFailure;
};
export declare const applyRefusalOf: (error: Error, branch: string | null) => SpaceApplyRefusal;
/** Whether a refusal leaves the space applicable only as a branch from now on. */
export declare const closesChanges: (refusal: SpaceApplyRefusal) => boolean;
type StatusIndex = {
    activeSessionIds: ReadonlySet<string>;
    statusById: ReadonlyMap<string, {
        directory: string;
    }>;
};
/** Whether a session in the space is working or retrying now, by the live status index. */
export declare const isAgentWorkingInSpace: (index: StatusIndex, spaceId: string) => boolean;
export declare const useAgentWorkingInSpace: (spaceId: string) => boolean;
type SpaceApplyResult = {
    kind: 'applied';
    outcome: SpaceApplyOutcome;
} | {
    kind: 'refused';
    refusal: SpaceApplyRefusal;
} | {
    kind: 'overtaken';
};
/**
 * Applies the space's work and reads the host's list again. A removal that followed and went
 * through in part stays on the group's status line as a failed delete, with Delete to try again.
 */
export declare const applySpace: (spaceId: string, request: SpaceApplyRequest) => Promise<SpaceApplyResult>;
export {};
