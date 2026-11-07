import { type ServiceStatus, type GuestRequest, type HostRequestErrorCode } from '@openchamber/sdk';
import type { GuestRequestProxyResult } from './oauth';
export declare const proxyGuestServiceRequest: (guestId: string, request: GuestRequest, 
/** The shared-surface viewer open in this window (`surface-viewers.ts`). */
viewerId?: string) => Promise<GuestRequestProxyResult>;
export declare const loadGuestServiceStatus: (guestId: string) => Promise<{
    ok: true;
    result: {
        status: ServiceStatus;
    };
} | {
    ok: false;
    code: HostRequestErrorCode;
    message: string;
}>;
export declare const setGuestServiceSocketPath: (guestId: string, socketId: string, socketPath: string | null) => Promise<boolean>;
