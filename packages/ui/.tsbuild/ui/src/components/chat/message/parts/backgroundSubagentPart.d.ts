/**
 * A subagent call that went to the background, shown as the subagent row it
 * came from.
 *
 * OpenCode settles such a call at once (see `readBackgroundSubagentChildID`),
 * so its own part says "completed" while the child keeps working. The row
 * instead follows the child: running while the child session runs, then the
 * report OpenCode handed back to the agent. The report itself is not shown as
 * a row of its own (`keepCommandSubagentReports`), so the subagent stays
 * where it was started instead of reappearing at the end of the chat.
 */
import type { ToolPart } from '@/lib/opencode/model';
import type { SubagentRun } from '@/lib/opencode/subagent-run';
export type BackgroundSubagentPhase = {
    kind: 'running';
} | {
    kind: 'finished';
    run: SubagentRun;
}
/** The child is idle and no report arrived (history from before a restart). */
 | {
    kind: 'unknown';
};
export declare const toBackgroundSubagentPart: (part: ToolPart, phase: BackgroundSubagentPhase) => ToolPart;
/**
 * A foreground subagent the user stopped. OpenCode fails the call with
 * "Subagent cancelled"; the row shows it as stopped, not as a failure.
 */
export declare const toStoppedSubagentPart: (part: ToolPart, notice: string) => ToolPart;
