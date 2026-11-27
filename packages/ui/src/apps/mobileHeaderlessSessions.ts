import { useMemo } from 'react';

import { updateDesktopSettings } from '@/lib/persistence';
import type { Session } from '@/lib/opencode/model';
import type { SidebarAttentionZoneKey, SidebarSectionKey } from '@/stores/sidebarLayout';
import type { TimelineEntry } from './MobileTimelineList';
import { dedupeHeaderlessGroups } from './mobileSessionsSheetSections';
import { getParentId } from './mobileSessionFields';

export const MOBILE_VIEW_MODE_OPTIONS = [
  ['projects', 'mobile.sessions.viewMode.projects'],
  ['timeline', 'mobile.sessions.viewMode.timeline'],
  ['headerless', 'sessions.sidebar.header.viewMode.headerless'],
] as const;

export type MobileSidebarViewMode = (typeof MOBILE_VIEW_MODE_OPTIONS)[number][0];

export const applyMobileSidebarViewMode = (
  mode: MobileSidebarViewMode,
  headerlessSidebar: boolean,
  setSidebarViewMode: (mode: 'projects' | 'timeline') => void,
  setHeaderlessSidebar: (enabled: boolean) => void,
  setEditingOrder: (editing: boolean) => void,
): void => {
  if (mode === 'headerless') {
    setHeaderlessSidebar(true);
    void updateDesktopSettings({ sidebarHeaderless: true });
    setEditingOrder(false);
    return;
  }
  if (headerlessSidebar) {
    setHeaderlessSidebar(false);
    void updateDesktopSettings({ sidebarHeaderless: false });
  }
  setSidebarViewMode(mode);
  void updateDesktopSettings({ sidebarViewMode: mode });
  if (mode === 'timeline') setEditingOrder(false);
};

export type HeaderlessListItem =
  | { kind: 'timeline'; key: string; entry: TimelineEntry; sessionIds: readonly string[] }
  | { kind: 'chat'; key: string; session: Session; sessionIds: readonly string[] };

export type HeaderlessListGroup = { key: string; items: HeaderlessListItem[] };

export type HeaderlessProjectGroup =
  | { kind: 'chats' }
  | { kind: 'project'; key: string; entries: readonly TimelineEntry[] };

type HeaderlessProjectNode = {
  project: { id: string };
  buckets: readonly { sessions: readonly Session[] }[];
};

export const buildMobileHeaderlessProjectGroups = (args: {
  viewMode: 'projects' | 'timeline';
  timeListActive: boolean;
  timeListEntries: readonly TimelineEntry[];
  combinedListActive: boolean;
  combinedTimelineEntries: readonly TimelineEntry[];
  chatsInListProjects: boolean;
  projectNodes: readonly (HeaderlessProjectNode | 'chats')[];
  timelineEntriesByProject: ReadonlyMap<string, readonly TimelineEntry[]>;
  toTimelineEntries: (sessions: readonly Session[]) => TimelineEntry[];
}): HeaderlessProjectGroup[] => {
  if (args.timeListActive) return [{ kind: 'project', key: 'time-list', entries: args.timeListEntries }];
  if (args.combinedListActive) return [
    { kind: 'project', key: 'combined-list', entries: args.combinedTimelineEntries },
    ...(args.chatsInListProjects ? [{ kind: 'chats' as const }] : []),
  ];
  return args.projectNodes.map((item) => item === 'chats'
    ? { kind: 'chats' }
    : {
      kind: 'project',
      key: item.project.id,
      entries: args.viewMode === 'timeline'
        ? args.timelineEntriesByProject.get(item.project.id) ?? []
        : item.buckets.flatMap((bucket) => args.toTimelineEntries(bucket.sessions.filter((session) => !getParentId(session)))),
    });
};

export const buildMobileHeaderlessGroups = (args: {
  sections: readonly SidebarSectionKey[];
  chats: readonly Session[];
  pinnedEntries: readonly TimelineEntry[];
  workEntries: readonly TimelineEntry[];
  attentionEntries: ReadonlyMap<SidebarAttentionZoneKey, readonly TimelineEntry[]>;
  projectGroups: readonly HeaderlessProjectGroup[];
}): HeaderlessListGroup[] => {
  const timelineItems = (entries: readonly TimelineEntry[]): HeaderlessListItem[] => entries.map((entry) => ({
    kind: 'timeline',
    key: entry.kind === 'run' ? `run:${entry.run.key}` : `session:${entry.session.id}`,
    entry,
    sessionIds: entry.kind === 'run' ? entry.run.memberIds : [entry.session.id],
  }));
  const chatItems = (): HeaderlessListItem[] => args.chats
    .map((session) => ({ kind: 'chat', key: `chat:${session.id}`, session, sessionIds: [session.id] }));
  const groups: HeaderlessListGroup[] = [];
  for (const section of args.sections) {
    let items: HeaderlessListItem[] = [];
    if (section === 'chats') {
      items = chatItems();
    } else if (section === 'pinned') {
      items = timelineItems(args.pinnedEntries);
    } else if (section === 'work') {
      items = timelineItems(args.workEntries);
    } else if (section === 'projects') {
      for (const projectGroup of args.projectGroups) {
        items.push(...(projectGroup.kind === 'chats' ? chatItems() : timelineItems(projectGroup.entries)));
      }
    } else {
      items = timelineItems(args.attentionEntries.get(section) ?? []);
    }
    if (items.length > 0) groups.push({ key: section, items });
  }
  return dedupeHeaderlessGroups(groups);
};

export const useMobileHeaderlessGroups = (args: {
  enabled: boolean;
  sections: readonly SidebarSectionKey[];
  chats: readonly Session[];
  pinnedEntries: readonly TimelineEntry[];
  workEntries: readonly TimelineEntry[];
  attentionEntries: ReadonlyMap<SidebarAttentionZoneKey, readonly TimelineEntry[]>;
  viewMode: 'projects' | 'timeline';
  timeListActive: boolean;
  timeListEntries: readonly TimelineEntry[];
  combinedListActive: boolean;
  combinedTimelineEntries: readonly TimelineEntry[];
  chatsInListProjects: boolean;
  projectNodes: readonly (HeaderlessProjectNode | 'chats')[];
  timelineEntriesByProject: ReadonlyMap<string, readonly TimelineEntry[]>;
  toTimelineEntries: (sessions: readonly Session[]) => TimelineEntry[];
}): HeaderlessListGroup[] => {
  const {
    enabled,
    sections,
    chats,
    pinnedEntries,
    workEntries,
    attentionEntries,
    viewMode,
    timeListActive,
    timeListEntries,
    combinedListActive,
    combinedTimelineEntries,
    chatsInListProjects,
    projectNodes,
    timelineEntriesByProject,
    toTimelineEntries,
  } = args;
  return useMemo(() => {
    if (!enabled) return [];
    const projectGroups = buildMobileHeaderlessProjectGroups({
      viewMode,
      timeListActive,
      timeListEntries,
      combinedListActive,
      combinedTimelineEntries,
      chatsInListProjects,
      projectNodes,
      timelineEntriesByProject,
      toTimelineEntries,
    });
    return buildMobileHeaderlessGroups({ sections, chats, pinnedEntries, workEntries, attentionEntries, projectGroups });
  }, [
    attentionEntries,
    chats,
    chatsInListProjects,
    combinedListActive,
    combinedTimelineEntries,
    enabled,
    pinnedEntries,
    projectNodes,
    sections,
    timeListActive,
    timeListEntries,
    timelineEntriesByProject,
    toTimelineEntries,
    viewMode,
    workEntries,
  ]);
};
