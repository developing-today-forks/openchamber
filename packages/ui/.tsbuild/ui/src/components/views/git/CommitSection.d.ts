type CommitAction = 'commit' | 'commitAndPush' | null;
interface CommitSectionProps {
    stagedCount: number;
    commitMessage: string;
    onCommitMessageChange: (value: string) => void;
    generatedHighlights: string[];
    onInsertHighlights: (highlights: string[]) => void;
    onGenerateMessage: () => void;
    isGeneratingMessage: boolean;
    onCommit: () => void;
    onCommitAndPush: () => void;
    commitAction: CommitAction;
    networkOperationBlocked?: boolean;
    hasPendingIndexMutation?: boolean;
    gitmojiEnabled: boolean;
    onOpenGitmojiPicker: () => void;
}
export declare const CommitSection: React.FC<CommitSectionProps>;
export {};
