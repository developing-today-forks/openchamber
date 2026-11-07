import React from 'react';
/**
 * Body of the GitHub card in Settings → Integrations. The card row already
 * names the provider and shows the connection pill, so this renders only the
 * accounts, the sign-in flow, and the CLI fallback.
 */
type GitHubSettingsProps = {
    /** The Integrations card is the only host today; the flag is its contract and changes nothing here. */
    embedded?: boolean;
};
export declare const GitHubSettings: React.FC<GitHubSettingsProps>;
export {};
