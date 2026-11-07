import { type FrameDecryptor, type FrameEncryptor } from './crypto';
export interface EstablishedChannelCrypto {
    encryptor: FrameEncryptor;
    decryptor: FrameDecryptor;
}
export type HandshakeAction = {
    type: 'send-text';
    text: string;
} | {
    type: 'established';
    channel: EstablishedChannelCrypto;
    batch: boolean;
    flowControl: boolean;
    replyText?: string;
} | {
    type: 'ignore';
} | {
    type: 'fail';
    closeCode: number;
    reason: string;
};
interface ClientHandshake {
    /** The `hello` text frame. Send on open and re-send on a retry interval until established. */
    helloText: string;
    /** Feed every inbound text frame received before the channel is established. */
    handleText(raw: string): Promise<HandshakeAction>;
    readonly established: boolean;
}
interface ClientHandshakeOptions {
    /** Advertise frame batching. Default true; set false to force legacy behavior. */
    batch?: boolean;
    flowControl?: boolean;
}
export declare const createClientHandshake: (hostEncPubJwk: JsonWebKey, options?: ClientHandshakeOptions) => Promise<ClientHandshake>;
interface HostHandshake {
    /** Feed every inbound text frame. */
    handleText(raw: string): Promise<HandshakeAction>;
    readonly established: boolean;
}
interface HostHandshakeOptions {
    /** Support frame batching. Default true; set false to force legacy behavior. */
    batch?: boolean;
    flowControl?: boolean;
}
export declare const createHostHandshake: (hostEncPrivateKey: CryptoKey, options?: HostHandshakeOptions) => HostHandshake;
export {};
