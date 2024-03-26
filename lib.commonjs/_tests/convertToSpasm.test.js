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
    // DmpEvent
    test("should convert DmpEvent to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEvent));
        const output = JSON.parse(JSON.stringify(_events_data_1.validDmpEventConvertedToSpasm));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // DmpEventSignedClosed
    test("should convert DmpEventSignedClosed to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed));
        const output = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosedConvertedToSpasm));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // DmpEventSignedOpened
    test("should convert DmpEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpenedConvertedToSpasm));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // PostWithDmpEventSignedClosed
    test("should convert PostWithDmpEventSignedClosed to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validPostWithDmpEventSignedClosed));
        const output = JSON.parse(JSON.stringify(_events_data_1.validPostWithDmpEventSignedClosedConvertedToSpasm));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
});
// convertToSpasm() for Nostr events
describe("convertToSpasm() tests for Nostr events", () => {
    // NostrEvent
    test("should convert NostrEvent to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrEvent));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrEventConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrSpasmEvent
    test("should convert NostrSpasmEvent to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEvent));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrEventSignedOpened
    test("should convert NostrEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpenedConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrSpasmEventSignedOpened
    test("should convert NostrSpasmEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // PostWithNostrEventSignedOpened,
    test("should convert PostWithNostrEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validPostWithNostrEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validPostWithNostrEventSignedOpenedConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // PostWithNostrSpasmEventSignedOpened,
    test("should convert PostWithNostrSpasmEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validPostWithNostrSpasmEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validPostWithNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // validNostrReplyToDmpEvent,
    test("should convert NostrReplyToDmpEvent to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrReplyToDmpEvent));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrReplyToDmpEventConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
});
// convertToSpasm() for RSS items
describe("convertToSpasm() tests for RSS items", () => {
    // RssItem
    test("should convert NostrEvent to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validPostWithRssItem));
        const output = JSON.parse(JSON.stringify(_events_data_1.validPostWithRssItemConvertedToSpasmV1_0_0));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
});
//# sourceMappingURL=convertToSpasm.test.js.map