import assert from 'node:assert/strict';
import test from 'node:test';

import { startInitialNavigation } from './initial-navigation.mjs';

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

test('reports a rejected initial navigation instead of leaving it unhandled', async () => {
  const failure = new Error('ERR_FAILED (-2) loading https://host/');
  const reported = [];
  const calls = [];
  const unhandled = trackUnhandledRejections();
  try {
    startInitialNavigation({
      navigate: async (browserWindow, url, options) => {
        calls.push([browserWindow, url, options]);
        throw failure;
      },
      browserWindow: { __ocLabel: 'main' },
      url: 'https://host/',
      reportFailure: (error) => reported.push(error),
    });
    await flush();
    await flush();
    assert.deepEqual(calls, [[{ __ocLabel: 'main' }, 'https://host/', { allowAbort: false }]]);
    assert.deepEqual(reported, [failure]);
    assert.deepEqual(unhandled.seen, []);
  } finally {
    unhandled.stop();
  }
});

test('reports a rejected splash navigation and forwards allowAbort', async () => {
  const failure = new Error('ERR_ABORTED (-3) loading splash');
  const reported = [];
  const calls = [];
  const unhandled = trackUnhandledRejections();
  try {
    startInitialNavigation({
      navigate: async (browserWindow, url, options) => {
        calls.push([browserWindow, url, options]);
        throw failure;
      },
      browserWindow: { __ocLabel: 'main' },
      url: 'splash://startup',
      allowAbort: true,
      reportFailure: (error) => reported.push(error),
    });
    await flush();
    await flush();
    assert.deepEqual(calls, [[{ __ocLabel: 'main' }, 'splash://startup', { allowAbort: true }]]);
    assert.deepEqual(reported, [failure]);
    assert.deepEqual(unhandled.seen, []);
  } finally {
    unhandled.stop();
  }
});

test('reports nothing when the initial navigation succeeds', async () => {
  const reported = [];
  const navigation = Promise.resolve();
  const returned = startInitialNavigation({
    navigate: () => navigation,
    browserWindow: {},
    url: 'https://host/',
    reportFailure: (error) => reported.push(error),
  });
  assert.equal(returned, navigation);
  await flush();
  assert.deepEqual(reported, []);
});

test('a throwing reporter does not turn the failure back into an unhandled rejection', async () => {
  const failure = new Error('load failed');
  const unhandled = trackUnhandledRejections();
  try {
    startInitialNavigation({
      navigate: async () => { throw failure; },
      browserWindow: {},
      url: 'https://host/',
      reportFailure: () => { throw new Error('logger unavailable'); },
    });
    await flush();
    await flush();
    assert.deepEqual(unhandled.seen, []);
  } finally {
    unhandled.stop();
  }
});
