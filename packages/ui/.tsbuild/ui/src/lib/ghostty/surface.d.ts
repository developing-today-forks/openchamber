import { type GhosttyScrollbar, type GhosttySnapshot, type GhosttyTheme } from './core';
import { type GhosttyCellRange, type GhosttyCellMetrics } from './renderer';
export declare const DEFAULT_TERMINAL_FONT_FAMILY: string;
/** Requested terminal font; omitted fields fall back to the defaults. */
export interface GhosttyTerminalFont {
    readonly family?: string;
    readonly size?: number;
}
/** Load every style the renderer can request, then validate the actual face. */
export declare function loadTerminalFontFamily(family: string | undefined, size: number, environment?: {
    readonly load: (font: string, text: string) => Promise<void>;
    readonly resolve: (family: string | undefined) => string;
}): Promise<string>;
export declare function terminalFontSize(size?: number): number;
/**
 * Whether the cursor should keep toggling. An unfocused surface draws a steady
 * hollow cursor instead of blinking, and a reduced-motion reader gets a steady
 * cursor too rather than a permanently animating element.
 */
export declare function shouldBlinkTerminalCursor(state: {
    readonly focused: boolean;
    readonly cursorBlinking: boolean;
    readonly cursorVisible: boolean;
    readonly reducedMotion: boolean;
}): boolean;
/**
 * Vertical origin of the grid inside the mount. While content is shorter than
 * the viewport the grid sits at the top like a fresh terminal. Once scrollback
 * exists the prompt lives on the bottom row, so the grid anchors to the bottom
 * edge instead: the sub-row remainder moves above row 0 and resizing within a
 * row boundary keeps the prompt pinned instead of snapping up and down.
 */
export declare function terminalContentOriginY(mountHeight: number, padding: number, rows: number, cellHeight: number, anchorBottom: boolean): number;
export interface TerminalScrollbarGeometry {
    readonly thumbHeight: number;
    readonly thumbTop: number;
    readonly maxOffset: number;
}
export declare function terminalScrollbarGeometry(state: GhosttyScrollbar, trackHeight: number): TerminalScrollbarGeometry | null;
export declare function terminalScrollbarOffsetAtPointer(state: GhosttyScrollbar, trackHeight: number, pointerY: number, pointerOffset: number): number;
export declare function terminalGridCellAt(options: {
    bounds: {
        left: number;
        top: number;
    };
    clientX: number;
    clientY: number;
    cols: number;
    rows: number;
    metrics: Pick<GhosttyCellMetrics, 'width' | 'height'>;
    padding: number;
    originY: number;
}): {
    x: number;
    y: number;
} | null;
export interface TerminalLinkWithRange {
    readonly text: string;
    readonly range: GhosttyCellRange;
}
export declare function terminalLinkAtPositionWithRange(rows: GhosttySnapshot['rowData'], rowIndex: number, column: number): TerminalLinkWithRange | null;
export declare function isTerminalCopyShortcut(event: Pick<KeyboardEvent, 'ctrlKey' | 'key' | 'metaKey' | 'shiftKey'>, platform?: string): boolean;
export declare function isTerminalPasteShortcut(event: Pick<KeyboardEvent, 'ctrlKey' | 'key' | 'metaKey' | 'shiftKey'>, platform?: string): boolean;
/**
 * Decides which of the racing paste paths reaches the shell. A paste shortcut
 * starts a clipboard read and also lets the browser fire its own paste event;
 * whichever arrives first delivers. Native-first is settled by the token: the
 * event invalidates the read. Read-first (WebKit) leaves the native event of
 * the same keystroke still to come, so the read records it as owed and the
 * event is swallowed when it arrives. Browsers that never fire the event let
 * the debt expire after `SHORTCUT_PASTE_ECHO_MS`.
 */
export declare class TerminalPasteArbiter {
    private token;
    private owedNativePastes;
    private lastShortcutReadAt;
    /** Claims the race for a clipboard read about to start. */
    beginRead(): number;
    /**
     * Whether the read for `token` delivers. `owesNativePaste` marks a read that
     * delivers text for a keystroke whose native paste event may still come.
     */
    settleRead(token: number, owesNativePaste: boolean, now: number): boolean;
    /** Whether a native paste event with text delivers. */
    settleNativePaste(now: number): boolean;
    private expireOwedPastes;
}
type TerminalMouseAction = 'press' | 'release' | 'motion';
export interface TerminalMouseDataResolution {
    readonly send: boolean;
    readonly nextMotionData: string;
}
export interface TerminalWheelRows {
    readonly rows: number;
    readonly remainder: number;
}
export declare function resolveTerminalMouseData(action: TerminalMouseAction, data: string, previousMotionData: string): TerminalMouseDataResolution;
export declare function terminalWheelDeltaRows(event: Pick<WheelEvent, 'deltaY' | 'deltaMode'>, cellHeight: number, viewportRows: number, remainder: number): TerminalWheelRows;
export declare function terminalWheelArrowData(rows: number, applicationCursorKeys: boolean): string;
export declare function isTerminalLinkPointerGesture(event: Pick<MouseEvent, 'ctrlKey' | 'metaKey'>, platform?: string): boolean;
export interface TerminalSelectionClickSequence {
    readonly count: number;
    readonly time: number;
    readonly x: number;
    readonly y: number;
}
export declare function advanceTerminalSelectionClickSequence(previous: TerminalSelectionClickSequence | null, event: Pick<PointerEvent, 'clientX' | 'clientY' | 'timeStamp'>): TerminalSelectionClickSequence;
export interface GhosttyGridPoint {
    readonly x: number;
    readonly y: number;
}
export interface GhosttySelectionPosition {
    readonly start: {
        readonly x: number;
        readonly y: number;
    };
    readonly end: {
        readonly x: number;
        readonly y: number;
    };
}
export interface GhosttyTerminalSurfaceOptions {
    readonly theme: GhosttyTheme;
    readonly font?: GhosttyTerminalFont;
    /** Read after font and WASM loading. Hosts can supply a getter for the latest value. */
    readonly visible?: boolean;
    /** Accessible names for the hidden input and the scrollbar, already localized by the host. */
    readonly labels: {
        readonly input: string;
        readonly scrollbar: string;
    };
    /**
     * When false the surface ignores touch pointers (and the compatibility mouse
     * events that follow them) so the host can run its own scroll and
     * long-press selection gestures through `scrollLines`, `selectWordAt` and
     * `extendSelectionTo`. Defaults to true.
     */
    readonly handleTouchPointer?: boolean;
    readonly onData: (data: string) => void;
    readonly onResize: (cols: number, rows: number) => void;
    readonly onSelectionChange?: () => void;
    /** Return false to keep a key press from reaching the terminal (host shortcuts). */
    readonly beforeKey?: (event: KeyboardEvent) => boolean;
    readonly onLinkActivate?: (text: string, event: MouseEvent) => void;
    /**
     * A right-click the running application did not claim through mouse
     * reporting. The host owns the menu, so it also owns preventing the browser
     * default — whose Paste entry can never reach a canvas terminal.
     */
    readonly onContextMenu?: (event: MouseEvent) => void;
}
export declare class GhosttyTerminalSurface {
    readonly canvas: HTMLCanvasElement;
    readonly input: HTMLTextAreaElement;
    readonly scrollbar: HTMLDivElement;
    cols: number;
    rows: number;
    private readonly mount;
    private readonly context;
    private readonly core;
    private readonly options;
    private visible;
    private hasSize;
    private metrics;
    private fontFamily;
    private requestedFontFamily;
    private fontSize;
    private fontEpoch;
    private pendingFontEpoch;
    private readonly resizeObserver;
    private readonly scrollbarThumb;
    private snapshot;
    private frame;
    private cursorTimer;
    private compositionInputToSuppress;
    private compositionSuppressionTimer;
    private cursorOn;
    private renderedCursorY;
    private forceFullRender;
    private scrollbarDirty;
    private scrollbarState;
    private scrollbarPointerId;
    private scrollbarPointerOffset;
    private disposed;
    private resizeNotifyTimer;
    private originY;
    private mountHeight;
    private selectionEnd;
    private selectionAnchorScreen;
    private selectionEndScreen;
    private selectionMode;
    private selectionBase;
    private selectionScrollTimer;
    private selectionScrollDelta;
    private selectionPointer;
    private mouseReportingPointerId;
    private mouseReportingButton;
    private linkActivationPointerId;
    private hoveredLink;
    private hoverPointer;
    private linkModifierActive;
    private selectionClickSequence;
    private selectionMoved;
    private composing;
    private focused;
    private resizeNotified;
    private canvasConfigured;
    private theme;
    private readonly suppressedKeyCodes;
    private readonly pasteArbiter;
    private copyShortcutToken;
    private clearSelectionAfterCopy;
    private primedCopySelection;
    private readonly restingInputValue;
    private wheelRemainder;
    private lastMouseMotionData;
    private mouseAnyEventTracking;
    private dprMedia;
    private readonly reducedMotionMedia;
    private inputLeft;
    private inputTop;
    private lastTouchPointerAt;
    private constructor();
    static create(mount: HTMLElement, options: GhosttyTerminalSurfaceOptions): Promise<GhosttyTerminalSurface>;
    /** Pause canvas work without interrupting output parsing or terminal replies. */
    setVisible(visible: boolean): void;
    write(data: string): void;
    /**
     * Replaces the screen with replayed history. History was laid out by the
     * shell for the PTY size it had at the time; when that differs from the
     * fitted grid the replay runs at the drawn size and Ghostty reflows to the
     * fitted grid afterwards, so lines wrap where the shell wrapped them.
     */
    resetAndWrite(data: string, drawnSize?: {
        readonly cols: number;
        readonly rows: number;
    }): void;
    setTheme(theme: GhosttyTheme): void;
    setFont(font: GhosttyTerminalFont): Promise<void>;
    private applyFontMetrics;
    private readonly onReducedMotionChange;
    private readonly onFontsLoaded;
    fit(): boolean;
    /**
     * The local grid reflows immediately, but the PTY only hears about settled
     * dimensions: notifying on every drag step makes the shell reprint its
     * prompt mid-drag, which reads as jitter.
     */
    private notifyResize;
    focus(): void;
    /**
     * Pastes clipboard text read by the host (context menu) with the same
     * bracketed-paste encoding as a native paste event. The read joins the same
     * race the paste shortcut uses — the token is claimed before it starts — so
     * a shortcut or native paste arriving during the read supersedes this one
     * instead of both reaching the shell.
     */
    pasteFromClipboard(readText: () => Promise<string>, isCurrent?: () => boolean): Promise<void>;
    hasSelection(): boolean;
    getSelection(): string;
    getSelectionPosition(): GhosttySelectionPosition | null;
    getSelectionEndClientRect(): {
        readonly right: number;
        readonly bottom: number;
    } | null;
    clearSelection(): void;
    scrollToBottom(): void;
    isAtBottom(): boolean;
    /**
     * Repaints every row on the next frame. Hosts call this once a container
     * transition (panel open, resize handle release) has settled: the canvas
     * itself did not change, but a compositor that cached it mid-transition
     * only drops that cache when the canvas contents update.
     */
    refresh(): void;
    /** Scrolls the viewport by whole rows; positive moves toward the bottom. */
    scrollLines(deltaRows: number): void;
    /** Starts a word selection at a client point (touch long-press). Returns whether a word was found. */
    selectWordAt(clientX: number, clientY: number): boolean;
    /** Extends the current selection to a client point, keeping the selection mode's granularity. */
    extendSelectionTo(clientX: number, clientY: number): void;
    dispose(): void;
    private readonly onKeyDown;
    private readonly onKeyUp;
    private readonly onFocus;
    private readonly onBlur;
    private readonly onDevicePixelRatioChange;
    private watchDevicePixelRatio;
    private primeCopy;
    private clearPrimedCopy;
    /** Returns the textarea to its resting value with the caret at the end. */
    private resetInput;
    /**
     * Gboard's space-bar swipe moves the caret in front of the resting space
     * without firing any event, and the next deletion would then find nothing.
     * Every key, including the keyboard's own code-229 key, arrives before its
     * edit, so put the caret back there.
     */
    private restoreRestingCaret;
    /** Text the keyboard put in the textarea, without the resting value. */
    private typedInput;
    private readonly onCopyEvent;
    private readonly onPaste;
    private readonly onCompositionStart;
    private readonly onCompositionEnd;
    private readonly onInput;
    private sendBackspace;
    private clearCompositionInputSuppression;
    private ignoresTouchPointer;
    private readonly onPointerDown;
    private readonly onPointerMove;
    private extendSelectionToPoint;
    private setSelectionAutoscroll;
    private updateHoverCursor;
    private updateLinkModifier;
    private readonly onPointerLeave;
    private clearHoveredLink;
    private refreshHoveredLink;
    private setHoveredLink;
    private readonly onPointerUp;
    private readonly onWheel;
    private readonly onMouseDown;
    private readonly onContextMenu;
    private readonly onScrollbarPointerDown;
    private readonly onScrollbarPointerMove;
    private readonly onScrollbarPointerUp;
    private readonly onScrollbarKeyDown;
    private installEvents;
    private removeEvents;
    private scrollViewport;
    private scrollbarToPointer;
    private updateScrollbar;
    private readScrollbarState;
    private requestRender;
    private cancelRender;
    private renderFrame;
    private scheduleCursorBlink;
    private blinkEnabled;
    private positionInput;
    private cellAt;
    private linkAt;
    private sendMouse;
    private synchronizeMouseTrackingState;
    private buttonFromButtons;
}
export {};
