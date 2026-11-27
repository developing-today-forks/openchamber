import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

import { z } from 'zod';

const accessErrorMessage = (label, targetPath, error) => {
  if (error?.code === 'ENOENT' || error?.code === 'ENOTDIR') {
    return `${label} does not exist: ${targetPath}`;
  }
  if (error?.code === 'EACCES' || error?.code === 'EPERM') {
    return `${label} is not accessible: ${targetPath}`;
  }
  return `${label} could not be checked: ${error?.message || String(error)}`;
};

const normalizeRequiredPath = (rawPath, label = 'Path') => {
  const parsedPath = z.string().safeParse(rawPath);
  const targetPath = parsedPath.success ? parsedPath.data.trim() : '';
  if (!targetPath) {
    throw new Error(`${label} is required`);
  }
  return path.resolve(targetPath);
};

const trimmedString = z.string().catch('').transform((value) => value.trim());
const openWithAppArgsSchema = z.object({
  projectPath: trimmedString,
  filePath: trimmedString,
  appId: trimmedString.transform((value) => value.toLowerCase()),
  appName: trimmedString,
}).catch({ projectPath: '', filePath: '', appId: '', appName: '' });

const parseOpenWithAppRequest = (raw, pathKey, label) => {
  const parsed = openWithAppArgsSchema.parse(raw);
  const request = { path: parsed[pathKey], appId: parsed.appId, appName: parsed.appName };
  if (!request.path || !request.appId || !request.appName) {
    throw new Error(`${label} path, app id, and app name are required`);
  }
  return request;
};

export const parseProjectOpenWithAppRequest = (raw) => parseOpenWithAppRequest(raw, 'projectPath', 'Project');
export const parseFileOpenWithAppRequest = (raw) => parseOpenWithAppRequest(raw, 'filePath', 'File');

export const validateLocalPath = async (rawPath, label = 'Path') => {
  const targetPath = normalizeRequiredPath(rawPath, label);
  let stats;
  try {
    stats = await fsp.stat(targetPath);
  } catch (error) {
    throw new Error(accessErrorMessage(label, targetPath, error));
  }

  const accessMode = stats.isDirectory()
    ? fs.constants.R_OK | fs.constants.X_OK
    : fs.constants.R_OK;
  try {
    await fsp.access(targetPath, accessMode);
  } catch (error) {
    throw new Error(accessErrorMessage(label, targetPath, error));
  }

  return { path: targetPath, stats };
};

export const unsupportedAppSpecificOpenError = (targetKind, platform = process.platform) => {
  const platformName = platform === 'linux'
    ? 'Linux'
    : platform === 'win32'
      ? 'Windows'
      : platform;
  return `Opening ${targetKind} in a specific app is not supported on ${platformName} yet. Use the default open action instead.`;
};
