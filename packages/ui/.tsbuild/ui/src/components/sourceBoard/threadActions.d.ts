import type { ReferenceThreadActions } from '@/components/references/ReferenceComments';
import type { GitHubReference, SourceControlReadContext } from '@/lib/api/types';
/**
 * Answering and resolving the previewed PR's review threads. Each write reads
 * the PR again afterwards, a refused one too, since a refusal most often means
 * the thread changed since it was read. Undefined for an issue or without a
 * repository context: its threads are then read only.
 */
export declare function useThreadActions(reference: GitHubReference | null, context: SourceControlReadContext | null, onChanged: () => void): ReferenceThreadActions | undefined;
