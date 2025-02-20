"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpasmId01 = exports.getSpasmId = void 0;
const utils_js_1 = require("./../utils/utils.js");
const convertToEventForSpasmid_js_1 = require("./../convert/convertToEventForSpasmid.js");
const getSpasmId = (spasmEvent, idVersion = "01") => {
    if (idVersion === "01") {
        return (0, exports.getSpasmId01)(spasmEvent);
    }
    return null;
};
exports.getSpasmId = getSpasmId;
const getSpasmId01 = (spasmEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const eventForSpasmid = (0, convertToEventForSpasmid_js_1.convertToEventForSpasmid)(spasmEvent, "01");
    if (!eventForSpasmid)
        return null;
    const stringForId = JSON.stringify(eventForSpasmid);
    const normalizedStringForId = (0, utils_js_1.normalizeText)(stringForId);
    // const hash = getHashOfString(stringForId)
    const hash = (0, utils_js_1.getHashOfString)(normalizedStringForId);
    const spasmId = "spasmid01" + hash;
    // TODO write test for double-signed events
    return spasmId;
};
exports.getSpasmId01 = getSpasmId01;
//# sourceMappingURL=getSpasmId.js.map