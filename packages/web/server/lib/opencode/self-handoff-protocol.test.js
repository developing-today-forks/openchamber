import { EventEmitter } from 'node:events';
import { describe, expect, it } from 'vitest';
import { runHandoffProbe } from './self-handoff-protocol.js';

const createProcess = () => {
  const process = new EventEmitter();
  process.connected = true;
  process.sent = [];
  process.send = (message, callback) => {
    process.sent.push(message);
    callback?.(null);
  };
  return process;
};

describe('protocol-2 self-handoff probe', () => {
  it('does not start the server until the predecessor authorizes the preflight result', async () => {
    const process = createProcess();
    const started = [];
    const probe = runHandoffProbe({
      process,
      preflight: async () => ({ version: '2.5.0', handoffProtocol: 2, stateVersion: 1 }),
      startServer: async () => started.push('listening'),
      timeoutMs: 1000,
    });

    await new Promise((resolve) => setImmediate(resolve));
    expect(process.sent).toEqual([{
      type: 'openchamber:handoff-hello',
      version: '2.5.0',
      handoffProtocol: 2,
      stateVersion: 1,
    }]);
    expect(started).toEqual([]);

    process.emit('message', { type: 'openchamber:handoff-go' });
    await probe;
    expect(started).toEqual(['listening']);
  });

  it('does not start the server when the predecessor aborts', async () => {
    const process = createProcess();
    const started = [];
    const probe = runHandoffProbe({
      process,
      preflight: async () => ({ version: '2.5.0', handoffProtocol: 2, stateVersion: 1 }),
      startServer: async () => started.push('listening'),
      timeoutMs: 1000,
    });

    await new Promise((resolve) => setImmediate(resolve));
    process.emit('message', { type: 'openchamber:handoff-abort', reason: 'incompatible' });
    await expect(probe).rejects.toMatchObject({ reason: 'incompatible' });
    expect(started).toEqual([]);
  });

  it('does not start the server if its non-mutating preflight fails', async () => {
    const process = createProcess();
    const started = [];
    await expect(runHandoffProbe({
      process,
      preflight: async () => { throw new Error('state version is unreadable'); },
      startServer: async () => started.push('listening'),
      timeoutMs: 1000,
    })).rejects.toThrow('state version is unreadable');
    expect(process.sent).toEqual([]);
    expect(started).toEqual([]);
  });
});
