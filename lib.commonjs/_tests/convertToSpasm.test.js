"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _events_data_1 = require("./_events-data");
const convertToSpasm_1 = require("./../convert/convertToSpasm");
describe("convertToSpasm tests", () => {
    test("should return true if true", () => {
        expect(true).toBe(true);
    });
});
// convertToSpasm() for DMP events
describe("convertToSpasm() tests for DMP events", () => {
    // DmpEvent to V2
    test("should convert validDmpEvent to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEvent));
        const output = JSON.parse(JSON.stringify(_events_data_1.validDmpEventConvertedToSpasmEventV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // DmpEventSignedClosed to V2
    test("should convert validDmpEventSignedClosed to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed));
        const output = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // DmpEventSignedOpened to V2
    test("should convert validDmpEventSignedOpened to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // SpasmDmpEventSignedClosedV0 to V2
    // validPostWithDmpEventSignedClosed - old name
    // validSpasmDmpEventSignedClosedV0 - new name
    test("should convert validSpasmDmpEventSignedClosedV0 to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validSpasmDmpEventSignedClosedV0));
        const output = JSON.parse(JSON.stringify(_events_data_1.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
});
// convertToSpasm() for Nostr events
describe("convertToSpasm() tests for Nostr events", () => {
    // NostrEvent to V2
    test("should convert validNostrEvent to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrEvent));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrEventConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrSpasmEvent to V2
    test("should convert validNostrSpasmEvent to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEvent));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrEventSignedOpened to V2
    test("should convert validNostrEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrSpasmEventSignedOpened to V2
    test("should convert validNostrSpasmEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // PostWithNostrEventSignedOpened - old name
    // SpasmNostrEventSignedOpenedV0 - new name
    test("should convert validSpasmNostrEventSignedOpenedV0 to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validSpasmNostrEventSignedOpenedV0));
        const output = JSON.parse(JSON.stringify(_events_data_1.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // PostWithNostrSpasmEventSignedOpened - old name
    // SpasmNostrSpasmEventSignedOpenedV0 - new name
    test("should convert SpasmNostrSpasmEventSignedOpenedV0 to SpasmEventV2", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validSpasmNostrSpasmEventSignedOpenedV0));
        const output = JSON.parse(JSON.stringify(_events_data_1.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // validNostrReplyToDmpEvent
    // validNostrReplyToDmpEvent ("To the SPASM!") is tested as a
    // child (reply) of a validPostWithDmpEventSignedClosed inside
    // of SpasmDmpEventSignedClosedV0ConvertedToSpasmV2.
});
// convertToSpasm() for RSS items
// validPostWithRssItem - old name
// validSpasmEventRssItemV0 - new name
// validSpasmEventRssItemV0ConvertedToSpasmV2
describe("convertToSpasm() tests for RSS items", () => {
    // RssItem
    test("should convert validSpasmEventRssItemV0 to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validSpasmEventRssItemV0));
        const output = JSON.parse(JSON.stringify(_events_data_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
});
//# sourceMappingURL=convertToSpasm.test.js.map