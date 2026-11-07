/**
 * OpenChamber deep-link vocabulary — the single source of truth for the `openchamber://`
 * URL scheme used across every native entry point: notification taps, home-screen / lock-
 * screen widgets, and (later) Live Activities. Anything that wants to drive navigation
 * builds a URL with {@link buildDeepLink} and anything that receives one parses it with
 * {@link parseDeepLink} into a typed {@link DeepLinkIntent}; the navigation layer
 * (deepLinkNavigation) is the only place that knows how to *apply* an intent.
 *
 * Keep this file pure (no React, no stores, no Capacitor) so it can be imported from any
 * context — including, eventually, a tiny encoder shared with the native widget/extension.
 */
export type SessionsFilter = 'all' | 'attention' | 'recent';
export type ViewTarget = 'files' | 'mcp' | 'instances' | 'update';
/**
 * Every navigable destination the app exposes to the outside world. New widget/notification
 * ideas should add a variant here first, then teach deepLinkNavigation how to apply it —
 * that keeps the "blocks" composable without leaking ad-hoc URL parsing into features.
 */
export type DeepLinkIntent = {
    type: 'session';
    sessionId: string;
    directory?: string;
    messageId?: string;
} | {
    type: 'new-session';
    directory?: string;
    projectId?: string;
    agent?: string;
    model?: string;
} | {
    type: 'sessions';
    filter?: SessionsFilter;
} | {
    type: 'status';
} | {
    type: 'settings';
    section?: string;
} | {
    type: 'changes';
    path?: string;
    staged?: boolean;
} | {
    type: 'view';
    target: ViewTarget;
};
/**
 * Parse a raw `openchamber://…` string into a typed intent, or `null` if it isn't a
 * recognised OpenChamber deep link. Tolerant by design: unknown routes return `null`
 * rather than throwing, so callers can fall back without a try/catch.
 */
export declare function parseDeepLink(raw: string | null | undefined): DeepLinkIntent | null;
