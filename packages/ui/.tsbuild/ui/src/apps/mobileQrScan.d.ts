import { type PairingConnectionPayload } from '@/lib/connectionPayload';
type MobileConnectionPayload = {
    url: string;
    clientToken?: string;
    label?: string;
};
type MobilePairingPayload = {
    pairing: PairingConnectionPayload;
};
type QrScanResult = ({
    status: 'ok';
} & MobileConnectionPayload) | ({
    status: 'pairing';
} & MobilePairingPayload) | {
    status: 'cancelled';
} | {
    status: 'unsupported';
} | {
    status: 'permission-denied';
} | {
    status: 'invalid';
} | {
    status: 'failed';
};
export declare const parseConnectionPayload: (raw: string) => MobileConnectionPayload | MobilePairingPayload | null;
export declare const isQrScanSupported: () => boolean;
export declare const scanConnectionQr: (options?: {
    signal?: AbortSignal;
}) => Promise<QrScanResult>;
export {};
