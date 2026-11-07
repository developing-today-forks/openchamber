/**
 * Folds the non-conversation messages OpenCode v2 injects around a prompt back
 * into the timeline the user reads.
 *
 * A send delivers each composer context item (an inline comment, terminal
 * output, a failed PR check, a linked issue) as its own `synthetic` message
 * right before the prompt, carrying the structured payload in its metadata.
 * Server plugins inject `synthetic` messages too, with no metadata; those are
 * prompt plumbing the user never wrote.
 *
 * So: the contiguous run of synthetic messages immediately before a user
 * message belongs to that message, and so does context right after it whose id
 * was minted before the prompt's (see the loop). The ones carrying context metadata come
 * back as text parts on the user message, which is exactly where v1 kept them,
 * so they render as context chips inside the user bubble. A background report
 * stays as its own entry. A notice that splits a turn between two answers
 * stays too (`createNoticeTurnSplitter`): turn projection opens the later
 * answer's turn at it, and it renders as its notice row or as nothing.
 *
 * A session notice (`@/lib/opencode/session-notices`) that lands while the
 * agent works becomes a row of the step it followed, the final one included
 * once it answered, or of the run's first step when it came before any; until
 * that step arrives it stays an entry that turn projection keeps in the
 * prompt's turn (`TurnRecord.waitingNotices`). One that lands after an answer
 * stays as its own entry and renders as a notice row between turns. Everything else the timeline never shows is dropped here
 * instead of rendering as an empty row.
 */
import type { ChatMessageEntry } from './turns/types';
export declare const attachSyntheticContext: (messages: ChatMessageEntry[]) => ChatMessageEntry[];
