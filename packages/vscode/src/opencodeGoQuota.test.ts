import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fetchOpenCodeGoUsage } from './opencodeGoQuota';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

const streamedResponse = (chunkText: string, repeats: number) => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (let i = 0; i < repeats; i += 1) controller.enqueue(encoder.encode(chunkText));
      controller.close();
    },
  });
  return new Response(stream, { headers: { 'Content-Type': 'application/json' } });
};

describe('OpenCode Go quota', () => {
  it('parses an in-cap usage response', async () => {
    globalThis.fetch = async () =>
      Response.json({ usage: { rolling: { percent: 25, resetsAt: 1_893_456_000_000 } } });
    const usage = await fetchOpenCodeGoUsage({ apiKey: 'test-key', consoleKey: false });
    assert.equal(usage.windows['5h']?.usedPercent, 25);
  });

  it('fails an over-cap streamed usage response instead of parsing it whole', async () => {
    // 20 x 64 KiB = 1.25 MiB streamed with no content-length, over the 1 MiB quota cap.
    globalThis.fetch = async () => streamedResponse('x'.repeat(64 * 1024), 20);
    await assert.rejects(
      fetchOpenCodeGoUsage({ apiKey: 'test-key', consoleKey: false }),
      /could not be parsed/,
    );
  });
});
