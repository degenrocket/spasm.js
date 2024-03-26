"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPostWithRssItemConvertedToSpasmV1_0_0 = exports.validPostWithRssItem = exports.validNostrReplyToDmpEventConvertedToSpasmV1_0_0 = exports.validPostWithNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0 = exports.validPostWithNostrEventSignedOpenedConvertedToSpasmV1_0_0 = exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0 = exports.validNostrEventSignedOpenedConvertedToSpasmV1_0_0 = exports.validNostrSpasmEventConvertedToSpasmV1_0_0 = exports.validNostrEventConvertedToSpasmV1_0_0 = exports.validPostWithNostrSpasmEventSignedOpened = exports.validPostWithNostrEventSignedOpened = exports.validNostrSpasmEventSignedOpened = exports.validNostrEventSignedOpened = exports.validNostrSpasmEvent = exports.validNostrEvent = exports.validPostWithDmpEventSignedClosedConvertedToSpasm = exports.validDmpEventSignedOpenedConvertedToSpasm = exports.validDmpEventSignedClosedConvertedToSpasm = exports.validDmpEventConvertedToSpasm = exports.validPostWithDmpEventSignedClosed = exports.validPostWithNostrReplyToDmpEvent = exports.validNostrReplyToDmpEvent = exports.validDmpEventSignedOpened = exports.validDmpEventSignedClosed = exports.validDmpEvent = void 0;
const index_1 = require("./../utils/index");
const index_2 = require("./../utils/index");
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
exports.validNostrReplyToDmpEvent = {
    kind: 1,
    created_at: 1708153412,
    tags: [
        ["license", "SPDX-License-Identifier: CC0-1.0]"],
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
    signer: (0, index_1.toBeNpub)(exports.validNostrReplyToDmpEvent.pubkey),
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
    children: [exports.validPostWithNostrReplyToDmpEvent]
};
exports.validDmpEventConvertedToSpasm = {
    meta: {
        baseProtocol: "dmp",
        baseProtocolVersion: "0.0.1",
        hasExtraSpasmFields: false,
        convertedFrom: "DmpEvent",
        license: exports.validDmpEvent.license,
    },
    action: "post",
    content: "not your keys, not your words",
    originalEventObject: exports.validDmpEvent,
    originalEventString: JSON.stringify(exports.validDmpEvent),
    parentEvent: '',
    spasmVersion: "1.0.0",
    timestamp: 1641074686178,
    title: "genesis"
};
exports.validDmpEventSignedClosedConvertedToSpasm = {
    ...exports.validDmpEventConvertedToSpasm,
    meta: {
        ...exports.validDmpEventConvertedToSpasm.meta,
        convertedFrom: "DmpEventSignedClosed",
        privateKeyType: 'ethereum',
    },
    author: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
    eventId: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
    signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b',
};
exports.validDmpEventSignedOpenedConvertedToSpasm = {
    ...exports.validDmpEventSignedClosedConvertedToSpasm,
    meta: {
        ...exports.validDmpEventSignedClosedConvertedToSpasm.meta,
        convertedFrom: "DmpEventSignedOpened",
    }
};
exports.validPostWithDmpEventSignedClosedConvertedToSpasm = {
    ...exports.validDmpEventSignedClosedConvertedToSpasm,
    meta: {
        ...exports.validDmpEventSignedClosedConvertedToSpasm.meta,
        convertedFrom: "DmpEventSignedClosed",
    },
    dbId: 1337,
    dbTimestamp: 1641074686195,
    category: "privacy",
    source: "degenrocket.space",
    reactions: {
        upvote: exports.validPostWithDmpEventSignedClosed.upvote,
        downvote: exports.validPostWithDmpEventSignedClosed.downvote,
        bullish: exports.validPostWithDmpEventSignedClosed.bullish,
        bearish: exports.validPostWithDmpEventSignedClosed.bearish,
        important: exports.validPostWithDmpEventSignedClosed.important,
        scam: exports.validPostWithDmpEventSignedClosed.scam,
        comments_count: exports.validPostWithDmpEventSignedClosed.comments_count,
    },
    comments: [exports.validPostWithNostrReplyToDmpEvent]
};
exports.validNostrEvent = {
    id: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
    pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
    created_at: 1673347337,
    kind: 1,
    content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
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
    tags: [],
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
exports.validPostWithNostrEventSignedOpened = {
    id: 6,
    target: "",
    action: "post",
    title: "",
    text: exports.validNostrEventSignedOpened.content,
    signer: (0, index_1.toBeNpub)(exports.validNostrEventSignedOpened.pubkey),
    signed_message: JSON.stringify(exports.validNostrEventSignedOpened),
    signature: exports.validNostrEventSignedOpened.sig,
    signed_time: exports.validNostrEventSignedOpened.created_at,
    added_time: "2024-01-17T03:42:38.608Z",
    category: null,
    tags: null,
    tickers: null,
    upvote: 8,
    downvote: 0,
    bullish: 0,
    bearish: 5,
    important: 0,
    scam: 3,
    comments_count: 3,
    latest_action_added_time: "2024-01-17T03:44:46.195Z",
};
exports.validPostWithNostrSpasmEventSignedOpened = {
    id: 7,
    target: "",
    action: "post",
    title: exports.validNostrSpasmEventSignedOpened.tags[3][1],
    text: exports.validNostrSpasmEventSignedOpened.content,
    signer: (0, index_1.toBeNpub)(exports.validNostrSpasmEventSignedOpened.pubkey),
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
    comments_count: 3,
    latest_action_added_time: "2024-01-17T03:44:46.195Z",
};
exports.validNostrEventConvertedToSpasmV1_0_0 = {
    meta: {
        baseProtocol: "nostr",
        hasExtraSpasmFields: false,
        convertedFrom: "NostrEvent"
    },
    action: "post",
    content: exports.validNostrEvent.content,
    author: (0, index_1.toBeNpub)(exports.validNostrEvent.pubkey),
    eventId: exports.validNostrEvent.id,
    originalEventObject: exports.validNostrEvent,
    originalEventString: JSON.stringify(exports.validNostrEvent),
    spasmVersion: "1.0.0",
    timestamp: exports.validNostrEvent.created_at,
};
exports.validNostrSpasmEventConvertedToSpasmV1_0_0 = {
    meta: {
        baseProtocol: "nostr",
        hasExtraSpasmFields: true,
        extraSpasmFieldsVersion: exports.validNostrSpasmEvent.tags[1][1],
        convertedFrom: "NostrSpasmEvent",
        license: exports.validNostrSpasmEvent.tags[0][1]
    },
    spasmVersion: "1.0.0",
    // In NostrSpasm v1.0.0 event id is signature, but since this
    // event is not signed yet, the event id is normal Nostr id.
    eventId: exports.validNostrSpasmEvent.id,
    action: "post",
    title: exports.validNostrSpasmEvent.tags[3][1],
    content: exports.validNostrSpasmEvent.content,
    timestamp: exports.validNostrSpasmEvent.created_at,
    author: (0, index_1.toBeNpub)(exports.validNostrSpasmEvent.pubkey),
    originalEventObject: exports.validNostrSpasmEvent,
    originalEventString: JSON.stringify(exports.validNostrSpasmEvent),
};
exports.validNostrEventSignedOpenedConvertedToSpasmV1_0_0 = {
    meta: {
        baseProtocol: "nostr",
        hasExtraSpasmFields: false,
        convertedFrom: "NostrEventSignedOpened",
        privateKeyType: "nostr"
    },
    action: "post",
    content: exports.validNostrEventSignedOpened.content,
    author: (0, index_1.toBeNpub)(exports.validNostrEventSignedOpened.pubkey),
    eventId: exports.validNostrEventSignedOpened.id,
    originalEventObject: exports.validNostrEventSignedOpened,
    originalEventString: JSON.stringify(exports.validNostrEventSignedOpened),
    spasmVersion: "1.0.0",
    timestamp: exports.validNostrEventSignedOpened.created_at,
    signature: exports.validNostrEventSignedOpened.sig
};
exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0 = {
    meta: {
        baseProtocol: "nostr",
        hasExtraSpasmFields: true,
        extraSpasmFieldsVersion: exports.validNostrSpasmEventSignedOpened.tags[1][1],
        convertedFrom: "NostrSpasmEventSignedOpened",
        privateKeyType: "nostr",
        license: exports.validNostrSpasmEventSignedOpened.tags[0][1]
    },
    spasmVersion: "1.0.0",
    eventId: exports.validNostrSpasmEventSignedOpened.sig,
    action: exports.validNostrSpasmEventSignedOpened.tags[2][1],
    title: exports.validNostrSpasmEvent.tags[3][1],
    content: exports.validNostrSpasmEventSignedOpened.content,
    timestamp: exports.validNostrSpasmEventSignedOpened.created_at,
    author: (0, index_1.toBeNpub)(exports.validNostrSpasmEventSignedOpened.pubkey),
    originalEventObject: exports.validNostrSpasmEventSignedOpened,
    originalEventString: JSON.stringify(exports.validNostrSpasmEventSignedOpened),
    signature: exports.validNostrSpasmEventSignedOpened.sig
};
exports.validPostWithNostrEventSignedOpenedConvertedToSpasmV1_0_0 = {
    ...exports.validNostrEventSignedOpenedConvertedToSpasmV1_0_0,
    dbId: exports.validPostWithNostrEventSignedOpened.id,
    dbTimestamp: (0, index_2.toBeTimestamp)(exports.validPostWithNostrEventSignedOpened.added_time),
    reactions: {
        upvote: exports.validPostWithNostrEventSignedOpened.upvote,
        downvote: exports.validPostWithNostrEventSignedOpened.downvote,
        bullish: exports.validPostWithNostrEventSignedOpened.bullish,
        bearish: exports.validPostWithNostrEventSignedOpened.bearish,
        important: exports.validPostWithNostrEventSignedOpened.important,
        scam: exports.validPostWithNostrEventSignedOpened.scam,
        comments_count: exports.validPostWithNostrEventSignedOpened.comments_count,
    }
};
exports.validPostWithNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0 = {
    ...exports.validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0,
    dbId: exports.validPostWithNostrSpasmEventSignedOpened.id,
    dbTimestamp: (0, index_2.toBeTimestamp)(exports.validPostWithNostrSpasmEventSignedOpened.added_time),
    reactions: {
        upvote: exports.validPostWithNostrSpasmEventSignedOpened.upvote,
        downvote: exports.validPostWithNostrSpasmEventSignedOpened.downvote,
        bullish: exports.validPostWithNostrSpasmEventSignedOpened.bullish,
        bearish: exports.validPostWithNostrSpasmEventSignedOpened.bearish,
        important: exports.validPostWithNostrSpasmEventSignedOpened.important,
        scam: exports.validPostWithNostrSpasmEventSignedOpened.scam,
        comments_count: exports.validPostWithNostrSpasmEventSignedOpened.comments_count,
    }
};
exports.validNostrReplyToDmpEventConvertedToSpasmV1_0_0 = {
    meta: {
        baseProtocol: "nostr",
        hasExtraSpasmFields: true,
        extraSpasmFieldsVersion: exports.validNostrReplyToDmpEvent.tags[1][1],
        convertedFrom: "NostrSpasmEventSignedOpened",
        privateKeyType: "nostr",
        license: exports.validNostrReplyToDmpEvent.tags[0][1]
    },
    spasmVersion: "1.0.0",
    eventId: exports.validNostrReplyToDmpEvent.sig,
    parentEvent: exports.validNostrReplyToDmpEvent.tags[3][1],
    action: exports.validNostrReplyToDmpEvent.tags[2][1],
    content: exports.validNostrReplyToDmpEvent.content,
    timestamp: exports.validNostrReplyToDmpEvent.created_at,
    author: (0, index_1.toBeNpub)(exports.validNostrReplyToDmpEvent.pubkey),
    originalEventObject: exports.validNostrReplyToDmpEvent,
    originalEventString: JSON.stringify(exports.validNostrReplyToDmpEvent),
    signature: exports.validNostrReplyToDmpEvent.sig
};
exports.validPostWithRssItem = {
    id: 7188,
    guid: "https://thedefiant.io/starknet-unveils-token-launch-plans",
    source: "thedefiant.io",
    tickers: "",
    title: "Starknet Unveils Token Launch Plans ",
    url: "https://thedefiant.io/starknet-unveils-token-launch-plans",
    description: "Ethereum Layer 2 network Starknet has allocated 900M STRK tokens to an airdrop rewarding past and present users’ contributions....",
    pubdate: "2023-12-08T18:56:29.000Z",
    category: "defi",
    tags: null,
    upvote: 3,
    downvote: null,
    bullish: 2,
    bearish: 0,
    important: null,
    scam: 1,
    comments_count: 3,
    latest_action_added_time: null
};
exports.validPostWithRssItemConvertedToSpasmV1_0_0 = {
    meta: {
        hasExtraSpasmFields: false,
        convertedFrom: "unknown",
    },
    spasmVersion: "1.0.0",
    eventId: "https://thedefiant.io/starknet-unveils-token-launch-plans",
    dbId: 7188,
    action: "post",
    title: "Starknet Unveils Token Launch Plans ",
    content: "Ethereum Layer 2 network Starknet has allocated 900M STRK tokens to an airdrop rewarding past and present users’ contributions....",
    source: "thedefiant.io",
    timestamp: (0, index_2.toBeTimestamp)(exports.validPostWithRssItem.pubdate),
    category: "defi",
    links: {
        http: "https://thedefiant.io/starknet-unveils-token-launch-plans",
        guid: "https://thedefiant.io/starknet-unveils-token-launch-plans"
    },
    reactions: {
        upvote: exports.validPostWithRssItem.upvote,
        downvote: exports.validPostWithRssItem.downvote,
        bullish: exports.validPostWithRssItem.bullish,
        bearish: exports.validPostWithRssItem.bearish,
        important: exports.validPostWithRssItem.important,
        scam: exports.validPostWithRssItem.scam,
        comments_count: exports.validPostWithRssItem.comments_count,
    }
};
//# sourceMappingURL=_events-data.js.map