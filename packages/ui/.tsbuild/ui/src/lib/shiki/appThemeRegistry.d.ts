import type { Theme } from '@/types/theme';
import type { VSCodeTextMateTheme, VSCodeTokenColorRule } from './vscodeTextMateTheme';
type ShikiThemeRegistrationResolvedLike = VSCodeTextMateTheme & {
    settings: VSCodeTokenColorRule[];
    fg: string;
    bg: string;
};
export declare const getThemeContentSignature: (theme: Theme) => string;
export declare const getResolvedShikiTheme: (theme: Theme) => ShikiThemeRegistrationResolvedLike;
export declare const ensurePierreThemeRegistered: (theme: Theme) => void;
export {};
