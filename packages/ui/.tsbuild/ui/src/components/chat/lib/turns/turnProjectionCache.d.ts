import type { ChatMessageEntry, TurnProjectionResult } from './types';
export declare const buildProjectionCacheKey: (sessionKey: string, messages: ChatMessageEntry[], showTurnChangedFiles: boolean, mergeHiddenUserTurnsKey: string) => string;
export declare const getCachedProjection: (key: string) => TurnProjectionResult | undefined;
export declare const setCachedProjection: (key: string, projection: TurnProjectionResult) => void;
