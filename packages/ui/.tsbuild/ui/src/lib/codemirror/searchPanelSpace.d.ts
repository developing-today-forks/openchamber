import { StateField, type Extension } from '@codemirror/state';
/**
 * The search panel floats over the top of the editor, so at the top of a file it
 * covers the first lines. While it is open, the content gets a top padding as tall
 * as the panel: line 1 starts below the panel, and the space scrolls away with the
 * text, so further down the panel floats over the text as before.
 */
export declare const setSearchPanelSpace: import("@codemirror/state").StateEffectType<number>;
export declare const searchPanelSpaceField: StateField<number>;
export declare function searchPanelSpace(): Extension;
