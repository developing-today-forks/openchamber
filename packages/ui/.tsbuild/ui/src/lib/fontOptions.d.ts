export type UiFontOption = 'inter' | 'fixel' | 'geist-sans' | 'atkinson-hyperlegible' | 'source-sans-3' | 'roboto' | 'noto-sans' | 'dm-sans' | 'manrope' | 'system' | 'custom';
export type MonoFontOption = 'jetbrains-mono' | 'fira-code' | 'geist-mono' | 'commit-mono' | 'source-code-pro' | 'cascadia-code' | 'roboto-mono' | 'iosevka' | 'system-mono' | 'custom';
interface FontFaceSourceBase {
    family: string;
    weights: number[];
}
interface FontsourceFaceSource extends FontFaceSourceBase {
    packageName: string;
    filePrefix: string;
}
interface DirectFontFaceSource extends FontFaceSourceBase {
    urls: Record<number, string>;
}
export type FontFaceSource = FontsourceFaceSource | DirectFontFaceSource;
interface FontOptionDefinition<T extends string> {
    id: T;
    label: string;
    description: string;
    stack: string;
    notes?: string;
    source?: FontFaceSource;
}
export declare const UI_FONT_OPTIONS: FontOptionDefinition<UiFontOption>[];
export declare const CODE_FONT_OPTIONS: FontOptionDefinition<MonoFontOption>[];
export declare const UI_FONT_OPTION_MAP: Record<UiFontOption, FontOptionDefinition<UiFontOption>>;
export declare const CODE_FONT_OPTION_MAP: Record<MonoFontOption, FontOptionDefinition<MonoFontOption>>;
export declare const DEFAULT_UI_FONT: UiFontOption;
export declare const DEFAULT_MONO_FONT: MonoFontOption;
/** The option that uses a font installed on this device, named by the user. */
export declare const CUSTOM_FONT_ID = "custom";
export declare const isUiFontOption: (value: unknown) => value is UiFontOption;
export declare const isMonoFontOption: (value: unknown) => value is MonoFontOption;
/**
 * A stack that tries the named font first, then `fallback` (the system font),
 * so a name that is not installed still renders. Quotes and characters that
 * could end the CSS value are dropped from the name.
 */
export declare const customFontStack: (name: string, fallback: string) => string;
export {};
