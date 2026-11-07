import type { Theme } from '../../types/theme';
/** Host-owned text colors shared by app CSS and extension snapshots. */
export declare function getReadableThemeColors(theme: Theme): {
    tinted: {
        primary: string;
        error: string;
        info: string;
        success: string;
        warning: string;
    };
    status: {
        error: string;
        warning: string;
        success: string;
        info: string;
    };
    selectionForeground: string;
};
