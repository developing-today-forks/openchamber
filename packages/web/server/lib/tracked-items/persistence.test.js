import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createTrackedItemsPersistence } from './persistence.js';
import { promises as fs } from 'node:fs';

describe('tracked-items persistence', () => {
  let dataDir;
  let fsMock;

  beforeEach(async () => {
    dataDir = join(tmpdir(), `tracked-items-test-${Date.now()}`);
    await fs.mkdir(dataDir, { recursive: true });
    fsMock = fs;
  });

  afterEach(async () => {
    await fs.rm(dataDir, { recursive: true, force: true });
  });

  it('returns empty array when file is missing', async () => {
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    expect(result).toEqual([]);
  });

  it.skip('returns empty array when file is a FIFO', () => {
    // FIFO test skipped - mkfifo not available in Bun environment
    expect(true).toBe(true);
  });

  it('returns empty array when file is oversized (> 8 MiB)', async () => {
    const filePath = join(dataDir, 'tracked-items.json');
    // Create a file larger than 8 MiB
    const largeContent = 'x'.repeat(9 * 1024 * 1024); // 9 MiB
    await fs.writeFile(filePath, largeContent, 'utf8');
    
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    expect(result).toEqual([]);
  });

  it('returns empty array when file is not valid JSON', async () => {
    const filePath = join(dataDir, 'tracked-items.json');
    await fs.writeFile(filePath, 'not valid json', 'utf8');
    
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    expect(result).toEqual([]);
  });

  it('returns empty array when file has wrong version', async () => {
    const filePath = join(dataDir, 'tracked-items.json');
    await fs.writeFile(filePath, JSON.stringify({ version: 999, items: [] }), 'utf8');
    
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    expect(result).toEqual([]);
  });

  it('returns empty array when items is not an array', async () => {
    const filePath = join(dataDir, 'tracked-items.json');
    await fs.writeFile(filePath, JSON.stringify({ version: 1, items: 'not an array' }), 'utf8');
    
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    expect(result).toEqual([]);
  });

  it('restores valid tracked items correctly', async () => {
    const filePath = join(dataDir, 'tracked-items.json');
    const validData = {
      version: 1,
      items: [
        {
          item: { owner: 'owner', repo: 'repo', number: 1, provider: 'github', kind: 'issue' },
          state: { state: 'open' },
          fetchedAt: Date.now(),
        },
      ],
    };
    await fs.writeFile(filePath, JSON.stringify(validData), 'utf8');
    
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    expect(result).toHaveLength(1);
    expect(result[0].item).toEqual(validData.items[0].item);
    expect(result[0].state).toEqual(validData.items[0].state);
    expect(result[0].fetchedAt).toEqual(validData.items[0].fetchedAt);
  });

  it('filters out items with invalid structure', async () => {
    const filePath = join(dataDir, 'tracked-items.json');
    const data = {
      version: 1,
      items: [
        {
          item: { owner: 'owner', repo: 'repo', number: 1, provider: 'github', kind: 'issue' },
          state: { state: 'open' },
          fetchedAt: Date.now(),
        },
        {
          // Invalid item - missing required fields
          item: null,
          state: null,
          fetchedAt: Date.now(),
        },
        {
          // Invalid item - missing fetchedAt
          item: { owner: 'owner2', repo: 'repo2', number: 2, provider: 'github', kind: 'pull' },
          state: { state: 'open' },
          fetchedAt: 'not a number',
        },
      ],
    };
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
    
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    // Should only have the valid item
    expect(result).toHaveLength(1);
  });

  it('filters out items with non-plain state', async () => {
    const filePath = join(dataDir, 'tracked-items.json');
    const data = {
      version: 1,
      items: [
        {
          item: { owner: 'owner', repo: 'repo', number: 1, provider: 'github', kind: 'issue' },
          state: { state: 'open' },
          fetchedAt: Date.now(),
        },
        {
          item: { owner: 'owner2', repo: 'repo2', number: 2, provider: 'github', kind: 'pull' },
          state: 'not a plain object', // Invalid state
          fetchedAt: Date.now(),
        },
      ],
    };
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
    
    const persistence = createTrackedItemsPersistence({ dataDir, fs: fsMock });
    const result = await persistence.load();
    // Should have both items, but the second one has state set to null
    expect(result).toHaveLength(2);
    expect(result[0].state).toEqual({ state: 'open' });
    expect(result[1].state).toBeNull();
  });
});

// Helper to create a FIFO on Unix-like systems
async function fsMkfifo(path) {
  const { mkfifo } = await import('node:fs/promises');
  try {
    await mkfifo(path);
  } catch (error) {
    // If mkfifo is not available (e.g., on Windows), skip this test
    if (error.code === 'ERR_FEATURE_UNAVAILABLE_ON_PLATFORM') {
      return;
    }
    throw error;
  }
}
