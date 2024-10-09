"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSanitizationConfigs = exports.mergeConfigs = exports.mergeObjects = exports.clearObject = exports.clearArray = exports.sanitizeEvent = exports.sanitizeEventWithDompurify = exports.sanitizeStringWithDompurify = exports.sanitizeEventWith = exports.executeFunctionForAllNestedValuesOfType = exports.utilsStatus = exports.verifyEthereumSignature = exports.markSpasmEventAddressAsVerified = exports.sortTagsForSpasmid01 = exports.sortParentForSpasmid01 = exports.sortReferencesForSpasmid01 = exports.sortMediasForSpasmid01 = exports.sortLinksForSpasmid01 = exports.sortLinksForSpasmEventV2 = exports.sortHostsForSpasmid01 = exports.sortHostsForSpasmEventV2 = exports.sortArrayOfObjectsByKeyValue = exports.sortAuthorsForSpasmid01 = exports.sortAuthorsForSpasmEventV2 = exports.sortArrayOfObjects = exports.sortArrayOfStringsAndNumbers = exports.keepTheseKeysInObjectsInArray = exports.keepTheseKeysInObject = exports.getHashOfString = exports.getFormatFromSignature = exports.getFormatFromAddress = exports.getFormatFromId = exports.getFormatFromValue = exports.createLinkObjectFromUrl = exports.isValidUrl = exports.getNostrSpasmVersion = exports.toBeTimestamp = exports.extractSealedEvent = exports.extractVersion = exports.isArrayOfNumbersOrStrings = exports.isArrayOfStringsOrNumbers = exports.isArrayOfNumbers = exports.isArrayOfStrings = exports.isArrayWithValues = exports.isObjectWithValues = exports.ifNumberOrString = exports.ifStringOrNumber = exports.isNumberOrString = exports.isStringOrNumber = exports.hasValue = void 0;
exports.mergeChildrenV2 = exports.mergeStatsV2 = exports.cleanSpasmEventV2 = exports.copyOf = exports.deepCopyOfObject = exports.ifEventsHaveSameSpasmId01 = exports.sortSpasmEventsV2 = exports.sortSpasmEventsV2ByDbAddedTimestamp = exports.mergeDifferentSpasmEventsV2 = exports.mergeSpasmEventsV2 = exports.extractSignerFromEthereumSignature = exports.toBeSpasmEventsV2 = exports.toBeSpasmEventV2 = exports.extractSpasmId01 = exports.extractIdByFormat = exports.getEventsByIds = exports.getEventById = exports.checkIfEventHasThisId = exports.getIdByFormat = exports.areAllPubkeysListedIn = exports.areAllSignersListedIn = exports.isAnyPubkeyListedIn = exports.isAnySignerListedIn = exports.getTotalOfActionReact = exports.getTotalOfReactAction = exports.getTotalOfReact = exports.getTotalOfActionReply = exports.getTotalOfReplyAction = exports.getTotalOfReply = exports.getTotalOfAction = exports.getTotalOfMostPopularReaction = exports.getTotalOfReaction = exports.getStatByAction = exports.getPubkeysListedIn = exports.getSignersListedIn = exports.getAllSignatures = exports.getAllRootIds = exports.getAllParentIds = exports.getAllEventIds = exports.getAllIdsFromArrayOfIdObjects = exports.getVerifiedSigners = exports.getAllSigners = exports.hasSiblingWeb2 = exports.hasSiblingNostr = exports.hasSiblingDmp = exports.hasSiblingSpasm = exports.hasSiblingOfProtocol = exports.hasSignatureNostr = exports.hasSignatureEthereum = exports.hasSignatureOfFormat = void 0;
exports.attachEventAsParent = exports.attachEventAsRoot = exports.attachEventAsChild = exports.ifArraysHaveCommonId = exports.addEventsToTree = void 0;
/*
 * Using sha256 from 'js-sha256' npm package, because
 * built-in 'crypto' module works only in a server-side
 * Node.js environment, not on the client-side (browser).
 */
const js_sha256_v0_1 = require("js-sha256-v0");
const ethers_v6_1 = require("ethers-v6");
const index_js_1 = require("./../utils/index.js");
const DOMPurify = __importStar(require("isomorphic-dompurify-v2"));
const interfaces_js_1 = require("./../types/interfaces.js");
const convertToSpasm_js_1 = require("./../convert/convertToSpasm.js");
// Filter out undefined, null, 0, '', false, NaN, {}, []
// Keep {a: null}, {b: undefined}
// Examples:
// hasValue() // false
// hasValue(undefined)) // false
// hasValue(null) // false
// hasValue(0) // false
// hasValue('') // false
// hasValue(false) // false
// hasValue(NaN) // false
// hasValue([]) // false
// hasValue({}) // false
// hasValue({a:null}) // true
// hasValue({b:undefined}) // true
// hasValue({c:1}) // true
// hasValue(new Date()) // true
// hasValue([0]) // false
// hasValue([null]) // false
// hasValue([undefined]) // false
// hasValue([[undefined], [0], [null, NaN], '']) // false
// hasValue([[undefined], [0], [null, 1], '']) // true
// hasValue([[undefined], 1, [null, NaN], '']) // true
// hasValue([[null], 0, [true, NaN]]) // true
// hasValue([[null], 0, ['hello', NaN]]) // true
const hasValue = (el) => {
    // Filter out undefined, null, 0, '', false, NaN
    if (!el)
        return false;
    // Filter out an empty object
    if (el // <- null and undefined check
        && Object.keys(el).length === 0
        && Object.getPrototypeOf(el) === Object.prototype) {
        return false;
    }
    // Filter out an empty array
    if (Array.isArray(el) && !el?.length) {
        return false;
    }
    // Recursively check for at least one value inside an array
    if (Array.isArray(el) && el?.length) {
        let hasAtLeastOneValue = false;
        el.forEach(function (e) {
            if ((0, exports.hasValue)(e)) {
                hasAtLeastOneValue = true;
            }
        });
        if (hasAtLeastOneValue) {
            return true;
        }
        else {
            // console.error("ERROR. There are no values in the array", el)
            return false;
        }
    }
    return true;
};
exports.hasValue = hasValue;
const isStringOrNumber = (val) => {
    if (!val && val !== 0)
        return false;
    if (typeof (val) === "string")
        return true;
    if (typeof (val) === "number")
        return true;
    return false;
};
exports.isStringOrNumber = isStringOrNumber;
exports.isNumberOrString = exports.isStringOrNumber;
exports.ifStringOrNumber = exports.isStringOrNumber;
exports.ifNumberOrString = exports.isStringOrNumber;
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
const isArrayWithValues = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (!(0, exports.hasValue)(array))
        return false;
    return true;
};
exports.isArrayWithValues = isArrayWithValues;
const isArrayOfStrings = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (array.length > 0 &&
        array.every(element => typeof (element) === "string")) {
        return true;
    }
    return false;
};
exports.isArrayOfStrings = isArrayOfStrings;
const isArrayOfNumbers = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (array.length > 0 &&
        array.every(element => typeof (element) === "number")) {
        return true;
    }
    return false;
};
exports.isArrayOfNumbers = isArrayOfNumbers;
const isArrayOfStringsOrNumbers = (array) => {
    if (!array)
        return false;
    if (!Array.isArray(array))
        return false;
    if (array.length > 0 &&
        array.every(element => typeof (element) === "string" ||
            typeof (element) === "number")) {
        return true;
    }
    return false;
};
exports.isArrayOfStringsOrNumbers = isArrayOfStringsOrNumbers;
exports.isArrayOfNumbersOrStrings = exports.isArrayOfStringsOrNumbers;
const extractVersion = (versionString) => {
    if (!versionString ||
        typeof (versionString) !== "string")
        return "";
    if (versionString.startsWith("dmp_v")) {
        return versionString.substring(5);
    }
    return "";
};
exports.extractVersion = extractVersion;
const extractSealedEvent = (unknownPostOrEvent) => {
    if (!(0, exports.isObjectWithValues)(unknownPostOrEvent))
        return false;
    let signedObject = false;
    if (unknownPostOrEvent &&
        typeof (unknownPostOrEvent) === "object" &&
        'signed_message' in unknownPostOrEvent &&
        unknownPostOrEvent['signed_message'] &&
        typeof (unknownPostOrEvent['signed_message'] === "string")) {
        signedObject = JSON.parse(unknownPostOrEvent['signed_message']);
    }
    else if (unknownPostOrEvent &&
        typeof (unknownPostOrEvent) === "object" &&
        'signedString' in unknownPostOrEvent &&
        unknownPostOrEvent['signedString'] &&
        typeof (unknownPostOrEvent['signedString'] === "string")) {
        signedObject = JSON.parse(unknownPostOrEvent['signedString']);
    }
    return signedObject;
};
exports.extractSealedEvent = extractSealedEvent;
const toBeTimestamp = (time) => {
    const date = new Date(time);
    const timestamp = date.getTime();
    // Check if the timestamp is NaN, indicating an invalid date
    if (Number.isNaN(timestamp)) {
        return undefined;
    }
    // Optional
    // Standardize the timestamp to 10 characters (seconds)
    // by rounding down the timestamp to the nearest second.
    // if (timestamp.toString().length > 10) {
    //   timestamp = Math.floor(timestamp / 1000) * 1000;
    // }
    return timestamp;
};
exports.toBeTimestamp = toBeTimestamp;
const getNostrSpasmVersion = (event) => {
    let nostrSpasmVersion = null;
    if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach(function (tag) {
            if (Array.isArray(tag) && tag[0] === "nostr_spasm_version") {
                nostrSpasmVersion = tag[1];
            }
            else if (Array.isArray(tag) && tag[0] === "spasm_version") {
                nostrSpasmVersion = tag[1];
            }
        });
    }
    return nostrSpasmVersion;
};
exports.getNostrSpasmVersion = getNostrSpasmVersion;
// Example usage
// getSchemeFromUrl('https://example.com/news') // return 'https'
// getSchemeFromUrl('http://example.com') // return 'http'
// getSchemeFromUrl('ftp://example.com') // return 'ftp'
// getSchemeFromUrl('mailto://...') // return 'mailto'
// getSchemeFromUrl('ipfs://123abc') // return 'ipfs'
// export const getSchemeFromUrl = (url: any) => {
//   if (!url || typeof(url) !== "string") return ""
//   try {
//     const urlObject = new URL(url);
//     return urlObject.protocol.slice(0, -1); // Remove the trailing colon
//   } catch (error) {
//     console.log('Invalid URL:', url);
//     return "";
//   }
// }
const isValidUrl = (value) => {
    if (!value)
        return false;
    try {
        // new URL() constructor is less vulnerable to ReDoS attacks
        // because it's a built-it JS function that doesn't use regex
        new URL(value);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isValidUrl = isValidUrl;
const createLinkObjectFromUrl = (url, key) => {
    if (!url || typeof (url) !== "string")
        return null;
    try {
        const urlObject = new URL(url);
        const linkObject = {
            value: url,
            // protocol: urlObject.protocol.slice(0, -1),
            // host: urlObject.host,
            // path: urlObject.pathname,
            // search: urlObject.search,
        };
        if (urlObject.protocol) {
            linkObject.protocol = urlObject.protocol.slice(0, -1);
        }
        if (urlObject.origin) {
            linkObject.origin = urlObject.origin;
        }
        if (urlObject.host) {
            linkObject.host = urlObject.host;
        }
        if (urlObject.pathname &&
            typeof (urlObject.pathname) === "string" // &&
        // urlObject.pathname.length > 1
        ) {
            linkObject.pathname = urlObject.pathname;
        }
        if (urlObject.search &&
            typeof (urlObject.search) === "string" // &&
        // urlObject.search.length > 1
        ) {
            linkObject.search = urlObject.search;
        }
        if (urlObject.port) {
            linkObject.port = urlObject.port;
        }
        if (urlObject.hash) {
            linkObject.hash = urlObject.hash;
        }
        if (key &&
            (typeof (key) === "string" || typeof (key) === "number")) {
            linkObject.originalProtocolKey = key;
        }
        return linkObject;
    }
    catch (error) {
        // console.log('Invalid URL:', url);
        return null;
    }
};
exports.createLinkObjectFromUrl = createLinkObjectFromUrl;
const getFormatFromValue = (value) => {
    let format = undefined;
    if (!value)
        return format;
    if (typeof (value) !== "string" && typeof (value) !== "number") {
        return format;
    }
    if (typeof (value) === "number") {
        return format = { name: "number" };
    }
    if (value && typeof (value) === "string") {
        // Spasm ID
        if (value.length === 64 + 9 && value.startsWith("spasmid")) {
            const version = value.slice(7, 9);
            format = { name: "spasmid", version: version };
            return format;
        }
        // Dmp ID (signature)
        if (value.length === 132 && value.startsWith("0x")) {
            format = { name: "ethereum-sig" };
            return format;
        }
        // Nostr ID
        if (value.length === 63 && value.startsWith("note")) {
            format = { name: "nostr-note" };
            return format;
        }
        if (value.length === 68 && value.startsWith("nevent")) {
            format = { name: "nostr-nevent" };
            return format;
        }
        // Spasm signer
        // if (address.length === 64 + 9 && address.startsWith("spasmer")) {
        //   const version = address.slice(7,9)
        //   format = { name: "spasmer", version: version }
        //   return format
        // }
        // Ethereum signer
        if (value.length === 42 && value.startsWith("0x")) {
            format = { name: "ethereum-pubkey" };
            return format;
        }
        // Nostr signer
        if (value.length === 63 && value.startsWith("npub")) {
            format = { name: "nostr-npub" };
            return format;
        }
        // url
        if ((0, exports.isValidUrl)(value)) {
            format = { name: "url" };
            return format;
        }
        if (value.length === 64 &&
            !value.startsWith("note") &&
            !value.startsWith("nevent") &&
            !value.startsWith("npub")) {
            format = { name: "nostr-hex" };
            return format;
        }
    }
    if (typeof (value) === "string") {
        return format = { name: "string" };
    }
    return format;
};
exports.getFormatFromValue = getFormatFromValue;
const getFormatFromId = (id) => {
    return (0, exports.getFormatFromValue)(id);
};
exports.getFormatFromId = getFormatFromId;
const getFormatFromAddress = (address) => {
    return (0, exports.getFormatFromValue)(address);
};
exports.getFormatFromAddress = getFormatFromAddress;
const getFormatFromSignature = (address) => {
    return (0, exports.getFormatFromValue)(address);
};
exports.getFormatFromSignature = getFormatFromSignature;
const getHashOfString = (string, algorithm = "sha256") => {
    if (typeof (string) !== "string")
        return "";
    if (algorithm === "sha256") {
        return (0, js_sha256_v0_1.sha256)(string);
    }
    return "";
};
exports.getHashOfString = getHashOfString;
// Keep only specified keys in an object.
const keepTheseKeysInObject = (obj, keys) => {
    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};
exports.keepTheseKeysInObject = keepTheseKeysInObject;
// Keep only specified keys in each object of an array.
const keepTheseKeysInObjectsInArray = (array, keys) => {
    return array.map(obj => (0, exports.keepTheseKeysInObject)(obj, keys));
};
exports.keepTheseKeysInObjectsInArray = keepTheseKeysInObjectsInArray;
// This function only sorts string and number values.
const sortArrayOfStringsAndNumbers = (array) => {
    // Separate values into valid and invalid categories.
    const { validValues, invalidValues } = array.reduce((acc, value) => {
        if (typeof value === 'string' ||
            typeof value === 'number') {
            acc.validValues.push(value);
        }
        else {
            acc.invalidValues.push(value);
        }
        return acc;
    }, { validValues: [], invalidValues: [] });
    // Sort the valid values
    const sortedValidValues = validValues.sort((a, b) => String(a).localeCompare(String(b)));
    // Combine sorted valid values with invalid values
    const result = [...sortedValidValues, ...invalidValues];
    return result;
};
exports.sortArrayOfStringsAndNumbers = sortArrayOfStringsAndNumbers;
const sortArrayOfObjects = (objects, sortBy = ["id"]) => {
    if (!objects ||
        !Array.isArray(objects) ||
        !objects[0]) {
        return [];
    }
    // Ensure sortBy is always treated as an array
    const sortedBy = Array.isArray(sortBy) ? sortBy : [sortBy];
    // Separate objects into valid and invalid categories based
    // on the existence of the specified property(ies)
    const { validObjects, invalidValues } = objects.reduce((acc, item) => {
        let isValid = false;
        // Only one prop should exist in item in order
        // to make it a valid item.
        sortedBy.forEach((key) => {
            if (typeof (item) === 'object' && item &&
                key in item && item[key] &&
                (typeof (item[key]) === "string" ||
                    typeof (item[key]) === "number")) {
                isValid = true;
            }
        });
        if (isValid) {
            acc.validObjects.push(item);
        }
        else {
            acc.invalidValues.push(item);
        }
        return acc;
    }, { validObjects: [], invalidValues: [] });
    // Sort the valid objects by the specified property(ies)
    const sortedValidObjects = validObjects.sort((a, b) => {
        for (const key of sortedBy) {
            const aValue = typeof a[key] === 'string' ? a[key] : String(a[key]);
            const bValue = typeof b[key] === 'string' ? b[key] : String(b[key]);
            const compareResult = aValue.localeCompare(bValue);
            if (compareResult !== 0) {
                return compareResult;
            }
        }
        return 0; // Equal
    });
    const sortedInvalidValues = (0, exports.sortArrayOfStringsAndNumbers)(invalidValues);
    // Combine sorted valid objects with invalid objects
    const result = [...sortedValidObjects, ...sortedInvalidValues];
    return result;
};
exports.sortArrayOfObjects = sortArrayOfObjects;
const sortAuthorsForSpasmEventV2 = (authors) => {
    // Clean and sort addresses
    authors.forEach(author => {
        if (author && typeof (author) === "object" &&
            'addresses' in author && author.addresses &&
            Array.isArray(author.addresses) &&
            author.addresses[0]) {
            // Clean addresses to keep only  'value' and 'format' keys
            // and remove 'verified' and 'hosts' keys.
            author.addresses = (0, exports.keepTheseKeysInObjectsInArray)(author.addresses, ["value", "format"]);
            // Sort addresses
            author.addresses = (0, exports.sortArrayOfObjects)(author.addresses, "value");
        }
    });
    // Clean and sort usernames
    authors.forEach(author => {
        if (author && typeof (author) === "object" &&
            'usernames' in author && author.usernames &&
            Array.isArray(author.usernames) &&
            author.usernames[0]) {
            // There is no need to clean usernames because all fields
            // should be calculated for the Spasm ID 01.
            // Sort usernames
            author.usernames = (0, exports.sortArrayOfObjects)(author.usernames, "value");
        }
    });
    let authorsWithAddress = [];
    // Authors without address are used temporary until we split
    // them further depending on whether they have usernames.
    let authorsWithoutAddress = [];
    let authorsWithoutAddressWithUsername = [];
    let authorsWithoutAddressWithoutUsername = [];
    authors.forEach(author => {
        if (author && typeof (author) === "object" &&
            'addresses' in author && author.addresses &&
            Array.isArray(author.addresses) && author.addresses[0] &&
            author.addresses[0].value &&
            (typeof (author.addresses[0].value) === "string" ||
                typeof (author.addresses[0].value) === "number")) {
            authorsWithAddress.push(author);
        }
        else {
            authorsWithoutAddress.push(author);
        }
    });
    authorsWithoutAddress.forEach(author => {
        if (author && typeof (author) === "object" &&
            'usernames' in author && author.usernames &&
            Array.isArray(author.usernames) && author.usernames[0] &&
            author.usernames[0].value &&
            (typeof (author.usernames[0].value) === "string" ||
                typeof (author.usernames[0].value) === "number")) {
            authorsWithoutAddressWithUsername.push(author);
        }
        else {
            authorsWithoutAddressWithoutUsername.push(author);
        }
    });
    // Sort all 3 arrays
    const sortedAuthorsWithAddress = (0, exports.sortArrayOfObjectsByKeyValue)(authorsWithAddress, "addresses");
    const sortedAuthorsWithoutAddressWithUsername = (0, exports.sortArrayOfObjectsByKeyValue)(authorsWithoutAddressWithUsername, "usernames");
    const sortedAuthorsWithoutAddressWithoutUsername = (0, exports.sortArrayOfObjects)(authorsWithoutAddressWithoutUsername, ["id"]);
    const result = [
        ...sortedAuthorsWithAddress,
        ...sortedAuthorsWithoutAddressWithUsername,
        ...sortedAuthorsWithoutAddressWithoutUsername
    ];
    return result;
};
exports.sortAuthorsForSpasmEventV2 = sortAuthorsForSpasmEventV2;
exports.sortAuthorsForSpasmid01 = exports.sortAuthorsForSpasmEventV2;
const sortArrayOfObjectsByKeyValue = (objects, key) => {
    const sortedObjects = objects.sort((a, b) => {
        let aValue = "";
        let bValue = "";
        if (a[key] && a[key][0] &&
            a[key][0].value) {
            if (typeof (a[key][0].value) === 'string') {
                aValue = a[key][0].value;
            }
            else if (typeof (a[key][0].value) === 'number') {
                aValue = String(a[key][0].value);
            }
        }
        if (b[key] && b[key][0] &&
            b[key][0].value) {
            if (typeof (b[key][0].value) === 'string') {
                bValue = b[key][0].value;
            }
            else if (typeof (b[key][0].value) === 'number') {
                bValue = String(b[key][0].value);
            }
        }
        const compareResult = aValue.localeCompare(bValue);
        if (compareResult !== 0) {
            return compareResult;
        }
        return 0; // Equal
    });
    return sortedObjects;
};
exports.sortArrayOfObjectsByKeyValue = sortArrayOfObjectsByKeyValue;
const sortHostsForSpasmEventV2 = (hosts) => {
    if (!hosts ||
        !Array.isArray(hosts) ||
        !hosts[0]) {
        return hosts;
    }
    const sortedHosts = (0, exports.sortArrayOfObjects)(hosts, "value");
    return sortedHosts;
};
exports.sortHostsForSpasmEventV2 = sortHostsForSpasmEventV2;
exports.sortHostsForSpasmid01 = exports.sortHostsForSpasmEventV2;
exports.sortLinksForSpasmEventV2 = exports.sortHostsForSpasmEventV2;
exports.sortLinksForSpasmid01 = exports.sortLinksForSpasmEventV2;
const sortMediasForSpasmid01 = (medias) => {
    if (!medias || !Array.isArray(medias))
        return [];
    // Clean and sort IDs
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'ids' in media && media.ids &&
            Array.isArray(media.ids) &&
            media.ids[0]) {
            // Clean ids to keep only  'value' key
            media.ids = (0, exports.keepTheseKeysInObjectsInArray)(media.ids, ["value"]);
            // Sort ids
            media.ids = (0, exports.sortArrayOfObjects)(media.ids, "value");
        }
    });
    // Clean and sort hashes
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'hashes' in media && media.hashes &&
            Array.isArray(media.hashes) &&
            media.hashes[0]) {
            // Clean hashes to keep only  'value' key
            media.hashes = (0, exports.keepTheseKeysInObjectsInArray)(media.hashes, ["value"]);
            // Sort hashes
            media.hashes = (0, exports.sortArrayOfObjects)(media.hashes, "value");
        }
    });
    // Clean and sort links
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'links' in media && media.links &&
            Array.isArray(media.links) &&
            media.links[0]) {
            // Clean links to keep only  'value' key
            media.links = (0, exports.keepTheseKeysInObjectsInArray)(media.links, ["value"]);
            // Sort links
            media.links = (0, exports.sortArrayOfObjects)(media.links, "value");
        }
    });
    // mediasWithIds might also have hashes and links
    let mediasWithIds = [];
    let mediasWithoutIds = [];
    // mediasWithHashes might also have links, but no ids
    let mediasWithHashes = [];
    let mediasWithoutIdsHashes = [];
    // mediasWithLinks only has links, but no ids and hashes
    let mediasWithLinks = [];
    let mediasWithoutIdsHashesLinks = [];
    // Sort medias by ids
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'ids' in media && media.ids &&
            Array.isArray(media.ids) && media.ids[0] &&
            media.ids[0].value &&
            (typeof (media.ids[0].value) === "string" ||
                typeof (media.ids[0].value) === "number")) {
            mediasWithIds.push(media);
        }
        else {
            mediasWithoutIds.push(media);
        }
    });
    // Sort medias by hashes
    mediasWithoutIds.forEach(media => {
        if (media && typeof (media) === "object" &&
            'hashes' in media && media.hashes &&
            Array.isArray(media.hashes) && media.hashes[0] &&
            media.hashes[0].value &&
            (typeof (media.hashes[0].value) === "string" ||
                typeof (media.hashes[0].value) === "number")) {
            mediasWithHashes.push(media);
        }
        else {
            mediasWithoutIdsHashes.push(media);
        }
    });
    // Sort medias by links
    mediasWithoutIdsHashes.forEach(media => {
        if (media && typeof (media) === "object" &&
            'links' in media && media.links &&
            Array.isArray(media.links) && media.links[0] &&
            media.links[0].value &&
            (typeof (media.links[0].value) === "string" ||
                typeof (media.links[0].value) === "number")) {
            mediasWithLinks.push(media);
        }
        else {
            mediasWithoutIdsHashesLinks.push(media);
        }
    });
    const mediasOther = mediasWithoutIdsHashesLinks;
    // Sort all 3 arrays
    const sortedMediasWithIds = (0, exports.sortArrayOfObjectsByKeyValue)(mediasWithIds, "ids");
    const sortedMediasWithHashes = (0, exports.sortArrayOfObjectsByKeyValue)(mediasWithHashes, "hashes");
    const sortedMediasWithLinks = (0, exports.sortArrayOfObjectsByKeyValue)(mediasWithLinks, "links");
    const sortedMediasOther = (0, exports.sortArrayOfObjects)(mediasOther, ["id"]);
    const result = [
        ...sortedMediasWithIds,
        ...sortedMediasWithHashes,
        ...sortedMediasWithLinks,
        ...sortedMediasOther
    ];
    return result;
};
exports.sortMediasForSpasmid01 = sortMediasForSpasmid01;
// Deprecated sortMediasForSpasmEventV2 because we only keep
// a 'value' key to calculate Spasm ID 01.
// export const sortMediasForSpasmid01 = sortMediasforSpasmEventV2
const sortReferencesForSpasmid01 = (references) => {
    if (!references || !Array.isArray(references))
        return [];
    // Clean and sort IDs
    references.forEach(reference => {
        if (reference && typeof (reference) === "object" &&
            'ids' in reference && reference.ids &&
            Array.isArray(reference.ids) &&
            reference.ids[0]) {
            // Clean ids to keep only  'value' key
            reference.ids = (0, exports.keepTheseKeysInObjectsInArray)(reference.ids, ["value"]);
            // Sort ids
            reference.ids = (0, exports.sortArrayOfObjects)(reference.ids, "value");
        }
    });
    // Sort references based on IDs
    const sortedReferences = (0, exports.sortArrayOfObjectsByKeyValue)(references, "ids");
    return sortedReferences;
};
exports.sortReferencesForSpasmid01 = sortReferencesForSpasmid01;
const sortParentForSpasmid01 = (parent) => {
    if (!parent || typeof (parent) !== "object")
        return parent;
    // Clean and sort IDs
    if (parent && typeof (parent) === "object" &&
        'ids' in parent && parent.ids &&
        Array.isArray(parent.ids) &&
        parent.ids[0]) {
        // Clean ids to keep only 'value' key
        parent.ids = (0, exports.keepTheseKeysInObjectsInArray)(parent.ids, ["value"]);
        // Sort ids
        parent.ids = (0, exports.sortArrayOfObjects)(parent.ids, "value");
    }
    return parent;
};
exports.sortParentForSpasmid01 = sortParentForSpasmid01;
const sortTagsForSpasmid01 = (tags) => {
    if (!tags || !Array.isArray(tags))
        return [[]];
    /**
     * Tags are an array of arrays (e.g., Nostr tags).
     * Each tag is an array with any number of elements.
     * Some tags will have the same one-letter first element,
     * so sorting by the first element is not a good approach.
     * Instead, the current sorting logic for spasmid01 is
     * to find the length of the longest tag array (e.g., 10),
     * and start sorting tags by the 10th element, then
     * by the 9th element, and continue until sorting is
     * done by the first element.
     *
     * Each tag is an array of values. However, values inside
     * each tag should not be sorted as it can affect the
     * intention of the event. For example, the order of an
     * element in a Nostr tag array has a meaning.
     */
    const sortTagsByElementNumber = (elementNumber = 0) => {
        tags = tags.sort((a, b) => {
            const key = elementNumber;
            let aValue = "";
            let bValue = "";
            if (a[key]) {
                if (typeof (a[key]) === 'string') {
                    aValue = a[key];
                }
                else if (typeof (a[key]) === 'number') {
                    aValue = String(a[key]);
                }
            }
            if (b[key]) {
                if (typeof (b[key]) === 'string') {
                    bValue = b[key];
                }
                else if (typeof (b[key]) === 'number') {
                    bValue = String(b[key]);
                }
            }
            const compareResult = aValue.localeCompare(bValue);
            if (compareResult !== 0) {
                return compareResult;
            }
            return 0; // Equal
        });
    };
    let longestTagArrayLength = 1;
    // Find the longest array (tag) to be used for sorting.
    tags.forEach(tag => {
        if (tag && Array.isArray(tag) &&
            tag.length > longestTagArrayLength) {
            longestTagArrayLength = tag.length;
        }
    });
    for (let i = longestTagArrayLength; i >= 0; i--) {
        sortTagsByElementNumber(i);
    }
    return tags;
};
exports.sortTagsForSpasmid01 = sortTagsForSpasmid01;
const markSpasmEventAddressAsVerified = (spasmEvent, verifiedAddress, version = "2.0.0") => {
    if (!verifiedAddress)
        return;
    if (version === "2.0.0") {
        if (spasmEvent.authors) {
            spasmEvent.authors.forEach(author => {
                if (author.addresses) {
                    author.addresses.forEach(address => {
                        if (address.value === verifiedAddress) {
                            address.verified = true;
                        }
                    });
                }
            });
        }
    }
};
exports.markSpasmEventAddressAsVerified = markSpasmEventAddressAsVerified;
const verifyEthereumSignature = (messageString, signature, signerAddress) => {
    try {
        if (signature && typeof (signature) === 'string') {
            const recoveredAddress = ethers_v6_1.ethers.verifyMessage(messageString, signature);
            return recoveredAddress.toLowerCase() ===
                signerAddress.toLowerCase();
        }
        return false;
    }
    catch (error) {
        return false;
    }
};
exports.verifyEthereumSignature = verifyEthereumSignature;
const utilsStatus = () => {
    console.log("spasm.js utils status: success");
};
exports.utilsStatus = utilsStatus;
const executeFunctionForAllNestedValuesOfType = (originalItem, customConfig) => {
    const defaultConfig = new interfaces_js_1.SanitizationConfig();
    const config = (0, exports.mergeSanitizationConfigs)(defaultConfig, customConfig || {});
    const { customFunction, valueType, maxDepth } = config;
    // Keep in mind that an array is of type "object" in typescript
    if (typeof (originalItem) !== "object" &&
        !Array.isArray(originalItem)) {
        throw new Error("ERROR: There are no nested values because an item is not an object, nor an array.");
    }
    const seenItems = new Set();
    // Maximum recursion depth to prevent stack overflow
    const maxRecursionDepth = maxDepth ?? 10;
    const executeRecursive = (currentItem, depth = 0) => {
        if (depth > maxRecursionDepth) {
            throw new Error("Maximum recursion depth exceeded");
        }
        if (seenItems.has(currentItem))
            return;
        seenItems.add(currentItem);
        if (!currentItem)
            return;
        // 1. Array
        if (Array.isArray(currentItem)) {
            currentItem.forEach((value, index) => {
                // 1.1. Exact data type match
                if (typeof (value) === valueType) {
                    currentItem[index] = customFunction(value);
                }
                // 1.2. Array
                if (Array.isArray(value)) {
                    executeRecursive(value, depth + 1);
                }
                // 1.3. Object
                if ((0, exports.isObjectWithValues)(value)) {
                    executeRecursive(value, depth + 1);
                }
                // 1.4. Other types
                // Do nothing
                return;
            });
        }
        // 2. Object
        if ((0, exports.isObjectWithValues)(currentItem)) {
            Object.keys(currentItem).forEach(key => {
                // 1.1. Exact data type match
                if (typeof currentItem[key] === valueType) {
                    currentItem[key] = customFunction(currentItem[key]);
                }
                // 1.2. Array
                if (Array.isArray(currentItem[key])) {
                    executeRecursive(currentItem[key], depth + 1);
                }
                // 1.3. Object
                if ((0, exports.isObjectWithValues)(currentItem[key])) {
                    executeRecursive(currentItem[key], depth + 1);
                }
                // 1.4. Other types
                // Do nothing
                return;
            });
        }
        // 3. Other data types
        // Do nothing
        return;
    };
    executeRecursive(originalItem);
    return;
};
exports.executeFunctionForAllNestedValuesOfType = executeFunctionForAllNestedValuesOfType;
const sanitizeEventWith = (originalItem, config) => {
    try {
        (0, exports.executeFunctionForAllNestedValuesOfType)(originalItem, config);
    }
    catch (error) {
        console.error("Sanitization failed", error);
        if (Array.isArray(originalItem)) {
            (0, exports.clearArray)(originalItem);
        }
        else if ((0, exports.isObjectWithValues)(originalItem)) {
            (0, exports.clearObject)(originalItem);
        }
    }
};
exports.sanitizeEventWith = sanitizeEventWith;
const sanitizeStringWithDompurify = (val) => {
    if (typeof (val) === "string") {
        return DOMPurify.sanitize(val);
    }
    return val;
};
exports.sanitizeStringWithDompurify = sanitizeStringWithDompurify;
const sanitizeEventWithDompurify = (originalItem, config) => {
    (0, exports.sanitizeEventWith)(originalItem, config);
};
exports.sanitizeEventWithDompurify = sanitizeEventWithDompurify;
exports.sanitizeEvent = exports.sanitizeEventWithDompurify;
const clearArray = (arr) => {
    arr.length = 0; // This clears the array
};
exports.clearArray = clearArray;
const clearObject = (obj) => {
    Object.keys(obj).forEach(key => {
        delete obj[key];
    });
};
exports.clearObject = clearObject;
const mergeObjects = (defaultObject, customObject, handleArrays = "overwriteArrays", depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!(0, exports.isObjectWithValues)(defaultObject) &&
        !(0, exports.isObjectWithValues)(customObject))
        return {};
    if ((0, exports.isObjectWithValues)(defaultObject) &&
        !(0, exports.isObjectWithValues)(customObject))
        return defaultObject;
    if (!(0, exports.isObjectWithValues)(defaultObject) &&
        (0, exports.isObjectWithValues)(customObject))
        return customObject;
    const mergedObject = { ...defaultObject };
    for (const key in customObject) {
        const value = customObject[key];
        const defaultValue = defaultObject[key];
        if (typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null) {
            // If the value is an object, recursively merge it
            mergedObject[key] = (0, exports.mergeObjects)(defaultValue, value, handleArrays, depth + 1);
        }
        else if (Array.isArray(value) &&
            (0, exports.hasValue)(value) &&
            handleArrays === "mergeArrays") {
            mergedObject[key] =
                mergeArrays(defaultValue, value);
        }
        else if (value !== undefined) {
            mergedObject[key] = value;
        }
    }
    return mergedObject;
};
exports.mergeObjects = mergeObjects;
const mergeConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = (0, exports.mergeObjects)(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
exports.mergeConfigs = mergeConfigs;
const mergeSanitizationConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = (0, exports.mergeObjects)(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
exports.mergeSanitizationConfigs = mergeSanitizationConfigs;
const hasSignatureOfFormat = (spasmEvent, signatureFormat) => {
    if (!spasmEvent)
        return false;
    if (!(0, exports.isObjectWithValues)(spasmEvent))
        return false;
    if (!spasmEvent.signatures)
        return false;
    if (!Array.isArray(spasmEvent.siblings))
        return false;
    let isSignatureFormatDetected = false;
    spasmEvent.signatures.forEach(signature => {
        if ((0, exports.isObjectWithValues)(signature) &&
            signature.format &&
            (0, exports.isObjectWithValues)(signature.format) &&
            signature.format.name &&
            typeof (signature.format.name) === "string") {
            if (signature.format.name.startsWith(signatureFormat)) {
                isSignatureFormatDetected = true;
            }
        }
    });
    return isSignatureFormatDetected;
};
exports.hasSignatureOfFormat = hasSignatureOfFormat;
const hasSignatureEthereum = (spasmEvent) => {
    return (0, exports.hasSignatureOfFormat)(spasmEvent, "ethereum");
};
exports.hasSignatureEthereum = hasSignatureEthereum;
const hasSignatureNostr = (spasmEvent) => {
    return (0, exports.hasSignatureOfFormat)(spasmEvent, "nostr");
};
exports.hasSignatureNostr = hasSignatureNostr;
const hasSiblingOfProtocol = (spasmEvent, eventProtocol) => {
    if (!spasmEvent)
        return false;
    if (!(0, exports.isObjectWithValues)(spasmEvent))
        return false;
    if (!spasmEvent.siblings)
        return false;
    if (!Array.isArray(spasmEvent.siblings))
        return false;
    let isEventProtocolDetected = false;
    spasmEvent.siblings.forEach(sibling => {
        if ((0, exports.isObjectWithValues)(sibling) &&
            sibling.protocol &&
            (0, exports.isObjectWithValues)(sibling.protocol) &&
            sibling.protocol.name &&
            typeof (sibling.protocol.name) === "string") {
            if (sibling.protocol.name === eventProtocol) {
                isEventProtocolDetected = true;
            }
        }
    });
    return isEventProtocolDetected;
};
exports.hasSiblingOfProtocol = hasSiblingOfProtocol;
const hasSiblingSpasm = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "spasm");
};
exports.hasSiblingSpasm = hasSiblingSpasm;
const hasSiblingDmp = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "dmp");
};
exports.hasSiblingDmp = hasSiblingDmp;
const hasSiblingNostr = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "nostr");
};
exports.hasSiblingNostr = hasSiblingNostr;
const hasSiblingWeb2 = (spasmEvent) => {
    return (0, exports.hasSiblingOfProtocol)(spasmEvent, "web2");
};
exports.hasSiblingWeb2 = hasSiblingWeb2;
const getAllSigners = (unknownEvent, onlyVerifiedFlag = false, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEventV2 = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEventV2 ||
        !Array.isArray(spasmEventV2.authors))
        return [];
    const signers = [];
    spasmEventV2.authors.forEach(author => {
        if (author &&
            author.addresses &&
            Array.isArray(author.addresses) &&
            author.addresses[0]) {
            author.addresses.forEach(address => {
                if (address &&
                    typeof (address) === "object" &&
                    !Array.isArray(address) &&
                    address.value &&
                    (typeof (address.value) === "string" ||
                        typeof (address.value) === "number")) {
                    if (onlyVerifiedFlag && address.verified) {
                        signers.push(address.value);
                    }
                    else if (!onlyVerifiedFlag) {
                        signers.push(address.value);
                    }
                }
            });
        }
    });
    if (toLowerCase) {
        signers.forEach((signer, index) => {
            if (typeof (signer) === "string") {
                signers[index] = signer.toLowerCase();
            }
        });
    }
    return signers;
};
exports.getAllSigners = getAllSigners;
const getVerifiedSigners = (unknownEvent) => {
    return (0, exports.getAllSigners)(unknownEvent, true, true);
};
exports.getVerifiedSigners = getVerifiedSigners;
const getAllIdsFromArrayOfIdObjects = (arrayOfIdObjects, toLowerCase = true) => {
    if (!arrayOfIdObjects || !Array.isArray(arrayOfIdObjects)) {
        return [];
    }
    const allIds = [];
    arrayOfIdObjects.forEach(idObject => {
        if (idObject &&
            'value' in idObject &&
            idObject.value &&
            (typeof (idObject.value) === "string" ||
                typeof (idObject.value) === "number")) {
            allIds.push(idObject.value);
        }
    });
    if (toLowerCase) {
        allIds.forEach((id, index) => {
            if (typeof (id) === "string") {
                allIds[index] = id.toLowerCase();
            }
        });
    }
    return allIds;
};
exports.getAllIdsFromArrayOfIdObjects = getAllIdsFromArrayOfIdObjects;
const getAllEventIds = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    if ('ids' in spasmEvent &&
        Array.isArray(spasmEvent.ids) &&
        (0, exports.hasValue)(spasmEvent.ids)) {
        const arrayOfIds = (0, exports.getAllIdsFromArrayOfIdObjects)(spasmEvent.ids, toLowerCase);
        return arrayOfIds;
    }
    return [];
};
exports.getAllEventIds = getAllEventIds;
const getAllParentIds = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    if ('parent' in spasmEvent &&
        spasmEvent.parent &&
        (0, exports.isObjectWithValues)(spasmEvent.parent)) {
        if ('ids' in spasmEvent.parent &&
            Array.isArray(spasmEvent.parent.ids) &&
            (0, exports.hasValue)(spasmEvent.parent.ids)) {
            const arrayOfIds = (0, exports.getAllIdsFromArrayOfIdObjects)(spasmEvent.parent.ids, toLowerCase);
            return arrayOfIds;
        }
    }
    return [];
};
exports.getAllParentIds = getAllParentIds;
// TODO write tests
const getAllRootIds = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    if ('root' in spasmEvent &&
        spasmEvent.root &&
        (0, exports.isObjectWithValues)(spasmEvent.root)) {
        if ('ids' in spasmEvent.root &&
            Array.isArray(spasmEvent.root.ids) &&
            (0, exports.hasValue)(spasmEvent.root.ids)) {
            const arrayOfIds = (0, exports.getAllIdsFromArrayOfIdObjects)(spasmEvent.root.ids, toLowerCase);
            return arrayOfIds;
        }
    }
    return [];
};
exports.getAllRootIds = getAllRootIds;
const getAllSignatures = (unknownEvent, toLowerCase = true) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    let spasmEventV2 = null;
    // SpasmEventV2
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventV2") {
        spasmEventV2 = unknownEvent;
    }
    else {
        const customConfig = {
            to: { spasm: { version: "2.0.0" } }
        };
        spasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)(unknownEvent, customConfig);
    }
    if (!spasmEventV2 ||
        !Array.isArray(spasmEventV2.signatures))
        return [];
    const allSignatures = [];
    spasmEventV2.signatures.forEach(signature => {
        if (signature &&
            signature.value &&
            (typeof (signature.value) === "string" ||
                typeof (signature.value) === "number")) {
            allSignatures.push(signature.value);
        }
    });
    if (toLowerCase) {
        allSignatures.forEach((signature, index) => {
            if (typeof (signature) === "string") {
                allSignatures[index] = signature.toLowerCase();
            }
        });
    }
    return allSignatures;
};
exports.getAllSignatures = getAllSignatures;
const getSignersListedIn = (unknownEvent, originaList) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return [];
    if (!originaList ||
        !Array.isArray(originaList) ||
        !(0, exports.hasValue)(originaList))
        return [];
    // Standardize list
    // Convert npubs to hex
    const list = [];
    originaList.forEach(signer => {
        if (
        // Address is npub
        signer && typeof (signer) === "string" &&
            signer.startsWith("npub") &&
            signer.length === 63) {
            const signerHex = (0, index_js_1.toBeHex)(signer);
            if (signerHex) {
                list.push(signerHex);
            }
            // Address is not npub
        }
        else if ((0, exports.isStringOrNumber)(signer)) {
            list.push(signer);
        }
    });
    if (!(0, exports.isArrayOfStringsOrNumbers)(list))
        return [];
    let spasmEvent = null;
    // SpasmEventV2
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventV2") {
        spasmEvent = unknownEvent;
    }
    else {
        const customConfig = {
            to: { spasm: { version: "2.0.0" } }
        };
        spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)(unknownEvent, customConfig);
    }
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return [];
    const allSigners = (0, exports.getVerifiedSigners)(spasmEvent);
    if (!allSigners ||
        !(0, exports.hasValue)(allSigners))
        return [];
    const filteredSigners = [];
    allSigners.forEach(signer => {
        if (signer && list.includes(signer)) {
            filteredSigners.push(signer);
        }
    });
    return filteredSigners;
};
exports.getSignersListedIn = getSignersListedIn;
exports.getPubkeysListedIn = exports.getSignersListedIn;
const getStatByAction = (unknownEvent, action = "react") => {
    if (!action || !exports.isStringOrNumber) {
        return null;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return null;
    }
    if (!("stats" in spasmEvent) || !spasmEvent.stats) {
        return null;
    }
    let spasmEventStat = null;
    spasmEvent.stats?.forEach(stat => {
        if ((0, exports.isObjectWithValues)(stat) &&
            "action" in stat && stat.action &&
            stat.action === action) {
            spasmEventStat = stat;
        }
    });
    return spasmEventStat;
};
exports.getStatByAction = getStatByAction;
const getTotalOfReaction = (unknownEvent, reaction = "upvote") => {
    if (!reaction || !exports.isStringOrNumber) {
        return 0;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return 0;
    }
    const reactionStat = (0, exports.getStatByAction)(spasmEvent, "react");
    if (!reactionStat) {
        return 0;
    }
    if (!("contents" in reactionStat) || !reactionStat.contents ||
        !(0, exports.isArrayWithValues)(reactionStat.contents)) {
        return 0;
    }
    let total = 0;
    reactionStat.contents.forEach(content => {
        if ("value" in content && content.value &&
            content.value === reaction &&
            "total" in content && content.total) {
            if (typeof (content.total) === "number") {
                total = content.total;
            }
            else if (typeof (content.total) === "string") {
                total = Number(content.total);
            }
        }
    });
    return total;
};
exports.getTotalOfReaction = getTotalOfReaction;
const getTotalOfMostPopularReaction = (unknownEvent) => {
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return 0;
    }
    const reactionStat = (0, exports.getStatByAction)(spasmEvent, "react");
    if (!reactionStat) {
        return 0;
    }
    if (!("contents" in reactionStat) || !reactionStat.contents ||
        !(0, exports.isArrayWithValues)(reactionStat.contents)) {
        return 0;
    }
    let total = 0;
    reactionStat.contents.forEach(content => {
        if ("total" in content && content.total) {
            let newTotal = 0;
            if (typeof (content.total) === "number") {
                newTotal = content.total;
            }
            else if (typeof (content.total) === "string") {
                newTotal = Number(content.total);
            }
            if (newTotal > total) {
                total = newTotal;
            }
        }
    });
    return total;
};
exports.getTotalOfMostPopularReaction = getTotalOfMostPopularReaction;
const getTotalOfAction = (unknownEvent, action = "reply") => {
    if (!action || !exports.isStringOrNumber) {
        return 0;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return 0;
    }
    const actionStat = (0, exports.getStatByAction)(spasmEvent, action);
    if (!actionStat) {
        return 0;
    }
    if ("total" in actionStat && actionStat.total) {
        if (typeof (actionStat.total) === "number") {
            return actionStat.total;
        }
        else if (typeof (actionStat.total) === "string") {
            return Number(actionStat.total);
        }
    }
    return 0;
};
exports.getTotalOfAction = getTotalOfAction;
const getTotalOfReply = (unknownEvent) => {
    return (0, exports.getTotalOfAction)(unknownEvent, "reply");
};
exports.getTotalOfReply = getTotalOfReply;
exports.getTotalOfReplyAction = exports.getTotalOfReply;
exports.getTotalOfActionReply = exports.getTotalOfReply;
const getTotalOfReact = (unknownEvent) => {
    return (0, exports.getTotalOfAction)(unknownEvent, "react");
};
exports.getTotalOfReact = getTotalOfReact;
exports.getTotalOfReactAction = exports.getTotalOfReact;
exports.getTotalOfActionReact = exports.getTotalOfReact;
const isAnySignerListedIn = (unknownEvent, list) => {
    const signersListedIn = (0, exports.getSignersListedIn)(unknownEvent, list);
    if (signersListedIn &&
        Array.isArray(signersListedIn) &&
        (0, exports.hasValue)(signersListedIn)) {
        return true;
    }
    return false;
};
exports.isAnySignerListedIn = isAnySignerListedIn;
exports.isAnyPubkeyListedIn = exports.isAnySignerListedIn;
const areAllSignersListedIn = (unknownEvent, list) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return false;
    if (!list ||
        !Array.isArray(list) ||
        !(0, exports.hasValue)(list))
        return false;
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return false;
    const allSigners = (0, exports.getVerifiedSigners)(spasmEvent);
    if (!allSigners ||
        !(0, exports.hasValue)(allSigners))
        return false;
    return allSigners.every(signer => {
        if (signer) {
            return list.includes(signer);
        }
        else {
            return false;
        }
    });
};
exports.areAllSignersListedIn = areAllSignersListedIn;
exports.areAllPubkeysListedIn = exports.areAllSignersListedIn;
const getIdByFormat = (unknownEvent, customIdFormat) => {
    const defaultIdFormat = {
        name: "spasmid",
        version: "01"
    };
    const idFormat = customIdFormat || defaultIdFormat;
    const idFormatName = idFormat?.name
        ? idFormat?.name : "spasmid";
    const idFormatVersion = idFormat?.version
        ? idFormat?.version : "";
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent ||
        !(0, exports.isObjectWithValues)(spasmEvent) ||
        !(0, exports.hasValue)(spasmEvent))
        return null;
    if (!('ids' in spasmEvent) ||
        !spasmEvent.ids ||
        !Array.isArray(spasmEvent.ids)) {
        return null;
    }
    const { ids } = spasmEvent;
    let idValue = null;
    ids.forEach(id => {
        if (!id || typeof (id) !== "object" || Array.isArray(id) ||
            !(0, exports.isObjectWithValues)(id)) {
            return;
        }
        if (!('value' in id) || !id.value ||
            (typeof (id.value) !== "string" &&
                typeof (id.value) !== "number")) {
            return;
        }
        if (!('format' in id) || !id.format) {
            return;
        }
        const { format } = id;
        if (format && typeof (format) === "object" &&
            !Array.isArray(format) &&
            (0, exports.isObjectWithValues)(format)) {
            // Match format name
            if (format.name && typeof (format.name) === "string" &&
                idFormatName && format.name === idFormatName) {
                // No version was specified, so returning an ID value
                // which only matched the specified ID format name.
                if (!idFormatVersion) {
                    idValue = id.value;
                }
                // Match format version (if specified)
                if (format.version &&
                    typeof (format.version) === "string" &&
                    idFormatVersion && format.version === idFormatVersion) {
                    idValue = id.value;
                }
            }
        }
        return;
    });
    return idValue;
};
exports.getIdByFormat = getIdByFormat;
const checkIfEventHasThisId = (unknownEvent, id, shortIdLength) => {
    if (!id || !(0, exports.isStringOrNumber)(id)) {
        return false;
    }
    const spasmEvent = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!spasmEvent || !(0, exports.isObjectWithValues)(spasmEvent)) {
        return false;
    }
    const eventIds = (0, exports.getAllEventIds)(spasmEvent);
    if (!eventIds || !(0, exports.isArrayWithValues)(eventIds)) {
        return false;
    }
    // Short ID (not URL)
    if (shortIdLength && typeof (shortIdLength) === "number" &&
        shortIdLength > 15 && String(id) &&
        String(id).length === shortIdLength &&
        !(0, exports.isValidUrl)(id)) {
        let ifMatch = false;
        eventIds.forEach(eventId => {
            if (String(eventId) && String(id) &&
                String(eventId).startsWith(String(id))) {
                ifMatch = true;
            }
        });
        return ifMatch;
        // Full ID
    }
    else {
        if (eventIds.includes(id)) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.checkIfEventHasThisId = checkIfEventHasThisId;
const getEventById = (unknownEvents, id, shortIdLength) => {
    if (!id || !(0, exports.isStringOrNumber)(id)) {
        return null;
    }
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const foundEvents = [];
    spasmEvents.forEach(event => {
        if ((0, exports.checkIfEventHasThisId)(event, id, shortIdLength)) {
            foundEvents.push(event);
        }
    });
    if (foundEvents && Array.isArray(foundEvents) &&
        foundEvents.length === 1 &&
        (0, exports.isObjectWithValues)(foundEvents[0])) {
        return foundEvents[0];
    }
    else if (foundEvents && Array.isArray(foundEvents) &&
        foundEvents.length > 1 &&
        (0, exports.isArrayWithValues)(foundEvents)) {
        const mergedEvent = (0, exports.mergeSpasmEventsV2)(foundEvents);
        if (mergedEvent) {
            return mergedEvent;
        }
    }
    return null;
};
exports.getEventById = getEventById;
const getEventsByIds = (unknownEvents, ids, shortIdLength) => {
    if (!ids || !(0, exports.isArrayWithValues)(ids)) {
        return null;
    }
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const foundEvents = [];
    ids.forEach(id => {
        spasmEvents.forEach(event => {
            if ((0, exports.checkIfEventHasThisId)(event, id, shortIdLength)) {
                foundEvents.push(event);
            }
        });
    });
    const mergedEvents = (0, exports.mergeDifferentSpasmEventsV2)(foundEvents);
    if (mergedEvents && (0, exports.isArrayWithValues)(mergedEvents)) {
        return mergedEvents;
    }
    else {
        return null;
    }
};
exports.getEventsByIds = getEventsByIds;
exports.extractIdByFormat = exports.getIdByFormat;
const extractSpasmId01 = (unknownEvent) => {
    return (0, exports.extractIdByFormat)(unknownEvent, { name: "spasmid", version: "01" });
};
exports.extractSpasmId01 = extractSpasmId01;
const toBeSpasmEventV2 = (unknownEvent) => {
    if (!(0, exports.isObjectWithValues)(unknownEvent))
        return null;
    let spasmEvent = null;
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventV2") {
        spasmEvent = unknownEvent;
    }
    else {
        const customConfig = {
            to: { spasm: { version: "2.0.0" } }
        };
        spasmEvent = (0, convertToSpasm_js_1.convertToSpasm)(unknownEvent, customConfig);
    }
    if (spasmEvent &&
        (0, exports.isObjectWithValues)(spasmEvent) &&
        (0, exports.hasValue)(spasmEvent) &&
        'type' in spasmEvent &&
        spasmEvent.type === "SpasmEventV2") {
        return spasmEvent;
    }
    return null;
};
exports.toBeSpasmEventV2 = toBeSpasmEventV2;
const toBeSpasmEventsV2 = (unknownEvents) => {
    if (!unknownEvents || !Array.isArray(unknownEvents))
        return null;
    let spasmEvents = [];
    unknownEvents.forEach(event => {
        const spasmEvent = (0, exports.toBeSpasmEventV2)(event);
        if (spasmEvent && (0, exports.isObjectWithValues)(spasmEvent)) {
            spasmEvents.push(spasmEvent);
        }
    });
    if (!spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    return spasmEvents;
};
exports.toBeSpasmEventsV2 = toBeSpasmEventsV2;
const extractSignerFromEthereumSignature = (signedString, signature) => {
    try {
        if (signature && typeof (signature) === 'string') {
            const recoveredAddress = ethers_v6_1.ethers.verifyMessage(signedString, signature);
            if (recoveredAddress && typeof (recoveredAddress) === "string") {
                return recoveredAddress.toLowerCase();
            }
            else {
                return null;
            }
        }
    }
    catch (error) {
        return null;
    }
    return null;
};
exports.extractSignerFromEthereumSignature = extractSignerFromEthereumSignature;
// function deepMerge(original: any, newObject: any): any {
//   const result: any = {};
//
//   // Copy all existing keys from original
//   Object.keys(original).forEach(key => {
//     result[key] = original[key];
//   });
//
//   // Iterate through newObject keys
//   Object.keys(newObject).forEach(key => {
//     if (typeof newObject[key] === 'object' && newObject[key] !== null) {
//       // If it's an array, merge its contents
//       if (Array.isArray(newObject[key])) {
//         result[key] = deepMergeArray(result[key], newObject[key]);
//       }
//       // If it's an object, merge its properties
//       else {
//         result[key] = deepMerge(result[key], newObject[key]);
//       }
//     }
//     // For other types, simply overwrite the value
//     else {
//       result[key] = newObject[key];
//     }
//   });
//
//   return result;
// }
function mergeArrays(original, newArray) {
    const result = [];
    const seen = new Set();
    // Function to safely add elements to avoid duplicates
    function safeAdd(element) {
        if (!seen.has(element)) {
            seen.add(element);
            result.push(element);
        }
    }
    // Add all unique elements from both arrays
    original.forEach(safeAdd);
    newArray.forEach(safeAdd);
    return result;
}
const mergeSpasmEventsV2 = (spasmEvents, depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!spasmEvents || !Array.isArray(spasmEvents))
        return null;
    if (!spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(spasmEvents[0]);
    if (!mainSpasmEvent)
        return null;
    const mainSpasmEventIds = (0, exports.getAllEventIds)(mainSpasmEvent);
    const mainSpasmEventSignatures = (0, exports.getAllSignatures)(mainSpasmEvent);
    const mainSpasmEventSiblingTypes = new Set();
    mainSpasmEvent.siblings?.forEach(mainSibling => {
        if ('type' in mainSibling && mainSibling.type) {
            mainSpasmEventSiblingTypes.add(mainSibling.type);
        }
    });
    const mainSpasmEventSharedByIds = new Set();
    mainSpasmEvent.sharedBy?.ids?.forEach(id => {
        if ('value' in id && id.value) {
            mainSpasmEventSharedByIds.add(id.value);
        }
    });
    spasmEvents.forEach((spasmEventAny, index) => {
        const spasmEvent = (0, exports.toBeSpasmEventV2)(spasmEventAny);
        // spasm event with index 0 is used for main spasm event
        if (index > 0 &&
            spasmEvent &&
            (0, exports.ifEventsHaveSameSpasmId01)(mainSpasmEvent, spasmEvent)) {
            // Siblings
            if ("siblings" in spasmEvent &&
                spasmEvent.siblings &&
                Array.isArray(spasmEvent.siblings)) {
                spasmEvent.siblings.forEach(sibling => {
                    // If the main event doesn't have this sibling, add it
                    if (!mainSpasmEventSiblingTypes.has(sibling.type)) {
                        mainSpasmEvent.siblings?.push(sibling);
                        mainSpasmEventSiblingTypes.add(sibling.type);
                        // Add an ID to main event
                        if ('ids' in sibling && sibling.ids &&
                            Array.isArray(sibling.ids)) {
                            sibling.ids.forEach(id => {
                                if (!mainSpasmEventIds.includes(id.value)) {
                                    // Create IDs key if it doesn't exist
                                    mainSpasmEvent.ids ??= [];
                                    mainSpasmEvent.ids.push(id);
                                }
                            });
                        }
                        // Add a signature to main event
                        if ('signatures' in sibling && sibling.signatures &&
                            Array.isArray(sibling.signatures)) {
                            sibling.signatures.forEach(signature => {
                                if (!mainSpasmEventSignatures.includes(signature.value)) {
                                    // Create signatures key if it doesn't exist
                                    mainSpasmEvent.signatures ??= [];
                                    mainSpasmEvent.signatures.push(signature);
                                    if (signature.pubkey) {
                                        (0, exports.markSpasmEventAddressAsVerified)(mainSpasmEvent, signature.pubkey);
                                    }
                                    // TODO mark address as verified (done)
                                    // - What if multiple authors?
                                }
                            });
                        }
                        // If the main event already has a sibling with the
                        // same type, then add missing signatures which exist
                        // on a new sibling, but don't on the main sibling.
                    }
                    else {
                        // Find sibling with the same type in main event.
                        mainSpasmEvent.siblings?.forEach(mainSibling => {
                            if (mainSibling.type === sibling.type) {
                                // Iterate through all signatures in sibling and
                                // add missing signatures to the main sibling.
                                if ('signatures' in sibling &&
                                    sibling.signatures &&
                                    Array.isArray(sibling.signatures)) {
                                    sibling.signatures.forEach(signature => {
                                        if (!mainSpasmEventSignatures.includes(signature.value) &&
                                            "signatures" in mainSpasmEvent &&
                                            mainSpasmEvent.signatures &&
                                            Array.isArray(mainSpasmEvent.signatures)) {
                                            mainSpasmEvent.signatures.push(signature);
                                            if (signature.pubkey) {
                                                (0, exports.markSpasmEventAddressAsVerified)(mainSpasmEvent, signature.pubkey);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
            // Add source only if source doesn't exist
            if ("source" in spasmEvent &&
                spasmEvent.source &&
                (0, exports.hasValue)(spasmEvent.source)) {
                if (!("source" in mainSpasmEvent) ||
                    !mainSpasmEvent.source ||
                    !(0, exports.hasValue)(mainSpasmEvent)) {
                    mainSpasmEvent.source = spasmEvent.source;
                }
            }
            // Add sharedBy
            if ("sharedBy" in spasmEvent &&
                spasmEvent.sharedBy &&
                (0, exports.hasValue)(spasmEvent.sharedBy)) {
                spasmEvent?.sharedBy?.ids?.forEach(id => {
                    if ("value" in id && id.value &&
                        !mainSpasmEventSharedByIds.has(id.value)) {
                        // Create sharedBy key if it doesn't exist
                        mainSpasmEvent.sharedBy ??= {};
                        mainSpasmEvent.sharedBy.ids ??= [];
                        mainSpasmEvent.sharedBy.ids?.push(id);
                        mainSpasmEventSharedByIds.add(id.value);
                    }
                });
            }
            // Parent event
            if ("parent" in spasmEvent && spasmEvent.parent &&
                "event" in spasmEvent.parent &&
                spasmEvent.parent?.event &&
                typeof (spasmEvent.parent?.event) === "object" &&
                (0, exports.hasValue)(spasmEvent.parent?.event) &&
                mainSpasmEvent.parent &&
                typeof (mainSpasmEvent.parent) === "object") {
                if (!("event" in mainSpasmEvent.parent) ||
                    !mainSpasmEvent.parent.event) {
                    mainSpasmEvent.parent.event = spasmEvent.parent.event;
                }
                else if (mainSpasmEvent.parent.event &&
                    typeof (mainSpasmEvent.parent.event) === "object") {
                    const mergedEvent = (0, exports.mergeSpasmEventsV2)([
                        mainSpasmEvent.parent.event,
                        spasmEvent.parent.event,
                        depth + 1
                    ]);
                    if (mergedEvent) {
                        mainSpasmEvent.parent.event = mergedEvent;
                    }
                }
            }
            // Root event
            if ("root" in spasmEvent && spasmEvent.root &&
                "event" in spasmEvent.root &&
                spasmEvent.root?.event &&
                typeof (spasmEvent.root?.event) === "object" &&
                (0, exports.hasValue)(spasmEvent.root?.event) &&
                mainSpasmEvent.root &&
                typeof (mainSpasmEvent.root) === "object") {
                if (!("event" in mainSpasmEvent.root) ||
                    !mainSpasmEvent.root.event) {
                    mainSpasmEvent.root.event = spasmEvent.root.event;
                }
                else if (mainSpasmEvent.root.event &&
                    typeof (mainSpasmEvent.root.event) === "object") {
                    const mergedEvent = (0, exports.mergeSpasmEventsV2)([
                        mainSpasmEvent.root.event,
                        spasmEvent.root.event,
                        depth + 1
                    ]);
                    if (mergedEvent) {
                        mainSpasmEvent.root.event = mergedEvent;
                    }
                }
            }
            // Stats
            if ("stats" in spasmEvent &&
                spasmEvent.stats &&
                Array.isArray(spasmEvent.stats) &&
                (0, exports.hasValue)(spasmEvent.stats)) {
                if (!("stats" in mainSpasmEvent) ||
                    !mainSpasmEvent.stats ||
                    !Array.isArray(mainSpasmEvent.stats) ||
                    !(0, exports.hasValue)(mainSpasmEvent.stats)) {
                    mainSpasmEvent.stats = spasmEvent.stats;
                }
                else if ("stats" in mainSpasmEvent &&
                    mainSpasmEvent.stats &&
                    Array.isArray(mainSpasmEvent.stats) &&
                    (0, exports.hasValue)(mainSpasmEvent.stats)) {
                    (0, exports.mergeStatsV2)([mainSpasmEvent.stats, spasmEvent.stats]);
                }
            }
            // Db
            if ("db" in spasmEvent &&
                spasmEvent.db &&
                (0, exports.hasValue)(spasmEvent.db)) {
                if (!("db" in mainSpasmEvent) ||
                    !mainSpasmEvent.db ||
                    !(0, exports.hasValue)(mainSpasmEvent.db)) {
                    mainSpasmEvent.db = spasmEvent.db;
                }
                else if ("db" in mainSpasmEvent &&
                    mainSpasmEvent.db &&
                    (0, exports.hasValue)(mainSpasmEvent.db)) {
                    // key
                    if ((!("key" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.key ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.key)) && (("key" in spasmEvent.db) &&
                        spasmEvent.db.key &&
                        (0, exports.hasValue)(spasmEvent.db.key))) {
                        mainSpasmEvent.db.key = spasmEvent.db.key;
                    }
                    // table
                    if ((!("table" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.table ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.table)) && (("table" in spasmEvent.db) &&
                        spasmEvent.db.table &&
                        (0, exports.hasValue)(spasmEvent.db.table))) {
                        mainSpasmEvent.db.table = spasmEvent.db.table;
                    }
                    // addedTimestamp
                    if ((!("addedTimestamp" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.addedTimestamp ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.addedTimestamp)) && ("addedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.addedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.addedTimestamp) &&
                        typeof (spasmEvent.db.addedTimestamp) === "number")) {
                        mainSpasmEvent.db.addedTimestamp =
                            spasmEvent.db.addedTimestamp;
                    }
                    else if ("addedTimestamp" in mainSpasmEvent.db &&
                        mainSpasmEvent.db.addedTimestamp &&
                        (0, exports.hasValue)(mainSpasmEvent.db.addedTimestamp) &&
                        typeof (mainSpasmEvent.db.addedTimestamp) === "number" &&
                        "addedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.addedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.addedTimestamp) &&
                        typeof (spasmEvent.db.addedTimestamp) === "number" &&
                        mainSpasmEvent.db.addedTimestamp < spasmEvent.db.addedTimestamp) {
                        mainSpasmEvent.db.addedTimestamp =
                            spasmEvent.db.addedTimestamp;
                    }
                    // updatedTimestamp
                    if ((!("updatedTimestamp" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.updatedTimestamp ||
                        !(0, exports.hasValue)(mainSpasmEvent.db.updatedTimestamp)) && ("updatedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.updatedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.updatedTimestamp) &&
                        typeof (spasmEvent.db.updatedTimestamp) === "number")) {
                        mainSpasmEvent.db.updatedTimestamp =
                            spasmEvent.db.updatedTimestamp;
                    }
                    else if ("updatedTimestamp" in mainSpasmEvent.db &&
                        mainSpasmEvent.db.updatedTimestamp &&
                        (0, exports.hasValue)(mainSpasmEvent.db.updatedTimestamp) &&
                        typeof (mainSpasmEvent.db.updatedTimestamp) === "number" &&
                        "updatedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.updatedTimestamp &&
                        (0, exports.hasValue)(spasmEvent.db.updatedTimestamp) &&
                        typeof (spasmEvent.db.updatedTimestamp) === "number" &&
                        mainSpasmEvent.db.updatedTimestamp < spasmEvent.db.updatedTimestamp) {
                        mainSpasmEvent.db.updatedTimestamp =
                            spasmEvent.db.updatedTimestamp;
                    }
                }
            }
            // Children
            if ("children" in spasmEvent &&
                spasmEvent.children &&
                Array.isArray(spasmEvent.children) &&
                (0, exports.hasValue)(spasmEvent.children)) {
                if (!("children" in mainSpasmEvent) ||
                    !mainSpasmEvent.children ||
                    !Array.isArray(mainSpasmEvent.children) ||
                    !(0, exports.hasValue)(mainSpasmEvent.children)) {
                    mainSpasmEvent.children = spasmEvent.children;
                }
                else if ("children" in mainSpasmEvent &&
                    mainSpasmEvent.children &&
                    Array.isArray(mainSpasmEvent.children) &&
                    (0, exports.hasValue)(mainSpasmEvent.children)) {
                    (0, exports.mergeChildrenV2)([
                        mainSpasmEvent.children, spasmEvent.children,
                    ], depth);
                }
            }
        }
    });
    (0, exports.cleanSpasmEventV2)(mainSpasmEvent);
    return mainSpasmEvent;
};
exports.mergeSpasmEventsV2 = mergeSpasmEventsV2;
const mergeDifferentSpasmEventsV2 = (unknownEvents, depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    const uniqueIds = new Set();
    const uniqueEvents = [];
    const checkIfEventIsAlreadyInUnique = (event) => {
        const allEventIds = (0, exports.getAllEventIds)(event);
        let isAlreadyAdded = false;
        if (allEventIds && Array.isArray(allEventIds)) {
            allEventIds.forEach(id => {
                if (uniqueIds.has(id)) {
                    isAlreadyAdded = true;
                }
            });
        }
        return isAlreadyAdded;
    };
    spasmEvents?.forEach(event => {
        // Spasm events might have multiple IDs so we need to use
        // flags below to avoid redoing the same actions.
        let isEventAddedToUnique = false;
        const isEventAlreadyInUnique = checkIfEventIsAlreadyInUnique(event);
        let isEventMerged = false;
        // TODO check if other IDs of an event
        // are not in uniqueIds
        if ('ids' in event && event.ids &&
            Array.isArray(event.ids)) {
            event.ids.forEach(id => {
                if ("value" in id && id.value &&
                    (typeof (id.value) === "string" ||
                        typeof (id.value) === "number")) {
                    if (!uniqueIds.has(id.value) &&
                        !isEventAlreadyInUnique) {
                        uniqueIds.add(id.value);
                        if (!isEventAddedToUnique) {
                            uniqueEvents.push(event);
                            isEventAddedToUnique = true;
                        }
                    }
                    else if (uniqueIds.has(id.value)) {
                        if (!isEventAddedToUnique && !isEventMerged) {
                            // find unique event with same ID and merge
                            uniqueEvents.forEach((uniqueEvent, uniqueEventIndex) => {
                                if ('ids' in uniqueEvent && uniqueEvent.ids &&
                                    Array.isArray(uniqueEvent.ids)) {
                                    uniqueEvent.ids.forEach(uniqueEventId => {
                                        if ("value" in uniqueEventId &&
                                            uniqueEventId.value &&
                                            (typeof (uniqueEventId.value) === "string" ||
                                                typeof (uniqueEventId.value) === "number")) {
                                            if (uniqueEventId.value === id.value) {
                                                const mergedEvent = (0, exports.mergeSpasmEventsV2)([
                                                    uniqueEvent, event, depth
                                                ]);
                                                if (mergedEvent) {
                                                    uniqueEvents[uniqueEventIndex] =
                                                        mergedEvent;
                                                    isEventMerged = true;
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }
    });
    if (uniqueEvents && Array.isArray(uniqueEvents) &&
        uniqueEvents[0] &&
        (0, exports.isObjectWithValues)(uniqueEvents[0])) {
        return uniqueEvents;
    }
    else {
        return null;
    }
};
exports.mergeDifferentSpasmEventsV2 = mergeDifferentSpasmEventsV2;
const sortSpasmEventsV2ByDbAddedTimestamp = (unknownEvents, order = "desc") => {
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return null;
    try {
        const spasmEventsWithDbTimestamp = [];
        const spasmEventsWithoutDbTimestamp = [];
        // Events without db.addedTimestamp are moved into a separate
        // array which is joined with the sorted array at the end.
        spasmEvents.forEach(event => {
            if ('db' in event && event.db &&
                'addedTimestamp' in event.db &&
                event.db.addedTimestamp &&
                typeof (event.db.addedTimestamp) === "number") {
                spasmEventsWithDbTimestamp.push(event);
            }
            else {
                spasmEventsWithoutDbTimestamp.push(event);
            }
        });
        spasmEventsWithDbTimestamp.sort((a, b) => {
            if (a.db?.addedTimestamp && b.db?.addedTimestamp) {
                if (order === "desc") {
                    const result = String(b.db.addedTimestamp)
                        .localeCompare(String(a.db.addedTimestamp));
                    return result;
                }
                else if (order === "asc") {
                    const result = String(a.db.addedTimestamp)
                        .localeCompare(String(b.db.addedTimestamp));
                    return result;
                }
            }
            // Ideally, return 1 should never happen because we've
            // filtered out events without db.addedTimestamp above.
            // In case if we missed some scenarios,
            // then 'return 1' should push an element without
            // db.addedTimestamp to the end of the array,
            // but it can still mess up the sorting.
            return 1;
        });
        const sortedSpasmEvents = [
            ...spasmEventsWithDbTimestamp,
            ...spasmEventsWithoutDbTimestamp
        ];
        if ((0, exports.isArrayWithValues)(sortedSpasmEvents)) {
            return sortedSpasmEvents;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.sortSpasmEventsV2ByDbAddedTimestamp = sortSpasmEventsV2ByDbAddedTimestamp;
exports.sortSpasmEventsV2 = exports.sortSpasmEventsV2ByDbAddedTimestamp;
const ifEventsHaveSameSpasmId01 = (event1, event2) => {
    if (!event1 || !event2)
        return false;
    if (!(0, exports.isObjectWithValues)(event1))
        return false;
    if (!(0, exports.isObjectWithValues)(event2))
        return false;
    const spasmEvent1 = (0, exports.toBeSpasmEventV2)(event1);
    const spasmEvent2 = (0, exports.toBeSpasmEventV2)(event2);
    if (!spasmEvent1 || !spasmEvent2)
        return false;
    const id1 = (0, exports.extractSpasmId01)(spasmEvent1);
    const id2 = (0, exports.extractSpasmId01)(spasmEvent2);
    return id1 === id2;
};
exports.ifEventsHaveSameSpasmId01 = ifEventsHaveSameSpasmId01;
const deepCopyOfObject = (obj) => {
    if (!obj || typeof (obj) !== "object")
        return {};
    return JSON.parse(JSON.stringify(obj));
};
exports.deepCopyOfObject = deepCopyOfObject;
exports.copyOf = exports.deepCopyOfObject;
const cleanSpasmEventV2 = (spasmEvent) => {
    if (!spasmEvent)
        return;
    if (!(0, exports.isObjectWithValues)(spasmEvent))
        return;
    // Remove siblings without signatures if signed siblings
    // of the same protocol and protocol version are attached.
    const allSiblingTypes = new Set();
    spasmEvent.siblings?.forEach(sibling => {
        if ('type' in sibling && sibling.type) {
            allSiblingTypes.add(sibling.type);
        }
    });
    if ('siblings' in spasmEvent &&
        spasmEvent.siblings &&
        Array.isArray(spasmEvent.siblings)) {
        const cleanSiblings = spasmEvent.siblings?.filter(sibling => {
            if ((sibling.type === "SiblingSpasmV2" &&
                allSiblingTypes.has("SiblingSpasmSignedV2")) ||
                (sibling.type === "SiblingDmpV2" &&
                    allSiblingTypes.has("SiblingDmpSignedV2")) ||
                (sibling.type === "SiblingNostrV2" &&
                    allSiblingTypes.has("SiblingNostrSignedV2")) ||
                (sibling.type === "SiblingNostrSpasmV2" &&
                    allSiblingTypes.has("SiblingNostrSpasmSignedV2"))) {
                return false;
            }
            return true;
        });
        spasmEvent.siblings = cleanSiblings;
    }
};
exports.cleanSpasmEventV2 = cleanSpasmEventV2;
const mergeStatsV2 = (allStats) => {
    if (!allStats)
        return null;
    if (!Array.isArray(allStats))
        return null;
    if (!allStats[0])
        return null;
    if (!allStats[0][0])
        return null;
    const mainStats = allStats[0];
    const mainStatsActions = new Set();
    mainStats?.forEach(mainStat => {
        if ('action' in mainStat && mainStat.action &&
            (typeof (mainStat.action) === "string" ||
                typeof (mainStat.action) === "number")) {
            mainStatsActions.add(mainStat.action);
        }
    });
    allStats.forEach((stats, indexOfStats) => {
        // stats with index 0 is used for main stats
        if (indexOfStats > 0 &&
            stats &&
            Array.isArray(stats)) {
            stats.forEach(stat => {
                if ('action' in stat && stat.action &&
                    (typeof (stat.action) === "string" ||
                        typeof (stat.action) === "number")) {
                    // push stat for actions that don't exist on main stats
                    if (!mainStatsActions.has(stat.action)) {
                        mainStats.push(stat);
                        mainStatsActions.add(stat.action);
                        // if action stat exists on main, set it to the newest
                    }
                    else if (mainStatsActions.has(stat.action)) {
                        mainStats.forEach((mainStat, indexOfMainStat) => {
                            if (mainStat.action &&
                                stat.action === mainStat.action) {
                                if ('latestTimestamp' in mainStat &&
                                    mainStat.latestTimestamp &&
                                    typeof (mainStat.latestTimestamp) === "number" &&
                                    'latestTimestamp' in stat &&
                                    stat.latestTimestamp &&
                                    typeof (stat.latestTimestamp) === "number") {
                                    if (stat.latestTimestamp > mainStat.latestTimestamp) {
                                        mainStats[indexOfMainStat] = stat;
                                    }
                                }
                                else if ('latestDbTimestamp' in mainStat &&
                                    mainStat.latestDbTimestamp &&
                                    typeof (mainStat.latestDbTimestamp) === "number" &&
                                    'latestDbTimestamp' in stat &&
                                    stat.latestDbTimestamp &&
                                    typeof (stat.latestDbTimestamp) === "number") {
                                    if (stat.latestDbTimestamp > mainStat.latestDbTimestamp) {
                                        mainStats[indexOfMainStat] = stat;
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });
    return mainStats;
};
exports.mergeStatsV2 = mergeStatsV2;
const mergeChildrenV2 = (allChildren, depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!allChildren)
        return null;
    if (!Array.isArray(allChildren))
        return null;
    if (!allChildren[0])
        return null;
    // The first array might be empty
    // if (!allChildren[0][0]) return null
    const mainChildren = allChildren[0];
    const mainChildrenIds = new Set();
    mainChildren?.forEach(mainChild => {
        if ('ids' in mainChild && mainChild.ids &&
            Array.isArray(mainChild.ids)) {
            mainChild.ids.forEach(id => {
                if ("value" in id && id.value &&
                    (typeof (id.value) === "string" ||
                        typeof (id.value) === "number")) {
                    mainChildrenIds.add(id.value);
                }
            });
        }
    });
    allChildren.forEach((children, indexOfChildren) => {
        // children with index 0 is used for main children
        if (indexOfChildren > 0 &&
            children &&
            Array.isArray(children)) {
            children.forEach(child => {
                let isChildMerged = false;
                if ('ids' in child && child.ids &&
                    Array.isArray(child.ids)) {
                    child.ids.forEach(id => {
                        if ('value' in id && id.value &&
                            (typeof (id.value) === "string" ||
                                typeof (id.value) === "number")) {
                            // isChildMerged flag is used because events can
                            // have many IDs and we don't want to redo merging
                            // for each ID if a child has already been merged.
                            if (!mainChildrenIds.has(id.value) &&
                                !isChildMerged) {
                                mainChildren.push(child);
                                mainChildrenIds.add(id.value);
                                isChildMerged = true;
                            }
                            else if (mainChildrenIds.has(id.value) &&
                                !isChildMerged) {
                                mainChildren.forEach((mainChild, mainChildIndex) => {
                                    if ('ids' in mainChild && mainChild.ids &&
                                        Array.isArray(mainChild.ids)) {
                                        mainChild.ids.forEach(mainChildId => {
                                            if ('value' in id && mainChildId.value &&
                                                (typeof (mainChildId.value) === "string" ||
                                                    typeof (mainChildId.value) === "number")) {
                                                if (mainChildId.value === id.value) {
                                                    if ('event' in child && child.event &&
                                                        typeof (child.event) === "object" &&
                                                        (0, exports.hasValue)(child.event)) {
                                                        // Add child.event to main if event
                                                        // doesn't exist in main child.
                                                        if (!('event' in mainChild) ||
                                                            !mainChild.event ||
                                                            typeof (mainChild.event) !== "object" ||
                                                            !(0, exports.hasValue)(mainChild.event)) {
                                                            mainChildren[mainChildIndex].event =
                                                                child.event;
                                                            // If event already exists in main,
                                                            // then merge two events.
                                                        }
                                                        else if ('event' in mainChild &&
                                                            mainChild.event &&
                                                            typeof (mainChild.event) === "object" &&
                                                            (0, exports.hasValue)(mainChild.event)) {
                                                            const mergedChildEvent = (0, exports.mergeSpasmEventsV2)([
                                                                mainChild.event,
                                                                child.event,
                                                                depth + 1
                                                            ]);
                                                            const finalChild = {
                                                                ...mainChild
                                                            };
                                                            if (mergedChildEvent) {
                                                                finalChild.event =
                                                                    mergedChildEvent;
                                                            }
                                                            mainChildren[mainChildIndex] =
                                                                finalChild;
                                                        }
                                                    }
                                                    isChildMerged = true;
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
    return mainChildren;
};
exports.mergeChildrenV2 = mergeChildrenV2;
const addEventsToTree = (unknownEvent, unknownEvents) => {
    if (!unknownEvent)
        return null;
    let treeEventV2 = (0, exports.toBeSpasmEventV2)(unknownEvent);
    if (!treeEventV2 || !(0, exports.isObjectWithValues)(treeEventV2))
        return null;
    if (!unknownEvents)
        return treeEventV2;
    const spasmEvents = (0, exports.toBeSpasmEventsV2)(unknownEvents);
    if (!spasmEvents || !spasmEvents[0] ||
        !(0, exports.isObjectWithValues)(spasmEvents[0]))
        return treeEventV2;
    const treeRootIds = (0, exports.getAllRootIds)(treeEventV2);
    const treeParentIds = (0, exports.getAllParentIds)(treeEventV2);
    const treeIds = (0, exports.getAllEventIds)(treeEventV2);
    spasmEvents.forEach(event => {
        if (event && (0, exports.isObjectWithValues)(event)) {
            // const eventRootIds = getAllRootIds(event)
            const eventParentIds = (0, exports.getAllParentIds)(event);
            const eventIds = (0, exports.getAllEventIds)(event);
            // Attach to tree as a root event
            if ((0, exports.ifArraysHaveCommonId)(treeRootIds, eventIds)) {
                if (treeEventV2) {
                    treeEventV2 = (0, exports.attachEventAsRoot)(treeEventV2, event);
                }
                // Attach to tree as a parent event
            }
            else if ((0, exports.ifArraysHaveCommonId)(treeParentIds, eventIds)) {
                if (treeEventV2) {
                    treeEventV2 = (0, exports.attachEventAsParent)(treeEventV2, event);
                }
                // Attach to tree as a child event
            }
            else if ((0, exports.ifArraysHaveCommonId)(treeIds, eventParentIds)) {
                if (treeEventV2) {
                    treeEventV2 = (0, exports.attachEventAsChild)(treeEventV2, event);
                }
            }
        }
    });
    if (treeEventV2 && (0, exports.isObjectWithValues)(treeEventV2)) {
        return treeEventV2;
    }
    else {
        return null;
    }
};
exports.addEventsToTree = addEventsToTree;
const ifArraysHaveCommonId = (array1, array2) => {
    if (!array1 || !(0, exports.isArrayOfStringsOrNumbers)(array1))
        return false;
    if (!array2 || !(0, exports.isArrayOfStringsOrNumbers)(array2))
        return false;
    let ifCommonValue = false;
    array1.forEach(value => {
        if (array2.includes(value)) {
            ifCommonValue = true;
        }
    });
    return ifCommonValue;
};
exports.ifArraysHaveCommonId = ifArraysHaveCommonId;
const attachEventAsChild = (unknownMainEvent, unknownChildEvent) => {
    if (!unknownMainEvent)
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownMainEvent);
    if (!mainSpasmEvent || !(0, exports.isObjectWithValues)(mainSpasmEvent))
        return null;
    if (!unknownChildEvent)
        return mainSpasmEvent;
    const childSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownChildEvent);
    if (!childSpasmEvent || !(0, exports.isObjectWithValues)(childSpasmEvent))
        return mainSpasmEvent;
    const child = { event: childSpasmEvent };
    if (childSpasmEvent.ids &&
        (0, exports.isArrayWithValues)(childSpasmEvent.ids)) {
        child.ids = childSpasmEvent.ids;
    }
    // Create children key if it doesn't exist
    mainSpasmEvent.children ??= [];
    const mergedChildren = (0, exports.mergeChildrenV2)([
        mainSpasmEvent.children, [child]
    ]);
    if (mergedChildren) {
        mainSpasmEvent.children = mergedChildren;
    }
    if (mainSpasmEvent && (0, exports.isObjectWithValues)(mainSpasmEvent)) {
        return mainSpasmEvent;
    }
    else {
        return null;
    }
};
exports.attachEventAsChild = attachEventAsChild;
const attachEventAsRoot = (unknownMainEvent, unknownRootEvent) => {
    if (!unknownMainEvent)
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownMainEvent);
    if (!mainSpasmEvent || !(0, exports.isObjectWithValues)(mainSpasmEvent))
        return null;
    if (!unknownRootEvent)
        return mainSpasmEvent;
    const rootSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownRootEvent);
    if (!rootSpasmEvent || !(0, exports.isObjectWithValues)(rootSpasmEvent))
        return mainSpasmEvent;
    if (mainSpasmEvent.root) {
        if (!mainSpasmEvent.root.event) {
            mainSpasmEvent.root.event = rootSpasmEvent;
        }
        else if (mainSpasmEvent.root.event &&
            (0, exports.isObjectWithValues)(mainSpasmEvent.root.event)) {
            const mergedRootEvent = (0, exports.mergeSpasmEventsV2)([
                mainSpasmEvent.root.event, rootSpasmEvent
            ]);
            if (mergedRootEvent) {
                mainSpasmEvent.root.event = mergedRootEvent;
            }
        }
    }
    if (mainSpasmEvent && (0, exports.isObjectWithValues)(mainSpasmEvent)) {
        return mainSpasmEvent;
    }
    else {
        return null;
    }
};
exports.attachEventAsRoot = attachEventAsRoot;
const attachEventAsParent = (unknownMainEvent, unknownParentEvent) => {
    if (!unknownMainEvent)
        return null;
    const mainSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownMainEvent);
    if (!mainSpasmEvent || !(0, exports.isObjectWithValues)(mainSpasmEvent))
        return null;
    if (!unknownParentEvent)
        return mainSpasmEvent;
    const parentSpasmEvent = (0, exports.toBeSpasmEventV2)(unknownParentEvent);
    if (!parentSpasmEvent || !(0, exports.isObjectWithValues)(parentSpasmEvent))
        return mainSpasmEvent;
    if (mainSpasmEvent.parent) {
        if (!mainSpasmEvent.parent.event) {
            mainSpasmEvent.parent.event = parentSpasmEvent;
        }
        else if (mainSpasmEvent.parent.event &&
            (0, exports.isObjectWithValues)(mainSpasmEvent.parent.event)) {
            const mergedParentEvent = (0, exports.mergeSpasmEventsV2)([
                mainSpasmEvent.parent.event, parentSpasmEvent
            ]);
            if (mergedParentEvent) {
                mainSpasmEvent.parent.event = mergedParentEvent;
            }
        }
    }
    if (mainSpasmEvent && (0, exports.isObjectWithValues)(mainSpasmEvent)) {
        return mainSpasmEvent;
    }
    else {
        return null;
    }
};
exports.attachEventAsParent = attachEventAsParent;
//# sourceMappingURL=utils.js.map