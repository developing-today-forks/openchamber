import type { I18nKey, I18nParams } from '@/lib/i18n';
import { type SpaceFailure } from '@/lib/spaces/spaces-api';
type Translate = (key: I18nKey, params?: I18nParams) => string;
/**
 * The text of a failure. The `login_*` refusals name the login the user is to sign in to, so a
 * caller that knows the provider passes its login's name as `name`; a caller that knows the
 * failure is about another machine passes it as `machine`, so Docker's absence is placed there.
 */
export declare const spaceFailureText: (t: Translate, failure: SpaceFailure, params?: I18nParams) => string;
/** A thrown error as a failure: the journey's own refusals keep their code, anything else is unexpected. */
export declare const failureOfError: (error: Error) => SpaceFailure;
export {};
