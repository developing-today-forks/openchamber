import React from 'react';
interface DiagramEditorHandle {
    getXml: () => string;
}
interface DiagramEditorProps {
    xml: string;
    readOnly?: boolean;
    className?: string;
    onChange?: (xml: string) => void;
}
export declare const DiagramEditor: React.ForwardRefExoticComponent<DiagramEditorProps & React.RefAttributes<DiagramEditorHandle>>;
export {};
