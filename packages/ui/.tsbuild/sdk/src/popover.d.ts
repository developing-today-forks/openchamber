import type { JsonValue } from './contract.ts';
export declare const GUEST_POPOVER_ID: RegExp;
export declare const GUEST_POPOVER_COORDINATE_MAX = 100000;
export declare const GUEST_POPOVER_WIDTH_MIN = 160;
export declare const GUEST_POPOVER_WIDTH_MAX = 640;
export declare const GUEST_POPOVER_HEIGHT_MIN = 48;
export declare const GUEST_POPOVER_HEIGHT_MAX = 480;
export declare const GUEST_POPOVER_DATA_MAX = 16000;
export declare const GUEST_POPOVER_DATA_DEPTH_MAX = 32;
export declare const GUEST_POPOVER_SIDES: readonly ['left', 'right', 'top', 'bottom'];
export type GuestPopoverSide = (typeof GUEST_POPOVER_SIDES)[number];
export type GuestPopoverAnchor = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type GuestPopoverRequest = {
    id: string;
    anchor: GuestPopoverAnchor;
    width: number;
    height: number;
    side?: GuestPopoverSide;
    focus?: boolean;
    data: JsonValue;
};
export type GuestPopoverContext = {
    id: string;
    data: JsonValue;
};
export declare const GUEST_POPOVER_CLOSE_REASONS: readonly ['escape', 'outside', 'anchor', 'owner', 'closed', 'replaced'];
export type GuestPopoverClosedEvent = {
    id: string;
    reason: (typeof GUEST_POPOVER_CLOSE_REASONS)[number];
};
/** Guest-side fast-fail guard. The host schema remains authoritative for untyped callers. */
export declare const isGuestPopoverRequest: (request: GuestPopoverRequest) => boolean;
