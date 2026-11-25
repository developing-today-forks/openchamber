import { describe, expect, test } from 'bun:test';

import { decideHoverCardPlacement, HOVER_CARD_MIN_WIDTH_PX, HOVER_CARD_WIDTH_PX } from './sessionHoverCardPlacement';

// Oracle: the invariant the card exists under. Whatever the geometry, a
// placed card lies entirely outside the session list and inside the window,
// at least the minimum width wide; and it is skipped only when neither side
// of the list has that much room.

const place = (listLeft: number, listRight: number, viewportWidth: number, endSide: 'left' | 'right' = 'right') =>
  decideHoverCardPlacement({
    list: { left: listLeft, right: listRight },
    row: { left: listLeft + 4, right: listRight - 6 },
    viewportWidth,
    endSide,
  });

const cardSpan = (placement: NonNullable<ReturnType<typeof place>>, rowLeft: number, rowRight: number) =>
  placement.side === 'right'
    ? { left: rowRight + placement.sideOffset, right: rowRight + placement.sideOffset + placement.maxWidth }
    : { left: rowLeft - placement.sideOffset - placement.maxWidth, right: rowLeft - placement.sideOffset };

describe('decideHoverCardPlacement', () => {
  test('a wide window opens the full card on the line end side, past the list edge', () => {
    expect(place(0, 280, 1440)).toEqual({ side: 'right', sideOffset: 14, maxWidth: HOVER_CARD_WIDTH_PX });
  });

  test('a narrow window shrinks the card beside the list rather than covering it', () => {
    const placement = place(0, 520, 800);
    expect(placement?.side).toBe('right');
    expect(placement?.maxWidth).toBe(800 - 520 - 16);
  });

  test('a sidebar taking most of the width shows no card', () => {
    expect(place(0, 700, 820)).toBeNull();
    expect(place(0, 390, 390)).toBeNull();
  });

  test('a sidebar on the right opens the card to its left, over the chat', () => {
    expect(place(1100, 1400, 1400)?.side).toBe('left');
  });

  test('right-to-left prefers the left side and falls back to the right', () => {
    expect(place(500, 800, 1600, 'left')?.side).toBe('left');
    expect(place(100, 400, 1600, 'left')?.side).toBe('right');
  });

  test('never covers the list or leaves the window, for any geometry', () => {
    let seed = 20261124;
    const random = () => {
      seed = (seed * 1103515245 + 12345) % 2 ** 31;
      return seed / 2 ** 31;
    };
    let placed = 0;
    let skipped = 0;
    for (let i = 0; i < 5000; i += 1) {
      const viewportWidth = 320 + Math.floor(random() * 2200);
      const width = 180 + Math.floor(random() * Math.max(1, viewportWidth - 180));
      const left = Math.floor(random() * Math.max(1, viewportWidth - width));
      const right = left + width;
      const endSide = random() < 0.5 ? 'left' : 'right';
      const placement = place(left, right, viewportWidth, endSide);
      const roomiest = Math.max(left, viewportWidth - right) - 16;
      if (!placement) {
        skipped += 1;
        expect(roomiest).toBeLessThan(HOVER_CARD_MIN_WIDTH_PX);
        continue;
      }
      placed += 1;
      const span = cardSpan(placement, left + 4, right - 6);
      expect(placement.maxWidth).toBeGreaterThanOrEqual(HOVER_CARD_MIN_WIDTH_PX);
      expect(span.right <= left || span.left >= right).toBe(true);
      expect(span.left).toBeGreaterThanOrEqual(0);
      expect(span.right).toBeLessThanOrEqual(viewportWidth);
    }
    // Both branches were exercised, so the invariant was not vacuous.
    expect(placed).toBeGreaterThan(100);
    expect(skipped).toBeGreaterThan(100);
  });
});
