import type { AnnotationSessionResult } from '@/lib/browser/annotationSession';
import type { BrowserAnnotationOverlayLabels } from '@/lib/browser/annotationOverlay';
/**
 * Attaches a finished annotation to the active composer.
 *
 * The screenshot is attached before the text so that a failed image upload
 * cannot leave a prompt claiming an attachment that never arrived — the text
 * states what actually happened.
 */
export declare const useAnnotationAttach: (directory: string, intro?: string) => (result: AnnotationSessionResult) => Promise<void>;
/** Overlay labels, resolved through i18n so the in-page UI follows the app locale. */
export declare const useAnnotationOverlayLabels: () => BrowserAnnotationOverlayLabels;
