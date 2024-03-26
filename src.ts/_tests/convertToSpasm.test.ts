import {
  // DMP
  validDmpEvent,
  validDmpEventSignedClosed,
  validDmpEventSignedOpened,
  validPostWithDmpEventSignedClosed,

  // DMP converted to Spasm
  validDmpEventConvertedToSpasm,
  validDmpEventSignedClosedConvertedToSpasm,
  validDmpEventSignedOpenedConvertedToSpasm,
  validPostWithDmpEventSignedClosedConvertedToSpasm,

  // Nostr
  validNostrEvent,
  validNostrSpasmEvent,
  validNostrEventSignedOpened,
  validNostrSpasmEventSignedOpened,
  validPostWithNostrEventSignedOpened,
  validPostWithNostrSpasmEventSignedOpened,

  // Nostr converted to Spasm
  validNostrEventConvertedToSpasmV1_0_0,
  validNostrSpasmEventConvertedToSpasmV1_0_0,
  validNostrEventSignedOpenedConvertedToSpasmV1_0_0,
  validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0,
  validPostWithNostrEventSignedOpenedConvertedToSpasmV1_0_0,
  validPostWithNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0,

  // Replies
  validNostrReplyToDmpEvent,
  validNostrReplyToDmpEventConvertedToSpasmV1_0_0,

  // RSS items
  validPostWithRssItem,
  validPostWithRssItemConvertedToSpasmV1_0_0
} from "./_events-data"
import { convertToSpasm } from "./../convert/convertToSpasm"

describe("convertToSpasm tests", () => {
  test("should return true if true", () => {
    expect(true).toBe(true);
  });
});

// convertToSpasm() for DMP events
describe("convertToSpasm() tests for DMP events", () => {
  // DmpEvent
  test("should convert DmpEvent to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validDmpEvent));
    const output = JSON.parse(JSON.stringify(validDmpEventConvertedToSpasm));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // DmpEventSignedClosed
  test("should convert DmpEventSignedClosed to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedClosed));
    const output = JSON.parse(JSON.stringify(validDmpEventSignedClosedConvertedToSpasm));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // DmpEventSignedOpened
  test("should convert DmpEventSignedOpened to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasm));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // PostWithDmpEventSignedClosed
  test("should convert PostWithDmpEventSignedClosed to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validPostWithDmpEventSignedClosed));
    const output = JSON.parse(JSON.stringify(validPostWithDmpEventSignedClosedConvertedToSpasm));
    expect(convertToSpasm(input)).toEqual(output);
  });
});

// convertToSpasm() for Nostr events
describe("convertToSpasm() tests for Nostr events", () => {
  // NostrEvent
  test("should convert NostrEvent to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validNostrEvent));
    const output = JSON.parse(JSON.stringify(validNostrEventConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // NostrSpasmEvent
  test("should convert NostrSpasmEvent to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEvent));
    const output = JSON.parse(JSON.stringify(validNostrSpasmEventConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // NostrEventSignedOpened
  test("should convert NostrEventSignedOpened to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // NostrSpasmEventSignedOpened
  test("should convert NostrSpasmEventSignedOpened to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // PostWithNostrEventSignedOpened,
  test("should convert PostWithNostrEventSignedOpened to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validPostWithNostrEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validPostWithNostrEventSignedOpenedConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // PostWithNostrSpasmEventSignedOpened,
  test("should convert PostWithNostrSpasmEventSignedOpened to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validPostWithNostrSpasmEventSignedOpened));
    const output = JSON.parse(JSON.stringify(validPostWithNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });

  // validNostrReplyToDmpEvent,
  test("should convert NostrReplyToDmpEvent to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validNostrReplyToDmpEvent));
    const output = JSON.parse(JSON.stringify(validNostrReplyToDmpEventConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });
});

// convertToSpasm() for RSS items
describe("convertToSpasm() tests for RSS items", () => {
  // RssItem
  test("should convert NostrEvent to Spasm", () => {
    const input = JSON.parse(JSON.stringify(validPostWithRssItem));
    const output = JSON.parse(JSON.stringify(validPostWithRssItemConvertedToSpasmV1_0_0));
    expect(convertToSpasm(input)).toEqual(output);
  });
});
