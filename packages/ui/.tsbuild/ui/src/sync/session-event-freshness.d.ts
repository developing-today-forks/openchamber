import type { Session } from "@/lib/opencode/model";
export declare const shouldSkipStaleSessionEvent: (currentSession: Session | null, incomingSession: Session) => boolean;
