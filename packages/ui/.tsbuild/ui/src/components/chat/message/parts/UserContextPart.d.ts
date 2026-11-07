import React from 'react';
import type { ContextPartPayload } from '@/lib/messages/contextParts';
declare const _default: React.NamedExoticComponent<{
    payload: ContextPartPayload;
    /** Message-level collapse state, shared with the text parts. */
    collapsed?: boolean;
    onExpand?: () => void;
    attachmentFilenames: readonly string[];
}>;
export default _default;
