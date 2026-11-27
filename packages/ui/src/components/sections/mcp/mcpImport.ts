import { MCP_PROTOCOLS, type McpCodemodeChoice, type McpDraft, type McpProtocol } from '@/stores/useMcpConfigStore';
import type { JsonValue } from '@/lib/opencode/model';
import { normalizeImportedMcpServerName } from './mcpDraft';

type ImportedMcpTransportType = 'local' | 'remote';

interface ImportedMcpJsonObject {
  [key: string]: JsonValue;
}

interface ImportedMcpServerEntry {
  readonly name: string;
  readonly entry: ImportedMcpJsonObject;
}

interface ImportedMcpTimeouts {
  readonly startup: string;
  readonly catalog: string;
  readonly execution: string;
}

interface ImportedMcpImportOptions {
  readonly fallbackName?: string;
}

interface ApplyImportedMcpOptions {
  readonly isNewServer?: boolean;
}

export interface ImportedMcpResult {
  readonly ok: true;
  readonly name?: string;
  readonly type: ImportedMcpTransportType;
  readonly command: string[];
  readonly url: string;
  readonly environment: Array<{ key: string; value: string }>;
  readonly headers: Array<{ key: string; value: string }>;
  readonly oauthEnabled: boolean;
  readonly oauthClientId: string;
  readonly oauthClientSecret: string;
  readonly oauthScope: string;
  readonly oauthRedirectUri: string;
  readonly oauthCallbackPort: string;
  readonly oauthAuthServerMetadataUrl: string;
  readonly timeoutStartup: string;
  readonly timeoutCatalog: string;
  readonly timeoutExecution: string;
  readonly codemode: McpCodemodeChoice;
  readonly disabled: boolean;
  readonly protocol: McpProtocol;
}

type ImportedMcpError =
  | { readonly ok: false; readonly error: string }
  | { readonly ok: false; readonly error: string; readonly parsed: JsonValue };

export type ImportedMcpOutcome = ImportedMcpResult | ImportedMcpError;

function isObject(value: JsonValue | undefined): value is ImportedMcpJsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringArray(value: JsonValue | undefined): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

function buildError(message: string, parsed?: JsonValue): ImportedMcpError {
  return parsed !== undefined
    ? { ok: false, error: message, parsed }
    : { ok: false, error: message };
}

function buildResult(
  name: string | undefined,
  type: ImportedMcpTransportType,
  raw: ImportedMcpJsonObject,
): ImportedMcpResult {
  const command: string[] = buildCommand(raw);
  const url = typeof raw.url === 'string' ? raw.url.trim() : '';

  const environment = buildEnv(raw, 'env', 'environment');
  const headers = buildEnv(raw, 'headers');

  const oauth = isObject(raw.oauth) ? raw.oauth : null;
  const oauthClientId = readString(oauth, 'client_id', 'clientId');
  const oauthClientSecret = readString(oauth, 'client_secret', 'clientSecret');
  const oauthScope = readString(oauth, 'scope');
  const oauthRedirectUri = readString(oauth, 'redirect_uri', 'redirectUri');
  const oauthCallbackPort = readNumeric(oauth, 'callback_port', 'callbackPort');
  const oauthAuthServerMetadataUrl = readString(oauth, 'auth_server_metadata_url', 'authServerMetadataUrl');
  const oauthEnabled = raw.oauth === false || raw.oauth === null || raw.oauth === undefined
    ? false
    : Boolean(oauth) && Boolean(
      oauthClientId || oauthClientSecret || oauthScope || oauthRedirectUri || oauthCallbackPort || oauthAuthServerMetadataUrl,
    );

  const timeouts = buildTimeouts(raw);

  return {
    ok: true,
    name,
    type,
    command,
    url,
    environment,
    headers,
    oauthEnabled,
    oauthClientId,
    oauthClientSecret,
    oauthScope,
    oauthRedirectUri,
    oauthCallbackPort,
    oauthAuthServerMetadataUrl,
    timeoutStartup: timeouts.startup,
    timeoutCatalog: timeouts.catalog,
    timeoutExecution: timeouts.execution,
    codemode: raw.codemode === true ? 'on' : raw.codemode === false ? 'off' : 'default',
    disabled: buildDisabled(raw),
    protocol: MCP_PROTOCOLS.find((candidate) => candidate === raw.protocol) ?? 'legacy',
  };
}

function readString(source: ImportedMcpJsonObject | null, ...keys: string[]): string {
  if (!source) return '';
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function readNumeric(source: ImportedMcpJsonObject | null, ...keys: string[]): string {
  if (!source) return '';
  for (const key of keys) {
    const parsed = positiveInteger(source[key]);
    if (parsed) return parsed;
  }
  return '';
}

function positiveInteger(value: JsonValue | undefined): string {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return String(Math.floor(value));
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) return String(Math.floor(parsed));
  }
  return '';
}

function buildCommand(raw: ImportedMcpJsonObject): string[] {
  const cmd = raw.command;
  const args = raw.args;

  if (stringArray(cmd) && stringArray(args)) {
    return [...cmd, ...args];
  }
  if (stringArray(cmd)) {
    return cmd;
  }
  if (typeof cmd === 'string' && cmd.trim()) {
    const parts = cmd.trim().split(/\s+/);
    if (stringArray(args)) {
      return [...parts, ...args];
    }
    return parts;
  }
  if (stringArray(args)) {
    return args;
  }

  return [];
}

function buildEnv(
  raw: ImportedMcpJsonObject,
  ...keys: string[]
): Array<{ key: string; value: string }> {
  for (const key of keys) {
    const val = raw[key];
    if (!isObject(val)) continue;

    const entries: Array<{ key: string; value: string }> = [];
    for (const [entryKey, entryValue] of Object.entries(val)) {
      if (entryKey && typeof entryValue === 'string') {
        entries.push({ key: entryKey, value: entryValue });
      }
    }
    if (entries.length > 0) {
      return entries;
    }
  }
  return [];
}

function buildTimeouts(raw: ImportedMcpJsonObject): ImportedMcpTimeouts {
  if (isObject(raw.timeout)) {
    return {
      startup: positiveInteger(raw.timeout.startup),
      catalog: positiveInteger(raw.timeout.catalog),
      execution: positiveInteger(raw.timeout.execution),
    };
  }
  return { startup: '', catalog: '', execution: positiveInteger(raw.timeout) };
}

function buildDisabled(raw: ImportedMcpJsonObject): boolean {
  if (raw.disabled === true) return true;
  if (raw.disabled === false) return false;
  if ('enabled' in raw) return !raw.enabled;
  return false;
}

function extractSingleServer(
  obj: ImportedMcpJsonObject,
): ImportedMcpServerEntry | null {
  const mcpServers = obj.mcpServers;
  if (isObject(mcpServers)) {
    const keys = Object.keys(mcpServers);
    if (keys.length === 1) {
      const name = keys[0];
      if (name === undefined) return null;
      const entry = mcpServers[name];
      if (isObject(entry)) {
        return { name, entry };
      }
    }
    if (keys.length > 1) {
      return null;
    }
  }

  const serverKeys = Object.keys(obj).filter((k) => {
    const v = obj[k];
    return k !== 'mcpServers' && isObject(v);
  });

  if (serverKeys.length === 1) {
    const name = serverKeys[0];
    if (name === undefined) return null;
    const entry = obj[name];
    if (isObject(entry) && isServerConfig(entry)) {
      return { name, entry };
    }
  }

  return null;
}

function isServerConfig(val: ImportedMcpJsonObject): boolean {
  return (
    val.type === 'local' ||
    val.type === 'remote' ||
    Array.isArray(val.command) ||
    typeof val.url === 'string' ||
    Array.isArray(val.args)
  );
}

export function parseImportedMcpSnippet(
  raw: string,
  options?: ImportedMcpImportOptions,
): ImportedMcpOutcome {
  let parsed: JsonValue;
  try {
    const trimmed = raw.trim();
    if (!trimmed) {
      return buildError('No JSON content provided');
    }
    parsed = JSON.parse(trimmed);
  } catch (err) {
    return buildError(
      err instanceof Error ? `Invalid JSON: ${err.message}` : 'Invalid JSON',
    );
  }

  if (!isObject(parsed)) {
    return buildError('Expected a JSON object, not an array or primitive');
  }

  const obj = parsed;

  const mcpServers = obj.mcpServers;
  if (isObject(mcpServers)) {
    const keys = Object.keys(mcpServers);
    if (keys.length === 0) {
      return buildError('mcpServers object is empty', parsed);
    }
    if (keys.length > 1) {
      return buildError(
        'Paste one server at a time. Found ' +
          keys.length +
          ' servers in mcpServers',
        parsed,
      );
    }
    const serverName = keys[0];
    if (serverName === undefined) return buildError('mcpServers object is empty', parsed);
    const entry = mcpServers[serverName];
    if (!isObject(entry)) {
      return buildError('Server entry is not a valid object', parsed);
    }
    return buildResult(serverName, inferType(entry), entry);
  }

  const mcpSection = obj.mcp;
  const mcp = isObject(mcpSection) && isObject(mcpSection.servers)
    ? mcpSection.servers
    : mcpSection;
  if (isObject(mcp)) {
    const keys = Object.keys(mcp);
    if (keys.length === 0) {
      return buildError('mcp object is empty', parsed);
    }
    if (keys.length > 1) {
      return buildError(
        'Paste one server at a time. Found ' +
          keys.length +
          ' servers in mcp',
        parsed,
      );
    }
    const serverName = keys[0];
    if (serverName === undefined) return buildError('mcp object is empty', parsed);
    const entry = mcp[serverName];
    if (!isObject(entry)) {
      return buildError('Server entry in mcp is not a valid object', parsed);
    }
    return buildResult(serverName, inferType(entry), entry);
  }

  const single = extractSingleServer(obj);
  if (single) {
    return buildResult(
      single.name,
      inferType(single.entry),
      single.entry,
    );
  }

  if (isServerConfig(obj)) {
    const type = inferType(obj);
    const name = typeof obj.name === 'string' && obj.name.trim()
      ? obj.name.trim()
      : options?.fallbackName;
    return buildResult(name, type, obj);
  }

  return buildError(
    'No recognizable MCP server configuration found in JSON',
    parsed,
  );
}

function inferType(entry: ImportedMcpJsonObject): ImportedMcpTransportType {
  if (entry.type === 'remote') return 'remote';
  if (entry.type === 'local') return 'local';
  if (typeof entry.url === 'string' && entry.url.trim()) return 'remote';
  if (Array.isArray(entry.command) || typeof entry.command === 'string') return 'local';
  if (Array.isArray(entry.args)) return 'local';
  return 'local';
}

export function applyImportedMcpToDraft(
  result: ImportedMcpResult,
  currentDraft: Partial<McpDraft> & { name?: string },
  options?: ApplyImportedMcpOptions,
): Partial<McpDraft> & { name: string } {
  const isNew = options?.isNewServer ?? false;
  const importedName = result.name ? normalizeImportedMcpServerName(result.name) : undefined;
  const name = isNew && importedName ? importedName : currentDraft.name ?? '';

  const draft: Partial<McpDraft> & { name: string } = {
    ...currentDraft,
    name,
    type: result.type,
    command: result.type === 'local' ? result.command : [],
    url: result.type === 'remote' ? result.url : '',
    environment: result.environment,
    headers: result.type === 'remote' ? result.headers : [],
    oauthEnabled: result.type === 'remote' ? result.oauthEnabled : false,
    oauthClientId: result.type === 'remote' ? result.oauthClientId : '',
    oauthClientSecret: result.type === 'remote' ? result.oauthClientSecret : '',
    oauthScope: result.type === 'remote' ? result.oauthScope : '',
    oauthRedirectUri: result.type === 'remote' ? result.oauthRedirectUri : '',
    oauthCallbackPort: result.type === 'remote' ? result.oauthCallbackPort : '',
    oauthAuthServerMetadataUrl: result.type === 'remote' ? result.oauthAuthServerMetadataUrl : '',
    timeoutStartup: result.type === 'local' ? result.timeoutStartup : '',
    timeoutCatalog: result.timeoutCatalog,
    timeoutExecution: result.timeoutExecution,
    codemode: result.codemode,
    disabled: result.disabled,
    protocol: result.protocol,
  };

  return draft;
}
