import type { Theme } from '@/types/theme';
/**
 * Build the `--md-syntax-*` CSS custom properties for the given app theme.
 * Apply the result as inline styles on the markdown container so the static
 * Shiki theme resolves to the active palette.
 *
 * Lives apart from `markdownTheme.ts` because that module imports
 * `@pierre/diffs` for theme registration; eager consumers of these CSS vars
 * (tool output, code blocks) must not pull that stack into the startup graph.
 */
export declare const getMarkdownSyntaxVars: (theme: Theme) => Record<string, string>;
