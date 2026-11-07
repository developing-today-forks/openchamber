import { type GuestStorageRequest, type GuestStorageResult } from '@openchamber/sdk';
type DeviceStorageAccess = {
    runtimeKey: string;
    storageId: string;
    authorize: () => boolean;
};
export declare const guestStorageOperation: (guestId: string, request: GuestStorageRequest, device?: DeviceStorageAccess) => Promise<GuestStorageResult>;
export {};
