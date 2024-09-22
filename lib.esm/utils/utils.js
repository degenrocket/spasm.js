/*
 * Using sha256 from 'js-sha256' npm package, because
 * built-in 'crypto' module works only in a server-side
 * Node.js environment, not on the client-side (browser).
 */
import { sha256 } from "js-sha256-v0";
import { ethers } from "ethers-v6";
import * as DOMPurify from "isomorphic-dompurify-v2";
import { SanitizationConfig } from "./../types/interfaces.js";
import { convertToSpasm } from "./../convert/convertToSpasm.js";
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
export const hasValue = (el) => {
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
            if (hasValue(e)) {
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
export const isObjectWithValues = (val) => {
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
export const extractVersion = (versionString) => {
    if (!versionString ||
        typeof (versionString) !== "string")
        return "";
    if (versionString.startsWith("dmp_v")) {
        return versionString.substring(5);
    }
    return "";
};
export const extractSealedEvent = (unknownPostOrEvent) => {
    if (!isObjectWithValues(unknownPostOrEvent))
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
export const toBeTimestamp = (time) => {
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
export const getNostrSpasmVersion = (event) => {
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
export const isValidUrl = (value) => {
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
export const createLinkObjectFromUrl = (url, key) => {
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
export const getFormatFromValue = (value) => {
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
        if (isValidUrl(value)) {
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
export const getFormatFromId = (id) => {
    return getFormatFromValue(id);
};
export const getFormatFromAddress = (address) => {
    return getFormatFromValue(address);
};
export const getFormatFromSignature = (address) => {
    return getFormatFromValue(address);
};
export const getHashOfString = (string, algorithm = "sha256") => {
    if (typeof (string) !== "string")
        return "";
    if (algorithm === "sha256") {
        return sha256(string);
    }
    return "";
};
// Keep only specified keys in an object.
export const keepTheseKeysInObject = (obj, keys) => {
    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
};
// Keep only specified keys in each object of an array.
export const keepTheseKeysInObjectsInArray = (array, keys) => {
    return array.map(obj => keepTheseKeysInObject(obj, keys));
};
// This function only sorts string and number values.
export const sortArrayOfStringsAndNumbers = (array) => {
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
export const sortArrayOfObjects = (objects, sortBy = ["id"]) => {
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
    const sortedInvalidValues = sortArrayOfStringsAndNumbers(invalidValues);
    // Combine sorted valid objects with invalid objects
    const result = [...sortedValidObjects, ...sortedInvalidValues];
    return result;
};
export const sortAuthorsForSpasmEventV2 = (authors) => {
    // Clean and sort addresses
    authors.forEach(author => {
        if (author && typeof (author) === "object" &&
            'addresses' in author && author.addresses &&
            Array.isArray(author.addresses) &&
            author.addresses[0]) {
            // Clean addresses to keep only  'value' and 'format' keys
            // and remove 'verified' and 'hosts' keys.
            author.addresses = keepTheseKeysInObjectsInArray(author.addresses, ["value", "format"]);
            // Sort addresses
            author.addresses = sortArrayOfObjects(author.addresses, "value");
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
            author.usernames = sortArrayOfObjects(author.usernames, "value");
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
    const sortedAuthorsWithAddress = sortArrayOfObjectsByKeyValue(authorsWithAddress, "addresses");
    const sortedAuthorsWithoutAddressWithUsername = sortArrayOfObjectsByKeyValue(authorsWithoutAddressWithUsername, "usernames");
    const sortedAuthorsWithoutAddressWithoutUsername = sortArrayOfObjects(authorsWithoutAddressWithoutUsername, ["id"]);
    const result = [
        ...sortedAuthorsWithAddress,
        ...sortedAuthorsWithoutAddressWithUsername,
        ...sortedAuthorsWithoutAddressWithoutUsername
    ];
    return result;
};
export const sortAuthorsForSpasmid01 = sortAuthorsForSpasmEventV2;
export const sortArrayOfObjectsByKeyValue = (objects, key) => {
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
export const sortHostsForSpasmEventV2 = (hosts) => {
    if (!hosts ||
        !Array.isArray(hosts) ||
        !hosts[0]) {
        return hosts;
    }
    const sortedHosts = sortArrayOfObjects(hosts, "value");
    return sortedHosts;
};
export const sortHostsForSpasmid01 = sortHostsForSpasmEventV2;
export const sortLinksForSpasmEventV2 = sortHostsForSpasmEventV2;
export const sortLinksForSpasmid01 = sortLinksForSpasmEventV2;
export const sortMediasForSpasmid01 = (medias) => {
    if (!medias || !Array.isArray(medias))
        return [];
    // Clean and sort IDs
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'ids' in media && media.ids &&
            Array.isArray(media.ids) &&
            media.ids[0]) {
            // Clean ids to keep only  'value' key
            media.ids = keepTheseKeysInObjectsInArray(media.ids, ["value"]);
            // Sort ids
            media.ids = sortArrayOfObjects(media.ids, "value");
        }
    });
    // Clean and sort hashes
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'hashes' in media && media.hashes &&
            Array.isArray(media.hashes) &&
            media.hashes[0]) {
            // Clean hashes to keep only  'value' key
            media.hashes = keepTheseKeysInObjectsInArray(media.hashes, ["value"]);
            // Sort hashes
            media.hashes = sortArrayOfObjects(media.hashes, "value");
        }
    });
    // Clean and sort links
    medias.forEach(media => {
        if (media && typeof (media) === "object" &&
            'links' in media && media.links &&
            Array.isArray(media.links) &&
            media.links[0]) {
            // Clean links to keep only  'value' key
            media.links = keepTheseKeysInObjectsInArray(media.links, ["value"]);
            // Sort links
            media.links = sortArrayOfObjects(media.links, "value");
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
    const sortedMediasWithIds = sortArrayOfObjectsByKeyValue(mediasWithIds, "ids");
    const sortedMediasWithHashes = sortArrayOfObjectsByKeyValue(mediasWithHashes, "hashes");
    const sortedMediasWithLinks = sortArrayOfObjectsByKeyValue(mediasWithLinks, "links");
    const sortedMediasOther = sortArrayOfObjects(mediasOther, ["id"]);
    const result = [
        ...sortedMediasWithIds,
        ...sortedMediasWithHashes,
        ...sortedMediasWithLinks,
        ...sortedMediasOther
    ];
    return result;
};
// Deprecated sortMediasForSpasmEventV2 because we only keep
// a 'value' key to calculate Spasm ID 01.
// export const sortMediasForSpasmid01 = sortMediasforSpasmEventV2
export const sortReferencesForSpasmid01 = (references) => {
    if (!references || !Array.isArray(references))
        return [];
    // Clean and sort IDs
    references.forEach(reference => {
        if (reference && typeof (reference) === "object" &&
            'ids' in reference && reference.ids &&
            Array.isArray(reference.ids) &&
            reference.ids[0]) {
            // Clean ids to keep only  'value' key
            reference.ids = keepTheseKeysInObjectsInArray(reference.ids, ["value"]);
            // Sort ids
            reference.ids = sortArrayOfObjects(reference.ids, "value");
        }
    });
    // Sort references based on IDs
    const sortedReferences = sortArrayOfObjectsByKeyValue(references, "ids");
    return sortedReferences;
};
export const sortParentForSpasmid01 = (parent) => {
    if (!parent || typeof (parent) !== "object")
        return parent;
    // Clean and sort IDs
    if (parent && typeof (parent) === "object" &&
        'ids' in parent && parent.ids &&
        Array.isArray(parent.ids) &&
        parent.ids[0]) {
        // Clean ids to keep only 'value' key
        parent.ids = keepTheseKeysInObjectsInArray(parent.ids, ["value"]);
        // Sort ids
        parent.ids = sortArrayOfObjects(parent.ids, "value");
    }
    return parent;
};
export const sortTagsForSpasmid01 = (tags) => {
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
export const markSpasmEventAddressAsVerified = (spasmEvent, verifiedAddress, version = "2.0.0") => {
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
export const verifyEthereumSignature = (messageString, signature, signerAddress) => {
    try {
        if (signature && typeof (signature) === 'string') {
            const recoveredAddress = ethers.verifyMessage(messageString, signature);
            return recoveredAddress.toLowerCase() ===
                signerAddress.toLowerCase();
        }
        return false;
    }
    catch (error) {
        return false;
    }
};
export const utilsStatus = () => {
    console.log("spasm.js utils status: success");
};
export const executeFunctionForAllNestedValuesOfType = (originalItem, customConfig) => {
    const defaultConfig = new SanitizationConfig();
    const config = mergeSanitizationConfigs(defaultConfig, customConfig || {});
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
                if (isObjectWithValues(value)) {
                    executeRecursive(value, depth + 1);
                }
                // 1.4. Other types
                // Do nothing
                return;
            });
        }
        // 2. Object
        if (isObjectWithValues(currentItem)) {
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
                if (isObjectWithValues(currentItem[key])) {
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
export const sanitizeEventWith = (originalItem, config) => {
    try {
        executeFunctionForAllNestedValuesOfType(originalItem, config);
    }
    catch (error) {
        console.error("Sanitization failed", error);
        if (Array.isArray(originalItem)) {
            clearArray(originalItem);
        }
        else if (isObjectWithValues(originalItem)) {
            clearObject(originalItem);
        }
    }
};
export const sanitizeStringWithDompurify = (val) => {
    if (typeof (val) === "string") {
        return DOMPurify.sanitize(val);
    }
    return val;
};
export const sanitizeEventWithDompurify = (originalItem, config) => {
    sanitizeEventWith(originalItem, config);
};
export const sanitizeEvent = sanitizeEventWithDompurify;
export const clearArray = (arr) => {
    arr.length = 0; // This clears the array
};
export const clearObject = (obj) => {
    Object.keys(obj).forEach(key => {
        delete obj[key];
    });
};
export const mergeObjects = (defaultObject, customObject, handleArrays = "overwriteArrays", depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!isObjectWithValues(defaultObject) &&
        !isObjectWithValues(customObject))
        return {};
    if (isObjectWithValues(defaultObject) &&
        !isObjectWithValues(customObject))
        return defaultObject;
    if (!isObjectWithValues(defaultObject) &&
        isObjectWithValues(customObject))
        return customObject;
    const mergedObject = { ...defaultObject };
    for (const key in customObject) {
        const value = customObject[key];
        const defaultValue = defaultObject[key];
        if (typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null) {
            // If the value is an object, recursively merge it
            mergedObject[key] = mergeObjects(defaultValue, value, handleArrays, depth + 1);
        }
        else if (Array.isArray(value) &&
            hasValue(value) &&
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
export const mergeConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = mergeObjects(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
export const mergeSanitizationConfigs = (defaultConfig, customConfig, handleArrays = "overwriteArrays") => {
    const newConfig = mergeObjects(defaultConfig, customConfig, handleArrays);
    return newConfig;
};
export const hasSignatureOfFormat = (spasmEvent, signatureFormat) => {
    if (!spasmEvent)
        return false;
    if (!isObjectWithValues(spasmEvent))
        return false;
    if (!spasmEvent.signatures)
        return false;
    if (!Array.isArray(spasmEvent.siblings))
        return false;
    let isSignatureFormatDetected = false;
    spasmEvent.signatures.forEach(signature => {
        if (isObjectWithValues(signature) &&
            signature.format &&
            isObjectWithValues(signature.format) &&
            signature.format.name &&
            typeof (signature.format.name) === "string") {
            if (signature.format.name.startsWith(signatureFormat)) {
                isSignatureFormatDetected = true;
            }
        }
    });
    return isSignatureFormatDetected;
};
export const hasSignatureEthereum = (spasmEvent) => {
    return hasSignatureOfFormat(spasmEvent, "ethereum");
};
export const hasSignatureNostr = (spasmEvent) => {
    return hasSignatureOfFormat(spasmEvent, "nostr");
};
export const hasSiblingOfProtocol = (spasmEvent, eventProtocol) => {
    if (!spasmEvent)
        return false;
    if (!isObjectWithValues(spasmEvent))
        return false;
    if (!spasmEvent.siblings)
        return false;
    if (!Array.isArray(spasmEvent.siblings))
        return false;
    let isEventProtocolDetected = false;
    spasmEvent.siblings.forEach(sibling => {
        if (isObjectWithValues(sibling) &&
            sibling.protocol &&
            isObjectWithValues(sibling.protocol) &&
            sibling.protocol.name &&
            typeof (sibling.protocol.name) === "string") {
            if (sibling.protocol.name === eventProtocol) {
                isEventProtocolDetected = true;
            }
        }
    });
    return isEventProtocolDetected;
};
export const hasSiblingSpasm = (spasmEvent) => {
    return hasSiblingOfProtocol(spasmEvent, "spasm");
};
export const hasSiblingDmp = (spasmEvent) => {
    return hasSiblingOfProtocol(spasmEvent, "dmp");
};
export const hasSiblingNostr = (spasmEvent) => {
    return hasSiblingOfProtocol(spasmEvent, "nostr");
};
export const hasSiblingWeb2 = (spasmEvent) => {
    return hasSiblingOfProtocol(spasmEvent, "web2");
};
export const getAllSigners = (unknownEvent, onlyVerifiedFlag = false, toLowerCase = true) => {
    if (!isObjectWithValues(unknownEvent))
        return [];
    const spasmEventV2 = toBeSpasmEventV2(unknownEvent);
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
export const getVerifiedSigners = (unknownEvent) => {
    return getAllSigners(unknownEvent, true, true);
};
export const getAllIdsFromArrayOfIdObjects = (arrayOfIdObjects, toLowerCase = true) => {
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
export const getAllEventIds = (unknownEvent, toLowerCase = true) => {
    if (!isObjectWithValues(unknownEvent))
        return [];
    const spasmEvent = toBeSpasmEventV2(unknownEvent);
    if (!spasmEvent ||
        !isObjectWithValues(spasmEvent) ||
        !hasValue(spasmEvent))
        return [];
    if ('ids' in spasmEvent &&
        Array.isArray(spasmEvent.ids) &&
        hasValue(spasmEvent.ids)) {
        const arrayOfIds = getAllIdsFromArrayOfIdObjects(spasmEvent.ids, toLowerCase);
        return arrayOfIds;
    }
    return [];
};
export const getAllParentIds = (unknownEvent, toLowerCase = true) => {
    if (!isObjectWithValues(unknownEvent))
        return [];
    const spasmEvent = toBeSpasmEventV2(unknownEvent);
    if (!spasmEvent ||
        !isObjectWithValues(spasmEvent) ||
        !hasValue(spasmEvent))
        return [];
    if ('parent' in spasmEvent &&
        spasmEvent.parent &&
        isObjectWithValues(spasmEvent.parent)) {
        if ('ids' in spasmEvent.parent &&
            Array.isArray(spasmEvent.parent.ids) &&
            hasValue(spasmEvent.parent.ids)) {
            const arrayOfIds = getAllIdsFromArrayOfIdObjects(spasmEvent.parent.ids, toLowerCase);
            return arrayOfIds;
        }
    }
    return [];
};
// TODO write tests
export const getAllRootIds = (unknownEvent, toLowerCase = true) => {
    if (!isObjectWithValues(unknownEvent))
        return [];
    const spasmEvent = toBeSpasmEventV2(unknownEvent);
    if (!spasmEvent ||
        !isObjectWithValues(spasmEvent) ||
        !hasValue(spasmEvent))
        return [];
    if ('root' in spasmEvent &&
        spasmEvent.root &&
        isObjectWithValues(spasmEvent.root)) {
        if ('ids' in spasmEvent.root &&
            Array.isArray(spasmEvent.root.ids) &&
            hasValue(spasmEvent.root.ids)) {
            const arrayOfIds = getAllIdsFromArrayOfIdObjects(spasmEvent.root.ids, toLowerCase);
            return arrayOfIds;
        }
    }
    return [];
};
export const getAllSignatures = (unknownEvent, toLowerCase = true) => {
    if (!isObjectWithValues(unknownEvent))
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
        spasmEventV2 = convertToSpasm(unknownEvent, customConfig);
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
export const getSignersListedIn = (unknownEvent, list) => {
    if (!isObjectWithValues(unknownEvent))
        return [];
    if (!list ||
        !Array.isArray(list) ||
        !hasValue(list))
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
        spasmEvent = convertToSpasm(unknownEvent, customConfig);
    }
    if (!spasmEvent ||
        !isObjectWithValues(spasmEvent) ||
        !hasValue(spasmEvent))
        return [];
    const allSigners = getVerifiedSigners(spasmEvent);
    if (!allSigners ||
        !hasValue(allSigners))
        return [];
    const filteredSigners = [];
    allSigners.forEach(signer => {
        if (signer && list.includes(signer)) {
            filteredSigners.push(signer);
        }
    });
    return filteredSigners;
};
export const getPubkeysListedIn = getSignersListedIn;
export const isAnySignerListedIn = (unknownEvent, list) => {
    const signersListedIn = getSignersListedIn(unknownEvent, list);
    if (signersListedIn &&
        Array.isArray(signersListedIn) &&
        hasValue(signersListedIn)) {
        return true;
    }
    return false;
};
export const isAnyPubkeyListedIn = isAnySignerListedIn;
export const areAllSignersListedIn = (unknownEvent, list) => {
    if (!isObjectWithValues(unknownEvent))
        return false;
    if (!list ||
        !Array.isArray(list) ||
        !hasValue(list))
        return false;
    const spasmEvent = toBeSpasmEventV2(unknownEvent);
    if (!spasmEvent ||
        !isObjectWithValues(spasmEvent) ||
        !hasValue(spasmEvent))
        return false;
    const allSigners = getVerifiedSigners(spasmEvent);
    if (!allSigners ||
        !hasValue(allSigners))
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
export const areAllPubkeysListedIn = areAllSignersListedIn;
export const getIdByFormat = (unknownEvent, customIdFormat) => {
    const defaultIdFormat = {
        name: "spasmid",
        version: "01"
    };
    const idFormat = customIdFormat || defaultIdFormat;
    const idFormatName = idFormat?.name
        ? idFormat?.name : "spasmid";
    const idFormatVersion = idFormat?.version
        ? idFormat?.version : "";
    const spasmEvent = toBeSpasmEventV2(unknownEvent);
    if (!spasmEvent ||
        !isObjectWithValues(spasmEvent) ||
        !hasValue(spasmEvent))
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
            !isObjectWithValues(id)) {
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
            isObjectWithValues(format)) {
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
export const extractIdByFormat = getIdByFormat;
export const extractSpasmId01 = (unknownEvent) => {
    return extractIdByFormat(unknownEvent, { name: "spasmid", version: "01" });
};
export const toBeSpasmEventV2 = (unknownEvent) => {
    if (!isObjectWithValues(unknownEvent))
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
        spasmEvent = convertToSpasm(unknownEvent, customConfig);
    }
    if (spasmEvent &&
        isObjectWithValues(spasmEvent) &&
        hasValue(spasmEvent) &&
        'type' in spasmEvent &&
        spasmEvent.type === "SpasmEventV2") {
        return spasmEvent;
    }
    return null;
};
export const extractSignerFromEthereumSignature = (signedString, signature) => {
    try {
        if (signature && typeof (signature) === 'string') {
            const recoveredAddress = ethers.verifyMessage(signedString, signature);
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
export const mergeSpasmEventsV2 = (spasmEvents, depth = 0) => {
    const maxRecursionDepth = 50;
    if (depth > maxRecursionDepth) {
        throw new Error("Maximum recursion depth exceeded");
    }
    if (!spasmEvents || !Array.isArray(spasmEvents))
        return null;
    if (!spasmEvents[0] ||
        !isObjectWithValues(spasmEvents[0]))
        return null;
    const mainSpasmEvent = toBeSpasmEventV2(spasmEvents[0]);
    if (!mainSpasmEvent)
        return null;
    const mainSpasmEventIds = getAllEventIds(mainSpasmEvent);
    const mainSpasmEventSignatures = getAllSignatures(mainSpasmEvent);
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
        const spasmEvent = toBeSpasmEventV2(spasmEventAny);
        // spasm event with index 0 is used for main spasm event
        if (index > 0 &&
            spasmEvent &&
            ifEventsHaveSameSpasmId01(mainSpasmEvent, spasmEvent)) {
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
                                        markSpasmEventAddressAsVerified(mainSpasmEvent, signature.pubkey);
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
                                                markSpasmEventAddressAsVerified(mainSpasmEvent, signature.pubkey);
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
                hasValue(spasmEvent.source)) {
                if (!("source" in mainSpasmEvent) ||
                    !mainSpasmEvent.source ||
                    !hasValue(mainSpasmEvent)) {
                    mainSpasmEvent.source = spasmEvent.source;
                }
            }
            // Add sharedBy
            if ("sharedBy" in spasmEvent &&
                spasmEvent.sharedBy &&
                hasValue(spasmEvent.sharedBy)) {
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
                hasValue(spasmEvent.parent?.event) &&
                mainSpasmEvent.parent &&
                typeof (mainSpasmEvent.parent) === "object") {
                if (!("event" in mainSpasmEvent.parent) ||
                    !mainSpasmEvent.parent.event) {
                    mainSpasmEvent.parent.event = spasmEvent.parent.event;
                }
                else if (mainSpasmEvent.parent.event &&
                    typeof (mainSpasmEvent.parent.event) === "object") {
                    const mergedEvent = mergeSpasmEventsV2([
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
                hasValue(spasmEvent.root?.event) &&
                mainSpasmEvent.root &&
                typeof (mainSpasmEvent.root) === "object") {
                if (!("event" in mainSpasmEvent.root) ||
                    !mainSpasmEvent.root.event) {
                    mainSpasmEvent.root.event = spasmEvent.root.event;
                }
                else if (mainSpasmEvent.root.event &&
                    typeof (mainSpasmEvent.root.event) === "object") {
                    const mergedEvent = mergeSpasmEventsV2([
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
                hasValue(spasmEvent.stats)) {
                if (!("stats" in mainSpasmEvent) ||
                    !mainSpasmEvent.stats ||
                    !Array.isArray(mainSpasmEvent.stats) ||
                    !hasValue(mainSpasmEvent.stats)) {
                    mainSpasmEvent.stats = spasmEvent.stats;
                }
                else if ("stats" in mainSpasmEvent &&
                    mainSpasmEvent.stats &&
                    Array.isArray(mainSpasmEvent.stats) &&
                    hasValue(mainSpasmEvent.stats)) {
                    mergeStatsV2([mainSpasmEvent.stats, spasmEvent.stats]);
                }
            }
            // Db
            if ("db" in spasmEvent &&
                spasmEvent.db &&
                hasValue(spasmEvent.db)) {
                if (!("db" in mainSpasmEvent) ||
                    !mainSpasmEvent.db ||
                    !hasValue(mainSpasmEvent.db)) {
                    mainSpasmEvent.db = spasmEvent.db;
                }
                else if ("db" in mainSpasmEvent &&
                    mainSpasmEvent.db &&
                    hasValue(mainSpasmEvent.db)) {
                    // key
                    if ((!("key" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.key ||
                        !hasValue(mainSpasmEvent.db.key)) && (("key" in spasmEvent.db) &&
                        spasmEvent.db.key &&
                        hasValue(spasmEvent.db.key))) {
                        mainSpasmEvent.db.key = spasmEvent.db.key;
                    }
                    // table
                    if ((!("table" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.table ||
                        !hasValue(mainSpasmEvent.db.table)) && (("table" in spasmEvent.db) &&
                        spasmEvent.db.table &&
                        hasValue(spasmEvent.db.table))) {
                        mainSpasmEvent.db.table = spasmEvent.db.table;
                    }
                    // addedTimestamp
                    if ((!("addedTimestamp" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.addedTimestamp ||
                        !hasValue(mainSpasmEvent.db.addedTimestamp)) && ("addedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.addedTimestamp &&
                        hasValue(spasmEvent.db.addedTimestamp) &&
                        typeof (spasmEvent.db.addedTimestamp) === "number")) {
                        mainSpasmEvent.db.addedTimestamp =
                            spasmEvent.db.addedTimestamp;
                    }
                    else if ("addedTimestamp" in mainSpasmEvent.db &&
                        mainSpasmEvent.db.addedTimestamp &&
                        hasValue(mainSpasmEvent.db.addedTimestamp) &&
                        typeof (mainSpasmEvent.db.addedTimestamp) === "number" &&
                        "addedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.addedTimestamp &&
                        hasValue(spasmEvent.db.addedTimestamp) &&
                        typeof (spasmEvent.db.addedTimestamp) === "number" &&
                        mainSpasmEvent.db.addedTimestamp < spasmEvent.db.addedTimestamp) {
                        mainSpasmEvent.db.addedTimestamp =
                            spasmEvent.db.addedTimestamp;
                    }
                    // updatedTimestamp
                    if ((!("updatedTimestamp" in mainSpasmEvent.db) ||
                        !mainSpasmEvent.db.updatedTimestamp ||
                        !hasValue(mainSpasmEvent.db.updatedTimestamp)) && ("updatedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.updatedTimestamp &&
                        hasValue(spasmEvent.db.updatedTimestamp) &&
                        typeof (spasmEvent.db.updatedTimestamp) === "number")) {
                        mainSpasmEvent.db.updatedTimestamp =
                            spasmEvent.db.updatedTimestamp;
                    }
                    else if ("updatedTimestamp" in mainSpasmEvent.db &&
                        mainSpasmEvent.db.updatedTimestamp &&
                        hasValue(mainSpasmEvent.db.updatedTimestamp) &&
                        typeof (mainSpasmEvent.db.updatedTimestamp) === "number" &&
                        "updatedTimestamp" in spasmEvent.db &&
                        spasmEvent.db.updatedTimestamp &&
                        hasValue(spasmEvent.db.updatedTimestamp) &&
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
                hasValue(spasmEvent.children)) {
                if (!("children" in mainSpasmEvent) ||
                    !mainSpasmEvent.children ||
                    !Array.isArray(mainSpasmEvent.children) ||
                    !hasValue(mainSpasmEvent.children)) {
                    mainSpasmEvent.children = spasmEvent.children;
                }
                else if ("children" in mainSpasmEvent &&
                    mainSpasmEvent.children &&
                    Array.isArray(mainSpasmEvent.children) &&
                    hasValue(mainSpasmEvent.children)) {
                    mergeChildrenV2([
                        mainSpasmEvent.children, spasmEvent.children,
                    ], depth);
                }
            }
        }
    });
    cleanSpasmEventV2(mainSpasmEvent);
    return mainSpasmEvent;
};
export const ifEventsHaveSameSpasmId01 = (event1, event2) => {
    if (!event1 || !event2)
        return false;
    if (!isObjectWithValues(event1))
        return false;
    if (!isObjectWithValues(event2))
        return false;
    const spasmEvent1 = toBeSpasmEventV2(event1);
    const spasmEvent2 = toBeSpasmEventV2(event2);
    if (!spasmEvent1 || !spasmEvent2)
        return false;
    const id1 = extractSpasmId01(spasmEvent1);
    const id2 = extractSpasmId01(spasmEvent2);
    return id1 === id2;
};
export const deepCopyOfObject = (obj) => {
    if (!obj || typeof (obj) !== "object")
        return {};
    return JSON.parse(JSON.stringify(obj));
};
export const copyOf = deepCopyOfObject;
export const cleanSpasmEventV2 = (spasmEvent) => {
    if (!spasmEvent)
        return;
    if (!isObjectWithValues(spasmEvent))
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
export const mergeStatsV2 = (allStats) => {
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
export const mergeChildrenV2 = (allChildren, depth = 0) => {
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
    if (!allChildren[0][0])
        return null;
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
                                                        hasValue(child.event)) {
                                                        // Add child.event to main if event
                                                        // doesn't exist in main child.
                                                        if (!('event' in mainChild) ||
                                                            !mainChild.event ||
                                                            typeof (mainChild.event) !== "object" ||
                                                            !hasValue(mainChild.event)) {
                                                            mainChildren[mainChildIndex].event =
                                                                child.event;
                                                            // If event already exists in main,
                                                            // then merge two events.
                                                        }
                                                        else if ('event' in mainChild &&
                                                            mainChild.event &&
                                                            typeof (mainChild.event) === "object" &&
                                                            hasValue(mainChild.event)) {
                                                            const mergedChildEvent = mergeSpasmEventsV2([
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
//# sourceMappingURL=utils.js.map