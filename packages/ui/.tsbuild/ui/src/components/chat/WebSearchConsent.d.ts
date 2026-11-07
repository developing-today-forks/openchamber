import React from 'react';
import type { FormRequest } from '@/lib/opencode/model';
import type { WebSearchConsent } from '@/lib/opencode/websearch';
/** Docked above the composer, in place of `FormDock`'s generic panel. */
export declare const WebSearchConsentDock: React.FC<{
    form: FormRequest;
    consent: WebSearchConsent;
}>;
/** Inline variant for the BTW sheet, which renders forms as cards. */
export declare const WebSearchConsentCard: React.FC<{
    form: FormRequest;
    consent: WebSearchConsent;
}>;
