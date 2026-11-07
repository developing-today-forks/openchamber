type ThemeVariant = 'light' | 'dark';
/**
 * Loads the sprite in the background once the app is interactive, so the first
 * icon a person sees is already there. An icon requested before this fires
 * loads the sprite itself. Runs once per document.
 */
export declare const preloadFileTypeSprite: () => void;
export declare const getFileTypeIconHref: (filePath: string, options?: {
    extension?: string;
    themeVariant?: ThemeVariant;
}) => string;
export {};
