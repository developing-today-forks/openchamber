import React from 'react';
import type { BrowserHistoryEntry } from '@/lib/browser/history';
import type { IconName } from '@/components/icon/icons';
type BrowserToolbarProps = {
    address: string;
    /** A mark before the address, with its meaning: the page is inside an isolated space. */
    addressMark?: {
        icon: IconName;
        label: string;
    };
    /** Addresses already visited in this project, offered while typing. */
    suggestions?: readonly BrowserHistoryEntry[];
    onForgetSuggestion?: (url: string) => void;
    onAddressChange: (value: string) => void;
    onSubmit: (value: string) => void;
    onBack: () => void;
    onForward: () => void;
    onReload: () => void;
    onOpenExternal: () => void;
    canOpenExternal?: boolean;
    canGoBack: boolean;
    canGoForward: boolean;
    isLoading: boolean;
    /** These need a real Chromium host; hidden without one. */
    onAnnotate?: () => void;
    onOpenDevTools?: () => void;
    isAnnotating?: boolean;
    onHardReload?: () => void;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onZoomReset?: () => void;
    /** Whole percent, e.g. 110. Controls hide at 100 to keep the bar quiet. */
    zoomPercent?: number;
    onClearCookies?: () => void;
    onClearCache?: () => void;
    onToggleDeviceBar?: () => void;
    isDeviceBarOpen?: boolean;
};
export declare const BrowserToolbar: React.FC<BrowserToolbarProps>;
export {};
