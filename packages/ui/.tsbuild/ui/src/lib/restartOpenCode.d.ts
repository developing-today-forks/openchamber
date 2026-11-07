import type { I18nKey, I18nParams } from '@/lib/i18n';
type TranslateFn = (key: I18nKey, params?: I18nParams) => string;
export declare function restartOpenCodeWithFeedback(t: TranslateFn): Promise<void>;
export {};
