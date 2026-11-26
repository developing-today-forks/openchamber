import { readBoundedResponseText } from '../shared/response-body.js';

const MAX_TEXT_FILE_BYTES = 5 * 1024 * 1024;

interface TextFileRequester {
  get: (endpoint: string, options: { searchParams: { ref: string }; asStream: true }) => Promise<{ body: unknown; headers: HeadersInit | Record<string, string> }>;
}

interface TextFileClient {
  MergeRequests: {
    requester: TextFileRequester;
  };
}

export async function readGitLabTextFile(client: TextFileClient, projectId: string | number, path: string, ref: string) {
  const { body, headers } = await client.MergeRequests.requester.get(
    `projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(path)}/raw`,
    { searchParams: { ref }, asStream: true },
  );
  if (!(body instanceof ReadableStream)) throw new Error('GitLab returned invalid file contents');
  const result = await readBoundedResponseText({ body, headers: new Headers(headers) }, MAX_TEXT_FILE_BYTES);
  if (result.tooLarge) {
    throw Object.assign(new Error('This file is too large to show in full'), { status: 413, code: 'file-too-large' });
  }
  return result.text;
}
