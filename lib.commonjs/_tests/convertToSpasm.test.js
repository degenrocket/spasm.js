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
    test("should return null if signed Dmp events have invalid signatures", () => {
        const inputValid = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed)),
            signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        };
        const inputValid1 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpened)),
            signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        };
        const inputInvalid1 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed)),
            signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71c"
        };
        const inputInvalid2 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed)),
            signature: "dmp-invalid-signature"
        };
        const inputInvalid3 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed)),
            signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fb"
        };
        const inputInvalid4 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed)),
            signer: "dmp-invalid-signer"
        };
        // const inputInvalid5 = {
        //   ...JSON.parse(JSON.stringify(validDmpEventSignedClosed)),
        //   signature: ""
        // };
        const inputInvalid6 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed)),
            signer: ""
        };
        const inputInvalid7 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosed)),
            signature: "dmp-invalid-signature",
            signer: "dmp-invalid-signer"
        };
        // const inputInvalid8 = {
        //   ...JSON.parse(JSON.stringify(validDmpEventSignedClosed)),
        //   signature: "",
        //   signer: ""
        // };
        const inputInvalid9 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpened)),
            signature: "dmp-invalid-signature",
            signer: "dmp-invalid-signer"
        };
        const outputValid = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedClosedConvertedToSpasmV2));
        const outputValid1 = JSON.parse(JSON.stringify(_events_data_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(inputValid)).toEqual(outputValid);
        expect((0, convertToSpasm_1.convertToSpasm)(inputValid1)).toEqual(outputValid1);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid1)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid2)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid3)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid4)).toEqual(null);
        // expect(convertToSpasm(inputInvalid5)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid6)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid7)).toEqual(null);
        // expect(convertToSpasm(inputInvalid8)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid9)).toEqual(null);
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
    // NostrEventSignedOpened to V2
    test("should return null if validNostrEventSignedOpened has invalid signature", () => {
        const inputValid = {
            ...JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpened)),
            sig: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"
        };
        const inputInvalid1 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpened)),
            sig: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009263"
        };
        const inputInvalid2 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpened)),
            sig: "nostr-sig-123"
        };
        const outputValid = JSON.parse(JSON.stringify(_events_data_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        // const output = null;
        expect((0, convertToSpasm_1.convertToSpasm)(inputValid)).toEqual(outputValid);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid1)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid2)).toEqual(null);
    });
    // NostrSpasmEventSignedOpened to V2
    test("should convert validNostrSpasmEventSignedOpened to Spasm", () => {
        const input = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpened));
        const output = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(input)).toEqual(output);
    });
    // NostrSpasmEventSignedOpened to V2
    test("should return null if validNostrSpasmEventSignedOpened has invalid signature", () => {
        const inputValid = {
            ...JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpened)),
            sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
        };
        const inputInvalid1 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpened)),
            sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f2"
        };
        const inputInvalid2 = {
            ...JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpened)),
            sig: "nostr-spasm-sig-123"
        };
        const outputValid = JSON.parse(JSON.stringify(_events_data_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        expect((0, convertToSpasm_1.convertToSpasm)(inputValid)).toEqual(outputValid);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid1)).toEqual(null);
        expect((0, convertToSpasm_1.convertToSpasm)(inputInvalid2)).toEqual(null);
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