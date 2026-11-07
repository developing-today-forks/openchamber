/**
 * Names skills in an instruction for the model. The fallback for skills that
 * cannot be attached to the prompt: queued messages (delivered later by the
 * server or the VS Code auto-send), the command route, and names OpenCode
 * does not list.
 */
export declare const buildSkillMentionInstruction: (skillNames: readonly string[]) => string | null;
