import React from 'react';
import type { PermissionReply, PermissionRequest } from '@/types/permission';
interface PermissionCardProps {
    permission: PermissionRequest;
    onResponse?: (response: 'once' | 'always' | 'reject') => void;
}
/** The safety-net hold notice and what the request wants to do. */
export declare const PermissionRequestContent: React.FC<{
    permission: PermissionRequest;
}>;
/** Allow once / always / deny, plus deny-with-feedback. The dock uses the shared buttons; the inline card keeps its status-coloured row. */
export declare const PermissionActions: React.FC<{
    permission: PermissionRequest;
    isResponding: boolean;
    onRespond: (response: PermissionReply, message?: string) => void;
    variant: 'inline' | 'dock';
}>;
/** The inline card the BTW sheet shows for its child session's requests. */
export declare const PermissionCard: React.FC<PermissionCardProps>;
export {};
