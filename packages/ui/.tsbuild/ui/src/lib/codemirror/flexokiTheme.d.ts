import type { Extension } from '@codemirror/state';
import type { Theme } from '@/types/theme';
export declare function createFlexokiCodeMirrorTheme(theme: Theme, options?: {
    syntaxColors?: boolean;
    fontSize?: number;
}): Extension;
