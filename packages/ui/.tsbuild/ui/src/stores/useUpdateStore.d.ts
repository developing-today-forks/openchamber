import type { UpdateInfo, UpdateProgress } from '@/lib/desktop';
type UpdateState = {
    checking: boolean;
    available: boolean;
    downloading: boolean;
    downloaded: boolean;
    installing: boolean;
    info: UpdateInfo | null;
    progress: UpdateProgress | null;
    error: string | null;
    runtimeType: 'desktop' | 'web' | 'vscode' | 'mobile' | null;
    lastChecked: number | null;
    nextCheckInSec: number | null;
};
interface UpdateStore extends UpdateState {
    checkForUpdates: () => Promise<number | null>;
    downloadUpdate: () => Promise<void>;
    restartToUpdate: () => Promise<void>;
    dismiss: () => void;
    reset: () => void;
}
export declare function parseUpdateCheckResponse(data: {
    available?: boolean;
    version?: string;
    currentVersion?: string;
    body?: string;
    releaseUrl?: string;
    downloadUrl?: string;
    nextSuggestedCheckInSec?: number;
    packageManager?: string;
    updateCommand?: string;
    installBlocked?: string;
}): UpdateInfo;
/**
 * Checks the OpenChamber server the native app is connected to, not the app
 * itself. The shared store's `mobile` check is about the app build (store or
 * APK updates); this asks the server about its own version, exactly like a
 * browser on that server would, so the result can be installed through the
 * server's own update route. Throws on failure so callers never read a failed
 * check as "up to date".
 */
export declare function checkConnectedServerForUpdates(): Promise<UpdateInfo>;
export declare const useUpdateStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UpdateStore>>;
export {};
