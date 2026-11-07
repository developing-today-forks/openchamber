export interface EnterKeyPolicyInput {
    isMobile: boolean;
    isDesktopExpanded: boolean;
    enterToSend: boolean;
    enterToSendConfigured: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
}
export declare const shouldSubmitEnter: (input: EnterKeyPolicyInput) => boolean;
export interface EnterModifierState {
    shiftKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
}
export declare const restoreDeferredEnterModifiers: (event: EnterModifierState, modifiers: EnterModifierState, preserveShift?: boolean) => void;
