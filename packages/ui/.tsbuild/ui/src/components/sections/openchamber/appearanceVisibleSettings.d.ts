export declare const ALL_VISIBLE_SETTINGS: readonly ['theme', 'windowControlsPosition', 'pwaInstallName', 'pwaOrientation', 'mobileKeyboardMode', 'timeFormat', 'weekStart', 'fontSize', 'terminalFontSize', 'editorFontSize', 'spacing', 'scrollbars', 'inputBarOffset', 'animatedActivityIndicators', 'sidebarRows'];
export type VisibleSetting = (typeof ALL_VISIBLE_SETTINGS)[number];
export declare const getAppearanceVisibleSettings: (isVSCode: boolean) => VisibleSetting[];
