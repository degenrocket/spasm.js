import { bech32 } from "bech32";
import { hasValue } from "./utils.js";
// Nostr
// Npub to hex with 3 functions.
// Npub to hex. Function 1.
export const convertBech32ToHex = (bech32Key) => {
    if (!bech32Key || typeof (bech32Key) !== "string")
        return bech32Key;
    if (!bech32Key.startsWith('npub')) {
        console.error(bech32Key, "is invalid bech32 string. It should start with 'npub'.");
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
        return hexKey;
    }
    catch (error) {
        console.error(error);
        return '';
    }
};
// Npub to hex. Function 2.
// One address.
export const convertNpubOrHexAddressToHex = (addressNpubOrHex) => {
    if (!addressNpubOrHex)
        return "";
    if (typeof (addressNpubOrHex) !== "string")
        return "";
    // Ethereum addresses start with "0x"
    if (addressNpubOrHex.startsWith("0x"))
        return "";
    let addressHex = "";
    if (
    // Address is npub
    addressNpubOrHex.startsWith("npub") &&
        addressNpubOrHex.length === 63) {
        addressHex = convertBech32ToHex(addressNpubOrHex);
    }
    else if (
    // Address is already hex
    !addressNpubOrHex.startsWith("npub") &&
        addressNpubOrHex.length === 64) {
        addressHex = addressNpubOrHex;
    }
    return addressHex;
};
// Npub to hex. Function 3.
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
// Hex to npub with 3 functions.
// Hex to npub. Function 1.
export const convertHexToBech32 = (hexKey, prefix) => {
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
// Hex to npub. Function 2.
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
// Hex to npub. Function 3.
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
// Aliases
export const toBeNpub = convertHexOrNpubAddressToNpub;
//# sourceMappingURL=nostrUtils.js.map