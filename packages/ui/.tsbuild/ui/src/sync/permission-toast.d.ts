import type { PermissionRequest } from '@/types/permission';
type PermissionToastOptions = {
    permission: PermissionRequest;
    directory: string;
    isViewed: boolean;
    pendingIds: Set<string>;
    show: (title: string, options: {
        id: string;
        description: string;
        action: {
            label: string;
            onClick: () => void;
        };
    }) => void;
    openSession: (sessionId: string, directory: string, requestId: string) => void;
};
export declare const getPermissionToastKey: (sessionId?: string, requestId?: string) => string | null;
export declare const showPermissionNeededToast: ({ permission, directory, isViewed, pendingIds, show, openSession, }: PermissionToastOptions) => boolean;
export {};
