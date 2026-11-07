import type React from 'react';
type ShortcutModifier = 'mod' | 'shift' | 'alt' | 'ctrl' | 'super';
type ShortcutDisplayPlatform = 'macos' | 'windows' | 'other';
type ShortcutKey = string;
export type ShortcutCombo = string;
export type ShortcutConflict = 'exact' | 'prefix';
export declare const UNASSIGNED_SHORTCUT: ShortcutCombo;
interface ParsedShortcutChord {
    modifiers: Set<ShortcutModifier>;
    key: ShortcutKey;
}
export interface ParsedShortcut {
    chords: ReadonlyArray<ParsedShortcutChord>;
}
export declare function keyToShortcutToken(key: string): string;
export declare function normalizeCombo(combo: ShortcutCombo): ShortcutCombo;
export declare function isValidShortcutCombo(combo: ShortcutCombo): boolean;
export declare function parseShortcut(combo: ShortcutCombo): ParsedShortcut | undefined;
export declare function formatShortcutForDisplay(combo: ShortcutCombo, unassignedLabel?: string, platform?: ShortcutDisplayPlatform): string;
export declare function getShortcutConflict(left: ShortcutCombo, right: ShortcutCombo): ShortcutConflict | undefined;
export declare function isRiskyBrowserShortcut(combo: ShortcutCombo): boolean;
/**
 * The character a physical key press should match against bindings. `key`
 * carries the layout-produced character: Option on macOS substitutes symbols
 * ("¡" for ⌥1) and non-Latin layouts substitute their own alphabet ("л" for
 * K). Both keep the physical key in `code`, so those two cases fall back to
 * it; Latin layouts that MOVE keys (Dvorak, AZERTY) keep their `key`-based
 * meaning untouched.
 */
export declare function resolveShortcutEventKey(event: Pick<KeyboardEvent, 'key' | 'code' | 'altKey'>): string;
/** The digit a press addresses, layout- and Option-proof via `code`. */
export declare function resolveShortcutEventDigit(event: Pick<KeyboardEvent, 'key' | 'code'>): string | null;
export declare function eventMatchesShortcut(event: KeyboardEvent | React.KeyboardEvent, combo: ShortcutCombo): boolean;
export declare function isShortcutPrefixHeld(prefixCombo: ShortcutCombo, heldKeys: ReadonlySet<string>): boolean;
export declare function eventMatchesShortcutPrefix(event: KeyboardEvent | React.KeyboardEvent, prefixCombo: ShortcutCombo, heldKeys?: ReadonlySet<string>): boolean;
export {};
