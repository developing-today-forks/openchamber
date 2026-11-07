import React from 'react';
/**
 * What a session row or aggregate is showing: its own turn running
 * (busy/retry), a pause kept open by a background subagent or a background
 * command, or a finished turn the user has not seen.
 */
type SessionActivityIndicatorState = 'running' | 'subagent' | 'shell' | 'unread';
/**
 * Live-activity marker for one session row or aggregate. Each state has its
 * own static icon, so a row says why it is busy without motion; motion lives
 * in the 1 Hz elapsed counter (see faa9c243). The opt-in
 * `animatedActivityIndicators` preference replaces every running kind with the
 * shared `Spinner` (four steps a second); the unread icon stays.
 */
export declare const SessionActivityIndicator: React.FC<{
    state: SessionActivityIndicatorState;
    className?: string;
    /** Extra classes for the running kinds only (e.g. the switcher's pulse). */
    runningClassName?: string;
    /**
     * Name the state in a tooltip above the mark instead of the native title,
     * as the sidebar's row marks do.
     */
    tooltip?: boolean;
}>;
export {};
