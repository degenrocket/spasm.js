import { isObjectWithValues, extractVersion, toBeTimestamp, extractSealedEvent, getNostrSpasmVersion } from "./../utils";
import { convertHexToBech32 } from "./../utils/index";
import { identifyPostOrEvent, isDmpEvent, isDmpEventSignedClosed, isDmpEventSignedOpened, isNostrEvent, isNostrEventSignedOpened, isNostrSpasmEvent, isNostrSpasmEventSignedOpened } from "./../identify/identifyEvent";
const latestSpasmVersion = "1.0.0";
export const standardizePostOrEvent = (unknownPostOrEvent, info) => {
    if (!isObjectWithValues(unknownPostOrEvent))
        return null;
    // Info about post/event might be provided.
    // If not, then we should identify an event.
    if (!info) {
        info = identifyPostOrEvent(unknownPostOrEvent);
    }
    if (!info || !info.webType)
        return null;
    let standardizedEvent = {};
    // DmpEvent
    // DMP event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeDmpEvent(unknownPostOrEvent);
    }
    // DmpEventSignedClosed
    // DMP event with signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeDmpEventSignedClosed(unknownPostOrEvent);
    }
    // DmpEventSignedOpened
    // DMP event with signature after the signed string
    // is parsed and saved as a signed object
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeDmpEventSignedOpened(unknownPostOrEvent);
    }
    // NostrEvent
    // Nostr event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrEvent(unknownPostOrEvent);
    }
    // NostrSpasmEvent
    // Nostr event without signature, with extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrSpasmEvent(unknownPostOrEvent);
    }
    // NostrEventSignedOpened
    // Nostr event with signature, without extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrEventSignedOpened(unknownPostOrEvent);
    }
    // NostrSpasmEventSignedOpened
    // Nostr event with signature and extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrSpasmEventSignedOpened(unknownPostOrEvent);
    }
    // Post with sealed DMP event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizePostWithDmpEventSignedClosed(unknownPostOrEvent);
    }
    // Post with sealed Nostr event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizePostWithNostrEventSignedOpened(unknownPostOrEvent);
    }
    // Post with sealed Nostr Spasm event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizePostWithNostrSpasmEventSignedOpened(unknownPostOrEvent);
    }
    // Post with RSS item without signature
    // (received e.g. via RSS module)
    if (!info.eventInfo &&
        info.webType === "web2" &&
        info.eventIsSealed === false &&
        info.eventIsSealedUnderKeyName === false) {
        standardizedEvent = standardizePostWithRssItem(unknownPostOrEvent);
        if (standardizedEvent) {
            standardizedEvent = addFieldsFromEnvelopePost(unknownPostOrEvent, standardizedEvent);
        }
    }
    if (info.eventInfo &&
        info.eventIsSealed === true &&
        standardizedEvent) {
        standardizedEvent = addFieldsFromEnvelopePost(unknownPostOrEvent, standardizedEvent);
    }
    return standardizedEvent;
};
// standardizeDmpEvent
export const standardizeDmpEvent = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isDmpEvent(event))
        return null;
    const baseProtocolVersion = extractVersion(event.version);
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
        timestamp: toBeTimestamp(event.time),
        originalEventObject: event,
        originalEventString: JSON.stringify(event),
    };
    return spasmEvent;
};
// standardizeDmpEventSignedClosed
export const standardizeDmpEventSignedClosed = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isDmpEventSignedClosed(event))
        return null;
    if (!event.signedString || !event.signature || !event.signer ||
        typeof (event.signedString) !== "string" ||
        typeof (event.signature) !== "string" ||
        typeof (event.signer) !== "string")
        return null;
    const dmpEvent = JSON.parse(event.signedString);
    const dmpEventConvertedToSpasm = standardizeDmpEvent(dmpEvent);
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
// standardizeDmpEventSignedOpened
export const standardizeDmpEventSignedOpened = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isDmpEventSignedOpened(event))
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
    const DmpEventSignedOpenedConvertedToSpasm = standardizeDmpEventSignedClosed(dmpEventSignedClosed);
    if (!DmpEventSignedOpenedConvertedToSpasm)
        return null;
    DmpEventSignedOpenedConvertedToSpasm
        .meta.convertedFrom = "DmpEventSignedOpened";
    return DmpEventSignedOpenedConvertedToSpasm;
};
// standardizeNostrEvent
export const standardizeNostrEvent = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrEvent(event))
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
        author: convertHexToBech32(event.pubkey)
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
// standardizeNostrSpasmEvent
export const standardizeNostrSpasmEvent = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrSpasmEvent(event))
        return null;
    const spasmEvent = standardizeNostrEvent(event);
    if (!spasmEvent)
        return null;
    let extraFieldsSpasmVersion = getNostrSpasmVersion(event);
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
// standardizeNostrEventSignedOpened
export const standardizeNostrEventSignedOpened = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrEventSignedOpened(event))
        return null;
    const spasmEvent = standardizeNostrEvent(event);
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
// standardizeNostrSpasmEventSignedOpened
export const standardizeNostrSpasmEventSignedOpened = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrSpasmEventSignedOpened(event))
        return null;
    const spasmEvent = standardizeNostrSpasmEvent(event);
    if (!spasmEvent)
        return null;
    if (spasmEvent.meta) {
        spasmEvent.meta.convertedFrom = "NostrSpasmEventSignedOpened";
        spasmEvent.meta.privateKeyType = "nostr";
    }
    // NostrSpasm versions prior to 2.0.0 assigned sig as event id
    if (event.sig && getNostrSpasmVersion(event) === "1.0.0") {
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
// standardizePostWithDmpEventSignedClosed
export const standardizePostWithDmpEventSignedClosed = (post) => {
    if (!isObjectWithValues(post))
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
    const spasmEvent = standardizeDmpEventSignedClosed(dmpEvent);
    return spasmEvent;
};
// standardizePostWithNostrEventSignedOpened
export const standardizePostWithNostrEventSignedOpened = (post) => {
    if (!isObjectWithValues(post))
        return null;
    if (!('signed_message' in post) ||
        typeof (post.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = extractSealedEvent(post);
    return standardizeNostrEventSignedOpened(event);
};
// standardizePostWithNostrSpasmEventSignedOpened
export const standardizePostWithNostrSpasmEventSignedOpened = (post) => {
    if (!isObjectWithValues(post))
        return null;
    if (!('signed_message' in post) ||
        typeof (post.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = extractSealedEvent(post);
    return standardizeNostrSpasmEventSignedOpened(event);
};
// standardizePostWithRssItem
export const standardizePostWithRssItem = (post) => {
    if (!isObjectWithValues(post))
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
        spasmEvent.timestamp = toBeTimestamp(post.pubdate);
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
export const addFieldsFromEnvelopePost = (post, spasmEvent) => {
    if (!post)
        return {};
    if (!spasmEvent)
        return {};
    if (!isObjectWithValues(post))
        return {};
    if (!isObjectWithValues(spasmEvent))
        return {};
    if (post.id && !spasmEvent.dbId) {
        spasmEvent.dbId = post.id;
    }
    if (post.source && !spasmEvent.source) {
        spasmEvent.source = post.source;
    }
    if (post.added_time && !spasmEvent.dbTimestamp) {
        spasmEvent.dbTimestamp = toBeTimestamp(post.added_time);
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
export const convertToSpasm = (unknownPostOrEvent) => {
    return standardizePostOrEvent(unknownPostOrEvent);
};
//# sourceMappingURL=convertToSpasm.js.map