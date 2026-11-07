export declare function hasOpenDropdown(root?: ParentNode): boolean;
export declare function hasActiveBtwComposer(root?: ParentNode): boolean;
export declare function shouldStopDropdownImeEscape(event: Pick<KeyboardEvent, 'isComposing' | 'key' | 'keyCode'>, dropdownOpen: boolean): boolean;
export declare function isEditableEventTarget(target: EventTarget | null): boolean;
export declare function canUseDigitShortcut(event: KeyboardEvent): boolean;
