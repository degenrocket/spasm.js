import { UnknownPostOrEvent, UnknownEvent, NostrSpasmEvent, NostrSpasmEventSignedOpened, NostrSpasmVersion, LinkObject, SpasmEventIdFormatV2, SpasmEventAddressFormatV2, SpasmEventSignatureFormatV2, SpasmEventV2, SpasmEventAuthorV2, SpasmEventBodyHostV2, SpasmEventMediaV2, SpasmEventIdV2, SpasmEventBodyReferenceV2, SpasmEventBodyParentV2, ConvertToSpasmConfig, CustomConvertToSpasmConfig, CustomSanitizationConfig, SanitizationConfig, UnknownEventV2, SpasmEventStatV2, SpasmEventChildV2 } from "./../types/interfaces.js";
export declare const hasValue: (el?: any) => boolean;
export declare const isObjectWithValues: (val: any) => boolean;
export declare const extractVersion: (versionString: string) => string;
export declare const extractSealedEvent: (unknownPostOrEvent: UnknownPostOrEvent) => UnknownEvent | false;
export declare const toBeTimestamp: (time: any) => number | undefined;
export declare const getNostrSpasmVersion: (event: NostrSpasmEvent | NostrSpasmEventSignedOpened) => NostrSpasmVersion | null;
export declare const isValidUrl: (value?: any) => boolean;
export declare const createLinkObjectFromUrl: (url: any, key?: any) => LinkObject | null;
export declare const getFormatFromValue: (value?: string | number) => SpasmEventIdFormatV2 | SpasmEventSignatureFormatV2 | undefined;
export declare const getFormatFromId: (id: string | number) => SpasmEventIdFormatV2;
export declare const getFormatFromAddress: (address: string | number) => SpasmEventAddressFormatV2;
export declare const getFormatFromSignature: (address: string | number) => SpasmEventSignatureFormatV2;
export declare const getHashOfString: (string: string, algorithm?: string) => string;
export declare const keepTheseKeysInObject: (obj: Record<string, any>, keys: string[]) => Partial<Record<string, any>>;
export declare const keepTheseKeysInObjectsInArray: (array: Record<string, any>[], keys: string[]) => Partial<Record<string, any>[]>;
export declare const sortArrayOfStringsAndNumbers: (array: any[]) => any[];
export declare const sortArrayOfObjects: (objects: any[], sortBy?: string | string[]) => any[];
export declare const sortAuthorsForSpasmEventV2: (authors: SpasmEventAuthorV2[]) => SpasmEventAuthorV2[];
export declare const sortAuthorsForSpasmid01: (authors: SpasmEventAuthorV2[]) => SpasmEventAuthorV2[];
export declare const sortArrayOfObjectsByKeyValue: (objects: SpasmEventAuthorV2[] | SpasmEventMediaV2[], key: string) => any[];
export declare const sortHostsForSpasmEventV2: (hosts: SpasmEventBodyHostV2[]) => SpasmEventBodyHostV2[];
export declare const sortHostsForSpasmid01: (hosts: SpasmEventBodyHostV2[]) => SpasmEventBodyHostV2[];
export declare const sortLinksForSpasmEventV2: (hosts: SpasmEventBodyHostV2[]) => SpasmEventBodyHostV2[];
export declare const sortLinksForSpasmid01: (hosts: SpasmEventBodyHostV2[]) => SpasmEventBodyHostV2[];
export declare const sortMediasForSpasmid01: (medias: any) => SpasmEventMediaV2[];
export declare const sortReferencesForSpasmid01: (references: SpasmEventBodyReferenceV2[]) => SpasmEventBodyReferenceV2[];
export declare const sortParentForSpasmid01: (parent: SpasmEventBodyParentV2) => SpasmEventBodyParentV2;
export declare const sortTagsForSpasmid01: (tags: any[][]) => any[][];
export declare const markSpasmEventAddressAsVerified: (spasmEvent: SpasmEventV2, verifiedAddress: string | number, version?: string) => void;
export declare const verifyEthereumSignature: (messageString: string, signature: string, signerAddress: string) => boolean;
export declare const utilsStatus: () => void;
export declare const executeFunctionForAllNestedValuesOfType: (originalItem: Object | any[], customConfig?: CustomSanitizationConfig) => void;
export declare const sanitizeEventWith: (originalItem: Object | any[], config?: CustomSanitizationConfig) => void;
export declare const sanitizeStringWithDompurify: (val: any) => any;
export declare const sanitizeEventWithDompurify: (originalItem: Object | any[], config?: CustomSanitizationConfig) => void;
export declare const sanitizeEvent: (originalItem: Object | any[], config?: CustomSanitizationConfig) => void;
export declare const clearArray: (arr: any[]) => void;
export declare const clearObject: (obj: Record<string, any>) => void;
type mergeObjectsHandleArrays = "overwriteArrays" | "mergeArrays";
export declare const mergeObjects: (defaultObject: Object, customObject: Object, handleArrays?: mergeObjectsHandleArrays, depth?: number) => Object;
export declare const mergeConfigs: (defaultConfig: ConvertToSpasmConfig, customConfig: CustomConvertToSpasmConfig, handleArrays?: mergeObjectsHandleArrays) => ConvertToSpasmConfig;
export declare const mergeSanitizationConfigs: (defaultConfig: SanitizationConfig, customConfig: CustomSanitizationConfig, handleArrays?: mergeObjectsHandleArrays) => SanitizationConfig;
export declare const hasSignatureOfFormat: (spasmEvent: SpasmEventV2, signatureFormat: "ethereum" | "nostr") => boolean;
export declare const hasSignatureEthereum: (spasmEvent: SpasmEventV2) => boolean;
export declare const hasSignatureNostr: (spasmEvent: SpasmEventV2) => boolean;
export declare const hasSiblingOfProtocol: (spasmEvent: SpasmEventV2, eventProtocol: "spasm" | "dmp" | "nostr" | "web2") => boolean;
export declare const hasSiblingSpasm: (spasmEvent: SpasmEventV2) => boolean;
export declare const hasSiblingDmp: (spasmEvent: SpasmEventV2) => boolean;
export declare const hasSiblingNostr: (spasmEvent: SpasmEventV2) => boolean;
export declare const hasSiblingWeb2: (spasmEvent: SpasmEventV2) => boolean;
export declare const getAllSigners: (unknownEvent: UnknownEventV2, onlyVerifiedFlag?: boolean, toLowerCase?: boolean) => (string | number)[];
export declare const getVerifiedSigners: (unknownEvent: UnknownEventV2) => (string | number)[];
export declare const getAllIdsFromArrayOfIdObjects: (arrayOfIdObjects: SpasmEventIdV2[], toLowerCase?: boolean) => (string | number)[];
export declare const getAllEventIds: (unknownEvent: UnknownEventV2, toLowerCase?: boolean) => (string | number)[];
export declare const getAllParentIds: (unknownEvent: UnknownEventV2, toLowerCase?: boolean) => (string | number)[];
export declare const getAllRootIds: (unknownEvent: UnknownEventV2, toLowerCase?: boolean) => (string | number)[];
export declare const getAllSignatures: (unknownEvent: UnknownEventV2, toLowerCase?: boolean) => (string | number)[];
export declare const getSignersListedIn: (unknownEvent: UnknownEventV2, list: (string | number)[]) => (string | number)[];
export declare const getPubkeysListedIn: (unknownEvent: UnknownEventV2, list: (string | number)[]) => (string | number)[];
export declare const isAnySignerListedIn: (unknownEvent: UnknownEventV2, list: (string | number)[]) => boolean;
export declare const isAnyPubkeyListedIn: (unknownEvent: UnknownEventV2, list: (string | number)[]) => boolean;
export declare const areAllSignersListedIn: (unknownEvent: UnknownEventV2, list: (string | number)[]) => boolean;
export declare const areAllPubkeysListedIn: (unknownEvent: UnknownEventV2, list: (string | number)[]) => boolean;
export declare const getIdByFormat: (unknownEvent: UnknownEventV2, customIdFormat?: SpasmEventIdFormatV2) => string | number | null;
export declare const extractIdByFormat: (unknownEvent: UnknownEventV2, customIdFormat?: SpasmEventIdFormatV2) => string | number | null;
export declare const extractSpasmId01: (unknownEvent: UnknownEventV2) => string | number;
export declare const toBeSpasmEventV2: (unknownEvent: UnknownEventV2) => SpasmEventV2 | null;
export declare const extractSignerFromEthereumSignature: (signedString: string, signature: string) => string | null;
export declare const mergeSpasmEventsV2: (spasmEvents: any[], depth?: number) => SpasmEventV2 | null;
export declare const ifEventsHaveSameSpasmId01: (event1: UnknownEventV2, event2: UnknownEventV2) => Boolean;
export declare const deepCopyOfObject: (obj: any) => any;
export declare const copyOf: (obj: any) => any;
export declare const cleanSpasmEventV2: (spasmEvent: SpasmEventV2) => void;
export declare const mergeStatsV2: (allStats: SpasmEventStatV2[][]) => SpasmEventStatV2[] | null;
export declare const mergeChildrenV2: (allChildren: SpasmEventChildV2[][], depth?: number) => SpasmEventChildV2[] | null;
export {};
//# sourceMappingURL=utils.d.ts.map