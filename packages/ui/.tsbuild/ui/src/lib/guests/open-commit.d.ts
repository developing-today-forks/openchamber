import { type HostRequestErrorCode } from '@openchamber/sdk';
import type { GitAPI } from '@/lib/api/types';
export type GuestOpenCommitResult = {
    ok: true;
} | {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
};
type OpenGuestCommitOptions = {
    sha: string;
    directory: string | null;
    /** Null when no runtime registered its APIs yet; answered as unavailable. */
    git: Pick<GitAPI, 'getGitLog'> | null;
    /** The directory's current branch, which keys the Diff view's commit selection. */
    currentBranch: (directory: string) => Promise<string | null>;
    /** VS Code and mobile have no Diff view commit scope for guests. */
    supported: boolean;
};
/**
 * `host.openCommit`: read the commit from the open project ourselves, select it
 * the way the Diff view's commit picker would, and open that view in commit
 * scope. The guest only names a hash; nothing it sends reaches git unchecked.
 */
export declare const openGuestCommit: ({ sha, directory, git, currentBranch, supported }: OpenGuestCommitOptions) => Promise<GuestOpenCommitResult>;
/** Branch from the shared git status cache, loading it once when missing. A failed load means "no branch". */
export declare const readCurrentBranch: (git: GitAPI, directory: string) => Promise<string | null>;
export {};
