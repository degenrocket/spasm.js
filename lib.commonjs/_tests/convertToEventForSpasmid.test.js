"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _events_data_1 = require("./_events-data");
const convertToEventForSpasmid_1 = require("./../convert/convertToEventForSpasmid");
// template
describe("convertToEventForSpasmid() template tests", () => {
    test("should return true if true", () => {
        expect(true).toStrictEqual(true);
    });
});
// convertToEventForSpasmid()
describe("convertToEventForSpasmid() tests", () => {
    test("should return EventForSpasmid01", () => {
        const input = _events_data_1.SpasmEventV2ToTestSpasmid01;
        const output = _events_data_1.SpasmEventV2ConvertedToSpasmid01;
        expect((0, convertToEventForSpasmid_1.convertToEventForSpasmid)(input)).toStrictEqual(output);
    });
    test("Signed and unsigned Dmp events should not be converted to the same EventForSpasmid() because unsigned Dmp events lack authors (signers)", () => {
        const input = _events_data_1.validDmpEventConvertedToSpasmEventV2;
        const output = _events_data_1.validDmpEventSignedClosedConvertedToSpasmV2;
        expect((0, convertToEventForSpasmid_1.convertToEventForSpasmid)(input)).not.toStrictEqual((0, convertToEventForSpasmid_1.convertToEventForSpasmid)(output));
    });
    test("Signed closed and opened Dmp events should be converted to the same EventForSpasmid()", () => {
        const input = _events_data_1.validDmpEventSignedOpenedConvertedToSpasmV2;
        const output = _events_data_1.validDmpEventSignedClosedConvertedToSpasmV2;
        expect((0, convertToEventForSpasmid_1.convertToEventForSpasmid)(input)).toStrictEqual((0, convertToEventForSpasmid_1.convertToEventForSpasmid)(output));
    });
});
//# sourceMappingURL=convertToEventForSpasmid.test.js.map