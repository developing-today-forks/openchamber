import React from 'react';
type MobileConnectDebugEntry = {
    at: number;
    step: string;
    detail: string;
};
export declare const recordMobileConnectDebug: (step: string, detail: string) => void;
export declare const getMobileConnectDebugEntries: () => MobileConnectDebugEntry[];
export declare const formatMobileConnectDebugEntry: (entry: MobileConnectDebugEntry) => string;
export declare const getMobileConnectDebugText: () => string;
export declare const useDebugPanelLongPress: (onLongPress: () => void, delayMs?: number) => {
    onPointerDown: (event: React.PointerEvent) => void;
    onPointerMove: (event: React.PointerEvent) => void;
    onPointerUp: () => void;
    onPointerCancel: () => void;
    onClickCapture: (event: React.MouseEvent) => void;
};
export {};
