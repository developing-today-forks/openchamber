import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterAll, describe, expect, it } from 'vitest';

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'goal-objectives-'));
process.env.OPENCHAMBER_DATA_DIR = dataDir;
const { goalObjectiveLimits, readObjective, writeObjective } = await import('./objectives.js');

afterAll(() => {
  fs.rmSync(dataDir, { recursive: true, force: true });
  delete process.env.OPENCHAMBER_DATA_DIR;
});

describe('goal objective limits', () => {
  it('reads both limits from Settings, and the defaults for missing or out-of-range values', () => {
    expect(goalObjectiveLimits({ sessionGoalObjectiveCharLimit: 12_000, sessionGoalCheckObjectiveCharLimit: 30_000 }))
      .toEqual({ objective: 12_000, check: 30_000 });
    expect(goalObjectiveLimits({ sessionGoalObjectiveCharLimit: 10, sessionGoalCheckObjectiveCharLimit: 'big' }))
      .toEqual({ objective: 5_000, check: 20_000 });
    expect(goalObjectiveLimits(null)).toEqual({ objective: 5_000, check: 20_000 });
  });

  // The goal's own limit is applied before the write; the file must keep a
  // goal whose limit was raised or switched off.
  it('stores and reads back an objective longer than the default limit', async () => {
    const long = 'x'.repeat(12_000);
    await expect(writeObjective('ses_long1', long)).resolves.toEqual({ content: long });
    await expect(readObjective('ses_long1')).resolves.toBe(long);
  });
});

describe('goal objective read bound (#1582)', () => {
  const goalsDir = path.join(dataDir, 'goals');
  const plant = (sessionId, content) => {
    fs.mkdirSync(goalsDir, { recursive: true });
    fs.writeFileSync(path.join(goalsDir, `${sessionId}.md`), content);
  };

  // The write path clamps before writing, so an over-cap file only arrives
  // out-of-band; the read must clamp it without buffering it whole.
  it('clamps an over-cap objective planted on disk to the hard cap', async () => {
    plant('ses_big1', 'y'.repeat(5_000_000));
    const read = await readObjective('ses_big1');
    expect(read).toBe('y'.repeat(1_000_000));
  });

  it('reads a goal at exactly the hard cap byte-identical', async () => {
    const atCap = 'z'.repeat(1_000_000);
    plant('ses_cap1', atCap);
    await expect(readObjective('ses_cap1')).resolves.toBe(atCap);
  });

  it('rejects a FIFO at the objective path promptly instead of blocking', async () => {
    fs.mkdirSync(goalsDir, { recursive: true });
    const fifoPath = path.join(goalsDir, 'ses_fifo1.md');
    execFileSync('mkfifo', [fifoPath]);
    const settled = await Promise.race([
      readObjective('ses_fifo1').then((value) => ({ value })),
      new Promise((resolve) => { setTimeout(() => resolve({ value: 'did-not-settle' }), 2_000); }),
    ]);
    expect(settled.value).toBeNull();
  });

  it('rejects a directory at the objective path as null', async () => {
    fs.mkdirSync(path.join(goalsDir, 'ses_dir1.md'), { recursive: true });
    await expect(readObjective('ses_dir1')).resolves.toBeNull();
  });
});
