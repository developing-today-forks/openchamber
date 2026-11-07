import React from 'react';
/** An inline link inside helper text or a tooltip. */
export declare const SettingsInlineLink: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
}>;
/**
 * One line next to a feature that decides through Jev (the safety net, Auto):
 * which classification provider answers, or that none does, with a link to
 * Settings → Providers → Classification providers. In enterprise mode
 * without an administrator's endpoint there is nothing to set up, so it says
 * so instead of linking to a page that offers only Off. Nothing without an
 * OpenChamber server (VS Code), where these features do not exist.
 */
export declare const JevAccessNote: React.FC;
