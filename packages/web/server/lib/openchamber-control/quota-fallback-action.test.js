import { describe, expect, it, vi } from 'vitest';

import { assembleFallbackActions, createQuotaFallbackAction } from './quota-fallback-action.js';

const catalog = [
  { id: 'claude-haiku-4-5', providerID: 'anthropic', name: 'Claude Haiku 4.5', cost: { input: 1, output: 5 } },
  { id: 'claude-sonnet-4-5', providerID: 'anthropic', name: 'Claude Sonnet 4.5', cost: { input: 3, output: 15 } },
  { id: 'gpt-5-codex', providerID: 'openai', name: 'GPT-5 Codex', cost: { input: 1.25, output: 10 } },
];

const tiers = [
  { tier: 'cheap', model: 'anthropic/claude-haiku-4-5' },
  { tier: 'standard', model: 'anthropic/claude-sonnet-4-5' },
  { tier: 'frontier', model: 'openai/gpt-5-codex' },
];

// The only other provider's models are assigned to other tiers here:
// openai serves frontier only, so there is no switch target at standard.
const switchCatalog = [
  ...catalog,
  { id: 'gpt-5-mini', providerID: 'openai', name: 'GPT-5 Mini', cost: { input: 1, output: 4 } },
];

const tiersWithSwitch = [...tiers, { tier: 'standard', model: 'openai/gpt-5-mini' }];

describe('assembleFallbackActions', () => {
  it('derives one action per kind from the catalog and the candidates', () => {
    const { current, actions } = assembleFallbackActions({
      tiers: tiersWithSwitch,
      catalog: switchCatalog,
      currentTier: 'standard',
      resetAt: '18:00 UTC',
    });
    expect(current).toEqual({ provider: 'anthropic', tier: 'standard' });
    expect(actions).toEqual([
      expect.objectContaining({ kind: 'switch-provider', provider: 'openai', tier: 'standard', detail: expect.stringContaining('openai/gpt-5-mini') }),
      expect.objectContaining({ kind: 'downgrade-tier', provider: 'openai', tier: 'frontier' }),
      expect.objectContaining({ kind: 'wait-for-reset', provider: 'anthropic', tier: 'standard', detail: 'Quota resets at 18:00 UTC' }),
    ]);
  });

  it('does not offer a provider at the current tier when its models serve only other tiers', () => {
    expect(() => assembleFallbackActions({ tiers, catalog, currentTier: 'standard' })).toThrow(
      /no other provider serves the 'standard' tier/,
    );
  });

  it('picks the nearest cheaper tier as the downgrade, not the cheapest', () => {
    const wider = [
      ...catalog,
      { id: 'claude-opus-4-5', providerID: 'anthropic', name: 'Claude Opus 4.5', cost: { input: 5, output: 25 } },
      { id: 'gpt-5-max', providerID: 'openai', name: 'GPT-5 Max', cost: { input: 4, output: 20 } },
    ];
    const candidates = [
      ...tiers,
      { tier: 'max', model: 'anthropic/claude-opus-4-5' },
      { tier: 'max', model: 'openai/gpt-5-max' },
    ];
    const { actions } = assembleFallbackActions({ tiers: candidates, catalog: wider, currentTier: 'max' });
    expect(actions.find((action) => action.kind === 'switch-provider')).toEqual(
      expect.objectContaining({ provider: 'openai', tier: 'max', detail: expect.stringContaining('openai/gpt-5-max') }),
    );
    expect(actions.find((action) => action.kind === 'downgrade-tier')).toEqual(
      expect.objectContaining({ tier: 'standard', provider: 'anthropic' }),
    );
  });

  it('names each unassemblable fallback instead of emitting a dead tile', () => {
    expect(() => assembleFallbackActions({ tiers, catalog, currentTier: 'nope' })).toThrow(/not one of the tier candidates/);
    expect(() => assembleFallbackActions({ tiers, catalog, currentTier: 'standard', currentProvider: 'openai' })).toThrow(/does not match/);
    const singleProvider = catalog.filter((model) => model.providerID === 'anthropic');
    expect(() => assembleFallbackActions({ tiers: tiers.slice(0, 2), catalog: singleProvider, currentTier: 'standard' })).toThrow(/no other provider/);
    const cheapSwitchTiers = [
      { tier: 'cheap', model: 'anthropic/claude-haiku-4-5' },
      { tier: 'cheap', model: 'openai/gpt-5-mini' },
      { tier: 'standard', model: 'anthropic/claude-sonnet-4-5' },
    ];
    expect(() => assembleFallbackActions({ tiers: cheapSwitchTiers, catalog: switchCatalog, currentTier: 'cheap' })).toThrow(/no cheaper tier/);
  });
});

describe('createQuotaFallbackAction', () => {
  it('refuses a disabled render tool before reading the catalog', async () => {
    // Oracle: render.page's disabled error and no catalog access while disabled.
    const listModels = vi.fn(async () => switchCatalog);
    const action = createQuotaFallbackAction({ isEnabled: async () => false, listModels });
    await expect(action({ tiers: tiersWithSwitch, currentTier: 'standard' }, {})).rejects.toMatchObject({
      message: 'The render tool is turned off in OpenChamber settings',
      statusCode: 403,
    });
    expect(listModels).not.toHaveBeenCalled();
  });

  it('builds the quota card for render.page and names the follow-up call', async () => {
    const action = createQuotaFallbackAction({ isEnabled: async () => true, listModels: async () => switchCatalog });
    const result = await action(
      { tiers: tiersWithSwitch, currentTier: 'standard', message: 'Anthropic quota exhausted for this window' },
      { sessionId: 's1', callId: 'c1' },
    );
    expect(result.title).toBe('Quota Limit Reached');
    expect(result.html).toContain('Quota Limit Reached');
    expect(result.html).toContain('Anthropic quota exhausted for this window');
    expect(result.html).toContain('switch-provider');
    expect(result.html).toContain('&quot;action&quot;:&quot;fallback&quot;');
    expect(result.actions).toHaveLength(3);
    expect(result.note).toContain('render.page');
    expect(result.note).toContain('awaitAnswer');
  });
});
