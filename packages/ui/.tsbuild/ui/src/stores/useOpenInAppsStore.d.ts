import { type OpenInApp } from '@/lib/openInApps';
export type OpenInAppOption = OpenInApp & {
    iconDataUrl?: string;
};
type OpenInAppsState = {
    selectedAppId: string;
    availableApps: OpenInAppOption[];
    hasLoadedApps: boolean;
    isCacheStale: boolean;
    isScanning: boolean;
    initialize: () => void;
    loadInstalledApps: (force?: boolean) => Promise<void>;
    selectApp: (appId: string) => Promise<void>;
};
export declare const useOpenInAppsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<OpenInAppsState>>;
export {};
