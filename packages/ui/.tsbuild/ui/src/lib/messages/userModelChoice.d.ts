import type { Message, Part, Session } from '@/lib/opencode/model';
export type UserModelChoice = {
    id: string;
    agent?: string;
    providerID?: string;
    modelID?: string;
    variant?: string;
};
/**
 * The agent/model a turn actually ran on.
 *
 * OpenCode v2 user messages carry no model: the server records the choice on
 * the assistant reply, so the reply is the authority for what the composer
 * should show.
 */
export declare const extractAssistantModelChoice: (message: Message) => UserModelChoice | null;
/**
 * Find the latest turn's model/agent choice.
 *
 * Messages whose parts have not been loaded yet are skipped so an incomplete
 * snapshot cannot be treated as authoritative.
 */
export declare const findLatestUserModelChoice: (messages: readonly Message[], getParts: (messageId: string) => Part[] | undefined) => UserModelChoice | null;
/**
 * The selection OpenCode 2 keeps on the session record itself (`model` with
 * its variant). The record's agent is followed separately, so the choice
 * carries none.
 */
export declare const extractSessionRecordModelChoice: (session: Session | undefined) => UserModelChoice | null;
/** Field equality, so a re-derived choice keeps its previous reference. */
export declare const areModelChoicesEqual: (left: UserModelChoice | null, right: UserModelChoice | null) => boolean;
/**
 * When the user has a manual session model override, historical user-message
 * metadata must not overwrite it. After a real send the selection store is
 * updated to match the message, so a conflict means the picker was changed
 * after the last prompt — keep the override.
 */
export declare const shouldPreserveManualModelOverride: ({ selectionSource, savedSessionModel, candidate, }: {
    selectionSource: 'auto' | 'manual' | undefined;
    savedSessionModel: {
        providerId: string;
        modelId: string;
    } | null | undefined;
    candidate: Pick<UserModelChoice, 'providerID' | 'modelID'> | null | undefined;
}) => boolean;
