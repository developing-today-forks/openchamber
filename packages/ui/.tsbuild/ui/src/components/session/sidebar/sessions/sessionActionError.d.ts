import type { useI18n } from '@/lib/i18n';
type Translate = ReturnType<typeof useI18n>['t'];
/**
 * One sentence a person can act on when a session action fails. An OpenCode
 * failure names the status, the error class and the log ref, because "500"
 * alone sends whoever reads it hunting for a server that is in fact up.
 */
export declare const describeSessionActionError: (error: Error, t: Translate) => string;
export {};
