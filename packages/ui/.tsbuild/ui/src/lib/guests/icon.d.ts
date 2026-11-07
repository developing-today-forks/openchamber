import { isGuestPackageSvgIcon } from '@openchamber/sdk';
import type { IconName } from '@/components/icon/icons';
export declare const FALLBACK_GUEST_ICON: IconName;
export declare const resolveGuestIconName: (name: string) => IconName;
export { isGuestPackageSvgIcon };
export declare const guestPackageIconSrc: (guestId: string, icon: string, authenticatedAsset: (path: string) => string) => string | undefined;
/** What `GuestIcon` draws: a host sprite name, or a package SVG under `iconSrc` (masked in `currentColor`). */
type GuestToolIcon = {
    icon: IconName;
    iconSrc?: string;
};
/**
 * The icon a `contributes.tools` rule asks for: a package `.svg` becomes an
 * authenticated asset URL like the panel icon, a Remixicon name the sprite
 * carries is used as is. `null` for no icon or a name the sprite does not
 * know, so the host's own tool icon stays.
 */
export declare const resolveGuestToolIcon: (guestId: string, icon: string | undefined, authenticatedAsset: (path: string) => string) => GuestToolIcon | null;
