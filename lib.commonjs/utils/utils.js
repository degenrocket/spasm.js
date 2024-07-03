"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsStatus = exports.verifyEthereumSignature = exports.markSpasmEventAddressAsVerified = exports.sortTagsForSpasmid01 = exports.sortParentForSpasmid01 = exports.sortReferencesForSpasmid01 = exports.sortMediasForSpasmid01 = exports.sortLinksForSpasmid01 = exports.sortLinksForSpasmEventV2 = exports.sortHostsForSpasmid01 = exports.sortHostsForSpasmEventV2 = exports.sortArrayOfObjectsByKeyValue = exports.sortAuthorsForSpasmid01 = exports.sortAuthorsForSpasmEventV2 = exports.sortArrayOfObjects = exports.sortArrayOfStringsAndNumbers = exports.keepTheseKeysInObjectsInArray = exports.keepTheseKeysInObject = exports.getHashOfString = exports.getFormatFromSignature = exports.getFormatFromAddress = exports.getFormatFromId = exports.getFormatFromValue = exports.createLinkObjectFromUrl = exports.isValidUrl = exports.getNostrSpasmVersion = exports.toBeTimestamp = exports.extractSealedEvent = exports.extractVersion = exports.isObjectWithValues = exports.hasValue = void 0;
/*
 * Using sha256 from 'js-sha256' npm package, because
 * built-in 'crypto' module works only in a server-side
 * Node.js environment, not on the client-side (browser).
 */
const js_sha256_v0_1 = require("js-sha256-v0");
const ethers_v6_1 = require("ethers-v6");
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
        console.log('Invalid URL:', url);
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
// var sha256pure = function sha256(ascii) {
//     function rightRotate(value, amount) {
//         return (value>>>amount) | (value<<(32 - amount));
//     };
//
//     var mathPow = Math.pow;
//     var maxWord = mathPow(2, 32);
//     var lengthProperty = 'length'
//     var i, j; // Used as a counter across the whole file
//     var result = ''
//
//     var words = [];
//     var asciiBitLength = ascii[lengthProperty]*8;
//
//     /[> caching results is optional - remove/add slash from front of this line to toggle
//     // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
//     // (we actually calculate the first 64, but extra values are just ignored)
//     var hash = sha256.h = sha256.h || [];
//     // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
//     var k = sha256.k = sha256.k || [];
//     var primeCounter = k[lengthProperty];
//     [>/
//     var hash = [], k = [];
//     var primeCounter = 0;
//     /[>/
//
//     var isComposite = {};
//     for (var candidate = 2; primeCounter < 64; candidate++) {
//         if (!isComposite[candidate]) {
//             for (i = 0; i < 313; i += candidate) {
//                 isComposite[i] = candidate;
//             }
//             hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
//             k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
//         }
//     }
//
//     ascii += '\x80' // Append Ƈ' bit (plus zero padding)
//     while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
//     for (i = 0; i < ascii[lengthProperty]; i++) {
//         j = ascii.charCodeAt(i);
//         if (j>>8) return; // ASCII check: only accept characters in range 0-255
//         words[i>>2] |= j << ((3 - i)%4)*8;
//     }
//     words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
//     words[words[lengthProperty]] = (asciiBitLength)
//
//     // process each chunk
//     for (j = 0; j < words[lengthProperty];) {
//         var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
//         var oldHash = hash;
//         // This is now the undefinedworking hash", often labelled as variables a...g
//         // (we have to truncate as well, otherwise extra entries at the end accumulate
//         hash = hash.slice(0, 8);
//
//         for (i = 0; i < 64; i++) {
//             // Typescript error: i2 value is never read
//             var i2 = i + j;
//             // Expand the message into 64 words
//             // Used below if
//             var w15 = w[i - 15], w2 = w[i - 2];
//
//             // Iterate
//             var a = hash[0], e = hash[4];
//             var temp1 = hash[7]
//                 + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
//                 + ((e&hash[5])^((~e)&hash[6])) // ch
//                 + k[i]
//                 // Expand the message schedule if needed
//                 + (w[i] = (i < 16) ? w[i] : (
//                         w[i - 16]
//                         + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
//                         + w[i - 7]
//                         + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
//                     )|0
//                 );
//             // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
//             var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
//                 + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
//
//             hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
//             hash[4] = (hash[4] + temp1)|0;
//         }
//
//         for (i = 0; i < 8; i++) {
//             hash[i] = (hash[i] + oldHash[i])|0;
//         }
//     }
//
//     for (i = 0; i < 8; i++) {
//         for (j = 3; j + 1; j--) {
//             var b = (hash[i]>>(j*8))&255;
//             result += ((b < 16) ? 0 : '') + b.toString(16);
//         }
//     }
//     return result;
// };
//# sourceMappingURL=utils.js.map