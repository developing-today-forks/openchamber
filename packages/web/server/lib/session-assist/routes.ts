import express from 'express';
import { z } from 'zod';
import type { SummarizeOutcome, SummarizeTrigger } from './runtime.js';
import type { Application } from '../shared/http-contracts.js';

const bodySchema = z.object({
  directory: z.string().trim().min(1),
  trigger: z.enum(['manual', 'hover']).default('manual'),
});

const sessionIdSchema = z.string().regex(/^[A-Za-z0-9_-]{4,128}$/);

// Every outcome has its own status code, so a client tells a failure (502)
// from a session with nothing to summarize (200 `empty`) without reading text.
const STATUS_CODES = {
  written: 200,
  fresh: 200,
  empty: 200,
  refused: 409,
  cooldown: 429,
  capacity: 429,
  cancelled: 409,
  failed: 502,
} satisfies Record<SummarizeOutcome['status'], number>;

interface SessionAssistRouteOptions {
  sessionAssistRuntime: {
    summarizeNow: (sessionId: string, directory: string, options: { trigger: SummarizeTrigger; signal?: AbortSignal }) => Promise<SummarizeOutcome>;
  };
}

export const registerSessionAssistRoutes = (app: Application, { sessionAssistRuntime }: SessionAssistRouteOptions) => {
  app.post('/api/session-assist/sessions/:sessionId/summary', express.json({ limit: '16kb' }), async (req, res) => {
    const sessionId = sessionIdSchema.safeParse(req.params.sessionId);
    const body = bodySchema.safeParse(req.body ?? {});
    if (!sessionId.success || !body.success) return res.status(400).json({ error: 'a session id and its directory are required' });
    const controller = new AbortController();
    // A closed connection before the answer is written stops the run when
    // no other request waits on it.
    const onClose = () => {
      if (!res.writableEnded) controller.abort();
    };
    res.on('close', onClose);
    try {
      const outcome = await sessionAssistRuntime.summarizeNow(sessionId.data, body.data.directory, {
        trigger: body.data.trigger,
        signal: controller.signal,
      });
      if (controller.signal.aborted) return undefined;
      if (outcome.status === 'cooldown') res.set('Retry-After', String(Math.max(1, Math.ceil(outcome.retryAfterMs / 1000))));
      return res.status(STATUS_CODES[outcome.status]).json(outcome);
    } finally {
      res.off('close', onClose);
    }
  });
};
