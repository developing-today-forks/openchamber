/**
 * Tool calls whose result the server left out of a message page.
 *
 * Results (file reads, shell output, skill bodies) are most of a page's bytes,
 * and the transcript shows them only in an expanded row. The session message
 * loader asks for pages with finished results replaced by a marker in the
 * call's metadata (`packages/web/server/lib/opencode/message-shells.js`); a
 * row that needs the result fetches its whole message by id. Everything a
 * collapsed row reads (status, time, input, metadata, error) stays in the page.
 */
import { type Part, type ToolPart } from "./model";
/** Request header asking for shelled pages. */
export declare const PART_SHELLS_HEADER = "x-openchamber-part-shells";
/**
 * The header value. The server also accepts tools to keep whole after the
 * version (`v1,shell`); every row here opens on a click, so none are listed.
 */
export declare const PART_SHELLS_VERSION = "v1";
/**
 * Length of the result text the server left out of this call, or `null` when
 * the call is whole: a call from the event stream, a single-message fetch, or
 * any server that does not shell pages.
 */
export declare function toolContentShellChars(part: Part): number | null;
/**
 * A finished `read` or `skill` call as the store keeps it: its row opens the
 * file in the app and never shows the result, so the result is left out the
 * moment the call finishes, marked the same way a shelled page marks it.
 */
export declare function withoutUnshownResult(part: ToolPart): ToolPart;
