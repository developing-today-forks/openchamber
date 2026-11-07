import React from 'react';
import type { FormRequest } from '@/lib/opencode/model';
interface FormCardProps {
    form: FormRequest;
}
/**
 * The inline card for a form request, used where a dock cannot float: the
 * BTW sheet renders its child session's forms with it. The main composer
 * shows forms in `FormDock` instead, one field at a time.
 *
 * A form request is a single blocking question with typed fields, so the card
 * renders every visible field at once and submits one answer. Fields gated by
 * a `when` clause appear and disappear as their controlling field changes.
 */
export declare const FormCard: React.FC<FormCardProps>;
export {};
