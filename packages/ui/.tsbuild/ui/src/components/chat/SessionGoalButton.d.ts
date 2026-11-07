import React from 'react';
interface SessionGoalButtonProps {
    sessionId: string | null;
    directory?: string;
    /** Session draft is open — the goal arms for the session the draft creates. */
    draftOpen?: boolean;
    footerIconButtonClass: string;
    iconSizeClass: string;
    withTooltip?: boolean;
}
export declare const SessionGoalButton: React.FC<SessionGoalButtonProps>;
interface SessionGoalWriterButtonProps {
    sessionId: string | null;
    directory?: string;
    draftOpen?: boolean;
    footerIconButtonClass: string;
    iconSizeClass: string;
    withTooltip?: boolean;
}
export declare const SessionGoalWriterButton: React.FC<SessionGoalWriterButtonProps>;
interface SessionGoalObjectiveCounterProps {
    /** Current composer text length — the armed message becomes the objective. */
    length: number;
}
export declare const SessionGoalObjectiveCounter: React.FC<SessionGoalObjectiveCounterProps>;
export {};
