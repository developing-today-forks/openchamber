import React from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';

import { Icon } from '@/components/icon/Icon';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useI18n, type I18nKey } from '@/lib/i18n';
import { updateDesktopSettings } from '@/lib/persistence';
import type { Session } from '@/lib/opencode/model';
import type { SidebarAttentionZoneKey, SidebarSectionKey } from '@/stores/sidebarLayout';
import { MobileTimelineRows, type TimelineEntry, type TimelineRowHandlers } from './MobileTimelineList';
import { getParentId } from './mobileSessionFields';
import { dedupeHeaderlessGroups } from './mobileSessionsSheetSections';

type HeaderlessListItem =
  | { kind: 'timeline'; key: string; entry: TimelineEntry; sessionIds: readonly string[] }
  | { kind: 'chat'; key: string; session: Session; sessionIds: readonly string[] };

type HeaderlessListGroup = { key: string; items: HeaderlessListItem[] };

type HeaderlessProjectGroup =
  | { kind: 'chats' }
  | { kind: 'project'; key: string; entries: readonly TimelineEntry[] };

type HeaderlessProjectNode = {
  project: { id: string };
  buckets: readonly { sessions: readonly Session[] }[];
};

const VIEW_MODE_OPTIONS = [
  ['projects', 'mobile.sessions.viewMode.projects'],
  ['timeline', 'mobile.sessions.viewMode.timeline'],
] as const;

const buildProjectGroups = (args: {
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

const buildHeaderlessGroups = (args: {
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

export const MobileHeaderlessList: React.FC<{
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
  handlers: TimelineRowHandlers;
  renderChat: (session: Session) => React.ReactNode;
}> = ({
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
  handlers,
  renderChat,
}) => {
  const [visibleCount, setVisibleCount] = React.useState(20);
  const groups = React.useMemo(() => buildHeaderlessGroups({
    sections,
    chats,
    pinnedEntries,
    workEntries,
    attentionEntries,
    projectGroups: buildProjectGroups({
      viewMode,
      timeListActive,
      timeListEntries,
      combinedListActive,
      combinedTimelineEntries,
      chatsInListProjects,
      projectNodes,
      timelineEntriesByProject,
      toTimelineEntries,
    }),
  }), [
    attentionEntries,
    chats,
    chatsInListProjects,
    combinedListActive,
    combinedTimelineEntries,
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
  let remaining = visibleCount;
  let hasVisibleGroup = false;
  const renderedGroups = groups.map((group) => {
    const visibleItems = group.items.slice(0, remaining);
    remaining -= visibleItems.length;
    if (visibleItems.length === 0) return null;
    const divider = hasVisibleGroup
      ? <div aria-hidden="true" className="mx-3 border-t border-border/70" />
      : null;
    hasVisibleGroup = true;
    return (
      <React.Fragment key={group.key}>
        {divider}
        {visibleItems.map((item) => item.kind === 'timeline' ? (
          <MobileTimelineRows key={item.key} entries={[item.entry]} showProject handlers={handlers} />
        ) : (
          <React.Fragment key={item.key}>
            <div className="flex min-w-0 items-center">
              <span aria-hidden="true" className="flex w-7 shrink-0 items-center justify-center text-muted-foreground">
                <Icon name="chat-4" className="size-3.5" />
              </span>
              <div className="min-w-0 flex-1">{renderChat(item.session)}</div>
            </div>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  });
  const total = groups.reduce((count, group) => count + group.items.length, 0);
  return (
    <div className="flex flex-col">
      {renderedGroups}
      {visibleCount < total ? (
        <ShowMoreRow indent={0} onClick={() => setVisibleCount((count) => count + 20)} />
      ) : null}
    </div>
  );
};

export const MobileViewModeMenu: React.FC<{
  viewMode: 'projects' | 'timeline';
  headerless: boolean;
  setViewMode: (mode: 'projects' | 'timeline') => void;
  setHeaderless: (value: boolean) => void;
  setEditingOrder: (value: boolean) => void;
}> = ({ viewMode, headerless, setViewMode, setHeaderless, setEditingOrder }) => {
  const { t } = useI18n();
  const renderChoice = (mode: 'projects' | 'timeline', labelKey: I18nKey) => (
    <DropdownMenuItem
      key={mode}
      onClick={() => {
        if (headerless) {
          setHeaderless(false);
          void updateDesktopSettings({ sidebarHeaderless: false });
        }
        setViewMode(mode);
        void updateDesktopSettings({ sidebarViewMode: mode });
        if (mode === 'timeline') setEditingOrder(false);
      }}
      className="min-h-10 items-center justify-between"
    >
      <span>{t(labelKey)}</span>
      {!headerless && viewMode === mode ? <Icon name="check" className="size-4 text-primary" /> : null}
    </DropdownMenuItem>
  );
  return (
    <>
      {VIEW_MODE_OPTIONS.map(([mode, labelKey]) => renderChoice(mode, labelKey))}
      <DropdownMenuItem
        onClick={() => {
          const next = !headerless;
          setHeaderless(next);
          void updateDesktopSettings({ sidebarHeaderless: next });
          if (next) setEditingOrder(false);
        }}
        className="min-h-10 items-center justify-between"
      >
        <span>{t('sessions.sidebar.header.viewMode.headerless')}</span>
        {headerless ? <Icon name="check" className="size-4 text-primary" /> : null}
      </DropdownMenuItem>
    </>
  );
};

export const ShowMoreRow: React.FC<{ indent: number; onClick: () => void }> = ({ indent, onClick }) => {
  const { t } = useI18n();
  return (
    <button type="button" className="flex min-h-9 w-full items-center gap-2 py-1 pe-3 text-start text-muted-foreground transition-colors hover:bg-interactive-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset" style={{ paddingInlineStart: indent, touchAction: 'manipulation' }} onClick={onClick}>
      <RiArrowDownSLine className="size-4" />
      <span className="typography-micro">{t('sessions.sidebar.group.showMore')}</span>
    </button>
  );
};

export const ShowFewerRow: React.FC<{ indent: number; onClick: () => void }> = ({ indent, onClick }) => {
  const { t } = useI18n();
  return (
    <button type="button" className="flex min-h-9 w-full items-center gap-2 py-1 pe-3 text-start text-muted-foreground transition-colors hover:bg-interactive-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset" style={{ paddingInlineStart: indent, touchAction: 'manipulation' }} onClick={onClick}>
      <RiArrowUpSLine className="size-4" />
      <span className="typography-micro">{t('sessions.sidebar.group.showFewer')}</span>
    </button>
  );
};
