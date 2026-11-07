export type TimelineScrollMode = 'following-end' | 'free-scrolling';
export interface TimelineListMeasurementState {
    readonly data: readonly unknown[];
    readonly scroll: number;
    readonly scrollLength: number;
    readonly positionAtIndex: (index: number) => number | undefined;
    readonly sizeAtIndex: (index: number) => number | undefined;
}
export declare const getRowBottom: (state: TimelineListMeasurementState, index: number) => number | null;
export declare const resolveRealContentEndOffset: ({ state, composerOverlayHeight, footerSize, }: {
    readonly state: TimelineListMeasurementState;
    readonly composerOverlayHeight: number;
    readonly footerSize?: number;
}) => number | null;
export declare const TIMELINE_FOLLOW_REARM_THRESHOLD_PX = 40;
export declare const resolveTimelineIsAtEnd: (state: {
    readonly contentLength?: number;
    readonly scroll?: number;
    readonly scrollLength?: number;
    readonly isNearEnd?: boolean;
    readonly isAtEnd?: boolean;
} | undefined) => boolean | undefined;
