import type { SourceControlIdentity } from './types';
type ChangeRequestReference = {
    number: number;
    identity?: SourceControlIdentity;
    project?: {
        owner: string;
        name: string;
    };
};
export declare const parseChangeRequestReference: (value: string) => ChangeRequestReference | null;
export {};
