import React from 'react';
import { type PluginScope } from '@/stores/usePluginsStore';
interface AddPluginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultScope?: PluginScope;
}
export declare const AddPluginDialog: React.FC<AddPluginDialogProps>;
export {};
