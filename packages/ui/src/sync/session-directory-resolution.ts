import type { Session } from "@/lib/opencode/model"
import { normalizePath } from "@/lib/pathNormalization"

export type SessionDirectorySource =
  | 'authoritative'
  | 'selected'
  | 'attachment'
  | 'worktree-metadata'
  | 'remembered'
  | 'none'

export type SessionDirectorySources = {
  authoritative?: string | null
  selected?: string | null
  attachment?: string | null
  worktreeMetadata?: string | null
  remembered?: string | null
}

export type SessionDirectoryResolution = {
  directory: string | null
  source: SessionDirectorySource
  conflict: { source: SessionDirectorySource; directory: string } | null
}

export const resolveSessionOwnedDirectory = (session: Session): string | null => {
  // SAFETY: the record adds only optional directory and project fields, which are read through typeof checks, so Session is only widened.
  const record = session as Session & { directory?: string | null; project?: { worktree?: string | null } | null }
  const raw = typeof record.directory === "string" && record.directory.trim().length > 0
    ? record.directory
    : typeof record.project?.worktree === "string" && record.project.worktree.trim().length > 0
      ? record.project.worktree
      : null
  return raw ? normalizePath(raw) : null
}

export const resolveDirectoryKey = (session: Session): string | null => {
  // SAFETY: the record adds optional directory and project fields that normalizePath receives as nullable strings, so Session is only widened.
  const record = session as Session & { directory?: string | null; project?: { worktree?: string | null } | null }
  return normalizePath(record.directory ?? null) ?? normalizePath(record.project?.worktree ?? null)
}

const RESOLUTION_ORDER: ReadonlyArray<Exclude<SessionDirectorySource, 'none'>> = [
  'authoritative',
  'selected',
  'attachment',
  'worktree-metadata',
  'remembered',
]

const readSource = (
  sources: SessionDirectorySources,
  source: Exclude<SessionDirectorySource, 'none'>,
): string | null => {
  const value = source === 'attachment'
    ? sources.attachment
    : source === 'worktree-metadata'
      ? sources.worktreeMetadata
      : source === 'authoritative'
        ? sources.authoritative
        : source === 'selected'
          ? sources.selected
          : sources.remembered
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

export const resolveSessionDirectoryFromSources = (
  sources: SessionDirectorySources,
): SessionDirectoryResolution => {
  let winner: { source: SessionDirectorySource; directory: string } | null = null
  let conflict: { source: SessionDirectorySource; directory: string } | null = null

  for (const source of RESOLUTION_ORDER) {
    const directory = readSource(sources, source)
    if (!directory) continue
    if (!winner) {
      winner = { source, directory }
      continue
    }
    if (!conflict && directory !== winner.directory) {
      conflict = { source, directory }
    }
  }

  if (!winner) {
    return { directory: null, source: 'none', conflict: null }
  }

  return { directory: winner.directory, source: winner.source, conflict }
}

export const describeSessionDirectorySources = (
  sources: SessionDirectorySources,
): Array<{ source: SessionDirectorySource; directory: string }> => {
  const described: Array<{ source: SessionDirectorySource; directory: string }> = []
  for (const source of RESOLUTION_ORDER) {
    const directory = readSource(sources, source)
    if (directory) described.push({ source, directory })
  }
  return described
}
