import { type GuestStatusControl, type GuestStatusControlEvent } from '@openchamber/sdk';
export type GuestStatusControlBinding = {
    controls: GuestStatusControl[];
    dispatch: (event: GuestStatusControlEvent) => void;
};
type StatusControlHost = {
    isActive: () => boolean;
    onChange: (binding: GuestStatusControlBinding | null) => void;
    post: (event: GuestStatusControlEvent) => void;
    now?: () => number;
    getContext?: () => string | null;
};
/** Owns one status frame's header. Retained UI callbacks cannot outlive its definitions. */
export declare const createGuestStatusControls: ({ isActive, onChange, post, now, getContext }: StatusControlHost) => {
    set(controls: GuestStatusControl[]): void;
    retire(): void;
    dispose(): void;
};
export {};
