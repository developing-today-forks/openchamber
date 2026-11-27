import type { Request } from '../shared/http-contracts.js';

const isString = (value: unknown): value is string => typeof value === 'string';

export const getBearerTokenFromRequest = (req: Partial<Pick<Request, 'headers'>> | null | undefined) => {
  const header = req?.headers?.authorization;
  const value = Array.isArray(header) ? header[0] : header;
  if (isString(value)) {
    const match = value.match(/^Bearer\s+(.+)$/i);
    const token = match?.[1]?.trim() || '';
    if (token) return token;
  }
  return null;
};
