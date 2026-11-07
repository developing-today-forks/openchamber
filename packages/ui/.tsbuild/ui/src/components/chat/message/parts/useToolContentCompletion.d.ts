import type { ToolPart } from '@/lib/opencode/model';
type ToolContentCompletion = {
    status: 'whole';
} | {
    status: 'loading';
    showProgress: boolean;
} | {
    status: 'failed';
    retry: () => void;
};
/**
 * Completes a call whose result arrived as a shell (`toolContentShells.ts`)
 * once its row needs the result. The store then holds the whole call, so the
 * part this row renders stops being a shell. A request that fails, or answers
 * without the message, is reported as `failed`, never as an empty result.
 */
export declare const useToolContentCompletion: (part: ToolPart, needed: boolean) => ToolContentCompletion;
export {};
