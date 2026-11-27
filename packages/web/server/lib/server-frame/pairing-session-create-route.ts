import type { Application, ExpressFactory, NextFunction, Request, Response } from '../shared/http-contracts.js';
import type { PairingInput } from '../client-auth/contracts.js';
import { isClientRouteScopeList } from '../client-auth/scopes.js';
import { isLocalOnlyCandidateSet } from '../client-auth/pairing-candidates.js';
import { isBoolean, isRecord } from '../shared/object-guards.js';
import type { AuthContext } from '../ui-auth/ui-auth.js';
import type { createClientPairingRuntime } from '../client-auth/pairing.js';

type ManagementAuthContext = Pick<AuthContext, 'type' | 'client' | 'clientId'>;
type RunWithClientCreateAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
  handler: (context: ManagementAuthContext) => Promise<void | Response>,
) => Promise<void | Response>;

type PairingSessionCreateBody = PairingInput & {
  serverUrl?: unknown;
  includeRelay?: unknown;
  includeDirect?: unknown;
};

const isPairingSessionCreateBody = (value: unknown): value is PairingSessionCreateBody => (
  isRecord(value) && (value.scopes == null || isClientRouteScopeList(value.scopes))
);

export const registerPairingSessionCreateRoute = (app: Application, dependencies: {
  express: Pick<ExpressFactory, 'json'>;
  clientPairingRuntime: ReturnType<typeof createClientPairingRuntime>;
  runWithClientCreateAuth: RunWithClientCreateAuth;
  pairingServerCandidates: (
    req: Request,
    options: { preferredServerUrl?: unknown; includeRelay?: boolean | undefined; includeDirect?: boolean },
  ) => Promise<Array<{ type: string }>>;
  clientIdFromAuthContext: (context: ManagementAuthContext) => string | null;
  getServerLabel: () => string;
  reconcileRelay: () => Promise<void>;
}) => {
  const {
    express,
    clientPairingRuntime,
    runWithClientCreateAuth,
    pairingServerCandidates,
    clientIdFromAuthContext,
    getServerLabel,
    reconcileRelay,
  } = dependencies;

  app.post('/api/client-auth/pairing/sessions', express.json({ limit: '64kb' }), async (req, res, next) => {
    if (isRecord(req.body) && !isPairingSessionCreateBody(req.body)) {
      return res.status(400).json({ error: 'Invalid client route scopes' });
    }
    const body = isPairingSessionCreateBody(req.body) ? req.body : {};
    await runWithClientCreateAuth(req, res, next, async (authContext) => {
      const includeRelay = body?.includeRelay;
      const candidates = await pairingServerCandidates(req, {
        preferredServerUrl: body?.serverUrl,
        includeRelay: isBoolean(includeRelay) ? includeRelay : undefined,
        includeDirect: body?.includeDirect !== false,
      });
      const result = await clientPairingRuntime.createPairingSession({
        label: body?.label,
        allowedClientKinds: body?.allowedClientKinds,
        scopes: body.scopes ?? null,
        createdByClientId: clientIdFromAuthContext(authContext),
        usesRelay: candidates.some((candidate) => candidate.type === 'relay'),
        localOnly: isLocalOnlyCandidateSet(candidates),
      } satisfies PairingInput);
      void reconcileRelay();
      res.setHeader('Cache-Control', 'no-store');
      res.status(201).json({
        ...result,
        server: { label: getServerLabel(), candidates },
      });
    });
  });
};
