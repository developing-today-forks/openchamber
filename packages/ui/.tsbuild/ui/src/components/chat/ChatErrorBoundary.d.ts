import React from 'react';
interface ChatErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}
interface ChatErrorBoundaryProps {
    children: React.ReactNode;
    sessionId?: string;
}
interface ChatErrorBoundaryTexts {
    title: string;
    description: string;
    sessionLabel: string;
    detailsSummary: string;
    resetAction: string;
    persistentHint: string;
}
interface ChatErrorBoundaryViewProps extends ChatErrorBoundaryProps {
    texts: ChatErrorBoundaryTexts;
}
export declare class ChatErrorBoundaryView extends React.Component<ChatErrorBoundaryViewProps, ChatErrorBoundaryState> {
    constructor(props: ChatErrorBoundaryViewProps);
    static getDerivedStateFromError(error: Error): ChatErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    componentDidUpdate(previousProps: ChatErrorBoundaryViewProps, previousState: ChatErrorBoundaryState): void;
    handleReset: () => void;
    render(): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | Iterable<React.ReactNode> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | React.ReactPortal | null | undefined> | null | undefined;
}
export declare function ChatErrorBoundary(props: ChatErrorBoundaryProps): import("react/jsx-runtime").JSX.Element;
export {};
