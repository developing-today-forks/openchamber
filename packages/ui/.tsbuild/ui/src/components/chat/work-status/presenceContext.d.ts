import React from 'react';
/**
 * Whether any section actually rendered.
 *
 * Every section decides for itself that it has nothing to say and returns
 * null, so the panel cannot know in advance whether it is empty — and an empty
 * panel is a bordered card holding nothing but its settings icon, which reads
 * as a fault. Re-deriving each section's emptiness at the panel level would
 * mean duplicating every data source it reads, so sections report instead.
 */
export declare const PresenceContext: React.Context<((id: string, present: boolean) => void) | null>;
/** Call from a section with whether it rendered anything this pass. */
export declare const useReportWorkStatusPresence: (id: string, present: boolean) => void;
