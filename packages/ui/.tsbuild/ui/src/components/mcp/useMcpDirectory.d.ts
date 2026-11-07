import { type ChatColumnSession } from '@/components/chat/chatColumnSession';
/** MCP connections belong to the directory that will run the first turn. */
export declare const useMcpDirectory: (active: boolean, selection?: ChatColumnSession) => string | null;
