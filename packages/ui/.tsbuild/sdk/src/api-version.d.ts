/** Wire envelope `v`. Guest postMessage and host pushes use this. */
export declare const OPENCHAMBER_SDK_CHANNEL = "openchamber.sdk";
export declare const OPENCHAMBER_SDK_API_VERSION = 1;
/** Manifest `apiVersion` values this host accepts. Service and sockets ship on `1`. */
export declare const OPENCHAMBER_SDK_MANIFEST_API_VERSIONS: readonly [1];
export type OpenChamberManifestApiVersion = (typeof OPENCHAMBER_SDK_MANIFEST_API_VERSIONS)[number];
