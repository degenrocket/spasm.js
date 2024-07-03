import { bech32 } from "bech32-v2";
import { hasValue } from "./utils.js";
// Nostr
// Npub,note to hex.
export const convertBech32ToHex = (bech32Key) => {
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
        const decoded = bech32.decode(bech32Key);
        // Convert the words array to bytes
        const bytes = bech32.fromWords(decoded.words);
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
// Npub to hex.
// One address.
export const convertNpubOrHexAddressToHex = (npubNoteNeventHex) => {
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
        addressHex = convertBech32ToHex(npubNoteNeventHex);
    }
    else if (
    // String is note
    npubNoteNeventHex.startsWith("note") &&
        npubNoteNeventHex.length === 63) {
        addressHex = convertBech32ToHex(npubNoteNeventHex);
    }
    else if (
    // String is note
    npubNoteNeventHex.startsWith("nevent") &&
        npubNoteNeventHex.length === 68) {
        addressHex = convertBech32ToHex(npubNoteNeventHex);
    }
    else if (
    // Address is already hex
    !npubNoteNeventHex.startsWith("npub") &&
        npubNoteNeventHex.length === 64) {
        addressHex = npubNoteNeventHex;
    }
    return addressHex;
};
// Npub to hex.
// Multiple addresses.
export const convertNpubOrHexAddressesToHex = (addressesNpubOrHex) => {
    const arrayOfAddressesHex = [];
    if (!hasValue(addressesNpubOrHex))
        return arrayOfAddressesHex;
    // Passed value is one address (as a string)
    if (addressesNpubOrHex &&
        typeof (addressesNpubOrHex) === "string") {
        const addressHex = convertNpubOrHexAddressToHex(addressesNpubOrHex);
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
                const addressHex = convertNpubOrHexAddressToHex(addressNpubOrHex);
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
// Hex to npub, note.
export const convertHexToBech32 = (hexKey, 
// nevent currently doesn't work properly
prefix = "npub") => {
    try {
        // Convert private or public key from HEX to bech32
        let bytes = new Uint8Array(hexKey.length / 2);
        for (let i = 0; i < hexKey.length; i += 2) {
            bytes[i / 2] = parseInt(hexKey.substr(i, 2), 16);
        }
        const words = bech32.toWords(bytes);
        prefix = prefix ?? 'npub';
        const bech32Key = bech32.encode(prefix, words);
        return bech32Key;
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
// Hex to npub.
// One address.
export const convertHexOrNpubAddressToNpub = (addressNpubOrHex) => {
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
        addressNpub = convertHexToBech32(addressNpubOrHex);
    }
    else if (
    // Address is already npub
    addressNpubOrHex.startsWith("npub") &&
        addressNpubOrHex.length === 63) {
        addressNpub = addressNpubOrHex;
    }
    return addressNpub;
};
// Hex to npub.
// Multiple addresses.
export const convertHexAddressesToNpub = (addressesNpubOrHex) => {
    const arrayOfAddressesNpub = [];
    if (!hasValue(addressesNpubOrHex))
        return arrayOfAddressesNpub;
    // Passed value is one address (as a string)
    if (addressesNpubOrHex &&
        typeof (addressesNpubOrHex) === "string") {
        const addressNpub = convertHexOrNpubAddressToNpub(addressesNpubOrHex);
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
                const addressNpub = convertHexOrNpubAddressToNpub(addressNpubOrHex);
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
// Hex to note.
// One address.
export const convertHexNoteNeventIdToNote = (id) => {
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
        idNote = convertHexToBech32(id, "note");
    }
    else if (
    // Id is nevent
    id.startsWith("nevent") &&
        id.length === 68) {
        idNote = convertHexToBech32(convertNpubOrHexAddressToHex(id), "note");
    }
    else if (
    // Id is already note
    id.startsWith("note") &&
        id.length === 63) {
        idNote = id;
    }
    return idNote;
};
// Hex, note, nevent to note
// Multiple addresses.
export const convertHexNoteNeventIdsToNote = (idsHexNoteNevent) => {
    const arrayOfIdsNote = [];
    if (!hasValue(idsHexNoteNevent))
        return arrayOfIdsNote;
    // Passed value is one address (as a string)
    if (idsHexNoteNevent &&
        typeof (idsHexNoteNevent) === "string") {
        const idNote = convertHexNoteNeventIdToNote(idsHexNoteNevent);
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
                const idNote = convertHexNoteNeventIdToNote(addressNpubOrHex);
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
// Aliases
export const convertHexOrNpubAddressesToNpub = convertHexAddressesToNpub;
export const toBeHex = convertNpubOrHexAddressToHex;
export const toBeHexes = convertNpubOrHexAddressesToHex;
export const toBeNpub = convertHexOrNpubAddressToNpub;
export const toBeNpubs = convertHexOrNpubAddressesToNpub;
export const toBeNote = convertHexNoteNeventIdToNote;
export const toBeNotes = convertHexNoteNeventIdsToNote;
// export const toBeNevent = (value?: string): string => {
//   if (value && typeof(value) === "string") {
//     return convertHexOrNoteIdToNote(value, "nevent")
//   } else { return ""}
// }
//# sourceMappingURL=nostrUtils.js.map