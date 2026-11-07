import React from 'react';
/**
 * Who checks goal progress after each turn: Jev or the small model. Without a
 * classification provider the Jev chip is disabled and the small model shows
 * as chosen, which is what the server does then; the saved choice comes back
 * once a provider is set up. The line below names what actually checks and
 * links to where that is configured: for Jev the shared note, which names the
 * classification provider in use.
 */
export declare const SessionGoalCheckerField: React.FC<{
    disabled?: boolean;
}>;
/** How many automatic turns a goal takes before it stops and hands back to the user. */
export declare const SessionGoalMaxTurnsField: React.FC<{
    disabled?: boolean;
}>;
/**
 * How long a goal may be before saving condenses it, and how much of it the
 * progress check reads. A goal editor can switch the first off for one goal.
 */
export declare const SessionGoalLengthFields: React.FC<{
    disabled?: boolean;
}>;
