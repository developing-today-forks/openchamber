interface WorkingPlaceholderProps {
    isWorking: boolean;
    statusText: string | null;
    isGenericStatus?: boolean;
    isWaitingForPermission?: boolean;
    retryInfo?: {
        attempt?: number;
        next?: number;
        resetsAt?: number;
    } | null;
    agentName?: string;
    modelName?: string | null;
    providerId?: string | null;
}
export declare function WorkingPlaceholder({ isWorking, statusText, isGenericStatus, isWaitingForPermission, retryInfo, modelName, providerId, }: WorkingPlaceholderProps): import("react/jsx-runtime").JSX.Element | null;
export {};
