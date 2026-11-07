type GeneratedCommitResult = {
    kind: 'commit';
    subject: string;
    highlights: string[];
    raw: string;
};
type GeneratedPrResult = {
    kind: 'pr';
    title: string;
    body: string;
    raw: string;
};
export type GeneratedResult = GeneratedCommitResult | GeneratedPrResult;
export declare const parseGeneratedJsonResult: (value: string) => GeneratedResult | null;
export {};
