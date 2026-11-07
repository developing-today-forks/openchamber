type PairingResponse = {
    kind: 'success';
    token: string;
} | {
    kind: 'rejected';
} | {
    kind: 'http-error';
    status: number;
} | {
    kind: 'invalid-response';
};
export declare const readPairingResponse: (response: Response) => Promise<PairingResponse>;
export {};
