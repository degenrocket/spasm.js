import { 
// toBeNpub,
// toBeNote,
toBeHex } from "./../utils/nostrUtils.js";
import { isObjectWithValues, extractVersion, toBeTimestamp, extractSealedEvent, getNostrSpasmVersion, createLinkObjectFromUrl, hasValue, getFormatFromId, getFormatFromAddress } from "./../utils/utils.js";
import { identifyPostOrEvent, isDmpEvent, isDmpEventSignedClosed, isDmpEventSignedOpened, isNostrEvent, isNostrEventSignedOpened, isNostrSpasmEvent, isNostrSpasmEventSignedOpened } from "./../identify/identifyEvent.js";
// const latestSpasmVersion = "2.0.0"
// Spasm V2
export const convertToSpasm = (unknownEvent, version = "2.0.0") => {
    if (version === "2.0.0") {
        return standardizeEventV2(unknownEvent, version);
    }
    return null;
};
export const standardizeEventV2 = (unknownEvent, version = "2.0.0", info) => {
    if (!isObjectWithValues(unknownEvent))
        return null;
    let standardizedEvent = {
        type: "SpasmEventV2"
    };
    // TODO convert Spasm events V2
    // SpasmEventV2, SpasmBodyV2, SpasmEnvelopeV2,
    // SpasmEnvelopeWithTreeV2, SpasmEventDatabaseV2
    if ('type' in unknownEvent &&
        typeof (unknownEvent.type) === "string") {
        if (unknownEvent.type === "SpasmEventV2") {
            // standardizedEvent =
            //   standardizeSpasmEventV2(
            //   unknownEvent
            // )
            return unknownEvent;
        }
        else if (unknownEvent.type === "SpasmEventBodyV2") {
            // standardizedEvent =
            //   standardizeSpasmEventBodyV2(
            //   unknownEvent
            // )
        }
        else if (unknownEvent.type === "SpasmEventEnvelopeV2") {
            // standardizedEvent =
            //   standardizeSpasmEventEnvelopeV2(
            //   unknownEvent
            // )
        }
        else if (unknownEvent.type === "SpasmEventEnvelopeWithTreeV2") {
            // standardizedEvent =
            //   standardizeSpasmEventEnvelopeWithTreeV2(
            //   unknownEvent
            // )
        }
        else if (unknownEvent.type === "SpasmEventDatabaseV2") {
            // standardizedEvent =
            //   standardizeSpasmEventV2(
            //   unknownEvent
            // )
        }
    }
    // If unknown event is not any of V2,
    // then proceed with SpasmEventV0 (Post)
    // and UnknownEventV1 like DpmEvent, NostrSpasmEvent, etc.
    unknownEvent = unknownEvent;
    // Info about post/event might be provided.
    // If not, then we should identify an event.
    if (!info) {
        info = identifyPostOrEvent(unknownEvent);
    }
    if (!info || !info.webType)
        return null;
    // DmpEvent
    // DMP event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEvent" &&
        info.eventIsSealed === false) {
        if (version === "2.0.0") {
            standardizedEvent = standardizeDmpEventV2(unknownEvent);
        }
    }
    // DmpEventSignedClosed
    // DMP event with signature
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === false) {
        if (version === "2.0.0") {
            standardizedEvent = standardizeDmpEventSignedClosedV2(unknownEvent);
        }
    }
    // DmpEventSignedOpened
    // DMP event with signature after the signed string
    // is parsed and saved as a signed object
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeDmpEventSignedOpenedV2(unknownEvent);
    }
    // NostrEvent
    // Nostr event without signature
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrEventV2(unknownEvent);
    }
    // NostrSpasmEvent
    // Nostr event without signature, with extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEvent" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrSpasmEventV2(unknownEvent);
    }
    // NostrEventSignedOpened
    // Nostr event with signature, without extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrEventSignedOpenedV2(unknownEvent);
    }
    // NostrSpasmEventSignedOpened
    // Nostr event with signature and extra Spasm fields
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === false) {
        standardizedEvent = standardizeNostrSpasmEventSignedOpenedV2(unknownEvent);
    }
    // SpasmEventV0 with sealed DMP event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "DmpEventSignedClosed" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizeSpasmDmpEventSignedClosedV0_V2(unknownEvent);
    }
    // SpasmEventV0 with sealed Nostr event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizeSpasmNostrEventSignedOpenedV0_V2(unknownEvent);
    }
    // SpasmEventV0 with sealed Nostr Spasm event with signature
    // (received e.g. via SPASM module)
    if (info.eventInfo &&
        info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
        info.eventIsSealed === true) {
        standardizedEvent = standardizeSpasmNostrSpasmEventSignedOpenedV0_V2(unknownEvent);
    }
    // SpasmEventV0 with RSS item without signature
    // (received e.g. via RSS module)
    if (!info.eventInfo &&
        info.webType === "web2" &&
        info.eventIsSealed === false &&
        info.eventIsSealedUnderKeyName === false) {
        standardizedEvent = standardizeSpasmWithRssItemV0_V2(unknownEvent);
        if (standardizedEvent) {
            standardizedEvent = addFieldsFromEnvelopeSpasmEventV0_V2(unknownEvent, standardizedEvent);
        }
    }
    if (info.eventInfo &&
        info.eventIsSealed === true &&
        standardizedEvent) {
        standardizedEvent = addFieldsFromEnvelopeSpasmEventV0_V2(unknownEvent, standardizedEvent);
    }
    return standardizedEvent;
};
export const standardizeDmpEventV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isDmpEvent(event))
        return null;
    const protocolVersion = extractVersion(event.version);
    const spasmEventV2 = {
        type: "SpasmEventV2",
        // action: event.action,
        // title: event.title,
        // content: event.text,
        // timestamp: toBeTimestamp(event.time),
        // license: event.license,
        siblings: [
            {
                type: "SiblingDmpV2",
                protocol: {
                    name: "dmp",
                    version: protocolVersion
                },
                signedString: JSON.stringify(event),
            }
        ]
    };
    if (event.action) {
        spasmEventV2.action = event.action;
    }
    if (event.title) {
        spasmEventV2.title = event.title;
    }
    if (event.text) {
        spasmEventV2.content = event.text;
    }
    if (event.license) {
        spasmEventV2.license = event.license;
    }
    if (event.time) {
        spasmEventV2.timestamp = toBeTimestamp(event.time);
    }
    if (event.target) {
        spasmEventV2.parent = {
            ids: [
                {
                    value: event.target,
                    // Create a new format field only if a
                    // format can be determined from a string.
                    ...(getFormatFromId(event.target)
                        ? { format: getFormatFromId(event.target) }
                        : {})
                }
            ]
        };
    }
    return spasmEventV2;
};
// standardizeDmpEventSignedClosedV2
export const standardizeDmpEventSignedClosedV2 = (event) => {
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
    const dmpEventConvertedToSpasmV2 = standardizeDmpEventV2(dmpEvent);
    if (!dmpEventConvertedToSpasmV2)
        return null;
    const dmpEventSignedClosedConvertedToSpasmV2 = {
        ...dmpEventConvertedToSpasmV2,
        authors: [
            {
                addresses: [
                    {
                        value: event.signer,
                        // Create a new format field only if a
                        // format can be determined from a string.
                        ...(getFormatFromAddress(event.signer)
                            ? { format: getFormatFromAddress(event.signer) }
                            : {})
                        // TODO add a function to verify signatures 
                        // verified: true
                    }
                ]
            }
        ],
        ids: [
            {
                value: event.signature,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromId(event.signature)
                    ? {
                        format: getFormatFromId(event.signature),
                    }
                    : {})
            },
        ],
        signatures: [
            {
                value: event.signature,
                type: "ethereum",
                pubkey: event.signer
            }
        ]
    };
    const spasmEventV2 = dmpEventSignedClosedConvertedToSpasmV2;
    if (spasmEventV2) {
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??=
            { type: "SiblingDmpSignedV2" };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingDmpSignedV2";
        spasmEventV2.siblings[0].signatures = [
            {
                value: event.signature,
                type: "ethereum",
                pubkey: event.signer
            }
        ];
        spasmEventV2.siblings[0].ids = [
            {
                value: event.signature,
                // Create a new format field only if a
                // format can be determined from a string.
                ...(getFormatFromId(event.signature)
                    ? {
                        format: getFormatFromId(event.signature),
                    }
                    : {})
            }
        ];
    }
    return spasmEventV2;
};
// standardizeDmpEventSignedOpenedV2
export const standardizeDmpEventSignedOpenedV2 = (event) => {
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
    const DmpEventSignedOpenedConvertedToSpasmV2 = standardizeDmpEventSignedClosedV2(dmpEventSignedClosed);
    if (!DmpEventSignedOpenedConvertedToSpasmV2)
        return null;
    return DmpEventSignedOpenedConvertedToSpasmV2;
};
export const standardizeNostrEventV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrEvent(event))
        return null;
    const spasmEventV2 = {
        type: "SpasmEventV2",
        // action
        content: event.content,
        timestamp: event.created_at,
        authors: [
            {
                addresses: [
                    {
                        value: toBeHex(event.pubkey),
                        format: {
                            name: "nostr-hex"
                        }
                    }
                ]
            }
        ],
        siblings: [
            {
                type: "SiblingNostrV2",
                originalObject: event,
                protocol: {
                    name: "nostr",
                    // hasExtraSpasmFields: false
                }
            }
        ]
    };
    if (event.id && typeof (event.id) === "string") {
        spasmEventV2.ids = [
            {
                value: toBeHex(event.id),
                format: {
                    name: "nostr-hex"
                }
            }
        ],
            // Create siblings if it's null or undefined
            spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??= {
            type: "SiblingNostrV2",
            protocol: {
                name: "nostr",
            }
        };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].ids = [
            {
                value: toBeHex(event.id),
                format: {
                    name: "nostr-hex"
                }
            }
        ];
    }
    let referencedEvents = [];
    if (event.tags && Array.isArray(event.tags)) {
        event.tags.forEach(function (tag) {
            // ["e", <event-id>, <relay-url>, <marker>]
            if (Array.isArray(tag) && tag[0] === "e" &&
                tag[1] && typeof (tag[1]) === 'string') {
                // <event-id>
                const referencedEvent = {
                    ids: [
                        {
                            value: tag[1],
                            // Create a new format field only if a
                            // format can be determined from a string.
                            ...(getFormatFromId(tag[1])
                                ? { format: getFormatFromId(tag[1]) }
                                : {})
                        }
                    ]
                };
                // <relay-url>
                if (tag[2] && typeof (tag[2]) === "string") {
                    referencedEvent.ids[0].hosts = [
                        { value: tag[2] }
                    ];
                }
                // <marker>
                if (tag[3] && typeof (tag[3]) === 'string') {
                    referencedEvent.marker = tag[3];
                    if (tag[3] === 'reply') {
                        spasmEventV2.action = 'reply';
                    }
                }
                referencedEvents.push(referencedEvent);
            }
        });
    }
    if (referencedEvents && referencedEvents[0]) {
        // The first reference is always assigned as a parent
        // while all other references are assigned as references.
        spasmEventV2.parent = referencedEvents[0];
        const restOfReferencedEvents = referencedEvents.slice(1);
        if (restOfReferencedEvents &&
            hasValue(restOfReferencedEvents) &&
            restOfReferencedEvents[0]) {
            // TODO write tests for multiple references
            spasmEventV2.references ??= [];
            spasmEventV2.references = restOfReferencedEvents;
        }
    }
    if (!spasmEventV2.action && event.kind === 1) {
        // Kind 1 event without referenced events is usually "post"
        if (!event.tags || !hasValue(spasmEventV2.parent)) {
            spasmEventV2.action = "post";
            // It's usually a reply if any other event is referenced
        }
        else if (hasValue(spasmEventV2.parent)) {
            spasmEventV2.action = "reply";
        }
    }
    return spasmEventV2;
};
// standardizeNostrSpasmEventV2
export const standardizeNostrSpasmEventV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrSpasmEvent(event))
        return null;
    const spasmEventV2 = standardizeNostrEventV2(event);
    if (!spasmEventV2)
        return null;
    let extraFieldsSpasmVersion = getNostrSpasmVersion(event);
    let spasmTarget = "";
    let spasmAction = null;
    let spasmTitle = null;
    let license = null;
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
    if (license) {
        spasmEventV2.license = license;
    }
    if (spasmAction) {
        spasmEventV2.action = spasmAction;
    }
    if (spasmTitle) {
        spasmEventV2.title = spasmTitle;
    }
    if (spasmTarget && typeof (spasmTarget) === "string") {
        // Create parent if it's null or undefined
        spasmEventV2.parent ??= { ids: [] };
        const parentId = {
            value: spasmTarget,
            format: getFormatFromId(spasmTarget)
        };
        spasmEventV2.parent.ids.push(parentId);
    }
    if (spasmTarget || spasmAction ||
        spasmTitle || extraFieldsSpasmVersion) {
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??=
            { type: "SiblingNostrSpasmV2" };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSpasmV2";
        spasmEventV2.siblings[0].protocol.hasExtraSpasmFields = true;
        if (extraFieldsSpasmVersion) {
            spasmEventV2.siblings[0]
                .protocol.extraSpasmFieldsVersion = extraFieldsSpasmVersion;
        }
    }
    return spasmEventV2;
};
// standardizeNostrEventSignedOpenedV2
export const standardizeNostrEventSignedOpenedV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrEventSignedOpened(event))
        return null;
    const spasmEventV2 = standardizeNostrEventV2(event);
    if (!spasmEventV2)
        return null;
    if (event.sig && typeof (event.sig) &&
        event.pubkey && typeof (event.pubkey) === "string") {
        // Create signatures if it's null or undefined
        spasmEventV2.signatures ??= [];
        spasmEventV2.signatures.push({
            value: event.sig,
            type: "nostr",
            pubkey: event.pubkey
        });
        // Create parent if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??=
            { type: "SiblingNostrSignedV2" };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSignedV2";
        spasmEventV2.siblings[0].signatures ??= [];
        spasmEventV2.siblings[0].signatures.push({
            value: event.sig,
            type: "nostr",
            pubkey: event.pubkey,
        });
    }
    return spasmEventV2;
};
// standardizeNostrSpasmEventSignedOpenedV2
export const standardizeNostrSpasmEventSignedOpenedV2 = (event) => {
    if (!isObjectWithValues(event))
        return null;
    if (!isNostrSpasmEventSignedOpened(event))
        return null;
    const spasmEventV2 = standardizeNostrSpasmEventV2(event);
    if (!spasmEventV2)
        return null;
    if (event.sig && typeof (event.sig) &&
        event.pubkey && typeof (event.pubkey) === "string") {
        // Create signatures if it's null or undefined
        spasmEventV2.signatures ??= [];
        spasmEventV2.signatures.push({
            value: event.sig,
            type: "nostr",
            pubkey: event.pubkey
        });
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??= {
            type: "SiblingNostrSpasmSignedV2",
            protocol: { name: "nostr" }
        };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSpasmSignedV2";
        spasmEventV2.siblings[0].signatures ??= [];
        spasmEventV2.siblings[0].signatures.push({
            value: event.sig,
            type: "nostr",
            pubkey: event.pubkey,
        });
    }
    // NostrSpasm versions prior to 2.0.0 assigned sig as event id
    if (event.sig && typeof (event.sig) === "string" &&
        getNostrSpasmVersion(event) === "1.0.0") {
        // Create ids if it's null or undefined
        spasmEventV2.ids ??= [];
        spasmEventV2.ids.push({
            value: event.sig,
            format: {
                name: "nostr-sig"
            }
        });
        // Create siblings if it's null or undefined
        spasmEventV2.siblings ??= [];
        spasmEventV2.siblings[0] ??= {
            type: "SiblingNostrSpasmSignedV2",
            protocol: { name: "nostr" }
        };
        spasmEventV2.siblings[0] =
            spasmEventV2.siblings[0];
        spasmEventV2.siblings[0].type = "SiblingNostrSpasmSignedV2";
        spasmEventV2.siblings[0].ids ??= [];
        spasmEventV2.siblings[0].ids.push({
            value: event.sig,
            format: {
                name: "nostr-sig"
            }
        });
    }
    return spasmEventV2;
};
// standardizeSpasmDmpEventSignedClosedV0_V2
export const standardizeSpasmDmpEventSignedClosedV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    if (!('signed_message' in spasmEventV0) ||
        typeof (spasmEventV0.signed_message) !== "string") {
        return null;
    }
    const dmpEvent = {
        signedString: spasmEventV0.signed_message,
        signature: "",
        signer: ""
    };
    if (spasmEventV0.signature &&
        typeof (spasmEventV0.signature) === "string") {
        dmpEvent.signature = spasmEventV0.signature;
    }
    if (spasmEventV0.signer &&
        typeof (spasmEventV0.signer) === "string") {
        dmpEvent.signer = spasmEventV0.signer;
    }
    const spasmEventV2 = standardizeDmpEventSignedClosedV2(dmpEvent);
    return spasmEventV2;
};
// standardizeSpasmNostrEventSignedOpenedV0_V2
export const standardizeSpasmNostrEventSignedOpenedV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    if (!('signed_message' in spasmEventV0) ||
        typeof (spasmEventV0.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = extractSealedEvent(spasmEventV0);
    return standardizeNostrEventSignedOpenedV2(event);
};
// standardizeSpasmNostrSpasmEventSignedOpenedV0_V2
export const standardizeSpasmNostrSpasmEventSignedOpenedV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    if (!('signed_message' in spasmEventV0) ||
        typeof (spasmEventV0.signed_message) !== "string") {
        return null;
    }
    // Extract the event
    const event = extractSealedEvent(spasmEventV0);
    return standardizeNostrSpasmEventSignedOpenedV2(event);
};
// standardizeSpasmWithRssItemV0_V2
export const standardizeSpasmWithRssItemV0_V2 = (spasmEventV0) => {
    if (!isObjectWithValues(spasmEventV0))
        return null;
    const spasmEventV2 = {
        type: "SpasmEventV2",
        action: "post",
    };
    if (spasmEventV0.title) {
        spasmEventV2.title = spasmEventV0.title;
    }
    if (spasmEventV0.pubdate) {
        spasmEventV2.timestamp = toBeTimestamp(spasmEventV0.pubdate);
    }
    if (spasmEventV0.description) {
        spasmEventV2.content = spasmEventV0.description;
    }
    if (spasmEventV0.tags) {
        if (Array.isArray(spasmEventV0.tags)) {
            // Create ids if it's null or undefined
            spasmEventV2.keywords ??= [];
            spasmEventV2.keywords =
                spasmEventV2.keywords?.concat(spasmEventV0.tags);
        }
    }
    if (spasmEventV0.tickers) {
        if (typeof (spasmEventV0.tickers) === "string") {
            // Create ids if it's null or undefined
            spasmEventV2.keywords ??= [];
            spasmEventV2.keywords.push(spasmEventV0.tickers);
        }
        else if (Array.isArray(spasmEventV0.tickers)) {
            spasmEventV2.keywords =
                spasmEventV2.keywords?.concat(spasmEventV0.tickers);
        }
    }
    let siblingIds = [];
    if (spasmEventV0.url &&
        typeof (spasmEventV0.url) === "string") {
        // Create ids if it's null or undefined
        spasmEventV2.ids ??= [];
        spasmEventV2.ids.push({
            value: spasmEventV0.url,
            format: {
                name: "url"
            }
        });
        siblingIds.push({
            value: spasmEventV0.url,
            format: {
                name: "url"
            }
        });
        // Create links if it's null or undefined
        spasmEventV2.links ??= [];
        const linkObject = createLinkObjectFromUrl(spasmEventV0.url);
        if (linkObject) {
            linkObject.originalProtocolKey = "url";
            spasmEventV2.links.push(linkObject);
        }
    }
    if (spasmEventV0.guid) {
        // Create ids if it's null or undefined
        spasmEventV2.ids ??= [];
        spasmEventV2.ids.push({
            value: spasmEventV0.guid,
            format: {
                name: "guid"
            }
        });
        siblingIds.push({
            value: spasmEventV0.guid,
            format: {
                name: "guid"
            }
        });
        if (typeof (spasmEventV0.guid) === "string") {
            // Create links if it's null or undefined
            spasmEventV2.links ??= [];
            const linkObject = createLinkObjectFromUrl(spasmEventV0.guid);
            if (linkObject) {
                linkObject.originalProtocolKey = "guid";
                spasmEventV2.links.push(linkObject);
            }
        }
    }
    if (spasmEventV0.author) {
        // Create ids if it's null or undefined
        spasmEventV2.authors ??= [];
        spasmEventV2.authors.push({
            usernames: [
                {
                    value: spasmEventV0.author
                }
            ]
        });
    }
    // siblings
    // Create siblings if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??= {
        type: "SiblingWeb2V2",
        protocol: { name: "web2" }
    };
    spasmEventV2.siblings[0] =
        spasmEventV2.siblings[0];
    spasmEventV2.siblings[0].type = "SiblingWeb2V2";
    spasmEventV2.siblings[0].protocol = { name: "web2" };
    // Add IDs (e.g., URL and guid) to siblings
    // spasmEventV2.siblings[0].ids ??= [];
    spasmEventV2.siblings[0].ids = siblingIds;
    // Destruct spasmEventV0 to exclude children
    // to avoid infinite recursion loop.
    const { children, ...originalObjectWithoutChildren } = spasmEventV0;
    spasmEventV2.siblings[0].originalObject =
        originalObjectWithoutChildren;
    return spasmEventV2;
};
// addFieldsFromEnvelopeSpasmEventV0_V2
export const addFieldsFromEnvelopeSpasmEventV0_V2 = (spasmEventV0, spasmEventV2) => {
    if (!spasmEventV0)
        return spasmEventV2;
    if (!spasmEventV2)
        return spasmEventV2;
    if (!isObjectWithValues(spasmEventV0))
        return spasmEventV2;
    if (!isObjectWithValues(spasmEventV2))
        return spasmEventV2;
    // db.key
    if (spasmEventV0.id) {
        if (typeof (spasmEventV0.id) === "number") {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.key = spasmEventV0.id;
        }
        else if (typeof (spasmEventV0.id) === "string" &&
            Number(spasmEventV0.id)) {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.key = Number(spasmEventV0.id);
        }
    }
    // db.addedTimestamp
    if (spasmEventV0.added_time) {
        if (typeof (spasmEventV0.added_time) === "number") {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.addedTimestamp =
                toBeTimestamp(spasmEventV0.added_time);
        }
        else if (typeof (spasmEventV0.added_time) === "string") {
            // Create db if it's null or undefined
            spasmEventV2.db ??= {};
            spasmEventV2.db.addedTimestamp =
                toBeTimestamp(spasmEventV0.added_time);
        }
    }
    if (spasmEventV0.source && !spasmEventV2.source) {
        spasmEventV2.source = {
            name: spasmEventV0.source
        };
    }
    if (spasmEventV0.category && !spasmEventV2.categories) {
        // Create categories if it's null or undefined
        spasmEventV2.categories ??= [];
        spasmEventV2.categories.push({
            name: spasmEventV0.category
        });
    }
    // Reactions (e.g., upvote, downvote, etc.)
    const addReactions = (reaction) => {
        if (
        // 0 is a valid number
        // spasmEventV0[reaction] !== undefined &&
        typeof (spasmEventV0[reaction]) === "number") {
            // Create reactions if it's null or undefined
            spasmEventV2.stats ??= [];
            spasmEventV2.stats[0] ??= { action: "react" };
            spasmEventV2.stats[0].contents ??= [];
            spasmEventV2.stats[0].contents.push({
                value: reaction,
                total: spasmEventV0[reaction]
            });
        }
    };
    const reactions = [
        "upvote", "downvote",
        "bullish", "bearish",
        "important", "scam",
        "laugh",
        "toxic", "clown", "moon",
        "rocket"
    ];
    reactions.forEach(reaction => {
        addReactions(reaction);
    });
    // "comments_count",
    if (
    // 0 is a valid number
    // spasmEventV0["comments_count"] !== undefined &&
    typeof (spasmEventV0["comments_count"]) === "number") {
        // Create reactions if it's null or undefined
        spasmEventV2.stats ??= [];
        spasmEventV2.stats.push({
            action: "reply",
            total: spasmEventV0["comments_count"]
        });
    }
    // Comments
    if (spasmEventV0.children &&
        Array.isArray(spasmEventV0.children) &&
        spasmEventV0.children.length > 0) {
        const childrenAsSpasmAndNullV2 = spasmEventV0.children.map(child => convertToSpasm(child));
        childrenAsSpasmAndNullV2.forEach((event) => {
            if (event !== null) {
                // Create children if it's null or undefined
                spasmEventV2.children ??= [];
                spasmEventV2.children.push({
                    ids: event.ids,
                    event: event
                });
            }
        });
    }
    return spasmEventV2;
};
//# sourceMappingURL=convertToSpasm.js.map