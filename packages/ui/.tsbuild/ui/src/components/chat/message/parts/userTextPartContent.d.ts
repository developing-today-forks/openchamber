import type { AgentMentionInfo } from '../types';
import { type AttachmentCitationLink } from '@/lib/messages/inlineMessageLinks';
export declare const SKILL_TOKEN_PATTERN: RegExp;
export declare const prepareUserMarkdownContent: ({ textContent, agentMention, skillNames, attachments, }: {
    textContent: string;
    agentMention?: AgentMentionInfo;
    skillNames: ReadonlySet<string>;
    attachments?: ReadonlyArray<AttachmentCitationLink>;
}) => string;
