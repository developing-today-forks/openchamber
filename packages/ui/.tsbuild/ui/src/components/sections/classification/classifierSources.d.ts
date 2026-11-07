import type { ClassifierSource } from '@/lib/routing/routingApi';
/** The name a classification provider goes by in Settings, or null for none. */
export declare const useClassifierSourceName: (source: ClassifierSource | null) => string | null;
/** Opens Settings → Providers → Classification providers. */
export declare const openClassificationProviders: () => void;
