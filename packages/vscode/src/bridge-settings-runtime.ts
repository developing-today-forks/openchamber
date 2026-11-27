import { OPENCODE_CONFIG_DIR } from './opencodeConfigPaths';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import { BUILT_IN_SKILL_LOCATION, readCappedFileSync, type DiscoveredSkill, type SkillScope, type SkillSource } from './opencodeConfig';
import type { BridgeContext } from './bridge';
import type { JsonValue } from './project-setup';
import { filterPersistableSettingsChanges, withoutSecretSettings } from './settings-registry-gate';
import { renameSyncWithRetry, renameWithRetry } from './bridge-atomic-write';
import { readOpenCodeSkillsPayload } from './opencode-skills-response';
import { createProjectSetupStore } from './bridge-project-setup-runtime';
import { execGit } from './bridge-git-process-runtime';
import { createMagicPromptService, repositoryOfGitResult, workspaceProjectsOf } from './magic-prompts';
import { resolveWorkspaceFolders } from './workspaceResolver';
import {
  buildPreferencesFields,
  flattenPreferences,
  instancePartOf,
  legacySettingsDocumentOf,
  profilePartOf,
  parsePreferencesDocument,
  preferencesFilePathFor,
  seedPreferencesFrom,
  serializePreferencesDocument,
  type PreferenceFields,
  VSCODE_SETTINGS_SURFACE,
} from './settings-files';

type SettingsValue = JsonValue | undefined;
export type SettingsDocument = Record<string, SettingsValue>;

const SETTINGS_KEY = 'openchamber.settings';
const OPENCHAMBER_SHARED_SETTINGS_PATH = path.join(os.homedir(), '.config', 'openchamber', 'settings.json');
const OPENCHAMBER_PREFERENCES_PATH = preferencesFilePathFor(OPENCHAMBER_SHARED_SETTINGS_PATH);
const OPENCHAMBER_MAGIC_PROMPTS_PATH = path.join(os.homedir(), '.config', 'openchamber', 'magic-prompts.json');

// The shared JSON stores this module reads (settings.json, preferences.json)
// are read synchronously on bridge hot paths in a single-threaded extension
// host, so every read goes through the handle-bounded readCappedFileSync
// (opencodeConfig.ts): the file is opened with O_NONBLOCK on POSIX, judged
// regular and within its cap from the handle, and never buffered past the
// cap — a FIFO or an oversized file can neither freeze nor flood the host.
// settings.json carries instance facts and legacy keys (8 MiB matches
// MAX_OPENCHAMBER_SETTINGS_BYTES in opencode.ts and the web reader's cap for
// the same file); preferences.json holds only bounded registry profile fields.
const SHARED_SETTINGS_MAX_BYTES = 8 * 1024 * 1024;
const PREFERENCES_MAX_BYTES = 4 * 1024 * 1024;

const readSharedStoreSync = (filePath: string, maxBytes: number): string =>
  readCappedFileSync(filePath, maxBytes, {
    tooLarge: (target) => new Error(`${target} exceeds the ${maxBytes}-byte limit and was not read`),
    notRegular: (target) => new Error(`${target} is not a regular file and was not read`),
  });

export const projectSetupStore = createProjectSetupStore();

export const magicPrompts = createMagicPromptService({
  globalFilePath: OPENCHAMBER_MAGIC_PROMPTS_PATH,
  sharedFiles: projectSetupStore,
  listProjects: () => workspaceProjectsOf(resolveWorkspaceFolders(vscode.workspace.workspaceFolders ?? [])),
  repositoryOf: async (directory) => {
    const result = await execGit(['worktree', 'list', '--porcelain'], directory, { env: { LC_ALL: 'C', LANGUAGE: '' } });
    return repositoryOfGitResult(result);
  },
});

const isPathInside = (candidatePath: string, parentPath: string): boolean => {
  const relative = path.relative(parentPath, candidatePath);
  return relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative);
};

const findWorktreeRootForSkills = (workingDirectory?: string): string | null => {
  if (!workingDirectory) return null;
  let current = path.resolve(workingDirectory);
  while (true) {
    const gitPath = path.join(current, '.git');
    try {
      const stat = fs.statSync(gitPath);
      if (stat.isFile() || stat.isDirectory()) {
        return current;
      }
    } catch {
      // Continue climbing.
    }
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
};

const getProjectAncestors = (workingDirectory?: string): string[] => {
  if (!workingDirectory) return [];
  const result: string[] = [];
  let current = path.resolve(workingDirectory);
  const stop = findWorktreeRootForSkills(workingDirectory) || current;
  while (true) {
    result.push(current);
    if (current === stop) break;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return result;
};

type SkillScopeAndSource = { scope: SkillScope; source: SkillSource };

const inferSkillScopeAndSourceFromLocation = (location: string, workingDirectory?: string): SkillScopeAndSource => {
  const resolvedPath = path.resolve(location);
  const source: SkillSource = resolvedPath.includes(`${path.sep}.agents${path.sep}skills${path.sep}`)
    ? 'agents'
    : resolvedPath.includes(`${path.sep}.claude${path.sep}skills${path.sep}`)
      ? 'claude'
      : 'opencode';

  const projectAncestors = getProjectAncestors(workingDirectory);
  const isProjectScoped = projectAncestors.some((ancestor) => {
    const candidates = [
      path.join(ancestor, '.opencode'),
      path.join(ancestor, '.claude', 'skills'),
      path.join(ancestor, '.agents', 'skills'),
    ];
    return candidates.some((candidate) => isPathInside(resolvedPath, candidate));
  });

  if (isProjectScoped) {
    return { scope: 'project', source };
  }

  const home = os.homedir();
  const userRoots = [
    OPENCODE_CONFIG_DIR,
    path.join(home, '.opencode'),
    path.join(home, '.claude', 'skills'),
    path.join(home, '.agents', 'skills'),
    process.env.OPENCODE_CONFIG_DIR ? path.resolve(process.env.OPENCODE_CONFIG_DIR) : null,
  ].filter((value): value is string => Boolean(value));

  if (userRoots.some((root) => isPathInside(resolvedPath, root))) {
    return { scope: 'user', source };
  }

  return { scope: 'user', source };
};

export const fetchOpenCodeSkillsFromApi = async (
  ctx: BridgeContext | undefined,
  workingDirectory?: string,
): Promise<DiscoveredSkill[] | null> => {
  const apiUrl = ctx?.manager?.getApiUrl();
  if (!apiUrl) {
    return null;
  }

  try {
    const url = new URL('/api/skill', apiUrl);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(workingDirectory ? { 'x-opencode-directory': encodeURIComponent(workingDirectory) } : {}),
        ...(ctx?.manager?.getOpenCodeAuthHeaders() || {}),
      },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = await readOpenCodeSkillsPayload(response);
    const skills = payload?.data;
    if (!Array.isArray(skills)) {
      return null;
    }

    return skills
      .map((item) => {
        const name = typeof item?.name === 'string' ? item.name.trim() : '';
        const rawLocation = typeof item?.path === 'string' ? item.path : (typeof item?.location === 'string' ? item.location : '');
        const location = rawLocation.startsWith('/builtin/') || rawLocation.startsWith('skill://') ? BUILT_IN_SKILL_LOCATION : rawLocation;
        const description = typeof item?.description === 'string' ? item.description : '';
        const content = typeof item?.content === 'string' ? item.content : '';
        if (!name || !location) {
          return null;
        }
        if (location === BUILT_IN_SKILL_LOCATION) {
          return {
            id: String(item?.id || name),
            name,
            path: location,
            scope: 'user',
            source: 'opencode',
            description,
            content,
          } as DiscoveredSkill;
        }
        const inferred = inferSkillScopeAndSourceFromLocation(location, workingDirectory);
        return {
          name,
          path: location,
          scope: inferred.scope,
          source: inferred.source,
          description,
          content,
        } as DiscoveredSkill;
      })
      .filter((item): item is DiscoveredSkill => item !== null);
  } catch {
    return null;
  }
};

const readSettingsJsonFromDisk = (): SettingsDocument => {
  try {
    const raw = readSharedStoreSync(OPENCHAMBER_SHARED_SETTINGS_PATH, SHARED_SETTINGS_MAX_BYTES);
    // SAFETY: JSON.parse returns untyped data; the check below keeps only a plain object.
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      // SAFETY: a non-array object parsed from JSON is a string-keyed dictionary of JSON values.
      return parsed as SettingsDocument;
    }
    return {};
  } catch {
    return {};
  }
};

type PreferencesReadResult =
  | { status: 'ok'; fields: PreferenceFields }
  | { status: 'missing' }
  | { status: 'unreadable'; reason: string };

let preferencesUnavailable = false;
let preferencesUnavailableLogged = false;

const readPreferencesFromDisk = (): PreferencesReadResult => {
  let result: PreferencesReadResult;
  try {
    const parsed = parsePreferencesDocument(readSharedStoreSync(OPENCHAMBER_PREFERENCES_PATH, PREFERENCES_MAX_BYTES));
    result = parsed.ok ? { status: 'ok', fields: parsed.fields } : { status: 'unreadable', reason: parsed.reason };
  } catch (error) {
    // SAFETY: fs errors carry a `code` string; anything else is reported by message.
    const code = (error as NodeJS.ErrnoException | null)?.code;
    result = code === 'ENOENT'
      ? { status: 'missing' }
      : { status: 'unreadable', reason: error instanceof Error ? error.message : String(error) };
  }

  if (result.status === 'unreadable') {
    preferencesUnavailable = true;
    if (!preferencesUnavailableLogged) {
      preferencesUnavailableLogged = true;
      console.warn(`[OpenChamber] ${OPENCHAMBER_PREFERENCES_PATH} could not be read (${result.reason}); profile settings are unavailable until the file is fixed or removed.`);
    }
  } else {
    preferencesUnavailable = false;
  }
  return result;
};

const writeJsonAtomic = async (filePath: string, text: string): Promise<void> => {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.tmp-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    await fs.promises.writeFile(tmp, text, 'utf8');
    await renameWithRetry(tmp, filePath, (from, to) => fs.promises.rename(from, to));
  } catch (error) {
    await fs.promises.rm(tmp, { force: true }).catch(() => {});
    throw error;
  }
};

const writeJsonAtomicSync = (filePath: string, text: string): void => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmp = `${filePath}.tmp-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    fs.writeFileSync(tmp, text, 'utf8');
    renameSyncWithRetry(tmp, filePath, (from, to) => fs.renameSync(from, to));
  } catch (error) {
    try {
      fs.rmSync(tmp, { force: true });
    } catch {
      // Nothing more to clean up.
    }
    throw error;
  }
};

const readSharedSettingsFromDisk = () => {
  const settings = readSettingsJsonFromDisk();
  let preferences = readPreferencesFromDisk();
  if (preferences.status === 'missing') {
    const seeded = seedPreferencesFrom(stripDerived(settings), Date.now());
    try {
      writeJsonAtomicSync(OPENCHAMBER_PREFERENCES_PATH, serializePreferencesDocument(seeded));
    } catch (error) {
      console.warn('[OpenChamber] Failed to seed preferences.json:', error instanceof Error ? error.message : String(error));
    }
    preferences = { status: 'ok', fields: seeded };
  }
  if (preferences.status !== 'ok') {
    return settings;
  }
  // SAFETY: flattened preference values come from parsePreferencesDocument's JSON.parse
  // or from settings documents this module wrote, so each value is a settings value.
  return { ...settings, ...(flattenPreferences(preferences.fields, VSCODE_SETTINGS_SURFACE) as SettingsDocument) } satisfies SettingsDocument;
};

const writeSharedSettingsToDisk = async (
  document: SettingsDocument,
  changedKeys: Iterable<string> | null = null,
): Promise<void> => {
  const preferences = readPreferencesFromDisk();
  if (preferencesUnavailable) {
    console.warn('[OpenChamber] preferences.json is unreadable; profile settings were not saved.');
    const onDisk = readSettingsJsonFromDisk();
    await writeJsonAtomic(OPENCHAMBER_SHARED_SETTINGS_PATH, JSON.stringify({
      ...instancePartOf(document),
      ...profilePartOf(onDisk),
    }, null, 2));
    return;
  }
  const previousFields = preferences.status === 'ok' ? preferences.fields : {};
  const nextFields = buildPreferencesFields(previousFields, document, Date.now(), {
    surface: VSCODE_SETTINGS_SURFACE,
    changedKeys,
  });
  await writeJsonAtomic(OPENCHAMBER_PREFERENCES_PATH, serializePreferencesDocument(nextFields));
  await writeJsonAtomic(OPENCHAMBER_SHARED_SETTINGS_PATH, JSON.stringify(legacySettingsDocumentOf(document, nextFields), null, 2));
};

const DERIVED_FIELDS = new Set(['themeVariant', 'lastDirectory']);

const stripDerived = (source: SettingsDocument) => {
  const next = { ...source } satisfies SettingsDocument;
  for (const key of DERIVED_FIELDS) {
    delete next[key];
  }
  return next;
};

let eagerMigrationAttempted = false;

const readPersistedSettings = (ctx?: BridgeContext) => {
  const fromGlobalState = stripDerived(
    ctx?.context?.globalState.get<SettingsDocument>(SETTINGS_KEY) || {},
  );
  const fromDisk = stripDerived(readSharedSettingsFromDisk());

  if (!eagerMigrationAttempted) {
    eagerMigrationAttempted = true;
    const missingFromDisk: SettingsDocument = {};
    for (const [key, value] of Object.entries(fromGlobalState)) {
      if (!(key in fromDisk)) {
        missingFromDisk[key] = value;
      }
    }
    if (Object.keys(missingFromDisk).length > 0) {
      void writeSharedSettingsToDisk({ ...fromDisk, ...missingFromDisk }).catch((error: Error) => {
        console.warn('[OpenChamber] Failed to migrate settings from globalState:', error instanceof Error ? error.message : String(error));
      });
    }
  }

  return { ...fromGlobalState, ...fromDisk } satisfies SettingsDocument;
};

export const readSettings = (ctx?: BridgeContext) => {
  // SAFETY: withoutSecretSettings only drops keys from the settings document it is
  // given, so the entries it returns keep that document's value contract.
  const persisted = withoutSecretSettings(readPersistedSettings(ctx)) as SettingsDocument;
  const persistedOpencodeBinary =
    typeof persisted.opencodeBinary === 'string' ? String(persisted.opencodeBinary).trim() : '';
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
  const themeVariant =
    vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Light ||
    vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.HighContrastLight
      ? 'light'
      : 'dark';

  return {
    ...persisted,
    themeVariant,
    lastDirectory: workspaceFolder,
    opencodeBinary: persistedOpencodeBinary || undefined,
  } satisfies SettingsDocument;
};

export const persistSettings = async (changes: SettingsDocument, ctx?: BridgeContext): Promise<SettingsDocument> => {
  const current = readSettings(ctx);
  // SAFETY: filterPersistableSettingsChanges only drops keys from the settings
  // document it is given, so the entries it returns keep that document's value contract.
  const restChanges = filterPersistableSettingsChanges(stripDerived({ ...(changes || {}) })) as SettingsDocument;

  const keysToClear = new Set<string>();

  for (const key of ['defaultModel', 'defaultVariant', 'defaultAgent', 'defaultGitIdentityId', 'opencodeBinary', 'smallModelOverride', 'smallModelVariant', 'walkthroughModelOverride', 'walkthroughModelVariant']) {
    const value = restChanges[key];
    if (typeof value === 'string' && value.trim().length === 0) {
      keysToClear.add(key);
      delete restChanges[key];
    }
  }

  if ('smallModelUseDefault' in restChanges && typeof restChanges.smallModelUseDefault !== 'boolean') {
    delete restChanges.smallModelUseDefault;
  }

  if ('sessionRecapEnabled' in restChanges && typeof restChanges.sessionRecapEnabled !== 'boolean') {
    delete restChanges.sessionRecapEnabled;
  }

  if ('sessionSuggestionEnabled' in restChanges && typeof restChanges.sessionSuggestionEnabled !== 'boolean') {
    delete restChanges.sessionSuggestionEnabled;
  }

  if ('sessionWorkEnabled' in restChanges && typeof restChanges.sessionWorkEnabled !== 'boolean') {
    delete restChanges.sessionWorkEnabled;
  }

  if ('sessionGoalEnabled' in restChanges && typeof restChanges.sessionGoalEnabled !== 'boolean') {
    delete restChanges.sessionGoalEnabled;
  }

  if ('sessionGoalDefaultBudgetEnabled' in restChanges && typeof restChanges.sessionGoalDefaultBudgetEnabled !== 'boolean') {
    delete restChanges.sessionGoalDefaultBudgetEnabled;
  }

  if ('sessionGoalDefaultBudget' in restChanges) {
    const budget = restChanges.sessionGoalDefaultBudget;
    if (typeof budget !== 'number' || !Number.isFinite(budget) || budget <= 0) {
      delete restChanges.sessionGoalDefaultBudget;
    }
  }

  if (typeof restChanges.opencodeBinary === 'string') {
    restChanges.opencodeBinary = restChanges.opencodeBinary.trim();
  }

  const persistedCurrent = readPersistedSettings(ctx);
  const persistable = { ...persistedCurrent, ...restChanges } satisfies SettingsDocument;
  for (const key of keysToClear) {
    delete persistable[key];
  }

  await writeSharedSettingsToDisk(persistable, [...Object.keys(restChanges), ...keysToClear]);
  await ctx?.context?.globalState.update(SETTINGS_KEY, persistable);

  return {
    // SAFETY: withoutSecretSettings only drops keys from the settings document it is
    // given, so the entries it returns keep that document's value contract.
    ...(withoutSecretSettings(persistable) as SettingsDocument),
    themeVariant: current.themeVariant,
    lastDirectory: current.lastDirectory,
    opencodeBinary:
      typeof persistable.opencodeBinary === 'string' && persistable.opencodeBinary.length > 0
        ? persistable.opencodeBinary
        : undefined,
  };
};
