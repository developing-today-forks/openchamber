import type { useI18n } from '@/lib/i18n';
import type { PrVisualSummary } from '@/stores/useGitHubPrStatusStore';
export declare function getPrStatusLabel(pr: PrVisualSummary | null, t: ReturnType<typeof useI18n>['t']): string | null;
