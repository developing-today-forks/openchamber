import React from 'react';
import type { WorkerPoolManager } from '@pierre/diffs/worker';
interface DiffWorkerProviderProps {
    children: React.ReactNode;
}
type WorkerPoolStyle = 'unified' | 'split';
export declare const DiffWorkerProvider: React.FC<DiffWorkerProviderProps>;
export declare const useWorkerPool: (style?: WorkerPoolStyle) => WorkerPoolManager | undefined;
export {};
