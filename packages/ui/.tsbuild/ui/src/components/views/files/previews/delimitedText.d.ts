/**
 * CSV/TSV parsing for the table preview.
 *
 * RFC 4180 rules: a field wrapped in double quotes may hold the delimiter,
 * newlines and doubled quotes. The parser is streaming over one string so a
 * large export never builds an intermediate array of lines, and it stops
 * filling rows past the cap while still counting them, so the preview can say
 * "2,000 of 48,210 rows" without holding all of them.
 */
type DelimitedTable = {
    header: string[];
    rows: string[][];
    /** Every data row in the file, including the ones not kept. */
    totalRows: number;
    columnCount: number;
    truncated: boolean;
};
export declare const delimiterForPath: (filePath: string) => ',' | '\t';
export declare const parseDelimitedText: (content: string, delimiter: ',' | '\t', rowCap?: number) => DelimitedTable;
export {};
