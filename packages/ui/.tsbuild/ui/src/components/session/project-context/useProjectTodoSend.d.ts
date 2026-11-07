import type { ProjectRef } from '@/lib/projectContextApi';
import type { TodoSendExecution } from '../TodoSendDialog';
type PendingSendTarget = {
    kind: 'session' | 'worktree';
    todoId: string;
    todoText: string;
};
/**
 * Sending a todo to an agent.
 *
 * Creating a session, picking its model/agent, and dispatching the prompt is
 * the heaviest thing this surface does and has nothing to do with how todos are
 * stored, so it lives apart from the list that triggers it.
 */
export declare const useProjectTodoSend: (options: {
    projectRef: ProjectRef | null;
    canCreateWorktree: boolean;
    onActionComplete?: () => void;
}) => {
    pendingSendTarget: PendingSendTarget | null;
    isSubmitting: boolean;
    sendingTodoId: string | null;
    sendToCurrentSession: (todoText: string) => void;
    sendToNewSession: (todoId: string, todoText: string) => void;
    sendToNewWorktreeSession: (todoId: string, todoText: string) => void;
    confirmSend: (execution: TodoSendExecution) => Promise<void>;
    closeDialog: () => void;
};
export {};
