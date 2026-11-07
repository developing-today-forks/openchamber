export interface InlineCommentInputProps {
    initialText?: string;
    onTextChange?: (text: string) => void;
    onSave: (text: string, range?: {
        start: number;
        end: number;
        side?: 'additions' | 'deletions';
    }) => void;
    onCancel: () => void;
    fileLabel?: string;
    lineRange?: {
        start: number;
        end: number;
        side?: 'additions' | 'deletions';
    };
    isEditing?: boolean;
    className?: string;
    maxWidth?: number;
    /** Fill of the selected lines the comment belongs to, when the host knows it. */
    bandColor?: string;
    /**
     * A floating pill like the chat's comment field, with no band: for rendered
     * previews, where there are no selected lines for a band to continue.
     */
    floating?: boolean;
}
/**
 * The comment editor shown under selected diff, editor and preview lines. It
 * sits in a band tinted like the selected lines it comments on (the editor's
 * selected-line fill, or `bandColor` from a diff), with the field and a round
 * attach button inside. Over a rendered preview it floats as a glass pill
 * instead (`floating`), like the chat's comment field.
 *
 * The field is a plain textarea because it lives inside other editors' DOM: an
 * annotation slot of the diff viewer's shadow tree and a block widget of the
 * file editor. The composer's CodeMirror editor there lost its caret and
 * jumped to the start of the line while typing; a textarea owns its caret and
 * selection and is not affected by the host editor's DOM.
 */
export declare function InlineCommentInput({ initialText, onTextChange, onSave, onCancel, fileLabel, lineRange, isEditing, className, maxWidth, bandColor, floating, }: InlineCommentInputProps): import("react/jsx-runtime").JSX.Element;
