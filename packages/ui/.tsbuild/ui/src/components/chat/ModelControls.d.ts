import React from 'react';
import { type MobileControlsPanel } from './mobileControlsUtils';
import type { BtwSelection } from '@/stores/useBtwStore';
type ModelControlsProps = {
    className?: string;
    mobilePanel?: MobileControlsPanel;
    onMobilePanelChange?: (panel: MobileControlsPanel) => void;
    /** Offers "Run on several models" at the top of the desktop model picker. */
    onRunInParallel?: () => void;
} & ({
    selection?: never;
    sessionId?: never;
    agentSelectable?: never;
} | {
    selection: BtwSelection;
    sessionId: string | null;
    /** Offers the agent picker and saves the pick for `sessionId` (a chat pinned in the side panel). */
    agentSelectable?: boolean;
});
export declare const ModelControls: React.FC<ModelControlsProps>;
export {};
