"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBeNotes = exports.toBeNote = exports.toBeNpubs = exports.toBeNpub = exports.toBeHexes = exports.toBeHex = exports.convertHexOrNpubAddressesToNpub = exports.convertHexNoteNeventIdsToNote = exports.convertHexNoteNeventIdToNote = exports.convertHexAddressesToNpub = exports.convertHexOrNpubAddressToNpub = exports.convertHexToBech32 = exports.convertNpubOrHexAddressesToHex = exports.convertNpubOrHexAddressToHex = exports.convertBech32ToHex = void 0;
const bech32_v2_1 = require("bech32-v2");
const utils_js_1 = require("./utils.js");
// Nostr
// Npub,note to hex.
const convertBech32ToHex = (bech32Key) => {
    if (!bech32Key || typeof (bech32Key) !== "string")
        return bech32Key;
    if (!bech32Key.startsWith('npub') &&
        !bech32Key.startsWith('note') &&
        !bech32Key.startsWith('nevent')) {
        console.error(bech32Key, "is invalid bech32 nostr string. It should start with 'npub' or 'note' or 'nevent'.");
        return bech32Key;
    }
    try {
        // Decode the bech32 string to get the words array
        const decoded = bech32_v2_1.bech32.decode(bech32Key);
        // Convert the words array to bytes
        const bytes = bech32_v2_1.bech32.fromWords(decoded.words);
        // Convert the bytes to a hex string
        let hexKey = '';
        if (!bytes || !Array.isArray(bytes))
            return '';
        for (let byte of bytes) {
            hexKey += ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }
        if (bech32Key.length === 68 &&
            bech32Key.startsWith("nevent") &&
            hexKey.length === 68) {
            // Remove leading 0020
            hexKey = hexKey.slice(4);
        }
        return hexKey;
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
exports.convertBech32ToHex = convertBech32ToHex;
// Npub to hex.
// One address.
const convertNpubOrHexAddressToHex = (npubNoteNeventHex) => {
    if (!npubNoteNeventHex)
        return "";
    if (typeof (npubNoteNeventHex) !== "string")
        return "";
    // Ethereum addresses start with "0x"
    if (npubNoteNeventHex.startsWith("0x"))
        return "";
    let addressHex = "";
    if (
    // Address is npub
    npubNoteNeventHex.startsWith("npub") &&
        npubNoteNeventHex.length === 63) {
        addressHex = (0, exports.convertBech32ToHex)(npubNoteNeventHex);
    }
    else if (
    // String is note
    npubNoteNeventHex.startsWith("note") &&
        npubNoteNeventHex.length === 63) {
        addressHex = (0, exports.convertBech32ToHex)(npubNoteNeventHex);
    }
    else if (
    // String is note
    npubNoteNeventHex.startsWith("nevent") &&
        npubNoteNeventHex.length === 68) {
        addressHex = (0, exports.convertBech32ToHex)(npubNoteNeventHex);
    }
    else if (
    // Address is already hex
    !npubNoteNeventHex.startsWith("npub") &&
        npubNoteNeventHex.length === 64) {
        addressHex = npubNoteNeventHex;
    }
    return addressHex;
};
exports.convertNpubOrHexAddressToHex = convertNpubOrHexAddressToHex;
// Npub to hex.
// Multiple addresses.
const convertNpubOrHexAddressesToHex = (addressesNpubOrHex) => {
    const arrayOfAddressesHex = [];
    if (!(0, utils_js_1.hasValue)(addressesNpubOrHex))
        return arrayOfAddressesHex;
    // Passed value is one address (as a string)
    if (addressesNpubOrHex &&
        typeof (addressesNpubOrHex) === "string") {
        const addressHex = (0, exports.convertNpubOrHexAddressToHex)(addressesNpubOrHex);
        if (addressHex &&
            typeof (addressHex) === "string") {
            arrayOfAddressesHex.push(addressHex);
        }
        return arrayOfAddressesHex;
    }
    // Passed value is an array of addresses
    if (Array.isArray(addressesNpubOrHex)) {
        addressesNpubOrHex.forEach((addressNpubOrHex) => {
            if (addressNpubOrHex &&
                typeof (addressNpubOrHex) === "string") {
                const addressHex = (0, exports.convertNpubOrHexAddressToHex)(addressNpubOrHex);
                if (addressHex &&
                    typeof (addressHex) === "string") {
                    arrayOfAddressesHex.push(addressHex);
                }
            }
        });
        return arrayOfAddressesHex;
    }
    return arrayOfAddressesHex;
};
exports.convertNpubOrHexAddressesToHex = convertNpubOrHexAddressesToHex;
// Hex to npub, note.
const convertHexToBech32 = (hexKey, 
// nevent currently doesn't work properly
prefix = "npub") => {
    try {
        // Convert private or public key from HEX to bech32
        let bytes = new Uint8Array(hexKey.length / 2);
        for (let i = 0; i < hexKey.length; i += 2) {
            bytes[i / 2] = parseInt(hexKey.substr(i, 2), 16);
        }
        const words = bech32_v2_1.bech32.toWords(bytes);
        prefix = prefix ?? 'npub';
        const bech32Key = bech32_v2_1.bech32.encode(prefix, words);
        return bech32Key;
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
exports.convertHexToBech32 = convertHexToBech32;
// Hex to npub.
// One address.
const convertHexOrNpubAddressToNpub = (addressNpubOrHex) => {
    if (!addressNpubOrHex)
        return "";
    if (typeof (addressNpubOrHex) !== "string")
        return "";
    // Ethereum addresses start with "0x"
    if (addressNpubOrHex.startsWith("0x"))
        return "";
    let addressNpub = "";
    if (
    // Address is hex
    !addressNpubOrHex.startsWith("npub") &&
        addressNpubOrHex.length === 64) {
        addressNpub = (0, exports.convertHexToBech32)(addressNpubOrHex);
    }
    else if (
    // Address is already npub
    addressNpubOrHex.startsWith("npub") &&
        addressNpubOrHex.length === 63) {
        addressNpub = addressNpubOrHex;
    }
    return addressNpub;
};
exports.convertHexOrNpubAddressToNpub = convertHexOrNpubAddressToNpub;
// Hex to npub.
// Multiple addresses.
const convertHexAddressesToNpub = (addressesNpubOrHex) => {
    const arrayOfAddressesNpub = [];
    if (!(0, utils_js_1.hasValue)(addressesNpubOrHex))
        return arrayOfAddressesNpub;
    // Passed value is one address (as a string)
    if (addressesNpubOrHex &&
        typeof (addressesNpubOrHex) === "string") {
        const addressNpub = (0, exports.convertHexOrNpubAddressToNpub)(addressesNpubOrHex);
        if (addressNpub &&
            typeof (addressNpub) === "string") {
            arrayOfAddressesNpub.push(addressNpub);
        }
        return arrayOfAddressesNpub;
    }
    // Passed value is an array of addresses
    if (Array.isArray(addressesNpubOrHex)) {
        addressesNpubOrHex.forEach((addressNpubOrHex) => {
            if (addressNpubOrHex &&
                typeof (addressNpubOrHex) === "string") {
                const addressNpub = (0, exports.convertHexOrNpubAddressToNpub)(addressNpubOrHex);
                if (addressNpub &&
                    typeof (addressNpub) === "string") {
                    arrayOfAddressesNpub.push(addressNpub);
                }
            }
        });
        return arrayOfAddressesNpub;
    }
    return arrayOfAddressesNpub;
};
exports.convertHexAddressesToNpub = convertHexAddressesToNpub;
// Hex to note.
// One address.
const convertHexNoteNeventIdToNote = (id) => {
    if (!id)
        return "";
    if (typeof (id) !== "string")
        return "";
    // Dmp ids start with "0x"
    if (id.startsWith("0x"))
        return "";
    // Spasm ids start with "spasm"
    if (id.startsWith("spasm"))
        return "";
    let idNote = "";
    if (
    // Id is hex
    !id.startsWith("note") &&
        !id.startsWith("nevent") &&
        id.length === 64) {
        idNote = (0, exports.convertHexToBech32)(id, "note");
    }
    else if (
    // Id is nevent
    id.startsWith("nevent") &&
        id.length === 68) {
        idNote = (0, exports.convertHexToBech32)((0, exports.convertNpubOrHexAddressToHex)(id), "note");
    }
    else if (
    // Id is already note
    id.startsWith("note") &&
        id.length === 63) {
        idNote = id;
    }
    return idNote;
};
exports.convertHexNoteNeventIdToNote = convertHexNoteNeventIdToNote;
// Hex, note, nevent to note
// Multiple addresses.
const convertHexNoteNeventIdsToNote = (idsHexNoteNevent) => {
    const arrayOfIdsNote = [];
    if (!(0, utils_js_1.hasValue)(idsHexNoteNevent))
        return arrayOfIdsNote;
    // Passed value is one address (as a string)
    if (idsHexNoteNevent &&
        typeof (idsHexNoteNevent) === "string") {
        const idNote = (0, exports.convertHexNoteNeventIdToNote)(idsHexNoteNevent);
        if (idNote &&
            typeof (idNote) === "string") {
            arrayOfIdsNote.push(idNote);
        }
        return arrayOfIdsNote;
    }
    // Passed value is an array of addresses
    if (Array.isArray(idsHexNoteNevent)) {
        idsHexNoteNevent.forEach((addressNpubOrHex) => {
            if (addressNpubOrHex &&
                typeof (addressNpubOrHex) === "string") {
                const idNote = (0, exports.convertHexNoteNeventIdToNote)(addressNpubOrHex);
                if (idNote &&
                    typeof (idNote) === "string") {
                    arrayOfIdsNote.push(idNote);
                }
            }
        });
        return arrayOfIdsNote;
    }
    return arrayOfIdsNote;
};
exports.convertHexNoteNeventIdsToNote = convertHexNoteNeventIdsToNote;
// Aliases
exports.convertHexOrNpubAddressesToNpub = exports.convertHexAddressesToNpub;
exports.toBeHex = exports.convertNpubOrHexAddressToHex;
exports.toBeHexes = exports.convertNpubOrHexAddressesToHex;
exports.toBeNpub = exports.convertHexOrNpubAddressToNpub;
exports.toBeNpubs = exports.convertHexOrNpubAddressesToNpub;
exports.toBeNote = exports.convertHexNoteNeventIdToNote;
exports.toBeNotes = exports.convertHexNoteNeventIdsToNote;
// export const toBeNevent = (value?: string): string => {
//   if (value && typeof(value) === "string") {
//     return convertHexOrNoteIdToNote(value, "nevent")
//   } else { return ""}
// }
//# sourceMappingURL=nostrUtils.js.map