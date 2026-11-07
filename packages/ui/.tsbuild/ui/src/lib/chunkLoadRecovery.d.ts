import { lazy } from 'react';
export declare function importWithChunkRecovery<T>(load: () => Promise<T>, options?: {
    retries?: number;
}): Promise<T>;
export declare const lazyWithChunkRecovery: typeof lazy;
