import type { Session } from '@/lib/opencode/model';
import type { I18nKey } from '@/lib/i18n';
import type { WorktreeMetadata } from '@/types/worktree';
export type SessionTreeMoveMessages = {
    success: string;
    failure: string;
    /** Description under the failure toast when the answer was lost and the new worktree was kept. */
    outcomeUnknown: string;
};
export declare const buildSessionTreeMoveMessages: (t: (key: I18nKey) => string, keys: {
    success: I18nKey;
    failure: I18nKey;
}) => SessionTreeMoveMessages;
export type SessionTreeMoveIntent = {
    kind: 'existing';
    root: Session;
    descendants: Session[];
    sourceDirectory: string;
    destination: WorktreeMetadata;
    messages: SessionTreeMoveMessages;
} | {
    kind: 'quick';
    root: Session;
    descendants: Session[];
    sourceDirectory: string;
    messages: SessionTreeMoveMessages;
} | {
    kind: 'project';
    root: Session;
    descendants: Session[];
    sourceDirectory: string;
    projectDirectory: string;
    messages: SessionTreeMoveMessages;
};
export declare const useIsSessionWorktreeMovePending: (sessionId: string) => boolean;
export declare const moveSessionTreeToExistingWorktree: (input: {
    root: Session;
    descendants: Session[];
    sourceDirectory: string;
    destination: WorktreeMetadata;
}) => Promise<string>;
export declare const requestSessionTreeMove: (intent: SessionTreeMoveIntent) => void;
