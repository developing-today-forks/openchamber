import { type ClassValue } from "clsx";
import type { I18nKey } from "@/lib/i18n";
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Detects if the current platform is macOS.
 * Uses navigator.userAgent in browser environments.
 */
export declare const isMacOS: () => boolean;
export declare const isWindows: () => boolean;
export declare const getRevealLabelKey: () => I18nKey;
export declare const truncatePathMiddle: (value: string, options?: {
    maxLength?: number;
}) => string;
export declare function formatPathForDisplay(path: string | null | undefined, homeDirectory?: string | null): string;
export declare function formatDirectoryName(path: string | null | undefined, homeDirectory?: string | null): string;
/**
 * Fuzzy search using Fuse.js with typo tolerance.
 * Returns true if query fuzzy-matches target (e.g. "coude" matches "claude")
 */
export declare function fuzzyMatch(target: string, query: string): boolean;
