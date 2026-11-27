import React from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';

import { Icon } from '@/components/icon/Icon';
import { useI18n } from '@/lib/i18n';
import type { Session } from '@/lib/opencode/model';
import { MobileTimelineRows, type TimelineRowHandlers } from './MobileTimelineList';
import type { HeaderlessListGroup, HeaderlessListItem } from './mobileHeaderlessSessions';

export const MobileHeaderlessList: React.FC<{
  groups: readonly HeaderlessListGroup[];
  handlers: TimelineRowHandlers;
  renderChat: (session: Session) => React.ReactNode;
}> = ({ groups, handlers, renderChat }) => {
  const [visibleCount, setVisibleCount] = React.useState(20);
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
        {visibleItems.map((item: HeaderlessListItem) => item.kind === 'timeline' ? (
          <MobileTimelineRows
            key={item.key}
            entries={[item.entry]}
            showProject
            handlers={handlers}
          />
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

export const ShowMoreRow: React.FC<{ indent: number; onClick: () => void }> = ({ indent, onClick }) => {
  const { t } = useI18n();
  return (
    <button
      type="button"
      className="flex min-h-9 w-full items-center gap-2 py-1 pe-3 text-start text-muted-foreground transition-colors hover:bg-interactive-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      style={{ paddingInlineStart: indent, touchAction: 'manipulation' }}
      onClick={onClick}
    >
      <RiArrowDownSLine className="size-4" />
      <span className="typography-micro">{t('sessions.sidebar.group.showMore')}</span>
    </button>
  );
};

export const ShowFewerRow: React.FC<{ indent: number; onClick: () => void }> = ({ indent, onClick }) => {
  const { t } = useI18n();
  return (
    <button
      type="button"
      className="flex min-h-9 w-full items-center gap-2 py-1 pe-3 text-start text-muted-foreground transition-colors hover:bg-interactive-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      style={{ paddingInlineStart: indent, touchAction: 'manipulation' }}
      onClick={onClick}
    >
      <RiArrowUpSLine className="size-4" />
      <span className="typography-micro">{t('sessions.sidebar.group.showFewer')}</span>
    </button>
  );
};
