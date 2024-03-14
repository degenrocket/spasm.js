"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHexToBech32 = exports.isObjectWithValues = void 0;
const bech32_1 = require("bech32");
const isObjectWithValues = (val) => {
    if (!val)
        return false;
    if (Array.isArray(val))
        return false;
    if (typeof (val) !== "object")
        return false;
    if (Object.keys(val).length === 0)
        return false;
    return true;
};
exports.isObjectWithValues = isObjectWithValues;
// Nostr
const convertHexToBech32 = (hexKey, prefix) => {
    try {
        // Convert private or public key from HEX to bech32
        let bytes = new Uint8Array(hexKey.length / 2);
        for (let i = 0; i < hexKey.length; i += 2) {
            bytes[i / 2] = parseInt(hexKey.substr(i, 2), 16);
        }
        const words = bech32_1.bech32.toWords(bytes);
        prefix = prefix ?? 'npub';
        const bech32Key = bech32_1.bech32.encode(prefix, words);
        return bech32Key;
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
exports.convertHexToBech32 = convertHexToBech32;
//# sourceMappingURL=utils.js.map