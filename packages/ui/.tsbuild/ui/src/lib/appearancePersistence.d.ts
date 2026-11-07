interface AppearancePreferences {
    showReasoningTraces?: boolean;
    collapsibleThinkingBlocks?: boolean;
}
export declare const applyAppearancePreferences: (preferences: AppearancePreferences) => void;
export declare const loadAppearancePreferences: () => Promise<AppearancePreferences | null>;
export {};
