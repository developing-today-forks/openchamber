import { z } from 'zod';

const isReservedRuntimeRequestHeaderName = (name) => {
  return String(name || '').trim().toLowerCase() === 'authorization';
};

export const sanitizeRuntimeRequestHeaders = (headers) => {
  const parsedHeaders = z.record(z.string(), z.unknown()).safeParse(headers);
  if (!parsedHeaders.success) return {};
  const next = {};
  for (const [rawName, rawValue] of Object.entries(parsedHeaders.data)) {
    const parsedName = z.string().safeParse(rawName);
    const name = parsedName.success ? parsedName.data.trim() : '';
    const parsedValue = z.string().safeParse(rawValue);
    const value = parsedValue.success ? parsedValue.data.trim() : '';
    if (!name || !value || /[\r\n:]/.test(name) || /[\r\n]/.test(value)) continue;
    if (isReservedRuntimeRequestHeaderName(name)) continue;
    next[name] = value;
  }
  return next;
};
