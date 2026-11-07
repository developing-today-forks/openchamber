export declare const RESPONSE_STYLE_PRESETS: readonly ['concise', 'detailed', 'mentor', 'pushback', 'noFiller', 'matchEnergy', 'warmPeer'];
export type ResponseStylePreset = typeof RESPONSE_STYLE_PRESETS[number];
export declare const isResponseStylePreset: (value: unknown) => value is ResponseStylePreset;
export declare const getResponseStylePresetInstructions: (preset: ResponseStylePreset) => string;
export declare const fetchResponseStyleInstruction: () => Promise<string | null>;
