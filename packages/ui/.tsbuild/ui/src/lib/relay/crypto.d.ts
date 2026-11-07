export declare class RelayCryptoError extends Error {
    constructor(message: string);
}
export declare const generateEcdhKeyPair: () => Promise<CryptoKeyPair>;
export declare const exportPublicKeyJwk: (key: CryptoKey) => Promise<JsonWebKey>;
export declare const importEcdhPublicKey: (jwk: JsonWebKey) => Promise<CryptoKey>;
export declare const publicKeyJwkFingerprint: (jwk: JsonWebKey) => string;
export declare const generateHandshakeNonce: () => Uint8Array;
interface SessionKeys {
    clientToHost: CryptoKey;
    hostToClient: CryptoKey;
}
export declare const deriveSessionKeys: (ownPrivateKey: CryptoKey, peerPublicKey: CryptoKey, handshakeNonce: Uint8Array) => Promise<SessionKeys>;
export interface FrameEncryptor {
    encrypt(plaintext: Uint8Array): Promise<Uint8Array>;
}
export interface FrameDecryptor {
    decrypt(frame: Uint8Array): Promise<Uint8Array>;
}
export declare const createFrameEncryptor: (key: CryptoKey) => FrameEncryptor;
export declare const createFrameDecryptor: (key: CryptoKey) => FrameDecryptor;
export declare const bytesToBase64Url: (bytes: Uint8Array) => string;
export declare const base64UrlToBytes: (value: string) => Uint8Array;
export {};
