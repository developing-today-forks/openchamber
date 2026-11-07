/**
 * The parts a user message shows.
 *
 * Two things happen here. Linked issues and pull requests render as link
 * attachments rather than context cards, so their context parts are mapped to
 * the display-only file part `FileAttachment` understands. And a file part that
 * merely repeats the range an inline comment already quotes is dropped, so the
 * message does not show the same lines twice.
 */
import type { Part } from '@/lib/opencode/model';
export declare const normalizeUserDisplayParts: (parts: Part[]) => Part[];
