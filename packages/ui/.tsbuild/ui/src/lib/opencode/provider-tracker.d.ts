/**
 * Provider Circuit-Breaker Tracker
 *
 * Tracks per-provider error state to enable:
 * - Circuit breaking (pause requests to a provider during error storms)
 *
 * Inspired by HiveMind (arXiv:2604.17111) OS-inspired scheduling primitives.
 */
export declare function recordProviderSuccess(providerID: string): void;
export declare function recordProviderError(providerID: string, status?: number): void;
export declare function assertProviderCircuitClosed(providerID: string): void;
