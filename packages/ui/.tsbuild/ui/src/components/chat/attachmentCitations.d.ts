interface ImageAttachmentCandidate {
    name: string;
    type?: string;
}
interface CitationRange {
    start: number;
    end: number;
}
export declare const isGenericImageFilename: (filename: string) => boolean;
export declare const assignImageAttachmentFilenames: (files: ImageAttachmentCandidate[], existingFilenames: string[]) => string[];
/** Next unused `pasted-context-N.txt` name for a large text paste attachment. */
export declare const nextPastedContextFilename: (existingFilenames: string[]) => string;
/** The attachment carries the name its citation uses. */
export declare const renameFileForAttachmentCitation: (file: File, filename: string) => File;
export declare const buildAttachmentCitationText: (filenames: string[]) => string;
/**
 * Markdown links to images saved where OpenCode runs, so a model without image
 * input (or its subagent) can open them by path. A plain link: a draft that
 * starts with `!` switches the composer into shell mode, so `![name](path)`
 * cannot lead a message. Windows paths get forward slashes, which every
 * Windows tool accepts and markdown does not read as escapes; a path with
 * spaces or parentheses goes in angle brackets.
 */
export declare const buildImagePathCitationText: (images: Array<{
    filename: string;
    path: string;
}>) => string;
/**
 * What the composer does with an image while the "save pasted images as files"
 * setting is on (`attach` while it is off). `instead`: a model without image
 * input gets the saved file linked by path and no attachment, which it could
 * not read (#5087). `alongside`: the model gets the attachment and the message
 * also links the saved file, for tools that need it (#5218). Unknown model
 * metadata counts as a model that takes the attachment.
 */
export declare const imageSaveModeForModel: (savePastedImagesAsFiles: boolean, inputModalities: string[] | undefined) => 'instead' | 'alongside' | 'attach';
/** Names of the markdown links already in the text, so a new paste picks a free one. */
export declare const findImagePathCitationNames: (text: string) => string[];
export declare const findAttachmentCitationRanges: (text: string, filenames: string[]) => CitationRange[];
export {};
