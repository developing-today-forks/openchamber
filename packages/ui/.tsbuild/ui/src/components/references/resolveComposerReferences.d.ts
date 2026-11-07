/**
 * Turning what the picker chose into composer chips.
 *
 * The list shows enough to choose; what the agent receives is read fresh at
 * attach time, with the repository's account: a GitHub issue with all its
 * comments, a PR with its comments, review comments, files, checks and
 * optionally its diff, a Linear issue with its comments. Each choice resolves on its own, so one that fails is reported
 * by key while the others still attach.
 */
import type { ComposerReference } from '@/components/chat/composer/composerReferences';
import type { LinearIssue, SourceControlAPI, SourceControlReadContext } from '@/lib/api/types';
import { type ReferencePickerSelection } from './referencePickerItems';
export type ReferenceResolveDeps = {
    sourceControl: Pick<SourceControlAPI, 'issueGet' | 'issueComments' | 'changeRequestContext'>;
    /** The GitHub read context of the project the items belong to. */
    context: SourceControlReadContext | null;
    /** A Linear issue with its comments, by Linear id; the preview's cache. */
    readLinearDetail: (issueId: string) => Promise<LinearIssue>;
};
export type ResolvedReferences = {
    references: ComposerReference[];
    failures: Array<{
        key: string;
        label: string;
        error: string;
    }>;
};
/** Resolve every choice; successes keep the picker's order. */
export declare function resolveComposerReferences(selections: readonly ReferencePickerSelection[], deps: ReferenceResolveDeps): Promise<ResolvedReferences>;
