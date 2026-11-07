import React from 'react';
export type BrowserPaneProps = {
    initialUrl: string;
    /** The folder whose panel holds the tab: its address is kept there, and a comment goes to its chat. */
    directory: string;
    /**
     * The folder the page is browsed for: the same folder, or the space a draft waiting for one
     * shows. Its pages, history and dev servers are that folder's.
     */
    siteDirectory: string;
    tabID: string;
    /** The session whose agent opened this tab; null for the user's own tab. */
    ownerSessionId: string | null;
    /** Whether the tab is the one shown in an open panel of the project on screen. */
    visible: boolean;
};
export declare const BrowserPane: React.FC<BrowserPaneProps>;
