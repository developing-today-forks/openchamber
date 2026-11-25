import React from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui';
import { cancelGoalSpecJob } from '@/lib/goalSpecJobs';
import { useI18n } from '@/lib/i18n';
import { useGoalSpecJobStore } from '@/stores/useGoalSpecJobStore';
import { useSessionUIStore } from '@/sync/session-ui-store';

interface GoalSpecJobStripProps {
  sessionId: string | null;
}

/**
 * A message handed to the server with "Send when ready", among the composer's
 * top rows of its session: shown from the moment the session is selected,
 * while the session is still being made, until the server sends it with its
 * goal spec. Cancel stops the writing; the message then comes back to this
 * composer like any cancelled job's.
 */
export const GoalSpecJobStrip: React.FC<GoalSpecJobStripProps> = React.memo(({ sessionId }) => {
  const { t } = useI18n();
  const heldWhileCreating = useSessionUIStore((state) => (sessionId ? state.pendingDraftSends.get(sessionId)?.heldMessage : undefined));
  const job = useGoalSpecJobStore((state) => (
    sessionId ? Object.values(state.jobs).find((candidate) => candidate.sessionId === sessionId && candidate.status !== 'failed') : undefined
  ));
  const message = job?.content ?? heldWhileCreating;
  if (!sessionId || message === undefined) return null;
  const label = t('chat.goal.writer.toast.writingInBackground');
  const cancel = job?.status === 'writing'
    ? () => {
        void cancelGoalSpecJob(job)
          .then((cancelled) => useGoalSpecJobStore.getState().upsert(cancelled))
          .catch((error: Error) => toast.error(error.message));
      }
    : null;

  return (
    <div role="status" className="border-b border-edge">
      <div className="flex oc-composer-row min-w-0 items-center gap-2 ps-3 pe-1.5">
        <Spinner className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate typography-meta text-muted-foreground" title={`${label}\n\n${message}`}>
          {label} <span className="text-foreground">{message}</span>
        </span>
        {cancel ? (
          <Button type="button" variant="ghost" size="sm" className="shrink-0" onClick={cancel}>
            {t('chat.goal.action.cancel')}
          </Button>
        ) : null}
      </div>
    </div>
  );
});

GoalSpecJobStrip.displayName = 'GoalSpecJobStrip';
