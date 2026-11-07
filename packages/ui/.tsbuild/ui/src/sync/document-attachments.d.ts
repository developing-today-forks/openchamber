type ExtractedDocumentAttachments = {
    textFile: File;
    images: File[];
};
export declare const extractDocumentAttachments: (file: File, reservedFilenames?: Iterable<string>) => Promise<ExtractedDocumentAttachments | undefined>;
export {};
