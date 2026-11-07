import React from 'react';
type TerminalViewProps = {
    visible?: boolean;
    directory?: string | null;
    /** Closing the last tab closes the terminal surface instead of opening a
        fresh tab; the host removes it, and reopening starts a new terminal. */
    onLastTabClosed?: () => void;
};
export declare const TerminalView: React.FC<TerminalViewProps>;
export {};
