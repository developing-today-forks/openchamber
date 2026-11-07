export declare const mapWithConcurrency: <T, R>(values: T[], concurrency: number, mapper: (value: T) => Promise<R>) => Promise<R[]>;
