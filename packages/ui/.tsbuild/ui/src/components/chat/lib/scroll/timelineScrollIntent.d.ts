export declare const isFollowReleaseKey: (event: Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'key' | 'metaKey' | 'shiftKey'>) => boolean;
export declare const nestedScrollableConsumesWheelUp: (root: HTMLElement, target: EventTarget | null) => boolean;
/** `up` moves toward older content: a wheel up, or a finger dragging down. */
export type FrameScrollDirection = 'up' | 'down';
export declare function dispatchFrameScroll(frame: HTMLElement, direction: FrameScrollDirection): void;
/** Listens for frame scroll gestures inside `container`. */
export declare function onFrameScroll(container: HTMLElement, listener: (direction: FrameScrollDirection) => void): () => void;
export declare function dispatchRowExpand(row: HTMLElement | null): void;
/** Listens for rows the reader opens inside `container`. */
export declare function onRowExpand(container: HTMLElement, listener: () => void): () => void;
export declare const isMiddleButtonPan: (root: HTMLElement, event: Pick<MouseEvent, 'button' | 'target'>) => boolean;
