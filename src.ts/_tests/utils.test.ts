// import {SpasmEventAuthorV2} from '../types/interfaces';
import {ConvertToSpasmConfig, CustomConvertToSpasmConfig, SpasmEventIdV2, UnknownEventV2} from '../types/interfaces.js';
import {
  isObjectWithValues,
  getFormatFromId, getFormatFromAddress, getFormatFromValue,
  getHashOfString,
  keepTheseKeysInObject,
  keepTheseKeysInObjectsInArray,
  sortArrayOfObjects,
  sortArrayOfStringsAndNumbers,
  sortAuthorsForSpasmEventV2,
  sortMediasForSpasmid01,
  sortReferencesForSpasmid01,
  sortTagsForSpasmid01,
  sortParentForSpasmid01,
  executeFunctionForAllNestedValuesOfType,
  sanitizeEventWith,
  sanitizeEvent,
  mergeConfigs,
  hasSiblingDmp,
  hasSiblingNostr,
  hasSiblingWeb2,
  hasSignatureEthereum,
  hasSignatureNostr,
  getAllSigners,
  getVerifiedSigners,
  getAllSignatures,
  getSignersListedIn,
  isAnySignerListedIn,
  areAllSignersListedIn,
  getPubkeysListedIn,
  isAnyPubkeyListedIn,
  areAllPubkeysListedIn,
  getAllIdsFromArrayOfIdObjects,
  getAllEventIds,
  getAllParentIds,
  toBeSpasmEventV2,
  getIdByFormat,
  extractIdByFormat,
  extractSpasmId01
} from './../utils/index.js';
import {
  validDmpEvent, validDmpEventSignedClosed,
  validDmpEventSignedOpened, validPostWithDmpEventSignedClosed,
  validNostrEvent, validNostrSpasmEvent,
  validNostrEventSignedOpened, validNostrSpasmEventSignedOpened,
  validPostWithNostrSpasmEventSignedOpened,
  validDmpEventSignedOpenedConvertedToSpasmV2,
  validSpasmEventRssItemV0ConvertedToSpasmV2,
  validNostrEventSignedOpenedConvertedToSpasmV2,
  validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
  validSpasmEventRssItemV0,
  validSpasmWithDmpReplyToDmpEventV0,
  validDmpEventSignedClosedConvertedToSpasmV2,
} from "./_events-data.js"

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
} from "./_events-data.js"

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

// getHashOfString()
describe("getHashOfString() function tests", () => {
  test("should return valid hash", () => {
    // const input = {};
    expect(getHashOfString("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    expect(getHashOfString("hello world")).toBe("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9");
    expect(getHashOfString("1234567890-=!@#$%^&*()_+")).toBe("37af4cc38359f092b705241b286aaabf42aa6054fcb70016e971d63f9470793b");
    expect(getHashOfString('<br>line<div class="main">Main text</div>')).toBe("ca5588d79172608051a13af3f6692e656179ab0e1a4e6153ef5eb969687c4330");
    expect(getHashOfString("<br>line<div class='main'>Main text</div>")).toBe("6f7c80389ac8d9e6a5ce20539c569fcf7ab20b056f4b41cacfab391200472ec4");
    // Japanese
    expect(getHashOfString("ハローワールド")).toBe("9b58f66ce16f8efa41f9ea5fcc767ae639bb1ee83849efc1400da3832c6bff90");
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
    const output3 = { version: "123" }
    expect(keepTheseKeysInObject(input, ["id"])).toStrictEqual(output1);
    expect(keepTheseKeysInObject(input, ["addresses", "usernames"])).toStrictEqual(output2);
    expect(keepTheseKeysInObject(input, ["version", "invalid"])).toStrictEqual(output3);
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
    const output1 = [{},{}];
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
    const output3 = [{ version: "123" }, { version: "456" }]
    expect(keepTheseKeysInObjectsInArray(input, ["id"])).toStrictEqual(output1);
    expect(keepTheseKeysInObjectsInArray(input, ["addresses", "usernames"])).toStrictEqual(output2);
    expect(keepTheseKeysInObjectsInArray(input, ["version", "invalid"])).toStrictEqual(output3);
  });
});

// sortArrayOfStringsAndNumbers()
describe("sortArrayOfStringsAndNumbers() function tests", () => {
  test("should return sorted array", () => {
    const input = ["1", 3, ["invalid", 0], undefined, null, {a:69, b:420, c: {d: "invalid again"}}, 2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4"];
    const output = ["1", 2, 3, "3a", "3ab", "4", "5", "abc1", "abc2", "abcd", ["invalid", 0], undefined, null,{a:69, b:420, c: {d: "invalid again"}}];
    expect(sortArrayOfStringsAndNumbers(input)).toStrictEqual(output);
  });
});

// sortArrayOfObjects()
describe("sortArrayOfObjects() function tests", () => {
  test("should return sorted array", () => {
    const input = [
      "3", 1, ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
      2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
      {title: "white"},
      {id:"2a", value:"1b", title: "blue"},
      {value:"1d234", title: "purple"},
      {id:"1a", title: "red"},
      {title: "black"},
      {value:"1c", title: "yellow"},
      {id:1, title: "green"},
    ];
    const output = [
      {id:1, title: "green"},
      {id:"1a", title: "red"},
      {id:"2a", value:"1b", title: "blue"},
      {value:"1c", title: "yellow"},
      {value:"1d234", title: "purple"},
      {title: "black"},
      {title: "white"},
      1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
      ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
    ];
    // expect(sortArrayOfObjects(input, ["id"])).toStrictEqual(output);
    // expect(sortArrayOfObjects(input)).toStrictEqual("");
    // expect(sortArrayOfObjects(input, ["id", "value", "title"])).toStrictEqual("");
    // expect(sortArrayOfObjects(input, ["category", "title", "value", "id"])).toStrictEqual("");
    expect(sortArrayOfObjects(input, ["id", "value", "title"])).toStrictEqual(output);
  });
});

// sortAuthorsForSpasmEventV2()
describe("sortAuthorsForSpasmEventV2() function tests", () => {
  test("should return sorted array", () => {
    const input: any[] = [
      "3", 1, ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
      2, "abc2", "abc1", "abcd", "3ab", "3a", "5", "4",
      {title: "white"},
      {id:"2a", value:"1b", title: "blue"},
      {value:"1d234", title: "purple"},
      {id:"1a", title: "red"},
      {title: "black"},
      {value:"1c", title: "yellow"},
      {id:1, title: "green"},
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
    const output: any[] = [
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
      {id:1, title: "green"},
      {id:"1a", title: "red"},
      {id:"2a", value:"1b", title: "blue"},
      1, 2, "3", "3a", "3ab", "4", "5", "abc1", "abc2", "abcd",
      ["invalid", 0], undefined, null,
      {a:69, b:420, c: {d: "invalid again"}},
      {title: "white"},
      {value:"1d234", title: "purple"},
      {title: "black"},
      {value:"1c", title: "yellow"},
    ];
    expect(sortAuthorsForSpasmEventV2(input)).toStrictEqual(output);
  });
});

// sortMediasForSpasmid01
describe("sortMediasForSpasmid01() function tests", () => {
  test("sortMediasForSpasmid01() should return sorted medias", () => {
    const input = [
      // media 2
      { ids: [    { value: "mediaid2" },
                  { value: "mediaid5" },
                  { value: "mediaid4" } ],
        hashes: [ { value: "hash7" },
                  { value: "hash8" } ] },
      // media 1
      { ids: [    { value: "mediaid3" },
                  { value: "mediaid1" } ] },
      // media 6
      { extra: [  { value: "extra2" },
                  { value: "extra1" } ] },
      // media 4
      { hashes: [ { value: "hash6" },
                  { value: "hash5" } ] },
      // media 3
      { hashes: [ { value: "hash4" },
                  { value: "hash3" } ],
        links: [  { value: "link4" },
                  { value: "link2" } ] },
      // media 5
      { links: [  { value: "link3" },
                  { value: "link1" } ] }
    ];

    const output = [
      // media 1
      { ids: [    { value: "mediaid1" },
                  { value: "mediaid3" } ] },
      // media 2
      { ids: [    { value: "mediaid2" },
                  { value: "mediaid4" },
                  { value: "mediaid5" } ],
        hashes: [ { value: "hash7" },
                  { value: "hash8" } ] },
      // media 3
      { hashes: [ { value: "hash3" },
                  { value: "hash4" } ],
        links: [  { value: "link2" },
                  { value: "link4" } ] },
      // media 4
      { hashes: [ { value: "hash5" },
                  { value: "hash6" } ] },
      // media 5
      { links: [  { value: "link1" },
                  { value: "link3" } ] },
      // media 6
      { extra: [  { value: "extra2" },
                  { value: "extra1" } ] }
    ];
      
    expect(sortMediasForSpasmid01(input)).toStrictEqual(output);
    // expect(sortMediasForSpasmid01(input)).toStrictEqual([]);
  });
});

// sortParentForSpasmid01()
describe("sortParentForSpasmid01() function tests", () => {
  test("sortParentForSpasmid01() should return sorted parent", () => {
    const input = { ids: [ { value: "parent-id3" },
                           { value: "parent-id1b" },
                           { value: "parent-id1a" },
                           { value: "parent-idx" },
                           { value: "parent-id1" } ],
                    marker: "parent-marker1" };

    const output = { ids: [ { value: "parent-id1" },
                            { value: "parent-id1a" },
                            { value: "parent-id1b" },
                            { value: "parent-id3" },
                            { value: "parent-idx" } ],
                     marker: "parent-marker1" };

    expect(sortParentForSpasmid01(input)).toStrictEqual(output);
  });
});

// sortReferencesForSpasmid01()
describe("sortReferencesForSpasmid01() function tests", () => {
  test("sortReferencesForSpasmid01() should return sorted references", () => {
    const input = [
      // reference 2
      { ids:    [ { value: "ref-id4" },
                  { value: "ref-id2" } ],
        marker: "ref-marker2" },
      // reference 1
      { ids:    [ { value: "ref-id3" },
                  { value: "ref-id1" } ],
        marker: "ref-marker1" },
    ];
    const output = [
      // reference 1
      { ids:    [ { value: "ref-id1" },
                  { value: "ref-id3" } ],
        marker: "ref-marker1" },
      // reference 2
      { ids:    [ { value: "ref-id2" },
                  { value: "ref-id4" } ],
        marker: "ref-marker2" },
    ];
    expect(sortReferencesForSpasmid01(input)).toStrictEqual(output);
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
      ["license","SPDX-License-Identifier: CC0-1.0"],
      ["spasm_version","1.0.0"],
      ["spasm_action","reply"],
      ["spasm_target","0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
    ];
    const output = [
      ["e", "event1", "event-marker2"],
      ["e", "event2", "event-marker1"],
      ["license","SPDX-License-Identifier: CC0-1.0"],
      ["p", "pubkey1", "marker1"],
      ["p", "pubkey2", "marker2"],
      ["p", "pubkey2", "marker3"],
      ["p", "pubkey2", "marker3", "extra1"],
      ["p", "pubkey2", "marker3", "extra2"],
      ["spasm_action","reply"],
      ["spasm_target","0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"],
      ["spasm_version","1.0.0"],
    ];
    expect(sortTagsForSpasmid01(input)).toStrictEqual(output);
  });
});

// executeFunctionForAllNestedValuesOfType()
describe("executeFunctionForNestedValues() function tests", () => {
  const changeString = (value: any) => {
    if (typeof(value) === "string") {
      if (value === "世界") return "新" + value
      return "new " + value
    }
    return value
  }
  const changeNumber = (value: any) => {
    if (typeof(value) === "number") {
      if (value / 4 === 496) return value + 36
      return value * 10
    }
    return value
  }
  const changeBoolean = (value: any) => {
    if (typeof(value) === "boolean") {
      if (value) { return false } else { return true }
    }
    return value
  }
  const nestedArray = [
    "one", "two", [ "three" ], 4,
    [ 5, true, [ "six", 7, 8, false ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "seventeen", true, false, "" ],
          object: {
            text: "eighteen",
            booleans: [ true, false ],
            mix: [ 19, true, "twenty", 21, false ]
          }
        }
    ]
  ]
  const nestedArrayWithChangedStrings = [
    "new one", "new two", [ "new three" ], 4,
    [ 5, true, [ "new six", 7, 8, false ],
      {
        word: "new nine", 
        words: [ "new ten", "new eleven" ],
        number: 12,
        numbers: [ 13, 14 ],
        mix: [ 15, "new sixteen", "new seventeen", true, false, "new " ],
        object: {
          text: "new eighteen",
          booleans: [ true, false ],
          mix: [ 19, true, "new twenty", 21, false ]
        }
      }
    ]
  ]
  const nestedArrayWithChangedNumbers = [
    "one", "two", [ "three" ], 40,
    [ 50, true, [ "six", 70, 80, false ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 120,
          numbers: [ 130, 140 ],
          mix: [ 150, "sixteen", "seventeen", true, false, "" ],
          object: {
            text: "eighteen",
            booleans: [ true, false ],
            mix: [ 190, true, "twenty", 210, false ]
          }
        }
    ]
  ]
  const nestedArrayWithChangedBooleans = [
    "one", "two", [ "three" ], 4,
    [ 5, false, [ "six", 7, 8, true ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "seventeen", false, true, "" ],
          object: {
            text: "eighteen",
            booleans: [ false, true ],
            mix: [ 19, false, "twenty", 21, true ]
          }
        }
    ]
  ]
  const nestedObject = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "世界",
      array: JSON.parse(JSON.stringify(nestedArray))
    }
  }
  const nestedObjectWithChangedStrings = {
    content: "new hello",
    value: 31*64,
    valent: false,
    original: {
      content: "新世界",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
    }
  }
  const nestedObjectWithChangedNumbers = {
    content: "hello",
    value: (4 + 12 + 12 + 13) * 50 - 30,
    valent: false,
    original: {
      content: "世界",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers))
    }
  }
  const nestedObjectWithChangedBooleans = {
    content: "hello",
    value: 31*64,
    valent: true,
    original: {
      content: "世界",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans))
    }
  }
  test("should return undefined if input is a string", () => {
    const input = "hello world";
    expect(() => {
      executeFunctionForAllNestedValuesOfType(
        input as Object, // bypass TypeScript type checking
        {
          customFunction: changeString,
          valueType: "string"
        }
      )
    }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.")
  });
  test("should return undefined if input is a number", () => {
    const input = 1;
    expect(() => {
      executeFunctionForAllNestedValuesOfType(
        input as Object, // bypass TypeScript type checking
        {
          customFunction: changeNumber,
          valueType: "number"
        }
      )
    }).toThrow("ERROR: There are no nested values because an item is not an object, nor an array.")
  });
  test("should throw an error if maxium recursion depth exceeded", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    expect(() => {
      executeFunctionForAllNestedValuesOfType(
        input,
        {
          customFunction: changeString,
          valueType: "string",
          maxDepth: 3
        }
      )
    }).toThrow("Maximum recursion depth exceeded")
  });
  test("sanitizeEventWith should return empty array if maximum recursion depth exceeded", () => {
    // Hide console errors for invalid addresses during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const input = JSON.parse(JSON.stringify(nestedArray));
    sanitizeEventWith(
      input,
      {
        customFunction: changeString,
        valueType: "string",
        maxDepth: 3
      }
    )
    expect(input).toStrictEqual([]);
    // Restore console errors
    jest.restoreAllMocks();
  });
  test("sanitizeEventWith should return empty object if maximum recursion depth exceeded", () => {
    // Hide console errors for invalid addresses during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const input = JSON.parse(JSON.stringify(nestedObject));
    sanitizeEventWith(
      input,
      {
        customFunction: changeString,
        valueType: "string",
        maxDepth: 3
      }
    )
    expect(input).toStrictEqual({});
    // Restore console errors
    jest.restoreAllMocks();
  });
  test("should change all nested strings in array", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeString,
        valueType: "string"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArrayWithChangedStrings));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested numbers in array", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeNumber,
        valueType: "number"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArrayWithChangedNumbers));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested booleans in array", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeBoolean,
        valueType: "boolean"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArrayWithChangedBooleans));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested strings in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    executeFunctionForAllNestedValuesOfType(
      input,
        {
          customFunction: changeString,
          valueType: "string"
        }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested numbers in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeNumber,
        valueType: "number"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedNumbers));
    expect(input).toStrictEqual(output);
  });
  test("should change all nested booleans in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeBoolean,
        valueType: "boolean"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedBooleans));
    expect(input).toStrictEqual(output);
  });
  test("should not change anything", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeString,
        valueType: "number"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArray));
    expect(input).toStrictEqual(output);
  });
  test("should not change anything", () => {
    const input = JSON.parse(JSON.stringify(nestedArray));
    executeFunctionForAllNestedValuesOfType(
      input,
      {
        customFunction: changeNumber,
        valueType: "string"
      }
    )
    const output = JSON.parse(JSON.stringify(nestedArray));
    expect(input).toStrictEqual(output);
  });
});

// sanitizeEventWith()
describe("sanitizeEventWith() function tests", () => {
  const sanitizeStringFunction = (value: any) => {
    if (typeof(value) === "string") {
      return "sanitized " + value
    }
    return value
  }
  const nestedArray = [
    "one", "two", [ "three" ], 4,
    [ 5, true, [ "six", 7, 8, false ],
        {
          word: "nine", 
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "seventeen", true, false, "" ],
          object: {
            text: "eighteen",
            booleans: [ true, false ],
            mix: [ 19, true, "twenty", 21, false ]
          }
        }
    ]
  ]
  const nestedArrayWithChangedStrings = [
    "sanitized one", "sanitized two", [ "sanitized three" ], 4,
    [ 5, true, [ "sanitized six", 7, 8, false ],
      {
        word: "sanitized nine", 
        words: [ "sanitized ten", "sanitized eleven" ],
        number: 12,
        numbers: [ 13, 14 ],
        mix: [ 15, "sanitized sixteen", "sanitized seventeen", true, false, "sanitized " ],
        object: {
          text: "sanitized eighteen",
          booleans: [ true, false ],
          mix: [ 19, true, "sanitized twenty", 21, false ]
        }
      }
    ]
  ]
  const nestedObject = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "world",
      array: JSON.parse(JSON.stringify(nestedArray))
    }
  }
  const nestedObjectWithChangedStrings = {
    content: "sanitized hello",
    value: 31*64,
    valent: false,
    original: {
      content: "sanitized world",
      array: JSON.parse(JSON.stringify(nestedArrayWithChangedStrings))
    }
  }
  test("should sanitize all nested strings in object", () => {
    const input = JSON.parse(JSON.stringify(nestedObject));
    sanitizeEventWith(
      input,
      {
        customFunction: sanitizeStringFunction
      }
    )
    const output = JSON.parse(JSON.stringify(nestedObjectWithChangedStrings));
    expect(input).toStrictEqual(output);
  });
});

// sanitizeEvent()
describe("sanitizeEvent() function tests", () => {
  // Array with nested malicious HTML tags
  const nestedArrayDirty = [
    "one", "<img src=x onerror=alert(1)//>", [ "three" ], 4,
    [ 5, true, [ "<svg><g/onload=alert(2)//<p>", 7, 8, false ],
        {
          word: "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>",
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", '<math><mi//xlink:href="data:x,<script>alert(4)</script>">', true, false, "" ],
          object: {
            text: "<TABLE><tr><td>HELLO</tr></TABL>",
            booleans: [ true, false ],
            mix: [ 19, true, "<UL><li><A HREF=//google.com>click</UL>", 21, false ]
          }
        }
    ]
  ]
// DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // becomes <img src="x">
// DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>'); // becomes <svg><g></g></svg>
// DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'); // becomes <p>abc</p>
// DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">'); // becomes <math><mi></mi></math>
// DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>'); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
// DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'); // becomes <ul><li><a href="//google.com">click</a></li></ul>
  const nestedObjectDirty = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "world",
      array: JSON.parse(JSON.stringify(nestedArrayDirty))
    }
  }
  const eventDirty = JSON.parse(JSON.stringify(nestedObjectDirty))
  const nestedArrayClean = [
    "one", '<img src="x">', [ "three" ], 4,
    [ 5, true, [ "<svg><g></g></svg>", 7, 8, false ],
        {
          word: "<p>abc</p>",
          words: [ "ten", "eleven" ],
          number: 12,
          numbers: [ 13, 14 ],
          mix: [ 15, "sixteen", "<math><mi></mi></math>", true, false, "" ],
          object: {
            text: "<table><tbody><tr><td>HELLO</td></tr></tbody></table>",
            booleans: [ true, false ],
            mix: [ 19, true, '<ul><li><a href="//google.com">click</a></li></ul>', 21, false ]
          }
        }
    ]
  ]
  const nestedObjectClean = {
    content: "hello",
    value: 31*64,
    valent: false,
    original: {
      content: "world",
      array: JSON.parse(JSON.stringify(nestedArrayClean))
    }
  }
  const eventClean = JSON.parse(JSON.stringify(nestedObjectClean))

  test("should sanitize all nested strings in event", () => {
    const input = JSON.parse(JSON.stringify(eventDirty));
    sanitizeEvent(input)
    const output = JSON.parse(JSON.stringify(eventClean));
    expect(input).toStrictEqual(output);
  });
});

// mergeConfigs()
describe("mergeConfigs() function tests", () => {
  test("mergeConfigs() should merge two full configs", () => {
    const defaultConfig = new ConvertToSpasmConfig()
    const customConfig = new ConvertToSpasmConfig()
    customConfig.to.spasm.id.versions = ["02", "03"]
    customConfig.xss.enableSanitization = false

    const input = mergeConfigs(defaultConfig, customConfig)
    const output = new ConvertToSpasmConfig()
    output.to.spasm.id.versions = ["02", "03"]
    output.xss.enableSanitization = false
    expect(input).toEqual(output);
  });
  test("mergeConfigs() should merge full and partial configs", () => {
    const defaultConfig = new ConvertToSpasmConfig()
    const customConfigPartial: CustomConvertToSpasmConfig = {
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
    }

    const input = mergeConfigs(defaultConfig, customConfigPartial)
    const output = new ConvertToSpasmConfig()
    output.to.spasm.version = "1.0.0"
    output.to.spasm.id.versions = ["03"]
    output.xss.enableSanitization = false
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
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV2));
    const inputNostrSpasm = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));
    // TODO
    // const inputSpasm =
    // hasSiblingSpasm()

    // hasSiblingDmp()
    expect(hasSiblingDmp(inputDmp)).toEqual(true);
    expect(hasSiblingDmp(inputNostr)).toEqual(false);
    expect(hasSiblingDmp(inputNostrSpasm)).toEqual(false);
    expect(hasSiblingDmp(inputWeb2)).toEqual(false);
    // hasSiblingNostr()
    expect(hasSiblingNostr(inputDmp)).toEqual(false);
    expect(hasSiblingNostr(inputNostr)).toEqual(true);
    expect(hasSiblingNostr(inputNostrSpasm)).toEqual(true);
    expect(hasSiblingNostr(inputWeb2)).toEqual(false);
    // hasSiblingWeb2()
    expect(hasSiblingWeb2(inputDmp)).toEqual(false);
    expect(hasSiblingWeb2(inputNostr)).toEqual(false);
    expect(hasSiblingWeb2(inputNostrSpasm)).toEqual(false);
    expect(hasSiblingWeb2(inputWeb2)).toEqual(true);

    // hasSignatureEthereum()
    expect(hasSignatureEthereum(inputDmp)).toEqual(true);
    expect(hasSignatureEthereum(inputNostr)).toEqual(false);
    expect(hasSignatureEthereum(inputNostrSpasm)).toEqual(false);
    expect(hasSignatureEthereum(inputWeb2)).toEqual(false);
    // hasSignatureNostr()
    expect(hasSignatureNostr(inputDmp)).toEqual(false);
    expect(hasSignatureNostr(inputNostr)).toEqual(true);
    expect(hasSignatureNostr(inputNostrSpasm)).toEqual(true);
    expect(hasSignatureNostr(inputWeb2)).toEqual(false);
  });
});

// getAllSigners()
describe("getAllSigners() function tests", () => {
  test("getAllSigners() should return an array of author addresses", () => {
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const inputNostrSpasm = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0));

    const inputDmpConverted = JSON.parse(JSON.stringify(validDmpEventSignedOpenedConvertedToSpasmV2));
    const inputNostrConverted = JSON.parse(JSON.stringify(validNostrEventSignedOpenedConvertedToSpasmV2));
    const inputNostrSpasmConverted = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputWeb2Converted = JSON.parse(JSON.stringify(validSpasmEventRssItemV0ConvertedToSpasmV2));

    const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"]
    const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"]
    const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"]
    const outputWeb2 = []
    // TODO
    // const inputSpasm =
    // const outputSpasm =
    // expect(getAllSigners(inputSpasm)).toEqual(outputSpasm);

    // getAllSigners() for original events
    expect(getAllSigners(inputDmp)).toEqual(outputDmp);
    expect(getAllSigners(inputNostr)).toEqual(outputNostr);
    expect(getAllSigners(inputNostrSpasm)).toEqual(outputNostrSpasm);
    expect(getAllSigners(inputWeb2)).toEqual(outputWeb2);

    // getAllSigners() for events converted to SpasmEventV2
    expect(getAllSigners(inputDmpConverted)).toEqual(outputDmp);
    expect(getAllSigners(inputNostrConverted)).toEqual(outputNostr);
    expect(getAllSigners(inputNostrSpasmConverted)).toEqual(outputNostrSpasm);
    expect(getAllSigners(inputWeb2Converted)).toEqual(outputWeb2);

    // getVerifiedSigners()
    expect(getVerifiedSigners(inputDmp)).toEqual(outputDmp);
    expect(getVerifiedSigners(inputNostr)).toEqual(outputNostr);
    expect(getVerifiedSigners(inputNostrSpasm)).toEqual(outputNostrSpasm);
    expect(getVerifiedSigners(inputWeb2)).toEqual(outputWeb2);
  });
});

// getAllSignatures()
describe("getAllSignatures() function tests", () => {
  test("getAllSignatures() should return an array of signatures", () => {
    // Events
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const inputNostrSpasm = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpened));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0));

    // Signatures
    const outputDmp = ["0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
    const outputNostr = ["908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"]
    const outputNostrSpasm = ["db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"]
    const outputWeb2 = []

    // getAllSigners()
    expect(getAllSignatures(inputDmp)).toEqual(outputDmp);
    expect(getAllSignatures(inputNostr)).toEqual(outputNostr);
    expect(getAllSignatures(inputNostrSpasm)).toEqual(outputNostrSpasm);
    expect(getAllSignatures(inputWeb2)).toEqual(outputWeb2);
  });
});

// getSignersListedIn()
// isAnySignerListedIn()
// areAllSignersListedIn()
describe("getSignersListedIn() function tests", () => {
  test("getSignersListedIn() should return an array of signers listed as moderators", () => {
    // Events
    const inputDmp = JSON.parse(JSON.stringify(validDmpEventSignedOpened));
    const inputDmpBanned = JSON.parse(JSON.stringify(validSpasmWithDmpReplyToDmpEventV0));
    const inputNostr = JSON.parse(JSON.stringify(validNostrEventSignedOpened));
    const inputNostrSpasmConverted = JSON.parse(JSON.stringify(validNostrSpasmEventSignedOpenedConvertedToSpasmV2));
    const inputWeb2 = JSON.parse(JSON.stringify(validSpasmEventRssItemV0));
    const moderators = [
      "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
    ]

    const whitelistedForActionPost = [
      "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
      "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
      "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
    ]

    const bannedAuthors = [
      "0x49e8d02294e721ac47f6f4794625312b9005fd80",
      "vita1ik.eth"
    ]

    const outputDmp = ["0xf8553015220a857eda377a1e903c9e5afb3ac2fa"]
    const outputDmpBanned = ["0x49e8d02294e721ac47f6f4794625312b9005fd80"]
    const outputNostr = ["6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93"]
    const outputNostrSpasm = ["2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42"]
    // const outputWeb2 = []

    // getSignersListedIn() with Dmp moderator and whitelisted
    expect(getSignersListedIn(
      inputDmp,
      moderators
    )).toEqual(outputDmp);
    expect(getSignersListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(outputDmp);
    expect(getSignersListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual([]);
    // alias getPubkeysListedIn()
    expect(getPubkeysListedIn(
      inputDmp,
      moderators
    )).toEqual(outputDmp);
    expect(getPubkeysListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(outputDmp);
    expect(getPubkeysListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual([]);

    // getSignersListedIn() with Dmp banned
    expect(getSignersListedIn(
      inputDmpBanned,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual([]);
    expect(getSignersListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(outputDmpBanned);

    // getSignersListedIn() with Nostr whitelisted
    expect(getSignersListedIn(
      inputNostr,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(outputNostr);
    expect(getSignersListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual([]);

    // getSignersListedIn() with NostrSpasm whitelisted
    expect(getSignersListedIn(
      inputNostrSpasmConverted,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputNostrSpasmConverted,
      whitelistedForActionPost
    )).toEqual(outputNostrSpasm);
    expect(getSignersListedIn(
      inputNostrSpasmConverted,
      bannedAuthors
    )).toEqual([]);

    // getSignersListedIn() with web2
    expect(getSignersListedIn(
      inputWeb2,
      moderators
    )).toEqual([]);
    expect(getSignersListedIn(
      inputWeb2,
      whitelistedForActionPost
    )).toEqual([]);
    expect(getSignersListedIn(
      inputWeb2,
      bannedAuthors
    )).toEqual([]);

    // isAnySignerListedIn() with Dmp moderator and whitelisted
    expect(isAnySignerListedIn(
      inputDmp,
      moderators
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual(false);

    // isAnySignerListedIn() with Dmp banned
    expect(isAnySignerListedIn(
      inputDmpBanned,
      moderators
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(true);

    // isAnySignerListedIn() with Nostr whitelisted
    expect(isAnySignerListedIn(
      inputNostr,
      moderators
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(true);
    expect(isAnySignerListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual(false);
    // alias isAnyPubkeyListedIn()
    expect(isAnyPubkeyListedIn(
      inputNostr,
      moderators
    )).toEqual(false);
    expect(isAnyPubkeyListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(true);
    expect(isAnyPubkeyListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual(false);

    // isAnySignerListedIn() with Nostr whitelisted
    expect(isAnySignerListedIn(
      inputWeb2,
      moderators
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputWeb2,
      whitelistedForActionPost
    )).toEqual(false);
    expect(isAnySignerListedIn(
      inputWeb2,
      bannedAuthors
    )).toEqual(false);

    // areAllSignersListedIn() with Dmp moderator and whitelisted
    expect(areAllSignersListedIn(
      inputDmp,
      moderators
    )).toEqual(true);
    expect(areAllSignersListedIn(
      inputDmp,
      whitelistedForActionPost
    )).toEqual(true);
    expect(areAllSignersListedIn(
      inputDmp,
      bannedAuthors
    )).toEqual(false);

    // areAllSignersListedIn() with Dmp banned
    expect(areAllSignersListedIn(
      inputDmpBanned,
      moderators
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(true);
    // alias areAllPubkeysListedIn()
    expect(areAllPubkeysListedIn(
      inputDmpBanned,
      moderators
    )).toEqual(false);
    expect(areAllPubkeysListedIn(
      inputDmpBanned,
      whitelistedForActionPost
    )).toEqual(false);
    expect(areAllPubkeysListedIn(
      inputDmpBanned,
      bannedAuthors
    )).toEqual(true);

    // areAllSignersListedIn() with Nostr whitelisted
    expect(areAllSignersListedIn(
      inputNostr,
      moderators
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputNostr,
      whitelistedForActionPost
    )).toEqual(true);
    expect(areAllSignersListedIn(
      inputNostr,
      bannedAuthors
    )).toEqual(false);

    // areAllSignersListedIn() with Nostr whitelisted
    expect(areAllSignersListedIn(
      inputWeb2,
      moderators
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputWeb2,
      whitelistedForActionPost
    )).toEqual(false);
    expect(areAllSignersListedIn(
      inputWeb2,
      bannedAuthors
    )).toEqual(false);
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
      { value: [ 10, "11" ] },
      { value: { value: "12" } },
    ];
    const output = ["123", "abc", 456]
    expect(getAllIdsFromArrayOfIdObjects(
      input as SpasmEventIdV2[], true
    )).toStrictEqual(output);
  });
});

// getAllEventIds()
describe("getAllEventIds() tests", () => {
  test("getAllEventIds() should return array of IDs", () => {
    const input1 = validNostrSpasmEventSignedOpened;
    const output1 = [
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
      "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
    ]
    expect(getAllEventIds(
      input1, true
    )).toStrictEqual(output1);

    const input2 = validSpasmWithDmpReplyToDmpEventV0;
    const output2 = [
      "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
      "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b"
    ]
    expect(getAllEventIds(
      input2, true
    )).toStrictEqual(output2);
  });
});

// getAllParentIds()
describe("getAllParentIds() tests", () => {
  test("getAllParentIds() should return array of IDs", () => {
    const input = validSpasmWithDmpReplyToDmpEventV0;
    const output = [ input.target ]
    expect(getAllParentIds(
      input, true
    )).toStrictEqual(output);
  });
});

// toBeSpasmEventV2()
describe("toBeSpasmEventV2() function tests", () => {
  test("toBeSpasmEventV2() should return SpasmEventV2 or null", () => {
    const inputDmp = validDmpEventSignedClosed
    const inputNostr = validNostrEventSignedOpened
    const inputNostrSpasm = validNostrSpasmEventSignedOpened

    const outputDmp = validDmpEventSignedClosedConvertedToSpasmV2
    const outputNostr = validNostrEventSignedOpenedConvertedToSpasmV2
    const outputNostrSpasm = validNostrSpasmEventSignedOpenedConvertedToSpasmV2

    // Not SpasmEventV2 yet
    expect(toBeSpasmEventV2(inputDmp)).toStrictEqual(outputDmp);
    expect(toBeSpasmEventV2(inputNostr)).toStrictEqual(outputNostr);
    expect(toBeSpasmEventV2(inputNostrSpasm)).toStrictEqual(outputNostrSpasm);

    // Already SpasmEventV2
    expect(toBeSpasmEventV2(outputDmp)).toStrictEqual(outputDmp);
    expect(toBeSpasmEventV2(outputNostr)).toStrictEqual(outputNostr);
    expect(toBeSpasmEventV2(outputNostrSpasm)).toStrictEqual(outputNostrSpasm);

    // Other
    expect(toBeSpasmEventV2("hello" as UnknownEventV2)).toStrictEqual(null);
  });
});

// getIdByFormat()
// extractIdByFormat() - alias
describe("getIdByFormat() function tests", () => {
  test("getIdByFormat() should return true if true", () => {
    // Not converted to SpasmEventV2 yet
    const inputDmp = validDmpEventSignedClosed
    const inputNostr = validNostrEventSignedOpened
    const inputNostrSpasm = validNostrSpasmEventSignedOpened

    // Already converted to SpasmEvent2
    const inputDmpConverted = validDmpEventSignedClosedConvertedToSpasmV2
    const inputNostrConverted = validNostrEventSignedOpenedConvertedToSpasmV2
    const inputNostrSpasmConverted = validNostrSpasmEventSignedOpenedConvertedToSpasmV2

    // default format name and version
    expect(
      getIdByFormat(inputDmp)
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostr)
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasm)
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );
    expect(
      getIdByFormat(inputDmpConverted)
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostrConverted)
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasmConverted)
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );

    // spasmid
    expect(
      getIdByFormat(inputDmp, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostr, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasm, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );

    // alias
    expect(
      extractIdByFormat(inputDmp, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      extractIdByFormat(inputNostr, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      extractIdByFormat(inputNostrSpasm, { name: "spasmid" } )
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );

    // spasmid01
    expect(
      getIdByFormat(inputDmp, { name: "spasmid", version: "01" } )
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );
    expect(
      getIdByFormat(inputNostr, { name: "spasmid", version: "01" } )
    ).toStrictEqual(
      "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807"
    );
    expect(
      getIdByFormat(inputNostrSpasm, { name: "spasmid", version: "01" } )
    ).toStrictEqual(
      "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c"
    );
    expect(
      extractSpasmId01(inputDmp)
    ).toStrictEqual(
      "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
    );

    // spasmid99
    expect(
      getIdByFormat(inputDmp, { name: "spasmid", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "spasmid", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "spasmid", version: "99" } )
    ).toStrictEqual(null);

    // ethereum-sig
    expect(
      getIdByFormat(inputDmp, { name: "ethereum-sig" } )
    ).toStrictEqual(
      "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
    );
    expect(
      getIdByFormat(inputNostr, { name: "ethereum-sig" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "ethereum-sig" } )
    ).toStrictEqual(null);

    // ethereum-sig99
    expect(
      getIdByFormat(inputDmp, { name: "ethereum-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "ethereum-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "ethereum-sig", version: "99" } )
    ).toStrictEqual(null);

    // nostr-hex
    expect(
      getIdByFormat(inputDmp, { name: "nostr-hex" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-hex" } )
    ).toStrictEqual(
      "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65"
    );
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-hex" } )
    ).toStrictEqual(
      "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
    );

    // nostr-hex99
    expect(
      getIdByFormat(inputDmp, { name: "nostr-hex", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-hex", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-hex", version: "99" } )
    ).toStrictEqual(null);

    // nostr-sig
    expect(
      getIdByFormat(inputDmp, { name: "nostr-sig" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-sig" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-sig" } )
    ).toStrictEqual(
      "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
    );

    // nostr-sig99
    expect(
      getIdByFormat(inputDmp, { name: "nostr-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostr, { name: "nostr-sig", version: "99" } )
    ).toStrictEqual(null);
    expect(
      getIdByFormat(inputNostrSpasm, { name: "nostr-sig", version: "99" } )
    ).toStrictEqual(null);
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
