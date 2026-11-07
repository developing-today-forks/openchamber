import { describe, expect, test } from 'bun:test'
import { loadSessionTitleTurns } from '@/sync/session-title-context'

// Fake loader in the shape sessionTitle.test.ts uses: every loadOlder
// returns a brand-new cursor, never complete, and records never yield turns.
describe('probe: ever-new cursor', () => {
  test('loadSessionTitleTurns has no page cap', async () => {
    const STOP_AFTER = 20000
    let calls = 0
    let cursor: string | undefined = 'cursor-0'
    const loader = {
      ensure: async () => {},
      loadOlder: async () => {
        calls += 1
        cursor = calls >= STOP_AFTER ? undefined : `cursor-${calls}`
        // at STOP_AFTER, dropping the cursor is the probe ending the walk:
        // the function then throws 'made no progress' on !cursor? actually
        // !state.cursor throws no-progress; either way the walk only ends here.
      },
      getSnapshot: () => ({
        status: 'ready', loadingKind: null, error: null, resolved: true,
        limit: 50, cursor, complete: false, generation: 0, updatedAt: 1,
      }),
    } as never
    const started = Date.now()
    let error: unknown = null
    try {
      await loadSessionTitleTurns({
        loader, target: { sessionID: 'session', directory: '/project' },
        getRecords: () => [], signal: new AbortController().signal,
      } as never)
    } catch (e) { error = e }
    const elapsedMs = Date.now() - started
    console.log(`PROBE loadOlderCalls=${calls} elapsedMs=${elapsedMs} rssMB=${(process.memoryUsage().rss / 1048576).toFixed(1)} endError=${error instanceof Error ? error.message : String(error)}`)
    expect(calls).toBe(STOP_AFTER)
  }, 60_000)
})
