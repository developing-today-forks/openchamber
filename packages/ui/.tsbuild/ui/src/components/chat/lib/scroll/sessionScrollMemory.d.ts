import type { MessageViewportAnchor } from './messageViewportAnchor';
export declare const readSessionScrollPosition: (sessionKey: string) => MessageViewportAnchor | null;
export declare const rememberSessionScrollPosition: (sessionKey: string, anchor: MessageViewportAnchor | null) => void;
