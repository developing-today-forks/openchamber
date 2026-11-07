/**
 * Says so when the relay refuses this window's runtime tunnel over its limits
 * (too many devices at once, too many connects a minute). The tunnel then
 * parks until the next `online` event or return to the foreground, and a
 * desktop window that stays on screen gets neither, so the toast carries the
 * retry. It closes once the tunnel connects again or the window leaves the
 * relay.
 */
export declare const useRelayLimitToast: () => void;
