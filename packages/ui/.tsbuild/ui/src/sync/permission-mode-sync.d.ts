/**
 * An isolated space keeps the permission modes of its own sessions in its own server, which
 * answers their requests. A space's modes are read once the space is known, and again at the next
 * change of the list after a read that failed; the host's stream announces a gap, see
 * `onSpacePermissionStream` in sync-context.
 */
export declare const subscribeSpacePermissionModes: (runtimeKey: string) => (() => void);
