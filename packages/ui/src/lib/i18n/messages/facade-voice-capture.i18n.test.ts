import { describe, expect, test } from 'bun:test';

import { facadeVoiceCaptureI18n } from './facade-voice-capture.i18n';

const locales = ['en', 'de', 'fr', 'nl', 'zh-CN', 'zh-TW', 'uk', 'es', 'pt-BR', 'ko', 'pl', 'ja', 'tr', 'ar', 'he'] as const;
const sameFormKeys: ReadonlySet<string> = new Set([
    'chat.facadeVoiceCapture.provenance.model',
    'chat.facadeVoiceCapture.provenance.duration',
]);

describe('facade voice capture translations', () => {
    test('every locale has every key with translated values', () => {
        const english = Object.entries(facadeVoiceCaptureI18n.en);
        for (const locale of locales) {
            const dictionary = new Map<string, string>(Object.entries(facadeVoiceCaptureI18n[locale]));
            expect([...dictionary.keys()].sort()).toEqual(english.map(([key]) => key).sort());
            for (const [key, englishText] of english) {
                expect(dictionary.get(key)?.trim()).toBeTruthy();
                if (locale !== 'en' && !sameFormKeys.has(key)) {
                    expect(`${locale} ${key}: ${dictionary.get(key)}`).not.toBe(`${locale} ${key}: ${englishText}`);
                }
            }
        }
    });
});
