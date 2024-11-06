"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld = exports.validDmpEventConvertedToSpasmEventV2 = exports.validSpasmDmpEventSignedClosedV0 = exports.validPostWithDmpEventSignedClosed = exports.validDmpEventSignedClosedConvertedToSpasmEventEnvelopeWithTreeV2WithTwoChildren = exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = exports.validPostWithNostrReplyToDmpEventConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = exports.validDmpEventSignedClosedConvertedToSpasmV2WithoutFormats = exports.validDmpEventSignedClosedConvertedToSpasmV2 = exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2 = exports.validPostWithNostrReplyToDmpEvent = exports.validNostrReplyToDmpEvent = exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2 = exports.validSpasmWithDmpReplyToDmpEventV0 = exports.validDmpEventSignedClosedWithInvalidSignature = exports.validDmpEventSignedClosedWithInvalidSigner = exports.validDmpEventSignedClosedWithInvalidSignedString = exports.validDmpEventSignedOpened = exports.validDmpEventSignedClosed = exports.validDmpEvent = exports.validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2 = exports.validSpasmEventBodyV2ReplyToGenesisSignedClosed = exports.validSpasmEventBodyV2ReplyToGenesis = exports.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2 = exports.validSpasmEventBodySignedClosedV2 = exports.validSpasmEventBodyV2ConvertedToSpasmV2 = exports.validSpasmEventBodyV2 = exports.validId0Spasmid01 = exports.invalidId2Note = exports.validId2Hex = exports.validId2Nevent = exports.validId2Note = exports.invalidId1Note = exports.validId1Hex = exports.validId1Nevent = exports.validId1Note = exports.invalidNpubAddress2 = exports.invalidNpubAddress1 = exports.validHexAddress2 = exports.validHexAddress1 = exports.validNpubAddress2 = exports.validNpubAddress1 = exports.invalidEthereumSignature1 = exports.validEthereumSignature1 = exports.invalidEthereumAddress1 = exports.validEthereumAddress1 = void 0;
exports.validRssItemWithEmojiConvertedToSpasmEvent2 = exports.validRssItemWithEmoji = exports.validNostrSpasmEventSpasmV0WithInvalidHtmlTags = exports.validPostWithRssItemTitleHasSpecialCharsConvertedToSpasmEventV2 = exports.validPostWithRssItemTitleHasSpecialChars = exports.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2 = exports.validPostWithRssItemSpecialChars = exports.SpasmEventV2ConvertedToSpasmid01 = exports.SpasmEventV2ToTestSpasmid01_ChangedNotImportantKeys = exports.SpasmEventV2ToTestSpasmid01 = exports.validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2 = exports.validSpasmEventRssItemV0ConvertedToSpasmV2 = exports.validSpasmEventRssItemV0 = exports.validPostWithRssItemReverseTags = exports.validPostWithRssItem = exports.validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2 = exports.validSpasmEventBodyV2ReplyWithTwoSigners = exports.validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2 = exports.validSpasmEventBodyV2WithOneNostrSigner = exports.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2 = exports.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2 = exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV2 = exports.validNostrEventSignedOpenedConvertedToSpasmV2 = exports.validNostrSpasmEventConvertedToSpasmV2 = exports.validNostrEventConvertedToSpasmV2 = exports.validSpasmNostrSpasmEventSignedOpenedV0 = exports.validPostWithNostrSpasmEventSignedOpened = exports.validSpasmNostrEventSignedOpenedV0 = exports.validPostWithNostrEventSignedOpened = exports.validNostrSpasmEventSignedOpenedWithInvalidSigner = exports.validNostrSpasmEventSignedOpenedWithInvalidContent = exports.validNostrSpasmEventSignedOpenedWithInvalidSignature = exports.validNostrSpasmEventSignedOpened = exports.validNostrEventSignedOpened = exports.validNostrSpasmEvent = exports.validNostrEvent = exports.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2 = exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent = exports.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2 = exports.validDmpEventSignedClosedConvertedToSpasmV2DifferentSource = exports.validDmpEventSignedOpenedConvertedToSpasmV2 = exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse = exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren = exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild = exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent = exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2 = void 0;
const index_js_1 = require("./../utils/index.js");
const index_js_2 = require("./../utils/index.js");
// import { convertToSpasm } from "./../convert/convertToSpasm"
// const latestSpasmVersion = "2.0.0"
exports.validEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2fa";
exports.invalidEthereumAddress1 = "0xf8553015220a857eda377a1e903c9e5afb3ac2f";
exports.validEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b";
exports.invalidEthereumSignature1 = "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71";
exports.validNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr0z";
exports.validNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d6";
exports.validHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c81";
exports.validHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9014aa";
exports.invalidNpubAddress1 = "npub1kwnsd0xwkw03j0d92088vf2a66a9kztsq8ywlp0lrwfwn9yffjqspcmr1z";
exports.invalidNpubAddress2 = "npub14slk4lshtylkrqg9z0dvng09gn58h88frvnax7uga3v0h25szj4qzjt5d7";
// const invalidHexAddress1 = "b3a706bcceb39f193da553ce76255dd6ba5b097001c8ef85ff1b92e994894c82"
// const invalidHexAddress2 = "ac3f6afe17593f61810513dac9a1e544e87b9ce91b27d37b88ec58fbaa9015aa"
// 4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65
exports.validId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mv";
exports.validId1Nevent = "nevent1qqsyxakxt5hjx2hmaxug9g6m4f8kl6rx038xs36f4at9lxqcx0kk5egkrc3ry";
exports.validId1Hex = "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65";
exports.invalidId1Note = "note1gdmvvhf0yv40h6dcs234h2j0dl5xvlzwdpr5nt6kt7vpsvlddfjs6sl8mw";
exports.validId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfq";
exports.validId2Nevent = "nevent1qqsrm2tegjxehgnrsexy6mc5npxyyw3c8qmyasj47q78jp934emlypszlcsc8";
exports.validId2Hex = "3da979448d9ba263864c4d6f14984c423a3838364ec255f03c7904b1ae77f206";
exports.invalidId2Note = "note18k5hj3ydnw3x8pjvf4h3fxzvggarswpkfmp9tupu0yztrtnh7grq760gfr";
// hello world | sha256
exports.validId0Spasmid01 = "spasmid01a948904f2f0f479b8f8197694b30184b0d2ed1c1cd2a1ec0fb85d299a192a447";
exports.validSpasmEventBodyV2 = {
    type: "SpasmEventBodyV2",
    action: "post",
    content: "Native spasm event body V2",
    title: "Native spasm event title V2",
    timestamp: 1728711181918,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: {
        name: "spasm",
        version: "2.0.0"
    },
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ]
};
exports.validSpasmEventBodyV2ConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: "post",
    title: "Native spasm event title V2",
    content: "Native spasm event body V2",
    timestamp: 1728711181918,
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    ids: [
        {
            value: "spasmid01e3e37437febee283d67499a413dccf0b9d3121e120ec4a8b022fe6296039cce5",
            format: { name: "spasmid", version: "01" }
        }
    ],
    license: "SPDX-License-Identifier: CC0-1.0",
    siblings: [
        {
            type: "SiblingSpasmV2",
            protocol: { "name": "spasm", "version": "2.0.0" },
            signedString: JSON.stringify(exports.validSpasmEventBodyV2)
        }
    ],
};
exports.validSpasmEventBodySignedClosedV2 = {
    type: 'SpasmEventBodySignedClosedV2',
    signedString: '{"type":"SpasmEventBodyV2","action":"post","content":"Native spasm event body V2","title":"Native spasm event title V2","timestamp":1728711181918,"license":"SPDX-License-Identifier: CC0-1.0","protocol":{"name":"spasm","version":"2.0.0"},"authors":[{"addresses":[{"value":"0x899a9413f0a3a4eee462e10d18ad8813fe0092c0","format":{"name":"ethereum-pubkey"}}]}]}',
    signature: '0xce8ee766445fd70204d87c333d9b7cc054cd5ea5b97100cb00c37f8f5a05240a32d9d63907d2d82b8691f8f55cd68631edb1944d01e6609296214e95aa80d8071b',
    signer: '0x899a9413f0a3a4eee462e10d18ad8813fe0092c0'
};
exports.validSpasmEventBodySignedClosedV2ConvertedToSpasmV2 = {
    type: "SpasmEventV2",
    action: exports.validSpasmEventBodyV2.action,
    content: exports.validSpasmEventBodyV2.content,
    title: exports.validSpasmEventBodyV2.title,
    timestamp: exports.validSpasmEventBodyV2.timestamp,
    license: exports.validSpasmEventBodyV2.license,
    ids: [
        {
            value: "spasmid01e3e37437febee283d67499a413dccf0b9d3121e120ec4a8b022fe6296039cce5",
            format: { name: "spasmid", version: "01" }
        }
    ],
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    verified: true,
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    signatures: [
        {
            value: "0xce8ee766445fd70204d87c333d9b7cc054cd5ea5b97100cb00c37f8f5a05240a32d9d63907d2d82b8691f8f55cd68631edb1944d01e6609296214e95aa80d8071b",
            pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
            format: { name: "ethereum-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingSpasmSignedV2",
            protocol: { "name": "spasm", "version": "2.0.0" },
            signedString: JSON.stringify(exports.validSpasmEventBodyV2),
            signatures: [
                {
                    value: "0xce8ee766445fd70204d87c333d9b7cc054cd5ea5b97100cb00c37f8f5a05240a32d9d63907d2d82b8691f8f55cd68631edb1944d01e6609296214e95aa80d8071b",
                    pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-sig" }
                }
            ],
        }
    ],
};
exports.validSpasmEventBodyV2ReplyToGenesis = {
    type: "SpasmEventBodyV2",
    action: "reply",
    content: "Spasm body V2 reply to genesis.",
    parent: {
        ids: [
            {
                value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
            },
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
            }
        ]
    },
    timestamp: 1728711057154,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: { "name": "spasm", "version": "2.0.0" },
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { "name": "ethereum-pubkey" }
                }
            ]
        }
    ]
};
exports.validSpasmEventBodyV2ReplyToGenesisSignedClosed = {
    type: 'SpasmEventBodySignedClosedV2',
    signedString: '{"type":"SpasmEventBodyV2","action":"reply","content":"Spasm body V2 reply to genesis.","parent":{"ids":[{"value":"spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"},{"value":"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"}]},"timestamp":1728711057154,"license":"SPDX-License-Identifier: CC0-1.0","protocol":{"name":"spasm","version":"2.0.0"},"authors":[{"addresses":[{"value":"0x899a9413f0a3a4eee462e10d18ad8813fe0092c0","format":{"name":"ethereum-pubkey"}}]}]}',
    signature: '0x2aa9b6de60bcb60a9e9ab4232d0a4844a7f8cff021fdd7d3587de1ad51d6b9cf667c3704df9c45fef8292c4b83328f977844f3386a02f49236365e9e7af655f11c',
    signer: '0x899a9413f0a3a4eee462e10d18ad8813fe0092c0'
};
exports.validSpasmEventBodyV2ReplyToGenesisSignedClosedConvertToSpasmV2 = {
    type: "SpasmEventV2",
    action: exports.validSpasmEventBodyV2ReplyToGenesis.action,
    content: exports.validSpasmEventBodyV2ReplyToGenesis.content,
    timestamp: exports.validSpasmEventBodyV2ReplyToGenesis.timestamp,
    license: exports.validSpasmEventBodyV2ReplyToGenesis.license,
    parent: {
        ids: [
            {
                value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f",
                format: { name: "spasmid", version: "01" }
            },
            {
                value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                format: { name: "ethereum-sig" }
            }
        ]
    },
    ids: [
        {
            value: "spasmid014df27d56a0f0a3fcb97d325665a6fca968c1cc25b9458b87ed7e5ded60f446f4",
            format: { name: "spasmid", version: "01" }
        }
    ],
    authors: [
        {
            addresses: [
                {
                    value: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    verified: true,
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    signatures: [
        {
            value: "0x2aa9b6de60bcb60a9e9ab4232d0a4844a7f8cff021fdd7d3587de1ad51d6b9cf667c3704df9c45fef8292c4b83328f977844f3386a02f49236365e9e7af655f11c",
            pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
            format: { name: "ethereum-sig" }
        }
    ],
    siblings: [
        {
            type: "SiblingSpasmSignedV2",
            protocol: { "name": "spasm", "version": "2.0.0" },
            signedString: JSON.stringify(exports.validSpasmEventBodyV2ReplyToGenesis),
            signatures: [
                {
                    value: "0x2aa9b6de60bcb60a9e9ab4232d0a4844a7f8cff021fdd7d3587de1ad51d6b9cf667c3704df9c45fef8292c4b83328f977844f3386a02f49236365e9e7af655f11c",
                    pubkey: "0x899a9413f0a3a4eee462e10d18ad8813fe0092c0",
                    format: { name: "ethereum-sig" }
                }
            ],
        }
    ],
};
exports.validDmpEvent = {
    version: "dmp_v0.0.1",
    time: "2022-01-01T22:04:46.178Z",
    action: "post",
    target: "",
    title: "genesis",
    text: "not your keys, not your words",
    license: "MIT"
};
exports.validDmpEventSignedClosed = {
    signer: '0xf8553015220a857eda377a1e903c9e5afb3ac2fa',
    signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b',
    // signedString: JSON.stringify(validDmpEvent)
    signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your words\",\"license\":\"MIT\"}"
};
exports.validDmpEventSignedOpened = {
    ...exports.validDmpEventSignedClosed,
    signedObject: exports.validDmpEvent
};
exports.validDmpEventSignedClosedWithInvalidSignedString = {
    ...exports.validDmpEventSignedClosed,
    signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your word\",\"license\":\"MIT\"}"
};
exports.validDmpEventSignedClosedWithInvalidSigner = {
    ...exports.validDmpEventSignedClosed,
    signer: '0xf8553015220a857eda377a1e903c9e5afb3ac2fb'
};
exports.validDmpEventSignedClosedWithInvalidSignature = {
    ...exports.validDmpEventSignedClosed,
    signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71a'
};
// validNostrReplyToDmpEvent
exports.validSpasmWithDmpReplyToDmpEventV0 = {
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
exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2 = {
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
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-02-17T05:48:00.076Z")
    },
    action: "reply",
    content: "To the moon!",
    timestamp: (0, index_js_2.toBeTimestamp)("2024-02-17T05:47:59.932Z"),
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
exports.validNostrReplyToDmpEvent = {
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
exports.validPostWithNostrReplyToDmpEvent = {
    id: 5,
    target: exports.validNostrReplyToDmpEvent.tags[3][1],
    action: "reply",
    title: "",
    text: exports.validNostrReplyToDmpEvent.content,
    signer: (0, index_js_1.toBeNpub)(exports.validNostrReplyToDmpEvent.pubkey),
    signed_message: JSON.stringify(exports.validNostrReplyToDmpEvent),
    signature: exports.validNostrReplyToDmpEvent.sig,
    // signed_time: validNostrReplyToDmpEvent.created_at,
    signed_time: new Date(exports.validNostrReplyToDmpEvent.created_at).toISOString(),
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
exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2 = {
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
        addedTimestamp: 1705545460712
        // addedTimestamp: toBeTimestamp("2024-01-18T02:37:40.712Z")
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
            originalObject: exports.validNostrReplyToDmpEvent,
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
exports.validDmpEventSignedClosedConvertedToSpasmV2 = {
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
            signedString: JSON.stringify(exports.validDmpEvent),
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
// For testing assignFormats() function
exports.validDmpEventSignedClosedConvertedToSpasmV2WithoutFormats = {
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
            value: "spasmid01192d1f9994bf436f50841459d0a43c0de13ef4aaa5233827bdfe2ea2bc030d6f"
        },
        {
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
        }
    ],
    signatures: [
        {
            value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
            pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
        }
    ],
    siblings: [
        {
            type: "SiblingDmpSignedV2",
            protocol: {
                name: "dmp",
                version: "0.0.1"
            },
            signedString: JSON.stringify(exports.validDmpEvent),
            ids: [
                {
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"
                }
            ],
            signatures: [
                {
                    value: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
                    pubkey: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa"
                }
            ]
        }
    ]
};
exports.validPostWithNostrReplyToDmpEventConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = { "db": { "addedTimestamp": 1705545460712, "key": 5 }, "ids": [{ "format": { "name": "spasmid", "version": "01" }, "value": "spasmid01906605460f67979a0f82eb220e58ba1de54aadebab4ed601c41ea695d51be1f0" }, { "format": { "name": "nostr-hex" }, "value": "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f" }, { "format": { "name": "nostr-sig" }, "value": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290" }], "siblings": [{ "ids": [{ "format": { "name": "nostr-hex" }, "value": "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f" }, { "format": { "name": "nostr-sig" }, "value": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290" }], "originalObject": { "content": "To the SPASM!", "created_at": 1708153412, "id": "4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f", "kind": 1, "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42", "sig": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290", "tags": [["license", "SPDX-License-Identifier: CC0-1.0"], ["spasm_version", "1.0.0"], ["spasm_action", "reply"], ["spasm_target", "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]] }, "protocol": { "extraSpasmFieldsVersion": "1.0.0", "hasExtraSpasmFields": true, "name": "nostr" }, "signatures": [{ "format": { "name": "nostr-sig" }, "pubkey": "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42", "value": "2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290" }], "type": "SiblingNostrSpasmSignedV2" }], "stats": [{ "action": "react", "contents": [{ "total": 11, "value": "upvote" }, { "total": 1, "value": "downvote" }, { "total": 2, "value": "bullish" }, { "total": 3, "value": "bearish" }, { "total": 6, "value": "important" }, { "total": 3, "value": "scam" }] }, { "action": "reply", "total": 3 }], "type": "SpasmEventEnvelopeWithTreeV2" };
exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives = { "db": { "addedTimestamp": 1708148880076, "key": 401 }, "ids": [{ "format": { "name": "spasmid", "version": "01" }, "value": "spasmid01ea26607382b0abc560b8d7b372b7f8b7df29afc6a81ce84d9085a6ba533227a9" }, { "format": { "name": "ethereum-sig" }, "value": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b" }], "siblings": [{ "ids": [{ "format": { "name": "ethereum-sig" }, "value": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b" }], "protocol": { "name": "dmp", "version": "0.1.0" }, "signatures": [{ "format": { "name": "ethereum-sig" }, "pubkey": "0x49e8d02294e721ac47f6f4794625312b9005fd80", "value": "0xbe8bcd4b5565f146a3a069504c3efd9405fa19a9f7621dfa405f25cfeea9513072230b8533d7044efe0cd82e3af2e2f38292200006cf2103da193efcd888efc01b" }], "signedString": "{\"version\":\"dmp_v0.1.0\",\"time\":\"2024-02-17T05:47:59.932Z\",\"action\":\"reply\",\"target\":\"0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b\",\"title\":\"\",\"text\":\"To the moon!\",\"license\":\"SPDX-License-Identifier: CC0-1.0\"}", "type": "SiblingDmpSignedV2" }], "type": "SpasmEventEnvelopeWithTreeV2" };
exports.validDmpEventSignedClosedConvertedToSpasmEventEnvelopeWithTreeV2WithTwoChildren = {
    type: "SpasmEventEnvelopeWithTreeV2",
    ids: exports.validDmpEventSignedClosedConvertedToSpasmV2.ids,
    siblings: exports.validDmpEventSignedClosedConvertedToSpasmV2.siblings,
    children: [
        {
            ids: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2.ids,
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives
        },
        {
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventEnvelopeWithTreeV2WithoutRelatives,
            ids: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2.ids
        }
    ]
};
exports.validPostWithDmpEventSignedClosed = {
    id: 1337,
    target: exports.validDmpEvent.target,
    action: exports.validDmpEvent.action,
    title: exports.validDmpEvent.title,
    text: exports.validDmpEvent.text,
    signer: exports.validDmpEventSignedClosed.signer,
    signed_message: JSON.stringify(exports.validDmpEvent),
    signature: exports.validDmpEventSignedClosed.signature,
    signed_time: exports.validDmpEvent.time,
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
        exports.validPostWithNostrReplyToDmpEvent,
        exports.validSpasmWithDmpReplyToDmpEventV0
    ]
};
exports.validSpasmDmpEventSignedClosedV0 = exports.validPostWithDmpEventSignedClosed;
exports.validDmpEventConvertedToSpasmEventV2 = {
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
            signedString: JSON.stringify(exports.validDmpEvent),
        }
    ]
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsOld = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStatsNew = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithStats = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDb = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    db: {
        key: 1337,
        addedTimestamp: 1641074686195,
        updatedTimestamp: 1641074686195
    },
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2WithDbNew = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
    db: {
        key: 1337,
        table: "spasm_events",
        addedTimestamp: 1641074686195,
        updatedTimestamp: 1642074686195
    },
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2 = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
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
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
exports.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
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
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
        }
    ]
};
exports.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
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
            event: exports.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2
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
            event: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2
        }
    ]
};
exports.validDmpEventSignedOpenedConvertedToSpasmV2 = {
    ...exports.validDmpEventSignedClosedConvertedToSpasmV2,
};
exports.validDmpEventSignedClosedConvertedToSpasmV2DifferentSource = {
    ...exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2,
    source: {
        name: "differentsource.space"
    },
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasmEventEnvelopeV2 = {
    type: "SpasmEventEnvelopeV2",
    ids: exports.validDmpEventSignedClosedConvertedToSpasmV2.ids,
    siblings: exports.validDmpEventSignedClosedConvertedToSpasmV2.siblings,
    source: exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2.source,
    db: exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2.db,
    stats: exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2.stats
};
exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2WithSpasmParentEvent = {
    ...exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2,
    parent: {
        ids: exports.validPostWithNostrReplyToDmpEventConvertedToSpasmV2.parent.ids,
        event: exports.validDmpEventSignedClosedConvertedToSpasmV2
    }
};
// Post with event is essentially SpasmEventV0
exports.validSpasmDmpEventSignedClosedV0ConvertedToSpasmV2 = exports.validPostWithDmpEventSignedClosedConvertedToSpasmV2;
exports.validNostrEvent = {
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
exports.validNostrSpasmEvent = {
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
exports.validNostrEventSignedOpened = {
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
exports.validNostrSpasmEventSignedOpened = {
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
exports.validNostrSpasmEventSignedOpenedWithInvalidSignature = {
    ...exports.validNostrSpasmEventSignedOpened,
    sig: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f2"
};
exports.validNostrSpasmEventSignedOpenedWithInvalidContent = {
    ...exports.validNostrSpasmEventSignedOpened,
    content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls!"
};
exports.validNostrSpasmEventSignedOpenedWithInvalidSigner = {
    ...exports.validNostrSpasmEventSignedOpened,
    pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f43"
};
exports.validPostWithNostrEventSignedOpened = {
    id: 6,
    target: "",
    action: "post",
    title: "",
    text: exports.validNostrEventSignedOpened.content,
    signer: (0, index_js_1.toBeNpub)(exports.validNostrEventSignedOpened.pubkey),
    signed_message: JSON.stringify(exports.validNostrEventSignedOpened),
    signature: exports.validNostrEventSignedOpened.sig,
    signed_time: exports.validNostrEventSignedOpened.created_at,
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
exports.validSpasmNostrEventSignedOpenedV0 = exports.validPostWithNostrEventSignedOpened;
exports.validPostWithNostrSpasmEventSignedOpened = {
    id: 7,
    target: "",
    action: "post",
    title: exports.validNostrSpasmEventSignedOpened.tags[3][1],
    text: exports.validNostrSpasmEventSignedOpened.content,
    signer: (0, index_js_1.toBeNpub)(exports.validNostrSpasmEventSignedOpened.pubkey),
    signed_message: JSON.stringify(exports.validNostrSpasmEventSignedOpened),
    signature: exports.validNostrSpasmEventSignedOpened.sig,
    signed_time: new Date(exports.validNostrSpasmEventSignedOpened.created_at).toISOString(),
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
exports.validSpasmNostrSpasmEventSignedOpenedV0 = exports.validPostWithNostrSpasmEventSignedOpened;
exports.validNostrEventConvertedToSpasmV2 = {
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
            originalObject: exports.validNostrEvent,
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
exports.validNostrSpasmEventConvertedToSpasmV2 = {
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
            originalObject: exports.validNostrSpasmEvent,
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
exports.validNostrEventSignedOpenedConvertedToSpasmV2 = {
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
            originalObject: exports.validNostrEventSignedOpened,
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
exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV2 = {
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
            originalObject: exports.validNostrSpasmEventSignedOpened,
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
exports.validSpasmNostrEventSignedOpenedV0ConvertedToSpasmV2 = {
    ...exports.validNostrEventSignedOpenedConvertedToSpasmV2,
    db: {
        key: 6,
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-01-17T03:42:38.608Z")
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
exports.validSpasmNostrSpasmEventSignedOpenedV0ConvertedToSpasmV2 = {
    ...exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV2,
    type: "SpasmEventV2",
    db: {
        key: 7,
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-01-17T03:42:38.908Z")
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
exports.validSpasmEventBodyV2WithOneNostrSigner = {
    type: "SpasmEventBodyV2",
    action: "post",
    content: "Single signed simple Nostr content 1",
    title: "Single signed simple Nostr title 1",
    timestamp: 1730666903773,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: {
        name: "spasm",
        version: "2.0.0"
    },
    authors: [
        {
            addresses: [
                {
                    value: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
                    format: {
                        name: "nostr-hex"
                    }
                }
            ]
        }
    ]
};
exports.validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2 = {
    id: "",
    pubkey: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
    kind: 1,
    content: "Single signed simple Nostr content 1",
    created_at: 1730666903,
    tags: [
        ["spasm_action", "post"],
        // ["spasm_timestamp","1730666903000"],
        ["spasm_timestamp", "1730666903773"],
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "2.0.0"],
        ["nostr_spasm_version", "2.0.0"],
        ["title", "Single signed simple Nostr title 1"],
        [
            "O",
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
            "spasm_aadd_1", // marker (extra_author_details)
        ],
        [
            "tags_mapping", // tag name
            "spasm_aadd_1", // mapping algorithm (extra author address details)
            "O", // tag name to map
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252", // tag value to map
            "se2", // target event type
            "authors.addresses", // key in target event
            "0", // authors index
            "0", // addresses index
            "slice.13", // method
            "", // original
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "", // hosts
            // "", // extra signature
            // "", // signed string
            // "" // type?
        ],
    ]
};
exports.validSpasmEventBodyV2ReplyWithTwoSigners = {
    type: "SpasmEventBodyV2",
    action: "reply",
    content: "Single signed Nostr reply content",
    title: "Single signed Nostr reply title",
    timestamp: 1730666913773,
    license: "SPDX-License-Identifier: CC0-1.0",
    protocol: {
        name: "spasm",
        version: "2.0.0"
    },
    categories: [
        {
            name: "memes",
            sub: {
                name: "memecoins",
                sub: {
                    name: "wojak"
                }
            }
        },
        { name: "stonks" }
    ],
    keywords: ["defi", "degen", "pepe"],
    authors: [
        {
            addresses: [
                {
                    value: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
                    format: {
                        name: "nostr-hex"
                    }
                },
                {
                    value: "0x8f898046952fbfbbe99c59ec35b2dba2923224ed",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        }
    ],
    parent: {
        ids: [
            {
                value: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
                // TODO add format or not?
                // format: { name: "nostr-hex" }
            },
            {
                value: "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
                // format: { name: "spasmid", version: "01" }
            },
            {
                value: "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1",
                // format: { name: "nostr-sig" }
            }
        ]
    },
    references: [
        {
            ids: [
                {
                    value: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
                    format: { name: "nostr-hex" },
                    pubkey: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
                },
                {
                    value: "spasmid019ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
                    format: { name: "spasmid", version: "01" },
                    pubkey: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce"
                }
            ]
        },
        {
            ids: [
                {
                    value: "spasmid018c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
                    format: { name: "spasmid", version: "01" }
                },
                {
                    value: "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack",
                    format: { name: "url" }
                },
                {
                    value: "https://forum.degenrocket.space/?l=terraforming",
                    format: { name: "guid" }
                }
            ]
        },
        {
            ids: [
                {
                    value: "https://degenrocket.space",
                    format: { name: "url" }
                }
            ]
        },
        {
            ids: [
                {
                    value: "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop",
                    format: { name: "url" }
                }
            ]
        }
    ],
    mentions: [
        {
            addresses: [
                {
                    value: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
                    format: { name: "nostr-hex" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "0xb9b19bfc786e1ab397e69c04737bcc1a92656b99",
                    format: { name: "ethereum-pubkey" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
                    format: { name: "nostr-hex" }
                }
            ]
        },
        {
            addresses: [
                {
                    value: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
                    format: { name: "nostr-hex" }
                }
            ]
        },
    ],
};
exports.validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2 = {
    id: "",
    pubkey: "28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
    kind: 1,
    content: "Single signed Nostr reply content",
    created_at: 1730666913,
    tags: [
        ["spasm_action", "reply"],
        ["spasm_timestamp", "1730666913773"],
        ["license", "SPDX-License-Identifier: CC0-1.0"],
        ["spasm_version", "2.0.0"],
        ["nostr_spasm_version", "2.0.0"],
        ["spasm_category", "memes", "memecoins", "wojak"],
        ["spasm_category", "stonks"],
        ["t", "defi"],
        ["t", "degen"],
        ["t", "pepe"],
        ["title", "Single signed Nostr reply title"],
        // parent (target)
        [
            "e",
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651", // tag value to map
            "se2", // target event type (SpasmEventV2)
            "parent.ids", // key in target event
            "0", // parent index
            "0", // ids index
            "full", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original value
            "nostr-hex", // spasm_format_name
            "", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts ("wss://relay1,wss://relay2,wss://relay3")
            "", // spasm_pubkey_method
            "" // spasm_pubkey_original
        ],
        [
            "e",
            "4c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "4c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c", // tag value to map
            "se2", // target event type
            "parent.ids", // key in SpasmEvent
            "0", // parent index
            "1", // ids index
            "hex_to_spasmid01_1", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original "spasmid014c291be8d272307c43c8bdb34046ae176b03797b54ae8733d01f8c0d96e1909c",
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", "", "", ""
        ],
        [
            "e",
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779",
            "", // relay
            "reply", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779", // tag value to map
            "se2", // target event type
            "parent.ids", // key in target event
            "0", // parent index
            "2", // ids index
            "slice064", // method
            "db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1", // original value
            "nostr-sig", // spasm_format_name
            "", "", "", "", ""
        ],
        // references
        [
            "e",
            "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
            "", // relay
            "mention", // marker (root, reply, mention)
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65", // tag value to map
            "se2", // target event type (SpasmEventV2)
            "references.ids", // key in target event
            "0", // references index
            "0", // ids index
            "full", // method (padStart24, padEnd24, padBrand2.0.0, slice, hashHex for url/guid/text)
            "", // original value
            "nostr-hex", // spasm_format_name
            "", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts
            "full", // spasm_pubkey method
            "", // spasm_pubkey original
        ],
        [
            "e",
            "9ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807",
            "", // relay
            "mention", // marker (root, reply, mention)
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "9ad43c95e3a59ef9fb7ef0e493c6fee5653569a33872af9caad6b37e8fc27807", // tag value to map
            "se2", // target event type
            "references.ids", // key in SpasmEvent
            "0", // references index
            "1", // ids index
            "hex_to_spasmid01_1", // method
            "", // original
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", // spasm_marker
            "", // spasm_hosts
            "full", // spasm_pubkey method
            "", // spasm_pubkey original
        ],
        [
            "e",
            "8c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "8c2de31b99295885fbc4d86ecbeaa51c006a79abe5e728493b24bd186fb752eb", // tag value to map
            "se2", // target event type
            "references.ids", // key in SpasmEvent
            "1", // references index
            "0", // ids index
            "hex_to_spasmid01_1", // method
            "", // original
            "spasmid", // spasm_format_name
            "01", // spasm_format_version
            "", "", "", ""
        ],
        [
            "e",
            "907f49b51b6b8d095f1edb2a1cb3370eafbac5c879cd0d7d4903e673b0c24373",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "907f49b51b6b8d095f1edb2a1cb3370eafbac5c879cd0d7d4903e673b0c24373", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "1", // reference index
            "1", // ids index
            "sha256", // method
            "https://forum.degenrocket.space/?b=21&t=fog&c=samourai&h=hijack", // original value
            "url", // format name
            "", "", "", "", ""
        ],
        [
            "e",
            "9e91d86688b81fd8ea92a9747cdb02b138fbc894ad66712be93232632c435c45",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "9e91d86688b81fd8ea92a9747cdb02b138fbc894ad66712be93232632c435c45", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "1", // reference index
            "2", // ids index
            "sha256", // method
            "https://forum.degenrocket.space/?l=terraforming", // original
            "guid", // format name
            "", "", "", "", ""
        ],
        [
            "e",
            "8e6be79e0f901aac1e18618163fc4e9e307ff2865b93a9fd50c97de5deeeee5d",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "8e6be79e0f901aac1e18618163fc4e9e307ff2865b93a9fd50c97de5deeeee5d", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "2", // reference index
            "0", // ids index
            "sha256", // method
            "https://degenrocket.space", // original
            "url", // format name
            "", "", "", "", ""
        ],
        [
            "e",
            "b0a9d1ad5f352dc2771e930a1f34efc20c8d53f6203c01be8dc999132b5efcae",
            "", // relay
            "mention", // marker (root, reply, mention)
            "", // pubkey
        ],
        [
            "tags_mapping", // tag name
            "spasm_id_1", // mapping algorithm (id_details)
            "e", // tag name to map
            "b0a9d1ad5f352dc2771e930a1f34efc20c8d53f6203c01be8dc999132b5efcae", // tag value to map
            "se2", // target event type
            "references.ids", // key in target event
            "3", // reference index
            "0", // ids index
            "sha256", // method
            "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", // original
            "url", // format name
            "", "", "", "", ""
        ],
        [
            "p",
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
            ""
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42", // tag value to map
            "se2", // target event type
            "mentions.addresses", // key in target event
            "0", // mentions index
            "0", // addresses index
            "full", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original value
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "" // hosts
        ],
        [
            "p",
            "b9b19bfc786e1ab397e69c04737bcc1a92656b99657468657265756d2d707562",
            "", // relay
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "b9b19bfc786e1ab397e69c04737bcc1a92656b99657468657265756d2d707562", // tag value to map
            // 657468657265756d2d707562 - 'ethereum-pub' in hex
            "se2", // target event type
            "mentions.addresses", // key in target event
            "1", // mentions index
            "0", // addresses index
            "hex_to_eth_pub_1", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original "0xb9b19bfc786e1ab397e69c04737bcc1a92656b99",
            "ethereum-pubkey", // format name
            "", "", ""
        ],
        [
            "p",
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce",
            "" // relay
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "bf2376e17ba4ec269d10fcc996a4746b451152be9031fa48e74553dde5526bce", // tag value to map
            "se2", // target event type
            "mentions.addresses", // key in target event
            "2", // mentions index
            "0", // addresses index
            "full", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original value
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "" // hosts
        ],
        [
            "p",
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
            ""
        ],
        [
            "tags_mapping", // tag name
            "spasm_add_1", // mapping algorithm (author_address_details)
            "p", // tag name to map
            "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93", // tag value to map
            "se2", // target event type
            "mentions.addresses", // key in target event
            "3", // mentions index
            "0", // addresses index
            "full", // method (slice02_padEnd24Brand_ethereum-pub)
            "", // original value
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "" // hosts
        ],
        [
            "O",
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252",
            "spasm_aadd_1", // marker (extra_author_details)
        ],
        [
            "tags_mapping", // tag name
            "spasm_aadd_1", // mapping algorithm (extra author address details)
            "O", // tag name to map
            "spasm_author:28ab9c876811d4e5c6fb7672b795a33585825b9d025c56d4cbcdbc29f105f252", // tag value to map
            "se2", // target event type
            "authors.addresses", // key in target event
            "0", // authors index
            "0", // addresses index
            "slice.13", // method
            "", // original
            "nostr-hex", // format name
            "", // format version
            "", // marker
            "", // hosts
            // "", // extra signature
            // "", // signed string
            // "" // type?
        ],
        [
            "O",
            "spasm_author:0x8f898046952fbfbbe99c59ec35b2dba2923224ed",
            "spasm_aadd_1", // marker (extra_author_details)
        ],
        [
            "tags_mapping", // tag name
            "spasm_aadd_1", // mapping algorithm (extra author address details)
            "O", // tag name to map
            "spasm_author:0x8f898046952fbfbbe99c59ec35b2dba2923224ed", // tag value to map
            "se2", // target event type
            "authors.addresses", // key in target event
            "0", // authors index
            "1", // addresses index
            "slice.13", // method
            "", // original
            "ethereum-pubkey", // format name
            "", // format version
            "", // marker
            "", // hosts
            // "", // extra signature
            // "", // signed string
            // "" // type?
        ],
    ]
};
exports.validPostWithRssItem = {
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
exports.validPostWithRssItemReverseTags = {
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
exports.validSpasmEventRssItemV0 = exports.validPostWithRssItem;
exports.validSpasmEventRssItemV0ConvertedToSpasmV2 = {
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
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
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
exports.validSpasmEventRssItemReverseTagsV0ConvertedToSpasmV2 = {
    ...exports.validSpasmEventRssItemV0ConvertedToSpasmV2,
    keywords: ["forest", "dark", "cookies"]
};
exports.SpasmEventV2ToTestSpasmid01 = {
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
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
        updatedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
        table: "spasm_events"
    },
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
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
exports.SpasmEventV2ToTestSpasmid01_ChangedNotImportantKeys = {
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
        addedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.241Z"), // changed
        updatedTimestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.241Z"), // changed
        table: "spasm_events-new" // changed
    },
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
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
exports.SpasmEventV2ConvertedToSpasmid01 = {
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
    timestamp: (0, index_js_2.toBeTimestamp)("2024-03-12T20:24:04.240Z"),
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
exports.validPostWithRssItemSpecialChars = {
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
exports.validPostWithRssItemSpecialCharsConvertedToSpasmEventV2 = { "action": "post", "categories": [{ "name": "privacy" }], "content": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...", "db": { "key": 7830 }, "ids": [{ "format": { "name": "spasmid", "version": "01" }, "value": "spasmid012231bee2002f36b0fe99f10aa0f9bbd62b4c6240779e7a77457a5cc37498ce92" }, { "format": { "name": "url" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "format": { "name": "guid" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "keywords": ["XMR"], "links": [{ "host": "monero.observer", "origin": "https://monero.observer", "originalProtocolKey": "url", "pathname": "/hinto-janaiyo-releases-gupax-v1.3.3/", "protocol": "https", "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "host": "monero.observer", "origin": "https://monero.observer", "originalProtocolKey": "guid", "pathname": "/hinto-janaiyo-releases-gupax-v1.3.3/", "protocol": "https", "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "siblings": [{ "ids": [{ "format": { "name": "url" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, { "format": { "name": "guid" }, "value": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }], "originalObject": { "bearish": null, "bullish": null, "category": "privacy", "comments_count": null, "description": "hinto-janai1 has released Gupax2 version 1.3.33 with several fixes and a few other changes. Changes overview Fixes: -P2Pool [Simple]'s backup hosts option will only include green/yellow nodes (<300ms ping) (#65) -P2Pool ping now verifies node is synchronized (#63) -XMRig [Simple] tab slider overflow (#60) -P2Pool [Simple] tab height overflow (b4a4e83) Changes: -Crashes will now create a file on disk with debug information (#59) -Remote Node changes: Removed xmr.theuplink.net The full changelog, sources, SHA256SUM and .asc files can be found on Github3 and on the gupax.io website4. Consult hinto-janai’s CCS proposal5 to learn more about the project. https://github.com/hinto-janai ↩ https://github.com/hinto-janai/gupax/ ↩ https://github.com/hinto-janai/gupax/releases/tag/v1.3.3 ↩ ↩2 https://gupax.io/ ↩ /hinto-janaiyo-submits-ccs-proposal-gupax/ ↩...", "downvote": null, "guid": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/", "id": 7830, "important": null, "latest_action_added_time": null, "pubdate": "2023-11-26T23:00:00.000Z", "scam": null, "source": "moneroobserver-feed", "tags": null, "tickers": "XMR", "title": "hinto-janai releases Gupax v1.3.3", "upvote": null, "url": "https://monero.observer/hinto-janaiyo-releases-gupax-v1.3.3/" }, "protocol": { "name": "web2" }, "type": "SiblingWeb2V2" }], "source": { "name": "moneroobserver-feed" }, "timestamp": 1701039600000, "title": "hinto-janai releases Gupax v1.3.3", "type": "SpasmEventV2" };
exports.validPostWithRssItemTitleHasSpecialChars = {
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
exports.validPostWithRssItemTitleHasSpecialCharsConvertedToSpasmEventV2 = { "type": "SpasmEventV2", "action": "post", "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?", "timestamp": 1682329276000, "content": "What's after PEPE?...", "ids": [{ "value": "spasmid014bf6e5c3dfb0c48cd4b808b3f1879275fb3a91cac9f500f35252ac1dbc3b66b5", "format": { "name": "spasmid", "version": "01" } }, { "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "url" } }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "guid" } }], "links": [{ "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "protocol": "https", "origin": "https://thedefiant.io", "host": "thedefiant.io", "pathname": "/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "originalProtocolKey": "url" }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "protocol": "https", "origin": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "host": "thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "pathname": "/", "originalProtocolKey": "guid" }], "siblings": [{ "type": "SiblingWeb2V2", "protocol": { "name": "web2" }, "ids": [{ "value": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "url" } }, { "value": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "format": { "name": "guid" } }], "originalObject": { "id": 4934, "guid": "https://thedefiant.iopepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "source": "thedefiant.io", "category": "defi", "tickers": "", "tags": null, "title": "PEPE COIN, GENSLR COIN, WOJAK COIN, TRUMP COIN, REKT COIN, STONKS COIN &#8212; WHEN DOES&nbsp;IT&nbsp;STOP?", "url": "https://thedefiant.io/pepe-coin-genslr-coin-wojak-coin-trump-coin-rekt-coin-stonks-coin-when-does-it-stop", "description": "What's after PEPE?...", "pubdate": "2023-04-24T09:41:16.000Z", "upvote": null, "downvote": null, "bullish": null, "bearish": null, "important": null, "scam": null, "comments_count": null, "latest_action_added_time": null } }], "db": { "key": 4934 }, "source": { "name": "thedefiant.io" }, "categories": [{ "name": "defi" }] };
exports.validNostrSpasmEventSpasmV0WithInvalidHtmlTags = {
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
exports.validRssItemWithEmoji = {
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
exports.validRssItemWithEmojiConvertedToSpasmEvent2 = { "type": "SpasmEventV2", "action": "post", "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi", "timestamp": 1715609494000, "content": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...", "keywords": ["OSMO"], "ids": [{ "value": "spasmid01fc9080487349b7fc6d298d7df02e29d7d39617dd38913dfda515556eee3e156c", "format": { "name": "spasmid", "version": "01" } }, { "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "format": { "name": "url" } }, { "value": "https://medium.com/p/5b93a387639c", "format": { "name": "guid" } }], "links": [{ "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "protocol": "https", "origin": "https://medium.com", "host": "medium.com", "pathname": "/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "originalProtocolKey": "url" }, { "value": "https://medium.com/p/5b93a387639c", "protocol": "https", "origin": "https://medium.com", "host": "medium.com", "pathname": "/p/5b93a387639c", "originalProtocolKey": "guid" }], "siblings": [{ "type": "SiblingWeb2V2", "protocol": { "name": "web2" }, "ids": [{ "value": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "format": { "name": "url" } }, { "value": "https://medium.com/p/5b93a387639c", "format": { "name": "guid" } }], "originalObject": { "id": 936756, "guid": "https://medium.com/p/5b93a387639c", "source": "osmosis-medium", "category": "defi", "tickers": "OSMO", "title": "Smart Accounts on Osmosis: Redefining UX and Account Management in DeFi", "url": "https://medium.com/osmosis/smart-accounts-on-osmosis-redefining-ux-and-account-management-in-defi-5b93a387639c", "description": "[https://cdn-images-1.medium.com/max/1024/1*GVLRlJ-vnJppv710dva-xA.png]\n\nTHE CRYPTO ECOSYSTEM ADVANCES QUICKLY WHILE THE USER EXPERIENCE (UX) OFTEN LAGS BEHIND. OSMOSIS AIMS TO BRIDGE THIS GAP WITH SMART ACCOUNTS, AN INNOVATIVE ACCOUNT AND ASSET MANAGEMENT FEATURE THAT ENHANCES USABILITY, FLEXIBILITY, AND SECURITY, WITH ROBUST MULTI-DEVICE SUPPORT FOR ON-THE-GO TRADING.\n\n\nTHE VISION FOR SMART ACCOUNTS ON OSMOSIS\n\nThe vision for Osmosis Smart Accounts is to revolutionize crypto account UX by addressing common user challenges with a solution that: streamlines user onboarding and account recovery, simplifies account management, and provides a seamless and intuitive trading experience for newcomers and experienced users alike.\n\n\nSMART ACCOUNTS: KEY FEATURES AND FUNCTIONALITIES\n\nOsmosis Smart Accounts boast several key features and functionalities:\n🧪 Automation + 1-click Trading\n🧪 Multi-Key + Multi-Device Support\n🧪 Easier Onboarding + Account Recovery\n🧪 Advanced Security Protocols\n🧪 Extensible + Composable\n\n�...", "pubdate": "2024-05-13T14:11:34.000Z", "tags": null, "upvote": null, "downvote": null, "bullish": null, "bearish": null, "important": null, "scam": null, "comments_count": null, "latest_action_added_time": null } }], "db": { "key": 936756 }, "source": { "name": "osmosis-medium" }, "categories": [{ "name": "defi" }] };
//# sourceMappingURL=_events-data.js.map