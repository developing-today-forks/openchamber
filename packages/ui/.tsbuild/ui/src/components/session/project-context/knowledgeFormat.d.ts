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
