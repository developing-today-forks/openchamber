import React from 'react';
/**
 * Device-authorization step shared by the GitHub and GitLab cards: the code
 * to type into the provider, a way back to the provider page, and the quiet
 * "waiting" line with cancel. Kept identical so both providers read the same.
 */
export declare const DeviceFlowCode: React.FC<{
    code: string;
    description: string;
    openLabel: string;
    onOpen: () => void;
    onCancel: () => void;
    disabled?: boolean;
}>;
