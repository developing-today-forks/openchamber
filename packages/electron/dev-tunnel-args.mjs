import { z } from 'zod';

import { isSpaceId } from './space-preview.mjs';

const MAX_TUNNEL_PORT = 65535;

const trimmedText = z.string().catch('').transform((value) => value.trim());

const tunnelPort = z.number().catch(0).transform((value) => Math.trunc(value));

const headerRecord = z.unknown().transform((value) => {
  if (value === null || value === undefined) return {};
  if (value.constructor !== Object) return {};
  return value;
});

const tunnelOpenArgs = z.object({
  baseUrl: trimmedText,
  port: tunnelPort,
  spaceId: z.unknown(),
  relay: z.boolean().catch(false),
  targetKey: trimmedText,
  requestHeaders: headerRecord,
  clientToken: z.unknown(),
}).catch({});

const tunnelCloseArgs = z.object({
  baseUrl: trimmedText,
  port: tunnelPort,
  spaceId: z.unknown(),
}).catch({});

function selectHeaderEntries(record) {
  const headers = {};
  for (const [name, value] of Object.entries(record)) {
    if (value === null || value === undefined) continue;
    if (value.constructor !== String || value === '') continue;
    headers[name] = value;
  }
  return headers;
}

function selectClientToken(value) {
  if (value === null || value === undefined) return null;
  if (value.constructor !== String || value === '') return null;
  return value;
}

export function parseDevTunnelOpenArgs(args) {
  const fields = {
    baseUrl: '',
    port: 0,
    spaceId: undefined,
    relay: false,
    targetKey: '',
    requestHeaders: {},
    clientToken: undefined,
    ...tunnelOpenArgs.parse(args),
  };
  if (!fields.baseUrl) throw new Error('baseUrl is required');
  if (!(fields.port > 0 && fields.port <= MAX_TUNNEL_PORT)) throw new Error('A valid port is required');
  const spaceId = fields.spaceId === undefined ? null : fields.spaceId;
  if (spaceId !== null && !isSpaceId(spaceId)) throw new Error('A valid space id is required');
  const headers = selectHeaderEntries(fields.requestHeaders);
  const clientToken = selectClientToken(fields.clientToken);
  if (clientToken !== null) headers.Authorization = `Bearer ${clientToken}`;
  return {
    baseUrl: fields.baseUrl,
    port: fields.port,
    spaceId,
    relay: fields.relay,
    targetKey: fields.targetKey,
    headers,
  };
}

export function parseDevTunnelCloseArgs(args) {
  const fields = {
    baseUrl: '',
    port: 0,
    spaceId: undefined,
    ...tunnelCloseArgs.parse(args),
  };
  if (!fields.baseUrl) return null;
  if (!(fields.port > 0)) return null;
  const spaceId = isSpaceId(fields.spaceId) ? fields.spaceId : null;
  return { baseUrl: fields.baseUrl, port: fields.port, spaceId };
}
