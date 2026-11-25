import { z } from 'zod';
import type { Session } from '@/lib/opencode/model';

const trimmedText = z.string().trim().catch('');

const summarySchema = z.object({
  done: z.string().trim().min(1),
  left: trimmedText,
  stoppedAt: trimmedText,
});

const assistSchema = z.object({
  recap: trimmedText,
  suggestion: trimmedText,
  summary: summarySchema.nullable().catch(null),
  forMessageID: z.string().catch(''),
  generatedAt: z.number().catch(0),
});

const assistMetadataSchema = z.object({ openchamber: z.object({ assist: assistSchema }) });

export type SessionAssistPayload = z.infer<typeof assistSchema>;

function getSessionAssist(session: Session | null | undefined): SessionAssistPayload | null {
  const assist = assistMetadataSchema.safeParse(session?.metadata).data?.openchamber.assist;
  if (!assist?.forMessageID || (!assist.recap && !assist.suggestion && !assist.summary)) return null;
  return assist;
}

export function getCurrentSessionAssist(session: Session | null | undefined): SessionAssistPayload | null {
  const assist = getSessionAssist(session);
  if (!assist || !session) return null;
  if (session.revert?.messageID) return null;
  const idleAt = session.time?.idle ?? 0;
  return assist.generatedAt >= idleAt ? assist : null;
}
