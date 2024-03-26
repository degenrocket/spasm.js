export type FiltersCategory = "defi" | "nft" | "privacy" | "any" | null;
export type PostId = string | number | null | undefined;
export type PostUrl = string | null | undefined;
export type PostSignature = string | null | undefined;
export type PostAction = Web3MessageAction | null | undefined;
export interface Post {
    id?: PostId;
    guid?: string | null;
    source?: string | null;
    author?: string | null;
    url?: PostUrl;
    description?: string | null;
    pubdate?: string | null;
    target?: string | null;
    action?: PostAction;
    text?: string | null;
    signer?: string | null;
    signed_message?: string | null;
    signature?: PostSignature;
    signed_time?: string | null;
    added_time?: string | null;
    ipfs?: string | null;
    tickers?: string | string[] | null;
    title?: string | null;
    category?: string | null;
    tags?: string[] | null;
    upvote?: number | null;
    downvote?: number | null;
    bullish?: number | null;
    bearish?: number | null;
    important?: number | null;
    scam?: number | null;
    comments_count?: number | null;
    latest_action_added_time?: string | null;
    children?: Post[];
}
export type Web3MessageAction = "post" | "react" | "reply";
export type Web3MessageLicense = "MIT" | "CC0" | "CC0-1.0" | "SPDX-License-Identifier: CC0-1.0" | "SPDX-License-Identifier: MIT";
export interface Web3Message {
    version: string;
    time?: string;
    action: Web3MessageAction;
    target?: string;
    title?: string;
    text?: string;
    license: Web3MessageLicense;
}
export type NostrSpasmTag = SpasmVersionTag | SpasmTargetTag | SpasmActionTag | SpasmCategoryTag | SpasmTitleTag | SpasmLicenseTag;
export type SpasmVersionTag = ["spasm_version", string];
export type SpasmTargetTag = ["spasm_target", string];
export type SpasmActionTag = ["spasm_action", Web3MessageAction];
export type SpasmCategoryTag = ["spasm_category", FiltersCategory];
export type SpasmTitleTag = ["spasm_title", string];
export type SpasmLicenseTag = ["license", Web3MessageLicense];
export type AnyTag = any[];
export type UnknownEvent = DmpEvent | DmpEventSignedClosed | DmpEventSignedOpened | NostrEvent | NostrEventSignedOpened | NostrSpasmEvent | NostrSpasmEventSignedOpened | SpasmEvent;
export type UnknownPostOrEvent = Post | UnknownEvent;
export interface NostrEvent {
    id?: string;
    content: string;
    created_at: number;
    kind: number;
    pubkey: string;
    tags?: AnyTag[];
}
export interface NostrEventSignedOpened extends NostrEvent {
    id: string;
    sig: string;
}
export interface NostrSpasmEvent {
    id?: string;
    content: string;
    created_at: number;
    kind: number;
    pubkey: string;
    tags: [(NostrSpasmTag | AnyTag), ...(NostrSpasmTag | AnyTag)[]];
}
export interface NostrSpasmEventSignedOpened extends NostrSpasmEvent {
    id: string;
    sig: string;
}
export interface DmpEvent extends Web3Message {
}
export interface DmpEventSignedClosed {
    signedString: string;
    signature: string;
    signer?: string;
}
export interface DmpEventSignedOpened extends DmpEventSignedClosed {
    signedObject: DmpEvent;
}
export type SpasmVersion = "1.0.0" | string;
export type EventBaseProtocol = "dmp" | "nostr" | "spasm";
export type EventBaseProtocolVersion = "dmp_v0.1.0" | string;
export type ExtraSpasmFieldsVersion = "1.0.0" | string;
export type EventPrivateKeyType = "ethereum" | "nostr";
export type EventProtocolCryptography = "schnorr" | "ecdsa" | "secp256k1" | string;
export type SpasmAction = Web3MessageAction;
export interface HashesObject {
    sha1?: string;
    sha256?: string;
    infohash?: string;
    ipfs?: string;
}
export interface LinksObject {
    http?: string;
    guid?: string;
    ipfs?: string;
    torrent?: string;
}
export type MimeType = "image/jpeg" | "image/png" | "image/gif" | "image/webp" | "image/svg+xml" | "audio/mpeg" | "audio/ogg" | "audio/wav" | "video/mp4" | "video/ogg" | "video/webm" | "text/plain" | "text/html" | "text/css" | "text/javascript" | "application/json" | "application/xml" | "application/pdf" | "application/octet-stream";
export interface EventMedia {
    hashes?: HashesObject;
    links?: LinksObject;
    type?: MimeType;
}
export interface EventReactions {
    upvote?: number | null;
    downvote?: number | null;
    bullish?: number | null;
    bearish?: number | null;
    important?: number | null;
    scam?: number | null;
    comments_count?: number | null;
    latest_action_added_time?: string | null;
}
export interface SpasmEventMeta {
    baseProtocol?: EventBaseProtocol;
    baseProtocolVersion?: EventBaseProtocolVersion;
    hasExtraSpasmFields?: boolean;
    extraSpasmFieldsVersion?: ExtraSpasmFieldsVersion;
    convertedFrom?: EventType;
    privateKeyType?: EventPrivateKeyType;
    cryptography?: EventProtocolCryptography;
    hashes?: HashesObject;
    previousEvent?: string | number;
    sequence?: number;
    powNonce?: string;
    license?: string;
    language?: string;
}
export interface SpasmEventMetaSigned extends SpasmEventMeta {
    privateKeyType: EventPrivateKeyType;
    cryptography?: EventProtocolCryptography;
}
export interface SpasmEvent {
    meta?: SpasmEventMeta;
    spasmVersion?: SpasmVersion;
    spasmId?: string | number;
    eventId?: string | number;
    dbId?: number | string;
    rootEvent?: string;
    parentEvent?: string;
    action?: string;
    title?: string;
    content?: string;
    source?: string;
    timestamp?: number;
    dbTimestamp?: number | string;
    author?: string;
    category?: string;
    links?: LinksObject;
    keywords?: string[] | string;
    tags?: any[][];
    media?: EventMedia;
    referencedEvents?: string[];
    referencedAuthors?: string[];
    extra?: any;
    originalEventObject?: UnknownPostOrEvent;
    originalEventString?: string;
    reactions?: EventReactions;
    comments?: any[];
    signature?: string;
}
export interface SpasmEventSigned extends SpasmEvent {
    meta: SpasmEventMetaSigned;
    eventId: string | number;
    author: string;
    signature: string;
}
export interface SpasmEventSignedOpened extends SpasmEventSigned {
    originalEventObject: DmpEvent | NostrSpasmEventSignedOpened;
}
export interface SpasmEventSignedClosed extends SpasmEventSigned {
    originalEventString: string;
}
export interface StandardizedEvent {
    signedString?: string;
    signature?: string;
    signer?: string;
    target?: string;
    action?: string;
    title?: string;
    text?: string;
    signedDate?: string;
}
export interface SpasmSource {
    name?: string;
    uiUrl?: string;
    apiUrl?: string;
    query?: string;
    showSource?: boolean;
}
export declare class IgnoreWhitelistFor {
    action: {
        post: boolean;
        reply: boolean;
        react: boolean;
        moderate: boolean;
    };
    constructor();
}
export type EventType = "DmpEvent" | "DmpEventSignedClosed" | "DmpEventSignedOpened" | "NostrEvent" | "NostrEventSignedOpened" | "NostrSpasmEvent" | "NostrSpasmEventSignedOpened" | "SpasmEvent" | "unknown";
export type EventInfoType = EventType | "Post";
export interface EventInfo {
    type: EventInfoType | false;
    hasSignature: boolean;
    baseProtocol: EventBaseProtocol | false;
    privateKeyType: EventPrivateKeyType | false;
    isSpasmCompatible: boolean;
    hasExtraSpasmFields: boolean;
    license: string | false;
}
export type WebType = "web2" | "web3";
export type EventIsSealedUnderKeyName = "signed_message" | "signedObject";
export interface KnownPostOrEventInfo {
    webType: WebType | false;
    eventIsSealed: boolean;
    eventIsSealedUnderKeyName: EventIsSealedUnderKeyName | false;
    eventInfo: EventInfo | false;
}
export type PrivateKeyType = "ethereum" | "nostr";
export type NostrSpasmVersion = "1.0.0" | "2.0.0";
//# sourceMappingURL=interfaces.d.ts.map