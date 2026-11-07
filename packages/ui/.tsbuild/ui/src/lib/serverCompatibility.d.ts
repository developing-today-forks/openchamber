import { runtimeFetch } from './runtime-fetch';
/**
 * The OpenChamber version the connected server reports, over whatever
 * transport the app uses for it (direct, tunnel, relay). `null` when the
 * server does not say, which is not evidence of an old server.
 */
export declare const fetchConnectedServerVersion: (signal: AbortSignal, request?: typeof runtimeFetch) => Promise<string | null>;
/**
 * A server before 2.0 runs OpenCode 1.x and answers the 2.x routes this app
 * calls with its web page. A version that does not parse says nothing.
 */
export declare const isServerBeforeOpenCode2: (version: string) => boolean;
