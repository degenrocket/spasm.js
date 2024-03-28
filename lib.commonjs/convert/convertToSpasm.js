"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSpasm = exports.addFieldsFromEnvelopePost = exports.standardizePostWithRssItem = exports.standardizePostWithNostrSpasmEventSignedOpened = exports.standardizePostWithNostrEventSignedOpened = exports.standardizePostWithDmpEventSignedClosed = exports.standardizeNostrSpasmEventSignedOpened = exports.standardizeNostrEventSignedOpened = exports.standardizeNostrSpasmEvent = exports.standardizeNostrEvent = exports.standardizeDmpEventSignedOpened = exports.standardizeDmpEventSignedClosed = exports.standardizeDmpEvent = exports.standardizePostOrEvent = void 0;
const utils_js_1 = require("./../utils/utils.js");
const index_js_1 = require("./../utils/index.js");
const identifyEvent_js_1 = require("./../identify/identifyEvent.js");
const latestSpasmVersion = "1.0.0";
const standardizePostOrEvent = (unknownPostOrEvent, info) => {
    if (!(0, utils_js_1.isObjectWithValues)(unknownPostOrEvent))
        return null;
    // Info about post/event might be provided.
    // If not, then we should identify an event.
    if (!info) {
        info = (0, identifyEvent_js_1.identifyPostOrEvent)(unknownPostOrEvent);
    }
    if (!info || !info.webType)
        return null;
    let standardizedEvent = {};
    // DmpEvent
    // DMP event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = (0, exports.standardizeDmpEvent)(unknownPostOrEvent);
    }
    // DmpEventSignedClosed
    // DMP event with signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === false) {
        standardizedEvent = (0, exports.standardizeDmpEventSignedClosed)(unknownPostOrEvent);
    }
    // DmpEventSignedOpened
    // DMP event with signature after the signed string
    // is parsed and saved as a signed object
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = (0, exports.standardizeDmpEventSignedOpened)(unknownPostOrEvent);
    }
    // NostrEvent
    // Nostr event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = (0, exports.standardizeNostrEvent)(unknownPostOrEvent);
    }
    // NostrSpasmEvent
    // Nostr event without signature, with extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = (0, exports.standardizeNostrSpasmEvent)(unknownPostOrEvent);
    }
    // NostrEventSignedOpened
    // Nostr event with signature, without extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = (0, exports.standardizeNostrEventSignedOpened)(unknownPostOrEvent);
    }
    // NostrSpasmEventSignedOpened
    // Nostr event with signature and extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = (0, exports.standardizeNostrSpasmEventSignedOpened)(unknownPostOrEvent);
    }
    // Post with sealed DMP event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === true) {
        standardizedEvent = (0, exports.standardizePostWithDmpEventSignedClosed)(unknownPostOrEvent);
    }
    // Post with sealed Nostr event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = (0, exports.standardizePostWithNostrEventSignedOpened)(unknownPostOrEvent);
    }
    // Post with sealed Nostr Spasm event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = (0, exports.standardizePostWithNostrSpasmEventSignedOpened)(unknownPostOrEvent);
    }
    // Post with RSS item without signature
    // (received e.g. via RSS module)
    if (!info.eventInfo &&
        info.webType === "web2" &&
        info.eventIsSealed === false &&
        info.eventIsSealedUnderKeyName === false) {
        standardizedEvent = (0, exports.standardizePostWithRssItem)(unknownPostOrEvent);
        if (standardizedEvent) {
            standardizedEvent = (0, exports.addFieldsFromEnvelopePost)(unknownPostOrEvent, standardizedEvent);
        }
    }
    if (info.eventInfo &&
        info.eventIsSealed === true &&
        standardizedEvent) {
        standardizedEvent = (0, exports.addFieldsFromEnvelopePost)(unknownPostOrEvent, standardizedEvent);
    }
    return standardizedEvent;
};
exports.standardizePostOrEvent = standardizePostOrEvent;
// standardizeDmpEvent
const standardizeDmpEvent = (event) => {
    if (!(0, utils_js_1.isObjectWithValues)(event))
        return null;
    if (!(0, identifyEvent_js_1.isDmpEvent)(event))
        return null;
    const baseProtocolVersion = (0, utils_js_1.extractVersion)(event.version);
    const spasmEvent = {
        meta: {
            baseProtocol: "dmp",
            baseProtocolVersion: baseProtocolVersion,
            hasExtraSpasmFields: false,
            convertedFrom: "DmpEvent",
            license: event.license,
        },
        spasmVersion: latestSpasmVersion,
        parentEvent: event.target,
        action: event.action,
        title: event.title,
        content: event.text,
        timestamp: (0, utils_js_1.toBeTimestamp)(event.time),
        originalEventObject: event,
        originalEventString: JSON.stringify(event),
    };
    return spasmEvent;
};
exports.standardizeDmpEvent = standardizeDmpEvent;
// standardizeDmpEventSignedClosed
const standardizeDmpEventSignedClosed = (event) => {
    if (!(0, utils_js_1.isObjectWithValues)(event))
        return null;
    if (!(0, identifyEvent_js_1.isDmpEventSignedClosed)(event))
        return null;
    if (!event.signedString || !event.signature || !event.signer ||
        typeof (event.signedString) !== "string" ||
        typeof (event.signature) !== "string" ||
        typeof (event.signer) !== "string")
        return null;
    const dmpEvent = JSON.parse(event.signedString);
    const dmpEventConvertedToSpasm = (0, exports.standardizeDmpEvent)(dmpEvent);
    if (!dmpEventConvertedToSpasm)
        return null;
    const dmpEventSignedClosedConvertedToSpasm = {
        ...dmpEventConvertedToSpasm,
        meta: {
            ...dmpEventConvertedToSpasm.meta,
            privateKeyType: "ethereum",
        },
        eventId: event.signature,
        author: event.signer,
        signature: event.signature,
    };
    dmpEventSignedClosedConvertedToSpasm
        .meta.convertedFrom = "DmpEventSignedClosed";
    return dmpEventSignedClosedConvertedToSpasm;
};
exports.standardizeDmpEventSignedClosed = standardizeDmpEventSignedClosed;
// standardizeDmpEventSignedOpened
const standardizeDmpEventSignedOpened = (event) => {
    if (!(0, utils_js_1.isObjectWithValues)(event))
        return null;
    if (!(0, identifyEvent_js_1.isDmpEventSignedOpened)(event))
        return null;
    if (!event.signedString || !event.signature || !event.signer ||
        typeof (event.signedString) !== "string" ||
        typeof (event.signature) !== "string" ||
        typeof (event.signer) !== "string")
        return null;
    const dmpEventSignedClosed = {
        signedString: event.signedString,
        signature: event.signature,
        signer: event.signer
    };
    const DmpEventSignedOpenedConvertedToSpasm = (0, exports.standardizeDmpEventSignedClosed)(dmpEventSignedClosed);
    if (!DmpEventSignedOpenedConvertedToSpasm)
        return null;
    DmpEventSignedOpenedConvertedToSpasm
        .meta.convertedFrom = "DmpEventSignedOpened";
    return DmpEventSignedOpenedConvertedToSpasm;
};
exports.standardizeDmpEventSignedOpened = standardizeDmpEventSignedOpened;
// standardizeNostrEvent
const standardizeNostrEvent = (event) => {
    if (!(0, utils_js_1.isObjectWithValues)(event))
        return null;
    if (!(0, identifyEvent_js_1.isNostrEvent)(event))
        return null;
    const spasmEvent = {
        meta: {
            baseProtocol: "nostr",
            hasExtraSpasmFields: false,
            convertedFrom: "NostrEvent",
        },
        spasmVersion: latestSpasmVersion,
        eventId: event.id,
        content: event.content,
        timestamp: event.created_at,
        author: (0, index_js_1.convertHexToBech32)(event.pubkey)
    };
    let referencedEvents = [];
    if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach(function (tag) {
            if (Array.isArray(tag) && tag[0] === "e") {
                referencedEvents.push(tag[1]);
            }
        });
    }
    if (referencedEvents && referencedEvents[0]) {
        spasmEvent.referencedEvents = referencedEvents;
    }
    // TODO: write tests
    if (!spasmEvent.action && event.kind === 1) {
        // Kind 1 event without referenced events is usually "post"
        if (!event.tags || !spasmEvent.referencedEvents) {
            spasmEvent.action = "post";
            // It's usually a reply if any other event is referenced
        }
        else if (spasmEvent.referencedEvents) {
            spasmEvent.action = "reply";
        }
    }
    spasmEvent.originalEventObject = event;
    spasmEvent.originalEventString = JSON.stringify(event);
    return spasmEvent;
};
exports.standardizeNostrEvent = standardizeNostrEvent;
// standardizeNostrSpasmEvent
const standardizeNostrSpasmEvent = (event) => {
    if (!(0, utils_js_1.isObjectWithValues)(event))
        return null;
    if (!(0, identifyEvent_js_1.isNostrSpasmEvent)(event))
        return null;
    const spasmEvent = (0, exports.standardizeNostrEvent)(event);
    if (!spasmEvent)
        return null;
    let extraFieldsSpasmVersion = (0, utils_js_1.getNostrSpasmVersion)(event);
    let spasmTarget = "";
    let spasmAction = "";
    let spasmTitle = "";
    let license = "";
    if (event.tags &&
        Array.isArray(event.tags)) {
        event.tags.forEach(function (tag) {
            // if (Array.isArray(tag) && tag[0] === "spasm_version") {
            //   extraFieldsSpasmVersion = tag[1]
            // }
            if (Array.isArray(tag) && tag[0] === "spasm_target") {
                spasmTarget = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "spasm_action") {
                spasmAction = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "spasm_title") {
                spasmTitle = tag[1];
            }
            if (Array.isArray(tag) && tag[0] === "license") {
                license = tag[1];
            }
        });
    }
    // meta
    if (spasmEvent.meta) {
        spasmEvent.meta.convertedFrom = "NostrSpasmEvent";
        if (spasmTarget || spasmAction ||
            spasmTitle || extraFieldsSpasmVersion) {
            spasmEvent.meta.hasExtraSpasmFields = true;
        }
        if (extraFieldsSpasmVersion) {
            spasmEvent.meta
                .extraSpasmFieldsVersion = extraFieldsSpasmVersion;
        }
        if (license) {
            spasmEvent.meta.license = license;
        }
    }
    if (spasmTarget) {
        spasmEvent.parentEvent = spasmTarget;
    }
    if (spasmAction) {
        spasmEvent.action = spasmAction;
    }
    if (spasmTitle) {
        spasmEvent.title = spasmTitle;
    }
    return spasmEvent;
};
exports.standardizeNostrSpasmEvent = standardizeNostrSpasmEvent;
// standardizeNostrEventSignedOpened
const standardizeNostrEventSignedOpened = (event) => {
    if (!(0, utils_js_1.isObjectWithValues)(event))
        return null;
    if (!(0, identifyEvent_js_1.isNostrEventSignedOpened)(event))
        return null;
    const spasmEvent = (0, exports.standardizeNostrEvent)(event);
    if (!spasmEvent)
        return null;
    if (spasmEvent.meta) {
        spasmEvent.meta.convertedFrom = "NostrEventSignedOpened";
        spasmEvent.meta.privateKeyType = "nostr";
    }
    if (event.id && !spasmEvent.eventId) {
        spasmEvent.eventId = event.id;
    }
    if (event.pubkey && !spasmEvent.author) {
        spasmEvent.author = event.pubkey;
    }
    if (event.sig && !spasmEvent.signature) {
        spasmEvent.signature = event.sig;
    }
    return spasmEvent;
};
exports.standardizeNostrEventSignedOpened = standardizeNostrEventSignedOpened;
// standardizeNostrSpasmEventSignedOpened
const standardizeNostrSpasmEventSignedOpened = (event) => {
    if (!(0, utils_js_1.isObjectWithValues)(event))
        return null;
    if (!(0, identifyEvent_js_1.isNostrSpasmEventSignedOpened)(event))
        return null;
    const spasmEvent = (0, exports.standardizeNostrSpasmEvent)(event);
    if (!spasmEvent)
        return null;
    if (spasmEvent.meta) {
        spasmEvent.meta.convertedFrom = "NostrSpasmEventSignedOpened";
        spasmEvent.meta.privateKeyType = "nostr";
    }
    // NostrSpasm versions prior to 2.0.0 assigned sig as event id
    if (event.sig && (0, utils_js_1.getNostrSpasmVersion)(event) === "1.0.0") {
        spasmEvent.eventId = event.sig;
    }
    if (event.pubkey && !spasmEvent.author) {
        spasmEvent.author = event.pubkey;
    }
    if (event.sig && !spasmEvent.signature) {
        spasmEvent.signature = event.sig;
    }
    return spasmEvent;
};
exports.standardizeNostrSpasmEventSignedOpened = standardizeNostrSpasmEventSignedOpened;
// standardizePostWithDmpEventSignedClosed
const standardizePostWithDmpEventSignedClosed = (post) => {
    if (!(0, utils_js_1.isObjectWithValues)(post))
        return null;
    if (!('signed_message' in post) ||
        typeof (post.signed_message) !== "string") {
        return null;
    }
    const dmpEvent = {
        signedString: post.signed_message,
        signature: "",
        signer: ""
    };
    if (post.signature && typeof (post.signature) === "string") {
        dmpEvent.signature = post.signature;
    }
    if (post.signer && typeof (post.signer) === "string") {
        dmpEvent.signer = post.signer;
    }
    const spasmEvent = (0, exports.standardizeDmpEventSignedClosed)(dmpEvent);
    return spasmEvent;
};
exports.standardizePostWithDmpEventSignedClosed = standardizePostWithDmpEventSignedClosed;
// standardizePostWithNostrEventSignedOpened
const standardizePostWithNostrEventSignedOpened = (post) => {
    if (!(0, utils_js_1.isObjectWithValues)(post))
        return null;
    if (!('signed_message' in post) ||
        typeof (post.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = (0, utils_js_1.extractSealedEvent)(post);
    return (0, exports.standardizeNostrEventSignedOpened)(event);
};
exports.standardizePostWithNostrEventSignedOpened = standardizePostWithNostrEventSignedOpened;
// standardizePostWithNostrSpasmEventSignedOpened
const standardizePostWithNostrSpasmEventSignedOpened = (post) => {
    if (!(0, utils_js_1.isObjectWithValues)(post))
        return null;
    if (!('signed_message' in post) ||
        typeof (post.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = (0, utils_js_1.extractSealedEvent)(post);
    return (0, exports.standardizeNostrSpasmEventSignedOpened)(event);
};
exports.standardizePostWithNostrSpasmEventSignedOpened = standardizePostWithNostrSpasmEventSignedOpened;
// standardizePostWithRssItem
const standardizePostWithRssItem = (post) => {
    if (!(0, utils_js_1.isObjectWithValues)(post))
        return null;
    const spasmEvent = {
        meta: {
            hasExtraSpasmFields: false,
            convertedFrom: "unknown",
        },
        spasmVersion: "1.0.0",
        action: "post",
    };
    if (post.id) {
        spasmEvent.dbId = post.id;
    }
    if (post.title) {
        spasmEvent.title = post.title;
    }
    if (post.description) {
        spasmEvent.content = post.description;
    }
    if (post.source) {
        spasmEvent.source = post.source;
    }
    if (post.pubdate) {
        spasmEvent.timestamp = (0, utils_js_1.toBeTimestamp)(post.pubdate);
    }
    if (post.category) {
        spasmEvent.category = post.category;
    }
    if (post.url) {
        // Create links if it's null or undefined
        spasmEvent.links ??= {};
        spasmEvent.links.http = post.url;
        spasmEvent.eventId = post.url;
    }
    if (post.guid) {
        // Create links if it's null or undefined
        spasmEvent.links ??= {};
        spasmEvent.links.guid = post.guid;
        // eventId should be url, but if no url, then guid
        if (!spasmEvent.eventId) {
            post.guid;
        }
    }
    return spasmEvent;
};
exports.standardizePostWithRssItem = standardizePostWithRssItem;
const addFieldsFromEnvelopePost = (post, spasmEvent) => {
    if (!post)
        return {};
    if (!spasmEvent)
        return {};
    if (!(0, utils_js_1.isObjectWithValues)(post))
        return {};
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return {};
    if (post.id && !spasmEvent.dbId) {
        spasmEvent.dbId = post.id;
    }
    if (post.source && !spasmEvent.source) {
        spasmEvent.source = post.source;
    }
    if (post.added_time && !spasmEvent.dbTimestamp) {
        spasmEvent.dbTimestamp = (0, utils_js_1.toBeTimestamp)(post.added_time);
    }
    if (post.category && !spasmEvent.category) {
        spasmEvent.category = post.category;
    }
    // Reactions (e.g., upvote, downvote, etc.)
    const addReactions = (reaction) => {
        if (
        // null is a valid value
        post[reaction] === null ||
            (
            // 0 is a valid number
            post[reaction] !== undefined &&
                typeof (post[reaction]) === "number")) {
            // Create reactions if it's null or undefined
            spasmEvent.reactions ??= {};
            spasmEvent.reactions[reaction] = post[reaction];
        }
    };
    const reactions = [
        "upvote", "downvote",
        "bullish", "bearish",
        "important", "scam",
        "comments_count", "laugh",
        "toxic", "clown", "moon",
        "rocket"
    ];
    reactions.forEach(reaction => {
        addReactions(reaction);
    });
    // Comments
    if (post.children &&
        Array.isArray(post.children) &&
        post.children.length > 0) {
        // Create comments if it's null or undefined
        spasmEvent.comments ??= [];
        spasmEvent.comments.push(...post.children);
    }
    return spasmEvent;
};
exports.addFieldsFromEnvelopePost = addFieldsFromEnvelopePost;
const convertToSpasm = (unknownPostOrEvent) => {
    return (0, exports.standardizePostOrEvent)(unknownPostOrEvent);
};
exports.convertToSpasm = convertToSpasm;
//# sourceMappingURL=convertToSpasm.js.map