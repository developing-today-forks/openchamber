import React from 'react';
/**
 * What a sessions-sheet header shows or hides. It opens and closes the way the
 * desktop sidebar's rows and a reasoning block in the chat do: its height eases
 * between zero and the content's own as the content fades. It renders only
 * while open or folding away, and a reversal mid-way starts from the height
 * reached. The first render does not animate.
 */
export declare function MobileDisclosure({ open, children }: {
    open: boolean;
    children: () => React.ReactNode;
}): React.ReactNode;
