/**
 * Chromium answers capturePage() with UnknownVizError while a page has no
 * composited frame to hand over. A resize retires the current surface and the
 * replacement takes a few frames to arrive, and a tab outside the view can sit
 * in the same state. The gap is brief: issue #33 recorded two failures and a
 * success on the third manual call. A capture that waits and asks again gets
 * the frame, so this retries that one error on a short schedule. Every other
 * failure surfaces on the first attempt, because a destroyed webview or a
 * refused invoke fails the same way every time.
 */
/** Pauses between attempts, in order. Three retries span about two seconds. */
export declare const CAPTURE_RETRY_DELAYS_MS: readonly number[];
/**
 * Runs one page capture, retrying while Chromium reports it has no frame yet.
 * A null result is a finished answer, the host has no page to capture, and it
 * passes through without a retry. When the pauses run out the last error is
 * rethrown, so the caller reports the failure it actually hit.
 */
export declare const capturePageWithRetry: <T>(capture: () => Promise<T>, options?: {
    readonly delaysMs?: readonly number[];
    readonly sleep?: (ms: number) => Promise<void>;
}) => Promise<T>;
