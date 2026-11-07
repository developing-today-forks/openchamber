import React from 'react';
import type { BtwPanelState } from './useBtwPanelState';
/** Memoized: the composer re-renders on every keystroke, and nothing here depends on the draft text. */
export declare const BtwPanel: React.NamedExoticComponent<{
    parentSessionId: string;
    panel: BtwPanelState;
    hidden: boolean;
    onExit: () => void;
}>;
