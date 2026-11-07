/**
 * The key in the session header that opens the grant dialog of the space the open session or
 * draft works in (journey step 4), with a warning dot while that space lacks
 * access. Nothing for a host directory, while the feature is off, or in VS Code (decision 16).
 */
import React from 'react';
export declare const SpaceAccessButton: React.FC<{
    directory: string | null | undefined;
    className: string;
    iconClassName: string;
}>;
