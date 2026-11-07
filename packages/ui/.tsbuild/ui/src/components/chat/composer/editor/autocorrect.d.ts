export type ComposerAutoCorrect = 'on' | 'off' | 'Off';
type PlatformNavigator = Pick<Navigator, 'maxTouchPoints' | 'platform' | 'userAgent' | 'vendor'>;
/** Keep desktop autocorrect off without triggering CodeMirror's period revert. */
export declare function composerAutoCorrect(options: {
    isMobile: boolean;
    navigator?: PlatformNavigator;
}): ComposerAutoCorrect;
export {};
