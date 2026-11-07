import type { I18nKey } from '@/lib/i18n';
import type { InstallGuestErrorCode } from '@/lib/guests/install';
import type { UpdateGuestErrorCode } from '@/lib/guests/updates';
/** Toast text for a failed install, shared by Settings → Extensions and the Integrations catalog cards. */
export declare const errorToastKey: (code: InstallGuestErrorCode) => I18nKey;
/** Toast text for a failed update. */
export declare const updateErrorToastKey: (code: UpdateGuestErrorCode) => I18nKey;
