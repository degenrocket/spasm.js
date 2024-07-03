import { isObjectWithValues, getHashOfString, } from "./../utils/utils.js";
import { convertToEventForSpasmid } from "./../convert/convertToEventForSpasmid.js";
export const getSpasmId = (spasmEvent, idVersion = "01") => {
    if (idVersion === "01") {
        return getSpasmId01(spasmEvent);
    }
    return null;
};
export const getSpasmId01 = (spasmEvent) => {
    if (!isObjectWithValues(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const eventForSpasmid = convertToEventForSpasmid(spasmEvent, "01");
    if (!eventForSpasmid)
        return null;
    const stringForId = JSON.stringify(eventForSpasmid);
    const hash = getHashOfString(stringForId);
    const spasmId = "spasmid01" + hash;
    // TODO write test for double-signed events
    return spasmId;
};
//# sourceMappingURL=getSpasmId.js.map