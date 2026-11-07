export declare namespace Binary {
    function search<T>(array: readonly T[], id: string, compare: (item: T) => string): {
        found: boolean;
        index: number;
    };
}
