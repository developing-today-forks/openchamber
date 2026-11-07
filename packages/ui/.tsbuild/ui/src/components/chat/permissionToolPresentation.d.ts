import type { PermissionRequest } from '@/types/permission';
export declare const getToolDisplayName: (toolName: string) => string;
/** Icon and short name of the capability a request asks for, for headers. */
export declare const getPermissionToolPresentation: (permission: PermissionRequest) => {
    icon: import("react/jsx-runtime").JSX.Element;
    name: string;
};
