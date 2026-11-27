// Converting a macOS app icon writes the converter's output to a scratch
// file in the shared system temp directory. That scratch file must never
// live at a guessable path: the app name half of the old name was fully
// renderer-controlled and the other half was the current millisecond, so
// a local process could plant a symlink at the predicted path and the
// converter's truncating write clobbered whatever file it pointed at.
// This module owns the conversion: the output is created with O_EXCL
// inside a fresh mkdtemp directory (mode 0700, unguessable suffix) that
// only this process can enter, so a planted name can never resolve to an
// attacker-controlled link, and the whole directory is removed after.

import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const convertAppIconToDataUrl = async ({ iconPath, appName, convert }) => {
  const safeName = String(appName || 'app').replace(/[^a-z0-9]/gi, '_');
  const scratchDir = await fsp.mkdtemp(path.join(os.tmpdir(), `openchamber-icon-${safeName}-`));
  try {
    const tempPath = path.join(scratchDir, 'icon.png');
    // Create the output exclusively before the converter runs: the path
    // is ours alone, so the converter's truncating write can only ever
    // land in this private file.
    const handle = await fsp.open(tempPath, 'wx', 0o600);
    await handle.close();
    try {
      await convert(iconPath, tempPath);
    } catch {
      return null;
    }
    let bytes;
    try {
      bytes = await fsp.readFile(tempPath);
    } catch {
      return null;
    }
    return `data:image/png;base64,${bytes.toString('base64')}`;
  } finally {
    await fsp.rm(scratchDir, { recursive: true, force: true }).catch(() => {});
  }
};
