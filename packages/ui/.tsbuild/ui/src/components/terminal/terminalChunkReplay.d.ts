import type { TerminalChunk } from '@/stores/useTerminalStore';
export interface TerminalChunkReplaySelection {
    reset: boolean;
    replay: boolean;
    pending: TerminalChunk[];
}
export declare function selectTerminalChunkReplay(chunks: TerminalChunk[], lastChunkId: number | null): TerminalChunkReplaySelection;
