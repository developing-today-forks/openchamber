/**
 * Reads a response body as text with a byte cap enforced while the body
 * streams in. The stream is cancelled as soon as it crosses the cap, so a
 * body with no declared length cannot grow memory past the cap before a
 * post-read length check would see it. An over-cap body throws, which
 * callers treat the same as a fetch failure.
 *
 * The web server has the same read for its own fetches in
 * packages/web/server/lib/shared/response-body.js; that module is
 * server-side and is not importable from the UI bundle, so the UI keeps
 * this copy. Keep the cap semantics in sync: declared length first,
 * then a streamed count, cancel on exceed.
 */
export declare const readBoundedResponseText: (response: Response, maxBytes: number) => Promise<string>;
