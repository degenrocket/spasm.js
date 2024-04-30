import {
  // convertBech32ToHex,
  // convertHexToBech32,
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
  // toBeNevent
} from './../utils/index';

import {
  validNpubAddress1, validNpubAddress2,
  validHexAddress1, validHexAddress2,
  invalidNpubAddress1, invalidNpubAddress2,
  validId1Note, validId1Nevent, validId1Hex, invalidId1Note,
  validId2Note, validId2Nevent, validId2Hex, invalidId2Note,
} from "./_events-data"

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
    ).toBe(
    validHexAddress1
    );
  });

  it(
    "should return a valid hex address when a valid hex is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex(validHexAddress1)
    ).toBe(
    validHexAddress1
    );
  });

  it(
    "should return '' when a too long invalid npub is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex(validNpubAddress1 + "1234")
      // convertNpubOrHexAddressToHex("hello")
    ).toBe(
    ''
    );
  });

  it(
    "should return '' when an invalid npub with valid length is passed",
    () => {
    // Hiding console errors for invalid addresses during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(
      convertNpubOrHexAddressToHex(invalidNpubAddress1)
    ).toBe(
    ''
    );
    jest.restoreAllMocks();
  });

  it(
    "should return '' when an array of valid npub addresses is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex([validNpubAddress1, validNpubAddress2] as any)
    ).toBe(
    ''
    );
  });

  it(
    "should return '' when an object with a valid npub address is passed",
    () => {
    expect(
      convertNpubOrHexAddressToHex({valid: validHexAddress1} as any)
    ).toBe(
    ''
    );
  });
});

describe('convertNpubOrHexAddressesToHex function', () => {
  it(
    "should return an array with one valid hex if one valid npub is passed",
    () => {
    expect(
      convertNpubOrHexAddressesToHex(validNpubAddress1)
    ).toStrictEqual(
      [validHexAddress1]
    );
  });

  it(
    "should return an array with one valid hex if one hex is passed",
    () => {
    expect(
      convertNpubOrHexAddressesToHex(validHexAddress1)
    ).toStrictEqual(
      [validHexAddress1]
    );
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
      convertNpubOrHexAddressesToHex([validHexAddress1, invalidNpubAddress1])
    ).toStrictEqual(
      [validHexAddress1]
    );
    jest.restoreAllMocks();
  });

  it(
    "should return an empty array if an array with two invalid hex is passed",
    () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(
      convertNpubOrHexAddressesToHex([invalidNpubAddress1, invalidNpubAddress2])
    ).toStrictEqual(
      []
    );
    jest.restoreAllMocks();
  });
});

describe('convertHexOrNpubAddressToNpub function', () => {
  it(
    "should return a valid npub address when a valid hex is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validHexAddress1)
    ).toBe(
    validNpubAddress1
    );
    expect(
      toBeNpub(validHexAddress1)
    ).toBe(
    validNpubAddress1
    );
  });

  it(
    "should return a valid npub address when a valid npub is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validNpubAddress1)
    ).toBe(
    validNpubAddress1
    );
    expect(
      toBeNpub(validNpubAddress1)
    ).toBe(
    validNpubAddress1
    );
  });

  it(
    "should return '' when a too long invalid npub is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validNpubAddress1 + "1234")
    ).toBe(
    ''
    );
  });

  it(
    "should return '' when a too long invalid hex is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub(validHexAddress1 + "1234")
    ).toBe(
    ''
    );
  });

  // Looks like any invalid npub can be converted to npub
  // it(
  //   "should return '' when an invalid npub with valid length is passed",
  //   () => {
  //   expect(
  //     convertHexOrNpubAddressToNpub(invalidNpubAddress1)
  //   ).toBe(
  //   ''
  //   );
  // });

  // Looks like any invalid hex can be converted to npub
  // it(
  //   "should return '' when an invalid hex with valid length is passed",
  //   () => {
  //   expect(
  //     convertHexOrNpubAddressToNpub(invalidHexAddress1)
  //   ).toBe(
  //   ''
  //   );
  // });

  it(
    "should return '' when an array of valid npub addresses is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub([validHexAddress1, validHexAddress2] as any)
    ).toBe(
    ''
    );
  });

  it(
    "should return '' when an object with a valid npub address is passed",
    () => {
    expect(
      convertHexOrNpubAddressToNpub({valid: validHexAddress1} as any)
    ).toBe(
    ''
    );
  });
});

describe('convertHexAddressesToNpub & toBeNpubs function', () => {
  it(
    "should return an array with one valid npub if one valid hex is passed",
    () => {
    expect(
      convertHexAddressesToNpub(validHexAddress1)
    ).toStrictEqual(
      [validNpubAddress1]
    );
    expect(
      toBeNpubs(validHexAddress1)
    ).toStrictEqual(
      [validNpubAddress1]
    );
  });

  it(
    "should return an array with one valid npub if one npub is passed",
    () => {
    expect(
      convertHexAddressesToNpub(validNpubAddress1)
    ).toStrictEqual(
      [validNpubAddress1]
    );
    expect(
      toBeNpubs(validNpubAddress1)
    ).toStrictEqual(
      [validNpubAddress1]
    );
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

  // it(
  //   "should return an array with a valid npub if an array of valid and invalid hex is passed",
  //   () => {
  //   expect(
  //     convertHexAddressesToNpub([validHexAddress1, invalidHexAddress2])
  //   ).toStrictEqual(
  //     [validNpubAddress1]
  //   );
  // });

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
    ).toStrictEqual(
      [validNpubAddress1]
    );
  });

  // it(
  //   "should return an empty array if an array with two invalid hex is passed",
  //   () => {
  //   expect(
  //     convertHexAddressesToNpub([invalidHexAddress1, invalidHexAddress2])
  //   ).toStrictEqual(
  //     []
  //   );
  // });

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
    ).toStrictEqual(
      []
    );
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
});

describe('toBeNotes function', () => {
  it(
    "should return an array of valid notes if valid hexesand nevents and notes are passed",
    () => {
    expect(
      toBeNotes(
        [
          // Npubs will be removed
          validNpubAddress1, validNpubAddress2, "123xyz",
          validId1Hex, validId1Note, validId1Nevent,
          validId2Hex, validId2Note, validId2Nevent
        ]
      )
    ).toStrictEqual(
        [
          validId1Note, validId1Note, validId1Note,
          validId2Note, validId2Note, validId2Note
        ]
    );
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
          invalidId1Note, invalidId2Note
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
