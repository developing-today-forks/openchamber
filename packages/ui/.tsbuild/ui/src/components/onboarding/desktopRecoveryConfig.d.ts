export type RecoveryVariant = 'local-unavailable' | 'remote-unreachable' | 'remote-incompatible' | 'remote-wrong-service' | 'remote-missing' | 'missing-default-host';
export type DesktopRecoveryConfig = {
    title: string;
    description: string;
    titleKey: string;
    descriptionKey: string;
    descriptionParams?: Record<string, string>;
    iconKey: 'local' | 'remote';
    showRetry: boolean;
    retryLabel?: string;
    retryLabelKey?: string;
    showUseLocal: boolean;
    showUseRemote: boolean;
    /** Label for the "use local" primary action button */
    useLocalLabel: string;
    useLocalLabelKey: string;
    /** Label for the "use remote" primary action button */
    useRemoteLabel: string;
    useRemoteLabelKey: string;
};
export declare function getDesktopRecoveryConfig(variant: RecoveryVariant, hostLabel?: string, hostUrl?: string): DesktopRecoveryConfig;
