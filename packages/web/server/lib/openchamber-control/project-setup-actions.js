/**
 * Project setup for the `openchamber` control tool: what Settings → Projects
 * shows for a project's worktree setup commands, project actions, draft
 * starters and shared plans folder, merged from the personal file
 * (`~/.config/openchamber/projects/<id>.json`) and the team's
 * `<repo>/.openchamber/project.json`, with each source's status — and, since
 * the 2026-11-23 decision on #152 (issue #2580), the write counterpart:
 * agents may set setup commands and create, update and remove project
 * actions.
 *
 * Setup commands and project actions run when a worktree is made or an
 * action is clicked, outside OpenCode's permission rules; the decision was
 * that these writes are the point of the agent tool and OpenCode's
 * permission rules still govern execution. Two guards stay:
 * - Enterprise mode refuses every write here, the same fail-closed rule
 *   `opencode.config.set` follows: no agent config writes there.
 * - Every write goes through the project config runtime's writers, which
 *   hold the per-project write lock PR #194 established, validate the patch
 *   the way the Settings routes do, and return the merged setup the read
 *   answers with — so a write result shows exactly what took effect.
 * Each write result also carries a `change` record (which action, which
 * store, by whom, when) so the mutation is auditable from the result alone.
 *
 * A write names its store with `setupTarget`: `personal` (default) writes
 * the user's own project file; `shared` writes the repository's committed
 * `.openchamber/project.json`. Action create/update/remove read the target
 * store's current actions inside the project write lock (the atomic mutate
 * writers, #2605) and write the computed list back through the locked
 * writer, the same whole-list replace the Settings UI saves with.
 *
 * Dependencies (`createProjectSetupActions(deps)`), from packages/web/server/runtime.ts:
 * - `readProjectSetup` — `projectConfigRuntime.readProjectSetup`, the read
 *   `GET /api/projects/:projectId/config` answers with.
 * - `updateProjectSetup` — `projectConfigRuntime.updateProjectSetup`, the
 *   personal store writer.
 * - `updateSharedProjectSetup` — `projectConfigRuntime.updateSharedProjectSetup`,
 *   the shared store writer.
 * - `mutateProjectSetupActions` / `mutateSharedProjectSetupActions` —
 *   `projectConfigRuntime.mutate*ProjectSetupActions`, the atomic
 *   project-actions writers: they read the current list and compute the
 *   replacement inside the per-project write lock (#2605), so concurrent
 *   create/update/remove calls cannot lose a write. When an embedder does
 *   not wire them, the actions fall back to the whole-list writers.
 * - `listProjects` — `listConfiguredProjects`; the id must name a configured project.
 */
import { asNonEmptyString, isPlainObject } from '../shared/guards.js';
import { isEnterpriseMode } from '../enterprise-mode.js';
import { isProjectSetupValidationError, sanitizeProjectActions } from '../projects/project-setup.js';
import { OpenChamberControlError } from './error.js';

export const PROJECT_SETUP_ACTION_DEFINITIONS = Object.freeze([
  { action: 'projects.setup', title: 'Show a project\'s setup', description: 'Show projectId\'s setup as Settings → Projects shows it: worktree setup commands and whether a new worktree waits for them, project actions, draft starters, and the shared plans folder, merged from the personal file and the repository\'s .openchamber/project.json (each entry names its source; shared carries the file\'s status). Change it with projects.setup.set and projects.actions.create, projects.actions.update and projects.actions.remove' },
  { action: 'projects.setup.set', title: 'Set a project\'s setup commands', description: 'Replace projectId\'s worktree setup commands (setupWorktree), whether a new worktree waits for them (setupWorktreeWait), and/or its teardown commands (teardownWorktree); pass only what changes. setupTarget personal (default) writes the user\'s own project file, shared writes the repository\'s committed .openchamber/project.json. The change is in the project configuration at once and takes effect on the next worktree setup or teardown. Refused in enterprise mode' },
  { action: 'projects.actions.create', title: 'Add a project action', description: 'Add projectAction (name and command; id optional, made from the name) to projectId\'s project actions in the setupTarget store (personal by default, shared for the repository file). The new action shows in the actions menu and runs from the next click or actions.run. Refused in enterprise mode' },
  { action: 'projects.actions.update', title: 'Change a project action', description: 'Change the project action actionId in projectId\'s setupTarget store: projectAction carries the fields to change (name, command, icon, openUrl, autoOpenUrl, platforms, runIn); the rest stay as they are. Refused in enterprise mode' },
  { action: 'projects.actions.remove', title: 'Remove a project action', description: 'Remove the project action actionId from projectId\'s setupTarget store (personal by default, shared for the repository file). Only the saved action goes; a run already going keeps going. Refused in enterprise mode' },
]);

export const PROJECT_SETUP_PARAMETERS = {
  setupWorktree: { type: 'array', items: { type: 'string' }, description: 'projects.setup.set: the whole list of worktree setup commands, replacing the current ones; empty clears them' },
  teardownWorktree: { type: 'array', items: { type: 'string' }, description: 'projects.setup.set: the whole list of worktree teardown commands, replacing the current ones; empty clears them' },
  setupWorktreeWait: { type: 'boolean', description: 'projects.setup.set: whether making a worktree waits for the setup commands to finish' },
  setupTarget: { type: 'string', enum: ['personal', 'shared'], description: 'projects.setup.set and projects.actions.create/update/remove: which store to write — personal (default), the user\'s own project file, or shared, the repository\'s committed .openchamber/project.json' },
  projectAction: { type: 'object', description: 'projects.actions.create: the action to add — name and command, plus optional id (made from the name when omitted), icon, openUrl, autoOpenUrl, platforms (macos, windows, linux) and runIn (parent). projects.actions.update: the fields to change' },
  actionId: { type: 'string', description: 'projects.actions.update and projects.actions.remove: the id of the project action, from projects.setup' },
};

const PROJECT_SETUP_ACTIONS = PROJECT_SETUP_ACTION_DEFINITIONS.map(({ action }) => action);

export const createProjectSetupActions = ({ readProjectSetup, updateProjectSetup, updateSharedProjectSetup, mutateProjectSetupActions, mutateSharedProjectSetupActions, listProjects }) => {
  const requireProject = async (input) => {
    const projectId = asNonEmptyString(input.projectId);
    if (!projectId) throw new OpenChamberControlError('projectId is required; projects.list lists them', 400);
    const known = (await listProjects()).some((project) => project.id === projectId);
    if (!known) throw new OpenChamberControlError(`Unknown project: ${projectId}`, 404);
    return projectId;
  };

  const projectsSetup = async (input) => {
    const projectId = await requireProject(input);
    return { projectId, setup: await readProjectSetup(projectId) };
  };

  // Setup commands and project actions are configuration an agent can turn
  // into command execution, which enterprise mode refuses. Fail closed: no
  // agent writes to them there, reads unaffected.
  const refuseInEnterpriseMode = () => {
    if (isEnterpriseMode()) {
      throw new OpenChamberControlError('Changing project setup and project actions from the agent tool is not available in enterprise mode', 403, { code: 'enterprise_mode' });
    }
  };

  const targetOf = (input) => {
    const target = input.setupTarget === undefined ? 'personal' : asNonEmptyString(input.setupTarget);
    if (target !== 'personal' && target !== 'shared') {
      throw new OpenChamberControlError('setupTarget must be "personal" or "shared"', 400);
    }
    return target;
  };

  const writerFor = (target) => {
    const write = target === 'shared' ? updateSharedProjectSetup : updateProjectSetup;
    if (typeof write !== 'function') throw new OpenChamberControlError('Project setup writes are not available in this server', 501);
    return write;
  };

  // The runtime writers validate like the Settings routes and throw plain
  // errors for a patch they refuse; surface those as the 400 they are
  // instead of a server error.
  const writeSetup = async (target, projectId, patch) => {
    try {
      return await writerFor(target)(projectId, patch);
    } catch (error) {
      if (isProjectSetupValidationError(error)) throw new OpenChamberControlError(error.message, 400);
      throw error;
    }
  };

  // Project-actions create/update/remove must be linearizable (#2605): the
  // current list has to be read and the replacement computed inside the
  // per-project write lock, not read here and written back whole — two
  // concurrent calls starting from the same base list would otherwise each
  // write back only their own change and one write would silently vanish.
  // The runtime's mutate writers hold that lock across read + compute +
  // write. Embedders that only wire the whole-list writers keep the old
  // read-modify-write path as a fallback.
  const mutateActions = async (target, projectId, mutate) => {
    const mutateFn = target === 'shared' ? mutateSharedProjectSetupActions : mutateProjectSetupActions;
    if (typeof mutateFn === 'function') {
      try {
        return await mutateFn(projectId, mutate);
      } catch (error) {
        if (error instanceof OpenChamberControlError) throw error;
        if (isProjectSetupValidationError(error)) throw new OpenChamberControlError(error.message, 400);
        throw error;
      }
    }
    const current = storeActionsOf(await readProjectSetup(projectId), target);
    const next = await mutate(current);
    return writeSetup(target, projectId, { projectActions: next });
  };

  const changeOf = (action, target, detail) => ({ action, target, by: 'agent-tool', at: new Date().toISOString(), ...detail });

  const storeActionsOf = (setup, target) => {
    const entries = target === 'shared' ? setup?.shared?.projectActions : setup?.personal?.projectActions;
    return Array.isArray(entries) ? entries : [];
  };

  const setupSet = async (input) => {
    refuseInEnterpriseMode();
    const projectId = await requireProject(input);
    const target = targetOf(input);
    const patch = {};
    if (input.setupWorktree !== undefined) {
      if (!Array.isArray(input.setupWorktree)) throw new OpenChamberControlError('setupWorktree must be an array of commands', 400);
      patch.setupWorktree = input.setupWorktree;
    }
    if (input.teardownWorktree !== undefined) {
      if (!Array.isArray(input.teardownWorktree)) throw new OpenChamberControlError('teardownWorktree must be an array of commands', 400);
      patch.teardownWorktree = input.teardownWorktree;
    }
    if (input.setupWorktreeWait !== undefined) {
      if (typeof input.setupWorktreeWait !== 'boolean') throw new OpenChamberControlError('setupWorktreeWait must be a boolean', 400);
      patch.setupWorktreeWait = input.setupWorktreeWait;
    }
    const fields = Object.keys(patch);
    if (fields.length === 0) throw new OpenChamberControlError('projects.setup.set needs setupWorktree, setupWorktreeWait or teardownWorktree', 400);
    const setup = await writeSetup(target, projectId, patch);
    return { projectId, target, setup, change: changeOf('projects.setup.set', target, { fields }) };
  };

  const actionIdFromName = (name, taken) => {
    const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'action';
    let id = base;
    for (let suffix = 2; taken.has(id); suffix += 1) id = `${base}-${suffix}`;
    return id;
  };

  const actionsCreate = async (input) => {
    refuseInEnterpriseMode();
    const projectId = await requireProject(input);
    const target = targetOf(input);
    if (!isPlainObject(input.projectAction)) throw new OpenChamberControlError('projectAction is required: an object with name and command', 400);
    let created;
    const setup = await mutateActions(target, projectId, (current) => {
      const taken = new Set(current.map((entry) => entry.id));
      const candidate = { ...input.projectAction };
      if (asNonEmptyString(candidate.id) && taken.has(candidate.id)) {
        throw new OpenChamberControlError(`A project action with id ${candidate.id} already exists in the ${target} setup; change it with projects.actions.update`, 400);
      }
      if (!asNonEmptyString(candidate.id)) candidate.id = actionIdFromName(asNonEmptyString(candidate.name) ?? '', taken);
      const [sanitized] = sanitizeProjectActions([candidate]);
      if (!sanitized) throw new OpenChamberControlError('projectAction needs a name and a command', 400);
      created = sanitized;
      return [...current, sanitized];
    });
    return { projectId, target, action: created, setup, change: changeOf('projects.actions.create', target, { actionId: created.id }) };
  };

  const actionsUpdate = async (input) => {
    refuseInEnterpriseMode();
    const projectId = await requireProject(input);
    const target = targetOf(input);
    const actionId = asNonEmptyString(input.actionId) ?? asNonEmptyString(isPlainObject(input.projectAction) ? input.projectAction.id : undefined);
    if (!actionId) throw new OpenChamberControlError('actionId is required for projects.actions.update; projects.setup lists them', 400);
    if (!isPlainObject(input.projectAction)) throw new OpenChamberControlError('projectAction is required: an object with the fields to change', 400);
    let updated;
    const setup = await mutateActions(target, projectId, (current) => {
      const index = current.findIndex((entry) => entry.id === actionId);
      if (index < 0) throw new OpenChamberControlError(`No project action with id ${actionId} in the ${target} setup`, 404);
      const [sanitized] = sanitizeProjectActions([{ ...current[index], ...input.projectAction, id: actionId }]);
      if (!sanitized) throw new OpenChamberControlError('The changed project action needs a name and a command', 400);
      updated = sanitized;
      const next = [...current];
      next[index] = sanitized;
      return next;
    });
    return { projectId, target, action: updated, setup, change: changeOf('projects.actions.update', target, { actionId }) };
  };

  const actionsRemove = async (input) => {
    refuseInEnterpriseMode();
    const projectId = await requireProject(input);
    const target = targetOf(input);
    const actionId = asNonEmptyString(input.actionId);
    if (!actionId) throw new OpenChamberControlError('actionId is required for projects.actions.remove; projects.setup lists them', 400);
    const setup = await mutateActions(target, projectId, (current) => {
      if (!current.some((entry) => entry.id === actionId)) {
        throw new OpenChamberControlError(`No project action with id ${actionId} in the ${target} setup`, 404);
      }
      return current.filter((entry) => entry.id !== actionId);
    });
    return { projectId, target, removedActionId: actionId, setup, change: changeOf('projects.actions.remove', target, { actionId }) };
  };

  const execute = async (action, input = {}) => {
    if (action === 'projects.setup') return projectsSetup(input);
    if (action === 'projects.setup.set') return setupSet(input);
    if (action === 'projects.actions.create') return actionsCreate(input);
    if (action === 'projects.actions.update') return actionsUpdate(input);
    if (action === 'projects.actions.remove') return actionsRemove(input);
    throw new OpenChamberControlError(`Unsupported project setup action: ${action || 'missing'}`, 400);
  };

  return { actions: PROJECT_SETUP_ACTIONS, execute };
};
