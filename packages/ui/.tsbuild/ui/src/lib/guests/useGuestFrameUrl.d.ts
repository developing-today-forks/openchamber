type GuestFrameOptions = {
    guestId: string;
    entry: string | null;
    instanceKey: string;
    enabled: boolean;
    /** Approved `contributes.origins`; relay documents carry them in their policy. Part of `instanceKey`. */
    origins: readonly string[];
};
/** Keep a loaded document alive; renew scoped auth only when it navigates again. */
export declare const useGuestFrameUrl: ({ guestId, entry, instanceKey, enabled, origins }: GuestFrameOptions) => {
    src: string;
    srcDoc: string | undefined;
    status: "error" | "loading" | "ready";
    recoverExpiredNavigation: () => boolean;
    acknowledgeHandshake: () => void;
};
export {};
