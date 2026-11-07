import type { GuestHostSurface, HostTheme } from '../contract.ts';
export type ThemeRoot = {
    style: {
        colorScheme: string;
        setProperty: (name: string, value: string) => void;
    };
    dataset?: {
        ocSurface?: string;
        ocTheme?: string;
    };
};
/**
 * Paint the host theme onto the iframe root. Guest chrome reads these
 * variables, and the root itself gets the host font and text colour so plain
 * DOM the guest draws outside the kit (a `<pre>`, a `<p>`) inherits them
 * instead of the browser's serif default.
 */
export declare const applyHostTheme: (theme: HostTheme, root: ThemeRoot) => void;
export declare const applyHostReady: (ctx: {
    theme: HostTheme;
    surface: GuestHostSurface;
}, root: ThemeRoot) => void;
