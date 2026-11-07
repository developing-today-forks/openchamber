import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readNotes } from './packages/web/server/lib/routing/plans.js';
import { createSpaceArchive } from './packages/web/server/lib/spaces/space-archive.js';

const mode = process.argv[2];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'oc-probe-'));

if (mode === 'notes-control') {
  const note = { id: 'note_x', at: '2026-01-01T00:00:00.000Z', kind: 'other', text: 'hello', source: 'ui' };
  fs.writeFileSync(path.join(tmp, 'plan-notes.jsonl'), JSON.stringify(note) + '\n');
  const r = readNotes({ limit: 20 }, tmp);
  console.log('CONTROL notes:', r.notes.length, 'skipped:', r.skipped, 'text:', r.notes[0]?.text);
} else if (mode === 'notes-oversize') {
  const big = 'x'.repeat(33 * 1024 * 1024);
  const note = { id: 'note_big', at: '2026-01-01T00:00:00.000Z', kind: 'other', text: big, source: 'ui' };
  const line = JSON.stringify(note);
  fs.writeFileSync(path.join(tmp, 'plan-notes.jsonl'), line + '\n');
  console.log('file bytes:', fs.statSync(path.join(tmp, 'plan-notes.jsonl')).size);
  const r = readNotes({ limit: 20 }, tmp);
  console.log('OVERSIZE notes:', r.notes.length, 'returned text length:', r.notes[0]?.text.length);
} else if (mode === 'notes-fifo') {
  const { execFileSync } = await import('node:child_process');
  execFileSync('mkfifo', [path.join(tmp, 'plan-notes.jsonl')]);
  console.log('FIFO planted; calling readNotes (sync)...');
  const r = readNotes({ limit: 20 }, tmp);
  console.log('FIFO returned (unexpected):', r.notes.length);
} else if (mode === 'archive-control') {
  const root = path.join(tmp, 'spaces', 'archive');
  fs.mkdirSync(root, { recursive: true });
  const entry = { version: 1, spaceId: 'abcdef012345', name: 's', projectDirectory: null, archivedAt: 1, chats: ['ses_abc'] };
  fs.writeFileSync(path.join(root, 'abcdef012345.json'), JSON.stringify(entry));
  const a = createSpaceArchive({ dataDir: tmp, hostOpenCode: {}, logger: { warn: () => {} } });
  console.log('CONTROL archive constructed ok:', typeof a);
} else if (mode === 'archive-oversize') {
  const root = path.join(tmp, 'spaces', 'archive');
  fs.mkdirSync(root, { recursive: true });
  const chats = [];
  for (let i = 0; i < 520000; i++) chats.push('ses_' + String(i).padStart(60, '0'));
  const entry = { version: 1, spaceId: 'abcdef012345', name: 's', projectDirectory: null, archivedAt: 1, chats };
  fs.writeFileSync(path.join(root, 'abcdef012345.json'), JSON.stringify(entry));
  console.log('file bytes:', fs.statSync(path.join(root, 'abcdef012345.json')).size, 'chats:', chats.length);
  const a = createSpaceArchive({ dataDir: tmp, hostOpenCode: {}, logger: { warn: () => {} } });
  console.log('OVERSIZE archive constructed ok:', typeof a);
} else if (mode === 'archive-fifo') {
  const root = path.join(tmp, 'spaces', 'archive');
  fs.mkdirSync(root, { recursive: true });
  const { execFileSync } = await import('node:child_process');
  execFileSync('mkfifo', [path.join(root, 'abcdef012345.json')]);
  console.log('FIFO planted; constructing archive (sync readEntries)...');
  const a = createSpaceArchive({ dataDir: tmp, hostOpenCode: {}, logger: { warn: () => {} } });
  console.log('FIFO returned (unexpected):', typeof a);
} else {
  console.log('unknown mode', mode);
  process.exit(2);
}
