import type { RecoveryVariant } from './DesktopConnectionRecovery';
type OnboardingScreenMode = 'first-launch' | 'local-setup' | 'recovery';
type OnboardingScreenProps = {
    /** Callback when user goes back from local-setup */
    onBack?: () => void;
    /** Callback when CLI becomes available */
    onCliAvailable?: () => void;
    /** Screen mode to render */
    mode?: OnboardingScreenMode;
    /** Recovery variant (only used when mode is 'recovery') */
    recoveryVariant?: RecoveryVariant;
    /** Host URL for recovery context */
    recoveryHostUrl?: string;
    /** Host label for recovery context */
    recoveryHostLabel?: string;
    /** Saved host the recovery is about */
    recoveryHostId?: string;
    /** Callback when user enters local setup from recovery */
    onEnterLocalSetup?: () => void;
    /** Callback when user wants to switch to remote (first-launch only) */
    onChooseRemote?: () => void;
    localAvailable?: boolean;
};
export declare function OnboardingScreen({ onBack, onCliAvailable, mode, recoveryVariant, recoveryHostUrl, recoveryHostLabel, recoveryHostId, onEnterLocalSetup, localAvailable, }: OnboardingScreenProps): import("react/jsx-runtime").JSX.Element;
export {};
