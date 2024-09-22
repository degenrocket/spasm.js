import { toBeNpub } from "./../utils/index.js";
import { toBeTimestamp } from "./../utils/index.js";
// import { convertToSpasm } from "./../convert/convertToSpasm"
// const latestSpasmVersion = "2.0.0"
export const validEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2fa";
export const invalidEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2f";
export const validEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b";
export const invalidEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71";
export const validNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z";
export const validNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d6";
export const validHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c81";
export const validHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9014aa";
export const invalidNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr1z";
export const invalidNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d7";
// const invalidHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c82"
// const invalidHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9015aa"
// 4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65
export const validId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mv";
export const validId1Nevent = "nevent1qqsyxakxt5hjx2hmaxug9g6m4f8kl6rx038xs36f4at9lxqcx0kk5egkrc3ry";
export const validId1Hex = "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65";
export const invalidId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mw";
export const validId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfq";
export const validId2Nevent = "nevent1qqsrm2tegjxehgnrsexy6mc5npxyyw3c8qmyasj47q78jp934emlypszlcsc8";
export const validId2Hex = "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206";
export const invalidId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfr";
// hello world | sha256
export const validId0Spasmid01 = "spasmid01a948904f2f0f479b8f8197694b30184b0d2ed1c1cd2a1ec0fb85d299a192a447";
export const validDmpEvent = {
    version: "dmp_v0.0.1",
    time: "2022-01-01T22:04:46.178Z",
    action: "post",
    target: "",
    title: "genesis",
    text: "not your keys, not your words",
    license: "MIT"
};
export const validDmpEventSignedClosed = {
    signer: '0xf8553015220a857eda377a1e903c9e5afb3ac2fa',
    signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b',
    // signedString: JSON.stringify(validDmpEvent)
    signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your words\",\"license\":\"MIT\"}"
};
export const validDmpEventSignedOpened = {
    ...validDmpEventSignedClosed,
    signedObject: validDmpEvent
};
export const validDmpEventSignedClosedWithInvalidSignedString = {
    ...validDmpEventSignedClosed,
    signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your word\",\"license\":\"MIT\"}"
};
export const validDmpEventSignedClosedWithInvalidSigner = {
    ...validDmpEventSignedClosed,
    signer: '0xf8553015220a857eda377a1e903c9e5afb3ac2fb'
};
export const validDmpEventSignedClosedWithInvalidSignature = {
    ...validDmpEventSignedClosed,
    signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71a'
};
// validNostrReplyToDmpEvent
export const validSpasmWithDmpReplyToDmpEventV0 = {
    "id": 401,
    "target": "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
    "action": "reply",
    "title": "",
    "text": "To the moon!",
    "signer": "0x49e8d02294e721ac47f6f4794625312b9005fd80",
    "signed_message": "{\"version\":\"dmp_v0.1.0\",\"time\":\"2024-02-17T05:47:59.932Z\",\"action\":\"reply\",\"target\":\"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b\",\"title\":\"\",\"text\":\"To the moon!\",\"license\":\"SPDX-License-Identifier: CC0-1.0\"}",
    "signature": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
    "signed_time": "2024-02-17T05:47:59.932Z",
    "added_time": "2024-02-17T05:48:00.076Z",
    "category": null,
    "tags": null,
    "tickers": null,
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
export const validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                format: {
                    name: "ethereum-sig",
                }
            }
        ]
    },
    db: {
        key: 401,
        addedTimestamp: toBeTimestamp("2024-02-17T05:48:00.076Z")
    },
    action: "reply",
    content: "To the moon!",
    timestamp: toBeTimestamp("2024-02-17T05:47:59.932Z"),
    authors: [
        {
            addresses: [
                {
                    value: "0x49e8d02294e721ac47f6f4794625312b9005fd80",
                    format: { name: "ethereum-pubkey" },
                    verified: true
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
            format: {
                name: "ethereum-sig",
            }
        },
    ],
    signatures: [
        {
            value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
            pubkey: "0x49e8d02294e721ac47f6f4794625312b9005fd80",
            format: { name: "ethereum-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingDmpSignedV2",
            protocol: {
                name: "dmp",
                version: "0.1.0"
            },
            signedString: "{\"version\":\"dmp_v0.1.0\",\"time\":\"2024-02-17T05:47:59.932Z\",\"action\":\"reply\",\"target\":\"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b\",\"title\":\"\",\"text\":\"To the moon!\",\"license\":\"SPDX-License-Identifier: CC0-1.0\"}",
            ids: [
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                }
            ],
            signatures: [
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    pubkey: "0x49e8d02294e721ac47f6f4794625312b9005fd80",
                    format: { name: "ethereum-sig" }
                }
            ]
        }
    ]
};
export const validNostrReplyToDmpEvent = {
    kind: 1,
    created_at: 1708153412,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "1.0.0"],
        ["spasm_action", "reply"],
        ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
    ],
    content: "To the SPASM!",
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
    id: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
    sig: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290"
};
export const validPostWithNostrReplyToDmpEvent = {
    id: 5,
    target: validNostrReplyToDmpEvent.tags[3][1],
    action: "reply",
    title: "",
    text: validNostrReplyToDmpEvent.content,
    signer: toBeNpub(validNostrReplyToDmpEvent.pubkey),
    signed_message: JSON.stringify(validNostrReplyToDmpEvent),
    signature: validNostrReplyToDmpEvent.sig,
    // signed_time: validNostrReplyToDmpEvent.created_at,
    signed_time: new Date(validNostrReplyToDmpEvent.created_at).toISOString(),
    added_time: "2024-01-18T02:37:40.712Z",
    category: null,
    tags: null,
    tickers: null,
    upvote: 11,
    downvote: 1,
    bullish: 2,
    bearish: 3,
    important: 6,
    scam: 3,
    comments_count: 3,
    latest_action_added_time: "2024-01-21T10:52:37.165Z",
};
export const validPostWithNostrReplyToDmpEventConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                format: {
                    name: "ethereum-sig"
                }
            }
        ]
    },
    db: {
        key: 5,
        addedTimestamp: toBeTimestamp("2024-01-18T02:37:40.712Z")
    },
    action: "reply",
    content: "To the SPASM!",
    timestamp: 1708153412,
    authors: [
        {
            addresses: [
                {
                    value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: {
                        name: "nostr-hex",
                    },
                    verified: true
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
            format: {
                name: "nostr-hex",
            }
        },
        {
            value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
            format: {
                name: "nostr-sig",
            }
        }
        // {
        //   value: "spasmid01xyz",
        //   format: {
        //     name: "spasmid",
        //     version: "01"
        //   }
        // }
    ],
    signatures: [
        {
            value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
            pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            format: { name: "nostr-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSpasmSignedV2",
            protocol: {
                name: "nostr",
                hasExtraSpasmFields: true,
                extraSpasmFieldsVersion: "1.0.0"
            },
            originalObject: validNostrReplyToDmpEvent,
            ids: [
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
                // {
                //   value: "spasmid01xyz",
                //   format: {
                //     name: "spasmid",
                //     version: "01"
                //   }
                // }
            ],
            signatures: [
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: { name: "nostr-sig" }
                }
            ],
        }
    ],
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 11
                },
                {
                    value: "downvote",
                    total: 1
                },
                {
                    value: "bullish",
                    total: 2
                },
                {
                    value: "bearish",
                    total: 3
                },
                {
                    value: "important",
                    total: 6
                },
                {
                    value: "scam",
                    total: 3
                },
            ]
        },
        {
            action: "reply",
            total: 3
        }
    ]
};
export const validPostWithDmpEventSignedClosed = {
    id: 1337,
    target: validDmpEvent.target,
    action: validDmpEvent.action,
    title: validDmpEvent.title,
    text: validDmpEvent.text,
    signer: validDmpEventSignedClosed.signer,
    signed_message: JSON.stringify(validDmpEvent),
    signature: validDmpEventSignedClosed.signature,
    signed_time: validDmpEvent.time,
    added_time: "2022-01-01T22:04:46.195Z",
    // category: "privacy",
    source: "degenrocket.space",
    tags: null,
    tickers: null,
    upvote: 8,
    downvote: 0,
    bullish: 5,
    bearish: 0,
    important: 6,
    scam: 0,
    comments_count: 3,
    latest_action_added_time: "2023-01-01T22:04:46.195Z",
    children: [
        validPostWithNostrReplyToDmpEvent,
        validSpasmWithDmpReplyToDmpEventV0
    ]
};
export const validSpasmDmpEventSignedClosedV0 = validPostWithDmpEventSignedClosed;
export const validDmpEventConvertedToSpasmEventV2 = {
    type: "SpasmEventV2",
    action: "post",
    ids: [
        {
            value: "spasmid0103086d8c9881aa566b755d0b50fc0c80ab4362224860ee21859e658f64cca4c3",
            format: {
                name: "spasmid",
                version: "01"
            }
        }
    ],
    title: "genesis",
    content: "not your keys, not your words",
    timestamp: 1641074686178,
    license: "MIT",
    siblings: [
        {
            type: "SiblingDmpV2",
            protocol: {
                name: "dmp",
                version: "0.0.1"
            },
            signedString: JSON.stringify(validDmpEvent),
        }
    ]
};
export const validDmpEventSignedClosedConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: "post",
    title: "genesis",
    content: "not your keys, not your words",
    timestamp: 1641074686178,
    authors: [
        {
            addresses: [
                {
                    value: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
                    format: { name: "ethereum-pubkey" },
                    verified: true
                }
            ]
        }
    ],
    license: "MIT",
    ids: [
        {
            value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            format: { name: "ethereum-sig", }
        }
    ],
    signatures: [
        {
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
            format: { name: "ethereum-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingDmpSignedV2",
            protocol: {
                name: "dmp",
                version: "0.0.1"
            },
            signedString: JSON.stringify(validDmpEvent),
            ids: [
                {
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                    format: { name: "ethereum-sig" }
                }
            ],
            signatures: [
                {
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                    pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
                    format: { name: "ethereum-sig" }
                }
            ]
        }
    ]
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    stats: [
        {
            action: "react",
            latestTimestamp: 1641077686178,
            latestDbTimestamp: 1644077686178,
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 5
                },
                {
                    value: "bearish",
                    total: 0
                },
                {
                    value: "important",
                    total: 6
                },
                {
                    value: "scam",
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            latestTimestamp: 1641087686178,
            latestDbTimestamp: 1644087686178,
            total: 3
        }
    ],
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    stats: [
        {
            action: "react",
            latestTimestamp: 1642077686178,
            latestDbTimestamp: 1643077686178,
            contents: [
                {
                    value: "upvote",
                    total: 18
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 8
                },
                {
                    value: "bearish",
                    total: 7
                },
                {
                    value: "important",
                    total: 26
                },
                {
                    value: "scam",
                    total: 3
                },
            ]
        },
        {
            action: "reply",
            latestTimestamp: 1642087686178,
            latestDbTimestamp: 1643087686178,
            total: 18081
        }
    ],
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 5
                },
                {
                    value: "bearish",
                    total: 0
                },
                {
                    value: "important",
                    total: 6
                },
                {
                    value: "scam",
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            total: 3
        }
    ],
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    db: {
        key: 1337,
        addedTimestamp: 1641074686195,
        updatedTimestamp: 1641074686195
    },
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    db: {
        key: 1337,
        table: "spasm_events",
        addedTimestamp: 1641074686195,
        updatedTimestamp: 1642074686195
    },
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmV2 = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    // categories: [
    //   {
    //     name: "privacy"
    //   }
    // ],
    db: {
        key: 1337,
        addedTimestamp: 1641074686195
    },
    source: {
        name: "degenrocket.space"
    },
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                {
                    value: "downvote",
                    total: 0
                },
                {
                    value: "bullish",
                    total: 5
                },
                {
                    value: "bearish",
                    total: 0
                },
                {
                    value: "important",
                    total: 6
                },
                {
                    value: "scam",
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            total: 3
        }
    ],
    children: [
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        },
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
export const validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        }
    ]
};
export const validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                }
            ]
        }
    ]
};
export const validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
export const validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        },
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
export const validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    children: [
        // convertToSpasm(validSpasmWithDmpReplyToDmpEventV0)
        {
            ids: [
                {
                    value: "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                    format: {
                        name: "ethereum-sig",
                    }
                },
            ],
            event: validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        },
        // convertToSpasm(validPostWithNostrReplyToDmpEvent)
        {
            ids: [
                {
                    value: "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0",
                    format: {
                        name: "spasmid",
                        version: "01"
                    }
                },
                {
                    value: "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
                    format: {
                        name: "nostr-hex",
                    }
                },
                {
                    value: "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290",
                    format: {
                        name: "nostr-sig",
                    }
                }
            ],
            event: validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        }
    ]
};
export const validDmpEventSignedOpenedConvertedToSpasmV2 = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
};
export const validDmpEventSignedClosedConvertedToSpasmV2DifferentSource = {
    ...validPostWithDmpEventSignedClosedConvertedToSpasmV2,
    source: {
        name: "differentsource.space"
    },
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2 = {
    type: "SpasmEventEnvelopeV2",
    ids: validDmpEventSignedClosedConvertedToSpasmV2.ids,
    siblings: validDmpEventSignedClosedConvertedToSpasmV2.siblings,
    source: validPostWithDmpEventSignedClosedConvertedToSpasmV2.source,
    db: validPostWithDmpEventSignedClosedConvertedToSpasmV2.db,
    stats: validPostWithDmpEventSignedClosedConvertedToSpasmV2.stats
};
export const validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent = {
    ...validPostWithNostrReplyToDmpEventConvertedToSpasmV2,
    parent: {
        ids: validPostWithNostrReplyToDmpEventConvertedToSpasmV2.parent.ids,
        event: validDmpEventSignedClosedConvertedToSpasmV2
    }
};
// Post with event is essentially SpasmEventV0
export const validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2 = validPostWithDmpEventSignedClosedConvertedToSpasmV2;
export const validNostrEvent = {
    id: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
    created_at: 1673347337,
    kind: 1,
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    tags: [
        [
            "e",
            "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206"
        ],
        [
            "p",
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
        ]
    ]
};
export const validNostrSpasmEvent = {
    kind: 1,
    created_at: 1705462957,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "1.0.0"],
        ["spasm_action", "post"],
        ["spasm_title", "Nostr Spasm genesis"]
    ],
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
    id: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
};
export const validNostrEventSignedOpened = {
    id: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
    created_at: 1673347337,
    kind: 1,
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    tags: [
        [
            "e",
            "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206"
        ],
        [
            "p",
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
        ]
    ],
    sig: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"
};
export const validNostrSpasmEventSignedOpened = {
    kind: 1,
    created_at: 1705462957,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "1.0.0"],
        ["spasm_action", "post"],
        ["spasm_title", "Nostr Spasm genesis"]
    ],
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
    id: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
    sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"
};
export const validNostrSpasmEventSignedOpenedWithInvalidSignature = {
    ...validNostrSpasmEventSignedOpened,
    sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f2"
};
export const validNostrSpasmEventSignedOpenedWithInvalidContent = {
    ...validNostrSpasmEventSignedOpened,
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls!"
};
export const validNostrSpasmEventSignedOpenedWithInvalidSigner = {
    ...validNostrSpasmEventSignedOpened,
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f43"
};
export const validPostWithNostrEventSignedOpened = {
    id: 6,
    target: "",
    action: "post",
    title: "",
    text: validNostrEventSignedOpened.content,
    signer: toBeNpub(validNostrEventSignedOpened.pubkey),
    signed_message: JSON.stringify(validNostrEventSignedOpened),
    signature: validNostrEventSignedOpened.sig,
    signed_time: validNostrEventSignedOpened.created_at,
    added_time: "2024-01-17T03:42:38.608Z",
    category: null,
    tags: null,
    tickers: null,
    upvote: 8,
    downvote: null,
    bullish: false,
    bearish: 5,
    important: 0,
    scam: 3,
    comments_count: null,
    latest_action_added_time: "2024-01-17T03:44:46.195Z",
};
export const validSpasmNostrEventSignedOpenedV0 = validPostWithNostrEventSignedOpened;
export const validPostWithNostrSpasmEventSignedOpened = {
    id: 7,
    target: "",
    action: "post",
    title: validNostrSpasmEventSignedOpened.tags[3][1],
    text: validNostrSpasmEventSignedOpened.content,
    signer: toBeNpub(validNostrSpasmEventSignedOpened.pubkey),
    signed_message: JSON.stringify(validNostrSpasmEventSignedOpened),
    signature: validNostrSpasmEventSignedOpened.sig,
    signed_time: new Date(validNostrSpasmEventSignedOpened.created_at).toISOString(),
    added_time: "2024-01-17T03:42:38.908Z",
    category: null,
    tags: null,
    tickers: null,
    upvote: 0,
    downvote: 3,
    bullish: 9,
    bearish: 0,
    important: 6,
    scam: 0,
    comments_count: 5,
    latest_action_added_time: "2024-01-17T03:44:46.195Z",
};
export const validSpasmNostrSpasmEventSignedOpenedV0 = validPostWithNostrSpasmEventSignedOpened;
export const validNostrEventConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206",
                format: {
                    name: "nostr-hex"
                }
            }
        ]
    },
    action: "reply",
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    timestamp: 1673347337,
    authors: [
        {
            addresses: [
                {
                    value: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    mentions: [
        {
            addresses: [
                {
                    value: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    ids: [
        {
            value: "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
            format: {
                name: "nostr-hex"
            }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrV2",
            originalObject: validNostrEvent,
            protocol: {
                name: "nostr",
            },
            ids: [
                {
                    value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ]
};
export const validNostrSpasmEventConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: "post",
    title: "Nostr Spasm genesis",
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
    timestamp: 1705462957,
    authors: [
        {
            addresses: [
                {
                    value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            format: {
                name: "nostr-hex"
            }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSpasmV2",
            originalObject: validNostrSpasmEvent,
            protocol: {
                name: "nostr",
                hasExtraSpasmFields: true,
                extraSpasmFieldsVersion: "1.0.0"
            },
            ids: [
                {
                    value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ]
};
export const validNostrEventSignedOpenedConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    parent: {
        ids: [
            {
                value: "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206",
                format: {
                    name: "nostr-hex"
                }
            }
        ]
    },
    action: "reply",
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
    timestamp: 1673347337,
    authors: [
        {
            addresses: [
                {
                    value: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: {
                        name: "nostr-hex"
                    },
                    verified: true
                }
            ]
        }
    ],
    mentions: [
        {
            addresses: [
                {
                    value: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ],
    ids: [
        {
            value: "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
            format: {
                name: "nostr-hex"
            }
        }
    ],
    signatures: [
        {
            value: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262",
            pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            format: { name: "nostr-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSignedV2",
            originalObject: validNostrEventSignedOpened,
            protocol: {
                name: "nostr",
            },
            ids: [
                {
                    value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ],
            signatures: [
                {
                    value: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262",
                    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: { name: "nostr-sig" }
                }
            ]
        }
    ]
};
export const validNostrSpasmEventSignedOpenedConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: "post",
    title: "Nostr Spasm genesis",
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
    timestamp: 1705462957,
    authors: [
        {
            addresses: [
                {
                    value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: { name: "nostr-hex" },
                    verified: true
                }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    ids: [
        {
            value: "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            format: { name: "nostr-hex" }
        },
        {
            value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
            format: { name: "nostr-sig" }
        }
    ],
    signatures: [
        {
            value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
            pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            format: { name: "nostr-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingNostrSpasmSignedV2",
            originalObject: validNostrSpasmEventSignedOpened,
            protocol: {
                name: "nostr",
                hasExtraSpasmFields: true,
                extraSpasmFieldsVersion: "1.0.0"
            },
            ids: [
                {
                    value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
                    format: { name: "nostr-hex" }
                },
                {
                    value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
                    format: { name: "nostr-sig" }
                }
            ],
            signatures: [
                {
                    value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
                    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: { name: "nostr-sig" }
                }
            ]
        }
    ]
};
export const validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2 = {
    ...validNostrEventSignedOpenedConvertedToSpasmV2,
    db: {
        key: 6,
        addedTimestamp: toBeTimestamp("2024-01-17T03:42:38.608Z")
    },
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 8
                },
                // downvote count is null
                // {
                //   value: "downvote",
                //   total: 0
                // },
                // bullish count is null
                // {
                //   value: "bullish",
                //   total: 0
                // },
                {
                    value: "bearish",
                    total: 5
                },
                {
                    value: "important",
                    total: 0
                },
                {
                    value: "scam",
                    total: 3
                },
            ]
        },
        // comments_count is null
        // {
        //   action: "reply",
        //   total: 7
        // }
    ]
};
export const validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2 = {
    ...validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
    type: "SpasmEventV2",
    db: {
        key: 7,
        addedTimestamp: toBeTimestamp("2024-01-17T03:42:38.908Z")
    },
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 0
                },
                {
                    value: "downvote",
                    total: 3
                },
                {
                    value: "bullish",
                    total: 9
                },
                {
                    value: "bearish",
                    total: 0
                },
                {
                    value: "important",
                    total: 6
                },
                {
                    value: "scam",
                    total: 0
                },
            ]
        },
        {
            action: "reply",
            total: 5
        }
    ]
};
export const validPostWithRssItem = {
    id: 18081,
    guid: "https://forum.degenrocket.space/?l=terraforming",
    source: "degenrocket.space",
    author: "stablepony",
    tickers: "cookies",
    title: "To the Moon!",
    url: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
    description: "Tornado is coming back! Roger that! Starting the engine...",
    pubdate: "2024-03-12T20:24:04.240Z",
    category: "defi",
    tags: ["dark", "forest"],
    upvote: 3,
    downvote: null,
    bullish: 2,
    bearish: 0,
    important: 6,
    scam: 1,
    comments_count: 0,
    latest_action_added_time: null
};
export const validPostWithRssItemReverseTags = {
    id: 18081,
    guid: "https://forum.degenrocket.space/?l=terraforming",
    source: "degenrocket.space",
    author: "stablepony",
    tickers: "cookies",
    title: "To the Moon!",
    url: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
    description: "Tornado is coming back! Roger that! Starting the engine...",
    pubdate: "2024-03-12T20:24:04.240Z",
    category: "defi",
    tags: ["forest", "dark"],
    upvote: 3,
    downvote: null,
    bullish: 2,
    bearish: 0,
    important: 6,
    scam: 1,
    comments_count: 0,
    latest_action_added_time: null
};
export const validSpasmEventRssItemV0 = validPostWithRssItem;
export const validSpasmEventRssItemV0ConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    ids: [
        {
            value: "spasmid018c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
            format: {
                name: "spasmid",
                version: "01"
            }
        },
        {
            value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
            format: { name: "url" }
        },
        {
            value: "https://forum.degenrocket.space/?l=terraforming",
            format: { name: "guid" }
        }
    ],
    db: {
        key: 18081
    },
    action: "post",
    title: "To the Moon!",
    content: "Tornado is coming back! Roger that! Starting the engine...",
    timestamp: toBeTimestamp("2024-03-12T20:24:04.240Z"),
    authors: [
        {
            usernames: [{ value: "stablepony" }]
        }
    ],
    categories: [{ name: "defi" }],
    links: [
        {
            value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?b=21&t=fog&c=samourai&h=hijack",
            originalProtocolKey: "url"
        },
        {
            value: "https://forum.degenrocket.space/?l=terraforming",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?l=terraforming",
            originalProtocolKey: "guid"
        }
    ],
    keywords: ["dark", "forest", "cookies"],
    source: {
        name: "degenrocket.space"
    },
    siblings: [
        {
            type: "SiblingWeb2V2",
            protocol: { name: "web2" },
            originalObject: {
                id: 18081,
                guid: "https://forum.degenrocket.space/?l=terraforming",
                source: "degenrocket.space",
                author: "stablepony",
                tickers: "cookies",
                title: "To the Moon!",
                url: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
                description: "Tornado is coming back! Roger that! Starting the engine...",
                pubdate: "2024-03-12T20:24:04.240Z",
                category: "defi",
                tags: ["dark", "forest"],
                upvote: 3,
                downvote: null,
                bullish: 2,
                bearish: 0,
                important: 6,
                scam: 1,
                comments_count: 0,
                latest_action_added_time: null
            },
            ids: [
                {
                    value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
                    format: { name: "url" }
                },
                {
                    value: "https://forum.degenrocket.space/?l=terraforming",
                    format: { name: "guid" }
                }
            ]
        }
    ],
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 3
                },
                // {
                //   value: "downvote",
                //   total: 0
                // },
                {
                    value: "bullish",
                    total: 2
                },
                {
                    value: "bearish",
                    total: 0
                },
                {
                    value: "important",
                    total: 6
                },
                {
                    value: "scam",
                    total: 1
                },
            ]
        },
        {
            action: "reply",
            total: 0
        }
    ]
};
export const validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2 = {
    ...validSpasmEventRssItemV0ConvertedToSpasmV2,
    keywords: ["forest", "dark", "cookies"]
};
export const SpasmEventV2ToTestSpasmid01 = {
    type: "SpasmEventV2",
    root: {
        depth: 3,
        marker: "root-marker1",
        ids: [
            { value: "root-idz" },
            { value: "root-id3" },
            { value: "root-id3a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "post",
            title: "root-event-title",
            content: "root-event-text"
        }
    },
    parent: {
        depth: 1,
        marker: "parent-marker1",
        ids: [
            { value: "parent-idx" },
            { value: "parent-id1" },
            { value: "parent-id1a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "reply",
            title: "parent-event-title",
            content: "parent-event-text"
        }
    },
    ids: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            format: { name: "url" },
            hosts: [
                {
                    value: "ids-host-1",
                    marker: "ids-host-marker-1"
                },
                {
                    value: "ids-host-1a",
                    marker: "ids-host-marker-1a"
                }
            ]
        },
        {
            value: "spasmid01abc",
            format: { name: "spasmid" },
            hosts: [{ value: "ids-host-1" }]
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            format: { name: "guid" }
        },
    ],
    db: {
        key: 20240430,
        addedTimestamp: toBeTimestamp("2024-03-12T20:24:04.240Z"),
        updatedTimestamp: toBeTimestamp("2024-03-12T20:24:04.240Z"),
        table: "spasm_events"
    },
    timestamp: toBeTimestamp("2024-03-12T20:24:04.240Z"),
    title: "Test title",
    action: "reply",
    content: "Test content\nnew line\\ndoule escape character\\\ntriple escape character and 'single quotes'",
    authors: [
        // Author 2
        {
            addresses: [
                {
                    format: { name: "ethereum-pubkey" },
                    verified: true,
                    value: "address3a",
                }
            ]
        },
        // Author 1
        {
            addresses: [
                {
                    verified: false,
                    value: "address1b",
                    format: { name: "ethereum-pubkey" }
                },
                {
                    value: "address1a",
                    verified: true,
                    format: { name: "ethereum-pubkey" }
                }
            ],
            usernames: [
                {
                    owner: "owner1b",
                    protocol: "protocol1b",
                    proof: "proof1b",
                    provider: "provider1b",
                    value: "username1b",
                },
                {
                    owner: "owner1a",
                    value: "username1a",
                    protocol: "protocol1a",
                    proof: "proof1a",
                    provider: "provider1a"
                }
            ],
            marker: "author1-marker"
        },
        // Author 3
        {
            usernames: [
                {
                    value: "username2a",
                    owner: "owner2a",
                    protocol: "protocol2a",
                    proof: "proof2a",
                    provider: "provider2a"
                },
                { value: "username2b" }
            ]
        }
    ],
    categories: [
        { name: 0 },
        { name: 1 },
        { name: "category-1", sub: { name: "sub1" } }
    ],
    tips: [
        {
            text: "tips-text-88",
            expiration: { timestamp: 1641074686179 },
            address: "tips-address-88",
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "testnet", id: "2" }
        },
        {
            address: "tips-address-84",
            currency: { name: "Monero", ticker: "XMR" },
            text: "tips-text-84",
            network: { name: "mainnet", id: "1" },
            expiration: { timestamp: 1641074686178 }
        },
    ],
    hosts: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            search: "?i=url1",
            marker: "hosts-marker-url1",
            origin: "https://forum.degenrocket.space",
            pathname: "/",
            protocol: "https",
            host: "forum.degenrocket.space",
            originalProtocolKey: "url"
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "hosts-marker-guid1",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?i=guid1",
            originalProtocolKey: "guid"
        }
    ],
    links: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "links-marker-url1",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?i=url1",
            originalProtocolKey: "url"
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "links-marker-guid1",
            protocol: "https",
            origin: "https://forum.degenrocket.space",
            host: "forum.degenrocket.space",
            pathname: "/",
            search: "?i=guid1",
            originalProtocolKey: "guid"
        }
    ],
    keywords: ["keyword2", "keyword3", "keyword1"],
    tags: [
        ["tag2-0", "tag2-1"],
        ["tag3-0", "tag3-1", "tag3-2"],
        [1, 2, "3", "four", [5], { value: "six" }, null, undefined],
        ["tag5-0", "tag5-1", "tag5-2", "tag5-3"],
        ["tag4-0", "tag4-1", "tag4-2"],
        ["tag1-0", "tag1-1"]
    ],
    medias: [
        // media 2
        {
            ids: [
                { value: "mediaid2" },
                { value: "mediaid5" },
                { value: "mediaid4" }
            ],
            hashes: [
                { value: "hash7" },
                { value: "hash8" }
            ]
        },
        // media 1
        {
            ids: [
                { value: "mediaid3" },
                { value: "mediaid1" }
            ]
        },
        // media 3
        {
            hashes: [
                { value: "hash4" },
                { value: "hash3" }
            ],
            links: [
                { value: "link4" },
                { value: "link2" }
            ]
        },
    ],
    references: [
        // reference 2
        {
            ids: [
                { value: "ref-id4" },
                { value: "ref-id2" }
            ],
            marker: "ref-marker2"
        },
        // reference 1
        {
            ids: [
                { value: "ref-id3" },
                { value: "ref-id1" }
            ],
            marker: "ref-marker1"
        },
    ],
    mentions: [
        // Mention 3
        {
            usernames: [
                {
                    value: "mention-username2a",
                    owner: "mention-owner2a",
                    protocol: "mention-protocol2a",
                    proof: "mention-proof2a",
                    provider: "mention-provider2a"
                },
                { value: "mention-username2b" }
            ]
        },
        // Mention 1
        {
            addresses: [
                {
                    value: "mention-address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "mention-address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "mention-username1a",
                    owner: "mention-owner1a",
                    protocol: "mention-protocol1a",
                    proof: "mention-proof1a",
                    provider: "mention-provider1a"
                },
                {
                    value: "mention-username1b",
                    owner: "mention-owner1b",
                    protocol: "mention-protocol1b",
                    proof: "mention-proof1b",
                    provider: "mention-provider1b"
                },
            ],
            marker: "mention1-marker"
        },
        // Mention 2
        {
            addresses: [
                {
                    value: "mention-address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        }
    ],
    proofs: [
        {
            value: "proof-value2",
            links: [
                { value: "proof-value2-link1" },
                { value: "proof-value2-link2" }
            ]
        },
        {
            value: "proof-value1",
            links: [
                { value: "proof-value1-link2", marker: "proof-marker1" },
                { value: "proof-value1-link1" },
                { value: "proof-value1-link1a" },
            ],
            protocol: {
                name: "proof-protocol-name1",
                version: "proof-protocol-version1"
            }
        },
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    language: "en",
    // TODO add complex logic for sorting 'extra'.
    // - if a key is an array, sort it 
    //   - if an element inside the array is an array, sort it
    // - if a key is an object, go inside to check for arrays
    extra: {
        string: "hello",
        object: { value: "123" },
        number: 1,
        null: null,
        array: [1, 2, 3],
        undefined: undefined
    },
    pows: [
        {
            marker: "spasmpow01",
            nonce: "hello",
            difficulty: 1,
            words: ["degen", "rebel"]
        },
        {
            marker: "spasmid02",
            nonce: 20240430,
            difficulty: 5,
            words: ["one", "two", "three", "four", "five"],
        },
        {
            marker: "spasmid01",
            nonce: 18081,
            difficulty: 4,
            words: ["one", "two", "three", "four"],
            network: {
                name: "pow-network-name",
                id: "03"
            }
        },
        {
            marker: "spasmid01",
            nonce: 8,
            difficulty: 2,
            words: ["one", "two"],
        }
    ],
    source: {
        name: "degenrocket.space",
        uiUrl: "https://degenrocket.space/news/",
        apiUrl: "https://degenrocket.space/api/",
        query: "posts?webType=web3&category=any&platform=false&source=false&activity=all&keyword=false&ticker=false&limitWeb2=0&limitWeb3=50",
        showSource: true
    },
    siblings: [
        {
            type: "SiblingWeb2V2",
            protocol: { name: "web2" },
            originalObject: {
                type: "SpasmEventBodyV2"
            },
            ids: [
                {
                    value: "https://forum.degenrocket.space/?i=url1",
                    format: { name: "url" },
                    hosts: [
                        {
                            value: "ids-host-1",
                            marker: "ids-host-marker-1"
                        },
                        {
                            value: "ids-host-1a",
                            marker: "ids-host-marker-1a"
                        }
                    ]
                },
                {
                    value: "spasmid01abc",
                    format: { name: "spasmid" },
                    hosts: [{ value: "ids-host-1" }]
                },
                {
                    value: "https://forum.degenrocket.space/?i=guid1",
                    format: { name: "guid" }
                }
            ],
        }
    ],
    stats: [
        {
            action: "react",
            contents: [
                {
                    value: "upvote",
                    total: 3
                }
            ]
        },
        {
            action: "reply",
            total: 0
        }
    ],
    sharedBy: {
        ids: [
            {
                value: "sharedBy-ids-1"
            },
            {
                value: "sharedBy-ids-2"
            }
        ]
    }
};
export const SpasmEventV2ToTestSpasmid01_ChangedNotImportantKeys = {
    type: "SpasmEventV2",
    root: {
        depth: 5, // changed
        marker: "root-marker1",
        ids: [
            { value: "root-id3" },
            { value: "root-idz" },
            { value: "root-id3a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "post",
            title: "root-event-title-new", // changed
            content: "root-event-text-new" // changed
        }
    },
    parent: {
        depth: 4, // changed
        marker: "parent-marker1",
        ids: [
            { value: "parent-id1" },
            { value: "parent-idx" },
            { value: "parent-id1a" }
        ],
        event: {
            type: "SpasmEventV2",
            action: "edit", // changed
            title: "parent-event-title-new", // changed
            content: "parent-event-text-new" // changed
        }
    },
    ids: [
        {
            value: "https://forum.degenrocket.space/?i=url1-new", // changed
            format: { name: "nostr-hex" }, // changed
            hosts: [
                {
                    value: "ids-host-1-new", // changed
                    marker: "ids-host-marker-1-new" // changed
                },
                {
                    value: "ids-host-1a-new", // changed
                    marker: "ids-host-marker-1a-new" // changed
                }
            ]
        },
        {
            value: "spasmid01abc-new", // changed
            format: { name: "ethereum-sig" }, // changed
            hosts: [{ value: "ids-host-1-new" }] // changed
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1-new", // changed
            format: { name: "spasmid" } // changed
        }
    ],
    db: {
        key: 20240431, // changed
        addedTimestamp: toBeTimestamp("2024-03-12T20:24:04.241Z"), // changed
        updatedTimestamp: toBeTimestamp("2024-03-12T20:24:04.241Z"), // changed
        table: "spasm_events-new" // changed
    },
    timestamp: toBeTimestamp("2024-03-12T20:24:04.240Z"),
    title: "Test title",
    action: "reply",
    content: "Test content\nnew line\\ndoule escape character\\\ntriple escape character and 'single quotes'",
    authors: [
        // Author 2
        {
            addresses: [
                {
                    format: { name: "ethereum-pubkey" },
                    verified: false, // changed
                    value: "address3a",
                }
            ]
        },
        // Author 1
        {
            addresses: [
                {
                    verified: true, // changed
                    value: "address1b",
                    format: { name: "ethereum-pubkey" }
                },
                {
                    value: "address1a",
                    verified: false, // changed
                    format: { name: "ethereum-pubkey" }
                }
            ],
            usernames: [
                {
                    owner: "owner1b",
                    protocol: "protocol1b",
                    proof: "proof1b",
                    provider: "provider1b",
                    value: "username1b",
                },
                {
                    owner: "owner1a",
                    value: "username1a",
                    protocol: "protocol1a",
                    proof: "proof1a",
                    provider: "provider1a"
                }
            ],
            marker: "author1-marker"
        },
        // Author 3
        {
            usernames: [
                {
                    value: "username2a",
                    owner: "owner2a",
                    protocol: "protocol2a",
                    proof: "proof2a",
                    provider: "provider2a"
                },
                { value: "username2b" }
            ]
        }
    ],
    categories: [
        { name: 5 }, // changed
        { name: 6 }, // changed
        { name: "category-3", sub: { name: "sub4" } } // changed
    ],
    // TODO should tips be included in spasmid?
    // e.g., user might want to update tips on his posts, so
    // then tips should NOT be included.
    // However, what if a malicious actor gets access to user's
    // private key and updates all posts with his tips addresses?
    tips: [
        {
            text: "tips-text-88",
            expiration: { timestamp: 1641074686179 },
            address: "tips-address-88",
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "testnet", id: "2" }
        },
        {
            address: "tips-address-84",
            currency: { name: "Monero", ticker: "XMR" },
            text: "tips-text-84",
            network: { name: "mainnet", id: "1" },
            expiration: { timestamp: 1641074686178 }
        },
    ],
    hosts: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            search: "?i=url1-new", // changed
            marker: "hosts-marker-url1",
            origin: "https://forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            protocol: "https-new", // changed
            host: "forum.degenrocket.space-new", // changed
            originalProtocolKey: "url-new" // changed
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "hosts-marker-guid1",
            protocol: "https-new", // changed
            origin: "https://forum.degenrocket.space-new", // changed
            host: "forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            search: "?i=guid1-new", // changed
            originalProtocolKey: "guid-new" // changed
        }
    ],
    links: [
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "links-marker-url1",
            protocol: "https-new", // changed
            origin: "https://forum.degenrocket.space-new", // changed
            host: "forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            search: "?i=url1-new", // changed
            originalProtocolKey: "url-new" // changed
        },
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "links-marker-guid1",
            protocol: "https-new", // changed
            origin: "https://forum.degenrocket.space-new", // changed
            host: "forum.degenrocket.space-new", // changed
            pathname: "/-new", // changed
            search: "?i=guid1-new", // changed
            originalProtocolKey: "guid-new" // changed
        }
    ],
    keywords: ["keyword2", "keyword3", "keyword1"],
    tags: [
        ["tag2-0", "tag2-1"],
        ["tag3-0", "tag3-1", "tag3-2"],
        [1, 2, "3", "four", [5], { value: "six" }, null, undefined],
        ["tag5-0", "tag5-1", "tag5-2", "tag5-3"],
        ["tag4-0", "tag4-1", "tag4-2"],
        ["tag1-0", "tag1-1"]
    ],
    medias: [
        // media 2
        {
            ids: [
                { value: "mediaid2" },
                { value: "mediaid5" },
                { value: "mediaid4" }
            ],
            hashes: [
                { value: "hash7" },
                { value: "hash8" }
            ]
        },
        // media 1
        {
            ids: [
                { value: "mediaid3" },
                { value: "mediaid1" }
            ]
        },
        // media 3
        {
            hashes: [
                { value: "hash4" },
                { value: "hash3" }
            ],
            links: [
                { value: "link4" },
                { value: "link2" }
            ]
        },
    ],
    references: [
        // reference 2
        {
            ids: [
                { value: "ref-id4" },
                { value: "ref-id2" }
            ],
            marker: "ref-marker2"
        },
        // reference 1
        {
            ids: [
                { value: "ref-id3" },
                { value: "ref-id1" }
            ],
            marker: "ref-marker1"
        },
    ],
    mentions: [
        // Mention 3
        {
            usernames: [
                {
                    value: "mention-username2a",
                    owner: "mention-owner2a",
                    protocol: "mention-protocol2a",
                    proof: "mention-proof2a",
                    provider: "mention-provider2a"
                },
                { value: "mention-username2b" }
            ]
        },
        // Mention 1
        {
            addresses: [
                {
                    value: "mention-address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "mention-address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "mention-username1a",
                    owner: "mention-owner1a",
                    protocol: "mention-protocol1a",
                    proof: "mention-proof1a",
                    provider: "mention-provider1a"
                },
                {
                    value: "mention-username1b",
                    owner: "mention-owner1b",
                    protocol: "mention-protocol1b",
                    proof: "mention-proof1b",
                    provider: "mention-provider1b"
                },
            ],
            marker: "mention1-marker"
        },
        // Mention 2
        {
            addresses: [
                {
                    value: "mention-address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        }
    ],
    proofs: [
        {
            value: "proof-value2",
            links: [
                { value: "proof-value2-link1" },
                { value: "proof-value2-link2" }
            ]
        },
        {
            value: "proof-value1",
            links: [
                { value: "proof-value1-link2", marker: "proof-marker1" },
                { value: "proof-value1-link1" },
                { value: "proof-value1-link1a" },
            ],
            protocol: {
                name: "proof-protocol-name1",
                version: "proof-protocol-version1"
            }
        },
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    language: "en",
    // TODO add complex logic for sorting 'extra'.
    // - if a key value is an array, sort it 
    //   - if an element inside the array is an array, sort it
    // - if a key value is an object, go inside to check for arrays
    extra: {
        string: "hello",
        object: { value: "123" },
        number: 1,
        null: null,
        array: [1, 2, 3],
        undefined: undefined
    },
    pows: [
        {
            marker: "spasmpow01",
            nonce: "hello",
            difficulty: 1,
            words: ["degen", "rebel"]
        },
        {
            marker: "spasmid02",
            nonce: 20240430,
            difficulty: 5,
            words: ["one", "two", "three", "four", "five"],
        },
        {
            marker: "spasmid01",
            nonce: 18081,
            difficulty: 4,
            words: ["one", "two", "three", "four"],
            network: {
                name: "pow-network-name",
                id: "03"
            }
        },
        {
            marker: "spasmid01",
            nonce: 8,
            difficulty: 2,
            words: ["one", "two"],
        }
    ],
    source: {
        name: "degenrocket.space-new", // changed
        uiUrl: "https://degenrocket.space/news/-new", // changed
        apiUrl: "https://degenrocket.space/api/-new", // changed
        query: "posts?webType=web3&category=any&platform=false&source=false&activity=all&keyword=false&ticker=false&limitWeb2=0&limitWeb3=50-new", // changed
        showSource: false // changed
    },
    siblings: [
        {
            type: "SiblingWeb2V2",
            protocol: { name: "web2" },
            originalObject: {
                type: "SpasmEventBodyV2"
            },
            ids: [
                {
                    value: "https://forum.degenrocket.space/?i=url1-new", // changed
                    format: { name: "nostr-hex" }, // changed
                    hosts: [
                        {
                            value: "ids-host-1-new", // changed
                            marker: "ids-host-marker-1-new" // changed
                        },
                        {
                            value: "ids-host-1a-new", // changed
                            marker: "ids-host-marker-1a-new" // changed
                        }
                    ]
                },
                {
                    value: "spasmid01abc-new", // changed
                    format: { name: "ethereum-sig" }, // changed
                    hosts: [{ value: "ids-host-1-new" }] // changed
                },
                {
                    value: "https://forum.degenrocket.space/?i=guid1-new", // changed
                    format: { name: "spasmid" } // changed
                }
            ]
        }
    ],
    stats: [
        {
            action: "edit", // changed
            contents: [
                {
                    value: "important", // changed
                    total: 5 // changed
                }
            ]
        },
        {
            action: "moderate", // changed
            total: 9 // changed
        }
    ],
    sharedBy: {
        ids: [
            {
                value: "sharedBy-ids-1-new" // changed
            },
            {
                value: "sharedBy-ids-2-new" // changed
            }
        ]
    }
};
export const SpasmEventV2ConvertedToSpasmid01 = {
    parent: {
        ids: [
            { value: "parent-id1" },
            { value: "parent-id1a" },
            { value: "parent-idx" }
        ],
        marker: "parent-marker1",
    },
    action: "reply",
    title: "Test title",
    content: "Test content\nnew line\\ndoule escape character\\\ntriple escape character and 'single quotes'",
    timestamp: toBeTimestamp("2024-03-12T20:24:04.240Z"),
    authors: [
        // Author 1
        {
            addresses: [
                {
                    value: "address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "username1a",
                    owner: "owner1a",
                    protocol: "protocol1a",
                    proof: "proof1a",
                    provider: "provider1a"
                },
                {
                    value: "username1b",
                    owner: "owner1b",
                    protocol: "protocol1b",
                    proof: "proof1b",
                    provider: "provider1b"
                },
            ],
            marker: "author1-marker"
        },
        // Author 2
        {
            addresses: [
                {
                    value: "address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        },
        // Author 3
        {
            usernames: [
                {
                    value: "username2a",
                    owner: "owner2a",
                    protocol: "protocol2a",
                    proof: "proof2a",
                    provider: "provider2a"
                },
                { value: "username2b" }
            ]
        },
    ],
    tips: [
        {
            address: "tips-address-84",
            text: "tips-text-84",
            expiration: { timestamp: 1641074686178 },
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "mainnet", id: "1" }
        },
        {
            address: "tips-address-88",
            text: "tips-text-88",
            expiration: { timestamp: 1641074686179 },
            currency: { name: "Monero", ticker: "XMR" },
            network: { name: "testnet", id: "2" }
        }
    ],
    hosts: [
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "hosts-marker-guid1",
        },
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "hosts-marker-url1",
        },
    ],
    links: [
        {
            value: "https://forum.degenrocket.space/?i=guid1",
            marker: "links-marker-guid1",
        },
        {
            value: "https://forum.degenrocket.space/?i=url1",
            marker: "links-marker-url1",
        },
    ],
    keywords: ["keyword1", "keyword2", "keyword3"],
    tags: [
        [1, 2, "3", "four", [5], { value: "six" }, null, undefined],
        ["tag1-0", "tag1-1"],
        ["tag2-0", "tag2-1"],
        ["tag3-0", "tag3-1", "tag3-2"],
        ["tag4-0", "tag4-1", "tag4-2"],
        ["tag5-0", "tag5-1", "tag5-2", "tag5-3"],
    ],
    medias: [
        // media 1
        {
            ids: [
                { value: "mediaid1" },
                { value: "mediaid3" }
            ]
        },
        // media 2
        {
            ids: [
                { value: "mediaid2" },
                { value: "mediaid4" },
                { value: "mediaid5" }
            ],
            hashes: [
                { value: "hash7" },
                { value: "hash8" }
            ]
        },
        // media 3
        {
            links: [
                { value: "link2" },
                { value: "link4" }
            ],
            hashes: [
                { value: "hash3" },
                { value: "hash4" }
            ],
        },
    ],
    references: [
        // reference 1
        {
            ids: [
                { value: "ref-id1" },
                { value: "ref-id3" }
            ],
            marker: "ref-marker1"
        },
        // reference 2
        {
            ids: [
                { value: "ref-id2" },
                { value: "ref-id4" }
            ],
            marker: "ref-marker2"
        },
    ],
    mentions: [
        // Mention 1
        {
            addresses: [
                {
                    value: "mention-address1a",
                    format: { name: "ethereum-pubkey" },
                },
                {
                    value: "mention-address1b",
                    format: { name: "ethereum-pubkey" },
                },
            ],
            usernames: [
                {
                    value: "mention-username1a",
                    owner: "mention-owner1a",
                    protocol: "mention-protocol1a",
                    proof: "mention-proof1a",
                    provider: "mention-provider1a"
                },
                {
                    value: "mention-username1b",
                    owner: "mention-owner1b",
                    protocol: "mention-protocol1b",
                    proof: "mention-proof1b",
                    provider: "mention-provider1b"
                },
            ],
            marker: "mention1-marker"
        },
        // Mention 2
        {
            addresses: [
                {
                    value: "mention-address3a",
                    format: { name: "ethereum-pubkey" },
                }
            ]
        },
        // Mention 3
        {
            usernames: [
                {
                    value: "mention-username2a",
                    owner: "mention-owner2a",
                    protocol: "mention-protocol2a",
                    proof: "mention-proof2a",
                    provider: "mention-provider2a"
                },
                { value: "mention-username2b" }
            ]
        },
    ],
    proofs: [
        {
            value: "proof-value1",
            links: [
                { value: "proof-value1-link1" },
                { value: "proof-value1-link1a" },
                { value: "proof-value1-link2", marker: "proof-marker1" }
            ],
            protocol: {
                name: "proof-protocol-name1",
                version: "proof-protocol-version1"
            }
        },
        {
            value: "proof-value2",
            links: [
                { value: "proof-value2-link1" },
                { value: "proof-value2-link2" }
            ]
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    language: "en",
    extra: {
        number: 1,
        string: "hello",
        array: [1, 2, 3],
        object: { value: "123" },
        null: null,
        undefined: undefined
    },
    pows: [
        {
            marker: "spasmid01",
            nonce: 18081,
            difficulty: 4,
            // Sorted alphabetically
            words: ["four", "one", "three", "two"],
            network: {
                name: "pow-network-name",
                id: "03"
            }
        },
    ]
};
export const validPostWithRssItemSpecialChars = {
    "id": 7830,
    "guid": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/",
    "source": "moneroobserver-feed",
    "category": "privacy",
    "tickers": "XMR",
    "tags": null,
    "title": "hinto-janai releases Gupax v1.3.3",
    "url": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/",
    "description": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...",
    "pubdate": "2023-11-26T23:00:00.000Z",
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
export const validPostWithRssItemSpecialCharsConvertedToSpasmEventV2 = { "action": "post", "categories": [{ "name": "privacy" }], "content": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...", "db": { "key": 7830 }, "ids": [{ "format": { "name": "spasmid", "version": "01" }, "value": "spasmid012231bee2002f36b0fe99f10aa0f9bbd62b4c6240779e7a77457a5cc37498ce92" }, { "format": { "name": "url" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "format": { "name": "guid" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "keywords": ["XMR"], "links": [{ "host": "monero.observer", "origin": "https://monero.observer", "originalProtocolKey": "url", "pathname": "/hinto-janaiyo-releases-gupax-v1.3.3/", "protocol": "https", "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "host": "monero.observer", "origin": "https://monero.observer", "originalProtocolKey": "guid", "pathname": "/hinto-janaiyo-releases-gupax-v1.3.3/", "protocol": "https", "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "siblings": [{ "ids": [{ "format": { "name": "url" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "format": { "name": "guid" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "originalObject": { "bearish": null, "bullish": null, "category": "privacy", "comments_count": null, "description": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...", "downvote": null, "guid": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/", "id": 7830, "important": null, "latest_action_added_time": null, "pubdate": "2023-11-26T23:00:00.000Z", "scam": null, "source": "moneroobserver-feed", "tags": null, "tickers": "XMR", "title": "hinto-janai releases Gupax v1.3.3", "upvote": null, "url": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, "protocol": { "name": "web2" }, "type": "SiblingWeb2V2" }], "source": { "name": "moneroobserver-feed" }, "timestamp": 1701039600000, "title": "hinto-janai releases Gupax v1.3.3", "type": "SpasmEventV2" };
export const validPostWithRssItemTitleHasSpecialChars = {
    "id": 4934,
    "guid": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop",
    "source": "thedefiant.io",
    "category": "defi",
    "tickers": "",
    "tags": null,
    "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?",
    "url": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop",
    "description": "What's after PEPE?...",
    "pubdate": "2023-04-24T09:41:16.000Z",
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
export const validPostWithRssItemTitleHasSpecialCharsConvertedToSpasmEventV2 = { "type": "SpasmEventV2", "action": "post", "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?", "timestamp": 1682329276000, "content": "What's after PEPE?...", "ids": [{ "value": "spasmid014bf6e5c3dfb0c48cd4b808b3f1879275fb3a91cac9f500f35252ac1dbc3b66b5", "format": { "name": "spasmid", "version": "01" } }, { "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "url" } }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "guid" } }], "links": [{ "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "protocol": "https", "origin": "https://thedefiant.io", "host": "thedefiant.io", "pathname": "/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "originalProtocolKey": "url" }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "protocol": "https", "origin": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "host": "thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "pathname": "/", "originalProtocolKey": "guid" }], "siblings": [{ "type": "SiblingWeb2V2", "protocol": { "name": "web2" }, "ids": [{ "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "url" } }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "guid" } }], "originalObject": { "id": 4934, "guid": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "source": "thedefiant.io", "category": "defi", "tickers": "", "tags": null, "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?", "url": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "description": "What's after PEPE?...", "pubdate": "2023-04-24T09:41:16.000Z", "upvote": null, "downvote": null, "bullish": null, "bearish": null, "important": null, "scam": null, "comments_count": null, "latest_action_added_time": null } }], "db": { "key": 4934 }, "source": { "name": "thedefiant.io" }, "categories": [{ "name": "defi" }] };
export const validNostrSpasmEventSpasmV0WithInvalidHtmlTags = {
    "id": 3803,
    "target": "021d3791000e3f66699c8e3e3f8b46331a2b2acea0c19224d05160203d3142f5f7f0197a350f328ae34f590dcfcfef961e78a9158719c2bb0c27b56b61ef9a00",
    "action": "reply",
    "category": null,
    "title": "",
    "text": "<img src=\"x\"> test ",
    "signer": "npub1xypux8nyuhaxhx0a9qugpz72ey6wacmsyma5uluauwm2aurn0hcq68gnae",
    "signed_message": "{\"kind\":1,\"created_at\":1714510408,\"tags\":[[\"license\",\"SPDX-License-Identifier: CC0-1.0\"],[\"spasm_version\",\"1.0.0\"],[\"spasm_action\",\"reply\"],[\"spasm_target\",\"021d3791000e3f66699c8e3e3f8b46331a2b2acea0c19224d05160203d3142f5f7f0197a350f328ae34f590dcfcfef961e78a9158719c2bb0c27b56b61ef9a00\"]],\"content\":\"<img src=\"x\"> test \",\"pubkey\":\"3103c31e64e5fa6b99fd2838808bcac934eee37026fb4e7f9de3b6aef0737df0\",\"id\":\"e18dc3d5b73b89d4b1e269e7a525e780934cffbf94a4e4512b26dc97ffbec874\",\"sig\":\"b9e9cc534046f548ce94d664f906366f00ec90674a26678e1752bf1f89029e84c2b58a75d249688b7d3af45bffcf66f0ee67454b64f0db7a70e51476c93a3a13\"}",
    "signature": "b9e9cc534046f548ce94d664f906366f00ec90674a26678e1752bf1f89029e84c2b58a75d249688b7d3af45bffcf66f0ee67454b64f0db7a70e51476c93a3a13",
    "signed_time": "2024-04-30T20:53:28.000Z",
    "added_time": "2024-04-30T20:53:39.734Z",
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": 1,
    "latest_action_added_time": "2024-04-30T20:57:10.296Z"
};
export const validRssItemWithEmoji = {
    "id": 936756,
    "guid": "https://medium.com/p/5b93a387639c",
    "source": "osmosis-medium",
    "category": "defi",
    "tickers": "OSMO",
    "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi",
    "url": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c",
    "description": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...",
    "pubdate": "2024-05-13T14:11:34.000Z",
    "tags": null,
    "upvote": null,
    "downvote": null,
    "bullish": null,
    "bearish": null,
    "important": null,
    "scam": null,
    "comments_count": null,
    "latest_action_added_time": null
};
export const validRssItemWithEmojiConvertedToSpasmEvent2 = { "type": "SpasmEventV2", "action": "post", "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi", "timestamp": 1715609494000, "content": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...", "keywords": ["OSMO"], "ids": [{ "value": "spasmid01fc9080487349b7fc6d298d7df02e29d7d39617dd38913dfda515556eee3e156c", "format": { "name": "spasmid", "version": "01" } }, { "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "format": { "name": "url" } }, { "value": "https://medium.com/p/5b93a387639c", "format": { "name": "guid" } }], "links": [{ "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "protocol": "https", "origin": "https://medium.com", "host": "medium.com", "pathname": "/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "originalProtocolKey": "url" }, { "value": "https://medium.com/p/5b93a387639c", "protocol": "https", "origin": "https://medium.com", "host": "medium.com", "pathname": "/p/5b93a387639c", "originalProtocolKey": "guid" }], "siblings": [{ "type": "SiblingWeb2V2", "protocol": { "name": "web2" }, "ids": [{ "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "format": { "name": "url" } }, { "value": "https://medium.com/p/5b93a387639c", "format": { "name": "guid" } }], "originalObject": { "id": 936756, "guid": "https://medium.com/p/5b93a387639c", "source": "osmosis-medium", "category": "defi", "tickers": "OSMO", "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi", "url": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "description": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...", "pubdate": "2024-05-13T14:11:34.000Z", "tags": null, "upvote": null, "downvote": null, "bullish": null, "bearish": null, "important": null, "scam": null, "comments_count": null, "latest_action_added_time": null } }], "db": { "key": 936756 }, "source": { "name": "osmosis-medium" }, "categories": [{ "name": "defi" }] };
//# sourceMappingURL=_events-data.js.map