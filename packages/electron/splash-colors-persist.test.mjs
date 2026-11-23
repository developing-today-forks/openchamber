import assert from 'node:assert/strict';
import test from 'node:test';

import { persistSplashColors } from './splash-colors-persist.mjs';

const flush = () => new Promise((resolve) => setImmediate(resolve));

const trackUnhandledRejections = () => {
  const seen = [];
  const onUnhandled = (reason) => { seen.push(reason); };
  process.on('unhandledRejection', onUnhandled);
  return {
    seen,
    stop: () => process.off('unhandledRejection', onUnhandled),
  };
};

const colors = { bgLight: '#ffffff', fgLight: '#111111', bgDark: '#000000', fgDark: '#eeeeee' };

test('reports a rejected splash-colors settings write instead of leaving it unhandled', async () => {
  const failure = new Error('EACCES: permission denied, rename settings.json');
  const reported = [];
  const mutators = [];
  const unhandled = trackUnhandledRejections();
  try {
    persistSplashColors({
      mutateSettingsRoot: (mutator) => {
        mutators.push(mutator);
        return Promise.reject(failure);
      },
      colors,
      reportFailure: (error) => reported.push(error),
    });
    await flush();
    await flush();
    assert.equal(mutators.length, 1);
    assert.deepEqual(
      mutators[0]({ desktopSplashColors: null, other: 1 }),
      { desktopSplashColors: colors, other: 1 },
    );
    assert.deepEqual(reported, [failure]);
    assert.deepEqual(unhandled.seen, []);
  } finally {
    unhandled.stop();
  }
});

test('reports nothing when the splash-colors settings write succeeds', async () => {
  const reported = [];
  const mutation = Promise.resolve();
  const returned = persistSplashColors({
    mutateSettingsRoot: () => mutation,
    colors,
    reportFailure: (error) => reported.push(error),
  });
  assert.equal(returned, mutation);
  await flush();
  assert.deepEqual(reported, []);
});

test('a throwing reporter does not turn the failure back into an unhandled rejection', async () => {
  const failure = new Error('ENOSPC: no space left on device');
  const unhandled = trackUnhandledRejections();
  try {
    persistSplashColors({
      mutateSettingsRoot: () => Promise.reject(failure),
      colors,
      reportFailure: () => { throw new Error('logger unavailable'); },
    });
    await flush();
    await flush();
    assert.deepEqual(unhandled.seen, []);
  } finally {
    unhandled.stop();
  }
});
