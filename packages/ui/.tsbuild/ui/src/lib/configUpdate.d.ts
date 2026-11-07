type ConfigUpdateListener = (state: {
    isUpdating: boolean;
    message: string;
}) => void;
export declare function startConfigUpdate(message?: string): void;
export declare function finishConfigUpdate(): void;
export declare function updateConfigUpdateMessage(message: string): void;
export declare function subscribeConfigUpdate(listener: ConfigUpdateListener): () => void;
export declare function getConfigUpdateSnapshot(): {
    isUpdating: boolean;
    message: string;
};
export {};
