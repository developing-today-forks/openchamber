/**
 * Timeline rows for the message roles that are not a conversation turn.
 *
 * OpenCode v2 promoted things that used to hide inside a user message — a
 * compaction, a shell command, injected context — to message roles of their
 * own. Only `user` and `assistant` carry parts, so the roles that have
 * something to show render here as small, self-contained rows instead of
 * going through `ChatMessage`. So does a background subagent run, which v2
 * reports as a synthetic message (see `@/lib/opencode/subagent-run`), the
 * result of a session the agent dispatched with `returnResult` (see
 * `@/lib/opencode/dispatched-session`), a message that another session or
 * the person sent through OpenCode messaging (see `@/lib/opencode/messaging`),
 * and a session notice that landed between turns (see
 * `@/lib/opencode/session-notices`).
 */
import React from 'react';
import type { Message } from '@/lib/opencode/model';
/**
 * The timeline row for a message, or `null` when the caller should render the
 * message itself.
 */
export declare const TimelineNotice: React.FC<{
    message: Message;
}>;
