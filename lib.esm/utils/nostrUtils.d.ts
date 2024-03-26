export declare const convertBech32ToHex: (bech32Key: string) => string;
export declare const convertNpubOrHexAddressToHex: (addressNpubOrHex: string) => string;
export declare const convertNpubOrHexAddressesToHex: (addressesNpubOrHex: string | string[]) => string[];
export declare const convertHexToBech32: (hexKey: string, prefix?: string) => string;
export declare const convertHexOrNpubAddressToNpub: (addressNpubOrHex: string) => string;
export declare const convertHexAddressesToNpub: (addressesNpubOrHex: string | string[]) => string[];
export declare const toBeNpub: (addressNpubOrHex: string) => string;
//# sourceMappingURL=nostrUtils.d.ts.map