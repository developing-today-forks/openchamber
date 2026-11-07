import React from 'react';
type Props = {
    sessionId: string | null;
    directory: string | null;
    /** Rendered first inside the Session section; owns its own dialog. */
    goalRow: React.ReactNode;
    showSession: boolean;
    showRepository: boolean;
    /** Lets the panel place the two readouts independently without duplicating their subscriptions. */
    children: (sections: {
        session: React.ReactNode;
        repository: React.ReactNode;
    }) => React.ReactNode;
};
/**
 * The persistent readouts — how full the context is, what the working tree and
 * the pull request look like. All of it stays true for as long as the session
 * is open, so it sits above anything episodic.
 */
export declare const WorkStatusPrimaryGroup: React.FC<Props>;
export {};
