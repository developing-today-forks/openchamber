import React from 'react';
export type MobileConnectionNotice = {
    kind: 'unreachable' | 'relay-limit' | 'auth-expired';
    label: string;
};
export declare const MobileConnectionWelcome: React.FC<{
    onConnected: () => void;
    /** Why the user landed here (failed cold-launch auto-connect) — shown as a banner. */
    notice?: MobileConnectionNotice | null;
}>;
