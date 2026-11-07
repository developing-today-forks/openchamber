import type { WalkthroughBlockedState, WalkthroughModel } from '@/lib/walkthrough/types';
interface WalkthroughBlockerProps {
    reason: WalkthroughBlockedState;
    model?: WalkthroughModel;
    requiredChars?: number;
    availableChars?: number;
    onRetry: () => void;
}
/**
 * A refusal the user can act on. Both blocking reasons come down to "this small
 * model cannot do this job", so the remedy — pick a different one — is offered
 * in place rather than sending the user to Settings to guess.
 */
export declare const WalkthroughBlocker: ({ reason, model, requiredChars, availableChars, onRetry, }: WalkthroughBlockerProps) => import("react/jsx-runtime").JSX.Element;
export {};
