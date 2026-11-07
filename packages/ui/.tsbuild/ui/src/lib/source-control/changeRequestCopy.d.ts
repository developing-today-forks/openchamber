import type { I18nKey } from '@/lib/i18n';
import type { SourceControlProvider } from '@/lib/api/types';
/**
 * The message to show for `key` on a project hosted by `provider`: its GitLab
 * wording where one exists, else the key itself.
 */
export declare const changeRequestCopy: (key: I18nKey, provider: SourceControlProvider | null | undefined) => I18nKey;
