import { type GuestOauthStatus } from './oauth.ts';
type GuestOauthState = {
    byId: Record<string, GuestOauthStatus>;
    setStatus: (guestId: string, status: GuestOauthStatus) => void;
    refresh: (guestId: string) => Promise<GuestOauthStatus | null>;
    resetForRuntimeSwitch: () => void;
};
export declare const useGuestOauthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GuestOauthState>>;
export {};
