export type FileMentionAutocompleteInputSource = 'manual' | 'paste';
export declare const getFileMentionAutocompleteQuery: ({ value, cursorPosition, inputSource, insertedText, }: {
    value: string;
    cursorPosition: number;
    inputSource?: FileMentionAutocompleteInputSource;
    insertedText?: string;
}) => string | null;
