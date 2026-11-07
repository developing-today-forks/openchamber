type GhosttyKeyInput = Pick<KeyboardEvent, 'key' | 'code' | 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'isComposing' | 'repeat' | 'getModifierState'>;
export declare const GHOSTTY_CELL_WIDE: {
    readonly narrow: 0;
    readonly wide: 1;
    readonly spacerTail: 2;
    readonly spacerHead: 3;
};
export interface GhosttyColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
}
export interface GhosttyTheme {
    readonly foreground: GhosttyColor;
    readonly background: GhosttyColor;
    readonly cursor: GhosttyColor;
    /**
     * The 16 ANSI colors (normal then bright). Indices 16-255 keep the standard
     * xterm cube and gray ramp. Omitted, Ghostty's built-in palette applies.
     */
    readonly palette?: readonly GhosttyColor[];
    /** CSS color the renderer overlays on selected cells; not sent to Ghostty. */
    readonly selectionBackground?: string;
}
/** The xterm 256-color table with the first 16 entries replaced by the theme's ANSI colors. */
export declare function ghosttyPaletteBytes(ansi: readonly GhosttyColor[]): Uint8Array;
export interface GhosttyCell {
    readonly text: string;
    readonly wide: number;
    readonly foreground: GhosttyColor;
    readonly background: GhosttyColor;
    readonly bold: boolean;
    readonly italic: boolean;
    readonly invisible: boolean;
    readonly strikethrough: boolean;
    readonly overline: boolean;
    readonly underline: boolean;
    readonly selected: boolean;
}
export interface GhosttyRow {
    readonly cells: readonly GhosttyCell[];
    readonly text: string;
    readonly isWrapContinuation: boolean;
    /** Whether this row soft-wraps onto the next row. */
    readonly wrapsToNext: boolean;
}
export interface GhosttySnapshot {
    readonly cols: number;
    readonly rows: number;
    readonly foreground: GhosttyColor;
    readonly background: GhosttyColor;
    readonly cursor: GhosttyColor;
    readonly cursorX: number;
    readonly cursorY: number;
    readonly cursorVisible: boolean;
    readonly cursorBlinking: boolean;
    readonly cursorStyle: number;
    readonly dirtyRows: ReadonlySet<number>;
    readonly rowData: readonly GhosttyRow[];
}
export interface GhosttySelectionRange {
    readonly viewport: {
        readonly start: {
            readonly x: number;
            readonly y: number;
        };
        readonly end: {
            readonly x: number;
            readonly y: number;
        };
    };
    readonly screen: {
        readonly start: {
            readonly x: number;
            readonly y: number;
        };
        readonly end: {
            readonly x: number;
            readonly y: number;
        };
    };
}
export interface GhosttyScrollbar {
    readonly total: number;
    readonly offset: number;
    readonly len: number;
}
/** Grid position tagged with its Ghostty coordinate space: 1 viewport, 2 screen. */
export interface GhosttyPointInput {
    readonly x: number;
    readonly y: number;
    readonly tag?: 1 | 2;
}
export interface GhosttyMouseInput {
    readonly action: 'press' | 'release' | 'motion';
    readonly button: number | null;
    readonly mods: number;
    readonly x: number;
    readonly y: number;
    readonly screenWidth: number;
    readonly screenHeight: number;
    readonly cellWidth: number;
    readonly cellHeight: number;
    readonly paddingLeft: number;
    readonly paddingRight: number;
    readonly paddingTop: number;
    readonly paddingBottom: number;
    readonly anyButtonPressed: boolean;
}
/**
 * A terminal program can print one base character followed by a huge run of
 * combining marks, packing hundreds of thousands of codepoints into a single
 * cell that still fits the scrollback buffer. Engines cap spread-call
 * arguments far below that, so convert in bounded chunks instead of spreading
 * every codepoint into String.fromCodePoint at once.
 */
export declare function ghosttyCellText(codepointView: DataView, graphemeLength: number): string;
export declare class GhosttyTerminalCore {
    private readonly runtime;
    private terminalSlot;
    private terminal;
    private renderStateSlot;
    private renderState;
    private rowIteratorSlot;
    private rowCellsSlot;
    private keyEncoderSlot;
    private keyEncoder;
    private keyEventSlot;
    private keyEvent;
    private mouseEncoderSlot;
    private mouseEncoder;
    private mouseEventSlot;
    private mouseEvent;
    private ptyWriterId;
    private ptyWriter;
    private scratch;
    private graphemes;
    private graphemeCapacity;
    private style;
    private scrollbar;
    private rows;
    private disposed;
    private keyboardLayoutMap;
    private constructor();
    static create(cols: number, rows: number, cellWidth: number, cellHeight: number, theme: GhosttyTheme, onPtyData: (data: string) => void): Promise<GhosttyTerminalCore>;
    private initialize;
    write(data: string | Uint8Array): void;
    resetAndWrite(data: string): void;
    resize(cols: number, rows: number, cellWidth: number, cellHeight: number): void;
    /**
     * Ghostty's built-in default cursor is steady, while the xterm.js renderer
     * this replaced ran with `cursorBlink: true`. Option 23 is the embedder's
     * default blink, which is the state a session starts in and returns to on
     * DECSCUSR reset (CSI 0 q), so programs that ask for a specific cursor
     * through DECSCUSR or DEC mode 12 still win.
     */
    private applyDefaultCursorBlink;
    setTheme(theme: GhosttyTheme): void;
    scroll(deltaRows: number): void;
    scrollToBottom(): void;
    isViewportActive(): boolean;
    scrollbarState(): GhosttyScrollbar | null;
    isMouseTracking(): boolean;
    isMouseAnyEventTracking(): boolean;
    isAlternateScreen(): boolean;
    isApplicationCursorKeys(): boolean;
    /** macOS word editing for legacy prompts; application keyboard modes keep the original key. */
    encodeMacWordShortcut(event: GhosttyKeyInput, platform: string): string | null;
    encodeKey(event: GhosttyKeyInput, platform: string, action?: 'press' | 'release'): string;
    encodePaste(data: string): string;
    encodeMouse(input: GhosttyMouseInput): string;
    setSelection(anchor: GhosttyPointInput, end: GhosttyPointInput): void;
    selectAll(): void;
    selectWord(col: number, row: number): GhosttySelectionRange | null;
    selectLine(col: number, row: number): GhosttySelectionRange | null;
    hyperlinkAt(col: number, row: number): string | null;
    clearSelection(): void;
    snapshot(): GhosttySnapshot;
    selectionText(): string;
    viewportPointToScreen(col: number, row: number): {
        x: number;
        y: number;
    } | null;
    screenPointToViewport(col: number, row: number): {
        x: number;
        y: number;
    } | null;
    private convertPoint;
    dispose(): void;
    private encodeOutput;
    private readRow;
    private gridRef;
    private selectAt;
    private pointFromGridRef;
    private getU16;
    private getU32;
    private getBool;
    private getColor;
    private getRowBool;
    private getCellU32;
    private getCellBool;
    private getCellColor;
    private readColor;
    private emptyCell;
    private assertSuccess;
    private ensureActive;
}
export declare function ghosttyColorsEqual(left: GhosttyColor, right: GhosttyColor): boolean;
export {};
