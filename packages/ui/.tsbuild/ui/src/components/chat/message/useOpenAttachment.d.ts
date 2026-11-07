import type { AttachmentOpenTarget } from '@/lib/messages/attachmentPreview';
import type { ToolPopupContent } from './types';
/**
 * Opens what an attachment of a sent message resolves to. A file attached by
 * path opens like any file path in the chat: in the editor in VS Code, in the
 * Files drawer in the mobile app, in a Files tab elsewhere.
 */
export declare function useOpenAttachment(onShowPopup: ((content: ToolPopupContent) => void) | undefined): (target: AttachmentOpenTarget) => void;
