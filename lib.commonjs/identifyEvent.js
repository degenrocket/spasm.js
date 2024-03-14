"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSpasm = exports.standartizePostWithNostrSpasmEventSignedOpened = exports.standartizePostWithDmpEventSignedClosed = exports.standartizeNostrSpasmEventSignedOpened = exports.standartizeDmpEventSignedClosed = exports.standartizePostOrEvent = exports.identifyEventInsidePost = exports.isPostWithNostrEvent = exports.isPostWithNostrSpasmEvent = exports.isPostWithNostrEventSignedOpened = exports.isPostWithNostrSpasmEventSignedOpened = exports.isPostWithDmpEventSignedClosed = exports.isPostWithDmpEventSignedOpened = exports.isPostWithDmpEvent = exports.isDmpEventSignedOpened = exports.isDmpEventSignedClosed = exports.isDmpEvent = exports.isNostrSpasmEventSignedOpened = exports.isNostrSpasmEvent = exports.isNostrEventSignedOpened = exports.isNostrEvent = exports.hasExtraSpasmFields = exports.identifyPrivateKey = exports.extractSealedEvent = exports.identifyLicenseInsideTags = exports.identifyLicense = exports.hasSignature = exports.identifyEvent = exports.isWeb3Post = exports.isWeb2Post = exports.identifyPostOrEvent = void 0;
const utils_1 = require("./utils");
// web2 post example
// webType: "web2",
// eventIsSealed: false,
// eventIsSealedUnderKeyName: false,
// eventInfo: false
// web3 post example
// webType: "web3",
// eventIsSealed: true,
// eventIsSealedUnderKeyName: "signed_message",
// eventInfo: {
//   type: "DmpEventSignedClosed",
//   hasSignature: true
//   baseProtocol: "dmp",
//   privateKey: "ethereum",
//   isSpasmCompatible: true,
//   hasExtraSpasmFields: false,
// }
// web3 event example
// webType: "web3",
// eventIsSealed: false,
// eventIsSealedUnderKeyName: false,
// eventInfo: {
//   type: "NostrSpasmEventSignedOpened",
//   hasSignature: true
//   baseProtocol: "nostr",
//   privateKey: "nostr",
//   isSpasmCompatible: true,
//   hasExtraSpasmFields: true,
// }
/**
  There are usually 3 types of objects passed to this function:
  - web3 post - an object is a post with a web3 event sealed inside
  - web3 event - an object itself is a web3 event
  - web2 post - an object is a post without a web3 event (e.g. RSS)
*/
const identifyPostOrEvent = (unknownPostOrEvent) => {
    const info = {
        webType: false,
        eventIsSealed: false,
        eventIsSealedUnderKeyName: false,
        eventInfo: {
            type: false,
            hasSignature: false,
            baseProtocol: false,
            privateKey: false,
            isSpasmCompatible: false,
            hasExtraSpasmFields: false,
            license: false
        }
    };
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return info;
    let unknownEventOrWeb2Post;
    // Option 1. 
    // If an object is a post with a sealed event (signed string),
    // we need to extract the event by parsing the signed string.
    // We then check if that extracted object is a valid web3 event.
    if ((0, exports.isWeb3Post)(unknownPostOrEvent)) {
        info.webType = "web3";
        info.eventIsSealed = true;
        if ('signed_message' in unknownPostOrEvent &&
            typeof (unknownPostOrEvent.signed_message) === "string") {
            const signedObject = JSON.parse(unknownPostOrEvent.signed_message);
            info.eventIsSealedUnderKeyName = 'signed_message';
            unknownEventOrWeb2Post = signedObject;
            // Edge cases.
            // Signed DMP event sealed in the Post under the key
            // 'signed_message' doesn't have signature inside the signed
            // string, so we cannot just parse the string to extract the
            // object and then pass it into an identify function.
            // Instead, we have to attach a signer and signature to the
            // signed string, which is a type of DmpEventSignedClosed.
            if ((0, exports.isDmpEvent)(unknownEventOrWeb2Post) &&
                'signer' in unknownPostOrEvent &&
                typeof (unknownPostOrEvent.signer) === "string" &&
                'signature' in unknownPostOrEvent &&
                typeof (unknownPostOrEvent.signature) === "string") {
                // Recreating DmpEventSignedClosed
                unknownEventOrWeb2Post = {
                    signer: unknownPostOrEvent.signer,
                    signedString: unknownPostOrEvent.signed_message,
                    signature: unknownPostOrEvent.signature
                };
            }
        }
        // Option 2. 
        // If an object doesn't have a sealed event (signed string), then 
        // - either the object itself is a web3 event,
        // - or the object is a web2 post (e.g., from an RSS feed).
    }
    else {
        info.webType = false;
        info.eventIsSealed = false;
        info.eventIsSealedUnderKeyName = false;
        unknownEventOrWeb2Post = unknownPostOrEvent;
    }
    const eventInfo = (0, exports.identifyEvent)(unknownEventOrWeb2Post);
    // An object has been identified as a web3 event.
    if (eventInfo?.type && typeof (eventInfo.type) === "string") {
        // web3 post and web3 event
        info.webType = "web3";
        info.eventInfo = eventInfo;
        return info;
        // An object has not been identified as a web3 event.
    }
    else {
        // web2 post
        info.webType = "web2";
        info.eventInfo = false;
        return info;
    }
};
exports.identifyPostOrEvent = identifyPostOrEvent;
const isWeb2Post = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (
    // signatures
    'sig' in unknownPostOrEvent ||
        'signature' in unknownPostOrEvent ||
        'signed_message' in unknownPostOrEvent ||
        'signedObject' in unknownPostOrEvent ||
        'signedString' in unknownPostOrEvent) {
        return false;
    }
    if ((0, exports.isNostrEvent)(unknownPostOrEvent))
        return false;
    if ((0, exports.isDmpEvent)(unknownPostOrEvent))
        return false;
    if ((0, exports.isDmpEventSignedClosed)(unknownPostOrEvent))
        return false;
    if ((0, exports.isDmpEventSignedOpened)(unknownPostOrEvent))
        return false;
    return false;
};
exports.isWeb2Post = isWeb2Post;
const isWeb3Post = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if ('signed_message' in unknownPostOrEvent &&
        typeof (unknownPostOrEvent.signed_message) === "string") {
        return true;
    }
    return false;
};
exports.isWeb3Post = isWeb3Post;
const identifyEvent = (unknownPostOrEvent) => {
    console.log("identifyEvent called");
    const eventInfo = {
        type: "unknown",
        hasSignature: false,
        baseProtocol: false,
        privateKey: false,
        isSpasmCompatible: false,
        hasExtraSpasmFields: false,
        license: false
    };
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return eventInfo;
    eventInfo.license = (0, exports.identifyLicense)(unknownPostOrEvent);
    // TODO: refactor
    // verifySignature()
    // add key 'isSignatureValid' to EventInfo
    // check privateKey after discovering eventInfo.type
    if ((0, exports.hasSignature)(unknownPostOrEvent))
        eventInfo.hasSignature = true;
    // Another approach is to set a private key after identifying
    // the event type (eventInfo.type).
    if (eventInfo.hasSignature) {
        eventInfo.privateKey = (0, exports.identifyPrivateKey)(unknownPostOrEvent);
    }
    if ((0, exports.hasExtraSpasmFields)(unknownPostOrEvent))
        eventInfo.hasExtraSpasmFields = true;
    // DMP
    // Might be DMP or Nostr or web2 Post
    if (!eventInfo.hasSignature && !eventInfo.hasExtraSpasmFields) {
        if ((0, exports.isDmpEvent)(unknownPostOrEvent)) {
            eventInfo.type = "DmpEvent";
            eventInfo.baseProtocol = "dmp";
            eventInfo.isSpasmCompatible = true;
            return eventInfo;
        }
        // Might be DMP or Nostr with signature or Post with signature
    }
    else if (eventInfo.hasSignature && !eventInfo.hasExtraSpasmFields) {
        if ((0, exports.isDmpEventSignedOpened)(unknownPostOrEvent)) {
            eventInfo.type = "DmpEventSignedOpened";
            eventInfo.baseProtocol = "dmp";
            eventInfo.isSpasmCompatible = true;
            return eventInfo;
        }
        else if ((0, exports.isDmpEventSignedClosed)(unknownPostOrEvent)) {
            eventInfo.type = "DmpEventSignedClosed";
            eventInfo.baseProtocol = "dmp";
            eventInfo.isSpasmCompatible = true;
            return eventInfo;
        }
    }
    // Nostr
    if (eventInfo.hasSignature && eventInfo.hasExtraSpasmFields) {
        // Looks like Nostr event with signature and SPASM fields
        if ((0, exports.isNostrSpasmEventSignedOpened)(unknownPostOrEvent)) {
            eventInfo.type = "NostrSpasmEventSignedOpened";
            eventInfo.baseProtocol = "nostr";
            eventInfo.isSpasmCompatible = true;
            return eventInfo;
        }
    }
    else if (eventInfo.hasSignature && !eventInfo.hasExtraSpasmFields) {
        // Looks like Nostr event with signature without SPASM fields
        if ((0, exports.isNostrEventSignedOpened)(unknownPostOrEvent)) {
            eventInfo.type = "NostrEventSignedOpened";
            eventInfo.baseProtocol = "nostr";
            eventInfo.isSpasmCompatible = false;
            return eventInfo;
        }
    }
    else if (!eventInfo.hasSignature && eventInfo.hasExtraSpasmFields) {
        // Looks like Nostr event without signature, but with SPASM fields
        if ((0, exports.isNostrSpasmEvent)(unknownPostOrEvent)) {
            eventInfo.type = "NostrSpasmEvent";
            eventInfo.baseProtocol = "nostr";
            eventInfo.isSpasmCompatible = true;
            return eventInfo;
        }
    }
    else if (!eventInfo.hasSignature && !eventInfo.hasExtraSpasmFields) {
        // Looks like Nostr event without signature and without SPASM fields
        if ((0, exports.isNostrEvent)(unknownPostOrEvent)) {
            eventInfo.type = "NostrEvent";
            eventInfo.baseProtocol = "nostr";
            eventInfo.isSpasmCompatible = false;
            return eventInfo;
        }
    }
};
exports.identifyEvent = identifyEvent;
const hasSignature = (unknownPostOrEvent, signatureKey, signatureLength = 40) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    let keys = signatureKey
        ? [signatureKey] // signature key is provided
        : ['signature', 'sig']; // check all signature keys
    for (let key of keys) {
        if (key in unknownPostOrEvent &&
            typeof (unknownPostOrEvent[key]) === 'string' &&
            unknownPostOrEvent[key].length > signatureLength) {
            return true;
        }
    }
    return false;
};
exports.hasSignature = hasSignature;
const identifyLicense = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    let license = false;
    // Option 1.
    // A license can be inside a 'license' key
    // or inside tags (e.g. SPASM tags in Nostr events).
    if ('license' in unknownPostOrEvent &&
        typeof (unknownPostOrEvent['license']) === 'string' &&
        unknownPostOrEvent['license'].length > 0) {
        license = unknownPostOrEvent['license'];
        if (license)
            return license;
    }
    license = (0, exports.identifyLicenseInsideTags)(unknownPostOrEvent);
    if (license)
        return license;
    // Option 2.
    // If no license was found, then we should try to extract
    // an object (event) from a signed string if such a string
    // exists, and then check that object for a license.
    const signedObject = (0, exports.extractSealedEvent)(unknownPostOrEvent);
    if (!signedObject)
        return false;
    if (!(0, utils_1.isObjectWithValues)(signedObject))
        return false;
    if ('license' in signedObject &&
        typeof (signedObject['license']) === 'string' &&
        signedObject['license'].length > 0) {
        license = signedObject['license'];
        if (license)
            return license;
    }
    license = (0, exports.identifyLicenseInsideTags)(signedObject);
    if (license)
        return license;
    return false;
};
exports.identifyLicense = identifyLicense;
const identifyLicenseInsideTags = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    let license = false;
    // A license can be placed inside SPASM tags
    if ('tags' in unknownPostOrEvent &&
        Array.isArray(unknownPostOrEvent.tags)) {
        // Nostr events have tags of array type: NostrSpasmTag | AnyTag
        // Post events have tags of string type: string
        unknownPostOrEvent.tags.forEach(function (tag) {
            if (Array.isArray(tag)) {
                if (tag[0] === "license" &&
                    typeof (tag[1]) === "string") {
                    license = tag[1];
                }
            }
        });
    }
    return license;
};
exports.identifyLicenseInsideTags = identifyLicenseInsideTags;
const extractSealedEvent = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    let signedObject = false;
    if ('signed_message' in unknownPostOrEvent &&
        typeof (unknownPostOrEvent['signed_message'] === "string")) {
        signedObject = JSON.parse(unknownPostOrEvent['signed_message']);
    }
    else if ('signedString' in unknownPostOrEvent &&
        typeof (unknownPostOrEvent['signedString'] === "string")) {
        signedObject = JSON.parse(unknownPostOrEvent['signedString']);
    }
    return signedObject;
};
exports.extractSealedEvent = extractSealedEvent;
const identifyPrivateKey = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    /**
     * If an object has 'sig' key, then it's most likely a Nostr event.
     * Currently, all Nostr events can only be signed with a Nostr private
     * key, so we can assume that a private key is "nostr".
     * In the future there might be an option to sign Nostr events with
     * different keys, so we will have to update the logic.
     */
    if ('sig' in unknownPostOrEvent &&
        typeof (unknownPostOrEvent['sig']) === 'string' &&
        unknownPostOrEvent['sig'].length > 40) {
        return 'nostr';
    }
    /**
     * A post with a sealed event (hidden inside the signed string)
     * under the key like 'signed_message' or 'signedObject' will
     * usually have a signature inside a 'signature' key.
     *
     * So if an object has a 'signature' key, then it can be:
     * - a DMP event signed with the Ethereum private key,
     *   - has 'signature'
     * - a Post with a sealed DMP event signed with an Ethereum private key,
     *   - has 'signature'
     * - a Post with a sealed Nostr event signed with a Nostr private key.
     *   - has 'signature'
     *   - and also has 'sig' inside 'signed_message'
     *
     * In other words, a Post with a sealed Nostr event will have
     * the same signature recorded twice in different places:
     * 1. Inside a 'signature' key in the Post (envelope).
     * 2. Inside a 'sig' key in the object extracted from a signed string.
     * While, a Post with a sealed DMP event will only have the signature
     * specified once inside the 'signature' key.
     *
     * Thus, we have to convert the signed string into an object,
     * then check whether it has a 'sig' key (Nostr event),
     * otherwise assume that it was signed with an Ethereum private key.
     */
    if ('signature' in unknownPostOrEvent &&
        typeof (unknownPostOrEvent?.['signature']) === 'string' &&
        unknownPostOrEvent?.['signature'].length > 40) {
        if ('signed_message' in unknownPostOrEvent &&
            typeof (unknownPostOrEvent?.['signed_message']) === 'string') {
            const signedObject = JSON.parse(unknownPostOrEvent?.['signed_message']);
            if (!(0, utils_1.isObjectWithValues)(signedObject))
                return false;
            if ('sig' in unknownPostOrEvent &&
                typeof (unknownPostOrEvent['sig']) === 'string' &&
                unknownPostOrEvent['sig'].length > 40) {
                return 'nostr';
            }
            else {
                return 'ethereum';
            }
        }
        if ('signedString' in unknownPostOrEvent &&
            typeof (unknownPostOrEvent?.['signedString']) === 'string') {
            const signedObject = JSON.parse(unknownPostOrEvent?.['signedString']);
            if (!(0, utils_1.isObjectWithValues)(signedObject))
                return false;
            if ((0, exports.isDmpEvent)(signedObject))
                return 'ethereum';
        }
    }
};
exports.identifyPrivateKey = identifyPrivateKey;
const hasExtraSpasmFields = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if ('tags' in unknownPostOrEvent &&
        Array.isArray(unknownPostOrEvent.tags)) {
        // spasm_version is optional
        let hasSpasmVersion = false;
        // spasm_target is optional (e.g. new posts have no target)
        let hasSpasmTarget = false;
        // spasm_action is optional for Nostr (can be taken from 'kind' key)
        let hasSpasmAction = false;
        // spasm_title is optional (e.g. comments/reactions have no title)
        let hasSpasmTitle = false;
        // Nostr events have tags of array type: NostrSpasmTag | AnyTag
        // Post events have tags of string type: string
        unknownPostOrEvent.tags.forEach(function (tag) {
            if (Array.isArray(tag)) {
                if (tag[0] === "spasm_version") {
                    hasSpasmVersion = true;
                }
                if (tag[0] === "spasm_target") {
                    hasSpasmTarget = true;
                }
                if (tag[0] === "spasm_action") {
                    hasSpasmAction = true;
                }
                if (tag[0] === "spasm_title") {
                    hasSpasmTitle = true;
                }
            }
        });
        if (hasSpasmVersion || hasSpasmTarget || hasSpasmAction || hasSpasmTitle) {
            return true;
        }
    }
    return false;
};
exports.hasExtraSpasmFields = hasExtraSpasmFields;
const isNostrEvent = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    // Unsigned Nostr event can be without 'id'
    // if (!('id' in unknownPostOrEvent)) return false
    // content
    if (!('content' in unknownPostOrEvent))
        return false;
    if (!unknownPostOrEvent.content)
        return false;
    if (typeof (unknownPostOrEvent.content) !== "string")
        return false;
    // created_at
    if (!('created_at' in unknownPostOrEvent))
        return false;
    // 0 is a valid created_at
    if (!unknownPostOrEvent.created_at &&
        unknownPostOrEvent.created_at !== 0)
        return false;
    if (typeof (unknownPostOrEvent.created_at) !== "number")
        return false;
    // kind
    if (!('kind' in unknownPostOrEvent))
        return false;
    // 0 is a valid kind
    if (!unknownPostOrEvent.kind &&
        unknownPostOrEvent.kind !== 0)
        return false;
    if (typeof (unknownPostOrEvent.kind) !== "number")
        return false;
    // pubkey
    if (!('pubkey' in unknownPostOrEvent))
        return false;
    if (!unknownPostOrEvent.pubkey)
        return false;
    if (typeof (unknownPostOrEvent.pubkey) !== "string")
        return false;
    // tags
    // TODO: check if tags is a mandatory field
    // if (!('tags' in unknownPostOrEvent)) return false
    // sig
    // Unsigned Nostr event can be without 'sig'
    // if (!('sig' in unknownPostOrEvent)) return false
    return true;
};
exports.isNostrEvent = isNostrEvent;
const isNostrEventSignedOpened = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!(0, exports.isNostrEvent)(unknownPostOrEvent))
        return false;
    // Signed Nostr event must have 'id'
    if (!('id' in unknownPostOrEvent))
        return false;
    if (!(0, exports.hasSignature)(unknownPostOrEvent, 'sig'))
        return false;
    return true;
};
exports.isNostrEventSignedOpened = isNostrEventSignedOpened;
const isNostrSpasmEvent = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!(0, exports.isNostrEvent)(unknownPostOrEvent))
        return false;
    if (!(0, exports.hasExtraSpasmFields)(unknownPostOrEvent))
        return false;
    return true;
};
exports.isNostrSpasmEvent = isNostrSpasmEvent;
const isNostrSpasmEventSignedOpened = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!(0, exports.isNostrSpasmEvent)(unknownPostOrEvent))
        return false;
    if (!(0, exports.isNostrEventSignedOpened)(unknownPostOrEvent))
        return false;
    return true;
};
exports.isNostrSpasmEventSignedOpened = isNostrSpasmEventSignedOpened;
const isDmpEvent = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    // TODO: think what if unknownPostOrEvent is Post with version, action, license
    if (!('version' in unknownPostOrEvent))
        return false;
    if (!('action' in unknownPostOrEvent))
        return false;
    if (!('license' in unknownPostOrEvent))
        return false;
    // time is optional
    // if (!('time' in unknownPostOrEvent)) return false
    // target is optional (e.g. a new post has no target)
    // if (!('target' in unknownPostOrEvent)) return false
    // title is optional (e.g. a comment has no title)
    // if (!('title' in unknownPostOrEvent)) return false
    // text is optional (e.g. an event has only title)
    // if (!('text' in unknownPostOrEvent)) return false
    if (!unknownPostOrEvent?.version?.startsWith("dmp"))
        return false;
    return true;
};
exports.isDmpEvent = isDmpEvent;
const isDmpEventSignedClosed = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!('signedString' in unknownPostOrEvent))
        return false;
    if (!('signature' in unknownPostOrEvent))
        return false;
    // signer is optional
    // if (!('signer' in unknownPostOrEvent)) return false
    if (typeof (unknownPostOrEvent.signedString) !== "string")
        return false;
    const signedObject = JSON.parse(unknownPostOrEvent.signedString);
    if (!(0, exports.isDmpEvent)(signedObject))
        return false;
    return true;
};
exports.isDmpEventSignedClosed = isDmpEventSignedClosed;
const isDmpEventSignedOpened = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!exports.isDmpEventSignedClosed)
        return false;
    if ('signedObject' in unknownPostOrEvent) {
        if ((0, exports.isDmpEvent)(unknownPostOrEvent.signedObject))
            return true;
    }
    return false;
};
exports.isDmpEventSignedOpened = isDmpEventSignedOpened;
/**
 * 1. Post can contain DPM event without signature as a string inside
 *    signed_message, so signature is attached with 'signature' key.
 *
 *    isPostWithDmpEventSignedOpened()
 *     - contains isDmpEventSignedOpened()
 *    isPostWithDmpEventSignedClosed()
 *     - contains isDmpEventSignedClosed()
 *    isPostWithDmpEvent()
 *     - contains isDmpEvent()
 *
 * 2. Post can contain Nostr event with signature as a string inside
 *    signed_message, and signature is also attached with 'signature' key.
 *    In other words, signature will be passed twice:
 *    - inside 'sig' key of parsed 'signed_message'
 *    - inside 'signature' key of the post object.
 *
 *    isPostWithNostrSpasmEventSignedOpened()
 *     - contains isNostrSpasmEventSignedOpened()
 *    isPostWithNostrEventSignedOpened()
 *     - contains isNostrEventSignedOpened()
 *    isPostWithNostrSpasmEvent()
 *     - contains isNostrSpasmEvent()
 *    isPostWithNostrEvent
 *     - contains isNostrEvent()
 */
const isPostWithDmpEvent = (unknownPostOrEvent) => {
    return !!((0, exports.identifyEventInsidePost)(unknownPostOrEvent) === "DmpEvent");
};
exports.isPostWithDmpEvent = isPostWithDmpEvent;
const isPostWithDmpEventSignedOpened = (unknownPostOrEvent) => {
    return !!((0, exports.identifyEventInsidePost)(unknownPostOrEvent) === "DmpEventSignedOpened");
};
exports.isPostWithDmpEventSignedOpened = isPostWithDmpEventSignedOpened;
const isPostWithDmpEventSignedClosed = (unknownPostOrEvent) => {
    return !!((0, exports.identifyEventInsidePost)(unknownPostOrEvent) === "DmpEventSignedClosed");
};
exports.isPostWithDmpEventSignedClosed = isPostWithDmpEventSignedClosed;
const isPostWithNostrSpasmEventSignedOpened = (unknownPostOrEvent) => {
    return !!((0, exports.identifyEventInsidePost)(unknownPostOrEvent) === "NostrSpasmEventSignedOpened");
};
exports.isPostWithNostrSpasmEventSignedOpened = isPostWithNostrSpasmEventSignedOpened;
const isPostWithNostrEventSignedOpened = (unknownPostOrEvent) => {
    return !!((0, exports.identifyEventInsidePost)(unknownPostOrEvent) === "NostrEventSignedOpened");
};
exports.isPostWithNostrEventSignedOpened = isPostWithNostrEventSignedOpened;
const isPostWithNostrSpasmEvent = (unknownPostOrEvent) => {
    return !!((0, exports.identifyEventInsidePost)(unknownPostOrEvent) === "NostrSpasmEvent");
};
exports.isPostWithNostrSpasmEvent = isPostWithNostrSpasmEvent;
const isPostWithNostrEvent = (unknownPostOrEvent) => {
    return !!((0, exports.identifyEventInsidePost)(unknownPostOrEvent) === "NostrEvent");
};
exports.isPostWithNostrEvent = isPostWithNostrEvent;
const identifyEventInsidePost = (unknownPostOrEvent) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!('signed_message' in unknownPostOrEvent))
        return false;
    if (typeof (unknownPostOrEvent.signed_message) !== "string")
        return false;
    const signedObject = JSON.parse(unknownPostOrEvent.signed_message);
    // isNostrEvent() will return true for NostrSpasmEvent,
    // so the order of calling the functions is important.
    // Sorted by popularity/frequency.
    // TODO: Ideally, refactor and call identifyEvent(), which has
    // if statements and calls isSomething... functions in the right
    // order, depending on whether event has signature, etc.
    // DMP
    if ((0, exports.isDmpEventSignedOpened)(signedObject))
        return "DmpEventSignedOpened";
    if ((0, exports.isDmpEventSignedClosed)(signedObject))
        return "DmpEventSignedClosed";
    if ((0, exports.isDmpEvent)(signedObject))
        return "DmpEvent";
    // Nostr
    if ((0, exports.isNostrSpasmEventSignedOpened)(signedObject))
        return "NostrSpasmEventSignedOpened";
    if ((0, exports.isNostrSpasmEvent)(signedObject))
        return "NostrSpasmEvent";
    if ((0, exports.isNostrEventSignedOpened)(signedObject))
        return "NostrEventSignedOpened";
    if ((0, exports.isNostrEvent)(signedObject))
        return "NostrEvent";
};
exports.identifyEventInsidePost = identifyEventInsidePost;
const standartizePostOrEvent = (unknownPostOrEvent, info) => {
    if (!(0, utils_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    // Info about post/event might be provided.
    // If not, then we should identify an event.
    if (!info) {
        info = (0, exports.identifyPostOrEvent)(unknownPostOrEvent);
    }
    if (!info || !info.webType)
        return false;
    let standartizedEvent = {};
    // DMP event submitted via UI
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === false) {
        standartizedEvent = (0, exports.standartizeDmpEventSignedClosed)(unknownPostOrEvent);
    }
    // Nostr SPASM event submitted via UI
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === false) {
        standartizedEvent = (0, exports.standartizeNostrSpasmEventSignedOpened)(unknownPostOrEvent);
    }
    // Post with sealed DMP event (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === true) {
        standartizedEvent = (0, exports.standartizePostWithDmpEventSignedClosed)(unknownPostOrEvent);
    }
    // Post with sealed Nostr event (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === true) {
        standartizedEvent = (0, exports.standartizePostWithNostrSpasmEventSignedOpened)(unknownPostOrEvent);
    }
    return standartizedEvent;
};
exports.standartizePostOrEvent = standartizePostOrEvent;
// standardizeDmpEventSignedClosed
const standartizeDmpEventSignedClosed = (event) => {
    if (!(0, utils_1.isObjectWithValues)(event))
        return null;
    if (!(0, exports.isDmpEventSignedClosed)(event))
        return null;
    const signedString = event.signedString;
    const signedObject = JSON.parse(signedString);
    const signature = event.signature;
    const signer = event.signer;
    const target = signedObject.target;
    const action = signedObject.action;
    const title = signedObject.title;
    const text = signedObject.text;
    const signedDate = signedObject.time;
    return {
        signedString,
        signature,
        signer,
        target,
        action,
        title,
        text,
        signedDate
    };
};
exports.standartizeDmpEventSignedClosed = standartizeDmpEventSignedClosed;
// standardizeNostrSpasmEventSignedOpened
const standartizeNostrSpasmEventSignedOpened = (event) => {
    if (!(0, utils_1.isObjectWithValues)(event))
        return null;
    if (!(0, exports.isNostrSpasmEventSignedOpened)(event))
        return null;
    const signedString = JSON.stringify(event);
    // const signedObject: DmpEvent = JSON.parse(signedString)
    const signature = event.sig;
    const signer = (0, utils_1.convertHexToBech32)(event.pubkey);
    const text = event.content;
    // Convert the Unix timestamp to a JavaScript Date object
    const date = new Date(event.created_at * 1000);
    // Format the date in ISO format
    const timestamptz = date.toISOString();
    const signedDate = timestamptz;
    let target;
    let action;
    let title;
    if (event.tags &&
        Array.isArray(event.tags)) {
        event.tags.forEach(function (tag) {
            if (Array.isArray(tag) && tag[0] === "spasm_target") {
                target = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "spasm_action") {
                action = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "spasm_title") {
                title = tag[1];
            }
        });
    }
    return {
        signedString,
        signature,
        signer,
        target,
        action,
        title,
        text,
        signedDate
    };
};
exports.standartizeNostrSpasmEventSignedOpened = standartizeNostrSpasmEventSignedOpened;
// standartizePostWithDmpEventSignedClosed
const standartizePostWithDmpEventSignedClosed = (post) => {
    if (!(0, utils_1.isObjectWithValues)(post))
        return null;
    if (!('signed_message' in post) ||
        typeof (post.signed_message) !== "string") {
        return null;
    }
    const signedString = post.signed_message;
    const signedObject = JSON.parse(signedString);
    const signature = post.signature;
    const signer = post.signer;
    const target = signedObject.target;
    const action = signedObject.action;
    const title = signedObject.title;
    const text = signedObject.text;
    const signedDate = signedObject.time;
    return {
        signedString,
        signature,
        signer,
        target,
        action,
        title,
        text,
        signedDate
    };
};
exports.standartizePostWithDmpEventSignedClosed = standartizePostWithDmpEventSignedClosed;
// standardizePostWithNostrSpasmEventSignedOpened
const standartizePostWithNostrSpasmEventSignedOpened = (post) => {
    if (!(0, utils_1.isObjectWithValues)(post))
        return null;
    if (!('signed_message' in post) ||
        typeof (post.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = (0, exports.extractSealedEvent)(post);
    return (0, exports.standartizeNostrSpasmEventSignedOpened)(event);
};
exports.standartizePostWithNostrSpasmEventSignedOpened = standartizePostWithNostrSpasmEventSignedOpened;
const convertToSpasm = (unknownPostOrEvent) => {
    return (0, exports.standartizePostOrEvent)(unknownPostOrEvent);
};
exports.convertToSpasm = convertToSpasm;
//# sourceMappingURL=identifyEvent.js.map