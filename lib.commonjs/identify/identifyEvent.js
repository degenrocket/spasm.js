"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyObject = exports.identifyEventInsidePost = exports.isPostWithNostrEvent = exports.isPostWithNostrSpasmEvent = exports.isPostWithNostrEventSignedOpened = exports.isPostWithNostrSpasmEventSignedOpened = exports.isPostWithDmpEventSignedClosed = exports.isPostWithDmpEventSignedOpened = exports.isPostWithDmpEvent = exports.isDmpEventSignedOpened = exports.isDmpEventSignedClosed = exports.isDmpEvent = exports.isNostrSpasmEventSignedOpened = exports.isNostrSpasmEvent = exports.isNostrEventSignedOpened = exports.isNostrEvent = exports.hasExtraSpasmFields = exports.identifyPrivateKey = exports.identifyLicenseInsideTags = exports.identifyLicense = exports.hasSignature = exports.identifyEvent = exports.isWeb3Post = exports.isWeb2Post = exports.identifyPostOrEvent = void 0;
const utils_js_1 = require("./../utils/utils.js");
// Post-or-Event
// │
// │   isWeb2Post()
// ├── Web2Post
// │   ├── no signature
// │   └── no signed_message
// │
// │   isWeb3Post()
// ├── Web3Post
// │   ├── signature*
// │   └── signed_message*
// │       │   
// │       │   identifyEvent()
// │       └── Event (see below)
// │
// │   identifyEvent()
// └── Event
//     │   
//     │   isDmpEvent()
//     ├── DMP event
//     │   ├── version*
//     │   ├── action*
//     │   └── license*
//     │   
//     │   isDmpEventSignedClosed()
//     ├── DMP event closed
//     │   ├── signature*
//     │   └── signedString*
//     │       └── DMP event*
//     │           ├── version*
//     │           ├── action*
//     │           └── license*
//     │ 
//     │   isDmpEventSignedOpened()
//     ├── DMP event opened
//     │   ├── signature*
//     │   ├── signedString*
//     │   └── signedObject*
//     │       └── DMP event*
//     │           ├── version*
//     │           ├── action*
//     │           └── license*
//     │
//     │   isNostrEvent()
//     ├── Nostr event
//     │   ├── id*
//     │   ├── content*
//     │   ├── created_at*
//     │   ├── kind*
//     │   └── pubkey*
//     │
//     │   isNostrEventSignedOpened()
//     ├── Nostr event signed
//     │   ├── sig*
//     │   ├── id*
//     │   ├── content*
//     │   ├── created_at*
//     │   ├── kind*
//     │   └── pubkey*
//     │
//     │   isNostrSpasmEvent()
//     ├── Nostr SPASM event
//     │   ├── id*
//     │   ├── content*
//     │   ├── created_at*
//     │   ├── kind*
//     │   ├── pubkey*
//     │   └── tags*
//     │       ├── spasm_version*
//     │       ├── spasm_target?
//     │       ├── spasm_action?
//     │       └── spasm_title?
//     │
//     │   isNostrSpasmEventSignedOpened()
//     └── Nostr SPASM event signed
//         ├── sig*
//         ├── id*
//         ├── content*
//         ├── created_at*
//         ├── kind*
//         ├── pubkey*
//         └── tags*
//             ├── spasm_version*
//             ├── spasm_target?
//             ├── spasm_action?
//             └── spasm_title?
//   
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
//   privateKeyType: "ethereum",
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
//   privateKeyType: "nostr",
//   isSpasmCompatible: true,
//   hasExtraSpasmFields: true,
// }
/**
  There are usually 3 types of objects passed to this function:
  - web3 post - an object is a post with a web3 event sealed inside
  - web3 event - an object itself is a web3 event
  - web2 post - an object is a post without a web3 event (e.g. RSS)
  Note: most of the time we mean 'envelope' when we say 'post'.
  You can check definitions to better understand the difference
  between a Post and an Event.
*/
const identifyPostOrEvent = (unknownPostOrEvent
// TODO change to UnknownEventV2 to handle SpasmV2
// unknownPostOrEvent: UnknownEventV2
) => {
    try {
        const info = {
            webType: false,
            eventIsSealed: false,
            eventIsSealedUnderKeyName: false,
            eventInfo: {
                type: false,
                hasSignature: false,
                baseProtocol: false,
                privateKeyType: false,
                isSpasmCompatible: false,
                hasExtraSpasmFields: false,
                license: false
            }
        };
        if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
            return info;
        // let unknownEventOrWeb2Post: UnknownPostOrEvent | undefined
        let unknownEventOrWeb2Post = {};
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
        if (!unknownEventOrWeb2Post)
            return info;
        const eventInfo = (0, exports.identifyEvent)(unknownEventOrWeb2Post);
        // An object has been identified as a web3 event.
        if (eventInfo?.type &&
            typeof (eventInfo.type) === "string" &&
            eventInfo?.type !== "unknown") {
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
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.identifyPostOrEvent = identifyPostOrEvent;
const isWeb2Post = (unknownPostOrEvent) => {
    if (!unknownPostOrEvent)
        return false;
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    if (!unknownPostOrEvent)
        return false;
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if ('signed_message' in unknownPostOrEvent &&
        typeof (unknownPostOrEvent.signed_message) === "string") {
        return true;
    }
    return false;
};
exports.isWeb3Post = isWeb3Post;
const identifyEvent = (unknownPostOrEvent) => {
    const eventInfo = {
        type: "unknown",
        hasSignature: false,
        baseProtocol: false,
        privateKeyType: false,
        isSpasmCompatible: false,
        hasExtraSpasmFields: false,
        license: false
    };
    if (!unknownPostOrEvent)
        return eventInfo;
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
        return eventInfo;
    eventInfo.license = (0, exports.identifyLicense)(unknownPostOrEvent);
    // TODO: refactor
    // verifySignature()
    // add key 'isSignatureValid' to EventInfo
    // check privateKeyType after discovering eventInfo.type
    if ((0, exports.hasSignature)(unknownPostOrEvent))
        eventInfo.hasSignature = true;
    // Another approach is to set a private key after identifying
    // the event type (eventInfo.type).
    if (eventInfo.hasSignature) {
        eventInfo.privateKeyType = (0, exports.identifyPrivateKey)(unknownPostOrEvent);
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
    return eventInfo;
};
exports.identifyEvent = identifyEvent;
const hasSignature = (unknownPostOrEvent, signatureKey, 
// signatureLength: number = 40
// Signature verification is done in another function
// during conversion to SpasmEvent, so disabling check
// for signature length.
signatureLength = 0) => {
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    const signedObject = (0, utils_js_1.extractSealedEvent)(unknownPostOrEvent);
    if (!signedObject)
        return false;
    if (!(0, utils_js_1.isObjectWithValues)(signedObject))
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
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
const identifyPrivateKey = (unknownPostOrEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
            if (!(0, utils_js_1.isObjectWithValues)(signedObject))
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
            if (!(0, utils_js_1.isObjectWithValues)(signedObject))
                return false;
            if ((0, exports.isDmpEvent)(signedObject))
                return 'ethereum';
        }
    }
    return false;
};
exports.identifyPrivateKey = identifyPrivateKey;
const hasExtraSpasmFields = (unknownPostOrEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    if ('type' in unknownPostOrEvent &&
        (unknownPostOrEvent.type === "SpasmEventV2" ||
            unknownPostOrEvent.type === "SpasmEventBodyV2" ||
            unknownPostOrEvent.type === "SpasmEventEnvelopeV2" ||
            unknownPostOrEvent.type === "SpasmEventEnvelopeWithTreeV2" ||
            unknownPostOrEvent.type === "SpasmEventDatabaseV2" ||
            unknownPostOrEvent.type === "SpasmEventBodySignedClosedV2")) {
        return false;
    }
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    // TODO what if we want to convert Spasm event without author
    // to Nostr event before attaching a Nostr pubkey?
    // pubkey
    if (!('pubkey' in unknownPostOrEvent))
        return false;
    if (!unknownPostOrEvent.pubkey)
        return false;
    if (typeof (unknownPostOrEvent.pubkey) !== "string")
        return false;
    // tags
    // tags is a mandatory field
    if (!('tags' in unknownPostOrEvent))
        return false;
    // sig
    // Unsigned Nostr event can be without 'sig'
    // if (!('sig' in unknownPostOrEvent)) return false
    return true;
};
exports.isNostrEvent = isNostrEvent;
const isNostrEventSignedOpened = (unknownPostOrEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!(0, exports.isNostrEvent)(unknownPostOrEvent))
        return false;
    if (!(0, exports.hasExtraSpasmFields)(unknownPostOrEvent))
        return false;
    return true;
};
exports.isNostrSpasmEvent = isNostrSpasmEvent;
const isNostrSpasmEventSignedOpened = (unknownPostOrEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!(0, exports.isNostrSpasmEvent)(unknownPostOrEvent))
        return false;
    if (!(0, exports.isNostrEventSignedOpened)(unknownPostOrEvent))
        return false;
    return true;
};
exports.isNostrSpasmEventSignedOpened = isNostrSpasmEventSignedOpened;
const isDmpEvent = (unknownPostOrEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
        return false;
    if (!('version' in unknownPostOrEvent))
        return false;
    if (!('action' in unknownPostOrEvent))
        return false;
    if (!('license' in unknownPostOrEvent))
        return false;
    if ('spasm_version' in unknownPostOrEvent)
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
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
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
    return false;
};
exports.identifyEventInsidePost = identifyEventInsidePost;
exports.identifyObject = exports.identifyPostOrEvent;
//# sourceMappingURL=identifyEvent.js.map