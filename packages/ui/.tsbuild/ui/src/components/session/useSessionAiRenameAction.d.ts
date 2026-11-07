/** Menus and mobile swipe actions check history only while their controls are open. */
export declare function useSessionAiRenameAction(sessionID: string, directory: string | null | undefined, open: boolean): {
    pending: boolean;
    disabled: boolean;
    hint: string;
    run: () => void;
};
