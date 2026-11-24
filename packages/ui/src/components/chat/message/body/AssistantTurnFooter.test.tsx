import { afterAll, afterEach, beforeEach, describe, expect, spyOn, test } from 'bun:test';
import { Window } from 'happy-dom';
import React, { act } from 'react';
import type { Root } from 'react-dom/client';

// Stores the footer's imports load read the server on import; none of it is
// under test, so every request gets an empty answer.
const fetchSpy = spyOn(globalThis, 'fetch').mockImplementation(async () => Response.json({ data: [] }));
afterAll(() => fetchSpy.mockRestore());

// React DOM and Base UI probe for a DOM when first imported.
const importWindow = new Window({ url: 'http://localhost' });
const importGlobals = {
  window: importWindow, document: importWindow.document, navigator: importWindow.navigator,
  localStorage: importWindow.localStorage, sessionStorage: importWindow.sessionStorage,
};
const beforeImport = Object.keys(importGlobals).map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)] as const);
for (const [name, value] of Object.entries(importGlobals)) {
  Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
}
const { createRoot } = await import('react-dom/client');
const { AssistantTurnFooter } = await import('./AssistantTurnFooter');
const { useFactsFit } = await import('../useFactsFit');
const { I18nProvider } = await import('@/lib/i18n');
const { TooltipProvider } = await import('@/components/ui/tooltip');
for (const [name, descriptor] of beforeImport) {
  if (descriptor) Object.defineProperty(globalThis, name, descriptor);
  else Reflect.deleteProperty(globalThis, name);
}

// Layout stand-in for the facts row: the model name has 120px less whatever the
// agent (40px) and the real model reference (60px) still take beside it.
const MODEL_ROOM = 120;
let modelNeeds = 0;
const factShown = (row: Element | null, selector: string) => {
  const fact = row?.querySelector<HTMLElement>(selector);
  return Boolean(fact) && fact?.style.display !== 'none';
};

const Footer = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  useFactsFit(ref);
  return (
    <AssistantTurnFooter
      footerFactsRef={ref}
      footerModelName="Gemini 4 Carbon"
      footerModelRef="github-copilot/gemini-4-carbon#high"
      footerModelTitle="Gemini 4 Carbon"
      footerProviderID="github-copilot"
      footerAgentName="build"
      footerEffortLabel={null}
      turnDurationText="12s"
      footerTimestamp={null}
      alwaysShowMessageActions={false}
      isTouchContext={false}
      actionSheetOpen={false}
      setActionSheetOpen={() => {}}
      actionButtons={null}
      isMiniChatSurface
      isLastAssistantInTurn={false}
      hasStopFinish={false}
      turnGroupingContext={undefined}
      footerSheetActions={[]}
    />
  );
};

class TestResizeObserver implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

describe('AssistantTurnFooter facts at narrow widths', () => {
  let root: Root;
  let restore: () => void;

  beforeEach(() => {
    const win = new Window({ url: 'http://localhost' });
    const proto = win.HTMLElement.prototype;
    Object.defineProperty(proto, 'scrollWidth', {
      configurable: true,
      get(this: HTMLElement) { return this.hasAttribute('data-fact-model') ? modelNeeds : 0; },
    });
    Object.defineProperty(proto, 'clientWidth', {
      configurable: true,
      get(this: HTMLElement) {
        if (!this.hasAttribute('data-fact-model')) return 0;
        const row = this.closest('.message-footer__facts');
        return MODEL_ROOM
          - (factShown(row, '[data-fact-model-ref]') ? 60 : 0)
          - (factShown(row, '[data-fact-priority="1"]') ? 40 : 0);
      },
    });
    const globals = {
      window: win, document: win.document, navigator: win.navigator, HTMLElement: win.HTMLElement, Element: win.Element,
      localStorage: win.localStorage, sessionStorage: win.sessionStorage,
      Node: win.Node, Event: win.Event, getComputedStyle: win.getComputedStyle.bind(win),
      requestAnimationFrame: win.requestAnimationFrame.bind(win), cancelAnimationFrame: win.cancelAnimationFrame.bind(win),
      ResizeObserver: TestResizeObserver, MutationObserver: win.MutationObserver, IS_REACT_ACT_ENVIRONMENT: true,
    };
    const previous = Object.keys(globals).map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)] as const);
    for (const [name, value] of Object.entries(globals)) Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
    const container = win.document.createElement('div');
    win.document.body.appendChild(container);
    root = createRoot(container);
    restore = () => {
      for (const [name, descriptor] of previous) {
        if (descriptor) Object.defineProperty(globalThis, name, descriptor);
        else Reflect.deleteProperty(globalThis, name);
      }
      void win.happyDOM.close();
    };
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    restore();
  });

  const renderFooter = () => act(async () => root.render(
    <I18nProvider><TooltipProvider><Footer /></TooltipProvider></I18nProvider>,
  ));
  const hidden = (selector: string) => document.querySelector<HTMLElement>(selector)?.style.display === 'none';

  test('a wide row shows the model name, its reference and the agent', async () => {
    modelNeeds = 20;
    await renderFooter();
    expect(hidden('[data-fact-model-ref]')).toBe(false);
    expect(document.querySelector('.message-footer__facts')?.textContent).toContain('build');
  });

  test('the agent gives way first, so the reference stays while the name fits', async () => {
    modelNeeds = 60;
    await renderFooter();
    expect(hidden('[data-fact-priority="1"]')).toBe(true);
    expect(hidden('[data-fact-model-ref]')).toBe(false);
  });

  test('a narrow row drops the reference before the model name truncates', async () => {
    modelNeeds = 100;
    await renderFooter();
    expect(hidden('[data-fact-priority="1"]')).toBe(true);
    expect(hidden('[data-fact-model-ref]')).toBe(true);
  });
});
