import { UnknownPostOrEvent, UnknownEvent, NostrSpasmEvent, NostrSpasmEventSignedOpened, NostrSpasmVersion, LinkObject, SpasmEventIdFormatV2, SpasmEventAddressFormatV2 } from "./../types/interfaces.js";
export declare const hasValue: (el?: any) => boolean;
export declare const isObjectWithValues: (val: any) => boolean;
export declare const extractVersion: (versionString: string) => string;
export declare const extractSealedEvent: (unknownPostOrEvent: UnknownPostOrEvent) => UnknownEvent | false;
export declare const toBeTimestamp: (time: any) => number | undefined;
export declare const getNostrSpasmVersion: (event: NostrSpasmEvent | NostrSpasmEventSignedOpened) => NostrSpasmVersion | null;
export declare const isValidUrl: (value?: any) => boolean;
export declare const createLinkObjectFromUrl: (url: any, key?: any) => LinkObject | null;
export declare const getFormatFromValue: (value?: string | number) => SpasmEventIdFormatV2 | undefined;
export declare const getFormatFromId: (id: string | number) => SpasmEventIdFormatV2;
export declare const getFormatFromAddress: (address: string | number) => SpasmEventAddressFormatV2;
//# sourceMappingURL=utils.d.ts.map