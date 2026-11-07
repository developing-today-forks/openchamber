import type { SessionSidebarRowModel } from '../sessionSidebarRowModel';
type NextAttentionInputs = {
    rowModel: SessionSidebarRowModel;
    onOpen: (sessionId: string, directory: string | null) => void;
};
/**
 * The "next session that needs attention" shortcut, registered while the
 * desktop sidebar is mounted because the target comes from the rows as drawn.
 * VS Code keeps the classic layout and registers nothing, like the leave
 * planner. When nothing needs attention the shortcut says so instead of
 * silently doing nothing.
 */
export declare const useNextAttentionSession: (enabled: boolean, inputs: NextAttentionInputs) => void;
export {};
