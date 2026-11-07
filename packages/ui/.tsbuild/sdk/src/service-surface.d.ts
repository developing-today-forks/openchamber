/**
 * Shared surface: a service shows the host a live picture of something an
 * agent is working in (a browser, a simulator, a desktop app) and takes the
 * user's pointer and keyboard back, so a person can watch, step in for a
 * manual step, and hand control back. The host draws it in the extension's
 * rail panel; the service only produces frames and consumes input.
 *
 * Declared with `contributes.service.surface: true`. The host keeps the
 * service running while a viewer is attached and talks plain HTTP to it:
 *
 * - `GET /surface/frame?after=<seq>&wait=<ms>`: the next frame newer than
 *   `seq`, held up to `wait` ms. 200 with the image bytes (`Content-Type`
 *   `image/jpeg` or `image/png`) and the `x-surface-*` headers below; 204 when
 *   nothing newer arrived in time. Sequence numbers start at 1, so `after=0`
 *   is "the current picture, now". The host asks for one frame at a time per
 *   viewer, so a slow viewer never piles up frames: that is the backpressure.
 * - `POST /surface/input`: `{ events: SurfaceInputEvent[] }`, coordinates in
 *   frame pixels. Sent only while the user holds control. Headers name the
 *   viewer (`x-surface-viewer`) and the frame it last drew
 *   (`x-surface-frame-seq`, the service's own sequence number, `0` before the
 *   first). Answer 409 to refuse input made on a picture you no longer show.
 * - `POST /surface/control`: `{ controller, viewer? }` whenever control
 *   changes, so the service can pause its own automation while the user is
 *   in. `viewer` is the controlling viewer's id when `controller` is `user`.
 *
 * A page of the same extension open in the same window as a viewer (a
 * docked toolbar, an extension page) reaches the service with that viewer's
 * `x-surface-viewer`, `x-surface-viewer-controls` (`1` while it holds
 * control), and `x-surface-frame-seq` on every `serviceRequest`. The host
 * sets all three itself; without a viewer in that window they are absent.
 * - `POST /surface/resize`: `{ width, height }` the panel can show; the
 *   service answers the size it settled on, or 400 to keep its own.
 * - `GET /surface/clipboard`: `{ text }`, what the user copied inside the
 *   surface; the host puts it on their clipboard.
 */
export declare const SURFACE_FRAME_PATH = "/surface/frame";
export declare const SURFACE_INPUT_PATH = "/surface/input";
export declare const SURFACE_CONTROL_PATH = "/surface/control";
export declare const SURFACE_RESIZE_PATH = "/surface/resize";
export declare const SURFACE_CLIPBOARD_PATH = "/surface/clipboard";
export declare const SURFACE_SEQ_HEADER = "x-surface-seq";
export declare const SURFACE_WIDTH_HEADER = "x-surface-width";
export declare const SURFACE_HEIGHT_HEADER = "x-surface-height";
export declare const SURFACE_TITLE_HEADER = "x-surface-title";
/** `1` while the service's own automation (an agent) is driving the surface. */
export declare const SURFACE_AGENT_ACTIVE_HEADER = "x-surface-agent-active";
/** Host → service: the host-issued id of the viewer a request comes from. */
export declare const SURFACE_VIEWER_HEADER = "x-surface-viewer";
/** Host → service: the service's sequence number of the frame that viewer last drew; `0` before its first. */
export declare const SURFACE_FRAME_SEQ_HEADER = "x-surface-frame-seq";
/** Host → service, on page `serviceRequest`s only: `1` while that viewer holds control, else `0`. */
export declare const SURFACE_VIEWER_CONTROLS_HEADER = "x-surface-viewer-controls";
export declare const SURFACE_FRAME_MIMES: readonly ['image/jpeg', 'image/png'];
export type SurfaceFrameMime = (typeof SURFACE_FRAME_MIMES)[number];
/** How long the host lets one frame request wait before asking again. */
export declare const SURFACE_FRAME_WAIT_MS = 25000;
export declare const SURFACE_FRAME_MAX_BYTES = 8000000;
export declare const SURFACE_INPUT_BATCH_MAX = 256;
export declare const SURFACE_TEXT_MAX = 64000;
export declare const SURFACE_TITLE_MAX = 200;
export declare const SURFACE_DIMENSION_MAX = 16384;
/** After an agent action the agent counts as controlling for this long. */
export declare const SURFACE_AGENT_HOLD_MS = 30000;
export type SurfaceModifiers = {
    alt: boolean;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
};
export type SurfacePointerEvent = {
    type: 'pointer';
    action: 'down' | 'up' | 'move';
    x: number;
    y: number;
    /** 0 left, 1 middle, 2 right; `-1` for a move without a button change. */
    button: number;
    /** Bitmask of buttons held, as `MouseEvent.buttons`. */
    buttons: number;
    modifiers: SurfaceModifiers;
};
export type SurfaceWheelEvent = {
    type: 'wheel';
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    modifiers: SurfaceModifiers;
};
export type SurfaceKeyEvent = {
    type: 'key';
    action: 'down' | 'up';
    /** `KeyboardEvent.key`. */
    key: string;
    /** `KeyboardEvent.code`. */
    code: string;
    modifiers: SurfaceModifiers;
};
/** Text the user pasted or composed; type it as is. */
export type SurfaceTextEvent = {
    type: 'text';
    text: string;
};
export type SurfaceInputEvent = SurfacePointerEvent | SurfaceWheelEvent | SurfaceKeyEvent | SurfaceTextEvent;
export type SurfaceInputBatch = {
    events: SurfaceInputEvent[];
};
export declare const SURFACE_CONTROLLERS: readonly ['none', 'agent', 'user'];
export type SurfaceController = (typeof SURFACE_CONTROLLERS)[number];
export type SurfaceControlNotice = {
    controller: SurfaceController;
    /** The controlling viewer's id (`x-surface-viewer`), present only when `controller` is `user`. */
    viewer?: string;
};
export type SurfaceResizeRequest = {
    width: number;
    height: number;
};
export type SurfaceResizeAnswer = {
    width: number;
    height: number;
};
export type SurfaceClipboardAnswer = {
    text: string;
};
/**
 * A service's read of the `POST /surface/input` body. Every event is checked
 * field by field; one bad event refuses the whole batch (`null`), which the
 * service answers with HTTP 400. No schema library needed.
 */
export declare const readSurfaceInputBatch: (body: string) => SurfaceInputBatch | null;
/** A service's read of the `POST /surface/control` body. */
export declare const readSurfaceControlNotice: (body: string) => SurfaceControlNotice | null;
/** A service's read of the `POST /surface/resize` body. */
export declare const readSurfaceResizeRequest: (body: string) => SurfaceResizeRequest | null;
