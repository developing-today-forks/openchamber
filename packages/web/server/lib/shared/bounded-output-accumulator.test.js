import { describe, expect, it } from 'vitest';

import { createBoundedOutputAccumulator } from './bounded-output-accumulator.js';

describe('createBoundedOutputAccumulator', () => {
  it('returns complete lines only, holding a trailing partial line', () => {
    const acc = createBoundedOutputAccumulator();
    expect(acc.push('first\nsec').lines).toEqual(['first']);
    expect(acc.push('ond\nthird\n').lines).toEqual(['second', 'third']);
  });

  it('decodes a multi-byte character split across chunks whole', () => {
    const acc = createBoundedOutputAccumulator();
    const bytes = Buffer.from('caf\u00e9\n', 'utf8');
    const splitAt = bytes.length - 2; // inside the two-byte \u00e9
    const first = acc.push(bytes.subarray(0, splitAt));
    expect(first.decoded).toBe('caf');
    const second = acc.push(bytes.subarray(splitAt));
    expect(second.decoded).toBe('\u00e9\n');
    expect(second.lines).toEqual(['caf\u00e9']);
  });

  it('keeps a bounded rolling recentText of the newest tail', () => {
    const acc = createBoundedOutputAccumulator({ maxChars: 8 });
    expect(acc.push('0123456789').recentText).toBe('23456789');
    expect(acc.push('ab').recentText).toBe('456789ab');
  });

  it('bounds a held partial line to its newest tail over the cap', () => {
    const acc = createBoundedOutputAccumulator({ maxChars: 8 });
    acc.push('0123456789');
    expect(acc.flush()).toEqual(['23456789']);
  });

  it('flush releases the final unterminated line and is idempotent', () => {
    const acc = createBoundedOutputAccumulator();
    acc.push('done\nfinal line');
    expect(acc.flush()).toEqual(['final line']);
    expect(acc.flush()).toEqual([]);
  });

  it('flush on an untouched accumulator returns no lines', () => {
    expect(createBoundedOutputAccumulator().flush()).toEqual([]);
  });

  it('accepts string chunks as well as buffers', () => {
    const acc = createBoundedOutputAccumulator();
    expect(acc.push('a\n').lines).toEqual(['a']);
    expect(acc.push(Buffer.from('b\n')).lines).toEqual(['b']);
  });
});
