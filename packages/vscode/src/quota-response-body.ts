/**
 * The most a quota provider answer may weigh, on either surface (the web
 * twin in packages/web/server/lib/quota/utils/response-body.js uses the
 * same value). Every quota payload is a small per-account
 * usage/balance/credits JSON document (xAI reads a small protobuf usage
 * body), so 1 MiB — the changelog-index precedent — is orders of magnitude
 * above any legitimate response. Provider endpoints are third-party and
 * sometimes user-configured, and quota polling runs continuously with the
 * user's credentials, so a fast hostile or misconfigured endpoint must not
 * be able to grow extension-host memory arbitrarily inside the 15 s
 * deadline (#1282): a deadline bounds time, not memory.
 */
export const QUOTA_RESPONSE_MAX_BYTES = 1 * 1024 * 1024;

const tooLargeError = (): Error =>
  new Error(`Quota response exceeded ${QUOTA_RESPONSE_MAX_BYTES} bytes`);

const readBoundedBytes = async (response: Response): Promise<Uint8Array> => {
  const reader = response.body!.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      totalBytes += value.byteLength;
      if (totalBytes > QUOTA_RESPONSE_MAX_BYTES) {
        void reader.cancel().catch(() => {});
        throw tooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
};

/**
 * Reads a quota provider answer as JSON under the cap, preserving the old
 * bare response.json() semantics for in-cap bodies: a malformed body throws
 * from JSON.parse exactly as response.json() did, and an over-cap body
 * throws instead of being buffered whole, so the caller's existing failure
 * path produces the provider's normal failure result.
 */
export const readQuotaJson = async (response: Response): Promise<unknown> => {
  // Test doubles pass a plain { ok, json } without a body; real responses
  // go through the bounded reader.
  if (!response.body) {
    return response.json();
  }
  const bytes = await readBoundedBytes(response);
  const text = new TextDecoder().decode(bytes);
  // Response.json() strips a leading UTF-8 BOM; the bounded reader does not.
  return JSON.parse(text.replace(/^\uFEFF/, ''));
};

/**
 * The same bounded read for the one binary quota answer (xAI's protobuf
 * usage body): the cap is enforced while the body streams in.
 */
export const readQuotaBytes = async (response: Response): Promise<Uint8Array> => {
  if (!response.body) {
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > QUOTA_RESPONSE_MAX_BYTES) throw tooLargeError();
    return bytes;
  }
  return readBoundedBytes(response);
};
