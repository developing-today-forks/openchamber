type InitializeSharedPreferencesOptions = {
    /** Console prefix for init failures, for example `[vscode-main]`. */
    logLabel: string;
    /** Runs once appearance init settles, whether it succeeded or failed. */
    onAppearanceSettled?: () => void;
    /** Report this window's device settings (`deviceSettingsReport.ts`); off for auxiliary windows. */
    reportDeviceSettings?: boolean;
};
/** Boots the preferences every renderer shares: locale, appearance, directory, and autosave. */
export declare const initializeSharedPreferences: ({ logLabel, onAppearanceSettled, reportDeviceSettings, }: InitializeSharedPreferencesOptions) => void;
export {};
