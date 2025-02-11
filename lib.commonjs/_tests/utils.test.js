"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {SpasmEventAuthorV2} from '../types/interfaces';
const convertToSpasm_js_1 = require("../convert/convertToSpasm.js");
const interfaces_js_1 = require("../types/interfaces.js");
const index_js_1 = require("./../utils/index.js");
const _events_data_js_1 = require("./_events-data.js");
const _events_data_js_2 = require("./_events-data.js");
// template()
describe("template() function tests", () => {
    test("template() should return true if true", () => {
        const input = true;
        const output = true;
        expect(input).toStrictEqual(output);
    });
});
// isObjectWithValues()
describe("isObjectWithValues() function tests", () => {
    test("should return false if object is empty", () => {
        const input = {};
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(false);
    });
    test("should return true if has a valid DmpEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEvent));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid DmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosed));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid DmpEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid PostWithDmpEventSignedClosed", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithDmpEventSignedClosed));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEvent));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrSpasmEvent", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEvent));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid NostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return true if has a valid PostWithNostrSpasmEventSignedOpened", () => {
        const input = JSON.parse(JSON.stringify(_events_data_js_1.validPostWithNostrSpasmEventSignedOpened));
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(true);
    });
    test("should return false if event is a string", () => {
        const input = JSON.stringify(_events_data_js_1.validNostrEventSignedOpened);
        expect((0, index_js_1.isObjectWithValues)(input)).toBe(false);
    });
});
// isArrayOfStringsOrNumbers
describe("isArrayOfStringsOrNumbers() function tests", () => {
    test("should return false if input is null", () => {
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(null)).toBe(false);
    });
    test("should return false if input array has null value", () => {
        const input = [null, 1];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(false);
    });
    test("should return true if input array has only numbers", () => {
        const input = [1, 2, 3];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(true);
    });
    test("should return true if input array has only strings", () => {
        const input = ["one", "2", "null"];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(true);
    });
    test("should return true if input array has only strings and numbers", () => {
        const input = ["one", 2, "null"];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(true);
    });
    test("should return false if input array has strings, numbers, and null", () => {
        const input = ["one", 2, null];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(false);
    });
    test("should return false if input array has no values", () => {
        const input = [];
        expect((0, index_js_1.isArrayOfStringsOrNumbers)(input)).toBe(false);
    });
});
// ifArraysHaveCommonId
describe("ifArraysHaveCommonId() function tests", () => {
    test("should return false if inputs are empty arrays", () => {
        const input1 = [];
        const input2 = [];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input is empty array", () => {
        const input1 = [1, 2, 3];
        const input2 = [];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input is empty array", () => {
        const input1 = [];
        const input2 = ["one", 2];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if inputs have no common values", () => {
        const input1 = [1, 2, 3];
        const input2 = [4];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has an object as value", () => {
        const input1 = [1, 2, "four", {}];
        const input2 = [3, "four", "five"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has an array as value", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five", []];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has null as value", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five", null];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return false if one input has undefined as value", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five", undefined];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(false);
    });
    test("should return true if inputs a common value number", () => {
        const input1 = [1, 2, 3];
        const input2 = [3, "four", "five"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(true);
    });
    test("should return true if inputs a common value string", () => {
        const input1 = [1, 2, "four"];
        const input2 = [3, "four", "five"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(true);
    });
    test("should return true if inputs have same values", () => {
        const input1 = [1, 2, "four"];
        const input2 = [1, 2, "four"];
        expect((0, index_js_1.ifArraysHaveCommonId)(input1, input2)).toBe(true);
    });
});
// getFormatFromId
describe("getFormatFromId() function tests", () => {
    test("should return proper format", () => {
        // const input = {};
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId1Hex)).toStrictEqual({
            name: "nostr-hex"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId1Note)).toStrictEqual({
            name: "nostr-note"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId1Nevent)).toStrictEqual({
            name: "nostr-nevent"
        });
        expect((0, index_js_1.getFormatFromId)(_events_data_js_2.validId0Spasmid01)).toStrictEqual({
            name: "spasmid",
            version: "01"
        });
    });
});
// getFormatFromAddress
describe("getFormatFromAddress() function tests", () => {
    test("should return proper format", () => {
        // getFormatFromAddress
        expect((0, index_js_1.getFormatFromAddress)(_events_data_js_2.validNpubAddress1)).toStrictEqual({
            name: "nostr-npub"
        });
        expect((0, index_js_1.getFormatFromAddress)(_events_data_js_2.validEthereumAddress1)).toStrictEqual({
            name: "ethereum-pubkey"
        });
    });
});
// getFormatFromValue
describe("getFormatFromValue() function tests", () => {
    test("should return proper format", () => {
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validEthereumAddress1)).toStrictEqual({
            name: "ethereum-pubkey"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.invalidEthereumAddress1)).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validEthereumSignature1)).toStrictEqual({
            name: "ethereum-sig"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.invalidEthereumSignature1)).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validId1Hex)).toStrictEqual({
            name: "nostr-hex"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validId1Note)).toStrictEqual({
            name: "nostr-note"
        });
        expect((0, index_js_1.getFormatFromValue)(_events_data_js_2.validId1Nevent)).toStrictEqual({
            name: "nostr-nevent"
        });
        expect((0, index_js_1.getFormatFromValue)("https://degenrocket.space")).toStrictEqual({
            name: "url"
        });
        expect((0, index_js_1.getFormatFromValue)("degenrocket.space")).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)("hello world")).toStrictEqual({
            name: "string"
        });
        expect((0, index_js_1.getFormatFromValue)(123)).toStrictEqual({
            name: "number"
        });
    });
});
// extractIdFormatNameFromSpasmEventIdV2
describe("extractIdFormatNameFromSpasmEventIdV2() tests", () => {
    test("should extract ID format name", () => {
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1]))).toStrictEqual("ethereum-sig");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids[1]))).toStrictEqual("nostr-hex");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2.ids[2]))).toStrictEqual("nostr-sig");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(true))).toStrictEqual(null);
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[0]))).toStrictEqual("spasmid");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[1]))).toStrictEqual("url");
        expect((0, index_js_1.extractIdFormatNameFromSpasmEventIdV2)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2.ids[2]))).toStrictEqual("guid");
    });
});
// extractAllIdFormatNamesFromSpasmEventV2
// getAllFormatNamesFromSpasmEventV2
// getAllFormatNamesFromEvent
describe("extractIdFormatNameFromSpasmEventIdV2() tests", () => {
    test("should extract all ID format names", () => {
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2))).toStrictEqual(["spasmid"]);
        expect((0, index_js_1.extractAllIdFormatNamesFromSpasmEventV2)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toStrictEqual(["spasmid", "ethereum-sig"]);
        expect((0, index_js_1.getAllFormatNamesFromSpasmEventV2)((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2))).toStrictEqual(["spasmid", "nostr-hex", "nostr-sig"]);
        expect((0, index_js_1.getAllFormatNamesFromEvent)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2))).toStrictEqual(["spasmid", "url", "guid"]);
    });
});
// getHashOfString()
describe("getHashOfString() function tests", () => {
    test("should return valid hash", () => {
        // const input = {};
        expect((0, index_js_1.getHashOfString)("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        expect((0, index_js_1.getHashOfString)("hello world")).toBe("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9");
        expect((0, index_js_1.getHashOfString)("1234567890-=!@#$%^&*()_+")).toBe("37af4cc38359f092b705241b286aaabf42aa6054fcb70016e971d63f9470793b");
        expect((0, index_js_1.getHashOfString)('<br>line<div class="main">Main text</div>')).toBe("ca5588d79172608051a13af3f6692e656179ab0e1a4e6153ef5eb969687c4330");
        expect((0, index_js_1.getHashOfString)("<br>line<div class='main'>Main text</div>")).toBe("6f7c80389ac8d9e6a5ce20539c569fcf7ab20b056f4b41cacfab391200472ec4");
        // Japanese
        expect((0, index_js_1.getHashOfString)("ハローワールド")).toBe("9b58f66ce16f8efa41f9ea5fcc767ae639bb1ee83849efc1400da3832c6bff90");
    });
});
// keepTheseKeysOnly
describe("keepTheseKeysOnly() function tests", () => {
    test("should return valid hash", () => {
        const input = {
            addresses: [
                { value: "1b234", format: { name: "ethereum-pubkey" } },
                { value: "1a234", format: { name: "ethereum-pubkey" } },
                { value: "0x123", format: { name: "ethereum-pubkey" } }
            ],
            usernames: [
                { value: "carol1" },
                { value: "alice1" },
                { value: "bob1" }
            ],
            version: "123",
            extra: [
                { value: "extra1" },
                { value: "extra2" },
                { value: "extra3" }
            ]
        };
        const output1 = {};
        const output2 = {
            addresses: [
                { value: "1b234", format: { name: "ethereum-pubkey" } },
                { value: "1a234", format: { name: "ethereum-pubkey" } },
                { value: "0x123", format: { name: "ethereum-pubkey" } }
            ],
            usernames: [
                { value: "carol1" },
                { value: "alice1" },
                { value: "bob1" }
            ]
        };
        const output3 = { version: "123" };
        expect((0, index_js_1.keepTheseKeysInObject)(input, ["id"])).toStrictEqual(output1);
        expect((0, index_js_1.keepTheseKeysInObject)(input, ["addresses", "usernames"])).toStrictEqual(output2);
        expect((0, index_js_1.keepTheseKeysInObject)(input, ["version", "invalid"])).toStrictEqual(output3);
    });
});
// keepTheseKeysInObjectsInArray
describe("keepTheseKeysInObjectsInArray() function tests", () => {
    test("should return valid hash", () => {
        const input = [
            {
                addresses: [
                    { value: "1b234", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "bob1" }
                ],
                version: "123",
                extra: [
                    { value: "extra1" },
                    { value: "extra2" }
                ]
            },
            {
                addresses: [
                    { value: "0x123", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "carol1" },
                    { value: "alice1" }
                ],
                version: "456",
                extra: [
                    { value: "extra3" }
                ]
            }
        ];
        const output1 = [{}, {}];
        const output2 = [
            {
                addresses: [
                    { value: "1b234", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } },
                ],
                usernames: [
                    { value: "bob1" }
                ]
            },
            {
                addresses: [
                    { value: "0x123", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "carol1" },
                    { value: "alice1" },
                ]
            }
        ];
        const output3 = [{ version: "123" }, { version: "456" }];
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, ["id"])).toStrictEqual(output1);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, ["addresses", "usernames"])).toStrictEqual(output2);
        expect((0, index_js_1.keepTheseKeysInObjectsInArray)(input, ["version", "invalid"])).toStrictEqual(output3);
    });
});
// sortArrayOfStringsAndNumbers()
describe("sortArrayOfStringsAndNumbers() function tests", () => {
    test("should return sorted array", () => {
        const input = ["1", 3, ["invalid", 0], undefined, null, { a: 69, b: 420, c: { d: "invalid again" } }, 2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4"];
        const output = ["1", 2, 3, "3a", "3ab", "4", "5", "abc1", "abc2", "abcd", ["invalid", 0], undefined, null, { a: 69, b: 420, c: { d: "invalid again" } }];
        expect((0, index_js_1.sortArrayOfStringsAndNumbers)(input)).toStrictEqual(output);
    });
});
// sortArrayOfObjects()
describe("sortArrayOfObjects() function tests", () => {
    test("should return sorted array", () => {
        const input = [
            "3", 1, ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
            2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
            { title: "white" },
            { id: "2a", value: "1b", title: "blue" },
            { value: "1d234", title: "purple" },
            { id: "1a", title: "red" },
            { title: "black" },
            { value: "1c", title: "yellow" },
            { id: 1, title: "green" },
        ];
        const output = [
            { id: 1, title: "green" },
            { id: "1a", title: "red" },
            { id: "2a", value: "1b", title: "blue" },
            { value: "1c", title: "yellow" },
            { value: "1d234", title: "purple" },
            { title: "black" },
            { title: "white" },
            1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
            ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
        ];
        // expect(sortArrayOfObjects(input, ["id"])).toStrictEqual(output);
        // expect(sortArrayOfObjects(input)).toStrictEqual("");
        // expect(sortArrayOfObjects(input, ["id", "value", "title"])).toStrictEqual("");
        // expect(sortArrayOfObjects(input, ["category", "title", "value", "id"])).toStrictEqual("");
        expect((0, index_js_1.sortArrayOfObjects)(input, ["id", "value", "title"])).toStrictEqual(output);
    });
});
describe("sortAuthorsForSpasmEventV2() function tests", () => {
    test("should return sorted array", () => {
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened)
        ])[0].title).toStrictEqual("genesis");
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened)
        ])[0]).not.toEqual(null);
        // Default order is descending "desc"
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.sortSpasmEventsV2ByDbAddedTimestamp)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2)
        ], "asc")).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
    });
});
// sortAuthorsForSpasmEventV2()
describe("sortAuthorsForSpasmEventV2() function tests", () => {
    test("should return sorted array", () => {
        const input = [
            "3", 1, ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
            2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
            { title: "white" },
            { id: "2a", value: "1b", title: "blue" },
            { value: "1d234", title: "purple" },
            { id: "1a", title: "red" },
            { title: "black" },
            { value: "1c", title: "yellow" },
            { id: 1, title: "green" },
            {
                usernames: [
                    { value: "carol5" },
                    { value: "alice5" },
                    { value: "bob5" }
                ]
            },
            {
                usernames: [
                    { value: "carol2" },
                    { value: "alice2" },
                    { value: "bob2" }
                ]
            },
            {
                addresses: [
                    { value: "3b234", format: { name: "ethereum-pubkey" } },
                    { value: "3a234", format: { name: "ethereum-pubkey" } },
                    { value: 30234, format: { name: "ethereum-pubkey" } }
                ],
            },
            {
                addresses: [
                    { value: "4b234", format: { name: "ethereum-pubkey" } }
                ]
            },
            {
                addresses: [
                    { value: "1b234", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } },
                    { value: "0x123", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "carol8" },
                    { value: "alice8" },
                    { value: "bob8" }
                ]
            },
        ];
        const output = [
            {
                addresses: [
                    { value: "0x123", format: { name: "ethereum-pubkey" } },
                    { value: "1a234", format: { name: "ethereum-pubkey" } },
                    { value: "1b234", format: { name: "ethereum-pubkey" } }
                ],
                usernames: [
                    { value: "alice8" },
                    { value: "bob8" },
                    { value: "carol8" }
                ]
            },
            {
                addresses: [
                    { value: 30234, format: { name: "ethereum-pubkey" } },
                    { value: "3a234", format: { name: "ethereum-pubkey" } },
                    { value: "3b234", format: { name: "ethereum-pubkey" } }
                ],
            },
            {
                addresses: [
                    { value: "4b234", format: { name: "ethereum-pubkey" } }
                ]
            },
            {
                usernames: [
                    { value: "alice2" },
                    { value: "bob2" },
                    { value: "carol2" }
                ]
            },
            {
                usernames: [
                    { value: "alice5" },
                    { value: "bob5" },
                    { value: "carol5" }
                ]
            },
            { id: 1, title: "green" },
            { id: "1a", title: "red" },
            { id: "2a", value: "1b", title: "blue" },
            1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
            ["invalid", 0], undefined, null,
            { a: 69, b: 420, c: { d: "invalid again" } },
            { title: "white" },
            { value: "1d234", title: "purple" },
            { title: "black" },
            { value: "1c", title: "yellow" },
        ];
        expect((0, index_js_1.sortAuthorsForSpasmEventV2)(input)).toStrictEqual(output);
    });
});
// sortMediasForSpasmid01
describe("sortMediasForSpasmid01() function tests", () => {
    test("sortMediasForSpasmid01() should return sorted medias", () => {
        const input = [
            // media 2
            { ids: [{ value: "mediaid2" },
                    { value: "mediaid5" },
                    { value: "mediaid4" }],
                hashes: [{ value: "hash7" },
                    { value: "hash8" }] },
            // media 1
            { ids: [{ value: "mediaid3" },
                    { value: "mediaid1" }] },
            // media 6
            { extra: [{ value: "extra2" },
                    { value: "extra1" }] },
            // media 4
            { hashes: [{ value: "hash6" },
                    { value: "hash5" }] },
            // media 3
            { hashes: [{ value: "hash4" },
                    { value: "hash3" }],
                links: [{ value: "link4" },
                    { value: "link2" }] },
            // media 5
            { links: [{ value: "link3" },
                    { value: "link1" }] }
        ];
        const output = [
            // media 1
            { ids: [{ value: "mediaid1" },
                    { value: "mediaid3" }] },
            // media 2
            { ids: [{ value: "mediaid2" },
                    { value: "mediaid4" },
                    { value: "mediaid5" }],
                hashes: [{ value: "hash7" },
                    { value: "hash8" }] },
            // media 3
            { hashes: [{ value: "hash3" },
                    { value: "hash4" }],
                links: [{ value: "link2" },
                    { value: "link4" }] },
            // media 4
            { hashes: [{ value: "hash5" },
                    { value: "hash6" }] },
            // media 5
            { links: [{ value: "link1" },
                    { value: "link3" }] },
            // media 6
            { extra: [{ value: "extra2" },
                    { value: "extra1" }] }
        ];
        expect((0, index_js_1.sortMediasForSpasmid01)(input)).toStrictEqual(output);
        // expect(sortMediasForSpasmid01(input)).toStrictEqual([]);
    });
});
// sortParentForSpasmid01()
describe("sortParentForSpasmid01() function tests", () => {
    test("sortParentForSpasmid01() should return sorted parent", () => {
        const input = { ids: [{ value: "parent-id3" },
                { value: "parent-id1b" },
                { value: "parent-id1a" },
                { value: "parent-idx" },
                { value: "parent-id1" }],
            marker: "parent-marker1" };
        const output = { ids: [{ value: "parent-id1" },
                { value: "parent-id1a" },
                { value: "parent-id1b" },
                { value: "parent-id3" },
                { value: "parent-idx" }],
            marker: "parent-marker1" };
        expect((0, index_js_1.sortParentForSpasmid01)(input)).toStrictEqual(output);
    });
});
// sortReferencesForSpasmid01()
describe("sortReferencesForSpasmid01() function tests", () => {
    test("sortReferencesForSpasmid01() should return sorted references", () => {
        const input = [
            // reference 2
            { ids: [{ value: "ref-id4" },
                    { value: "ref-id2" }],
                marker: "ref-marker2" },
            // reference 1
            { ids: [{ value: "ref-id3" },
                    { value: "ref-id1" }],
                marker: "ref-marker1" },
        ];
        const output = [
            // reference 1
            { ids: [{ value: "ref-id1" },
                    { value: "ref-id3" }],
                marker: "ref-marker1" },
            // reference 2
            { ids: [{ value: "ref-id2" },
                    { value: "ref-id4" }],
                marker: "ref-marker2" },
        ];
        expect((0, index_js_1.sortReferencesForSpasmid01)(input)).toStrictEqual(output);
    });
});
// sortTagsForSpasmid01()
describe("sortTagsForSpasmid01() function tests", () => {
    test("sortTagsForSpasmid01() should return sorted tags", () => {
        const input = [
            ["p", "pubkey2", "marker3", "extra2"],
            ["p", "pubkey2", "marker3", "extra1"],
            ["p", "pubkey1", "marker1"],
            ["p", "pubkey2", "marker3"],
            ["p", "pubkey2", "marker2"],
            ["e", "event1", "event-marker2"],
            ["e", "event2", "event-marker1"],
            ["license", "SPDX-License-Identifier: CC0-1.0"],
            ["spasm_version", "1.0.0"],
            ["spasm_action", "reply"],
            ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
        ];
        const output = [
            ["e", "event1", "event-marker2"],
            ["e", "event2", "event-marker1"],
            ["license", "SPDX-License-Identifier: CC0-1.0"],
            ["p", "pubkey1", "marker1"],
            ["p", "pubkey2", "marker2"],
            ["p", "pubkey2", "marker3"],
            ["p", "pubkey2", "marker3", "extra1"],
            ["p", "pubkey2", "marker3", "extra2"],
            ["spasm_action", "reply"],
            ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"],
            ["spasm_version", "1.0.0"],
        ];
        expect((0, index_js_1.sortTagsForSpasmid01)(input)).toStrictEqual(output);
    });
});
// executeFunctionForAllNestedValuesOfType()
describe("executeFunctionForNestedValues() function tests", () => {
    const changeString = (value) => {
        if (typeof (value) === "string") {
            if (value === "世界")
                return "新" + value;
            return "new " + value;
        }
        return value;
    };
    const changeNumber = (value) => {
        if (typeof (value) === "number") {
            if (value / 4 === 496)
                return value + 36;
            return value * 10;
        }
        return value;
    };
    const changeBoolean = (value) => {
        if (typeof (value) === "boolean") {
            if (value) {
                return false;
            }
            else {
                return true;
            }
        }
        return value;
    };
    const nestedArray = [
        "one", "two", ["three"], 4,
        [5, true, ["six", 7, 8, false],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "seventeen", true, false, ""],
                object: {
                    text: "eighteen",
                    booleans: [true, false],
                    mix: [19, true, "twenty", 21, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedStrings = [
        "new one", "new two", ["new three"], 4,
        [5, true, ["new six", 7, 8, false],
            {
                word: "new nine",
                words: ["new ten", "new eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "new sixteen", "new seventeen", true, false, "new "],
                object: {
                    text: "new eighteen",
                    booleans: [true, false],
                    mix: [19, true, "new twenty", 21, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedNumbers = [
        "one", "two", ["three"], 40,
        [50, true, ["six", 70, 80, false],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 120,
                numbers: [130, 140],
                mix: [150, "sixteen", "seventeen", true, false, ""],
                object: {
                    text: "eighteen",
                    booleans: [true, false],
                    mix: [190, true, "twenty", 210, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedBooleans = [
        "one", "two", ["three"], 4,
        [5, false, ["six", 7, 8, true],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "seventeen", false, true, ""],
                object: {
                    text: "eighteen",
                    booleans: [false, true],
                    mix: [19, false, "twenty", 21, true]
                }
            }
        ]
    ];
    const nestedObject = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "世界",
            array: JSON.parse(JSON.stringify(nestedArray))
        }
    };
    const nestedObjectWithChangedStrings = {
        content: "new hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "新世界",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
        }
    };
    const nestedObjectWithChangedNumbers = {
        content: "hello",
        value: (4 + 12 + 12 + 13) * 50 - 30,
        valent: false,
        original: {
            content: "世界",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers))
        }
    };
    const nestedObjectWithChangedBooleans = {
        content: "hello",
        value: 31 * 64,
        valent: true,
        original: {
            content: "世界",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans))
        }
    };
    test("should return undefined if input is a string", () => {
        const input = "hello world";
        expect(() => {
            (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, // bypass TypeScript type checking
            {
                customFunction: changeString,
                valueType: "string"
            });
        }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.");
    });
    test("should return undefined if input is a number", () => {
        const input = 1;
        expect(() => {
            (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, // bypass TypeScript type checking
            {
                customFunction: changeNumber,
                valueType: "number"
            });
        }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.");
    });
    test("should throw an error if maxium recursion depth exceeded", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        expect(() => {
            (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
                customFunction: changeString,
                valueType: "string",
                maxDepth: 3
            });
        }).toThrow("Maximum recursion depth exceeded");
    });
    test("sanitizeEventWith should return empty array if maximum recursion depth exceeded", () => {
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.sanitizeEventWith)(input, {
            customFunction: changeString,
            valueType: "string",
            maxDepth: 3
        });
        expect(input).toStrictEqual([]);
        // Restore console errors
        jest.restoreAllMocks();
    });
    test("sanitizeEventWith should return empty object if maximum recursion depth exceeded", () => {
        // Hide console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.sanitizeEventWith)(input, {
            customFunction: changeString,
            valueType: "string",
            maxDepth: 3
        });
        expect(input).toStrictEqual({});
        // Restore console errors
        jest.restoreAllMocks();
    });
    test("should change all nested strings in array", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeString,
            valueType: "string"
        });
        const output = JSON.parse(JSON.stringify(nestedArrayWithChangedStrings));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested numbers in array", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeNumber,
            valueType: "number"
        });
        const output = JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested booleans in array", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeBoolean,
            valueType: "boolean"
        });
        const output = JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested strings in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeString,
            valueType: "string"
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested numbers in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeNumber,
            valueType: "number"
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedNumbers));
        expect(input).toStrictEqual(output);
    });
    test("should change all nested booleans in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeBoolean,
            valueType: "boolean"
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedBooleans));
        expect(input).toStrictEqual(output);
    });
    test("should not change anything", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeString,
            valueType: "number"
        });
        const output = JSON.parse(JSON.stringify(nestedArray));
        expect(input).toStrictEqual(output);
    });
    test("should not change anything", () => {
        const input = JSON.parse(JSON.stringify(nestedArray));
        (0, index_js_1.executeFunctionForAllNestedValuesOfType)(input, {
            customFunction: changeNumber,
            valueType: "string"
        });
        const output = JSON.parse(JSON.stringify(nestedArray));
        expect(input).toStrictEqual(output);
    });
});
// sanitizeEventWith()
describe("sanitizeEventWith() function tests", () => {
    const sanitizeStringFunction = (value) => {
        if (typeof (value) === "string") {
            return "sanitized " + value;
        }
        return value;
    };
    const nestedArray = [
        "one", "two", ["three"], 4,
        [5, true, ["six", 7, 8, false],
            {
                word: "nine",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "seventeen", true, false, ""],
                object: {
                    text: "eighteen",
                    booleans: [true, false],
                    mix: [19, true, "twenty", 21, false]
                }
            }
        ]
    ];
    const nestedArrayWithChangedStrings = [
        "sanitized one", "sanitized two", ["sanitized three"], 4,
        [5, true, ["sanitized six", 7, 8, false],
            {
                word: "sanitized nine",
                words: ["sanitized ten", "sanitized eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sanitized sixteen", "sanitized seventeen", true, false, "sanitized "],
                object: {
                    text: "sanitized eighteen",
                    booleans: [true, false],
                    mix: [19, true, "sanitized twenty", 21, false]
                }
            }
        ]
    ];
    const nestedObject = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "world",
            array: JSON.parse(JSON.stringify(nestedArray))
        }
    };
    const nestedObjectWithChangedStrings = {
        content: "sanitized hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "sanitized world",
            array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
        }
    };
    test("should sanitize all nested strings in object", () => {
        const input = JSON.parse(JSON.stringify(nestedObject));
        (0, index_js_1.sanitizeEventWith)(input, {
            customFunction: sanitizeStringFunction
        });
        const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
        expect(input).toStrictEqual(output);
    });
});
// sanitizeEvent()
describe("sanitizeEvent() function tests", () => {
    // Array with nested malicious HTML tags
    const nestedArrayDirty = [
        "one", "<img src=x onerror=alert(1)//>", ["three"], 4,
        [5, true, ["<svg><g/onload=alert(2)//<p>", 7, 8, false],
            {
                word: "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", '<math><mi//xlink:href="data:x,<script>alert(4)</script>">', true, false, ""],
                object: {
                    text: "<TABLE><tr><td>HELLO</tr></TABL>",
                    booleans: [true, false],
                    mix: [19, true, "<UL><li><A HREF=//google.com>click</UL>", 21, false]
                }
            }
        ]
    ];
    // DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // becomes <img src="x">
    // DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>'); // becomes <svg><g></g></svg>
    // DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'); // becomes <p>abc</p>
    // DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">'); // becomes <math><mi></mi></math>
    // DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>'); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
    // DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'); // becomes <ul><li><a href="//google.com">click</a></li></ul>
    const nestedObjectDirty = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "world",
            array: JSON.parse(JSON.stringify(nestedArrayDirty))
        }
    };
    const eventDirty = JSON.parse(JSON.stringify(nestedObjectDirty));
    const nestedArrayClean = [
        "one", '<img src="x">', ["three"], 4,
        [5, true, ["<svg><g></g></svg>", 7, 8, false],
            {
                word: "<p>abc</p>",
                words: ["ten", "eleven"],
                number: 12,
                numbers: [13, 14],
                mix: [15, "sixteen", "<math><mi></mi></math>", true, false, ""],
                object: {
                    text: "<table><tbody><tr><td>HELLO</td></tr></tbody></table>",
                    booleans: [true, false],
                    mix: [19, true, '<ul><li><a href="//google.com">click</a></li></ul>', 21, false]
                }
            }
        ]
    ];
    const nestedObjectClean = {
        content: "hello",
        value: 31 * 64,
        valent: false,
        original: {
            content: "world",
            array: JSON.parse(JSON.stringify(nestedArrayClean))
        }
    };
    const eventClean = JSON.parse(JSON.stringify(nestedObjectClean));
    test("should sanitize all nested strings in event", () => {
        const input = JSON.parse(JSON.stringify(eventDirty));
        (0, index_js_1.sanitizeEvent)(input);
        const output = JSON.parse(JSON.stringify(eventClean));
        expect(input).toStrictEqual(output);
    });
});
// mergeConfigs()
describe("mergeConfigs() function tests", () => {
    test("mergeConfigs() should merge two full configs", () => {
        const defaultConfig = new interfaces_js_1.ConvertToSpasmConfig();
        const customConfig = new interfaces_js_1.ConvertToSpasmConfig();
        customConfig.to.spasm.id.versions = ["02", "03"];
        customConfig.xss.enableSanitization = false;
        const input = (0, index_js_1.mergeConfigs)(defaultConfig, customConfig);
        const output = new interfaces_js_1.ConvertToSpasmConfig();
        output.to.spasm.id.versions = ["02", "03"];
        output.xss.enableSanitization = false;
        expect(input).toEqual(output);
    });
    test("mergeConfigs() should merge full and partial configs", () => {
        const defaultConfig = new interfaces_js_1.ConvertToSpasmConfig();
        const customConfigPartial = {
            to: {
                spasm: {
                    version: "1.0.0",
                    id: {
                        versions: ["03"]
                    }
                }
            },
            xss: {
                enableSanitization: false
            },
        };
        const input = (0, index_js_1.mergeConfigs)(defaultConfig, customConfigPartial);
        const output = new interfaces_js_1.ConvertToSpasmConfig();
        output.to.spasm.version = "1.0.0";
        output.to.spasm.id.versions = ["03"];
        output.xss.enableSanitization = false;
        expect(input).toEqual(output);
    });
});
// hasSiblingDmp()
// hasSiblingNostr()
// hasSiblingWeb2()
// hasSiblingSpasm()
// hasSignatureEthereum()
// hasSignatureNostr()
describe("hasSiblingSpasm() function tests", () => {
    test("hasSibling...() should return true if event has specified siblings", () => {
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const inputNostrSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        // TODO
        // const inputSpasm =
        // hasSiblingSpasm()
        // hasSiblingDmp()
        expect((0, index_js_1.hasSiblingDmp)(inputDmp)).toEqual(true);
        expect((0, index_js_1.hasSiblingDmp)(inputNostr)).toEqual(false);
        expect((0, index_js_1.hasSiblingDmp)(inputNostrSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingDmp)(inputWeb2)).toEqual(false);
        // hasSiblingNostr()
        expect((0, index_js_1.hasSiblingNostr)(inputDmp)).toEqual(false);
        expect((0, index_js_1.hasSiblingNostr)(inputNostr)).toEqual(true);
        expect((0, index_js_1.hasSiblingNostr)(inputNostrSpasm)).toEqual(true);
        expect((0, index_js_1.hasSiblingNostr)(inputWeb2)).toEqual(false);
        // hasSiblingWeb2()
        expect((0, index_js_1.hasSiblingWeb2)(inputDmp)).toEqual(false);
        expect((0, index_js_1.hasSiblingWeb2)(inputNostr)).toEqual(false);
        expect((0, index_js_1.hasSiblingWeb2)(inputNostrSpasm)).toEqual(false);
        expect((0, index_js_1.hasSiblingWeb2)(inputWeb2)).toEqual(true);
        // hasSignatureEthereum()
        expect((0, index_js_1.hasSignatureEthereum)(inputDmp)).toEqual(true);
        expect((0, index_js_1.hasSignatureEthereum)(inputNostr)).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)(inputNostrSpasm)).toEqual(false);
        expect((0, index_js_1.hasSignatureEthereum)(inputWeb2)).toEqual(false);
        // hasSignatureNostr()
        expect((0, index_js_1.hasSignatureNostr)(inputDmp)).toEqual(false);
        expect((0, index_js_1.hasSignatureNostr)(inputNostr)).toEqual(true);
        expect((0, index_js_1.hasSignatureNostr)(inputNostrSpasm)).toEqual(true);
        expect((0, index_js_1.hasSignatureNostr)(inputWeb2)).toEqual(false);
    });
});
describe("extractNostrEvents() function tests", () => {
    test("extractNostrEvents() should extract valid Nostr event from Spasm event", () => {
        expect((0, index_js_1.extractNostrEvent)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2)).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2)).toStrictEqual(null);
        expect((0, index_js_1.extractNostrEvent)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual(_events_data_js_1.validNostrEvent);
        expect((0, index_js_1.extractSignedNostrEvent)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual(null);
        expect((0, index_js_1.extractSignedNostrEvent)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)).toStrictEqual(_events_data_js_1.validNostrEventSignedOpened);
        expect((0, index_js_1.extractSignedNostrEvent)(_events_data_js_1.validNostrSpasmEventV2SingleSignedOpenedConvertedToSpasmV2)).toStrictEqual(_events_data_js_1.validNostrSpasmEventV2SingleSignedOpened);
        expect((0, index_js_1.extractNostrEvents)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual([_events_data_js_1.validNostrEvent]);
        expect((0, index_js_1.extractSignedNostrEvents)(_events_data_js_1.validNostrEventConvertedToSpasmV2)).toStrictEqual(null);
        expect((0, index_js_1.extractSignedNostrEvents)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)).toStrictEqual([_events_data_js_1.validNostrEventSignedOpened]);
    });
});
// getAllSigners()
describe("getAllSigners() function tests", () => {
    test("getAllSigners() should return an array of author addresses", () => {
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const inputNostrSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const inputDmpConverted = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const inputNostrConverted = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const inputNostrSpasmConverted = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputWeb2Converted = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0ConvertedToSpasmV2));
        const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"];
        const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"];
        const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"];
        const outputWeb2 = [];
        // getAllSigners() for original events
        expect((0, index_js_1.getAllSigners)(inputDmp)).toEqual(outputDmp);
        expect((0, index_js_1.getAllSigners)(inputNostr)).toEqual(outputNostr);
        expect((0, index_js_1.getAllSigners)(inputNostrSpasm)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getAllSigners)(inputWeb2)).toEqual(outputWeb2);
        // getAllSigners() for events converted to SpasmEventV2
        expect((0, index_js_1.getAllSigners)(inputDmpConverted)).toEqual(outputDmp);
        expect((0, index_js_1.getAllSigners)(inputNostrConverted)).toEqual(outputNostr);
        expect((0, index_js_1.getAllSigners)(inputNostrSpasmConverted)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getAllSigners)(inputWeb2Converted)).toEqual(outputWeb2);
        // getVerifiedSigners()
        expect((0, index_js_1.getVerifiedSigners)(inputDmp)).toEqual(outputDmp);
        expect((0, index_js_1.getVerifiedSigners)(inputNostr)).toEqual(outputNostr);
        expect((0, index_js_1.getVerifiedSigners)(inputNostrSpasm)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getVerifiedSigners)(inputWeb2)).toEqual(outputWeb2);
    });
});
// getAllSignatures()
describe("getAllSignatures() function tests", () => {
    test("getAllSignatures() should return an array of signatures", () => {
        // Events
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const inputNostrSpasm = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpened));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        // Signatures
        const outputDmp = ["0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"];
        const outputNostr = ["908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"];
        const outputNostrSpasm = ["db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"];
        const outputWeb2 = [];
        // getAllSigners()
        expect((0, index_js_1.getAllSignatures)(inputDmp)).toEqual(outputDmp);
        expect((0, index_js_1.getAllSignatures)(inputNostr)).toEqual(outputNostr);
        expect((0, index_js_1.getAllSignatures)(inputNostrSpasm)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getAllSignatures)(inputWeb2)).toEqual(outputWeb2);
    });
});
// getSignersListedIn()
// isAnySignerListedIn()
// areAllSignersListedIn()
describe("getSignersListedIn() function tests", () => {
    test("getSignersListedIn() should return an array of signers listed as moderators", () => {
        // Events
        const inputDmp = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpened));
        const inputDmpBanned = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0));
        const inputNostr = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpened));
        const inputNostrSpasmConverted = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputWeb2 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmEventRssItemV0));
        const moderators = [
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
        ];
        const whitelistedForActionPost = [
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        ];
        const whitelistedForActionPostWithNpub = [
            "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        ];
        const whitelistedForActionPostWithNpubAndHex = [
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        ];
        const bannedAuthors = [
            "0x49e8d02294e721ac47f6f4794625312b9005fd80",
            "vita1ik.eth"
        ];
        const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"];
        const outputDmpBanned = ["0x49e8d02294e721ac47f6f4794625312b9005fd80"];
        const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"];
        const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"];
        // const outputWeb2 = []
        // getSignersListedIn() with Dmp moderator and whitelisted
        expect((0, index_js_1.getSignersListedIn)(inputDmp, moderators)).toEqual(outputDmp);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, whitelistedForActionPost)).toEqual(outputDmp);
        expect((0, index_js_1.getSignersListedIn)(inputDmp, bannedAuthors)).toEqual([]);
        // alias getPubkeysListedIn()
        expect((0, index_js_1.getPubkeysListedIn)(inputDmp, moderators)).toEqual(outputDmp);
        expect((0, index_js_1.getPubkeysListedIn)(inputDmp, whitelistedForActionPost)).toEqual(outputDmp);
        expect((0, index_js_1.getPubkeysListedIn)(inputDmp, bannedAuthors)).toEqual([]);
        // getSignersListedIn() with Dmp banned
        expect((0, index_js_1.getSignersListedIn)(inputDmpBanned, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputDmpBanned, bannedAuthors)).toEqual(outputDmpBanned);
        // getSignersListedIn() with Nostr whitelisted
        expect((0, index_js_1.getSignersListedIn)(inputNostr, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, whitelistedForActionPost)).toEqual(outputNostr);
        expect((0, index_js_1.getSignersListedIn)(inputNostr, bannedAuthors)).toEqual([]);
        // getSignersListedIn() with NostrSpasm whitelisted
        expect((0, index_js_1.getSignersListedIn)(inputNostrSpasmConverted, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputNostrSpasmConverted, whitelistedForActionPost)).toEqual(outputNostrSpasm);
        expect((0, index_js_1.getSignersListedIn)(inputNostrSpasmConverted, bannedAuthors)).toEqual([]);
        // getSignersListedIn() with web2
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, moderators)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, whitelistedForActionPost)).toEqual([]);
        expect((0, index_js_1.getSignersListedIn)(inputWeb2, bannedAuthors)).toEqual([]);
        // isAnySignerListedIn() with Dmp moderator and whitelisted
        expect((0, index_js_1.isAnySignerListedIn)(inputDmp, moderators)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmp, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmp, bannedAuthors)).toEqual(false);
        // isAnySignerListedIn() with Dmp banned
        expect((0, index_js_1.isAnySignerListedIn)(inputDmpBanned, moderators)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputDmpBanned, bannedAuthors)).toEqual(true);
        // isAnySignerListedIn() with Nostr whitelisted
        expect((0, index_js_1.isAnySignerListedIn)(inputNostr, moderators)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostr, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostrSpasmConverted, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostrSpasmConverted, whitelistedForActionPostWithNpub)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostrSpasmConverted, whitelistedForActionPostWithNpubAndHex)).toEqual(true);
        expect((0, index_js_1.isAnySignerListedIn)(inputNostr, bannedAuthors)).toEqual(false);
        // alias isAnyPubkeyListedIn()
        expect((0, index_js_1.isAnyPubkeyListedIn)(inputNostr, moderators)).toEqual(false);
        expect((0, index_js_1.isAnyPubkeyListedIn)(inputNostr, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.isAnyPubkeyListedIn)(inputNostr, bannedAuthors)).toEqual(false);
        // isAnySignerListedIn() with Nostr whitelisted
        expect((0, index_js_1.isAnySignerListedIn)(inputWeb2, moderators)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputWeb2, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.isAnySignerListedIn)(inputWeb2, bannedAuthors)).toEqual(false);
        // areAllSignersListedIn() with Dmp moderator and whitelisted
        expect((0, index_js_1.areAllSignersListedIn)(inputDmp, moderators)).toEqual(true);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmp, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmp, bannedAuthors)).toEqual(false);
        // areAllSignersListedIn() with Dmp banned
        expect((0, index_js_1.areAllSignersListedIn)(inputDmpBanned, moderators)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputDmpBanned, bannedAuthors)).toEqual(true);
        // alias areAllPubkeysListedIn()
        expect((0, index_js_1.areAllPubkeysListedIn)(inputDmpBanned, moderators)).toEqual(false);
        expect((0, index_js_1.areAllPubkeysListedIn)(inputDmpBanned, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.areAllPubkeysListedIn)(inputDmpBanned, bannedAuthors)).toEqual(true);
        // areAllSignersListedIn() with Nostr whitelisted
        expect((0, index_js_1.areAllSignersListedIn)(inputNostr, moderators)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputNostr, whitelistedForActionPost)).toEqual(true);
        expect((0, index_js_1.areAllSignersListedIn)(inputNostr, bannedAuthors)).toEqual(false);
        // areAllSignersListedIn() with Nostr whitelisted
        expect((0, index_js_1.areAllSignersListedIn)(inputWeb2, moderators)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputWeb2, whitelistedForActionPost)).toEqual(false);
        expect((0, index_js_1.areAllSignersListedIn)(inputWeb2, bannedAuthors)).toEqual(false);
    });
});
describe("getStatsByAction() tests", () => {
    test("getStatsByAction() should return a stat", () => {
        // Default is "react"
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats)).action).toEqual("react");
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "react").action).toEqual("react");
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "reply").action).toEqual("reply");
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "moderate")).toEqual(null);
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "react")).toEqual(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats.stats[0]);
        expect((0, index_js_1.getStatByAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "reply")).toEqual(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats.stats[1]);
    });
});
describe("getTotalOfReaction() tests", () => {
    test("getTotalOfReaction() should return a stat", () => {
        // Default is "upvote"
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats))).toEqual(8);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "upvote")).toEqual(8);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2), "upvote")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "downvote")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "bullish")).toEqual(5);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "bearish")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "important")).toEqual(6);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "scam")).toEqual(0);
        expect((0, index_js_1.getTotalOfReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats), "random")).toEqual(0);
    });
});
describe("getTotalOfMostPopularReaction() tests", () => {
    test("getTotalOfMostPopularReaction() should return a total of most popular reaction", () => {
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toEqual(0);
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats))).toEqual(8);
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2))).toEqual(11);
        expect((0, index_js_1.getTotalOfMostPopularReaction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew))).toEqual(26);
    });
});
describe("getTotalOfReply() tests", () => {
    test("getTotalOfReply() should return a total of most popular reaction", () => {
        expect((0, index_js_1.getTotalOfReact)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toEqual(0);
        expect((0, index_js_1.getTotalOfReply)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2))).toEqual(0);
        expect((0, index_js_1.getTotalOfReply)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats))).toEqual(3);
        expect((0, index_js_1.getTotalOfActionReply)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2))).toEqual(3);
        expect((0, index_js_1.getTotalOfReplyAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2))).toEqual(3);
        expect((0, index_js_1.getTotalOfAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew), "reply")).toEqual(18081);
        expect((0, index_js_1.getTotalOfAction)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew), "react")).toEqual(0);
    });
});
// getAllIdsFromArrayOfIdObjects()
describe("getAllIdsFromArrayOfIdObjects() tests", () => {
    test("getAllIdsFromArrayOfIdObjects() should return array of IDs", () => {
        const input = [
            { value: "123" },
            { value: "AbC", extra: "def" },
            { value: 456, meta: 789 },
            { value: true },
            { value: false },
            { value: [10, "11"] },
            { value: { value: "12" } },
        ];
        const output = ["123", "abc", 456];
        expect((0, index_js_1.getAllIdsFromArrayOfIdObjects)(input, true)).toStrictEqual(output);
    });
});
// getAllEventIds()
describe("getAllEventIds() tests", () => {
    test("getAllEventIds() should return array of IDs", () => {
        const input1 = _events_data_js_1.validNostrSpasmEventSignedOpened;
        const output1 = [
            "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
        ];
        expect((0, index_js_1.getAllEventIds)(input1, true)).toStrictEqual(output1);
        const input2 = _events_data_js_1.validSpasmWithDmpReplyToDmpEventV0;
        const output2 = [
            "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
            "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b"
        ];
        expect((0, index_js_1.getAllEventIds)(input2, true)).toStrictEqual(output2);
    });
});
// getAllParentIds()
describe("getAllParentIds() tests", () => {
    test("getAllParentIds() should return array of IDs", () => {
        const input = _events_data_js_1.validSpasmWithDmpReplyToDmpEventV0;
        const output = [input.target];
        expect((0, index_js_1.getAllParentIds)(input, true)).toStrictEqual(output);
    });
});
// toBeSpasmEventV2()
describe("toBeSpasmEventV2() function tests", () => {
    test("toBeSpasmEventV2() should return SpasmEventV2 or null", () => {
        const inputDmp = _events_data_js_1.validDmpEventSignedClosed;
        const inputNostr = _events_data_js_1.validNostrEventSignedOpened;
        const inputNostrSpasm = _events_data_js_1.validNostrSpasmEventSignedOpened;
        const outputDmp = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const outputNostr = _events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2;
        const outputNostrSpasm = _events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2;
        // Not SpasmEventV2 yet
        expect((0, index_js_1.toBeSpasmEventV2)(inputDmp)).toStrictEqual(outputDmp);
        expect((0, index_js_1.toBeSpasmEventV2)(inputNostr)).toStrictEqual(outputNostr);
        expect((0, index_js_1.toBeSpasmEventV2)(inputNostrSpasm)).toStrictEqual(outputNostrSpasm);
        // Already SpasmEventV2
        expect((0, index_js_1.toBeSpasmEventV2)(outputDmp)).toStrictEqual(outputDmp);
        expect((0, index_js_1.toBeSpasmEventV2)(outputNostr)).toStrictEqual(outputNostr);
        expect((0, index_js_1.toBeSpasmEventV2)(outputNostrSpasm)).toStrictEqual(outputNostrSpasm);
        // Other
        expect((0, index_js_1.toBeSpasmEventV2)("hello")).toStrictEqual(null);
    });
});
// getIdByFormat()
// extractIdByFormat() - alias
describe("getIdByFormat() tests", () => {
    test("getIdByFormat() get ID by format", () => {
        // Not converted to SpasmEventV2 yet
        const inputDmp = _events_data_js_1.validDmpEventSignedClosed;
        const inputNostr = _events_data_js_1.validNostrEventSignedOpened;
        const inputNostrSpasm = _events_data_js_1.validNostrSpasmEventSignedOpened;
        // Already converted to SpasmEvent2
        const inputDmpConverted = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const inputNostrConverted = _events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2;
        const inputNostrSpasmConverted = _events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2;
        // default format name and version
        expect((0, index_js_1.getIdByFormat)(inputDmp)).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostr)).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm)).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        expect((0, index_js_1.getIdByFormat)(inputDmpConverted)).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostrConverted)).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasmConverted)).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        // spasmid
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "spasmid" })).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "spasmid" })).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "spasmid" })).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        // alias
        expect((0, index_js_1.extractIdByFormat)(inputDmp, { name: "spasmid" })).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.extractIdByFormat)(inputNostr, { name: "spasmid" })).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.extractIdByFormat)(inputNostrSpasm, { name: "spasmid" })).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        // spasmid01
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "spasmid", version: "01" })).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "spasmid", version: "01" })).toStrictEqual("spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "spasmid", version: "01" })).toStrictEqual("spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c");
        expect((0, index_js_1.extractSpasmId01)(inputDmp)).toStrictEqual("spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f");
        // spasmid99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "spasmid", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "spasmid", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "spasmid", version: "99" })).toStrictEqual(null);
        // ethereum-sig
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "ethereum-sig" })).toStrictEqual("0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b");
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "ethereum-sig" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "ethereum-sig" })).toStrictEqual(null);
        // ethereum-sig99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "ethereum-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "ethereum-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "ethereum-sig", version: "99" })).toStrictEqual(null);
        // nostr-hex
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-hex" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-hex" })).toStrictEqual("4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65");
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-hex" })).toStrictEqual("db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651");
        // nostr-hex99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-hex", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-hex", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-hex", version: "99" })).toStrictEqual(null);
        // nostr-sig
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-sig" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-sig" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-sig" })).toStrictEqual("db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1");
        // nostr-sig99
        expect((0, index_js_1.getIdByFormat)(inputDmp, { name: "nostr-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostr, { name: "nostr-sig", version: "99" })).toStrictEqual(null);
        expect((0, index_js_1.getIdByFormat)(inputNostrSpasm, { name: "nostr-sig", version: "99" })).toStrictEqual(null);
    });
});
describe("getIdByFormat() tests", () => {
    test("getIdByFormat() get ID by format", () => {
        expect((0, index_js_1.getParentIdByFormat)(_events_data_js_1.validNostrReplyToDmpEvent, { name: "nostr-hex" })).toStrictEqual(null);
        expect((0, index_js_1.getParentIdByFormat)(_events_data_js_1.validNostrReplyToDmpEvent, { name: "nostr-sig" })).toStrictEqual(null);
        expect((0, index_js_1.extractParentSpasmId01)(_events_data_js_1.validNostrReplyToDmpEvent)).toStrictEqual(null);
        expect((0, index_js_1.extractParentIdByFormat)(_events_data_js_1.validNostrReplyToDmpEvent, { name: "ethereum-sig" })).toStrictEqual("0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b");
    });
});
describe("checkIfEventHasThisId() tests", () => {
    test("checkIfEventHasThisId() get ID by format", () => {
        // Not converted DMP
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual(true);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6e")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b")).toStrictEqual(true);
        // Converted Nostr
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807")).toStrictEqual(true);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27808")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual(false);
        expect((0, index_js_1.checkIfEventHasThisId)((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2), "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65")).toStrictEqual(true);
    });
});
describe("getEventById() tests", () => {
    test("getEventById() get ID by format", () => {
        // Not converted DMP
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ], "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened),
        ], "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], 
        // Wrong ID
        "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5652")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], null)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([], "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)({}, "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)(undefined, "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        expect((0, index_js_1.getEventById)(null, "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(null);
        // Short ID (not URL)
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20))).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20), 20)).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20), 20)).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20), 20)).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 19), 20)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 21), 20)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20), 21)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20), 19)).toStrictEqual(null);
        expect((0, index_js_1.getEventById)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 15), 15
        // Valid short ID should be at least 16 chars
        )).toStrictEqual(null);
    });
});
describe("getEventsByIds() tests", () => {
    test("getEventsByIds() get ID by format", () => {
        // Not converted DMP
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened),
        ], [
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            // NostrSpasm
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
            // DMP
            "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            // NostrSpasm
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            // NostrSpasm
            "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            // Wrong ID
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5652"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], [
            null
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([], [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)({}, [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)(undefined, [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)(null, [
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
        ])).toStrictEqual(null);
        // Short ID
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20)
        ])).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20)
        ], 19)).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 20)
        ], 20)).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[1].value.toString().slice(0, 20)
        ], 20)).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            "spasmid01192d1f9994b"
        ], 20)).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
        ]);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 19)
        ], 20)).toStrictEqual(null);
        expect((0, index_js_1.getEventsByIds)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2),
        ], [
            _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2.ids[0].value.toString().slice(0, 21)
        ], 20)).toStrictEqual(null);
    });
});
// mergeSpasmEventsV2()
describe("mergeSpasmEventsV2() tests", () => {
    test("mergeSpasmEventsV2() tests with null", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([null, (0, index_js_1.copyOf)(input)]))
            .toStrictEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            null, (0, index_js_1.copyOf)(input), (0, index_js_1.copyOf)(input)
        ])).toStrictEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([null, (0, index_js_1.copyOf)(input), null]))
            .toStrictEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input), null]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input), null, null]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(input), null, null, (0, index_js_1.copyOf)(input)
        ])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([null, null, null]))
            .toStrictEqual(null);
    });
    test("mergeSpasmEventsV2() should merge same DMP events", () => {
        const input1 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const input2 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpened);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)]))
            .toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.title)
            .toStrictEqual("genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same DMP events", () => {
        const input1 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        const input2 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input1)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])).toStrictEqual((0, index_js_1.copyOf)(output));
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])).not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.title).toStrictEqual("Nostr Spasm genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([(0, index_js_1.copyOf)(input1), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input2), (0, index_js_1.copyOf)(input1)])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with DMP siblings", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(input);
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input, input, input, input
        ]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input, input, input, input
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input, input, input, input
        ])?.title)
            .toStrictEqual("genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input, input, input, input, input])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with Nostr siblings", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(input);
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.content)
            .toStrictEqual("Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should merge same SpasmEventsV2 with NostrSpasm siblings", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(input);
        expect((0, index_js_1.mergeSpasmEventsV2)([input, input]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .toStrictEqual(output);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.title)
            .toStrictEqual("Nostr Spasm genesis");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            input, input, input,
            input, input, input
        ])?.siblings?.length)
            .toStrictEqual(1);
    });
    test("mergeSpasmEventsV2() should return the first event if events have different Spasm ID", () => {
        const input1 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent);
        const input2 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const input3 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpened);
        const input4 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        const input5 = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2);
        const input6 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent);
        const input7 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened);
        const input8 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2);
        const input9 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent);
        const input10 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        const input11 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        expect((0, index_js_1.mergeSpasmEventsV2)([input2, input1]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input2));
        expect((0, index_js_1.mergeSpasmEventsV2)([input3, input4]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input3));
        expect((0, index_js_1.mergeSpasmEventsV2)([input5, input6]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input5));
        expect((0, index_js_1.mergeSpasmEventsV2)([input7, input8]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input7));
        expect((0, index_js_1.mergeSpasmEventsV2)([input8, input9]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input8));
        expect((0, index_js_1.mergeSpasmEventsV2)([input9, input10]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input10));
        expect((0, index_js_1.mergeSpasmEventsV2)([input10, input11]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input10));
        expect((0, index_js_1.mergeSpasmEventsV2)([input11, input1]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input11));
        expect((0, index_js_1.mergeSpasmEventsV2)([input1, input2, input3, input4]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(input1));
    });
    test("mergeSpasmEventsV2() tests for merging unsigned with signed events, which have the same Spasm ID", () => {
        const dmpUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent);
        const dmpSigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const nostrUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent);
        const nostrSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened);
        const nostrSpasmUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent);
        const nostrSpasmSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        // DMP signed and unsigned events have different Spasm IDs
        // because unsigned events don't have a signer, which
        // affects the Spasm ID.
        // Since events have different Spasm IDs, they aren't merged.
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpUnsigned, dmpSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpUnsigned));
        // Signed and unsigned Nostr events have the same Spasm ID
        // so unsigned sibling is dropped in favor of a signed
        // sibling during merge.
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrUnsigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrUnsigned, nostrUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        // Not equal
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrSigned]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrSpasmSigned]))
            .not.toEqual(null);
    });
    test("mergeSpasmEventsV2() tests for merging events with different Spasm IDs", () => {
        const dmpUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent);
        const dmpSigned = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed);
        const nostrUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent);
        const nostrSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened);
        const nostrSpasmUnsigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEvent);
        const nostrSpasmSigned = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened);
        // DMP signed and unsigned events have different Spasm IDs
        // because unsigned events don't have a signer, which
        // affects the Spasm ID.
        // Since events have different Spasm IDs, they aren't merged.
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpUnsigned, dmpSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpSigned, dmpUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            dmpSigned, dmpUnsigned, dmpSigned, dmpUnsigned, dmpUnsigned
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpUnsigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(dmpUnsigned));
        // Signed and unsigned Nostr events have the same Spasm ID
        // so unsigned sibling is dropped in favor of a signed
        // sibling during merge.
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, nostrSpasmSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            nostrUnsigned, nostrSpasmUnsigned, nostrSpasmUnsigned
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrSigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, dmpUnsigned]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmUnsigned));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            nostrSpasmUnsigned, dmpSigned, dmpSigned
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(nostrSpasmUnsigned));
        // Not equal
        expect((0, index_js_1.mergeSpasmEventsV2)([dmpSigned, nostrSigned]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrUnsigned, dmpSigned]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([nostrSpasmUnsigned, nostrUnsigned]))
            .not.toEqual(null);
    });
    test("mergeSpasmEventsV2() tests for merging events with and without source", () => {
        const dmpConverted = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const dmpConvertedWithSource = {
            ...dmpConverted,
            source: "newsource.space"
        };
        const dmpConvertedWithAnotherSource = {
            ...dmpConverted,
            source: "anothersource.space"
        };
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConverted)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConverted)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithSource), (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithSource),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithSource),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSource)
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted),
            (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted),
            (0, index_js_1.copyOf)(dmpConvertedWithSource)
        ]))
            .not.toEqual(dmpConverted);
    });
    test("mergeSpasmEventsV2() tests for merging events with and without sharedBy", () => {
        const dmpConverted = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const dmpConvertedWithOneSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [{ value: "0x12345" }]
            }
        };
        const dmpConvertedWithTwoSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [{ value: "0x12345" }, { value: "0x67890" }]
            }
        };
        const dmpConvertedWithAnotherSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [{ value: "0xanother" }]
            }
        };
        const dmpConvertedWithThreeSharedBy = {
            ...dmpConverted,
            sharedBy: {
                ids: [
                    { value: "0x12345" },
                    { value: "0x67890" },
                    { value: "0xanother" }
                ]
            }
        };
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConverted)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConverted)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithOneSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithOneSharedBy)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted), (0, index_js_1.copyOf)(dmpConvertedWithTwoSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithTwoSharedBy)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConverted),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithAnotherSharedBy)));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(dmpConvertedWithOneSharedBy),
            (0, index_js_1.copyOf)(dmpConvertedWithTwoSharedBy),
            (0, index_js_1.copyOf)(dmpConvertedWithAnotherSharedBy)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(dmpConvertedWithThreeSharedBy)));
    });
    test("mergeSpasmEventsV2() tests for merging events with parent event", () => {
        const spasmParent = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2);
        const spasmReply = (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEvent);
        const spasmReplyWithSpasmParent = (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]))
            .toStrictEqual((0, index_js_1.copyOf)(spasmReplyWithSpasmParent));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]))
            .toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)((0, convertToSpasm_js_1.convertToSpasm)((0, index_js_1.copyOf)(spasmReplyWithSpasmParent))));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]).parent.event)
            .toStrictEqual((0, index_js_1.copyOf)(spasmParent));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(spasmReply), (0, index_js_1.copyOf)(spasmReplyWithSpasmParent)
        ]).parent.event?.title)
            .toStrictEqual("genesis");
    });
    test("mergeSpasmEventsV2() should merge events with stats", () => {
        const event1WithoutStats = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const event1WithStats = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats;
        const event1WithStatsOld = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld;
        const event1WithStatsNew = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew;
        const event2WithStats = _events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2;
        // Same event
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutStats),
            (0, index_js_1.copyOf)(event1WithoutStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutStats),
            (0, index_js_1.copyOf)(event1WithStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithoutStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event1WithoutStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsOld));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStatsNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsOld),
            (0, index_js_1.copyOf)(event1WithStatsNew)
        ]).stats[0].action)
            .toStrictEqual("react");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStatsNew),
            (0, index_js_1.copyOf)(event1WithStatsOld)
        ])).not.toEqual(null);
        // Merge with different event
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutStats),
            (0, index_js_1.copyOf)(event2WithStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutStats));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithStats),
            (0, index_js_1.copyOf)(event2WithStats)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithStats));
    });
    test("mergeSpasmEventsV2() should merge events with db", () => {
        const event1WithoutDb = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const event1WithDb = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb;
        const event1WithDbNew = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew;
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithoutDb)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutDb));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithDb)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithDb));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithDbNew));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutDb),
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ])).not.toEqual(null);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ]).db.key).toStrictEqual(1337);
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ]).db.table).toStrictEqual("spasm_events");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithDb),
            (0, index_js_1.copyOf)(event1WithDbNew)
        ]).db.updatedTimestamp).toStrictEqual(1642074686195);
    });
    test("mergeSpasmEventsV2() should merge events with children", () => {
        const event1WithoutChildren = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2;
        const event1WithOneChild = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild;
        const event1WithAnotherChild = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild;
        const event1WithAnotherChildWithoutEvent = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent;
        const event1WithBothChildren = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren;
        const event1WithBothChildrenReverse = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse;
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithoutChildren)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithoutChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithOneChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithOneChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithAnotherChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithBothChildren),
            (0, index_js_1.copyOf)(event1WithBothChildren)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithOneChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildren));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChild),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithoutChildren)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithBothChildrenReverse));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChildWithoutEvent),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithAnotherChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithAnotherChild),
            (0, index_js_1.copyOf)(event1WithAnotherChildWithoutEvent)
        ])).toStrictEqual((0, index_js_1.copyOf)(event1WithAnotherChild));
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ]).children[1].event?.content).toStrictEqual("To the moon!");
        expect((0, index_js_1.mergeSpasmEventsV2)([
            (0, index_js_1.copyOf)(event1WithoutChildren),
            (0, index_js_1.copyOf)(event1WithOneChild),
            (0, index_js_1.copyOf)(event1WithAnotherChild)
        ])).not.toEqual(null);
    });
});
// mergeDifferentSpasmEventsV2()
describe("mergeDifferentSpasmEventsV2() tests", () => {
    test("mergeDifferentSpasmEventsV2() tests with many events", () => {
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent)
        ])[0].title).toStrictEqual("genesis");
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent)
        ])[0]).not.toEqual(null);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedWithInvalidSignature),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            null, undefined, false, true, "hello world", 1, [], {},
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld)
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEventConvertedToSpasmV2)
        ]);
        expect((0, index_js_1.mergeDifferentSpasmEventsV2)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ])).toStrictEqual([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ]);
    });
});
// checkIfArrayHasThisEvent()
describe("checkIfArrayHasThisEvent() function tests", () => {
    test("checkIfArrayHasThisEvent()", () => {
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(null))).toStrictEqual(false);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(false);
        // Should return true because it's the same event, but one
        // is signed, while another one is unsigned
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
        expect((0, index_js_1.checkIfArrayHasThisEvent)([
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ], (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2))).toStrictEqual(true);
    });
});
// appendToArrayIfEventIsUnique()
// prependToArrayIfEventIsUnique()
describe("appendToArrayIfEventIsUnique() function tests", () => {
    test("appendToArrayIfEventIsUnique() should push to array", () => {
        const event1 = (0, index_js_1.copyOf)(_events_data_js_1.validRssItemWithEmojiConvertedToSpasmEvent2);
        const event2 = (0, index_js_1.copyOf)(_events_data_js_1.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2);
        const event3 = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2);
        const event3signed = (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2);
        const event4 = (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventBodySignedClosedV2);
        const array1 = [(0, index_js_1.copyOf)(event2), (0, index_js_1.copyOf)(event3)];
        expect(array1.length).toStrictEqual(2);
        (0, index_js_1.prependToArrayIfEventIsUnique)(array1, event1);
        expect(array1.length).toStrictEqual(3);
        expect(array1[0].content).toStrictEqual(event1.content);
        expect(array1[1].content).toStrictEqual(event2.content);
        expect(array1[2].content).toStrictEqual(event3.content);
        expect(array1[0]).toStrictEqual(event1);
        // Append without converting to SpasmEvent
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, event4, false, false);
        expect(array1.length).toStrictEqual(4);
        expect(array1[0].content).toStrictEqual(event1.content);
        expect(array1[1].content).toStrictEqual(event2.content);
        expect(array1[2].content).toStrictEqual(event3.content);
        // Event is unchanged
        expect(array1[3].type).toStrictEqual(event4.type);
        expect('content' in array1[3]).toStrictEqual(false);
        expect(array1[3]).toStrictEqual(event4);
        // Nothing happens when appending duplicate without merging
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event4), false, false);
        expect(array1.length).toStrictEqual(4);
        expect(array1[3].type).toStrictEqual(event4.type);
        expect('content' in array1[3]).toStrictEqual(false);
        expect(array1[3]).toStrictEqual(event4);
        // Re-inserting the same event, but converted to SpasmEvent
        array1.pop();
        expect(array1.length).toStrictEqual(3);
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event4));
        expect(array1.length).toStrictEqual(4);
        expect(array1[3]).toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(event4));
        // Nothing happens when inserting signed event without merging
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event3signed), false, false);
        expect(array1.length).toStrictEqual(4);
        expect('signatures' in array1[2]).toStrictEqual(false);
        expect(array1[2]).toStrictEqual(event3);
        // Unsigned event should be replaced with signed event
        // because merging is enabled by default
        (0, index_js_1.appendToArrayIfEventIsUnique)(array1, (0, index_js_1.copyOf)(event3signed));
        expect(array1.length).toStrictEqual(4);
        expect('signatures' in array1[2]).toStrictEqual(true);
        expect(array1[2]).toStrictEqual(event3signed);
        expect(array1[2]).not.toEqual(event3);
        // Final result
        expect(array1[0]).toStrictEqual(event1);
        expect(array1[1]).toStrictEqual(event2);
        expect(array1[2]).toStrictEqual(event3signed);
        expect(array1[3]).toStrictEqual((0, convertToSpasm_js_1.convertToSpasm)(event4));
    });
});
// mergeStatsV2()
describe("mergeStatsV2() function tests", () => {
    test("mergeStatsV2() should merge different stats", () => {
        const statReactOld = {
            action: "react",
            latestTimestamp: 1641077686178,
            latestDbTimestamp: 1644077686178,
            contents: [
                {
                    value: "upvote",
                    total: 2
                }
            ]
        };
        const statReactNew = {
            action: "react",
            latestTimestamp: 1642077686178,
            latestDbTimestamp: 1643077686178,
            contents: [
                {
                    value: "upvote",
                    total: 3
                },
                {
                    value: "downvote",
                    total: 1
                },
            ]
        };
        const statReplyOld = {
            action: "reply",
            latestTimestamp: 1641087686178,
            latestDbTimestamp: 1644087686178,
            total: 15
        };
        const statReplyNew = {
            action: "reply",
            latestTimestamp: 1642087686178,
            latestDbTimestamp: 1643087686178,
            total: 23
        };
        const statsReactOld = [statReactOld];
        const statsReactNew = [statReactNew];
        const statsReplyOld = [statReplyOld];
        const statsReplyNew = [statReplyNew];
        const statsAllOld = [statReactOld, statReplyOld];
        const statsAllMix = [statReactOld, statReplyNew];
        const statsAllNew = [statReactNew, statReplyNew];
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReactOld), (0, index_js_1.copyOf)(statsReactNew)
        ])[0].action).toStrictEqual("react");
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReactOld), (0, index_js_1.copyOf)(statsReactNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsReactNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReplyOld), (0, index_js_1.copyOf)(statsReplyNew)
        ])[0].action).toStrictEqual("reply");
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReplyOld), (0, index_js_1.copyOf)(statsReplyNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsReplyNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllOld));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllMix)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllMix));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllMix),
            (0, index_js_1.copyOf)(statsAllNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllMix), (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllMix));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllMix), (0, index_js_1.copyOf)(statsAllOld),
            (0, index_js_1.copyOf)(statsAllOld), (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllMix));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllNew), (0, index_js_1.copyOf)(statsAllNew)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsReactNew), (0, index_js_1.copyOf)(statsAllMix)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllNew));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllOld));
        expect((0, index_js_1.mergeStatsV2)([
            (0, index_js_1.copyOf)(statsAllOld), null
        ])).toStrictEqual((0, index_js_1.copyOf)(statsAllOld));
        expect((0, index_js_1.mergeStatsV2)([
            null, (0, index_js_1.copyOf)(statsAllOld)
        ])).toStrictEqual(null);
    });
});
// addEventsToTree()
describe("addEventsToTree() function tests", () => {
    test("addEventsToTree() should return original event if no tree events were provided", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2), [])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
    });
    test("addEventsToTree() should add one comment to an event without any comments", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2), [(0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild));
    });
    test("addEventsToTree() should add one comment to an event with a child without an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent), [(0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild));
    });
    test("addEventsToTree() should add one comment to an event with a child without an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent), [(0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)])).not.toEqual(null);
    });
    test("addEventsToTree() should add two comments to an event with a child without an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent), [
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse));
    });
    test("addEventsToTree() should add two comments to an event without any children", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), [
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren));
    });
    test("addEventsToTree() should add attach only related events", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed), [
            // Add many unrelated events
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrEvent),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpened),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren));
    });
    test("addEventsToTree() should only add related parent event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2), [
            // unrelated
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2));
    });
    test("addEventsToTree() should add a parent event to an event", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2), [
            // unrelated
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2),
            // related
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2)
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent));
    });
    test("addEventsToTree() should add two comments to an event without any children", () => {
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            // No events should be attached because maxDepth is 0
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 0 // maxDepth
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            // No events should be attached, depth is already max
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 10, // maxDepth
        true, // ifRecursively
        10 // depth (current)
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            // No events should be attached because direction is up
            // so only parent or root can be attached.
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 10, // maxDepth
        true, // ifRecursively
        0, // depth (current)
        "up")).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            // Depth2 should not be attached because maxDepth is 1
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 1 // maxDepth
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            // Depth2 should not be attached since recursion disabled
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ], 10, // maxDepth
        false // ifRecursively
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            // No events merged because merge is disabled
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1),
        ], 10, // maxDepth
        true, // ifRecursively
        0, // depth (current)
        "any", // direction
        false // ifMerge
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Try to add many duplicate relatives
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Try many related and unrelated events
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosed),
            (0, index_js_1.copyOf)(_events_data_js_1.validPostWithRssItemTitleHasSpecialChars),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply2Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1React1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply2),
            false,
            null,
            [],
            { id: 18081 },
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Add the same event
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2));
        // Merge if events have the same ID
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2));
        // Merge if events have the same ID
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus2), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus4));
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
        ]
        // No events should be added because depth 2 is missing
        )).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth0_Plus1));
        // Add parent and children any direction (up and down)
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus1));
        // Add parent and children any direction (up and down)
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1), [
            // order matters
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth0_Post1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth4_Post1Reply1Reply1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus2));
        // Test direction to avoid adding
        // parent to child to parent to child to parent
        expect((0, index_js_1.addEventsToTree)((0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1), [
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth1_Post1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth3_Post1Reply1Reply1Reply1),
            (0, index_js_1.copyOf)(_events_data_js_1.validSpasmEventV2TreeDepth2_Post1Reply1Reply1),
        ])).toStrictEqual((0, index_js_1.copyOf)(_events_data_js_1.validSpasmTreeV2Depth2_Plus1));
    });
});
// assignFormats()
describe("assignFormats() function tests", () => {
    test("assignFormats() should assign formats", () => {
        const input = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        const output = (0, index_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2);
        (0, index_js_1.assignFormats)(input);
        expect(input).toStrictEqual(output);
    });
});
// toBeShortTimestamp()
describe("toBeShortTimestamp() function tests", () => {
    test("toBeShortTimestamp() should return short timestamp", () => {
        expect((0, index_js_1.toBeShortTimestamp)(1641074686178))
            .toStrictEqual(1641074686);
        expect((0, index_js_1.toBeShortTimestamp)("1641074686178"))
            .toStrictEqual(1641074686);
        expect((0, index_js_1.toBeNostrTimestamp)(1641074686))
            .toStrictEqual(1641074686);
        expect((0, index_js_1.toBeNostrTimestamp)("1641074686"))
            .toStrictEqual(1641074686);
    });
});
// isHex()
// isNostrHex()
describe("isHex() and isNostrHex() function tests", () => {
    test("isHex() tests", () => {
        expect((0, index_js_1.isHex)(null)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(undefined)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(true)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(false)).toStrictEqual(false);
        expect((0, index_js_1.isHex)([1, 2, 3])).toStrictEqual(false);
        expect((0, index_js_1.isHex)(123)).toStrictEqual(false);
        expect((0, index_js_1.isHex)(0)).toStrictEqual(false);
        expect((0, index_js_1.isHex)({ id: 1 })).toStrictEqual(false);
        expect((0, index_js_1.isHex)("")).toStrictEqual(false);
        expect((0, index_js_1.isHex)("0")).toStrictEqual(true);
        expect((0, index_js_1.isHex)("0123456789abcdef")).toStrictEqual(true);
        expect((0, index_js_1.isHex)("0123456789abcdefg")).toStrictEqual(false);
        expect((0, index_js_1.isHex)("https://degenrocket.space")).toStrictEqual(false);
        expect((0, index_js_1.isHex)("2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42")).toStrictEqual(true);
        expect((0, index_js_1.isHex)("db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(true);
    });
    test("isNostrHex() tests", () => {
        expect((0, index_js_1.isNostrHex)(null)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(undefined)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(true)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(false)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)([1, 2, 3])).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(123)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)(0)).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)({ id: 1 })).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("0")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("0123456789abcdef")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("0123456789abcdefg")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("https://degenrocket.space")).toStrictEqual(false);
        expect((0, index_js_1.isNostrHex)("2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42")).toStrictEqual(true);
        expect((0, index_js_1.isNostrHex)("db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651")).toStrictEqual(true);
    });
});
// template()
describe("template() function tests", () => {
    test("template() should return true if true", () => {
        const input = true;
        const output = true;
        expect(input).toStrictEqual(output);
    });
});
//# sourceMappingURL=utils.test.js.map