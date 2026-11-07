export interface RemoteConnectionFormProps {
    onBack: () => void;
    /** Optional: show the back button (default: true) */
    showBackButton?: boolean;
    /** Optional: initial URL to pre-populate */
    initialUrl?: string;
    /** Optional: initial label to pre-populate */
    initialLabel?: string;
    /** Optional: show recovery mode styling/behavior */
    isRecoveryMode?: boolean;
    /** Optional: callback when successfully connected */
    onConnect?: () => void;
    /** Optional: callback when user wants to switch to local setup */
    onSwitchToLocal?: () => void;
    showInstancePicker?: boolean;
}
export declare function RemoteConnectionForm({ onBack, showBackButton, initialUrl, initialLabel, isRecoveryMode, onConnect, onSwitchToLocal, showInstancePicker, }: RemoteConnectionFormProps): import("react/jsx-runtime").JSX.Element;
