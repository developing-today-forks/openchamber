import type { FilesAPI } from '@/lib/api/types';
/**
 * Content-cached `FilesAPI.readFile` wrapper.
 *
 * Lifecycle: `RuntimeAPIProvider` owns create/dispose in an effect so React
 * Strict Mode remounts get a fresh owner. After `dispose()`, reads throw —
 * callers must not keep using a torn-down owner. Runtime endpoint switches
 * bump generation and clear the cache without deactivating the owner.
 */
export declare function createContentCachedFiles(files: FilesAPI): {
    files: FilesAPI;
    dispose: () => void;
};
