/**
 * An RFC 4122 version 4 UUID.
 *
 * `crypto.randomUUID()` exists only in secure contexts, so a plain-HTTP LAN or
 * Tailscale origin has none. `crypto.getRandomValues()` is available in every
 * context, so the fallback builds the same v4 layout from it.
 */
export declare function generateUuid(): string;
