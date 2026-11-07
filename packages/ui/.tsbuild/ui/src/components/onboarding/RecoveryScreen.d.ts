import { type RecoveryVariant } from './DesktopConnectionRecovery';
type RecoveryScreenProps = {
    /** Recovery variant */
    variant: RecoveryVariant;
    /** Host URL for recovery context */
    hostUrl?: string;
    /** Host label for recovery context */
    hostLabel?: string;
    /** Saved host the recovery is about, when the boot named one */
    hostId?: string;
    /** Callback when user wants to retry */
    onRetry?: () => void;
    /** Callback when user chooses remote */
    onChooseRemote?: () => void;
    /** Whether to show the remote connection form */
    showRemoteForm?: boolean;
    /** Callback when closing remote form */
    onCloseRemoteForm?: () => void;
    /** Callback when switching to local from remote form */
    onSwitchToLocalFromRemote?: () => void;
    /** Callback when entering local setup */
    onEnterLocalSetup?: () => void;
    /** Whether retry action is in progress */
    isRetrying?: boolean;
    localAvailable?: boolean;
};
export declare function RecoveryScreen({ variant, hostUrl, hostLabel, hostId, onRetry, onChooseRemote, showRemoteForm, onCloseRemoteForm, onSwitchToLocalFromRemote, onEnterLocalSetup, isRetrying, localAvailable, }: RecoveryScreenProps): import("react/jsx-runtime").JSX.Element;
export {};
