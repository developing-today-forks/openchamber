/**
 * Exposes the session's per-message model attribution (see
 * `useMessageModelAttribution`) to the message footer and the model-changed
 * divider without threading it through every row prop in `MessageList`.
 */
import React from 'react';
import type { MessageModelAttributionMap } from '../hooks/useMessageModelAttribution';
export declare const ModelAttributionProvider: React.FC<{
    value: MessageModelAttributionMap;
    children: React.ReactNode;
}>;
