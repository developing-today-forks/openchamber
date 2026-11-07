import type { WalkthroughStage } from '@/lib/walkthrough/types';
/** `retrying` is the same wait from the user's side: still waiting on the model. */
declare const indexOfStage: (stage: WalkthroughStage | null) => number;
/** One step at a time, so a fast stage is still shown rather than skipped. */
declare const nextIndex: (current: number, target: number) => number;
export interface WalkthroughStageProgress {
    /** Steps to render as finished. */
    completedCount: number;
    /** Step to render as running, or `null` when everything is done. */
    activeIndex: number | null;
    /** True while the display still owes the user time after the work finished. */
    holding: boolean;
}
export declare const useWalkthroughStageProgress: (stage: WalkthroughStage | null, active: boolean) => WalkthroughStageProgress;
export declare const WALKTHROUGH_STAGE_ORDER: WalkthroughStage[];
export declare const __testing: {
    indexOfStage: typeof indexOfStage;
    nextIndex: typeof nextIndex;
};
export {};
