"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortEventForSpasmid = void 0;
const utils_js_1 = require("./../utils/utils.js");
const sortEventForSpasmid = (eventForSpasmid, idVersion = "01") => {
    if (!(0, utils_js_1.isObjectWithValues)(eventForSpasmid))
        return null;
    const sortedEvent = {};
    if (idVersion === "01") {
        // console.log("idVersion:", idVersion)
    }
    return sortedEvent;
};
exports.sortEventForSpasmid = sortEventForSpasmid;
//# sourceMappingURL=sortEventForSpasmid.js.map