"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = exports.convertToSpasmEventEnvelopeWithTree = exports.convertManyToSpasmEventEnvelopeWithTree = void 0;
const utils_js_1 = require("../utils/utils.js");
const convertToSpasm_js_1 = require("./convertToSpasm.js");
const convertToSpasmEventEnvelope_js_1 = require("./convertToSpasmEventEnvelope.js");
const convertManyToSpasmEventEnvelopeWithTree = (unknownEvents, envelopeVersion = "2.0.0") => {
    try {
        if (!unknownEvents)
            return null;
        if (!Array.isArray(unknownEvents))
            return null;
        if (!(0, utils_js_1.hasValue)(unknownEvents))
            return null;
        const convertedEvents = [];
        unknownEvents.forEach(event => {
            const convertedEvent = (0, exports.convertToSpasmEventEnvelopeWithTree)(event, envelopeVersion);
            if (convertedEvent) {
                convertedEvents.push(convertedEvent);
            }
        });
        if (!(0, utils_js_1.hasValue)(convertedEvents))
            return null;
        return convertedEvents;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.convertManyToSpasmEventEnvelopeWithTree = convertManyToSpasmEventEnvelopeWithTree;
// Spasm V2
const convertToSpasmEventEnvelopeWithTree = (unknownEvent, envelopeVersion = "2.0.0", depth = 0, maxDepth = 50) => {
    // Maximum recursion depth to prevent stack overflow
    if (typeof (depth) !== "number" ||
        typeof (maxDepth) !== "number") {
        return null;
    }
    const maxRecursionDepth = maxDepth ?? 10;
    if (depth > maxRecursionDepth) {
        return null;
    }
    // Already SpasmEventEnvelopeV2
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventEnvelopeWithTreeV2") {
        return unknownEvent;
    }
    // SpasmEventV2
    let spasmEventV2 = null;
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
    if (!spasmEventV2)
        return null;
    if (envelopeVersion === "2.0.0") {
        const SpasmEventEnvelopeV2 = (0, exports.convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2)(spasmEventV2, envelopeVersion, depth, maxDepth);
        return SpasmEventEnvelopeV2;
    }
    return null;
};
exports.convertToSpasmEventEnvelopeWithTree = convertToSpasmEventEnvelopeWithTree;
const convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = (spasmEvent, envelopeVersion = "2.0.0", depth = 0, maxDepth = 50) => {
    // Maximum recursion depth to prevent stack overflow
    if (typeof (depth) !== "number" ||
        typeof (maxDepth) !== "number") {
        return null;
    }
    const maxRecursionDepth = maxDepth ?? 10;
    if (depth > maxRecursionDepth) {
        return null;
    }
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const spasmEventEnvelope = (0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(spasmEvent);
    if (!spasmEventEnvelope)
        return null;
    const spasmEventEnvelopeWithTree = {
        ...spasmEventEnvelope,
        type: "SpasmEventEnvelopeWithTreeV2"
    };
    if ("parent" in spasmEvent &&
        spasmEvent.parent &&
        (0, utils_js_1.hasValue)(spasmEvent.parent) &&
        "event" in spasmEvent.parent &&
        spasmEvent.parent.event &&
        (0, utils_js_1.hasValue)(spasmEvent.parent.event) &&
        typeof (spasmEvent.parent.event) === "object") {
        const parentEventAsSpasmEnvelopeWithTree = (0, exports.convertToSpasmEventEnvelopeWithTree)(spasmEvent.parent.event, envelopeVersion, depth + 1, maxDepth);
        if (parentEventAsSpasmEnvelopeWithTree) {
            spasmEventEnvelopeWithTree.parent = {
                ...spasmEvent.parent,
                event: parentEventAsSpasmEnvelopeWithTree
            };
        }
    }
    if ("root" in spasmEvent &&
        spasmEvent.root &&
        (0, utils_js_1.hasValue)(spasmEvent.root) &&
        "event" in spasmEvent.root &&
        spasmEvent.root.event &&
        (0, utils_js_1.hasValue)(spasmEvent.root.event) &&
        typeof (spasmEvent.root.event) === "object") {
        const rootEventAsSpasmEnvelopeWithTree = (0, exports.convertToSpasmEventEnvelopeWithTree)(spasmEvent.root.event, envelopeVersion, depth + 1, maxDepth);
        if (rootEventAsSpasmEnvelopeWithTree) {
            spasmEventEnvelopeWithTree.root = {
                ...spasmEvent.root,
                event: rootEventAsSpasmEnvelopeWithTree
            };
        }
    }
    if ("children" in spasmEvent &&
        spasmEvent.children &&
        Array.isArray(spasmEvent.children)) {
        const originalChildren = spasmEvent.children;
        const convertedChildren = [];
        originalChildren.forEach((originalChild) => {
            if (originalChild.event &&
                (0, utils_js_1.isObjectWithValues)(originalChild.event)) {
                const convertedChildEvent = (0, exports.convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2)(originalChild.event, envelopeVersion, depth + 1, maxDepth);
                if (convertedChildEvent &&
                    (0, utils_js_1.isObjectWithValues)(convertedChildEvent)) {
                    convertedChildren.push({
                        ...originalChild,
                        event: convertedChildEvent
                    });
                }
            }
        });
        if ((0, utils_js_1.isArrayWithValues)(convertedChildren)) {
            spasmEventEnvelopeWithTree.children = convertedChildren;
        }
    }
    return spasmEventEnvelopeWithTree;
};
exports.convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2;
//# sourceMappingURL=convertToSpasmEventEnvelopeWithTree.js.map