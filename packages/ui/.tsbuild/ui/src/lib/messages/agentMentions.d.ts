import type { Agent } from "@/lib/opencode/model";
interface AgentMentionSource {
    value: string;
    start: number;
    end: number;
}
interface ParsedAgentMention {
    name: string;
    source?: AgentMentionSource;
}
interface ParsedAgentResult {
    sanitizedText: string;
    mention: ParsedAgentMention | null;
}
export declare const parseAgentMentions: (rawText: string, agents: Agent[]) => ParsedAgentResult;
export {};
