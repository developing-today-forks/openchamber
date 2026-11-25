import { describe, expect, it, vi } from 'vitest';

import { createProjectSetupActions, PROJECT_SETUP_ACTION_DEFINITIONS } from './project-setup-actions.js';
import { OPENCHAMBER_CONTROL_ACTION_DEFINITIONS } from './actions.js';
import { OpenChamberControlError } from './error.js';

const personalSetup = () => ({
  setupWorktree: ['bun install'],
  setupWorktreeWait: null,
  teardownWorktree: [],
  projectActions: [{ id: 'dev', name: 'Dev', command: 'bun run dev', icon: null }],
  projectActionsPrimaryId: null,
  draftStarters: [],
});

const sharedSetup = () => ({
  status: 'ok',
  path: '.openchamber/project.json',
  setupWorktree: [],
  setupWorktreeWait: null,
  teardownWorktree: [],
  projectActions: [{ id: 'team-test', name: 'Team test', command: 'bun test', icon: null }],
  draftStarters: [],
  plansDir: null,
});

const makeActions = () => {
  const personal = personalSetup();
  const shared = sharedSetup();
  const merged = () => ({ personal, shared });
  const readProjectSetup = vi.fn(async () => merged());
  const applyPatch = (store, patch) => {
    if ('setupWorktree' in patch) store.setupWorktree = patch.setupWorktree;
    if ('setupWorktreeWait' in patch) store.setupWorktreeWait = patch.setupWorktreeWait;
    if ('teardownWorktree' in patch) store.teardownWorktree = patch.teardownWorktree;
    if ('projectActions' in patch) store.projectActions = patch.projectActions;
    return merged();
  };
  // The fake writers serialize through one promise chain, the way the real
  // writers serialize through the per-project write lock.
  let chain = Promise.resolve();
  const locked = (fn) => (...args) => {
    const run = chain.then(() => fn(...args));
    chain = run.catch(() => {});
    return run;
  };
  const updateProjectSetup = vi.fn(locked(async (_projectId, patch) => applyPatch(personal, patch)));
  const updateSharedProjectSetup = vi.fn(locked(async (_projectId, patch) => applyPatch(shared, patch)));
  const listProjects = vi.fn(async () => [{ id: 'p1', path: '/repo' }]);
  const actions = createProjectSetupActions({ readProjectSetup, updateProjectSetup, updateSharedProjectSetup, listProjects });
  return { actions, readProjectSetup, updateProjectSetup, updateSharedProjectSetup, personal, shared };
};

const expectError = async (promise, statusCode, message) => {
  const error = await promise.catch((e) => e);
  expect(error).toBeInstanceOf(OpenChamberControlError);
  expect(error.statusCode).toBe(statusCode);
  if (message) expect(error.message).toMatch(message);
  return error;
};

describe('projects.setup', () => {
  it('returns the merged setup for a configured project', async () => {
    const { actions, readProjectSetup } = makeActions();
    const result = await actions.execute('projects.setup', { projectId: 'p1' });
    expect(result.projectId).toBe('p1');
    expect(result.setup.personal.setupWorktree).toEqual(['bun install']);
    expect(readProjectSetup).toHaveBeenCalledWith('p1');
  });

  it('refuses an unknown project without reading', async () => {
    const { actions, readProjectSetup } = makeActions();
    await expectError(actions.execute('projects.setup', { projectId: 'nope' }), 404);
    expect(readProjectSetup).not.toHaveBeenCalled();
  });

  it('requires projectId', async () => {
    const { actions } = makeActions();
    await expectError(actions.execute('projects.setup', {}), 400);
  });

  it('registers the read and the four writes with the control tool', () => {
    const names = OPENCHAMBER_CONTROL_ACTION_DEFINITIONS.map((definition) => definition.action);
    const own = ['projects.setup', 'projects.setup.set', 'projects.actions.create', 'projects.actions.update', 'projects.actions.remove'];
    expect(PROJECT_SETUP_ACTION_DEFINITIONS.map((definition) => definition.action)).toEqual(own);
    for (const name of own) expect(names).toContain(name);
  });
});

describe('projects.setup.set', () => {
  it('replaces the personal setup commands through the locked writer and reports the change', async () => {
    const { actions, updateProjectSetup, updateSharedProjectSetup, personal } = makeActions();
    const result = await actions.execute('projects.setup.set', { projectId: 'p1', setupWorktree: ['npm ci', 'npm run build'], setupWorktreeWait: true });
    expect(updateProjectSetup).toHaveBeenCalledWith('p1', { setupWorktree: ['npm ci', 'npm run build'], setupWorktreeWait: true });
    expect(updateSharedProjectSetup).not.toHaveBeenCalled();
    expect(personal.setupWorktree).toEqual(['npm ci', 'npm run build']);
    expect(result.setup.personal.setupWorktree).toEqual(['npm ci', 'npm run build']);
    expect(result.setup.personal.setupWorktreeWait).toBe(true);
    expect(result.change).toMatchObject({ action: 'projects.setup.set', target: 'personal', by: 'agent-tool', fields: ['setupWorktree', 'setupWorktreeWait'] });
    expect(typeof result.change.at).toBe('string');
  });

  it('writes the shared store when setupTarget is shared', async () => {
    const { actions, updateProjectSetup, updateSharedProjectSetup, shared } = makeActions();
    const result = await actions.execute('projects.setup.set', { projectId: 'p1', setupTarget: 'shared', teardownWorktree: ['docker compose down'] });
    expect(updateSharedProjectSetup).toHaveBeenCalledWith('p1', { teardownWorktree: ['docker compose down'] });
    expect(updateProjectSetup).not.toHaveBeenCalled();
    expect(shared.teardownWorktree).toEqual(['docker compose down']);
    expect(result.target).toBe('shared');
  });

  it('refuses an empty or malformed patch without writing', async () => {
    const { actions, updateProjectSetup } = makeActions();
    await expectError(actions.execute('projects.setup.set', { projectId: 'p1' }), 400, /needs setupWorktree/);
    await expectError(actions.execute('projects.setup.set', { projectId: 'p1', setupWorktree: 'npm ci' }), 400, /array of commands/);
    await expectError(actions.execute('projects.setup.set', { projectId: 'p1', setupWorktreeWait: 'yes' }), 400, /boolean/);
    await expectError(actions.execute('projects.setup.set', { projectId: 'p1', setupTarget: 'team', setupWorktree: [] }), 400, /setupTarget/);
    expect(updateProjectSetup).not.toHaveBeenCalled();
  });

  it('surfaces a writer validation refusal as a 400', async () => {
    const failing = vi.fn(async () => { throw new Error('setupWorktree must be an array of commands'); });
    const actions = createProjectSetupActions({
      readProjectSetup: vi.fn(async () => ({ personal: personalSetup(), shared: sharedSetup() })),
      updateProjectSetup: failing,
      updateSharedProjectSetup: failing,
      listProjects: vi.fn(async () => [{ id: 'p1', path: '/repo' }]),
    });
    await expectError(actions.execute('projects.setup.set', { projectId: 'p1', setupWorktree: ['x'] }), 400, /array of commands/);
  });

  it('serializes concurrent writes through the one locked writer, in call order', async () => {
    const { actions, updateProjectSetup, personal } = makeActions();
    const first = actions.execute('projects.setup.set', { projectId: 'p1', setupWorktree: ['first'] });
    const second = actions.execute('projects.setup.set', { projectId: 'p1', setupWorktree: ['second'] });
    await Promise.all([first, second]);
    expect(updateProjectSetup).toHaveBeenCalledTimes(2);
    expect(updateProjectSetup.mock.calls.map(([, patch]) => patch.setupWorktree)).toEqual([['first'], ['second']]);
    expect(personal.setupWorktree).toEqual(['second']);
  });
});

describe('projects.actions writes', () => {
  it('creates an action with an id made from its name', async () => {
    const { actions, personal } = makeActions();
    const result = await actions.execute('projects.actions.create', { projectId: 'p1', projectAction: { name: 'Lint All', command: 'bun run lint' } });
    expect(result.action).toMatchObject({ id: 'lint-all', name: 'Lint All', command: 'bun run lint' });
    expect(personal.projectActions.map((entry) => entry.id)).toEqual(['dev', 'lint-all']);
    expect(result.change).toMatchObject({ action: 'projects.actions.create', target: 'personal', actionId: 'lint-all' });
  });

  it('creates into the shared store when asked, leaving personal alone', async () => {
    const { actions, personal, shared } = makeActions();
    await actions.execute('projects.actions.create', { projectId: 'p1', setupTarget: 'shared', projectAction: { id: 'e2e', name: 'E2E', command: 'bun run e2e' } });
    expect(shared.projectActions.map((entry) => entry.id)).toEqual(['team-test', 'e2e']);
    expect(personal.projectActions.map((entry) => entry.id)).toEqual(['dev']);
  });

  it('refuses a duplicate id and an action without a command', async () => {
    const { actions, updateProjectSetup } = makeActions();
    await expectError(actions.execute('projects.actions.create', { projectId: 'p1', projectAction: { id: 'dev', name: 'Again', command: 'true' } }), 400, /already exists/);
    await expectError(actions.execute('projects.actions.create', { projectId: 'p1', projectAction: { name: 'No command' } }), 400, /name and a command/);
    expect(updateProjectSetup).not.toHaveBeenCalled();
  });

  it('updates only the named fields of an existing action', async () => {
    const { actions, personal } = makeActions();
    const result = await actions.execute('projects.actions.update', { projectId: 'p1', actionId: 'dev', projectAction: { command: 'bun run dev --watch' } });
    expect(result.action).toMatchObject({ id: 'dev', name: 'Dev', command: 'bun run dev --watch' });
    expect(personal.projectActions).toHaveLength(1);
    await expectError(actions.execute('projects.actions.update', { projectId: 'p1', actionId: 'ghost', projectAction: { command: 'x' } }), 404, /No project action/);
  });

  it('removes an action and refuses an unknown one', async () => {
    const { actions, personal } = makeActions();
    const result = await actions.execute('projects.actions.remove', { projectId: 'p1', actionId: 'dev' });
    expect(result.removedActionId).toBe('dev');
    expect(personal.projectActions).toEqual([]);
    await expectError(actions.execute('projects.actions.remove', { projectId: 'p1', actionId: 'dev' }), 404, /No project action/);
  });
});

describe('enterprise mode', () => {
  it('refuses every write and leaves both stores alone, while reads still work', async () => {
    process.env.OPENCHAMBER_ENTERPRISE_MODE = '1';
    try {
      const { actions, updateProjectSetup, updateSharedProjectSetup } = makeActions();
      for (const [action, input] of [
        ['projects.setup.set', { projectId: 'p1', setupWorktree: ['x'] }],
        ['projects.actions.create', { projectId: 'p1', projectAction: { name: 'X', command: 'x' } }],
        ['projects.actions.update', { projectId: 'p1', actionId: 'dev', projectAction: { command: 'x' } }],
        ['projects.actions.remove', { projectId: 'p1', actionId: 'dev' }],
      ]) {
        const error = await expectError(actions.execute(action, input), 403, /enterprise mode/);
        expect(error.code).toBe('enterprise_mode');
      }
      expect(updateProjectSetup).not.toHaveBeenCalled();
      expect(updateSharedProjectSetup).not.toHaveBeenCalled();
      await expect(actions.execute('projects.setup', { projectId: 'p1' })).resolves.toMatchObject({ projectId: 'p1' });
    } finally {
      delete process.env.OPENCHAMBER_ENTERPRISE_MODE;
    }
  });
});
