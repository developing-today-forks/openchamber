import type { Part, ToolPart } from '@/lib/opencode/model';
export declare const LIVE_ACTIVITY_VISIBLE_ROWS = 7;
/** Whether a tool call gets a row: while it runs, and once it ended with sane timing. */
export declare const isToolRowShown: (toolPart: ToolPart) => boolean;
/** Whether a part MessageBody draws is a row (`parts` already filtered for reasoning). */
export declare const isActivityRowPart: (part: Part) => boolean;
/** The parts of a message that draw a row, in order. */
export declare const activityRowParts: (parts: Part[], showReasoning: boolean) => Part[];
interface ActivityTrim {
    readonly hiddenMessages: number;
    readonly skipRows: number;
    readonly hiddenRows: number;
}
/** Which rows to hide so that the last `visibleRows` of the turn stay. */
export declare const planActivityTrim: (rowsPerMessage: readonly number[], visibleRows: number) => ActivityTrim;
/** The message the trim cuts into, and how many of its first rows it hides. */
export declare const ActivityRowSkipContext: import("react").Context<{
    messageId: string;
    rows: number;
} | null>;
export {};
