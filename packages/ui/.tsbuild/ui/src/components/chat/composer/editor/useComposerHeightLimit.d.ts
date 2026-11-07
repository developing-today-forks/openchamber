import React from 'react';
interface UseComposerHeightLimitOptions {
    active: boolean;
    disabled?: boolean;
    hostRef: React.RefObject<HTMLElement | null>;
    maxLines: number;
    boundSelector?: string;
    boundGapPx?: number;
}
export declare function useComposerHeightLimit(options: UseComposerHeightLimitOptions): number | null;
export {};
