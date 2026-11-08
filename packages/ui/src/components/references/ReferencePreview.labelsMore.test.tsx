import React, { act } from 'react';
import { afterEach, beforeEach, expect, test } from 'bun:test';
import { createRoot, type Root } from 'react-dom/client';
import { Window } from 'happy-dom';

import { I18nContext, type I18nContextValue } from '@/lib/i18n/react-context';
import { referencePickerI18n } from '@/lib/i18n/messages/reference-picker.i18n';
import { LinearLabelsMoreNote } from './ReferencePreview';

const en = referencePickerI18n.en as Record<string, string>;
const i18nValue: I18nContextValue = {
  locale: 'en',
  direction: 'ltr',
  locales: ['en'],
  setLocale: () => {},
  label: () => 'English',
  t: (key, params) => {
    const template = en[key] ?? key;
    return template.replace('{count}', String(params?.count ?? ''));
  },
};

let browser: Window;
let root: Root;
const originals = new Map<string, PropertyDescriptor | undefined>();

beforeEach(() => {
  browser = new Window({ url: 'http://localhost' });
  for (const [key, value] of Object.entries({
    window: browser,
    document: browser.document,
    navigator: browser.navigator,
    HTMLElement: browser.HTMLElement,
    IS_REACT_ACT_ENVIRONMENT: true,
  })) {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { value, configurable: true });
  }
  const host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
});

afterEach(async () => {
  await act(async () => root.unmount());
  await browser.happyDOM.close();
  for (const [key, descriptor] of originals) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else Reflect.deleteProperty(globalThis, key);
  }
  originals.clear();
});

const renderNote = async (labelsMore?: boolean) => {
  const host = document.querySelector('div');
  if (!host) throw new Error('Missing render host');
  await act(async () => root.render(
    <I18nContext.Provider value={i18nValue}>
      <LinearLabelsMoreNote labelsMore={labelsMore} count={50} href='https://linear.app/example/issue/ENG-1' />
    </I18nContext.Provider>,
  ));
  return host;
};

test('labelsMore true renders the truncation note linking to Linear', async () => {
  const host = await renderNote(true);
  const link = host.querySelector('a');
  expect(link?.getAttribute('href')).toBe('https://linear.app/example/issue/ENG-1');
  expect(link?.textContent).toContain('First 50 shown, all of them in Linear');
});

test('labelsMore false or absent renders nothing', async () => {
  const host = await renderNote(false);
  expect(host.querySelector('a')).toBeNull();
  expect(host.textContent).toBe('');
  const host2 = await renderNote(undefined);
  expect(host2.querySelector('a')).toBeNull();
});

test('every locale defines the labelsMore string', () => {
  for (const [locale, messages] of Object.entries(referencePickerI18n)) {
    const value = (messages as Record<string, string>)['references.picker.preview.labelsMore'];
    expect(typeof value, locale).toBe('string');
    expect(value).toContain('{count}');
  }
});
