import { type InterpretResult } from '@/lib/routing/routeRulesApi';
type ChatRouteOutcome = {
    status: 'applied';
    summary: string;
} | {
    status: 'needs-choice';
} | {
    status: 'unknown';
    reason: string;
};
export declare const chatRouteOutcome: (result: InterpretResult) => ChatRouteOutcome;
export declare const applyChatRoute: (sentence: string, providers: ReadonlyArray<{
    id: string;
    models: ReadonlyArray<{
        id: string;
    }>;
}>) => Promise<ChatRouteOutcome>;
export {};
