import React from 'react';
import { type ProjectNote, type ProjectRef } from '@/lib/projectContextApi';
/**
 * Free-form project notes: a list that never moves, and the open note in its
 * place.
 *
 * Notes are written through their own routes, so this section owns its writes
 * end to end — nothing here has to be persisted alongside todos.
 */
export declare const NotesSection: React.FC<{
    projectRef: ProjectRef;
    notes: ProjectNote[];
    disabled: boolean;
    query: string;
    pinnedNoteIds: ReadonlySet<string>;
    onTogglePinned: (noteId: string, pinned: boolean) => Promise<boolean>;
    /** The open note, owned by the panel so its back control can close it. */
    openNoteId: string | null;
    onOpenNote: (noteId: string | null) => void;
    /** Wide panel: the list and the open entry side by side. */
    split: boolean;
}>;
