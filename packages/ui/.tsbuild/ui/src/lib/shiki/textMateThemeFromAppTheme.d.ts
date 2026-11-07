import type { Theme } from '@/types/theme';
import type { VSCodeTextMateTheme, VSCodeTokenColorRule } from './vscodeTextMateTheme';
export declare const buildSyntaxTokenRules: (syntax: Theme['colors']['syntax']) => VSCodeTokenColorRule[];
export declare function buildTextMateThemeFromAppTheme(theme: Theme): VSCodeTextMateTheme;
