type SessionOpener = (sessionID: string, directory: string) => void;
export declare const setSessionOpener: (opener: SessionOpener | null) => void;
export declare const openSessionFromToast: (sessionID: string, directory: string) => void;
export {};
