import { describe, expect, test } from 'bun:test';

import { CARD_REACH_MS, createHoverCardDwell, SESSION_HOVER_CARD_DWELL_MS, type DwellPointer } from './sessionHoverCardDwell';

// Oracle: a hand-driven clock. The card is open exactly when the pointer has
// rested on the row for the dwell time with nothing held, and not after a
// press until the pointer has left the row.

const createClock = () => {
  let now = 0;
  let nextId = 0;
  const timers = new Map<number, { at: number; callback: () => void }>();
  return {
    after: (ms: number, callback: () => void) => {
      nextId += 1;
      const id = nextId;
      timers.set(id, { at: now + ms, callback });
      return () => { timers.delete(id); };
    },
    advance: (ms: number) => {
      const until = now + ms;
      for (;;) {
        const due = [...timers.entries()].filter(([, timer]) => timer.at <= until).sort((a, b) => a[1].at - b[1].at)[0];
        if (!due) break;
        timers.delete(due[0]);
        now = due[1].at;
        due[1].callback();
      }
      now = until;
    },
  };
};

const at = (x: number, y = 10, extra: Partial<DwellPointer> = {}): DwellPointer => ({
  pointerType: 'mouse', clientX: x, clientY: y, buttons: 0, modifier: false, overNestedControl: false, ...extra,
});

const setup = (canShow = true) => {
  const clock = createClock();
  let open = false;
  let opens = 0;
  const dwell = createHoverCardDwell({
    after: clock.after,
    onOpen: () => {
      if (!canShow) return false;
      opens += 1;
      open = true;
      return true;
    },
    onClose: () => { open = false; },
  });
  return { clock, dwell, isOpen: () => open, opens: () => opens };
};

describe('hover card dwell', () => {
  test('opens only after the pointer rests for the dwell time', () => {
    const { clock, dwell, isOpen } = setup();
    dwell.enter(at(10));
    clock.advance(SESSION_HOVER_CARD_DWELL_MS - 1);
    expect(isOpen()).toBe(false);
    clock.advance(1);
    expect(isOpen()).toBe(true);
  });

  test('a pointer sweeping across rows never opens a card', () => {
    const rows = [setup(), setup(), setup(), setup()];
    let x = 0;
    for (const row of rows) {
      row.dwell.enter(at(x, 10));
      for (let step = 0; step < 6; step += 1) {
        x += 8;
        for (const other of rows) other.clock.advance(100);
        row.dwell.move(at(x, 10 + step * 3));
      }
      row.dwell.leave(false);
    }
    for (const row of rows) {
      row.clock.advance(5_000);
      expect(row.opens()).toBe(0);
    }
  });

  test('jitter within a few pixels still counts as resting; a real move restarts the wait', () => {
    const { clock, dwell, isOpen } = setup();
    dwell.enter(at(10));
    clock.advance(500);
    dwell.move(at(12, 11));
    clock.advance(300);
    expect(isOpen()).toBe(true);

    const second = setup();
    second.dwell.enter(at(10));
    second.clock.advance(500);
    second.dwell.move(at(40));
    second.clock.advance(300);
    expect(second.isOpen()).toBe(false);
    second.clock.advance(500);
    expect(second.isOpen()).toBe(true);
  });

  test('a press closes it at once and keeps it shut until the pointer leaves', () => {
    const { clock, dwell, isOpen } = setup();
    dwell.enter(at(10));
    clock.advance(SESSION_HOVER_CARD_DWELL_MS);
    expect(isOpen()).toBe(true);
    dwell.press();
    expect(isOpen()).toBe(false);
    dwell.move(at(60));
    clock.advance(5_000);
    expect(isOpen()).toBe(false);

    dwell.leave(false);
    dwell.enter(at(10, 40));
    clock.advance(SESSION_HOVER_CARD_DWELL_MS);
    expect(isOpen()).toBe(true);
  });

  test('a press during the wait cancels it (clicking or starting a drag)', () => {
    const { clock, dwell, opens } = setup();
    dwell.enter(at(10));
    clock.advance(300);
    dwell.press();
    dwell.move(at(30, 10, { buttons: 1 }));
    clock.advance(5_000);
    expect(opens()).toBe(0);
  });

  test('held modifiers or buttons, and resting on a mark with its own tooltip, do not open it', () => {
    for (const extra of [{ modifier: true }, { buttons: 1 }, { overNestedControl: true }]) {
      const { clock, dwell, opens } = setup();
      dwell.enter(at(10, 10, extra));
      clock.advance(5_000);
      expect(opens()).toBe(0);
    }
  });

  test('closes at once on leave, scroll or a key, and reopens only after a new rest', () => {
    for (const end of ['leave', 'interrupt'] as const) {
      const { clock, dwell, isOpen } = setup();
      dwell.enter(at(10));
      clock.advance(SESSION_HOVER_CARD_DWELL_MS);
      expect(isOpen()).toBe(true);
      if (end === 'leave') dwell.leave(false);
      else dwell.interrupt();
      expect(isOpen()).toBe(false);
      clock.advance(5_000);
      expect(isOpen()).toBe(false);
    }
  });

  test('touch never opens it', () => {
    const { clock, dwell, opens } = setup();
    dwell.enter(at(10, 10, { pointerType: 'touch' }));
    dwell.move(at(10, 10, { pointerType: 'touch' }));
    clock.advance(5_000);
    expect(opens()).toBe(0);
  });

  test('with no room beside the list it stays closed and tries again on the next rest', () => {
    const { clock, dwell, isOpen } = setup(false);
    dwell.enter(at(10));
    clock.advance(5_000);
    expect(isOpen()).toBe(false);
  });

  test('leaving toward the card gives the pointer time to reach it, and leaving the card closes it', () => {
    const { clock, dwell, isOpen } = setup();
    dwell.enter(at(10));
    clock.advance(SESSION_HOVER_CARD_DWELL_MS);
    dwell.leave(true);
    clock.advance(CARD_REACH_MS - 50);
    expect(isOpen()).toBe(true);
    dwell.cardEnter();
    clock.advance(5_000);
    expect(isOpen()).toBe(true);
    dwell.cardLeave(true);
    expect(isOpen()).toBe(true);
    dwell.cardLeave(false);
    expect(isOpen()).toBe(false);
  });

  test('leaving toward the card without reaching it closes it after the reach time', () => {
    const { clock, dwell, isOpen } = setup();
    dwell.enter(at(10));
    clock.advance(SESSION_HOVER_CARD_DWELL_MS);
    dwell.leave(true);
    clock.advance(CARD_REACH_MS);
    expect(isOpen()).toBe(false);
  });
});
