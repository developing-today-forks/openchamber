export declare const GUEST_STATUS_CONTROLS_MAX = 4;
export declare const GUEST_STATUS_CONTROL_ID: RegExp;
export declare const GUEST_STATUS_CONTROL_LABEL_MAX = 60;
export declare const GUEST_STATUS_CONTROL_OPTIONS_MAX = 16;
export declare const GUEST_STATUS_CONTROL_VALUE_MAX = 80;
export type GuestStatusControlOption = {
    value: string;
    label: string;
};
export type GuestStatusControl = {
    kind: 'button';
    id: string;
    label: string;
    disabled?: boolean;
} | {
    kind: 'select';
    id: string;
    label: string;
    value: string;
    options: GuestStatusControlOption[];
    disabled?: boolean;
};
export type GuestStatusControlEvent = {
    id: string;
    value?: string;
};
/**
 * Guest-side fast-fail guard for `setStatusControls`. The host zod schema is
 * still authoritative because JavaScript callers can bypass this SDK method.
 */
export declare const isGuestStatusControls: (controls: GuestStatusControl[]) => boolean;
