import type { Session } from "@/lib/opencode/model";
/** Drop the revert's file diffs and snapshot, keeping only its marker. */
export declare function stripSessionDiffSnapshots(session: Session): Session;
/** Strip detail-only fields from session list records before storing them. */
export declare function stripSessionListDetails(session: Session): Session;
