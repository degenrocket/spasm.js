import {
  convertHexAddressesToNpub,
  convertNpubOrHexAddressToHex,
  convertHexOrNpubAddressToNpub,
  convertNpubOrHexAddressesToHex,
  toBeHex,
  toBeHexes,
  toBeNpub,
  toBeNpubs,
  toBeNote,
  toBeNotes,
  fakeAsString,
} from './../utils/index.js';

import {
  validNpubAddress1, validNpubAddress2,
  validHexAddress1, validHexAddress2,
  invalidHexAddress1, invalidHexAddress2,
  invalidNpubAddress1, invalidNpubAddress2,
  validId1Note, validId1Nevent, validId1Hex, invalidId1Note,
  validId2Note, validId2Nevent, validId2Hex, invalidId2Note,
} from "./_events-data.js"

beforeEach(() => {
  // Spy on console.log and console.error
  // jest.spyOn(console, 'log').mockImplementation(() => {});
  // jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  // Restore original console.log and console.error after each test
  // jest.restoreAllMocks();
});
describe('convertNpubOrHexAddressToHex function', () => {
  it(
    "should return a valid hex address when a valid npub is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex(validNpubAddress1)
    ).toBe(validHexAddress1);
  });

  it(
    "should return a valid hex address when a valid hex is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex(validHexAddress1)
    ).toBe(validHexAddress1);
  });

  it(
    "should return '' when a too long invalid npub is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex(validNpubAddress1 + "1234")
    ).toBe('');
  });

  it(
    "should return '' when an invalid npub with valid length is passed",
    () => {
    // Hide console errors for invalid addresses during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(
      convertNpubOrHexAddressToHex(invalidNpubAddress1)
    ).toBe('');
    // Restore console errors
    jest.restoreAllMocks();
  });

  it(
    "should return '' when an array of valid npub addresses is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex([validNpubAddress1, validNpubAddress2] as any)
    ).toBe('');
  });

  it(
    "should return '' when an object with a valid npub address is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex({valid: validHexAddress1} as any)
    ).toBe('');
  });

  it(
    "should return '' if invalid value is passed",
    () => {
    expect(convertNpubOrHexAddressToHex('')).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(fakeAsString(null))).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(fakeAsString(undefined))).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(fakeAsString([1,2,3]))).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(fakeAsString([0]))).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(fakeAsString({a:1}))).toStrictEqual('');
  });

  it(
    "should return '' if valid type of invalid length is passed",
    () => {
    expect(convertNpubOrHexAddressToHex('')).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(validId1Note.slice(0,-1))).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(validId1Nevent.slice(0,-1))).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(validNpubAddress1.slice(0,-1))).toStrictEqual('');
    expect(convertNpubOrHexAddressToHex(validId1Note.slice(0,validId1Note.length))).toStrictEqual(validId1Hex);
  });
});

describe('convertNpubOrHexAddressesToHex function', () => {
  it(
    "should return an array with one valid hex if one valid npub is passed",
    () => {
    expect(
      convertNpubOrHexAddressesToHex(validNpubAddress1)
    ).toStrictEqual([validHexAddress1]);
  });

  it(
    "should return an array with one valid hex if one hex is passed",
    () => {
    expect(
      convertNpubOrHexAddressesToHex(validHexAddress1)
    ).toStrictEqual([validHexAddress1]);
  });

  it(
    "should return an array of valid hex if array of valid npubs is passed",
    () => {
    expect(
      convertNpubOrHexAddressesToHex([validNpubAddress1, validNpubAddress2])
    ).toStrictEqual(
      [validHexAddress1, validHexAddress2]
    );
  });

  it(
    "should return an array of valid hex if array of valid hex is passed",
    () => {
    expect(
      convertNpubOrHexAddressesToHex([validHexAddress1, validHexAddress2])
    ).toStrictEqual(
      [validHexAddress1, validHexAddress2]
    );
  });

  it(
    "should return an array with a valid hex if an array of valid and invalid hex is passed",
    () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(
      convertNpubOrHexAddressesToHex([
        validHexAddress1, invalidNpubAddress1,
        '', fakeAsString(null), fakeAsString(undefined),
        fakeAsString([1,2,3]), fakeAsString({a:1}),
        validNpubAddress1.slice(0,-1),
        validId1Hex.slice(0,-1),
        validId1Note.slice(0,-1),
        validId1Nevent.slice(0,-1)
      ])
    ).toStrictEqual([validHexAddress1]);
    jest.restoreAllMocks();
  });

  it(
    "should return an empty array if an array with invalid hexes is passed",
    () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(
      convertNpubOrHexAddressesToHex([
        invalidNpubAddress1, invalidNpubAddress2,
        '', fakeAsString(null), fakeAsString(undefined),
        fakeAsString([1,2,3]), fakeAsString({a:1}),
        validNpubAddress1.slice(0,-1),
        validId1Hex.slice(0,-1),
        validId1Note.slice(0,-1),
        validId1Nevent.slice(0,-1)
      ])
    ).toStrictEqual([]);
    jest.restoreAllMocks();
  });
});

// toBeNpub()
// convertHexOrNpubAddressToNpub()
describe('convertHexOrNpubAddressToNpub function', () => {
  it(
    "should return a valid npub address when a valid hex is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validHexAddress1)
    ).toBe(validNpubAddress1);
    expect(toBeNpub(validHexAddress1)).toBe(validNpubAddress1);
  });

  it(
    "should return a valid npub address when a valid npub is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validNpubAddress1)
    ).toBe(validNpubAddress1);
    expect(toBeNpub(validNpubAddress1)).toBe(validNpubAddress1);
  });

  it(
    "should return '' when a too long invalid npub is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validNpubAddress1 + "1234")
    ).toBe('');
  });

  it(
    "should return '' when a too long invalid hex is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validHexAddress1 + "1234")
    ).toBe('');
  });

  // Invalid npub with valid length can be converted to npub
  it(
    "should return npub when an invalid npub with valid length is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(invalidNpubAddress1)
    ).toBe(invalidNpubAddress1);
  });

  // Invalid hex address can be converted to npub if it's a valid hex string
  it(
    "should return npub when an invalid hex address is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(invalidHexAddress1)
    ).toBe(
    'npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjpqmyup3h'
    );
  });

  it(
    "should return '' when an array of valid npub addresses is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub([validHexAddress1, validHexAddress2] as any)
    ).toBe('');
  });

  it(
    "should return '' when an object with a valid npub address is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub({valid: validHexAddress1} as any)
    ).toBe('');
  });

  it(
    "should return '' invalid type is passed",
    () => {
    expect(toBeNpub('')).toStrictEqual('');
    expect(toBeNpub(fakeAsString(12345))).toStrictEqual('');
    expect(toBeNpub(fakeAsString(null))).toStrictEqual('');
    expect(toBeNpub(fakeAsString(undefined))).toStrictEqual('');
    expect(toBeNpub(fakeAsString([1,2,3]))).toStrictEqual('');
    expect(toBeNpub(fakeAsString({a:1}))).toStrictEqual('');
  });

  it(
    "should return '' if valid type of invalid length is passed",
    () => {
    expect(toBeNpub(validHexAddress1.slice(0,-1))).toBe('');
    expect(toBeNpub(validHexAddress2.slice(0,-1))).toBe('');
    expect(toBeNpub(validNpubAddress1.slice(0,-1))).toBe('');
    expect(toBeNpub(validNpubAddress2.slice(0,-1))).toBe('');
  });
});

describe('convertHexAddressesToNpub & toBeNpubs function', () => {
  it(
    "should return an array with one valid npub if one valid hex is passed",
    () => {
    expect(
      convertHexAddressesToNpub(validHexAddress1)
    ).toStrictEqual([validNpubAddress1]);
    expect(
      toBeNpubs(validHexAddress1)
    ).toStrictEqual([validNpubAddress1]);
  });

  it(
    "should return an array with one valid npub if one npub is passed",
    () => {
    expect(
      convertHexAddressesToNpub(validNpubAddress1)
    ).toStrictEqual([validNpubAddress1]);
    expect(
      toBeNpubs(validNpubAddress1)
    ).toStrictEqual([validNpubAddress1]);
  });

  it(
    "should return an array of valid npub if array of valid hex is passed",
    () => {
    expect(
      convertHexAddressesToNpub([validHexAddress1, validHexAddress2])
    ).toStrictEqual(
      [validNpubAddress1, validNpubAddress2]
    );
    expect(
      toBeNpubs([validHexAddress1, validHexAddress2])
    ).toStrictEqual(
      [validNpubAddress1, validNpubAddress2]
    );
  });

  it(
    "should return an array of valid npub if array of valid npub is passed",
    () => {
    expect(
      convertHexAddressesToNpub([validNpubAddress1, validNpubAddress2])
    ).toStrictEqual(
      [validNpubAddress1, validNpubAddress2]
    );
    expect(
      toBeNpubs([validNpubAddress1, validNpubAddress2])
    ).toStrictEqual(
      [validNpubAddress1, validNpubAddress2]
    );
  });

  it(
    "should return an array of valid npubs if an array of valid and invalid hex is passed",
    () => {
    expect(
      convertHexAddressesToNpub([validHexAddress1, invalidHexAddress1])
    ).toStrictEqual([
      validNpubAddress1,
      'npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjpqmyup3h'
    ]);
  });

  it(
    "should return an array with a valid npub if an array of valid and invalid hex is passed",
    () => {
    expect(
      convertHexAddressesToNpub([validHexAddress1, validHexAddress2 + "12345"])
    ).toStrictEqual(
      [validNpubAddress1]
    );
    expect(
      toBeNpubs([validHexAddress1, validHexAddress2 + "12345"])
    ).toStrictEqual([validNpubAddress1]);
  });

  it(
    "should return an array of npubs if an array of two invalid hex is passed",
    () => {
    expect(
      convertHexAddressesToNpub([invalidHexAddress1, invalidHexAddress2])
    ).toStrictEqual([
      'npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjpqmyup3h',
      'npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szk4q26x6jp'
    ]);
  });

  it(
    "should return an empty array if an array with two invalid hex is passed",
    () => {
    expect(
      convertHexAddressesToNpub([validHexAddress1 + "abc", validHexAddress2 + "12345"])
    ).toStrictEqual(
      []
    );
    expect(
      toBeNpubs([validHexAddress1 + "abc", validHexAddress2 + "12345"])
    ).toStrictEqual([]);
  });
});

describe('toBeNote function', () => {
  it(
    "should return a valid id-note if one valid id-hex is passed",
    () => {
    expect(toBeNote(validId1Hex)).toStrictEqual(validId1Note);
    expect(toBeNote(validId2Hex)).toStrictEqual(validId2Note);
    expect(toBeNote(validId1Note)).toStrictEqual(validId1Note);
    expect(toBeNote(validId2Note)).toStrictEqual(validId2Note);
    expect(toBeNote(validId1Nevent)).toStrictEqual(validId1Note);
    expect(toBeNote(validId2Nevent)).toStrictEqual(validId2Note);
  });
  it(
    "should return '' if invalid value type is passed",
    () => {
    expect(toBeNote('')).toStrictEqual('');
    expect(toBeNote(fakeAsString(12345))).toStrictEqual('');
    expect(toBeNote(fakeAsString(null))).toStrictEqual('');
    expect(toBeNote(fakeAsString(undefined))).toStrictEqual('');
    expect(toBeNote(fakeAsString([1,2,3]))).toStrictEqual('');
    expect(toBeNote(fakeAsString({a:1}))).toStrictEqual('');
  });
  it(
    "should return '' if valid type of invalid length is passed",
    () => {
    expect(toBeNote(validId1Hex.slice(0,-1))).toStrictEqual('');
    expect(toBeNote(validId2Hex.slice(0,-1))).toStrictEqual('');
    expect(toBeNote(validId1Note.slice(0,-1))).toStrictEqual('');
    expect(toBeNote(validId2Note.slice(0,-1))).toStrictEqual('');
    expect(toBeNote(validId1Nevent.slice(0,-1))).toStrictEqual('');
    expect(toBeNote(validId2Nevent.slice(0,-1))).toStrictEqual('');
  });
});

describe('toBeNotes function', () => {
  it(
    "should return an array of valid notes if valid hexesand nevents and notes are passed",
    () => {
    expect(
      toBeNotes(
        [
          // invalid values (Npubs will be removed)
          validNpubAddress1, validNpubAddress2, "123xyz",
          // valid values
          validId1Hex, validId1Note, validId1Nevent,
          validId2Hex, validId2Note, validId2Nevent,
          // invalid values (will be removed)
          fakeAsString(12345), fakeAsString(null),
          fakeAsString(undefined), fakeAsString([1,2,3]),
          fakeAsString({a:1}), '',
          validId1Hex.slice(0,-1),
          validId1Note.slice(0,-1),
          validId1Nevent.slice(0,-1),
          validId2Hex.slice(0,-1),
          validId2Note.slice(0,-1),
          validId2Nevent.slice(0,-1),
        ]
      )
    ).toStrictEqual([
      validId1Note, validId1Note, validId1Note,
      validId2Note, validId2Note, validId2Note
    ]);
  });
});
describe('toBeHex function', () => {
  it(
    "should return a valid id-hex if one valid id-note is passed",
    () => {
    expect(toBeHex(validId1Note)).toStrictEqual(validId1Hex);
    expect(toBeHex(validId2Note)).toStrictEqual(validId2Hex);
  });
  it(
    "should return a valid id-hex if one valid id-nevent is passed",
    () => {
    expect(toBeHex(validId1Nevent)).toStrictEqual(validId1Hex);
    expect(toBeHex(validId2Nevent)).toStrictEqual(validId2Hex);
  });
  it(
    "should return a valid hex if one valid npub is passed",
    () => {
    expect(toBeHex(validNpubAddress1)).toStrictEqual(validHexAddress1);
    expect(toBeHex(validNpubAddress2)).toStrictEqual(validHexAddress2);
    expect(toBeHex(validNpubAddress2)).not.toEqual(null);
    expect(toBeHex(validHexAddress1)).toStrictEqual(validHexAddress1);
  });
  it(
    "should return '' if invalid value is passed",
    () => {
    expect(toBeHex('')).toStrictEqual('');
    expect(toBeHex(fakeAsString(null))).toStrictEqual('');
    expect(toBeHex(fakeAsString(undefined))).toStrictEqual('');
    expect(toBeHex(fakeAsString([1,2,3]))).toStrictEqual('');
    expect(toBeHex(fakeAsString([0]))).toStrictEqual('');
    expect(toBeHex(fakeAsString({a:1}))).toStrictEqual('');
  });
  it(
    "should return '' if valid type of invalid length is passed",
    () => {
    expect(toBeHex('')).toStrictEqual('');
    expect(toBeHex(validId1Note.slice(0,-1))).toStrictEqual('');
    expect(toBeHex(validId1Nevent.slice(0,-1))).toStrictEqual('');
    expect(toBeHex(validNpubAddress1.slice(0,-1))).toStrictEqual('');
    expect(toBeHex(validId1Note.slice(0,validId1Note.length))).toStrictEqual(validId1Hex);
  });
});

describe('toBeHexes function', () => {
  it(
    "should return an array of valid hexes if valid notes and npubs and nevents are passed",
    () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(
      toBeHexes(
        [
          validNpubAddress1, validNpubAddress2,
          validId1Hex, validId1Note, validId1Nevent,
          validId2Hex, validId2Note, validId2Nevent,
          // Invalid ids will be removed
          invalidId1Note, invalidId2Note,
          '', fakeAsString(null), fakeAsString(undefined),
          fakeAsString([1,2,3]), fakeAsString({a:1}),
          validNpubAddress1.slice(0,-1),
          validId1Hex.slice(0,-1),
          validId1Note.slice(0,-1),
          validId1Nevent.slice(0,-1)
        ]
      )
    ).toStrictEqual(
        [
          validHexAddress1, validHexAddress2,
          validId1Hex, validId1Hex, validId1Hex,
          validId2Hex, validId2Hex, validId2Hex
        ]
    );
    jest.restoreAllMocks();
  });
});
