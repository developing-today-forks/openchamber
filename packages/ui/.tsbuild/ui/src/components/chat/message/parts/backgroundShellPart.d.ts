/**
 * A background shell command, shown as the shell tool row it came from.
 *
 * OpenCode settles a background call at once (see
 * `@/lib/opencode/background-shell`), so its own part says "completed" in a
 * tenth of a second while the command keeps running. The row instead shows
 * the command's real life: running with its live output while the shell
 * service lists it, then finished with the result OpenCode handed back to the
 * agent. The row keeps the tool row's look in both states, so a background
 * command reads like any other command.
 */
import { type ShellCompletion } from '@/lib/opencode/background-shell';
import type { ToolPart } from '@/lib/opencode/model';
export type BackgroundShellPhase = 
/** The shell service still runs the command. */
{
    kind: 'running';
    output: string;
}
/** OpenCode reported how the command ended. */
 | {
    kind: 'finished';
    completion: ShellCompletion;
}
/**
 * The user stopped it. OpenCode reports that as an error, which is not
 * what happened, so the row shows the stop instead (`notice`, translated).
 */
 | {
    kind: 'stopped';
    endedAt: number;
    notice: string;
}
/**
 * Neither: the command ended and its report has not arrived yet, or the
 * list of running commands has not been read.
 */
 | {
    kind: 'unknown';
};
export declare const toBackgroundShellPart: (part: ToolPart, phase: BackgroundShellPhase) => ToolPart;
