"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSpasmEventV2ToSpasmEventDatabaseV2 = exports.convertToSpasmEventDatabase = exports.convertManyToSpasmEventDatabase = void 0;
const convertToSpasm_js_1 = require("./convertToSpasm.js");
const utils_js_1 = require("./../utils/utils.js");
const convertManyToSpasmEventDatabase = (unknownEvents, dbVersion = "2.0.0") => {
    try {
        if (!unknownEvents)
            return null;
        if (!Array.isArray(unknownEvents))
            return null;
        if (!(0, utils_js_1.hasValue)(unknownEvents))
            return null;
        const convertedEvents = [];
        unknownEvents.forEach(event => {
            const convertedEvent = (0, exports.convertToSpasmEventDatabase)(event, dbVersion);
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
exports.convertManyToSpasmEventDatabase = convertManyToSpasmEventDatabase;
// Spasm V2
const convertToSpasmEventDatabase = (unknownEvent, dbVersion = "2.0.0") => {
    // Already SpasmEventDatabaseV2
    if ('type' in unknownEvent &&
        unknownEvent.type === "SpasmEventDatabaseV2") {
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
    if (dbVersion === "2.0.0") {
        const spasmEventDatabaseV2 = (0, exports.convertSpasmEventV2ToSpasmEventDatabaseV2)(spasmEventV2);
        return spasmEventDatabaseV2;
    }
    return null;
};
exports.convertToSpasmEventDatabase = convertToSpasmEventDatabase;
const convertSpasmEventV2ToSpasmEventDatabaseV2 = (spasmEvent) => {
    if (!(0, utils_js_1.isObjectWithValues)(spasmEvent))
        return null;
    if (spasmEvent.type !== "SpasmEventV2")
        return null;
    const spasmEventDatabase = {
        type: "SpasmEventDatabaseV2"
    };
    // if (spasmEvent.root) {
    //   spasmEventDatabase.root = spasmEvent.root
    // }
    if (spasmEvent.parent) {
        // Only 'ids' and 'marker' of a parent event are saved in db
        // to prevent saving duplicate data via recursive saving of
        // event.parent.event.parent.event.parent, etc.
        const cleanParent = (0, utils_js_1.keepTheseKeysInObject)(spasmEvent.parent, ["ids", "marker"]);
        spasmEventDatabase.parent = cleanParent;
    }
    if (spasmEvent.action) {
        spasmEventDatabase.action = spasmEvent.action;
    }
    if (spasmEvent.title) {
        spasmEventDatabase.title = spasmEvent.title;
    }
    if (spasmEvent.content) {
        spasmEventDatabase.content = spasmEvent.content;
    }
    if (spasmEvent.timestamp) {
        spasmEventDatabase.timestamp = spasmEvent.timestamp;
    }
    if (spasmEvent.authors) {
        spasmEventDatabase.authors = spasmEvent.authors;
    }
    if (spasmEvent.categories) {
        spasmEventDatabase.categories = spasmEvent.categories;
    }
    if (spasmEvent.tips) {
        spasmEventDatabase.tips = spasmEvent.tips;
    }
    if (spasmEvent.hosts) {
        spasmEventDatabase.hosts = spasmEvent.hosts;
    }
    if (spasmEvent.links) {
        spasmEventDatabase.links = spasmEvent.links;
    }
    if (spasmEvent.keywords) {
        spasmEventDatabase.keywords = spasmEvent.keywords;
    }
    if (spasmEvent.tags) {
        spasmEventDatabase.tags = spasmEvent.tags;
    }
    if (spasmEvent.medias) {
        spasmEventDatabase.medias = spasmEvent.medias;
    }
    if (spasmEvent.references) {
        const cleanReferences = (0, utils_js_1.keepTheseKeysInObjectsInArray)(spasmEvent.references, ["ids", "marker"]);
        spasmEventDatabase.references = cleanReferences;
    }
    if (spasmEvent.mentions) {
        spasmEventDatabase.mentions = spasmEvent.mentions;
    }
    if (spasmEvent.proofs) {
        spasmEventDatabase.proofs = spasmEvent.proofs;
    }
    if (spasmEvent.license) {
        spasmEventDatabase.license = spasmEvent.license;
    }
    if (spasmEvent.language) {
        spasmEventDatabase.language = spasmEvent.language;
    }
    if (spasmEvent.extra) {
        spasmEventDatabase.extra = spasmEvent.extra;
    }
    if (spasmEvent.pows) {
        spasmEventDatabase.pows = spasmEvent.pows;
    }
    if (spasmEvent.ids) {
        spasmEventDatabase.ids = spasmEvent.ids;
    }
    if (spasmEvent.signatures) {
        spasmEventDatabase.signatures = spasmEvent.signatures;
    }
    if (spasmEvent.siblings) {
        spasmEventDatabase.siblings = spasmEvent.siblings;
    }
    if (spasmEvent.source) {
        spasmEventDatabase.source = spasmEvent.source;
    }
    if (spasmEvent.sharedBy) {
        spasmEventDatabase.sharedBy = spasmEvent.sharedBy;
    }
    /**
     * SpasmEventDatabaseV2 is used for saving an event into the
     * database, so 'stats' should not be included because they
     * should be calculated separately on each instance even if
     * the instance syncs reactions with other instances (not
     * recommended).
     * Database-related data should not be included either, e.g.,
     * db.key, db.addedTimestamp, updatedTimestamp, db.table.
     */
    // if (spasmEvent.stats) {
    //   spasmEventDatabase.stats = spasmEvent.stats
    // }
    return spasmEventDatabase;
};
exports.convertSpasmEventV2ToSpasmEventDatabaseV2 = convertSpasmEventV2ToSpasmEventDatabaseV2;
//# sourceMappingURL=convertToSpasmEventDatabase.js.map