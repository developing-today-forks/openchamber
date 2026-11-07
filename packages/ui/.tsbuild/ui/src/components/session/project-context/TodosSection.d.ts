import React from 'react';
import { type ProjectTodoChange, type ProjectTodoItem } from '@/lib/projectContextApi';
export declare const TodosSection: React.FC<{
    todos: ProjectTodoItem[];
    /** Panel-wide filter. Mutations still act on the full list. */
    query: string;
    disabled: boolean;
    canCreateWorktree: boolean;
    sendingTodoId: string | null;
    /**
     * Shows `next` and persists it through the container's store write: one
     * todo when `change` names it, otherwise the whole list.
     */
    onPersistTodos: (next: ProjectTodoItem[], change?: ProjectTodoChange) => void;
    onSendToCurrentSession: (todoText: string) => void;
    onSendToNewSession: (todoId: string, todoText: string) => void;
    onSendToNewWorktreeSession: (todoId: string, todoText: string) => void;
}>;
