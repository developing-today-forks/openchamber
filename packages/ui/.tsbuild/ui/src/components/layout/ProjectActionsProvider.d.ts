import React from 'react';
/**
 * One runner for the current session's project, shared by the Work Status row,
 * the project actions dialog and the command palette. It lives above all of
 * them, so a run keeps its output watch while the Work Status card is hidden.
 * A draft waiting for a new space runs its actions in the space, and none
 * until the space runs.
 */
export declare const ProjectActionsProvider: React.FC<{
    children: React.ReactNode;
}>;
