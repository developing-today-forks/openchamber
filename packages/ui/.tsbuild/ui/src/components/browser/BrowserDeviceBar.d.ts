import React from 'react';
import { type BrowserViewport } from '@/lib/browser/viewport';
export type BrowserColorScheme = 'system' | 'light' | 'dark';
/**
 * Size and appearance controls for the previewed page.
 *
 * Shown only when asked for. The width and height boxes are the source of
 * truth; the preset list is a shortcut into them, which is why choosing a
 * preset and then typing a size are the same action from here on.
 */
export declare const BrowserDeviceBar: React.FC<{
    viewport: BrowserViewport;
    onViewportChange: (viewport: BrowserViewport) => void;
    colorScheme: BrowserColorScheme;
    onColorSchemeChange: (scheme: BrowserColorScheme) => void;
    scale: number;
}>;
