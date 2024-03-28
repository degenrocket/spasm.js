import { KnownPostOrEventInfo, UnknownPostOrEvent, DmpEvent, DmpEventSignedClosed, DmpEventSignedOpened, NostrEvent, NostrEventSignedOpened, NostrSpasmEvent, NostrSpasmEventSignedOpened, Post, SpasmEvent, SpasmEventSigned } from "./../types/interfaces.js";
export declare const standardizePostOrEvent: (unknownPostOrEvent: UnknownPostOrEvent, info?: KnownPostOrEventInfo) => SpasmEvent | null;
export declare const standardizeDmpEvent: (event: DmpEvent) => SpasmEvent | null;
export declare const standardizeDmpEventSignedClosed: (event: DmpEventSignedClosed) => SpasmEventSigned | null;
export declare const standardizeDmpEventSignedOpened: (event: DmpEventSignedOpened) => SpasmEvent | null;
export declare const standardizeNostrEvent: (event: NostrEvent) => SpasmEvent | null;
export declare const standardizeNostrSpasmEvent: (event: NostrSpasmEvent) => SpasmEvent | null;
export declare const standardizeNostrEventSignedOpened: (event: NostrEventSignedOpened) => SpasmEvent | null;
export declare const standardizeNostrSpasmEventSignedOpened: (event: NostrSpasmEventSignedOpened) => SpasmEvent | null;
export declare const standardizePostWithDmpEventSignedClosed: (post: Post) => SpasmEvent | null;
export declare const standardizePostWithNostrEventSignedOpened: (post: Post) => SpasmEvent | null;
export declare const standardizePostWithNostrSpasmEventSignedOpened: (post: Post) => SpasmEvent | null;
export declare const standardizePostWithRssItem: (post: Post) => SpasmEvent | null;
export declare const addFieldsFromEnvelopePost: (post: Post, spasmEvent: SpasmEvent) => SpasmEvent;
export declare const convertToSpasm: (unknownPostOrEvent: UnknownPostOrEvent) => SpasmEvent | null;
//# sourceMappingURL=convertToSpasm.d.ts.map