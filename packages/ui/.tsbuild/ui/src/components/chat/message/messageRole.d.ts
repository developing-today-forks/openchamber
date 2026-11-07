import type { Message } from '@/lib/opencode/model';
interface MessageRoleInfo {
    role: string;
    isUser: boolean;
}
export declare const deriveMessageRole: (messageInfo: Message | (Message & {
    clientRole?: string;
    userMessageMarker?: boolean;
})) => MessageRoleInfo;
export {};
