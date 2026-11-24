import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourceFile = path.join(here, 'rename_noreplace.c');
const defaultOutRoot = path.join(here, 'prebuilds');

const usage = `usage: build.mjs [--strict] [--outdir <dir>] [--headers-dir <dir>] [--compiler <bin>] [--help]`;

const parseArgs = (argv) => {
  const options = { strict: false, outdir: defaultOutRoot, headersDir: null, compiler: null, help: false };
  const takesValue = new Set(['--outdir', '--headers-dir', '--compiler']);
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--strict') {
      options.strict = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (takesValue.has(arg)) {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new Error(`${usage}\n${arg} requires a value`);
      }
      index += 1;
      if (arg === '--outdir') options.outdir = path.resolve(value);
      if (arg === '--headers-dir') options.headersDir = path.resolve(value);
      if (arg === '--compiler') options.compiler = value;
    } else {
      throw new Error(`${usage}\nunknown argument: ${arg}`);
    }
  }
  return options;
};

const fail = (options, message) => {
  if (options.strict) {
    console.error(`[no-replace-rename] ${message}`);
    process.exit(1);
  }
  console.warn(`[no-replace-rename] WARNING: ${message} (continuing without a native prebuild)`);
};

const findHeadersDir = async () => {
  for (const candidate of [process.env.NODE_HEADERS_DIR]) {
    if (candidate && fs.existsSync(path.join(candidate, 'node_api.h'))) return candidate;
  }
  const cacheRoot = process.env.OPENCHAMBER_HEADERS_CACHE || path.join(os.homedir(), '.cache', 'openchamber-node-headers');
  const version = process.version;
  const cached = path.join(cacheRoot, `node-${version}`, 'include', 'node');
  if (fs.existsSync(path.join(cached, 'node_api.h'))) return cached;
  const url = `https://nodejs.org/dist/${version}/node-${version}-headers.tar.gz`;
  console.log(`[no-replace-rename] downloading Node headers for ${version}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`header download failed: ${response.status} ${response.statusText}`);
  const tmp = await fsp.mkdtemp(path.join(os.tmpdir(), 'oc-node-headers-'));
  try {
    const archive = path.join(tmp, 'headers.tar.gz');
    await fsp.writeFile(archive, Buffer.from(await response.arrayBuffer()));
    const extract = spawnSync('tar', ['-xzf', archive, '-C', tmp], { stdio: 'inherit' });
    if (extract.error) throw extract.error;
    if (extract.status !== 0) throw new Error(`tar exited with ${extract.status}`);
    const extracted = path.join(tmp, `node-${version}`, 'include', 'node');
    if (!fs.existsSync(path.join(extracted, 'node_api.h'))) throw new Error('headers archive has no node_api.h');
    await fsp.mkdir(path.dirname(cached), { recursive: true });
    await fsp.rm(cached, { recursive: true, force: true });
    await fsp.cp(extracted, cached, { recursive: true });
    return cached;
  } finally {
    await fsp.rm(tmp, { recursive: true, force: true });
  }
};

const findWindowsNodeLib = async (headersDir) => {
  const libPath = path.join(path.dirname(headersDir), `node-${process.arch}.lib`);
  if (fs.existsSync(libPath)) return libPath;
  const url = `https://nodejs.org/dist/${process.version}/win-${process.arch}/node.lib`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`node.lib download failed: ${response.status} ${response.statusText}`);
  await fsp.writeFile(libPath, Buffer.from(await response.arrayBuffer()));
  return libPath;
};

const defaultCompiler = () => {
  if (process.env.CC) return process.env.CC;
  return process.platform === 'win32' ? 'cl' : 'cc';
};

const findWindowsCompiler = () => {
  const vswhere = 'C:\\Program Files (x86)\\Microsoft Visual Studio\\Installer\\vswhere.exe';
  if (!fs.existsSync(vswhere)) return null;
  const found = spawnSync(
    vswhere,
    ['-latest', '-requires', 'Microsoft.VisualStudio.Component.VC.Tools', '-find', 'VC\\Tools\\MSVC\\*\\bin\\Hostx64\\x64\\cl.exe'],
    { encoding: 'utf8' },
  );
  const first = (found.stdout || '').split(/\r?\n/).map((s) => s.trim()).find(Boolean);
  return first || null;
};

const build = async (options) => {
  const platform = process.platform;
  const arch = process.arch;
  const outDir = path.join(options.outdir, `${platform}-${arch}`);
  const outFile = path.join(outDir, 'no-replace-rename.node');
  const sourceStat = await fsp.stat(sourceFile);
  try {
    const outStat = await fsp.stat(outFile);
    if (outStat.mtimeMs >= sourceStat.mtimeMs) {
      console.log(`[no-replace-rename] up to date: ${outFile}`);
      return;
    }
  } catch {
  }
  const headersDir = options.headersDir
    || (process.env.NODE_HEADERS_DIR && fs.existsSync(path.join(process.env.NODE_HEADERS_DIR, 'node_api.h'))
      ? process.env.NODE_HEADERS_DIR
      : await findHeadersDir());
  const compiler = options.compiler || defaultCompiler();
  await fsp.mkdir(outDir, { recursive: true });
  let result;
  if (platform === 'win32') {
    let winCompiler = compiler;
    if (!options.compiler && compiler === 'cl') {
      const probe = spawnSync('where', ['cl'], { stdio: 'ignore' });
      if (probe.status !== 0) winCompiler = findWindowsCompiler() || compiler;
    }
    const objDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'oc-rnr-obj-'));
    const nodeLib = await findWindowsNodeLib(headersDir);
    try {
      result = spawnSync(
        winCompiler,
        ['/nologo', '/LD', '/O2', '/DBUILDING_NODE_EXTENSION', `/I${headersDir}`, sourceFile, `/Fo${objDir}\\`, `/Fe${outFile}`, '/link', nodeLib],
        { stdio: 'inherit' },
      );
    } finally {
      await fsp.rm(objDir, { recursive: true, force: true });
    }
  } else {
    const args = ['-shared', '-fPIC', '-O2', `-I${headersDir}`, '-o', outFile, sourceFile];
    if (platform === 'darwin') args.push('-undefined', 'dynamic_lookup');
    else args.push('-D_GNU_SOURCE');
    result = spawnSync(compiler, args, { stdio: 'inherit' });
  }
  if (result.error) {
    const hint = result.error.code === 'ENOENT'
      ? `${platform === 'win32' ? 'cl (Visual Studio C++ tools)' : compiler} not found; install a C compiler or pass --compiler <bin>`
      : String(result.error.message || result.error);
    fail(options, `compile failed: ${hint}`);
    return;
  }
  if (result.status !== 0) {
    fail(options, `${compiler} exited with code ${result.status}`);
    return;
  }
  const digest = createHash('sha256').update(await fsp.readFile(outFile)).digest('hex').slice(0, 16);
  console.log(`[no-replace-rename] built ${outFile} (sha256:${digest})`);
};

let options;
try {
  options = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exit(2);
}
if (options.help) {
  console.log(usage);
  process.exit(0);
}
try {
  await build(options);
} catch (error) {
  fail(options, String(error?.message || error));
}
