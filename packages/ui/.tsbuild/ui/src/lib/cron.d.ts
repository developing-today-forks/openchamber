export type CronValidationResult = {
    valid: boolean;
    error?: string;
};
export declare function isValidCronExpression(expression: string): CronValidationResult;
export declare function getNextRuns(expression: string, timezone: string, count?: number): Date[];
export declare const CRON_EXAMPLES: ReadonlyArray<{
    expression: string;
    labelKey: string;
}>;
