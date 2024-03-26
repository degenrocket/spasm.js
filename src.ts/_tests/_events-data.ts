import {
  NostrEvent, NostrEventSignedOpened, NostrSpasmEvent,
  NostrSpasmEventSignedOpened, DmpEvent, Post,
  DmpEventSignedClosed, DmpEventSignedOpened, SpasmEvent, SpasmEventSigned
} from "./../types/interfaces";
import { toBeNpub } from "./../utils/index"
import { toBeTimestamp } from "./../utils/index";

export const validDmpEvent: DmpEvent = {
  version: "dmp_v0.0.1",
  time: "2022-01-01T22:04:46.178Z",
  action: "post",
  target: "",
  title: "genesis",
  text: "not your keys, not your words",
  license: "MIT"
}

export const validDmpEventSignedClosed: DmpEventSignedClosed = {
  signer: '0xf8553015220a857eda377a1e903c9e5afb3ac2fa',
  signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b',
  // signedString: JSON.stringify(validDmpEvent)
  signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your words\",\"license\":\"MIT\"}"
}

export const validDmpEventSignedOpened: DmpEventSignedOpened = {
  ...validDmpEventSignedClosed,
  signedObject: validDmpEvent
}

export const validNostrReplyToDmpEvent: NostrSpasmEventSignedOpened = {
    kind: 1,
    created_at: 1708153412,
    tags: [
      ["license","SPDX-License-Identifier: CC0-1.0]"],
      ["spasm_version","1.0.0"],
      ["spasm_action","reply"],
      ["spasm_target","0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b"]
    ],
    content: "To the SPASM!",
    pubkey:"2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
    id:"4ca9b330abad821509acbfe90ebcc25f267e02718377eb4d831bc5bb9482c85f",
    sig:"2f8f195c70070f0c434c397da2fb44b1196994a2f24515d76477a8c8b5a4f289fcc5287d8163cbadfee29af55450fa9fa6b15ac732877d732e98e2be10acb290"
}

export const validPostWithNostrReplyToDmpEvent: Post = {
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
}

export const validPostWithDmpEventSignedClosed: Post = {
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
  children: [validPostWithNostrReplyToDmpEvent]
}

export const validDmpEventConvertedToSpasm: SpasmEvent = {
  meta: {
    baseProtocol: "dmp",
    baseProtocolVersion: "0.0.1",
    hasExtraSpasmFields: false,
    convertedFrom: "DmpEvent",
    license: validDmpEvent.license,
  },
  action: "post",
  content: "not your keys, not your words",
  originalEventObject: validDmpEvent,
  originalEventString: JSON.stringify(validDmpEvent),
  parentEvent: '',
  spasmVersion: "1.0.0",
  timestamp: 1641074686178,
  title: "genesis"
}

export const validDmpEventSignedClosedConvertedToSpasm: SpasmEventSigned = {
  ...validDmpEventConvertedToSpasm,
  meta: {
    ...validDmpEventConvertedToSpasm.meta,
    convertedFrom: "DmpEventSignedClosed",
    privateKeyType: 'ethereum',
  },
  author: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa", 
  eventId: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
  signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b',
}

export const validDmpEventSignedOpenedConvertedToSpasm: SpasmEventSigned = {
  ...validDmpEventSignedClosedConvertedToSpasm,
  meta: {
    ...validDmpEventSignedClosedConvertedToSpasm.meta,
    convertedFrom: "DmpEventSignedOpened",
  }
}

export const validPostWithDmpEventSignedClosedConvertedToSpasm: SpasmEventSigned = {
  ...validDmpEventSignedClosedConvertedToSpasm,
  meta: {
    ...validDmpEventSignedClosedConvertedToSpasm.meta,
    convertedFrom: "DmpEventSignedClosed",
  },
  dbId: 1337,
  dbTimestamp: 1641074686195,
  category: "privacy",
  source: "degenrocket.space",
  reactions: {
    upvote: validPostWithDmpEventSignedClosed.upvote,
    downvote: validPostWithDmpEventSignedClosed.downvote,
    bullish: validPostWithDmpEventSignedClosed.bullish,
    bearish: validPostWithDmpEventSignedClosed.bearish,
    important: validPostWithDmpEventSignedClosed.important,
    scam: validPostWithDmpEventSignedClosed.scam,
    comments_count: validPostWithDmpEventSignedClosed.comments_count,
  },
  comments: [validPostWithNostrReplyToDmpEvent]
}

export const validNostrEvent: NostrEvent = {
  id: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
  pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
  created_at: 1673347337,
  kind: 1,
  content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
}

export const validNostrSpasmEvent: NostrSpasmEvent = {
  kind: 1,
  created_at: 1705462957,
  tags:[
    ["license","SPDX-License-Identifier: CC0-1.0"],
    ["spasm_version","1.0.0"],
    ["spasm_action","post"],
    ["spasm_title","Nostr Spasm genesis"]
  ],
  content: "Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.",
  pubkey: "2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42",
  id: "db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651"
}

export const validNostrEventSignedOpened: NostrEventSignedOpened = {
  id: "4376c65d2f232afbe9b882a35baa4f6fe8667c4e684749af565f981833ed6a65",
  pubkey: "6e468422dfb74a5738702a8823b9b28168abab8655faacb6853cd0ee15deee93",
  created_at: 1673347337,
  kind: 1,
  content: "Walled gardens became prisons, and nostr is the first step towards tearing down the prison walls.",
  tags: [],
  sig: "908a15e46fb4d8675bab026fc230a0e3542bfade63da02d542fb78b2a8513fcd0092619a2c8c1221e581946e0191f2af505dfdf8657a414dbca329186f009262"
};

export const validNostrSpasmEventSignedOpened: NostrSpasmEventSignedOpened = {
  kind: 1,
  created_at: 1705462957,
  tags:[
    ["license","SPDX-License-Identifier: CC0-1.0"],
    ["spasm_version","1.0.0"],
    ["spasm_action","post"],
    ["spasm_title","Nostr Spasm genesis"]
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
  downvote: 0,
  bullish: 0,
  bearish: 5,
  important: 0,
  scam: 3,
  comments_count: 3,
  latest_action_added_time: "2024-01-17T03:44:46.195Z",
}

export const validPostWithNostrSpasmEventSignedOpened: Post = {
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
  comments_count: 3,
  latest_action_added_time: "2024-01-17T03:44:46.195Z",
}

export const validNostrEventConvertedToSpasmV1_0_0: SpasmEvent = {
  meta: {
    baseProtocol: "nostr",
    hasExtraSpasmFields: false,
    convertedFrom: "NostrEvent"
  },
  action: "post",
  content: validNostrEvent.content,
  author: toBeNpub(validNostrEvent.pubkey),
  eventId: validNostrEvent.id,
  originalEventObject: validNostrEvent,
  originalEventString: JSON.stringify(validNostrEvent),
  spasmVersion: "1.0.0",
  timestamp: validNostrEvent.created_at,
}

export const validNostrSpasmEventConvertedToSpasmV1_0_0: SpasmEvent = {
  meta: {
    baseProtocol: "nostr",
    hasExtraSpasmFields: true,
    extraSpasmFieldsVersion: validNostrSpasmEvent.tags[1][1],
    convertedFrom: "NostrSpasmEvent",
    license: validNostrSpasmEvent.tags[0][1]
  },
  spasmVersion: "1.0.0",
  // In NostrSpasm v1.0.0 event id is signature, but since this
  // event is not signed yet, the event id is normal Nostr id.
  eventId: validNostrSpasmEvent.id,
  action: "post",
  title: validNostrSpasmEvent.tags[3][1],
  content: validNostrSpasmEvent.content,
  timestamp: validNostrSpasmEvent.created_at,
  author: toBeNpub(validNostrSpasmEvent.pubkey),
  originalEventObject: validNostrSpasmEvent,
  originalEventString: JSON.stringify(validNostrSpasmEvent),
}

export const validNostrEventSignedOpenedConvertedToSpasmV1_0_0: SpasmEvent = {
  meta: {
    baseProtocol: "nostr",
    hasExtraSpasmFields: false,
    convertedFrom: "NostrEventSignedOpened",
    privateKeyType: "nostr"
  },
  action: "post",
  content: validNostrEventSignedOpened.content,
  author: toBeNpub(validNostrEventSignedOpened.pubkey),
  eventId: validNostrEventSignedOpened.id,
  originalEventObject: validNostrEventSignedOpened,
  originalEventString: JSON.stringify(validNostrEventSignedOpened),
  spasmVersion: "1.0.0",
  timestamp: validNostrEventSignedOpened.created_at,
  signature: validNostrEventSignedOpened.sig
}

export const validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0: SpasmEvent = {
  meta: {
    baseProtocol: "nostr",
    hasExtraSpasmFields: true,
    extraSpasmFieldsVersion: validNostrSpasmEventSignedOpened.tags[1][1],
    convertedFrom: "NostrSpasmEventSignedOpened",
    privateKeyType: "nostr",
    license: validNostrSpasmEventSignedOpened.tags[0][1]
  },
  spasmVersion: "1.0.0",
  eventId: validNostrSpasmEventSignedOpened.sig,
  action: validNostrSpasmEventSignedOpened.tags[2][1],
  title: validNostrSpasmEvent.tags[3][1],
  content: validNostrSpasmEventSignedOpened.content,
  timestamp: validNostrSpasmEventSignedOpened.created_at,
  author: toBeNpub(validNostrSpasmEventSignedOpened.pubkey),
  originalEventObject: validNostrSpasmEventSignedOpened,
  originalEventString: JSON.stringify(validNostrSpasmEventSignedOpened),
  signature: validNostrSpasmEventSignedOpened.sig
}

export const validPostWithNostrEventSignedOpenedConvertedToSpasmV1_0_0: SpasmEvent = {
  ...validNostrEventSignedOpenedConvertedToSpasmV1_0_0,
  dbId: validPostWithNostrEventSignedOpened.id,
  dbTimestamp: toBeTimestamp(validPostWithNostrEventSignedOpened.added_time),
  reactions: {
    upvote: validPostWithNostrEventSignedOpened.upvote,
    downvote: validPostWithNostrEventSignedOpened.downvote,
    bullish: validPostWithNostrEventSignedOpened.bullish,
    bearish: validPostWithNostrEventSignedOpened.bearish,
    important: validPostWithNostrEventSignedOpened.important,
    scam: validPostWithNostrEventSignedOpened.scam,
    comments_count: validPostWithNostrEventSignedOpened.comments_count,
  }
}

export const validPostWithNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0: SpasmEvent = {
  ...validNostrSpasmEventSignedOpenedConvertedToSpasmV1_0_0,
  dbId: validPostWithNostrSpasmEventSignedOpened.id as string,
  dbTimestamp: toBeTimestamp(validPostWithNostrSpasmEventSignedOpened.added_time),
  reactions: {
    upvote: validPostWithNostrSpasmEventSignedOpened.upvote,
    downvote: validPostWithNostrSpasmEventSignedOpened.downvote,
    bullish: validPostWithNostrSpasmEventSignedOpened.bullish,
    bearish: validPostWithNostrSpasmEventSignedOpened.bearish,
    important: validPostWithNostrSpasmEventSignedOpened.important,
    scam: validPostWithNostrSpasmEventSignedOpened.scam,
    comments_count: validPostWithNostrSpasmEventSignedOpened.comments_count,
  }
}

export const validNostrReplyToDmpEventConvertedToSpasmV1_0_0: SpasmEvent = {
  meta: {
    baseProtocol: "nostr",
    hasExtraSpasmFields: true,
    extraSpasmFieldsVersion: validNostrReplyToDmpEvent.tags[1][1],
    convertedFrom: "NostrSpasmEventSignedOpened",
    privateKeyType: "nostr",
    license: validNostrReplyToDmpEvent.tags[0][1]
  },
  spasmVersion: "1.0.0",
  eventId: validNostrReplyToDmpEvent.sig,
  parentEvent: validNostrReplyToDmpEvent.tags[3][1],
  action: validNostrReplyToDmpEvent.tags[2][1],
  content: validNostrReplyToDmpEvent.content,
  timestamp: validNostrReplyToDmpEvent.created_at,
  author: toBeNpub(validNostrReplyToDmpEvent.pubkey),
  originalEventObject: validNostrReplyToDmpEvent,
  originalEventString: JSON.stringify(validNostrReplyToDmpEvent),
  signature: validNostrReplyToDmpEvent.sig
}

export const validPostWithRssItem: Post = {
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
}

export const validPostWithRssItemConvertedToSpasmV1_0_0: SpasmEvent = {
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
  timestamp: toBeTimestamp(validPostWithRssItem.pubdate),
  category: "defi",
  links: {
    http: "https://thedefiant.io/starknet-unveils-token-launch-plans",
    guid: "https://thedefiant.io/starknet-unveils-token-launch-plans"
  },
  reactions: {
    upvote: validPostWithRssItem.upvote,
    downvote: validPostWithRssItem.downvote,
    bullish: validPostWithRssItem.bullish,
    bearish: validPostWithRssItem.bearish,
    important: validPostWithRssItem.important,
    scam: validPostWithRssItem.scam,
    comments_count: validPostWithRssItem.comments_count,
  }
}
