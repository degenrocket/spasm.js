import { EventType, EventInfo, KnownPostOrEventInfo, UnknownPostOrEvent, UnknownEvent, PrivateKeyType } from "./../types/interfaces.js";
/**
  There are usually 3 types of objects passed to this function:
  - web3 post - an object is a post with a web3 event sealed inside
  - web3 event - an object itself is a web3 event
  - web2 post - an object is a post without a web3 event (e.g. RSS)
  Note: most of the time we mean 'envelope' when we say 'post'.
  You can check definitions to better understand the difference
  between a Post and an Event.
*/
export declare const identifyPostOrEvent: (unknownPostOrEvent: UnknownPostOrEvent) => KnownPostOrEventInfo | null;
export declare const isWeb2Post: (unknownPostOrEvent: UnknownPostOrEvent | any) => boolean;
export declare const isWeb3Post: (unknownPostOrEvent: UnknownPostOrEvent | any) => boolean;
export declare const identifyEvent: (unknownPostOrEvent: UnknownPostOrEvent | any) => EventInfo;
type SignatureKey = 'signature' | 'sig';
export declare const hasSignature: (unknownPostOrEvent: UnknownPostOrEvent, signatureKey?: SignatureKey, signatureLength?: number) => boolean;
export declare const identifyLicense: (unknownPostOrEvent: UnknownPostOrEvent) => string | false;
export declare const identifyLicenseInsideTags: (unknownPostOrEvent: UnknownPostOrEvent) => string | false;
export declare const identifyPrivateKey: (unknownPostOrEvent: UnknownPostOrEvent) => PrivateKeyType | false;
export declare const hasExtraSpasmFields: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isNostrEvent: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isNostrEventSignedOpened: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isNostrSpasmEvent: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isNostrSpasmEventSignedOpened: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isDmpEvent: (unknownPostOrEvent: UnknownPostOrEvent | any) => boolean;
export declare const isDmpEventSignedClosed: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isDmpEventSignedOpened: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
/**
 * 1. Post can contain DPM event without signature as a string inside
 *    signed_message, so signature is attached with 'signature' key.
 *
 *    isPostWithDmpEventSignedOpened()
 *     - contains isDmpEventSignedOpened()
 *    isPostWithDmpEventSignedClosed()
 *     - contains isDmpEventSignedClosed()
 *    isPostWithDmpEvent()
 *     - contains isDmpEvent()
 *
 * 2. Post can contain Nostr event with signature as a string inside
 *    signed_message, and signature is also attached with 'signature' key.
 *    In other words, signature will be passed twice:
 *    - inside 'sig' key of parsed 'signed_message'
 *    - inside 'signature' key of the post object.
 *
 *    isPostWithNostrSpasmEventSignedOpened()
 *     - contains isNostrSpasmEventSignedOpened()
 *    isPostWithNostrEventSignedOpened()
 *     - contains isNostrEventSignedOpened()
 *    isPostWithNostrSpasmEvent()
 *     - contains isNostrSpasmEvent()
 *    isPostWithNostrEvent
 *     - contains isNostrEvent()
 */
export declare const isPostWithDmpEvent: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isPostWithDmpEventSignedOpened: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isPostWithDmpEventSignedClosed: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isPostWithNostrSpasmEventSignedOpened: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isPostWithNostrEventSignedOpened: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isPostWithNostrSpasmEvent: (unknownPostOrEvent: UnknownPostOrEvent) => boolean;
export declare const isPostWithNostrEvent: (unknownPostOrEvent: UnknownEvent) => boolean;
export declare const identifyEventInsidePost: (unknownPostOrEvent: UnknownPostOrEvent) => EventType | false;
export declare const identifyObject: (unknownPostOrEvent: UnknownPostOrEvent) => KnownPostOrEventInfo | null;
export {};
//# sourceMappingURL=identifyEvent.d.ts.map