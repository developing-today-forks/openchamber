import { type GuestStorageRequest, type GuestStorageResult } from '@openchamber/sdk';
type DeviceGuestStorageIdentity = {
    runtimeKey: string;
    guestId: string;
    storageId: string;
};
export declare const runDeviceGuestStorage: (identity: DeviceGuestStorageIdentity, request: GuestStorageRequest, authorize: () => boolean) => Promise<GuestStorageResult>;
/** Called only after a confirmed successful uninstall, never catalog omission. */
export declare const removeDeviceGuestStorage: (identity: DeviceGuestStorageIdentity) => Promise<void>;
export {};
