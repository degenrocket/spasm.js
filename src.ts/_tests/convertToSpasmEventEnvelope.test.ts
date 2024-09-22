import {
  SpasmEventV2
} from "../types/interfaces.js";
import {
  convertToSpasmEventEnvelope
} from "./../convert/convertToSpasmEventEnvelope.js"
import {
  validDmpEventConvertedToSpasmEventV2,
  validDmpEventSignedClosedConvertedToSpasmV2,
  validDmpEventSignedOpenedConvertedToSpasmV2,
  validNostrEventConvertedToSpasmV2,
  validNostrEventSignedOpenedConvertedToSpasmV2,
  validNostrSpasmEventConvertedToSpasmV2,
  validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
  validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2,
  validPostWithDmpEventSignedClosedConvertedToSpasmV2,
  validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2,
  validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2,
  validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2
} from "./_events-data.js";

// Different events
describe("convertToSpasmEventDatabase() tests", () => {
  test("should convert different events to SpasmEventDatabaseV2", () => {
    // Dmp
    const inputDmp0 = JSON.parse(JSON.stringify(validDmpEventConvertedToSpasmEventV2));
    const inputDmp1 = JSON.parse(JSON.stringify(validDmpEventSignedClosedConvertedToSpasmV2));
    const inputDmp2 = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    const inputDmp3 = JSON.parse(JSON.stringify(validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2));

    // Nostr
    const inputNostr0 = JSON.parse(JSON.stringify(validNostrEventConvertedToSpasmV2));
    const inputNostr1 = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV2));
    const inputNostr2 = JSON.parse(JSON.stringify(validNostrSpasmEventConvertedToSpasmV2));
    const inputNostr3 = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputNostr4 = JSON.parse(JSON.stringify(validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2));
    const inputNostr5 = JSON.parse(JSON.stringify(validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2));

    // Valid
    const outputValid = (input: SpasmEventV2) => {
      // Only keep fields which are used by envelope
      const { ids, siblings, db, source, stats, sharedBy } = input
      const envelope = {
        ids, siblings, db, source, stats, sharedBy
      }
      return JSON.parse(JSON.stringify(
        {
          ...envelope,
          type: "SpasmEventEnvelopeV2"
        }
      ));
    }

    // Invalid
    const outputInvalidType = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventV2"
        }
      ));
    }
    const outputInvalidParent = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          parent: {ids: [{value: "invalid-parent-id"}]}
        }
      ));
    }
    const outputInvalidAction = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          action: "moderate"
        }
      ));
    }
    const outputInvalidTitle = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          title: "invalid-title"
        }
      ));
    }
    const outputInvalidContent = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          content: "invalid-content"
        }
      ));
    }
    const outputInvalidTimestamp = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          timestamp: 1234567890
        }
      ));
    }
    const outputInvalidAuthors = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          authors: [
            { addresses: [ { value: "invalid-author-address" } ] }
          ]
        }
      ));
    }
    const outputInvalidAuthorsVerified = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
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
        }
      ));
    }
    const outputInvalidCategories = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          categories: [ { name: "invalid-category" } ]
        }
      ));
    }
    const outputInvalidTips = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          tips: [ { address: "invalid-tips-address" } ]
        }
      ));
    }
    const outputInvalidHosts = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          hosts: [ { value: "invalid-host-value" } ]
        }
      ));
    }
    const outputInvalidLinks = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          links: [ { value: "invalid-link-value" } ]
        }
      ));
    }
    const outputInvalidKeywords = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          keywords: [ "invalid-keyword" ]
        }
      ));
    }
    const outputInvalidTags = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          tags: [ "invalid-tag" ]
        }
      ));
    }
    const outputInvalidMedias = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          medias: [ { ids: "invalid-media-id" } ]
        }
      ));
    }
    const outputInvalidReferences = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          references: [ { ids: "invalid-tips-address" } ]
        }
      ));
    }
    const outputInvalidMentions = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          mentions: [ { address: "invalid-mention-address" } ]
        }
      ));
    }
    const outputInvalidProofs = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          proofs: [ { value: "invalid-proof-value" } ]
        }
      ));
    }
    const outputInvalidLicense = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          license: "invalid-license"
        }
      ));
    }
    const outputInvalidLanguage = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          language: [ { value: "invalid-language" } ]
        }
      ));
    }
    const outputInvalidExtra = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          extra: { one: "invalid-extra" }
        }
      ));
    }
    const outputInvalidPows = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          pows: [ { nonce: "invalid-pow-nonce" } ]
        }
      ));
    }
    const outputInvalidIds = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          ids: [ { value: "invalid-id-value" } ]
        }
      ));
    }
    const outputInvalidSignatures = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          signatures: [ { value: "invalid-signature-value" } ]
        }
      ));
    }
    const outputInvalidSiblings = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          siblings: [ { type: "SiblingSpasmV2" } ]
        }
      ));
    }
    const outputInvalidSource = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          source: "invalid-source"
        }
      ));
    }
    const outputInvalidSharedBy = (input: SpasmEventV2) => {
      return JSON.parse(JSON.stringify(
        {
          ...outputValid(input),
          type: "SpasmEventDatabaseV2",
          sharedBy: [ { ids: [
            { value: "invalid-sharedBy-id-value" }
          ] } ]
        }
      ));
    }
    const testAll = (input: any) => {
      expect(convertToSpasmEventEnvelope(input)).toStrictEqual(outputValid(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidType(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidParent(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidAction(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidTitle(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidContent(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidTimestamp(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidAuthors(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidAuthorsVerified(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidCategories(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidTips(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidHosts(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidLinks(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidKeywords(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidTags(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidMedias(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidReferences(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidMentions(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidProofs(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidLicense(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidLanguage(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidExtra(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidPows(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidIds(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidSignatures(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidSiblings(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidSource(input));
      expect(convertToSpasmEventEnvelope(input)).not.toEqual(outputInvalidSharedBy(input));
    }

    testAll(inputDmp0)
    testAll(inputDmp1)
    testAll(inputDmp2)
    testAll(inputDmp3)
    testAll(inputNostr0)
    testAll(inputNostr1)
    testAll(inputNostr2)
    testAll(inputNostr3)
    testAll(inputNostr4)
    testAll(inputNostr5)

  });
});

describe("convertToSpasmEventDatabase() tests", () => {
  test("should convert SpasmEventV0 (Post) with stats to SpasmEventDatabaseV2", () => {
    // Dmp
    const inputDmp0 = JSON.parse(JSON.stringify(
      convertToSpasmEventEnvelope(
        validPostWithDmpEventSignedClosedConvertedToSpasmV2
      )
    ));
    const outputDmp = validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2
    expect(convertToSpasmEventEnvelope(inputDmp0)).toStrictEqual(outputDmp);
  });

  test("should return SpasmEventDatabaseV2 if event is already SpasmEventDatabaseV2", () => {
    // Dmp
    const inputDmp = validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2
    expect(
      convertToSpasmEventEnvelope(inputDmp)
    ).toStrictEqual(inputDmp);
  });
});
