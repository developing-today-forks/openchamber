import { describe, expect, test } from 'bun:test';

import type { Session } from '@/lib/opencode/model';
import { DEFAULT_SIDEBAR_LAYOUT } from '@/stores/sidebarLayout';

import {
  excludeRoots,
  expandZoneSessions,
  insertChatsGroupIndex,
  isSessionVisibleInProjectScope,
  phoneSectionsInUse,
} from './mobileSessionsSheetSections';

// SAFETY: the helpers under test read only id, directory, title and time;
// the rest of the Session shape is irrelevant here.
const session = (id: string): Session => ({ id, directory: '/repo', title: id, time: { created: 1, updated: 1 } } as Session);

describe('phoneSectionsInUse', () => {
  test('follows the layout order and drops sections that are not in use', () => {
    const sections = phoneSectionsInUse(
      { ...DEFAULT_SIDEBAR_LAYOUT, attention: 'combined' },
      { showChatsSection: true, showPinnedSection: false, showWorkSection: true, chatsInListProjects: false },
    );
    expect(sections).toEqual(['attention', 'work', 'chats', 'projects']);
  });

  test('chats give way to the projects while they join the timeline list', () => {
    const sections = phoneSectionsInUse(
      DEFAULT_SIDEBAR_LAYOUT,
      { showChatsSection: true, showPinnedSection: false, showWorkSection: true, chatsInListProjects: true },
    );
    expect(sections).not.toContain('chats');
    expect(sections).toContain('projects');
  });
});

describe('expandZoneSessions', () => {
  test('lists each zone root with its whole subtree once', () => {
    const sessions = [session('a'), session('b'), session('c')];
    const expanded = expandZoneSessions(sessions, new Set(['a', 'c']), (id) => (id === 'a' ? ['b'] : []));
    expect(expanded.map((entry) => entry.id)).toEqual(['a', 'b', 'c']);
  });

  test('returns nothing for an empty zone', () => {
    expect(expandZoneSessions([session('a')], new Set(), () => [])).toEqual([]);
  });
});

describe('project visibility', () => {
  const sessions = [session('work-hidden'), session('all-hidden'), session('visible'), session('unowned')];
  const ownerBySessionId = new Map([
    ['work-hidden', { projectId: 'hidden-from-work' }],
    ['all-hidden', { projectId: 'hidden-from-all' }],
    ['visible', { projectId: 'visible' }],
  ]);

  test('hiddenFromWork removes owned sessions from In work only', () => {
    const visible = sessions.filter((entry) => isSessionVisibleInProjectScope(
      entry,
      ownerBySessionId,
      new Set(['hidden-from-work']),
      new Set(),
    ));
    expect(visible.map((entry) => entry.id)).toEqual(['all-hidden', 'visible', 'unowned']);
  });

  test('hiddenFromAllSessions removes owned sessions from the List only', () => {
    const visible = sessions.filter((entry) => isSessionVisibleInProjectScope(
      entry,
      ownerBySessionId,
      new Set(),
      new Set(['hidden-from-all']),
    ));
    expect(visible.map((entry) => entry.id)).toEqual(['work-hidden', 'visible', 'unowned']);
  });

  test('both flags together removes owned sessions from all views', () => {
    const visible = sessions.filter((entry) => isSessionVisibleInProjectScope(
      entry,
      ownerBySessionId,
      new Set(['hidden-from-work']),
      new Set(['hidden-from-all']),
    ));
    expect(visible.map((entry) => entry.id)).toEqual(['visible', 'unowned']);
  });
});

describe('timeline exclusions', () => {
  test('excludeRoots drops only the excluded roots in order', () => {
    const roots = [session('a'), session('b'), session('c')];
    expect(excludeRoots(roots, new Set(['b'])).map((entry) => entry.id)).toEqual(['a', 'c']);
    expect(excludeRoots(roots, new Set()).map((entry) => entry.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('insertChatsGroupIndex', () => {
  test('places chats among the projects and clamps to the end', () => {
    expect(insertChatsGroupIndex(['p1', 'p2'], 'chats', 1)).toEqual(['p1', 'chats', 'p2']);
    expect(insertChatsGroupIndex(['p1'], 'chats', 10)).toEqual(['p1', 'chats']);
    expect(insertChatsGroupIndex(['p1', 'chats', 'p2'], 'chats', 0)).toEqual(['chats', 'p1', 'p2']);
  });
});
