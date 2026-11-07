import React from 'react';
/**
 * Which surfaces the context rail shows. Everything is on by default and the
 * choice is stored as the *hidden* set, so a surface added in a later release
 * appears for everyone rather than staying invisible to whoever had saved
 * settings before it existed. Hidden surfaces also leave the digit shortcuts
 * (the rail and the shortcut share one visibility filter).
 */
export declare const ContextRailSurfacesDialog: React.FC<{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}>;
