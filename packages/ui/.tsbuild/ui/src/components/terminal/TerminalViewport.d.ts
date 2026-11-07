import React from 'react';
import type { MonoFontOption } from '@/lib/fontOptions';
import type { TerminalTheme } from '@/lib/terminalTheme';
import type { TerminalChunk } from '@/stores/useTerminalStore';
type GhosttyTerminalSurface = import('@/lib/ghostty/surface').GhosttyTerminalSurface;
type GhosttyTerminalSurfaceOptions = import('@/lib/ghostty/surface').GhosttyTerminalSurfaceOptions;
/** The subset of the surface the viewport drives; tests inject a double. */
export type TerminalSurface = Pick<GhosttyTerminalSurface, 'write' | 'resetAndWrite' | 'setTheme' | 'setFont' | 'setVisible' | 'fit' | 'refresh' | 'focus' | 'getSelection' | 'pasteFromClipboard' | 'getSelectionPosition' | 'scrollLines' | 'selectWordAt' | 'extendSelectionTo' | 'dispose'>;
export type TerminalSurfaceFactory = (mount: HTMLElement, options: GhosttyTerminalSurfaceOptions) => Promise<TerminalSurface>;
export type TerminalController = {
    focus: () => void;
    fit: () => void;
    getSelection: () => {
        text: string;
        startLine: number;
        endLine: number;
    } | null;
    /** Reads the clipboard and sends it to the shell as a paste. Call it from the click itself. */
    pasteClipboard: () => Promise<void>;
};
type Props = {
    sessionKey: string;
    chunks: TerminalChunk[];
    onInput: (data: string) => void;
    /** Fitted size: the emulator has this size, so the PTY should follow. */
    onResize: (cols: number, rows: number) => void;
    /**
     * Size estimated from the container before Ghostty has measured anything.
     * Good enough to spawn a shell early, not authoritative: an existing PTY
     * must not be resized to it. Falls back to `onResize` when omitted.
     */
    onProvisionalSize?: (cols: number, rows: number) => void;
    theme: TerminalTheme;
    monoFont: MonoFontOption;
    fontFamily: string;
    fontSize: number;
    className?: string;
    enableTouchScroll?: boolean;
    autoFocus?: boolean;
    isVisible?: boolean;
    /** Surface construction, injectable for tests. */
    createSurface?: TerminalSurfaceFactory;
};
declare const TerminalViewport: React.ForwardRefExoticComponent<Props & React.RefAttributes<TerminalController>>;
export { TerminalViewport };
