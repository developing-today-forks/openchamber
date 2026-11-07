import React from 'react';
interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}
export declare const ErrorBoundary: React.FC<ErrorBoundaryProps>;
export {};
