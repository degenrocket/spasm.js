"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {SpasmEventAuthorV2} from '../types/interfaces';
const index_1 = require("./../utils/index");
const _events_data_1 = require("./_events-data");
const _events_data_2 = require("./_events-data");
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
// getHashOfString()
describe("getHashOfString() function tests", () => {
    test("should return valid hash", () => {
        // const input = {};
        expect((0, index_1.getHashOfString)("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        expect((0, index_1.getHashOfString)("hello world")).toBe("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9");
        expect((0, index_1.getHashOfString)("1234567890-=!@#$%^&*()_+")).toBe("37af4cc38359f092b705241b286aaabf42aa6054fcb70016e971d63f9470793b");
        expect((0, index_1.getHashOfString)('<br>line<div class="main">Main text</div>')).toBe("ca5588d79172608051a13af3f6692e656179ab0e1a4e6153ef5eb969687c4330");
        expect((0, index_1.getHashOfString)("<br>line<div class='main'>Main text</div>")).toBe("6f7c80389ac8d9e6a5ce20539c569fcf7ab20b056f4b41cacfab391200472ec4");
        // Japanese
        expect((0, index_1.getHashOfString)("ハローワールド")).toBe("9b58f66ce16f8efa41f9ea5fcc767ae639bb1ee83849efc1400da3832c6bff90");
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
        expect((0, index_1.keepTheseKeysInObject)(input, ["id"])).toStrictEqual(output1);
        expect((0, index_1.keepTheseKeysInObject)(input, ["addresses", "usernames"])).toStrictEqual(output2);
        expect((0, index_1.keepTheseKeysInObject)(input, ["version", "invalid"])).toStrictEqual(output3);
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
        expect((0, index_1.keepTheseKeysInObjectsInArray)(input, ["id"])).toStrictEqual(output1);
        expect((0, index_1.keepTheseKeysInObjectsInArray)(input, ["addresses", "usernames"])).toStrictEqual(output2);
        expect((0, index_1.keepTheseKeysInObjectsInArray)(input, ["version", "invalid"])).toStrictEqual(output3);
    });
});
// sortArrayOfStringsAndNumbers()
describe("sortArrayOfStringsAndNumbers() function tests", () => {
    test("should return sorted array", () => {
        const input = ["1", 3, ["invalid", 0], undefined, null, { a: 69, b: 420, c: { d: "invalid again" } }, 2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4"];
        const output = ["1", 2, 3, "3a", "3ab", "4", "5", "abc1", "abc2", "abcd", ["invalid", 0], undefined, null, { a: 69, b: 420, c: { d: "invalid again" } }];
        expect((0, index_1.sortArrayOfStringsAndNumbers)(input)).toStrictEqual(output);
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
        expect((0, index_1.sortArrayOfObjects)(input, ["id", "value", "title"])).toStrictEqual(output);
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
        expect((0, index_1.sortAuthorsForSpasmEventV2)(input)).toStrictEqual(output);
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
        expect((0, index_1.sortMediasForSpasmid01)(input)).toStrictEqual(output);
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
        expect((0, index_1.sortParentForSpasmid01)(input)).toStrictEqual(output);
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
        expect((0, index_1.sortReferencesForSpasmid01)(input)).toStrictEqual(output);
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
        expect((0, index_1.sortTagsForSpasmid01)(input)).toStrictEqual(output);
    });
});
//# sourceMappingURL=utils.test.js.map