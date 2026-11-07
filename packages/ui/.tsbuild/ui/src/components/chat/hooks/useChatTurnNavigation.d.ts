interface UseChatTurnNavigationOptions {
    sessionId: string | null;
    turnIds: string[];
    activeTurnId: string | null;
    scrollToTurn: (turnId: string, options?: {
        behavior?: ScrollBehavior;
    }) => Promise<boolean>;
    scrollToMessage: (messageId: string, options?: {
        behavior?: ScrollBehavior;
    }) => Promise<boolean>;
    resumeToBottom: () => void;
}
interface ChatTurnNavigation {
    scrollToTurnId: (turnId: string, options?: {
        behavior?: ScrollBehavior;
        updateHash?: boolean;
    }) => Promise<boolean>;
    scrollToMessageId: (messageId: string, options?: {
        behavior?: ScrollBehavior;
        updateHash?: boolean;
    }) => Promise<boolean>;
    scrollByTurnOffset: (offset: number, options?: {
        resumePastEnd?: boolean;
    }) => Promise<boolean>;
    resumeToLatest: () => void;
}
export declare const useChatTurnNavigation: ({ sessionId, turnIds, activeTurnId, scrollToTurn, scrollToMessage, resumeToBottom, }: UseChatTurnNavigationOptions) => ChatTurnNavigation;
export {};
