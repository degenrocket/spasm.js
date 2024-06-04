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
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            format: { name: "ethereum-sig", }
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
export const validSpasmEventRssItemV0 = validPostWithRssItem;
export const validSpasmEventRssItemV0ConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    ids: [
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
//# sourceMappingURL=_events-data.js.map