import type { Session } from "@/lib/opencode/model"
import { opencodeClient } from "@/lib/opencode/client"
import { descendingId } from "@/lib/opencode/ids"
import { normalizePath } from "@/lib/pathNormalization"
import { getRuntimeKey } from "@/lib/runtime-switch"
import { planChatDirectory } from "@/lib/chatDirectories"
import { trackPreparedChatFolder } from "@/lib/unconfirmedSends"
import { waitForPendingDraftWorktreeRequest } from "@/lib/worktrees/pendingDraftWorktree"
import { useSessionTabsStore } from "@/stores/useSessionTabsStore"
import { useSessionDraftsStore } from "@/stores/useSessionDraftsStore"
import { useSubsessionDraftStore } from "@/stores/useSubsessionDraftStore"
import { draftSessionMetadata } from "./draft-session-metadata"
import { runAfterOpenCodeStartup } from "./opencode-startup-gate"
import { isSessionAdmitted } from "./session-admission"
import {
  adoptSessionMove,
  createSession as createSessionAction,
  deleteSession as deleteSessionAction,
  movePendingSessionTranscript,
  openPendingSessionTranscript,
} from "./session-actions"
import {
  DraftSendError,
  draftSendSteps,
  useSessionUIStore,
  type DraftSessionSelection,
  type MaterializedDraftSession,
  type NewSessionDraftState,
} from "./session-ui-store"

const {
  sentDraftIds,
  runtimeMemoryKey,
  writeRuntimeSessionMemory,
  draftSessionCreateSelection,
  consumeDraftSubagentPolicy,
  saveDraftSessionSelection,
  setPendingDraftSend,
  resolveDraftCreateDirectory,
  finishDraftSession,
  captureChatDirectoryCleanup,
  deletePreparedChatDirectory,
  reopenDraftAfterFailedCreation,
} = draftSendSteps

/**
 * Whether the user is still on `draft`. A send handed to the server can
 * resolve its message after a wait (a mention read, an attachment save), and
 * by then the user may have opened another draft or chat.
 */
const isStillOnDraft = (draft: NewSessionDraftState): boolean => {
  const live = useSessionUIStore.getState().newSessionDraft
  return live.open && live.draftId === draft.draftId
}

export type HandedOffDraftSession = {
  sessionId: string
  /** The session as the server created it. Rejects with `DraftSendError` when the server has no session. */
  created: Promise<MaterializedDraftSession>
  /** Ends the first send: Send works again in the session and the held message is no longer shown from here. */
  release: () => void
  /** The folder the session was first shown in; its composer is keyed by it until the user follows the session elsewhere. */
  shownDirectory: string
}

/**
 * Makes a draft whose message the server sends later (the goal writer's
 * "Send when ready") a session on the spot, as Enter in a draft does, and
 * creates it in the background. The draft is released at once: the session
 * is selected when the user is still on the draft, and every wait (OpenCode
 * starting, the chat folder, a worktree being made and its setup commands)
 * runs afterwards without moving the user from wherever they went. The
 * session is shown in the directory the draft points at and follows the
 * worktree there once its folder exists.
 */
export async function handOffDraftSession(
  selection: DraftSessionSelection,
  draft: NewSessionDraftState,
  runtimeKey: string,
  heldMessage: string,
): Promise<HandedOffDraftSession> {
  const assertRuntimeCurrent = () => {
    if (getRuntimeKey() !== runtimeKey) throw new Error("Message was not sent because the runtime changed.")
  }
  assertRuntimeCurrent()
  if (!draft.open) throw new Error("Failed to create session")
  if (sentDraftIds.has(draft.draftId)) throw new Error("The session is still being created.")
  sentDraftIds.add(draft.draftId)

  let chatDirectoryCleanup: Awaited<ReturnType<typeof captureChatDirectoryCleanup>>
  // A prepared chat folder is used only while the draft is open: closing a
  // draft deletes the folder it prepared.
  let claimedChatDirectory: string | null = null
  let shownDirectory: string | null
  try {
    chatDirectoryCleanup = await captureChatDirectoryCleanup(draft.target, runtimeKey)
    assertRuntimeCurrent()
    if (draft.target === "chat") {
      claimedChatDirectory = isStillOnDraft(draft) ? useSessionUIStore.getState().newSessionDraft.preparedChatDirectory ?? null : null
      shownDirectory = claimedChatDirectory ?? await planChatDirectory()
      assertRuntimeCurrent()
    } else {
      shownDirectory = draft.bootstrapPendingDirectory ?? draft.directoryOverride ?? opencodeClient.getDirectory() ?? null
    }
    shownDirectory = normalizePath(shownDirectory)
    if (!shownDirectory) throw new Error("Failed to create session")
  } catch (error) {
    sentDraftIds.delete(draft.draftId)
    throw error
  }

  const sessionId = descendingId("ses")
  // The subsession picks go with this session: a draft opened while it is
  // being created starts without them.
  const createSelection = draftSessionCreateSelection(selection)
  const subsessionModels = useSubsessionDraftStore.getState().models
  consumeDraftSubagentPolicy(createSelection)
  const agent = saveDraftSessionSelection(sessionId, selection)
  openPendingSessionTranscript(sessionId, shownDirectory)
  if (isStillOnDraft(draft)) {
    if (claimedChatDirectory) {
      const live = useSessionUIStore.getState().newSessionDraft
      useSessionUIStore.setState({ newSessionDraft: { ...live, preparedChatDirectory: null } })
    }
    useSessionUIStore.getState().setCurrentSession(sessionId, shownDirectory, { transition: "submitted-draft" })
  }
  setPendingDraftSend(sessionId, { draftId: draft.draftId, sessionCreated: false, heldMessage })
  useSessionTabsStore.getState().pinTab(sessionId)

  // Where the session is made; a worktree made after the switch changes it.
  // A user on the session follows it there when the worktree is already a
  // listed one; otherwise the transcript they see stays until the session
  // exists, and the view moves then.
  let directory: string = shownDirectory
  const showIn = (next: string | null) => {
    const destination = normalizePath(next)
    if (!destination || destination === directory) return
    const onSession = useSessionUIStore.getState().currentSessionId === sessionId
    if (onSession && !isSessionAdmitted(destination)) {
      openPendingSessionTranscript(sessionId, destination)
    } else {
      movePendingSessionTranscript(sessionId, directory, destination)
      if (onSession) {
        // A session the server has not made yet has no record to name its
        // folder; the selection's own memory is what resolves it.
        writeRuntimeSessionMemory(runtimeMemoryKey(), { sessionId, directory: destination })
        useSessionUIStore.getState().setCurrentSession(sessionId, destination, { transition: "submitted-draft" })
      }
    }
    directory = destination
  }

  const createOnServer = async (): Promise<{ session: Session; createDirectory: string | null }> => {
    if (draft.target === "chat" && !claimedChatDirectory) {
      await opencodeClient.createDirectory(directory)
      trackPreparedChatFolder(runtimeKey, directory)
    } else if (draft.pendingWorktreeRequestId) {
      const worktree = await waitForPendingDraftWorktreeRequest(draft.pendingWorktreeRequestId)
      assertRuntimeCurrent()
      showIn(worktree)
    }
    assertRuntimeCurrent()
    const createDirectory = await resolveDraftCreateDirectory(draft, directory)
    assertRuntimeCurrent()
    const session = await runAfterOpenCodeStartup(() => createSessionAction(
      draft.title,
      createDirectory,
      draftSessionMetadata(draft),
      undefined,
      createSelection,
      "preserve",
      sessionId,
      runtimeKey,
    ))
    if (!session?.id) throw new Error("Failed to create session")
    if (session.id !== sessionId) {
      console.error("[draft-handoff] the server created the session under another id", { requested: sessionId, created: session.id })
      void deleteSessionAction(session.id).catch(() => undefined)
      throw new Error("Failed to create session")
    }
    return { session, createDirectory }
  }

  const created = (async (): Promise<MaterializedDraftSession> => {
    let result: Awaited<ReturnType<typeof createOnServer>>
    try {
      result = await createOnServer()
    } catch (error) {
      // The composer of the session is keyed by the folder it is shown in.
      const ui = useSessionUIStore.getState()
      const shownIn = ui.currentSessionId === sessionId ? normalizePath(ui.currentSessionDirectory) ?? directory : directory
      setPendingDraftSend(sessionId, null)
      if (draft.target === "chat") await deletePreparedChatDirectory(directory, chatDirectoryCleanup)
      reopenDraftAfterFailedCreation(draft, sessionId, directory, runtimeKey)
      // The reopened draft gets its subsession picks back; a draft opened
      // meanwhile keeps its own.
      const live = useSessionUIStore.getState().newSessionDraft
      if (live.open && live.draftId === draft.draftId && subsessionModels.length > 0) useSubsessionDraftStore.getState().setModels(subsessionModels)
      throw new DraftSendError(sessionId, shownIn, false, error)
    }
    setPendingDraftSend(sessionId, { draftId: draft.draftId, sessionCreated: true, heldMessage })
    if (draft.workDraftId) void useSessionDraftsStore.getState().discard(draft.workDraftId, { final: true }).catch(() => undefined)
    const createdDirectory = finishDraftSession(draft, result.session, result.createDirectory) ?? directory
    if (createdDirectory !== directory) adoptSessionMove(sessionId, directory, createdDirectory)
    const ui = useSessionUIStore.getState()
    if (ui.currentSessionId === sessionId && normalizePath(ui.currentSessionDirectory) !== createdDirectory) {
      ui.setCurrentSession(sessionId, createdDirectory, { transition: "submitted-draft" })
    }
    // The transcript shown before the worktree existed goes once the view left it.
    const shownNow = useSessionUIStore.getState()
    if (shownDirectory !== createdDirectory && (shownNow.currentSessionId !== sessionId || normalizePath(shownNow.currentSessionDirectory) !== shownDirectory)) {
      movePendingSessionTranscript(sessionId, shownDirectory, createdDirectory)
    }
    return { sessionId, directory: createdDirectory, agent, syntheticParts: draft.syntheticParts }
  })()

  return { sessionId, created, release: () => setPendingDraftSend(sessionId, null), shownDirectory }
}
