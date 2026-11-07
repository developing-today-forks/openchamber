import React from 'react';
import type { FormField } from '@opencode/client';
import { type FormValues } from './formCardState';
export interface FormFieldControlProps {
    field: FormField;
    values: FormValues;
    /** Keys of required fields still unanswered, used to mark the label. */
    missing: string[];
    showErrors: boolean;
    isResponding: boolean;
    updateValue: (key: string, patch: Partial<FormValues[string]>) => void;
    /** Enter in a text box submits or advances; the owner decides which. */
    onTextKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
export declare function FormFieldControl({ field, values, missing, showErrors, isResponding, updateValue, onTextKeyDown }: FormFieldControlProps): import("react/jsx-runtime").JSX.Element;
