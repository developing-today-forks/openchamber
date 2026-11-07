import React from 'react';
import { type ProjectRef } from '@/lib/projectContextApi';
interface ProjectNotesTodoPanelProps {
    projectRef: ProjectRef | null;
    visible?: boolean;
    projectLabel?: string | null;
    canCreateWorktree?: boolean;
    onActionComplete?: () => void;
    /** When provided, opening a plan calls this instead of the desktop context
        panel tab — hosts without ContextPanel (mobile) render their own viewer.
        The plan carries its owner so the host's viewer cannot guess wrong. */
    onOpenPlan?: (plan: {
        id: string;
        title: string;
        projectRef: ProjectRef;
    }) => void;
    className?: string;
}
/**
 * Notes, todos, plans and agent memory for the active project.
 *
 * The lists are tabs rather than one stacked column: stacking gave each
 * list its own scroller inside the panel's scroller, which only got worse as
 * lists grew and forced the todo list to carry a manual resize handle just to
 * stay usable.
 *
 * Search sits above the tabs and stays panel-wide. Tabs divide, and search is
 * the one thing that division would hurt — you do not always remember whether
 * something was written as a note or lives in a plan — so the section strip
 * doubles as the result summary by showing per-section match counts.
 *
 * Storage is server-owned and reached through `useProjectContextStore`.
 */
export declare const ProjectNotesTodoPanel: React.FC<ProjectNotesTodoPanelProps>;
export {};
