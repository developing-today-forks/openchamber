import { z } from 'zod';

const routeString = z.string().catch('').transform((value) => value.trim());

const focusMainWindowArgs = z.object({
  sessionId: routeString,
  directory: routeString,
  mode: routeString,
  projectId: routeString,
}).catch({});

export const parseFocusMainWindowArgs = (args) => ({
  sessionId: '',
  directory: '',
  mode: '',
  projectId: '',
  ...focusMainWindowArgs.parse(args),
});
