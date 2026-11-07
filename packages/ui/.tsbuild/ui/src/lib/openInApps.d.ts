export type OpenInApp = {
    id: string;
    label: string;
    appName: string;
};
export declare const OPEN_IN_APPS: OpenInApp[];
export declare const DEFAULT_OPEN_IN_APP_ID = "finder";
export declare const OPEN_IN_ALWAYS_AVAILABLE_APP_IDS: Set<string>;
export declare const getPlatformOpenInApp: (app: OpenInApp) => OpenInApp;
export declare const getOpenInAppById: (id: string | null | undefined) => OpenInApp | null;
