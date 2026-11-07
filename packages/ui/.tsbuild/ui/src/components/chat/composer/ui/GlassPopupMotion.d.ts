/**
 * Enter and exit motion for the composer's glass popups: the floating panels
 * (queue, BTW, permission, form), the autocomplete pickers and the
 * context-chip preview.
 *
 * The wrapper moves; its first child, the glass surface, fades. Opacity stays
 * on the glass itself because an ancestor with opacity below 1 is a backdrop
 * root: the blur would go flat for the whole fade and pop back at the end.
 *
 * Exit runs under `AnimatePresence`, which keeps the removed popup mounted
 * until the fade finishes. Outside it, the popup only animates in.
 */
import React from 'react';
export declare function GlassPopupMotion({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
