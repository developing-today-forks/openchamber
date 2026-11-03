import { describe, expect, mock, test } from 'bun:test';

let getImpl: (() => Promise<Response>) | null = null;

mock.module('@/lib/runtime-fetch', () => ({
  runtimeFetch: mock(async () => {
    if (getImpl) return getImpl();
    throw new Error('unexpected fetch in goalObjectiveFiles test');
  }),
}));

const { fetchGoalObjectiveContent, fetchGoalObjectiveSnapshot } = await import('./goalObjectiveFiles');

const jsonResponse = (status: number, body: string) => new Response(body, {
  status,
  headers: { 'Content-Type': 'application/json' },
});

describe('goal objective snapshot', () => {
  test('a readable file answers its content', async () => {
    getImpl = async () => jsonResponse(200, JSON.stringify({ content: 'Objective text' }));
    expect(await fetchGoalObjectiveSnapshot('session-1')).toEqual({ kind: 'content', content: 'Objective text' });
    expect(await fetchGoalObjectiveContent('session-1')).toBe('Objective text');
  });

  test('a 404 answers missing, the only confirmed-absence answer', async () => {
    getImpl = async () => jsonResponse(404, JSON.stringify({ error: 'objective not found' }));
    expect(await fetchGoalObjectiveSnapshot('session-1')).toEqual({ kind: 'missing' });
    expect(await fetchGoalObjectiveContent('session-1')).toBeNull();
  });

  test('a server error answers unavailable, never missing', async () => {
    getImpl = async () => jsonResponse(500, JSON.stringify({ error: 'boom' }));
    expect(await fetchGoalObjectiveSnapshot('session-1')).toEqual({ kind: 'unavailable' });
  });

  test('a network failure answers unavailable, never missing', async () => {
    getImpl = async () => {
      throw new Error('connection reset');
    };
    expect(await fetchGoalObjectiveSnapshot('session-1')).toEqual({ kind: 'unavailable' });
  });

  test('a malformed payload answers unavailable, never missing', async () => {
    getImpl = async () => jsonResponse(200, JSON.stringify({ nope: true }));
    expect(await fetchGoalObjectiveSnapshot('session-1')).toEqual({ kind: 'unavailable' });
  });
});
