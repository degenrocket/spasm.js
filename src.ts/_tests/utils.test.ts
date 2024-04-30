import {
  isObjectWithValues,
  getFormatFromId, getFormatFromAddress, getFormatFromValue
} from './../utils/index';
import {
  validDmpEvent, validDmpEventSignedClosed,
  validDmpEventSignedOpened, validPostWithDmpEventSignedClosed,
  validNostrEvent, validNostrSpasmEvent,
  validNostrEventSignedOpened, validNostrSpasmEventSignedOpened,
  validPostWithNostrSpasmEventSignedOpened
} from "./_events-data"

import {
  validEthereumAddress1,
  invalidEthereumAddress1,
  validEthereumSignature1,
  invalidEthereumSignature1,
  validNpubAddress1,
  // validNpubAddress2,
  // validHexAddress1, validHexAddress2,
  // invalidNpubAddress1, invalidNpubAddress2,
  validId1Note, validId1Nevent, validId1Hex,
  // invalidId1Note,
  // validId2Note, validId2Nevent, validId2Hex, invalidId2Note,
  validId0Spasmid01
                         
} from "./_events-data"

// isObjectWithValues()
describe("isObjectWithValues() function tests", () => {
  test("should return false if object is empty", () => {
    const input = {};
    expect(isObjectWithValues(input)).toBe(false);
  });

  test("should return true if has a valid DmpEvent", () => {
    const input = JSON.parse(JSON.stringify(validDmpEvent));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid DmpEventSignedClosed", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedClosed));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid DmpEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid PostWithDmpEventSignedClosed", () => {
    const input = JSON.parse(JSON.stringify(validPostWithDmpEventSignedClosed));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrEvent", () => {
    const input = JSON.parse(JSON.stringify(validNostrEvent));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrSpasmEvent", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEvent));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid NostrSpasmEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return true if has a valid PostWithNostrSpasmEventSignedOpened", () => {
    const input = JSON.parse(JSON.stringify(validPostWithNostrSpasmEventSignedOpened));
    expect(isObjectWithValues(input)).toBe(true);
  });

  test("should return false if event is a string", () => {
    const input = JSON.stringify(validNostrEventSignedOpened);
    expect(isObjectWithValues(input)).toBe(false);
  });
});

// getFormatFromId
describe("getFormatFromId() function tests", () => {
  test("should return proper format", () => {
    // const input = {};
    expect(getFormatFromId(validId1Hex)).toStrictEqual({
      name: "nostr-hex"
    });
    expect(getFormatFromId(validId1Note)).toStrictEqual({
      name: "nostr-note"
    });
    expect(getFormatFromId(validId1Nevent)).toStrictEqual({
      name: "nostr-nevent"
    });
    expect(getFormatFromId(validId0Spasmid01)).toStrictEqual({
      name: "spasmid",
      version: "01"
    });
  });
});

// getFormatFromAddress
describe("getFormatFromAddress() function tests", () => {
  test("should return proper format", () => {
    // getFormatFromAddress
    expect(getFormatFromAddress(validNpubAddress1)).toStrictEqual({
      name: "nostr-npub"
    });
    expect(getFormatFromAddress(validEthereumAddress1)).toStrictEqual({
      name: "ethereum-pubkey"
    });
  });
});

// getFormatFromValue
describe("getFormatFromValue() function tests", () => {
  test("should return proper format", () => {
    expect(getFormatFromValue(validEthereumAddress1)).toStrictEqual({
      name: "ethereum-pubkey"
    });
    expect(getFormatFromValue(invalidEthereumAddress1)).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue(validEthereumSignature1)).toStrictEqual({
      name: "ethereum-sig"
    });
    expect(getFormatFromValue(invalidEthereumSignature1)).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue(validId1Hex)).toStrictEqual({
      name: "nostr-hex"
    });
    expect(getFormatFromValue(validId1Note)).toStrictEqual({
      name: "nostr-note"
    });
    expect(getFormatFromValue(validId1Nevent)).toStrictEqual({
      name: "nostr-nevent"
    });
    expect(getFormatFromValue("https://degenrocket.space")).toStrictEqual({
      name: "url"
    });
    expect(getFormatFromValue("degenrocket.space")).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue("hello world")).toStrictEqual({
      name: "string"
    });
    expect(getFormatFromValue(123)).toStrictEqual({
      name: "number"
    });
  });
});

