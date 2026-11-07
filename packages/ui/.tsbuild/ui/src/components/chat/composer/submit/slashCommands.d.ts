/**
 * The composer's local slash commands.
 *
 * Most of them do the same thing: render a pair of magic prompts — one the
 * user sees, one the model is instructed with — and send them as a single
 * message. That shape was previously written out nine times as an `else if`
 * chain, so adding a command meant copying twenty lines and remembering to
 * change every string in them. Here the shape is the executor and the
 * commands are data.
 *
 * Commands that are not "send a prompt pair" (undo, redo, timeline, compact,
 * handoff-review, fork) stay with the composer: they manipulate session state or
 * open UI rather than producing a message.
 */
import type { I18nKey } from '@/lib/i18n';
import type { MagicPromptId } from '@/lib/magicPrompts';
/** What a command needs before it can run. */
type CommandRequirement = 'session' | 'session-or-draft';
export interface MagicPromptCommand {
    /** The name typed after the slash. */
    name: string;
    /** Magic prompt shown to the user as their message. */
    visiblePrompt: MagicPromptId;
    /** Magic prompt attached as synthetic instructions for the model. */
    instructionsPrompt: MagicPromptId;
    /** i18n key for the toast shown when the command fails. */
    errorToastKey: I18nKey;
    requires: CommandRequirement;
    /**
     * Turn the text typed after the command name into template variables.
     * Commands without an argument omit this.
     */
    buildVariables?: (argument: string) => {
        visible?: Record<string, string>;
        instructions?: Record<string, string>;
    };
}
export declare const MAGIC_PROMPT_COMMANDS: readonly MagicPromptCommand[];
export interface ParsedSlashCommand {
    name: string;
    /** Everything typed after the command name, trimmed. */
    argument: string;
}
export type LocalSlashCommandPlan = {
    command: ParsedSlashCommand;
    kind: 'action' | 'prompt';
    attachedContext: 'none' | 'retain' | 'send';
};
/**
 * Read the leading slash command out of a message, if there is one. Only the
 * first word counts as the command; the rest is its argument.
 */
export declare function parseSlashCommand(text: string): ParsedSlashCommand | null;
/**
 * Plan commands owned by the composer before attached context is consumed.
 * Action commands leave that context in the composer; prompt commands send it.
 * Unknown commands return null so the OpenCode command router remains authoritative.
 */
export declare function planLocalSlashCommand(text: string, inputMode: 'normal' | 'shell' | undefined, hasAttachedContext: boolean, hasSession: boolean): LocalSlashCommandPlan | null;
/** The prompt-pair command for `name`, or null when it is not one. */
export declare function findMagicPromptCommand(name: string): MagicPromptCommand | null;
/** Whether the current session state satisfies the command's requirement. */
export declare function canRunCommand(command: MagicPromptCommand, state: {
    hasSession: boolean;
    hasDraft: boolean;
}): boolean;
/** The template variables for both prompts of a command invocation. */
export declare function buildCommandVariables(command: MagicPromptCommand, argument: string): {
    visible: Record<string, string>;
    instructions: Record<string, string>;
};
export {};
