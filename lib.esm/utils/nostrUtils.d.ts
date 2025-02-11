export declare const convertBech32ToHex: (bech32Key: string) => string;
export declare const convertNpubOrHexAddressToHex: (npubNoteNeventHex: string) => string;
export declare const convertNpubOrHexAddressesToHex: (addressesNpubOrHex: string | string[]) => string[];
export declare const convertHexToBech32: (hexKey: string, prefix?: "npub" | "note" | "nevent") => string;
export declare const convertHexOrNpubAddressToNpub: (addressNpubOrHex: string) => string;
export declare const convertHexAddressesToNpub: (addressesNpubOrHex: string | string[]) => string[];
export declare const convertHexNoteNeventIdToNote: (id: string) => string;
export declare const convertHexNoteNeventIdsToNote: (idsHexNoteNevent: string | string[]) => string[];
export declare const convertHexOrNpubAddressesToNpub: (addressesNpubOrHex: string | string[]) => string[];
export declare const toBeHex: (npubNoteNeventHex: string) => string;
export declare const toBeHexes: (addressesNpubOrHex: string | string[]) => string[];
export declare const toBeNpub: (addressNpubOrHex: string) => string;
export declare const toBeNpubs: (addressesNpubOrHex: string | string[]) => string[];
export declare const toBeNote: (id: string) => string;
export declare const toBeNotes: (idsHexNoteNevent: string | string[]) => string[];
export declare const convertValueToNostrTagsMapping: (value: string, algorithm?: string) => {
    newValue: string;
    method: string;
    original: string;
};
export declare const toBeNostrHex: (value: string, algorithm?: string, length?: number | "any") => string | null;
//# sourceMappingURL=nostrUtils.d.ts.map