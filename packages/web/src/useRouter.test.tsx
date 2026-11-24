// @vitest-environment happy-dom
import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { useRouter } from '@openchamber/ui/hooks/useRouter';
import { navigateFromNotification } from '@openchamber/ui/lib/router/notificationNavigation';
import type { Session } from '@openchamber/ui/lib/opencode/model';
import { useGlobalSessionsStore, type LoadResult } from '@openchamber/ui/stores/useGlobalSessionsStore';
import { useProjectsStore } from '@openchamber/ui/stores/useProjectsStore';
import { useUIStore } from '@openchamber/ui/stores/useUIStore';
import { useDirectoryStore } from '@openchamber/ui/stores/useDirectoryStore';
import { useSessionUIStore } from '@openchamber/ui/sync/session-ui-store';

const session = (id: string, directory: string): Session => ({
  id, projectID: 'project', directory, title: id,
  cost: 0, tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
  time: { created: 1, updated: 2 },
});

const knownSessions: LoadResult = {
  activeSessions: [session('ses_A', '/project'), session('ses_B', '/project'), session('ses_C', '/project')],
  archivedSessions: [],
};

const publishSnapshot = (snapshot: LoadResult): LoadResult => {
  useGlobalSessionsStore.setState({
    activeSessions: snapshot.activeSessions,
    archivedSessions: snapshot.archivedSessions,
    entityById: new Map([...snapshot.activeSessions, ...snapshot.archivedSessions].map((entry) => [entry.id, entry])),
    hasLoaded: true,
    status: 'ready',
  });
  return snapshot;
};

let loadImpl: () => Promise<LoadResult> = () => Promise.resolve(knownSessions);
const loadSessions = (): Promise<LoadResult> => loadImpl().then(publishSnapshot);

let root: Root;
let host: HTMLDivElement;

function Router() {
  useRouter({ loadSessions });
  return <div>Mounted app</div>;
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  window.history.replaceState({}, '', '/?session=ses_A');
  loadImpl = () => Promise.resolve(knownSessions);
  useProjectsStore.setState({
    projects: [
      { id: 'project', path: '/project' },
      { id: 'other-project', path: '/other-project' },
    ],
  });
  publishSnapshot(knownSessions);
  useUIStore.setState({ isSettingsDialogOpen: false, settingsPage: 'home' });
  useDirectoryStore.setState({ currentDirectory: '/project' });
  useSessionUIStore.getState().setCurrentSession('ses_A', '/project');
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
});

afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

test('notification navigation opens B through the session-link owner and keeps the document mounted', async () => {
  await act(async () => root.render(<Router />));
  const mounted = host.firstChild;
  const documentBefore = window.document;
  const assign = vi.spyOn(window.location, 'assign');
  const pushState = vi.spyOn(window.history, 'pushState');
  let finishLoad!: (snapshot: LoadResult) => void;
  loadImpl = () => {
    expect(window.location.search).toBe('?session=ses_B');
    return new Promise<LoadResult>((resolve) => { finishLoad = resolve; });
  };

  expect(navigateFromNotification('/?session=ses_B')).toBe(true);
  expect(useSessionUIStore.getState().currentSessionId).toBe('ses_B');
  expect(pushState).toHaveBeenCalledOnce();
  expect(navigateFromNotification('/?session=ses_C')).toBe(false);
  expect(window.location.search).toBe('?session=ses_B');

  await act(async () => finishLoad({
    activeSessions: [session('ses_A', '/project'), session('ses_B', '/other-project'), session('ses_C', '/project')],
    archivedSessions: [],
  }));
  expect(useSessionUIStore.getState().currentSessionDirectory).toBe('/other-project');
  expect(window.document).toBe(documentBefore);
  expect(host.firstChild).toBe(mounted);
  expect(assign).not.toHaveBeenCalled();

  await act(async () => root.render(null));
  expect(navigateFromNotification('/?session=ses_C')).toBe(false);
  expect(useSessionUIStore.getState().currentSessionId).toBe('ses_B');
  expect(pushState).toHaveBeenCalledOnce();
});

test('startup declines notification navigation until the initial route finishes', async () => {
  let finishLoad!: (snapshot: LoadResult) => void;
  loadImpl = () => new Promise<LoadResult>((resolve) => { finishLoad = resolve; });
  await act(async () => root.render(<Router />));
  expect(navigateFromNotification('/?session=ses_B')).toBe(false);
  expect(window.location.search).toBe('?session=ses_A');
  expect(useSessionUIStore.getState().currentSessionId).toBe('ses_A');
  loadImpl = () => Promise.resolve(knownSessions);
  await act(async () => finishLoad(knownSessions));
  expect(navigateFromNotification('/?session=ses_B')).toBe(true);
  await act(async () => {});
  expect(useSessionUIStore.getState().currentSessionId).toBe('ses_B');
});

test('an accepted route failure releases the busy guard for the next click', async () => {
  await act(async () => root.render(<Router />));
  const log = vi.spyOn(console, 'error').mockImplementation(() => {});
  const select = vi.spyOn(useSessionUIStore.getState(), 'setCurrentSession')
    .mockImplementationOnce(() => { throw new Error('selection failed'); });
  expect(navigateFromNotification('/?session=ses_B')).toBe(true);
  await act(async () => {});
  expect(log).toHaveBeenCalledWith('[PWA] notification navigation failed:', expect.any(Error));
  expect(useSessionUIStore.getState().currentSessionId).toBe('ses_A');
  select.mockRestore();
  expect(navigateFromNotification('/?session=ses_C')).toBe(true);
  await act(async () => {});
  expect(useSessionUIStore.getState().currentSessionId).toBe('ses_C');
});
