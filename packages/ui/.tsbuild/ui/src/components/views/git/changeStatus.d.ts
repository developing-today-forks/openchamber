import type { GitStatus } from '@/lib/api/types';
import type { I18nKey } from '@/lib/i18n';
type StatusFile = GitStatus['files'][number];
type ChangeDescriptor = {
    code: string;
    color: string;
    descriptionKey: I18nKey;
};
/** Porcelain marks one-sided conflicts with U and both-sided ones as AA or DD. */
export declare const isConflictedStatusFile: (file: StatusFile) => boolean;
/** `git pull --rebase` refuses to start over changes to tracked files only. */
export declare const hasUncommittedTrackedChanges: (files: StatusFile[] | undefined) => boolean;
export declare const describeChange: (file: StatusFile) => ChangeDescriptor;
export {};
