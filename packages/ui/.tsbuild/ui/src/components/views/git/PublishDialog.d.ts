import type { GitPublishContext, GitPublishTargets } from '@/lib/boundGitNetworkOperation';
export declare function PublishDialog({ context, onSelect }: {
    context: GitPublishContext;
    onSelect: (targets: GitPublishTargets | null) => void;
}): import("react/jsx-runtime").JSX.Element;
