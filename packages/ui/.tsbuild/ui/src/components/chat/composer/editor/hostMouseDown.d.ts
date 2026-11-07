import type { EditorView } from '@codemirror/view';
import type { MouseEvent } from 'react';
type ComposerHostMouseDownEvent = Pick<MouseEvent, 'target' | 'clientX' | 'clientY' | 'preventDefault'>;
export declare function handleComposerHostMouseDown(view: EditorView | null, event: ComposerHostMouseDownEvent): void;
export {};
