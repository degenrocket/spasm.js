import { toBeNpub } from "./../utils/index";
import { toBeTimestamp } from "./../utils/index";
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
    category: "privacy",
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
                    format: { name: "ethereum-pubkey", }
                    // TODO
                    // verified: true
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
                },
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
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                    pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
                    format: { name: "ethereum-sig" }
                }
            ]
        }
    ]
};
export const validDmpEventSignedOpenedConvertedToSpasmV2 = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
};
export const validPostWithDmpEventSignedClosedConvertedToSpasmV2 = {
    ...validDmpEventSignedClosedConvertedToSpasmV2,
    db: {
        key: 1337,
        addedTimestamp: 1641074686195
    },
    categories: [
        {
            name: "privacy"
        }
    ],
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
            event: {
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
                                }
                                // verified: true
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
                ],
            }
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
            event: {
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
                                format: {
                                    name: "ethereum-pubkey",
                                }
                                // verified: true
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
                            },
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
                                value: "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b",
                                pubkey: "0x49e8d02294e721ac47f6f4794625312b9005fd80",
                                format: { name: "ethereum-sig" }
                            }
                        ]
                    }
                ]
            }
        }
    ]
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
    ids: [
        {
            value: "spasmid01e7cc009e6a85d2549c1a68328dec844ddd9266d4a91d7d5ed612b7a3fe2aca42",
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
                // hasExtraSpasmFields: false
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
                    }
                }
            ]
        }
    ],
    ids: [
        {
            value: "spasmid01e7cc009e6a85d2549c1a68328dec844ddd9266d4a91d7d5ed612b7a3fe2aca42",
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
                    format: { name: "nostr-hex" }
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
            ]
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
            ]
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
            ]
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
            ]
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
//# sourceMappingURL=_events-data.js.map