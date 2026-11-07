import type { ToastRequest } from '@openchamber/sdk';
/** Buttons own only local toast data and remain usable after the guest frame exits. */
export declare const showGuestToast: (request: ToastRequest) => void;
