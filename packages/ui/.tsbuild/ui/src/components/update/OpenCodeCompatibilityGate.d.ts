import * as React from 'react';
/**
 * The app mounts at once and keeps starting while the check runs; only a
 * confirmed incompatible OpenCode replaces it with the recovery screen. A
 * failed check leaves the app's own connection recovery in charge.
 *
 * `enabled={false}` skips the check while keeping the children mounted, so a
 * host without a server yet can turn the gate on without remounting the app.
 */
export declare const OpenCodeCompatibilityGate: React.FC<React.PropsWithChildren<{
    enabled?: boolean;
}>>;
