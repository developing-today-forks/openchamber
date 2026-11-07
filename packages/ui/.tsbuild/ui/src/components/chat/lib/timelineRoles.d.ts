import type { Message } from '@/lib/opencode/model';
export declare const isTimelineNoticeRole: (role: Message['role']) => boolean;
export declare const isSkippedTimelineRole: (role: Message['role']) => boolean;
/**
 * A report of work that ran in the background and woke this session: a
 * subagent run (a `subagent: true` command, or a subagent call that went to
 * the background outside the loaded history), the result of a session the
 * agent dispatched with `returnResult`, or a message that another session or
 * the person sent this one through OpenCode messaging. It opens a turn of its
 * own, like the prompt a command used to be, so the agent's reaction renders
 * below it. The report of a subagent call the transcript shows is dropped
 * before this point (`keepCommandSubagentReports` in `ChatContainer`) and
 * finishes that call's row instead.
 */
export declare const isBackgroundReportEntry: (message: Message) => boolean;
/**
 * A notice row that opens a turn the way a prompt does: a background report,
 * or a compaction. OpenCode compacts in the middle of a run once the context
 * fills and the agent carries on after it, so the steps that follow belong
 * below the compaction row, not to the turn that was running before it.
 */
export declare const isTurnOpeningNotice: (message: Message) => boolean;
/** Whether the timeline renders nothing for this message. */
export declare const isSkippedTimelineMessage: (message: Message) => boolean;
/**
 * Finds the notices that split a turn. A reply that finished with `stop` is
 * an answer; when only skipped notices separate it from the next assistant
 * message, the last of those notices opens a turn for that message, so each
 * answer renders as its own turn instead of the earlier one landing under
 * the later one's Activity. Steps of one run end with `tool-calls`, so a
 * notice between them leaves the turn whole.
 *
 * Feed it every message in order. For an assistant message it returns the
 * index of the notice that opens a turn for it, or -1.
 */
export declare const createNoticeTurnSplitter: () => (message: Message, index: number) => number;
