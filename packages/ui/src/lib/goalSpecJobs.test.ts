import { describe, expect, test } from 'bun:test';

import { goalSpecJobFailure } from './goalSpecJobs';

describe('goal spec job failure', () => {
  test('a job still being written or handed over has no failure', () => {
    expect(goalSpecJobFailure({ status: 'writing', cancelled: false, sendUncertain: false })).toBeNull();
    expect(goalSpecJobFailure({ status: 'enqueuing', cancelled: false, sendUncertain: false })).toBeNull();
  });

  test('a cancelled job, a certain failure and an uncertain release read apart', () => {
    expect(goalSpecJobFailure({ status: 'failed', cancelled: true, sendUncertain: false })).toBe('cancelled');
    expect(goalSpecJobFailure({ status: 'failed', cancelled: false, sendUncertain: false })).toBe('certain');
    expect(goalSpecJobFailure({ status: 'failed', cancelled: false, sendUncertain: true })).toBe('uncertain');
  });
});
