// Keep UI caps aligned with the server helpers while avoiding lone high
// surrogates when a UTF-16 slice splits an astral character.
export const clipPwaInstallName = (value: string): string => {
  const clipped = value.slice(0, 64);
  const last = clipped.charCodeAt(clipped.length - 1);
  return last >= 0xd800 && last <= 0xdbff ? clipped.slice(0, -1) : clipped;
};

export const normalizeRecentTitle = (value: string | undefined, fallback: string): string => {
  if (typeof value !== 'string') {
    return fallback;
  }
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized) {
    return fallback;
  }
  const clipped = normalized.slice(0, 48);
  const last = clipped.charCodeAt(clipped.length - 1);
  return last >= 0xd800 && last <= 0xdbff ? clipped.slice(0, -1) : clipped;
};
