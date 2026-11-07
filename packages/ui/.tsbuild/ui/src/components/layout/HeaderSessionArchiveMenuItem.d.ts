import type { SessionTabMenuComponents } from './SessionTabsStrip';
export declare function HeaderSessionArchiveMenuItem({ sessionId, onArchive, Item }: {
    sessionId: string;
    onArchive: () => void;
    Item: SessionTabMenuComponents['Item'];
}): import("react/jsx-runtime").JSX.Element | null;
