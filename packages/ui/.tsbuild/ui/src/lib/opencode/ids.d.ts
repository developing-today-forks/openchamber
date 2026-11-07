/**
 * Client-generated ids in OpenCode's own format. Kept apart from the client
 * module so callers that need only an id (optimistic messages) do not pull in
 * the transport, and tests that mock the client keep this helper real.
 */
/** Time-sortable id in OpenCode's own format, so client-generated ids sort with server ones. */
export declare const ascendingId: (prefix: "msg" | "ses") => string;
