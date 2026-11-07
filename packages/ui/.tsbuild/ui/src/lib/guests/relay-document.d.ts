type LoadAsset = (path: string) => Promise<Response>;
/** Prepare package-owned static resources for an iframe that has no HTTP origin. */
export declare const loadRelayGuestDocument: (guestId: string, entry: string, load: LoadAsset, origins?: readonly string[]) => Promise<string>;
export {};
