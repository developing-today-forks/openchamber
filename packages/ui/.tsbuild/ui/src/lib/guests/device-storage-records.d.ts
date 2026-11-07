import { z } from 'zod';
import { type GuestStorageRequest, type JsonValue } from '@openchamber/sdk';
export declare const deviceStorageNamespaceSchema: z.ZodObject<{
    key: z.ZodString;
    json: z.ZodString;
    bytes: z.ZodNumber;
}, z.core.$strict>;
export declare const deviceStorageMetaSchema: z.ZodObject<{
    key: z.ZodLiteral<"total">;
    bytes: z.ZodNumber;
}, z.core.$strict>;
type DeviceStorageNamespaceInput = {
    key: string;
    json: string;
    bytes: number;
};
type DeviceStorageMetaInput = {
    key: 'total';
    bytes: number;
};
/** Encodes all host-owned identity parts without delimiter ambiguity. */
export declare const deviceStorageNamespaceKey: (runtimeKey: string, guestId: string, storageId: string) => string;
export declare const decodeDeviceStorageNamespace: (existing: DeviceStorageNamespaceInput | undefined, expectedKey: string) => {
    record: {
        key: string;
        json: string;
        bytes: number;
    };
    values: Map<string, JsonValue>;
} | null;
export declare const deviceStorageTotalBytes: (existing: DeviceStorageMetaInput | undefined) => number;
export declare const prepareDeviceStorageWrite: (current: ReturnType<typeof decodeDeviceStorageNamespace>, request: GuestStorageRequest, totalBytes: number) => {
    record: {
        json: string;
        bytes: number;
    } | null;
    totalBytes: number;
    result: {
        readonly storage: true;
        readonly op: "delete" | "set";
    };
};
export declare const removeDeviceStorageNamespace: (current: ReturnType<typeof decodeDeviceStorageNamespace>, totalBytes: number) => {
    record: null;
    totalBytes: number;
};
export {};
