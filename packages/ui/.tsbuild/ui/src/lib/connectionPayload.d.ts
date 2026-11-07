type PairingDirectCandidate = {
    type: 'lan' | 'tunnel';
    url: string;
    priority?: number;
};
type PairingRelayCandidate = {
    type: 'relay';
    relayUrl: string;
    serverId: string;
    hostEncPubJwk: JsonWebKey;
    grant?: string;
    priority?: number;
};
export type PairingEndpointCandidate = PairingDirectCandidate | PairingRelayCandidate;
export type PairingConnectionPayload = {
    v: 2;
    pairingId: string;
    secret: string;
    label?: string;
    fingerprint?: string;
    expiresAt?: string;
    candidates: PairingEndpointCandidate[];
};
export declare const buildPairingConnectionPayload: (input: Omit<PairingConnectionPayload, 'v'>) => PairingConnectionPayload;
export declare const encodePairingConnectionPayload: (payload: PairingConnectionPayload) => string;
export declare const parsePairingConnectionPayload: (value: string) => PairingConnectionPayload | null;
export declare const parsePairingConnectionPayloadString: (value: string) => PairingConnectionPayload | null;
export {};
