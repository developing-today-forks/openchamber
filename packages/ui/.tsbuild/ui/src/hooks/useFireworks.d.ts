interface FireworksOptions {
    durationMs?: number;
}
interface UseFireworksResult {
    isActive: boolean;
    burstKey: number;
    triggerFireworks: () => void;
    dismissFireworks: () => void;
}
export declare const useFireworks: ({ durationMs }?: FireworksOptions) => UseFireworksResult;
export {};
