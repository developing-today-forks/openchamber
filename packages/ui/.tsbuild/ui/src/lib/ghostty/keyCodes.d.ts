export declare function ghosttyKeyForCode(code: string): number;
export interface GhosttyKeyboardLayoutMap {
    get(code: string): string | undefined;
}
export declare function loadGhosttyKeyboardLayoutMap(): Promise<GhosttyKeyboardLayoutMap | undefined>;
export declare function ghosttyConsumedMods(event: Pick<KeyboardEvent, 'altKey' | 'code' | 'ctrlKey' | 'key' | 'metaKey' | 'shiftKey'>, layoutMap?: GhosttyKeyboardLayoutMap, macOption?: boolean): number;
export declare function ghosttyUnshiftedCodepoint(event: Pick<KeyboardEvent, 'code' | 'key' | 'shiftKey'>, layoutMap?: GhosttyKeyboardLayoutMap): number;
