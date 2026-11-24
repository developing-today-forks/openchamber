import { z } from 'zod';

export const resolveManagedOpenCodeCwd = ({ env, homedir }) => {
  const configured = z.string().safeParse(env?.OPENCHAMBER_OPENCODE_CWD);
  const trimmedConfigured = configured.success ? configured.data.trim() : '';
  if (trimmedConfigured) {
    return trimmedConfigured;
  }

  const home = homedir instanceof Function ? homedir() : '';
  const parsedHome = z.string().safeParse(home);
  return parsedHome.success && parsedHome.data.trim() ? parsedHome.data : process.cwd();
};
