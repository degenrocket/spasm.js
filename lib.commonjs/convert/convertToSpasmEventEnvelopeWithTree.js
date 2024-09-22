"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = exports.convertToSpasmEventEnvelopeWithTree = void 0;
const utils_js_1 = require("../utils/utils.js");
const convertToSpasm_js_1 = require("./convertToSpasm.js");
const convertToSpasmEventEnvelope_1 = require("./convertToSpasmEventEnvelope");
// Spasm V2
const convertToSpasmEventEnvelopeWithTree = (unknownEvent, envelopeVersion = "2.0.0") => {
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
        const SpasmEventEnvelopeV2 = (0, exports.convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2)(spasmEventV2);
        return SpasmEventEnvelopeV2;
    }
    return null;
};
exports.convertToSpasmEventEnvelopeWithTree = convertToSpasmEventEnvelopeWithTree;
// TODO add recursion maxDepth
const convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = (spasmEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const spasmEventEnvelope = (0, convertToSpasmEventEnvelope_1.convertToSpasmEventEnvelope)(spasmEvent);
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
        const parentEventAsSpasmEnvelopeWithTree = (0, exports.convertToSpasmEventEnvelopeWithTree)(spasmEvent.parent.event);
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
        const rootEventAsSpasmEnvelopeWithTree = (0, exports.convertToSpasmEventEnvelopeWithTree)(spasmEvent.root.event);
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
        spasmEventEnvelopeWithTree.children = spasmEvent.children;
    }
    return spasmEventEnvelopeWithTree;
};
exports.convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2;
//# sourceMappingURL=convertToSpasmEventEnvelopeWithTree.js.map