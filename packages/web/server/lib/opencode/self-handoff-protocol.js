import { isSupportedOpenCodeVersion } from './compatibility.js';

export const HANDOFF_PROTOCOL = 2;
export const HANDOFF_PROTOCOL_RANGE = Object.freeze({ min: 2, max: 2 });
export const HANDOFF_STATE_VERSION_RANGE = Object.freeze({ min: 1, max: 1 });
export const HANDOFF_HELLO_MESSAGE = 'openchamber:handoff-hello';
export const HANDOFF_GO_MESSAGE = 'openchamber:handoff-go';
export const HANDOFF_ABORT_MESSAGE = 'openchamber:handoff-abort';

export const evaluateHandoffHello = (hello, { expectedVersion } = {}) => {
  if (!hello || typeof hello !== 'object' || hello.type !== HANDOFF_HELLO_MESSAGE) {
    return { ok: false, reason: 'invalid-hello' };
  }
  if (typeof hello.version !== 'string' || (expectedVersion && hello.version !== expectedVersion)) {
    return { ok: false, reason: 'version-mismatch' };
  }
  if (!Number.isSafeInteger(hello.handoffProtocol)
    || hello.handoffProtocol < HANDOFF_PROTOCOL_RANGE.min
    || hello.handoffProtocol > HANDOFF_PROTOCOL_RANGE.max) {
    return { ok: false, reason: 'protocol-incompatible' };
  }
  if (!Number.isSafeInteger(hello.stateVersion)
    || hello.stateVersion < HANDOFF_STATE_VERSION_RANGE.min
    || hello.stateVersion > HANDOFF_STATE_VERSION_RANGE.max) {
    return { ok: false, reason: 'state-version-incompatible' };
  }
  const opencode = hello.opencode;
  if (!opencode || !['adopt', 'handoff'].includes(opencode.decision)
    || !isSupportedOpenCodeVersion(opencode.version)) {
    return { ok: false, reason: 'opencode-incompatible' };
  }
  return { ok: true, opencodeDecision: opencode.decision, opencodeVersion: opencode.version };
};

const sendMessage = (process, message) => new Promise((resolve, reject) => {
  if (process.connected !== true || typeof process.send !== 'function') {
    reject(new Error('handoff probe requires a connected predecessor IPC channel'));
    return;
  }
  try {
    process.send(message, (error) => (error ? reject(error) : resolve()));
  } catch (error) {
    reject(error);
  }
});

/**
 * Run the successor's read-only preflight, then wait for explicit permission
 * before entering startup (which may begin accepting on inherited fd 3).
 */
export const runHandoffProbe = async ({
  process,
  preflight,
  startServer,
  timeoutMs = 30_000,
}) => {
  if (typeof preflight !== 'function' || typeof startServer !== 'function') {
    throw new TypeError('handoff probe requires preflight and startServer functions');
  }

  const result = await preflight();
  if (!result || typeof result !== 'object'
    || typeof result.version !== 'string'
    || result.handoffProtocol !== HANDOFF_PROTOCOL
    || !Number.isSafeInteger(result.stateVersion) || result.stateVersion < 1) {
    throw new Error('handoff preflight returned an invalid compatibility report');
  }

  await sendMessage(process, {
    ...result,
    type: HANDOFF_HELLO_MESSAGE,
  });

  const authorization = await new Promise((resolve, reject) => {
    let settled = false;
    const finish = (callback, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      process.off('message', onMessage);
      process.off('disconnect', onDisconnect);
      callback(value);
    };
    const onMessage = (message) => {
      if (message?.type === HANDOFF_GO_MESSAGE) {
        finish(resolve, true);
      } else if (message?.type === HANDOFF_ABORT_MESSAGE) {
        const error = new Error(typeof message.reason === 'string' ? message.reason : 'predecessor rejected handoff preflight');
        error.reason = typeof message.reason === 'string' ? message.reason : 'incompatible';
        finish(reject, error);
      }
    };
    const onDisconnect = () => {
      const error = new Error('predecessor IPC channel disconnected before handoff authorization');
      error.reason = 'disconnected';
      finish(reject, error);
    };
    const timer = setTimeout(() => {
      const error = new Error('timed out waiting for handoff authorization');
      error.reason = 'timeout';
      finish(reject, error);
    }, timeoutMs);
    process.on('message', onMessage);
    process.once('disconnect', onDisconnect);
  });

  if (!authorization) return;
  return startServer();
};
