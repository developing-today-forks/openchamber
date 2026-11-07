import type React from 'react';
export declare function getDropdownNavigationKey(event: Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey'>): 'ArrowDown' | 'ArrowUp' | null;
type DropdownNavigationEvent = Pick<React.KeyboardEvent<HTMLElement>, 'altKey' | 'code' | 'ctrlKey' | 'defaultPrevented' | 'isPropagationStopped' | 'key' | 'metaKey' | 'preventDefault' | 'shiftKey' | 'stopPropagation'>;
export declare function handleDropdownNavigationKey(event: DropdownNavigationEvent, navigate: (key: 'ArrowDown' | 'ArrowUp') => void): boolean;
export declare function shouldDismissDropdown(event: KeyboardEvent | React.KeyboardEvent): boolean;
export {};
