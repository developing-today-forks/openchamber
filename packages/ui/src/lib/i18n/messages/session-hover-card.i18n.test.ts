import { describe, expect, test } from 'bun:test';

import { sessionHoverCardI18n } from './session-hover-card.i18n';

const locales = ['en', 'de', 'fr', 'nl', 'es', 'ja', 'pt-BR', 'uk', 'ko', 'pl', 'zh-CN', 'zh-TW', 'tr', 'ar', 'he'] as const;

describe('session hover card translations', () => {
  test('every locale has every key, translated', () => {
    const english = Object.entries(sessionHoverCardI18n.en);
    for (const locale of locales) {
      const dictionary = new Map<string, string>(Object.entries(sessionHoverCardI18n[locale]));
      expect([...dictionary.keys()].sort()).toEqual(english.map(([key]) => key).sort());
      for (const [key, englishText] of english) {
        expect(dictionary.get(key)?.trim()).toBeTruthy();
        if (locale !== 'en') expect(`${locale} ${key}: ${dictionary.get(key)}`).not.toBe(`${locale} ${key}: ${englishText}`);
      }
    }
  });
});
