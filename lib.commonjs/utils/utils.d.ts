import { UnknownPostOrEvent, UnknownEvent, NostrSpasmEvent, NostrSpasmEventSignedOpened, NostrSpasmVersion } from "./../types/interfaces";
export declare const hasValue: (el?: any) => boolean;
export declare const isObjectWithValues: (val: any) => boolean;
export declare const extractVersion: (versionString: string) => string;
export declare const extractSealedEvent: (unknownPostOrEvent: UnknownPostOrEvent) => UnknownEvent | false;
export declare const toBeTimestamp: (time: any) => number | undefined;
export declare const getNostrSpasmVersion: (event: NostrSpasmEvent | NostrSpasmEventSignedOpened) => NostrSpasmVersion | null;
//# sourceMappingURL=utils.d.ts.map