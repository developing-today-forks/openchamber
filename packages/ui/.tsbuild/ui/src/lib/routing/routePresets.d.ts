/**
 * Beginner presets that build a model pool from the OpenCode catalog.
 * Each returns route targets (`providerID/modelID` strings) for a new
 * `opencode-route/*` entry:
 *
 * - cheapest: the lowest per-token cost first.
 * - fastest: the smallest context windows first, a size proxy for speed since
 *   the catalog carries no latency numbers.
 * - sturdiest: the model id listed by the most providers, cheapest first, so
 *   the pool survives any single provider going down.
 */
import type { Model, Provider } from '@/lib/opencode/model';
export type PresetId = 'cheap' | 'fast' | 'sturdy';
export declare const PRESET_ROUTE_IDS: Record<PresetId, string>;
/** Cheapest per-token cost first, one entry per provider/model, capped. */
export declare const cheapestTargets: (providers: Array<Provider & {
    models: Model[];
}>, count?: number) => string[];
/** Smallest context windows first: a size proxy for speed. */
export declare const fastestTargets: (providers: Array<Provider & {
    models: Model[];
}>, count?: number) => string[];
/**
 * The model id offered by the most providers, cheapest first. Returns [] when
 * no model id appears under more than one provider.
 */
export declare const sturdiestTargets: (providers: Array<Provider & {
    models: Model[];
}>) => string[];
export declare const presetTargets: (preset: PresetId, providers: Array<Provider & {
    models: Model[];
}>) => string[];
