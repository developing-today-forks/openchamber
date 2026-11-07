type LocalSetupScreenProps = {
    /** Callback when user goes back */
    onBack: () => void;
    /** Callback when CLI becomes available */
    onCliAvailable?: () => void;
    /** Whether this screen was entered from recovery flow (shows "Connect to Remote" link) */
    isFromRecovery?: boolean;
    /** Callback when user wants to switch to remote */
    onSwitchToRemote?: () => void;
};
export declare function LocalSetupScreen({ onBack, onCliAvailable, isFromRecovery, onSwitchToRemote, }: LocalSetupScreenProps): import("react/jsx-runtime").JSX.Element;
export {};
