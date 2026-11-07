import { type RuntimeEndpointChangedDetail } from '@/lib/runtime-switch';
export declare const reconnectAppForTransportSwitch: () => void;
export declare const resetAppForRuntimeEndpointChange: (detail: RuntimeEndpointChangedDetail) => void;
/**
 * True when the endpoint event only replaced credentials for the runtime that
 * was already active, as the login gate does after a successful sign-in.
 */
export declare const isSameRuntimeEndpoint: (detail: RuntimeEndpointChangedDetail) => boolean;
export declare const installRuntimeEndpointReset: () => (() => void);
