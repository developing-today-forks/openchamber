import { type RecoveryVariant } from './desktopRecoveryConfig';
export type { RecoveryVariant } from './desktopRecoveryConfig';
/** Updating an incompatible remote host from the recovery screen. */
export type ServerUpdateState = {
    kind: 'idle';
} | {
    kind: 'updating';
} | {
    kind: 'refused';
    error: string | null;
} | {
    kind: 'auth';
} | {
    kind: 'timeout';
};
export type DesktopConnectionRecoveryProps = {
    variant: RecoveryVariant;
    hostLabel?: string;
    hostUrl?: string;
    onRetry?: () => void;
    onUseLocal?: () => void;
    onUseRemote?: () => void;
    isRetrying?: boolean;
    onUpdateServer?: () => void;
    serverUpdate?: ServerUpdateState;
};
export declare function DesktopConnectionRecovery({ variant, hostLabel, hostUrl, onRetry, onUseLocal, onUseRemote, isRetrying, onUpdateServer, serverUpdate, }: DesktopConnectionRecoveryProps): import("react/jsx-runtime").JSX.Element;
