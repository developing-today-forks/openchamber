import { StringDecoder } from 'string_decoder';

// Default bound for one stream's held output: once the rolling text or the
// held partial line grows past this many characters only the newest tail
// is kept, which is all a URL or a log line can occupy.
export const BOUNDED_OUTPUT_MAX_CHARS = 64 * 1024;

// Accumulates one stream's output across chunk boundaries. Shared by the
// cloudflare and ngrok tunnel modules (extracted for #1705; the two local
// copies had already diverged, losing flush() in one and recentText in
// the other). `push` returns the decoded text of this chunk, the lines
// completed by it (a trailing partial line is held for the next chunk),
// and the bounded rolling `recentText` for substring/regex matching that
// does not care about lines. `flush` ends the decoder and releases the
// held partial line, so a final unterminated line is not lost when the
// stream ends. Oracle: StringDecoder semantics — a multi-byte character
// split across chunks must decode whole, never as replacement chars.
export function createBoundedOutputAccumulator({ maxChars = BOUNDED_OUTPUT_MAX_CHARS } = {}) {
  const decoder = new StringDecoder('utf8');
  let pendingLine = '';
  let recentText = '';
  return {
    push(chunk) {
      const decoded = decoder.write(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      recentText = (recentText + decoded).slice(-maxChars);
      pendingLine += decoded;
      const lines = pendingLine.split(/\r?\n/);
      pendingLine = lines.pop() ?? '';
      if (pendingLine.length > maxChars) {
        pendingLine = pendingLine.slice(-maxChars);
      }
      return { decoded, lines, recentText };
    },
    flush() {
      const tail = decoder.end();
      recentText = (recentText + tail).slice(-maxChars);
      const line = pendingLine + tail;
      pendingLine = '';
      return line ? [line] : [];
    },
  };
}
