import type { SettingsSearchItem } from './search';

export const SESSION_ASSIST_SEARCH_ITEMS: readonly SettingsSearchItem[] = [
  {
    id: 'chat.session-recap',
    page: 'chat',
    titleKey: 'settings.openchamber.visual.field.sessionRecap',
    keywords: ['recap', 'assist', 'small model', 'summary'],
  },
  {
    id: 'chat.session-hover-summary',
    page: 'chat',
    titleKey: 'settings.openchamber.visual.field.sessionHoverSummary',
    descriptionKey: 'settings.openchamber.visual.field.sessionHoverSummaryInfo',
    keywords: ['summary', 'summarize', 'hover', 'sidebar', 'small model', 'done', 'left'],
    isAvailable: (ctx) => !ctx.isVSCode,
  },
  {
    id: 'chat.session-assistance',
    page: 'chat',
    titleKey: 'settings.openchamber.visual.section.sessionAssistance',
    keywords: ['recap', 'suggestion', 'subagent'],
  },
  {
    id: 'chat.session-suggestion',
    page: 'chat',
    titleKey: 'settings.openchamber.visual.field.sessionSuggestion',
    keywords: ['suggestion', 'assist', 'small model', 'follow up'],
  },
];
