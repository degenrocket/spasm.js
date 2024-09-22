"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertToSpasmEventEnvelope_js_1 = require("./../convert/convertToSpasmEventEnvelope.js");
const _events_data_js_1 = require("./_events-data.js");
// Different events
describe("convertToSpasmEventDatabase() tests", () => {
    test("should convert different events to SpasmEventDatabaseV2", () => {
        // Dmp
        const inputDmp0 = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventConvertedToSpasmEventV2));
        const inputDmp1 = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2));
        const inputDmp2 = JSON.parse(JSON.stringify(_events_data_js_1.validDmpEventSignedOpenedConvertedToSpasmV2));
        const inputDmp3 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2));
        // Nostr
        const inputNostr0 = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventConvertedToSpasmV2));
        const inputNostr1 = JSON.parse(JSON.stringify(_events_data_js_1.validNostrEventSignedOpenedConvertedToSpasmV2));
        const inputNostr2 = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventConvertedToSpasmV2));
        const inputNostr3 = JSON.parse(JSON.stringify(_events_data_js_1.validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
        const inputNostr4 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2));
        const inputNostr5 = JSON.parse(JSON.stringify(_events_data_js_1.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2));
        // Valid
        const outputValid = (input) => {
            // Only keep fields which are used by envelope
            const { ids, siblings, db, source, stats, sharedBy } = input;
            const envelope = {
                ids, siblings, db, source, stats, sharedBy
            };
            return JSON.parse(JSON.stringify({
                ...envelope,
                type: "SpasmEventEnvelopeV2"
            }));
        };
        // Invalid
        const outputInvalidType = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventV2"
            }));
        };
        const outputInvalidParent = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                parent: { ids: [{ value: "invalid-parent-id" }] }
            }));
        };
        const outputInvalidAction = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                action: "moderate"
            }));
        };
        const outputInvalidTitle = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                title: "invalid-title"
            }));
        };
        const outputInvalidContent = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                content: "invalid-content"
            }));
        };
        const outputInvalidTimestamp = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                timestamp: 1234567890
            }));
        };
        const outputInvalidAuthors = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                authors: [
                    { addresses: [{ value: "invalid-author-address" }] }
                ]
            }));
        };
        const outputInvalidAuthorsVerified = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                authors: [
                    {
                        addresses: [
                            {
                                value: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
                                format: { name: "ethereum-pubkey" }
                                // verified: true
                            }
                        ]
                    }
                ]
            }));
        };
        const outputInvalidCategories = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                categories: [{ name: "invalid-category" }]
            }));
        };
        const outputInvalidTips = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                tips: [{ address: "invalid-tips-address" }]
            }));
        };
        const outputInvalidHosts = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                hosts: [{ value: "invalid-host-value" }]
            }));
        };
        const outputInvalidLinks = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                links: [{ value: "invalid-link-value" }]
            }));
        };
        const outputInvalidKeywords = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                keywords: ["invalid-keyword"]
            }));
        };
        const outputInvalidTags = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                tags: ["invalid-tag"]
            }));
        };
        const outputInvalidMedias = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                medias: [{ ids: "invalid-media-id" }]
            }));
        };
        const outputInvalidReferences = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                references: [{ ids: "invalid-tips-address" }]
            }));
        };
        const outputInvalidMentions = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                mentions: [{ address: "invalid-mention-address" }]
            }));
        };
        const outputInvalidProofs = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                proofs: [{ value: "invalid-proof-value" }]
            }));
        };
        const outputInvalidLicense = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                license: "invalid-license"
            }));
        };
        const outputInvalidLanguage = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                language: [{ value: "invalid-language" }]
            }));
        };
        const outputInvalidExtra = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                extra: { one: "invalid-extra" }
            }));
        };
        const outputInvalidPows = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                pows: [{ nonce: "invalid-pow-nonce" }]
            }));
        };
        const outputInvalidIds = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                ids: [{ value: "invalid-id-value" }]
            }));
        };
        const outputInvalidSignatures = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                signatures: [{ value: "invalid-signature-value" }]
            }));
        };
        const outputInvalidSiblings = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                siblings: [{ type: "SiblingSpasmV2" }]
            }));
        };
        const outputInvalidSource = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                source: "invalid-source"
            }));
        };
        const outputInvalidSharedBy = (input) => {
            return JSON.parse(JSON.stringify({
                ...outputValid(input),
                type: "SpasmEventDatabaseV2",
                sharedBy: [{ ids: [
                            { value: "invalid-sharedBy-id-value" }
                        ] }]
            }));
        };
        const testAll = (input) => {
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).toStrictEqual(outputValid(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidType(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidParent(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidAction(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidTitle(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidContent(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidTimestamp(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidAuthors(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidAuthorsVerified(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidCategories(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidTips(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidHosts(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidLinks(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidKeywords(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidTags(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidMedias(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidReferences(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidMentions(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidProofs(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidLicense(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidLanguage(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidExtra(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidPows(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidIds(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidSignatures(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidSiblings(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidSource(input));
            expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(input)).not.toEqual(outputInvalidSharedBy(input));
        };
        testAll(inputDmp0);
        testAll(inputDmp1);
        testAll(inputDmp2);
        testAll(inputDmp3);
        testAll(inputNostr0);
        testAll(inputNostr1);
        testAll(inputNostr2);
        testAll(inputNostr3);
        testAll(inputNostr4);
        testAll(inputNostr5);
    });
});
describe("convertToSpasmEventDatabase() tests", () => {
    test("should convert SpasmEventV0 (Post) with stats to SpasmEventDatabaseV2", () => {
        // Dmp
        const inputDmp0 = JSON.parse(JSON.stringify((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(_events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmV2)));
        const outputDmp = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2;
        expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(inputDmp0)).toStrictEqual(outputDmp);
    });
    test("should return SpasmEventDatabaseV2 if event is already SpasmEventDatabaseV2", () => {
        // Dmp
        const inputDmp = _events_data_js_1.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2;
        expect((0, convertToSpasmEventEnvelope_js_1.convertToSpasmEventEnvelope)(inputDmp)).toStrictEqual(inputDmp);
    });
});
//# sourceMappingURL=convertToSpasmEventEnvelope.test.js.map