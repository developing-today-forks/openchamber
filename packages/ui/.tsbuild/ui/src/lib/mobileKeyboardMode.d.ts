export type MobileKeyboardMode = 'native' | 'resize-content';
export declare const supportsMobileKeyboardResizeContent: () => boolean;
export declare function normalizeMobileKeyboardMode(value: unknown): MobileKeyboardMode;
export declare function normalizeMobileKeyboardMode(value: unknown, fallback: MobileKeyboardMode): MobileKeyboardMode;
export declare function normalizeMobileKeyboardMode(value: unknown, fallback: undefined): MobileKeyboardMode | undefined;
export declare const getStoredMobileKeyboardMode: () => MobileKeyboardMode;
export declare const setStoredMobileKeyboardMode: (value: unknown) => MobileKeyboardMode;
export declare const applyMobileKeyboardMode: (value: unknown) => MobileKeyboardMode;
