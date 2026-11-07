import type { GuestToolRule } from '@/lib/guests/tool-presentation';
/**
 * Icon for a tool row, dialog header, or error fallback. An extension rule
 * with an icon wins: a package SVG drawn as a currentColor mask, or a
 * Remixicon the sprite knows; otherwise the built-in mapping runs on the
 * normalized name, and an unknown tool gets the generic wrench.
 */
export declare const getToolIcon: (toolName: string, presentation?: GuestToolRule | null) => import("react/jsx-runtime").JSX.Element;
