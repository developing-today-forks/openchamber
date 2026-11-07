/**
 * The Content Security Policy every guest document runs under, on top of the
 * `sandbox="allow-scripts"` iframe. It keeps the guest off the network: its
 * own package files load, and `data:`/`blob:` URLs it builds itself, nothing
 * else. Reaching the outside world is the host's job (`request` to the one
 * declared `apiOrigin`, which the user approved), so a guest cannot send what
 * it was shown (conversation, files, model output) anywhere on its own.
 *
 * `connectSource` is where `fetch`/XHR/WebSocket may go: the guest's own
 * package path on the server, or null for none. `'self'` would reach the
 * whole OpenChamber API, which a server without a UI password answers.
 *
 * `origins` are the `contributes.origins` the user approved: the guest may
 * exchange data with them directly (fetch, images, fonts, styles, media).
 * Never scripts or workers: code loaded from elsewhere could change after
 * the extension was approved.
 *
 * Inline and eval stay allowed: they run code, they do not open connections.
 */
export declare const guestFramePolicy: (connectSource: string | null, origins?: readonly string[]) => string;
