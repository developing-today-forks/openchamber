import type { Theme } from '@/types/theme';
import type { GhosttyTheme } from '@/lib/ghostty/core';
export interface TerminalTheme {
    background: string;
    foreground: string;
    cursor: string;
    cursorAccent: string;
    selectionBackground: string;
    selectionForeground?: string;
    selectionInactiveBackground?: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    brightBlack: string;
    brightRed: string;
    brightGreen: string;
    brightYellow: string;
    brightBlue: string;
    brightMagenta: string;
    brightCyan: string;
    brightWhite: string;
}
/** `background` is the page the terminal sits on (`usePageColors`). */
export declare function convertThemeToXterm(theme: Theme, background?: string): TerminalTheme;
/**
 * Theme colors as libghostty-vt takes them. Theme JSON values are hex, so a
 * parse failure means a broken theme file: fall back to plain white on black
 * for that entry rather than sending Ghostty garbage.
 */
export declare function toGhosttyTheme(theme: TerminalTheme): GhosttyTheme;
