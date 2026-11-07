import type { InstalledGuest } from './types.ts';
export declare const BUILTIN_BROWSER_PROVIDER = "builtin";
/**
 * Extensions the Browser provider dropdown can offer: active (enabled and
 * fully approved) and declaring the role. The server applies the same test
 * before sending an action, so what is listed here is what would answer.
 */
export declare const browserProviderGuests: (guests: readonly InstalledGuest[]) => InstalledGuest[];
