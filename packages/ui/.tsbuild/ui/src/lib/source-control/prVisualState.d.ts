import type { CSSProperties } from 'react';
/** How a PR is coloured: the theme's `--pr-<state>` token. */
export type PrVisualState = 'draft' | 'open' | 'blocked' | 'merged' | 'closed';
type PrVisualInput = {
    state: string;
    draft: boolean;
    checksState: string | null | undefined;
    mergeable: boolean | null | undefined;
    mergeableState: string | null | undefined;
};
/**
 * The one PR colour rule, shared by the sidebar, the Git view and the
 * reference picker. Orange (`blocked`) means not good yet: failed checks or a
 * conflict to fix, or checks still running to wait for. GitHub's `blocked`
 * merge state alone usually means a missing required review, so it keeps the
 * open colour.
 */
export declare const prVisualStateOf: (pr: PrVisualInput) => PrVisualState;
/**
 * Inline style for an element with the `oc-ref-tint` class: the state colour
 * a PR or issue reference rests muted from and shows in full on hover.
 */
export declare const refTintStyle: (color: string) => CSSProperties & {
    '--oc-ref-tint': string;
};
export {};
