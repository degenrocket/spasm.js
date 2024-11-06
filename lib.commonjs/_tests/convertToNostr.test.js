"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../utils/utils.js");
const convertToSpasm_js_1 = require("../convert/convertToSpasm.js");
const convertToNostr_js_1 = require("../convert/convertToNostr.js");
const _events_data_js_1 = require("./_events-data.js");
describe("convertToNostr() different tests", () => {
    test("convertToNostr() for single-signer unsigned post event", () => {
        const spasmBodyNostrSigner = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2WithOneNostrSigner);
        const spasmBodyNostrSignerConvertedToNostr = (0, convertToNostr_js_1.convertToNostr)(spasmBodyNostrSigner);
        const spasmBodyNostrSignerConvertedToSpasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)(spasmBodyNostrSigner);
        const spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)(spasmBodyNostrSignerConvertedToNostr);
        const merged = (0, utils_js_1.mergeSpasmEventsV2)([
            (0, utils_js_1.copyOf)(spasmBodyNostrSignerConvertedToSpasmEventV2),
            (0, utils_js_1.copyOf)(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2)
        ]);
        const mergedWithDifferent = (0, utils_js_1.mergeSpasmEventsV2)([
            (0, utils_js_1.copyOf)(spasmBodyNostrSignerConvertedToSpasmEventV2),
            (0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent)
        ]);
        expect(spasmBodyNostrSignerConvertedToNostr).toStrictEqual((0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2));
        const id1 = (0, utils_js_1.extractSpasmId01)(spasmBodyNostrSignerConvertedToSpasmEventV2);
        const id2 = (0, utils_js_1.extractSpasmId01)(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2);
        const idMerged = (0, utils_js_1.extractSpasmId01)(merged);
        const idDifferent = (0, utils_js_1.extractSpasmId01)((0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent));
        expect(id1).toStrictEqual(id2);
        expect(id1).toStrictEqual(idMerged);
        expect(id1).not.toEqual(idDifferent);
        expect(merged?.siblings?.length).toStrictEqual(2);
        expect(merged?.siblings?.[0].type)
            .toStrictEqual("SiblingSpasmV2");
        expect(merged?.siblings?.[1].type)
            .toStrictEqual("SiblingNostrSpasmV2");
        expect(mergedWithDifferent?.siblings?.length).toStrictEqual(1);
    });
    test("convertToNostr() for single-signer unsigned reply event", () => {
        const spasmBodyNostrSigner = (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2ReplyWithTwoSigners);
        const spasmBodyNostrSignerConvertedToNostr = (0, convertToNostr_js_1.convertToNostr)(spasmBodyNostrSigner);
        const spasmBodyNostrSignerConvertedToSpasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)(spasmBodyNostrSigner);
        const spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2 = (0, convertToSpasm_js_1.convertToSpasm)(spasmBodyNostrSignerConvertedToNostr);
        const merged = (0, utils_js_1.mergeSpasmEventsV2)([
            (0, utils_js_1.copyOf)(spasmBodyNostrSignerConvertedToSpasmEventV2),
            (0, utils_js_1.copyOf)(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2)
        ]);
        const mergedWithDifferent = (0, utils_js_1.mergeSpasmEventsV2)([
            (0, utils_js_1.copyOf)(spasmBodyNostrSignerConvertedToSpasmEventV2),
            (0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent)
        ]);
        expect(spasmBodyNostrSignerConvertedToNostr).toStrictEqual((0, utils_js_1.copyOf)(_events_data_js_1.validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2));
        const id1 = (0, utils_js_1.extractSpasmId01)(spasmBodyNostrSignerConvertedToSpasmEventV2);
        const id2 = (0, utils_js_1.extractSpasmId01)(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2);
        const idMerged = (0, utils_js_1.extractSpasmId01)(merged);
        const idDifferent = (0, utils_js_1.extractSpasmId01)((0, utils_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent));
        expect(id1).toStrictEqual(id2);
        expect(id1).toStrictEqual(idMerged);
        expect(id1).not.toEqual(idDifferent);
        expect(merged?.siblings?.length).toStrictEqual(2);
        expect(merged?.siblings?.[0].type)
            .toStrictEqual("SiblingSpasmV2");
        expect(merged?.siblings?.[1].type)
            .toStrictEqual("SiblingNostrSpasmV2");
        expect(mergedWithDifferent?.siblings?.length).toStrictEqual(1);
    });
});
//# sourceMappingURL=convertToNostr.test.js.map