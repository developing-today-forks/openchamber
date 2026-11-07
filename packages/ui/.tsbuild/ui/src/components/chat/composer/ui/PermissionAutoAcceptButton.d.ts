/**
 * Cycles how this session answers tool permissions: ask, safety net, accept
 * everything. The safety net is left out of the cycle while no classification
 * provider can run it.
 *
 * The pointer guards keep a tap from dismissing the mobile keyboard: on
 * Android's resizes-content viewport the keyboard-close relayout moves this
 * button mid-tap and the click never lands.
 */
import React from 'react';
import type { PermissionMode } from '@/stores/utils/permissionAutoAccept';
type PermissionAutoAcceptButtonProps = {
    footerIconButtonClass: string;
    iconSizeClass: string;
    isInteractive: boolean;
    /** Already passed through `displayedPermissionMode`. */
    permissionMode: PermissionMode;
    handlePermissionModeCycle: () => void;
    withTooltip?: boolean;
};
export declare const PermissionAutoAcceptButton: React.MemoExoticComponent<(props: PermissionAutoAcceptButtonProps) => import("react/jsx-runtime").JSX.Element>;
export {};
