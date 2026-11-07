import React from "react";
interface StatusRowProps {
    isWorking?: boolean;
    statusText?: string | null;
    isGenericStatus?: boolean;
    isWaitingForPermission?: boolean;
    abortActive?: boolean;
    retryInfo?: {
        attempt?: number;
        next?: number;
        resetsAt?: number;
    } | null;
    agentName?: string;
    modelName?: string | null;
    providerId?: string | null;
    /** Set while the turn waits on work OpenCode can move to the background. */
    onBackground?: () => void;
}
export declare const StatusRow: React.FC<StatusRowProps>;
export {};
