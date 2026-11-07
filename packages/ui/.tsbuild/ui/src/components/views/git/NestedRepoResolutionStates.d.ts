import React from 'react';
import type { NestedRepoDiscovery } from '@/stores/useGitStore';
type NestedRepoResolutionStatesProps = {
    /** Project root the surface resolves from; the one Git gets initialized in. */
    root: string | null;
    /** Probe of the project root: `false` means nested resolution applies. */
    rootIsGitRepo: boolean | null;
    /**
     * Probe of the directory the consumer operates on (root or selected nested
     * repository). `true` means resolution succeeded and the consumer should
     * render its own content.
     */
    resolvedIsGitRepo: boolean | null;
    /** Discovery outcome for the root (`undefined` = not run yet). */
    nestedRepos: NestedRepoDiscovery | undefined;
    onRetryDiscovery: () => void;
    /** Optional extra line under the not-a-repository description. */
    emptyStateFooter?: React.ReactNode;
};
/**
 * Shared empty/loading states for git surfaces while nested-repository
 * resolution is pending, failed, or impossible. Renders null once resolution
 * has finished — either the root is a repository or the operating directory
 * probed as one — so the consumer can proceed into its own content.
 *
 * A runtime without the discovery route (VS Code) reports "unsupported": the
 * honest state there is the plain not-a-repository empty state, without a
 * retry that can never succeed.
 */
export declare const NestedRepoResolutionStates: React.FC<NestedRepoResolutionStatesProps>;
export {};
