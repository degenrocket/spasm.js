// import {SpasmEventAuthorV2} from '../types/interfaces';
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
  sortParentForSpasmid01
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
