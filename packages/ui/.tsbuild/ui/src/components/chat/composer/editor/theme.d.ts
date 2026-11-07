/**
 * The composer editor's layout, typography and caret.
 *
 * Token colours are not here: they come from the shared highlight classes the
 * language layer emits, so the composer and the message list stay in step.
 */
import type { Extension } from '@codemirror/state';
/**
 * Exported for the regression test, which asserts the caret is styled where it
 * is actually drawn.
 */
export declare const COMPOSER_EDITOR_THEME_SPEC: {
    '&': {
        backgroundColor: string;
        color: string;
    };
    '&.cm-focused': {
        outline: string;
    };
    '.cm-content': {
        padding: string;
        paddingInlineStart: string;
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
        minHeight: string;
    };
    '&.cm-editor .cm-cursor, &.cm-editor .cm-dropCursor': {
        borderLeftColor: string;
        borderLeftWidth: string;
        transform: string;
        transformOrigin: string;
    };
    '.cm-line': {
        padding: string;
    };
    '.cm-scroller': {
        fontFamily: string;
        fontSize: string;
        lineHeight: string;
        overflowX: string;
    };
    '.cm-placeholder': {
        color: string;
    };
    '&.cm-editor .cm-selectionBackground, & .cm-selectionBackground': {
        background: string;
    };
    '&.cm-editor.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground': {
        background: string;
    };
};
export declare const composerEditorTheme: Extension;
/**
 * Outside CodeMirror's iOS branch, devices keep `drawSelection()` but show the
 * NATIVE selection through it, for two independent reasons:
 *
 * - Their selection drag handles (the draggable pins after a double-tap)
 *   attach to the *visible* native selection, and `drawSelection()`
 *   hides it with `.cm-line ::selection { background: transparent
 *   !important }`, so the handles never appear and range selection is
 *   undiscoverable.
 * - The painted selection layer sits *behind* the content, so any token with
 *   its own background — inline code, code fences — covers it completely and
 *   the selection is invisible inside those spans. The native selection
 *   paints over element backgrounds.
 *
 * Dropping `drawSelection()` entirely is NOT an option, on any platform:
 * without it CodeMirror clears the `nativeSelectionHidden` facet and starts
 * enforcing cursor association on the native selection while typing in
 * wrapped text — programmatic selection moves that iOS answers with severe
 * input lag (each one also resets the keyboard's autocorrect context). Typing
 * must stay on the drawn-selection code path; only the paint changes.
 *
 * CodeMirror's iOS branch does NOT use this arrangement —
 * `composerIOSSelectionExtension` below explains why.
 *
 * Both rules below fight `drawSelection()`'s own `Prec.highest` theme, so
 * they carry `!important` and one class more specificity
 * (`.cm-content .cm-line` vs its `.cm-line`) to win regardless of style
 * mount order. The painted selection layer is hidden rather than removed —
 * two highlights would otherwise stack.
 */
export declare const NATIVE_SELECTION_THEME_SPEC: {
    '& .cm-content .cm-line ::selection, & .cm-content .cm-line::selection': {
        backgroundColor: string;
        color: string;
    };
    '&.cm-editor.oc-native-range .cm-content, &.cm-editor.oc-native-range .cm-content .cm-line': {
        caretColor: string;
    };
    '&.oc-native-range .cm-scroller > .cm-cursorLayer': {
        display: string;
    };
    '& .cm-scroller > .cm-selectionLayer': {
        display: string;
    };
};
/**
 * The native-selection arrangement, installed outside CodeMirror's iOS branch:
 * the theme above plus the `.oc-native-range` marker class that scopes its
 * caret rules to the moments a range is actually selected. `editorAttributes`
 * re-evaluates on every update, so the class follows the selection with no
 * listener of its own.
 */
export declare const composerNativeSelectionExtension: Extension;
/**
 * When its iOS predicate matches, CodeMirror 6.43.9 draws the range handles
 * into the same layer as the selection, so CodeMirror owns both their geometry
 * and appearance.
 *
 * That layer normally renders at `z-index: -1`, behind the content. Inline
 * code and code fences have opaque backgrounds and would cover both the tint
 * and handles. Raising the one existing layer fixes that without introducing
 * a second set of rectangles or trying to imitate WebKit's controls. The
 * layer remains transparent to touch so WebKit receives selection gestures.
 *
 * What iOS avoids is the native-selection workaround above: explicitly
 * restoring the native highlight and caret makes WebKit re-measure and repaint
 * that UI after every decoration redraw. `composerLanguage.ts` rebuilds the
 * whole decoration set on every keystroke, so the cost is felt worst during
 * IME composition where each intermediate replacement pays for it. WebKit's
 * unavoidable system selection overlay remains the only visible fill.
 */
export declare const IOS_SELECTION_THEME_SPEC: {
    '& .cm-scroller': {
        marginBlock: string;
        paddingBlock: string;
    };
    '& .cm-scroller > .cm-selectionLayer': {
        zIndex: string;
        pointerEvents: string;
    };
    '& .cm-selectionBackground': {
        background: string;
    };
};
export declare const composerIOSSelectionExtension: Extension;
/**
 * Which selection paint the composer installs. The split is the platform's,
 * not a preference: iOS is the one place where restoring native selection
 * paint and caret costs measurable input latency, and the only place
 * CodeMirror supplies replacement drag handles.
 *
 * The caller can pass the policy, so the choice stays testable and is made
 * once per editor rather than once per module load.
 */
export declare function composerSelectionExtension(useCodeMirrorIOSHandles?: boolean): Extension;
/**
 * Mirrors @codemirror/view 6.43.9's iOS predicate. This branch may only rely
 * on the drawn handles when CodeMirror itself will create them; a broader iOS
 * heuristic could remove the native fallback without installing a replacement.
 */
export declare function isCodeMirrorIOSNavigator(userAgent: string, vendor: string, maxTouchPoints: number): boolean;
