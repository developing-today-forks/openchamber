import { type RelayRuntimeDescriptor } from '@/lib/relay/runtime-tunnel';
export type RuntimeEndpointChangedDetail = {
    apiBaseUrl: string;
    previousApiBaseUrl: string;
    runtimeKey: string;
    previousRuntimeKey: string;
};
export declare const MOBILE_DISCONNECTED_RUNTIME_KEY = "mobile-disconnected";
export declare const isTransientRuntimeKey: (runtimeKey: string) => boolean;
export declare const getRuntimeApiBaseUrl: () => string;
export declare const isSshForwardedRuntime: () => boolean;
export declare const getRuntimeKey: () => string;
export declare const initializeRuntimeEndpoint: (options?: {
    apiBaseUrl?: string | null;
    runtimeKey?: string | null;
}) => void;
export declare const switchRuntimeEndpoint: (options: {
    apiBaseUrl: string;
    clientToken?: string | null;
    runtimeKey?: string | null;
    requestHeaders?: Record<string, string> | null;
    relay?: RelayRuntimeDescriptor | null;
    sshForwarded?: boolean;
}) => void;
export declare const subscribeRuntimeEndpointWillChange: (callback: (detail: RuntimeEndpointChangedDetail) => void) => (() => void);
export declare const subscribeRuntimeEndpointChanged: (callback: (detail: RuntimeEndpointChangedDetail) => void) => (() => void);
