import { type Locale } from '@/lib/i18n';
import type { WalkthroughTarget } from '@/lib/walkthrough/types';
import { type WalkthroughEntry } from '@/stores/useWalkthroughStore';
interface WalkthroughReviewOptions {
    directory: string;
    target: WalkthroughTarget;
    visible: boolean;
    /** A subject the person still has to pick (a branch base, a commit, a pull request): nothing loads. */
    needsSourceSelection: boolean;
    /** Moves when the subject's content moves (a branch's revision, a push to the pull request), so it reads again. */
    revision: string;
}
/**
 * One walkthrough of one target: reading and generating it, the model and the
 * language it is asked in, what blocks it, and where the reader is in it. The
 * desktop panel and the phone's Changes screen show the same walkthrough
 * through this hook and differ only in how they lay it out.
 */
export declare const useWalkthroughReview: ({ directory, target, visible, needsSourceSelection, revision }: WalkthroughReviewOptions) => {
    entry: WalkthroughEntry;
    view: import("@/lib/walkthrough/model").WalkthroughView | null;
    isGenerating: boolean;
    showStages: boolean;
    stageProgress: import("./useWalkthroughStageProgress").WalkthroughStageProgress;
    blocked: {
        reason: "context-too-small" | "empty-diff" | "no-model" | "only-generated" | "output-exhausted" | "server-unsupported" | "structured-output-unsupported";
        model: import("@/lib/walkthrough/types").WalkthroughModel | undefined;
        requiredChars: number | undefined;
        availableChars: number | undefined;
    } | undefined;
    errorMessage: string | undefined;
    languageMissing: boolean;
    modelMissing: boolean;
    shownLocale: Locale | undefined;
    activeLanguage: Locale;
    selectLanguage: (language: string) => void;
    activeModelId: string;
    activeProviderId: string;
    hasActiveModel: boolean;
    modelProviders: string[] | undefined;
    isStructuredOutputCapable: (providerId: string, modelId: string) => boolean;
    selectModel: (providerId: string, modelId: string) => void;
    generateDisabled: boolean;
    handleGenerate: (force: boolean) => void;
    cancel: () => void;
    retry: () => void;
    activeStopId: string | null;
    activeStopPosition: number;
    visitedStopIds: ReadonlySet<string>;
    scrollToStopId: string | null;
    clearScrollRequest: () => void;
    handleActiveStopChange: (stopId: string) => void;
    handleSelectStop: (stopId: string) => void;
    step: (delta: number) => void;
};
export type WalkthroughReview = ReturnType<typeof useWalkthroughReview>;
export {};
