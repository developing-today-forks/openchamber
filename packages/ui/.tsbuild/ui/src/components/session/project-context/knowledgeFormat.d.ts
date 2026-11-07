/**
 * A note has no title field; its first non-empty line is the title, the same
 * way agents and people already write them. Markdown heading and emphasis
 * markers are dropped from the title so `# Release` reads as "Release".
 */
export declare const splitNoteTitle: (body: string) => {
    title: string;
    rest: string;
};
/** Time for today's entries, a short date otherwise; the year only when it differs. */
export declare const formatKnowledgeDate: (timestamp: number, now?: Date) => string;
/** Plan cost badge text: exact cents at a cent or more, `<$0.01` below one cent, `$0` for a free session. */
export declare const formatPlanCost: (costUsd: number) => string;
/** Compact token count for the metrics tooltip: `950`, `1.2k`, `142k`, `1.5M`. */
export declare const formatTokenCount: (tokens: number) => string;
