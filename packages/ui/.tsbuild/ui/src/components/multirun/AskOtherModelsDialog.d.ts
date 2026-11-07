import React from 'react';
import type { Session } from '@/lib/opencode/model';
export declare function AskOtherModelsDialog({ session, turnUserMessageId, open, onOpenChange, }: {
    session: Session;
    turnUserMessageId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}): React.ReactNode;
