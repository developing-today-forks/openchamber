import React from 'react';
interface PermissionDefaultModeFieldProps {
    /** The default agent on this page; its permissions decide what "Ask" covers. */
    agentName?: string;
}
/**
 * The permission mode the server writes onto each new top-level session, as
 * three chips. Each explains itself on hover and the chosen one below the
 * row, with a link to where its behaviour is configured: agent permissions for
 * Ask and Accept, classification providers for the safety net. The safety net
 * chip is disabled while no classification provider can run it, and a saved
 * `safety` default then shows as Ask, which is what such a session does. VS
 * Code has no server to apply a default, so this row is not shown there.
 */
export declare const PermissionDefaultModeField: React.FC<PermissionDefaultModeFieldProps>;
export {};
