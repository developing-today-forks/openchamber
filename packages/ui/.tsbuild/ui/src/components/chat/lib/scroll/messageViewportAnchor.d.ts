export interface MessageViewportAnchor {
    readonly messageId: string;
    readonly offsetTop: number;
}
export type ViewportAnchorAlignment = 'missing' | 'moved' | 'aligned';
export declare const ANCHOR_HOLD_STABLE_FRAMES = 30;
export declare const ANCHOR_HOLD_MAX_FRAMES = 180;
export declare const captureMessageViewportAnchor: (container: HTMLElement) => MessageViewportAnchor | null;
