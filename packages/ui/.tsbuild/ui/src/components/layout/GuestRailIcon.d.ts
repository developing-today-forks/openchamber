import React from 'react';
import type { IconName } from '@/components/icon/icons';
type GuestIconProps = {
    icon: IconName;
    iconSrc?: string;
    className?: string;
};
/** Package SVG when `iconSrc` is set, otherwise a host Remixicon sprite name. */
export declare const GuestIcon: React.FC<GuestIconProps>;
export {};
