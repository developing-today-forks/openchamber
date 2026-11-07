import type { Theme } from '@/types/theme';
import type { VSCodeThemePalette } from './adapter';
export declare function adaptVSCodeRoles(theme: Theme, authored: Readonly<VSCodeThemePalette['colors']>, highContrast?: boolean): void;
