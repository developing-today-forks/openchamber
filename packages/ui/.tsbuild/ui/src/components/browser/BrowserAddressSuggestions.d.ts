import React from 'react';
import type { BrowserHistoryEntry } from '@/lib/browser/history';
/**
 * Addresses already visited in this project, offered under the address bar.
 *
 * Kept deliberately plain: it is a short list of places, so it borrows the
 * app's dropdown surface rather than introducing a second look for the same
 * idea. Selection is driven from the address bar's own keyboard handling, which
 * is why the highlighted row arrives as a prop instead of being tracked here.
 */
export declare const BrowserAddressSuggestions: React.FC<{
    entries: readonly BrowserHistoryEntry[];
    activeIndex: number;
    onSelect: (url: string) => void;
    onForget: (url: string) => void;
    onHighlight: (index: number) => void;
}>;
