import React from 'react';
import type { Session } from '@/lib/opencode/model';
import { useI18n } from '@/lib/i18n';
import { Icon } from '@/components/icon/Icon';
import { Button } from '@/components/ui/button';
import { BusyDots } from '@/components/ui/busy-dots';
import { getCurrentSessionAssist } from '@/lib/sessionAssistMetadata';
import { requestSessionSummary, useSessionSummaryRequest, type SessionSummaryRequestState } from '@/lib/sessionSummaryRequest';
import { useRunAfterDelay } from '@/hooks/useRunAfterDelay';
import { useUIStore } from '@/stores/useUIStore';
import { useGlobalSessionsStore } from '@/stores/useGlobalSessionsStore';
import { cn } from '@/lib/utils';
import { refTintStyle } from '@/lib/source-control/prVisualState';
import { SessionHoverTimes } from './SessionTimestamps';

const AUTO_SUMMARY_AFTER_MS = 2_500;

interface SessionHoverCardProps {
  session: Session;
  title: string;
  activityAt: number;
  projectLabel: string | null;
  branchLabel: string | null;
  branchInSpace: boolean;
  branchPrIconColor: string | undefined;
  links: React.ReactNode;
  isStreaming: boolean;
  summaryDirectory: string | null;
}

export const SessionHoverCard: React.FC<SessionHoverCardProps> = ({ session: listed, title, activityAt, projectLabel, branchLabel, branchInSpace, branchPrIconColor, links, isStreaming, summaryDirectory }) => {
  const { t } = useI18n();
  const session = useGlobalSessionsStore((state) => state.entityById.get(listed.id)) ?? listed;
  const recapEnabled = useUIStore((state) => state.sessionRecapEnabled);
  const autoSummary = useUIStore((state) => state.sessionHoverSummaryEnabled);
  const assist = recapEnabled && !isStreaming ? getCurrentSessionAssist(session) : null;
  const idleAt = session.time?.idle ?? 0;
  const lastRequest = useSessionSummaryRequest(session.id, idleAt);
  const overwritten = lastRequest?.state === 'written' && (assist?.generatedAt ?? 0) >= lastRequest.settledAt;
  const request = overwritten ? null : lastRequest?.state ?? null;
  const canSummarize = recapEnabled && !isStreaming && idleAt > 0 && summaryDirectory !== null && !session.revert?.messageID && !assist?.summary;

  const summarize = (trigger: 'manual' | 'hover') => {
    if (summaryDirectory) void requestSessionSummary({ sessionId: session.id, directory: summaryDirectory, idleAt, trigger });
  };
  useRunAfterDelay(canSummarize && autoSummary && lastRequest === null, AUTO_SUMMARY_AFTER_MS, () => summarize('hover'));

  const summary = assist?.summary ?? null;
  return (
    <div className="flex min-w-0 flex-col gap-1 text-start text-xs">
      <span dir="auto" className="oc-ui-start-align min-w-0 truncate font-medium text-foreground">{title}</span>
      {projectLabel || branchLabel ? (
        <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
          {projectLabel ? <>
            <Icon name="folder" className="h-3 w-3 flex-shrink-0" />
            <span className="min-w-0 truncate">{projectLabel}</span>
          </> : null}
          {projectLabel && branchLabel ? <span aria-hidden="true">·</span> : null}
          {branchLabel ? <>
            {branchInSpace
              ? <Icon name="box-3" className="h-3 w-3 flex-shrink-0" aria-hidden={false} role="img" aria-label={t('sessions.sidebar.group.space')} />
              : <Icon name="git-branch" className={cn('h-3 w-3 flex-shrink-0', branchPrIconColor && 'oc-ref-tint')} style={branchPrIconColor ? refTintStyle(branchPrIconColor) : undefined} />}
            <span className="min-w-0 truncate">{branchLabel}</span>
          </> : null}
        </div>
      ) : null}
      {links}
      <SessionHoverTimes session={session} activityAt={activityAt} />
      {summary ? (
        <dl className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-0.5" data-session-summary="">
          <dt className="text-muted-foreground">{t('sessions.sidebar.hoverCard.done')}</dt>
          <dd dir="auto" className="oc-ui-start-align min-w-0 text-foreground">{summary.done}</dd>
          <dt className="text-muted-foreground">{t('sessions.sidebar.hoverCard.left')}</dt>
          <dd dir="auto" className={cn('oc-ui-start-align min-w-0', summary.left ? 'text-foreground' : 'text-muted-foreground')}>
            {summary.left || t('sessions.sidebar.hoverCard.nothingLeft')}
          </dd>
          {summary.stoppedAt ? <>
            <dt className="text-muted-foreground">{t('sessions.sidebar.hoverCard.stoppedAt')}</dt>
            <dd dir="auto" className="oc-ui-start-align min-w-0 text-foreground">{summary.stoppedAt}</dd>
          </> : null}
        </dl>
      ) : assist?.recap ? (
        <p dir="auto" className="oc-ui-start-align min-w-0 line-clamp-3 text-muted-foreground">{assist.recap}</p>
      ) : null}
      {canSummarize ? <SummaryStatus state={request} onSummarize={() => summarize('manual')} /> : null}
    </div>
  );
};

const SummaryStatus: React.FC<{ state: SessionSummaryRequestState | null; onSummarize: () => void }> = ({ state, onSummarize }) => {
  const { t } = useI18n();
  if (state === 'refused') return null;
  if (state === 'running' || state === 'written') {
    return <span className="text-muted-foreground" role="status">{t('sessions.sidebar.hoverCard.summarizing')}<BusyDots /></span>;
  }
  if (state === 'empty') return <span className="text-muted-foreground">{t('sessions.sidebar.hoverCard.summaryEmpty')}</span>;
  if (state === 'no-model') return <span className="text-muted-foreground">{t('sessions.sidebar.hoverCard.summaryNoModel')}</span>;
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Button variant="outline" size="xs" onClick={onSummarize} className="flex-shrink-0">
        <Icon name="sparkling" className="size-3" />
        {t('sessions.sidebar.hoverCard.summarize')}
      </Button>
      {state === 'failed' ? <span className="min-w-0 text-muted-foreground">{t('sessions.sidebar.hoverCard.summaryFailed')}</span> : null}
    </div>
  );
};
