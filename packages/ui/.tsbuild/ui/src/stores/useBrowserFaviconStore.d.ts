type FaviconState = {
    byOrigin: Record<string, string>;
    /** Resolves and stores the icon a page reported. Failure is silent by design. */
    resolve: (pageUrl: string, iconUrl: string, webContentsId: number) => void;
};
export declare const useBrowserFaviconStore: import("zustand").UseBoundStore<import("zustand").StoreApi<FaviconState>>;
export {};
