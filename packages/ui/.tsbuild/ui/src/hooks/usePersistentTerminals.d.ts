import { type TrackedPty } from '@/sync/persistent-ptys';
export declare const useSessionTerminals: (sessionId: string) => TrackedPty[];
export declare const useHasSessionTerminals: (sessionId: string | null) => boolean;
/** Reads the session's terminals when it is shown; events keep them current after that. */
export declare const useSessionTerminalsLoaded: (sessionId: string | null, directory: string | undefined) => void;
