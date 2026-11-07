import type { UpdateInfo } from '@/lib/desktop';
export declare const MOBILE_RELEASE_FETCH_TIMEOUT_MS = 10000;
type ReleaseFetch = (url: string, init: {
    headers: {
        Accept: string;
    };
    signal: AbortSignal;
}) => Promise<Response>;
/**
 * Compares two release versions: 1 when `left` is newer, -1 when older, 0
 * when equal or when either side is not a plain numeric version (an
 * unparseable version never claims an update).
 */
export declare function compareReleaseVersions(left: string, right: string): number;
/**
 * The newest published release as update info for `currentVersion`, or
 * null when the installed build is current or the answer cannot be used.
 * The download URL names the release's canonical Android APK asset (the
 * asset `mobile-release.yml` uploads), falling back to any APK asset.
 */
export declare function fetchLatestMobileRelease(currentVersion: string, fetchImpl: ReleaseFetch): Promise<UpdateInfo | null>;
/**
 * The direct check for the running app: Android Capacitor builds only,
 * compared on the native version the OS reports for the installed APK
 * (not the bundled web UI version). Silent null everywhere else.
 */
export declare function checkMobileReleaseUpdate(): Promise<UpdateInfo | null>;
export {};
