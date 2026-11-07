declare global {
    interface Window {
        __OPENCHAMBER_PUSH_KEY__?: string;
    }
}
export declare const useNativePushRegistration: (options: {
    enabled: boolean;
}) => void;
