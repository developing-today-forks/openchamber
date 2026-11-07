import { toast as sonnerToast } from "sonner";
import type { ExternalToast } from "sonner";
type ToastWithAction = (message: string | React.ReactNode, data?: ExternalToast) => string | number;
type AppToast = Omit<typeof sonnerToast, 'success' | 'info' | 'error' | 'warning'> & {
    success: ToastWithAction;
    info: ToastWithAction;
    error: ToastWithAction;
    warning: ToastWithAction;
};
export declare const toast: AppToast;
export {};
