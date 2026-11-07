import React from 'react';
import { type SavedProjectPlanTarget } from '@/lib/projectContextApi';
type PlanViewProps = {
    /** False while the panel holding the view is closed: nothing to keep fresh. */
    visible?: boolean;
    /** Saved project plan to open, with the project that owns it. The owner is
        part of the prop so the view never guesses it from the current directory:
        the Project knowledge panel and the mobile plan overlay keep a plan open
        across directory changes, and for managed chats the owner is not a
        registered project a directory lookup could ever find. */
    savedProjectPlan?: SavedProjectPlanTarget | null;
    /** Called after a send action routes the user to the chat — hosts that show
        PlanView in an overlay (mobile fullscreen surface) close it here. */
    onNavigatedToChat?: () => void;
    /** Rendered before the title, e.g. the project knowledge panel's back control. */
    leading?: React.ReactNode;
};
export declare const PlanView: React.FC<PlanViewProps>;
export {};
