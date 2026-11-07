export declare const buildCommandPaletteFileSearchKey: (currentRoot: string | null, trimmedQuery: string) => string;
export declare const scoreCommandPaletteFiles: <T extends {
    name: string;
    relativePath: string;
}>(fileResults: T[], trimmedQuery: string, fileSearchKey: string, fileResultsKey: string) => {
    item: T;
    score: number;
}[];
