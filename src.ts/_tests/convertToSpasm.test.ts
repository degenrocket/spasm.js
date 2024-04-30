import {
  // DMP
  validDmpEvent,
  validDmpEventSignedClosed,
  validDmpEventSignedOpened,
  validSpasmDmpEventSignedClosedV0,

  // DMP converted to SpasmEventV2
  validDmpEventConvertedToSpasmEventV2,
  validDmpEventSignedClosedConvertedToSpasmV2,
  validDmpEventSignedOpenedConvertedToSpasmV2,
  validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2,

  // Nostr
  validNostrEvent,
  validNostrSpasmEvent,
  validNostrEventSignedOpened,
  validNostrSpasmEventSignedOpened,
  validSpasmNostrEventSignedOpenedV0,
  validSpasmNostrSpasmEventSignedOpenedV0,

  // Nostr converted to Spasm V2
  validNostrEventConvertedToSpasmV2,
  validNostrSpasmEventConvertedToSpasmV2,
  validNostrEventSignedOpenedConvertedToSpasmV2,
  validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
  validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2,
  validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2,

  // RSS items V2
  validSpasmEventRssItemV0,
  validSpasmEventRssItemV0ConvertedToSpasmV2
} from "./_events-data"
import { convertToSpasm } from "./../convert/convertToSpasm"

describe("convertToSpasm tests", () => {
  test("should return true if true", () => {
    expect(true).toBe(true);
  });
});

// convertToSpasm() for DMP events
describe("convertToSpasm() tests for DMP events", () => {
  // DmpEvent to V2
  test("should convert validDmpEvent to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validDmpEvent));
    const output = JSON.parse(JSON.stringify(validDmpEventConvertedToSpasmEventV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // DmpEventSignedClosed to V2
  test("should convert validDmpEventSignedClosed to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedClosed));
    const output = JSON.parse(JSON.stringify(validDmpEventSignedClosedConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // DmpEventSignedOpened to V2
  test("should convert validDmpEventSignedOpened to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // SpasmDmpEventSignedClosedV0 to V2
  // validPostWithDmpEventSignedClosed - old name
  // validSpasmDmpEventSignedClosedV0 - new name
  test("should convert validSpasmDmpEventSignedClosedV0 to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validSpasmDmpEventSignedClosedV0));
    const output = JSON.parse(JSON.stringify(validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });
});

// convertToSpasm() for Nostr events
describe("convertToSpasm() tests for Nostr events", () => {
  // NostrEvent to V2
  test("should convert validNostrEvent to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validNostrEvent));
    const output = JSON.parse(JSON.stringify(validNostrEventConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // NostrSpasmEvent to V2
  test("should convert validNostrSpasmEvent to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEvent));
    const output = JSON.parse(JSON.stringify(validNostrSpasmEventConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // NostrEventSignedOpened to V2
  test("should convert validNostrEventSignedOpened to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // NostrSpasmEventSignedOpened to V2
  test("should convert validNostrSpasmEventSignedOpened to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // PostWithNostrEventSignedOpened - old name
  // SpasmNostrEventSignedOpenedV0 - new name
  test("should convert validSpasmNostrEventSignedOpenedV0 to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validSpasmNostrEventSignedOpenedV0));
    const output = JSON.parse(JSON.stringify(validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // PostWithNostrSpasmEventSignedOpened - old name
  // SpasmNostrSpasmEventSignedOpenedV0 - new name
  test("should convert SpasmNostrSpasmEventSignedOpenedV0 to SpasmEventV2", () => {
    const input = JSON.parse(JSON.stringify(validSpasmNostrSpasmEventSignedOpenedV0));
    const output = JSON.parse(JSON.stringify(validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
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
    const input = JSON.parse(JSON.stringify(validSpasmEventRssItemV0));
    const output = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));
    expect(convertToSpasm(input)).toEqual(output);
  });
});
