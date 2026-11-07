import { z } from 'zod';
/**
 * Voice API keys live on the server (`/api/voice/keys`, mode 0600 there);
 * the UI only learns whether each is set. Speech and transcription requests
 * carry no key: the server fills it in.
 */
declare const voiceApiKeyStateSchema: z.ZodObject<{
    openai: z.ZodBoolean;
    openaiCompatible: z.ZodBoolean;
    stt: z.ZodBoolean;
}, z.core.$strip>;
export type VoiceApiKeyState = z.infer<typeof voiceApiKeyStateSchema>;
export type VoiceApiKeyKind = keyof VoiceApiKeyState;
export declare const EMPTY_VOICE_API_KEYS: {
    openai: false;
    openaiCompatible: false;
    stt: false;
};
export declare const fetchVoiceApiKeys: () => Promise<VoiceApiKeyState>;
/** A string stores the key, null removes it. Answers the new state. */
export declare const updateVoiceApiKeys: (patch: Partial<Record<VoiceApiKeyKind, string | null>>) => Promise<VoiceApiKeyState>;
/**
 * Moves keys a previous build left in localStorage to the server, then
 * deletes them from the browser. Only after the server confirmed the write:
 * a failed move keeps them for the next attempt rather than losing them.
 * Answers the new state, or null when there was nothing to move.
 */
export declare const migrateLegacyVoiceApiKeys: () => Promise<VoiceApiKeyState | null>;
export {};
