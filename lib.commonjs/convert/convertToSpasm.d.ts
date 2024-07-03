import { KnownPostOrEventInfo, DmpEvent, DmpEventSignedClosed, DmpEventSignedOpened, NostrEvent, NostrEventSignedOpened, NostrSpasmEvent, NostrSpasmEventSignedOpened, UnknownEventV2, SpasmEventV2, SpasmEventV0 } from "./../types/interfaces.js";
export declare const convertToSpasm: (unknownEvent: UnknownEventV2, version?: string, spasmIdVersions?: string[]) => SpasmEventV2 | null;
export declare const assignSpasmId: (spasmEventV2: SpasmEventV2, spasmIdVersions?: string[]) => SpasmEventV2 | null;
export declare const standardizeEventV2: (unknownEvent: UnknownEventV2, version?: string, info?: KnownPostOrEventInfo) => SpasmEventV2 | null;
export declare const standardizeDmpEventV2: (event: DmpEvent) => SpasmEventV2 | null;
export declare const standardizeDmpEventSignedClosedV2: (event: DmpEventSignedClosed) => SpasmEventV2 | null;
export declare const standardizeDmpEventSignedOpenedV2: (event: DmpEventSignedOpened) => SpasmEventV2 | null;
export declare const standardizeNostrEventV2: (event: NostrEvent) => SpasmEventV2 | null;
export declare const standardizeNostrSpasmEventV2: (event: NostrSpasmEvent) => SpasmEventV2 | null;
export declare const standardizeNostrEventSignedOpenedV2: (event: NostrEventSignedOpened) => SpasmEventV2 | null;
export declare const standardizeNostrSpasmEventSignedOpenedV2: (event: NostrSpasmEventSignedOpened) => SpasmEventV2 | null;
export declare const standardizeSpasmDmpEventSignedClosedV0_V2: (spasmEventV0: SpasmEventV0) => SpasmEventV2 | null;
export declare const standardizeSpasmNostrEventSignedOpenedV0_V2: (spasmEventV0: SpasmEventV0) => SpasmEventV2 | null;
export declare const standardizeSpasmNostrSpasmEventSignedOpenedV0_V2: (spasmEventV0: SpasmEventV0) => SpasmEventV2 | null;
export declare const standardizeSpasmWithRssItemV0_V2: (spasmEventV0: SpasmEventV0) => SpasmEventV2 | null;
export declare const addFieldsFromEnvelopeSpasmEventV0_V2: (spasmEventV0: SpasmEventV0, spasmEventV2: SpasmEventV2) => SpasmEventV2;
export declare const convertToSpasmStatus: () => void;
//# sourceMappingURL=convertToSpasm.d.ts.map