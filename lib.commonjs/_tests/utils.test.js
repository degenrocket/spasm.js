"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../utils/index");
const _events_data_1 = require("./_events-data");
const _events_data_2 = require("./_events-data");
// isObjectWithValues()
describe("isObjectWithValues() function tests", () => {
    test("should return false if object is empty", () => {
        const input = {};
        expect((0, index_1.isObjectWithValues)(input)).toBe(false);
    });
    test("should return true if has a valid DmpEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEvent));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid DmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid DmpEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpened));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid PostWithDmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validPostWithDmpEventSignedClosed));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrEvent));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpened));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrSpasmEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEvent));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpened));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid PostWithNostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validPostWithNostrSpasmEventSignedOpened));
        expect((0, index_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return false if event is a string", () => {
        const input = JSON.stringify(_events_data_1.validNostrEventSignedOpened);
        expect((0, index_1.isObjectWithValues)(input)).toBe(false);
    });
});
// getFormatFromId
describe("getFormatFromId() function tests", () => {
    test("should return proper format", () => {
        // const input = {};
        expect((0, index_1.getFormatFromId)(_events_data_2.validId1Hex)).toStrictEqual({
            name: "nostr-hex"
        });
        expect((0, index_1.getFormatFromId)(_events_data_2.validId1Note)).toStrictEqual({
            name: "nostr-note"
        });
        expect((0, index_1.getFormatFromId)(_events_data_2.validId1Nevent)).toStrictEqual({
            name: "nostr-nevent"
        });
        expect((0, index_1.getFormatFromId)(_events_data_2.validId0Spasmid01)).toStrictEqual({
            name: "spasmid",
            version: "01"
        });
    });
});
// getFormatFromAddress
describe("getFormatFromAddress() function tests", () => {
    test("should return proper format", () => {
        // getFormatFromAddress
        expect((0, index_1.getFormatFromAddress)(_events_data_2.validNpubAddress1)).toStrictEqual({
            name: "nostr-npub"
        });
        expect((0, index_1.getFormatFromAddress)(_events_data_2.validEthereumAddress1)).toStrictEqual({
            name: "ethereum-pubkey"
        });
    });
});
// getFormatFromValue
describe("getFormatFromValue() function tests", () => {
    test("should return proper format", () => {
        expect((0, index_1.getFormatFromValue)(_events_data_2.validEthereumAddress1)).toStrictEqual({
            name: "ethereum-pubkey"
        });
        expect((0, index_1.getFormatFromValue)(_events_data_2.invalidEthereumAddress1)).toStrictEqual({
            name: "string"
        });
        expect((0, index_1.getFormatFromValue)(_events_data_2.validEthereumSignature1)).toStrictEqual({
            name: "ethereum-sig"
        });
        expect((0, index_1.getFormatFromValue)(_events_data_2.invalidEthereumSignature1)).toStrictEqual({
            name: "string"
        });
        expect((0, index_1.getFormatFromValue)(_events_data_2.validId1Hex)).toStrictEqual({
            name: "nostr-hex"
        });
        expect((0, index_1.getFormatFromValue)(_events_data_2.validId1Note)).toStrictEqual({
            name: "nostr-note"
        });
        expect((0, index_1.getFormatFromValue)(_events_data_2.validId1Nevent)).toStrictEqual({
            name: "nostr-nevent"
        });
        expect((0, index_1.getFormatFromValue)("https://degenrocket.space")).toStrictEqual({
            name: "url"
        });
        expect((0, index_1.getFormatFromValue)("degenrocket.space")).toStrictEqual({
            name: "string"
        });
        expect((0, index_1.getFormatFromValue)("hello world")).toStrictEqual({
            name: "string"
        });
        expect((0, index_1.getFormatFromValue)(123)).toStrictEqual({
            name: "number"
        });
    });
});
//# sourceMappingURL=utils.test.js.map