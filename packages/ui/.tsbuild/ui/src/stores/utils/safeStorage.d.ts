import type { PersistStorage } from 'zustand/middleware';
type JsonStorageOptions = {
    reviver?: (key: string, value: unknown) => unknown;
    replacer?: (key: string, value: unknown) => unknown;
};
export declare const createDeferredSafeJSONStorage: <S>(options?: JsonStorageOptions) => PersistStorage<S, unknown> | undefined;
export declare const getSafeStorage: () => Storage;
export declare const getDeferredSafeStorage: () => Storage;
export declare const getSafeSessionStorage: () => Storage;
export {};
