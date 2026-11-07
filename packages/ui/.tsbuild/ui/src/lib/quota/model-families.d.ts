import type { QuotaProviderId } from '@/types';
export interface ModelFamily {
    id: string;
    label: string;
    matcher: (modelName: string) => boolean;
    order: number;
}
/**
 * Strip auth source prefix from model name for display.
 * e.g., "gemini/gemini-2.5-flash" -> "gemini-2.5-flash"
 *       "antigravity/claude-sonnet" -> "claude-sonnet"
 */
export declare function getDisplayModelName(modelName: string): string;
export declare function getAllModelFamilies(providerId: QuotaProviderId): ModelFamily[];
export declare function sortModelFamilies(families: ModelFamily[]): ModelFamily[];
/**
 * Group models by family with custom getter function (for UsagePage.tsx)
 */
export declare function groupModelsByFamilyWithGetter<T>(models: T[], getModelName: (model: T) => string, providerId: QuotaProviderId): Map<string | null, T[]>;
/**
 * Get default models for a provider based on simple patterns.
 * For Google provider with gemini/ and antigravity/ prefixes:
 * - Gemini 3.x models
 * - All Claude models
 * For the Claude provider: every model it reports a limit for.
 */
export declare function getDefaultModels(providerId: QuotaProviderId, availableModels: string[]): string[];
