import { type SidebarLayout } from '@/stores/sidebarLayout';
import type { SessionSidebarRowModel } from '../sessionSidebarRowModel';
/** Lists of sessions that need the user; Other active only runs or finished. */
export declare const isAttentionContainer: (containerKey: string) => boolean;
type PlannerInputs = {
    layout: SidebarLayout;
    rowModel: SessionSidebarRowModel;
    projectIdOf: (sessionId: string) => string | null;
};
/**
 * Registers what the open session does when it is marked done or archived,
 * read from the layout and the rows as drawn at that moment. VS Code keeps
 * the classic behaviour and registers nothing.
 */
export declare const useSessionLeavePlanner: (enabled: boolean, inputs: PlannerInputs) => void;
export {};
