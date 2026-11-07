import type { Session } from '@/lib/opencode/model';
import type { BtwSelection } from '@/stores/useBtwStore';
/**
 * What a pinned composer sends with: the picks saved for its session first,
 * then the session record, which is what OpenCode 2 runs the next prompt on.
 * An effort saved for the picked agent and model wins over the record's; an
 * effort saved as `null` is an explicit "Default".
 */
export declare const resolvePinnedComposerSelection: ({ savedAgent, savedModel, savedVariant, record }: {
    savedAgent: string | null;
    savedModel: {
        providerId: string;
        modelId: string;
    } | null;
    savedVariant: string | null | undefined;
    record: Pick<Session, 'agent' | 'model'> | undefined;
}) => BtwSelection;
/**
 * The model, agent and effort a pinned column's composer (a chat open in the
 * side panel) sends with. The app-wide current model belongs to the main
 * chat, so a pinned composer keeps its own: what was picked in it, saved for
 * its session the way the `/btw` composer saves its picks, and otherwise what
 * the session record names. Null outside a pinned column.
 */
export declare const usePinnedComposerSelection: ({ enabled, sessionId, directory }: {
    enabled: boolean;
    sessionId: string | null;
    directory: string | null;
}) => BtwSelection | null;
