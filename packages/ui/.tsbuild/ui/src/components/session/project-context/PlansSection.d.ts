import React from 'react';
import { type ProjectPlanLink, type ProjectRef } from '@/lib/projectContextApi';
/**
 * Saved plan markdown for the project.
 *
 * Plan mutations touch neither notes nor todos, so this section talks to the
 * store directly instead of routing writes through the container.
 */
export declare const PlansSection: React.FC<{
    projectRef: ProjectRef;
    plans: ProjectPlanLink[];
    /** Panel-wide filter, matched against plan titles. */
    query: string;
    /** Opens the plan: in place in the panel, or the host's own viewer (mobile).
        The plan carries its owner so a host viewer never guesses the project. */
    onOpenPlan: (plan: {
        id: string;
        title: string;
        projectRef: ProjectRef;
    }) => void;
    pinnedPlanIds: ReadonlySet<string>;
    onTogglePinned: (planId: string, pinned: boolean) => Promise<boolean>;
    /** The plan open beside the list (split layout), marked as selected. */
    selectedPlanId: string | null;
}>;
