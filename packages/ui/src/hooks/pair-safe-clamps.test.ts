import { describe, expect, test } from "bun:test";

import { clipPwaInstallName, normalizeRecentTitle } from "../lib/pwa-clamps";

describe("PWA pair-safe clamps", () => {
  test("clipPwaInstallName drops a straddling high surrogate and caps ASCII at 64", () => {
    const clipped = clipPwaInstallName("a".repeat(63) + "😀tail");

    expect(clipped).toBe("a".repeat(63));
    expect(new TextDecoder().decode(new TextEncoder().encode(clipped))).toBe(clipped);
    expect(clipPwaInstallName("a".repeat(70))).toBe("a".repeat(64));
  });

  test("normalizeRecentTitle drops a straddling high surrogate and caps ASCII controls at 48", () => {
    const clipped = normalizeRecentTitle("a".repeat(47) + "😀tail", "fallback");

    expect(clipped).toBe("a".repeat(47));
    expect(new TextDecoder().decode(new TextEncoder().encode(clipped))).toBe(clipped);
    expect(normalizeRecentTitle("a".repeat(48) + "\u0001", "fallback")).toBe("a".repeat(48));
  });
});
