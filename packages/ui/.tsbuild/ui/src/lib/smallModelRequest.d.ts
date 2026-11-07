import { type RuntimeFetchOptions } from '@/lib/runtime-fetch';
/**
 * One request to OpenChamber's background model. Any failure that is not in
 * `silentStatuses` raises the shared "Small Model unavailable" toast; callers
 * with a graceful fallback (a note kept verbatim, a reply spoken in full)
 * silence the 404 that means "no model to run on". Callers that show their own
 * error toast use `notifyOnError: false` to avoid duplicate notifications.
 */
export declare function requestSmallModel(init: RuntimeFetchOptions, options?: {
    silentStatuses?: number[];
    notifyOnError?: boolean;
}): Promise<Response>;
