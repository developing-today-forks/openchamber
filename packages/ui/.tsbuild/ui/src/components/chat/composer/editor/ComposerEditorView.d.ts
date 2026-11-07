import { EditorView } from '@codemirror/view';
/** The composer avoids CodeMirror EditContext because of the Android IME failure. */
export declare class ComposerEditorView extends EditorView {
    static EDIT_CONTEXT: boolean;
}
