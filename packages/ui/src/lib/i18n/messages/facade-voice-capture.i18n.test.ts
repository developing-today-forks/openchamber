import { describe, expect, test } from 'bun:test';

import { facadeVoiceCaptureI18n } from './facade-voice-capture.i18n';

const locales = ['en', 'de', 'fr', 'nl', 'es', 'ja', 'pt-BR', 'uk', 'ko', 'pl', 'zh-CN', 'zh-TW', 'tr', 'ar', 'he'] as const;

describe('facade voice-capture translations', () => {
  test('every locale has every key, translated', () => {
    const english = Object.entries(facadeVoiceCaptureI18n.en);
    for (const locale of locales) {
      const dictionary = new Map<string, string>(Object.entries(facadeVoiceCaptureI18n[locale]));
      expect([...dictionary.keys()].sort()).toEqual(english.map(([key]) => key).sort());
      for (const [key, englishText] of english) {
        expect(dictionary.get(key)?.trim()).toBeTruthy();
        if (locale !== 'en') expect(`${locale} ${key}: ${dictionary.get(key)}`).not.toBe(`${locale} ${key}: ${englishText}`);
      }
    }
  });

  test('every locale keeps the english placeholders', () => {
    const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
    const english = Object.entries(facadeVoiceCaptureI18n.en);
    for (const locale of locales) {
      const dictionary = new Map<string, string>(Object.entries(facadeVoiceCaptureI18n[locale]));
      for (const [key, englishText] of english) {
        expect(placeholders(dictionary.get(key) ?? '')).toEqual(placeholders(englishText));
      }
    }
  });
});
