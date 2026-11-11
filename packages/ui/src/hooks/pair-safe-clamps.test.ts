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

describe("PWA grapheme-safe clamps", () => {
  const FAMILY = "\u{1F469}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}";

  test("normalizeRecentTitle drops a combining cluster whole instead of leaving a bare base char (oracle: UAX #29 extended grapheme clusters, cap 48)", () => {
    // 'e' + U+0301 is one cluster of 2 UTF-16 units: 47 + 2 straddles the cap.
    expect(normalizeRecentTitle("a".repeat(47) + "e\u0301" + "tail", "fallback")).toBe("a".repeat(47));
    // Exact fit: 46 + 2 = 48 keeps the complete accented cluster.
    expect(normalizeRecentTitle("a".repeat(46) + "e\u0301", "fallback")).toBe("a".repeat(46) + "e\u0301");
  });

  test("normalizeRecentTitle never leaves a dangling ZWJ from a joined emoji sequence (oracle: UAX #29 extended grapheme clusters, cap 48)", () => {
    const clipped = normalizeRecentTitle("a".repeat(45) + FAMILY + "tail", "fallback");

    expect(clipped).toBe("a".repeat(45));
    expect(clipped.endsWith("\u200D")).toBe(false);
  });

  test("normalizeRecentTitle falls back to pair-safe slicing when Intl.Segmenter is unavailable", () => {
    const intl = globalThis.Intl as { Segmenter?: unknown };
    const original = intl.Segmenter;
    delete intl.Segmenter;
    try {
      expect(normalizeRecentTitle("a".repeat(47) + "😀tail", "fallback")).toBe("a".repeat(47));
    } finally {
      intl.Segmenter = original;
    }
  });
});
