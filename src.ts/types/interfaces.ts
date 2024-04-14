export type FiltersCategory = "defi" | "nft" | "privacy" | "any" | null;
export type PostId = string | number | null | undefined
export type PostUrl = string |  null | undefined
export type PostSignature = string |  null | undefined
export type PostAction = Web3MessageAction | null | undefined

export interface Post {
  // web2 & web3
  // Each post might have different IDs on different servers
  id?: PostId // dbId in SpasmEvent

  // web2 only
  // guid, source, author, url, description, pubdate
  // are usually taken from the RSS feed.
  guid?: string | null // eventId in SpasmEvent
  source?: string | null // source in SpasmEvent
  author?: string | null // author in SpasmEvent
  url?: PostUrl // links.http|ipfs|etc in SpasmEvent
  description?: string | null // content in SpasmEvent
  pubdate?: string | null // timestamp in SpasmEvent

  // web3 only
  target?: string | null // parentEvent in SpasmEvent
  action?: PostAction // action in SpasmEvent
  text?: string | null // content in SpasmEvent
  signer?: string | null // author in SpasmEvent
  signed_message?: string | null // originalEventString in SpasmEvent
  signature?: PostSignature // signature in SpasmEvent
  signed_time?: string | null // timestamp in SpasmEvent
  added_time?: string | null // dbTimestamp in SpasmEvent
  ipfs? : string | null // links.ipfs in SpasmEvent

  // web2 & web3
  tickers?: string | string[] | null // keywords in SpasmEvent
  title?: string | null // title in SpasmEvent
  category?: string | null // category in SpasmEvent
  tags?: string[] | null // spasmEvent.tags ??
  upvote?: number | null // spasmEvent.reactions.upvote
  downvote?: number | null
  bullish?: number | null
  bearish?: number | null
  important?: number | null
  scam?: number | null
  comments_count?: number | null
  latest_action_added_time?: string | null

  // comments
  children?: Post[]
}

export type Web3MessageAction = "post" | "react" | "reply"

export type Web3MessageLicense = "MIT" | "CC0" | "CC0-1.0" | "SPDX-License-Identifier: CC0-1.0" | "SPDX-License-Identifier: MIT"

export interface Web3Message {
  version: string
  time?: string
  action: Web3MessageAction
  target?: string
  title?: string 
  text?: string
  license: Web3MessageLicense
}

export type NostrSpasmTag = SpasmVersionTag | SpasmTargetTag | SpasmActionTag | SpasmCategoryTag | SpasmTitleTag | SpasmLicenseTag 

export type SpasmVersionTag = ["spasm_version", string]

export type SpasmTargetTag = ["spasm_target", string]

export type SpasmActionTag = ["spasm_action", Web3MessageAction]

export type SpasmCategoryTag = ["spasm_category", FiltersCategory]

export type SpasmTitleTag = ["spasm_title", string]

export type SpasmLicenseTag = ["license", Web3MessageLicense]

export type AnyTag = any[]

export type UnknownEvent =
  DmpEvent |
  DmpEventSignedClosed |
  DmpEventSignedOpened |
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened |
  SpasmEvent

export type UnknownPostOrEvent = Post | UnknownEvent

export interface NostrEvent {
  id?: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  tags?: AnyTag[]
}

export interface NostrEventSignedOpened extends NostrEvent {
  id: string
  sig: string
}

// Nostr event with extra tags to be compatible with SPASM.
export interface NostrSpasmEvent {
  id?: string
  content: string
  created_at: number
  kind: number
  pubkey: string
  // tags: (NostrSpasmTag | AnyTag)[]
  // Require at least one tag, followed by any number of tags.
  tags: [(NostrSpasmTag | AnyTag), ...(NostrSpasmTag | AnyTag)[]]

  // TODO: how to enforce that tags should have at least
  // one element of type NostrSpasmTag?
  // The solution below requires that the first element
  // of tags array should be of type NostrSpasmTag, 
  // followed by any number of elements of type NostrSpasmTag or AnyTag.
  // However, there might be other tags, so NostrSpasmTag might be not
  // the first element in the tags array.
  // tags: [NostrSpasmTag, ...(NostrSpasmTag | AnyTag)[]]
}

// Signed Nostr event with extra tags to be compatible with SPASM.
// 'Opened' means that the signed event is already an object
// so there is no need to convert any string to an object.
export interface NostrSpasmEventSignedOpened extends NostrSpasmEvent {
  id: string
  sig: string
}

export interface DmpEvent extends Web3Message {}

// 'Closed' means that the signed string has to be converted to an
// object in order to get an access to the properties of the event.
export interface DmpEventSignedClosed {
  signedString: string
  signature: string
  signer?: string
}

// 'Opened' means that the signed event has an object with all the
// properties of the event, so there is no need to convert
// any string to an object in order to work with the event.
export interface DmpEventSignedOpened extends DmpEventSignedClosed {
  signedObject: DmpEvent
}

export type SpasmVersion = "1.0.0" | string

export type EventBaseProtocol = "dmp" | "nostr" | "spasm"

export type EventBaseProtocolVersion = "dmp_v0.1.0" | string

export type ExtraSpasmFieldsVersion = "1.0.0" | string

export type EventPrivateKeyType = "ethereum" | "nostr"

// Nostr usually uses "schnorr", while Ethereum uses "ecdsa"
export type EventProtocolCryptography = "schnorr" | "ecdsa" | "secp256k1" | string

export type SpasmAction = Web3MessageAction

export interface HashesObject {
  sha1?: string
  sha256?: string
  infohash?: string
  ipfs?: string
}

export interface LinksObject {
  http?: string
  guid?: string
  ipfs?: string
  torrent?: string
}

export type MimeType =
  | "image/jpeg" | "image/png" | "image/gif" | "image/webp"
  | "image/svg+xml"
  | "audio/mpeg" | "audio/ogg" | "audio/wav"
  | "video/mp4" | "video/ogg" | "video/webm"
  | "text/plain" | "text/html" | "text/css" | "text/javascript"
  | "application/json" | "application/xml" | "application/pdf"
  | "application/octet-stream";

export interface EventMedia {
  hashes?: HashesObject
  links?: LinksObject
  type?: MimeType
}

export interface EventReactions {
  upvote?: number | null
  downvote?: number | null
  bullish?: number | null
  bearish?: number | null
  important?: number | null
  scam?: number | null
  comments_count?: number | null
  latest_action_added_time?: string | null
}

export interface SpasmEventMeta {
  baseProtocol?: EventBaseProtocol
  baseProtocolVersion?: EventBaseProtocolVersion
  hasExtraSpasmFields?: boolean
  extraSpasmFieldsVersion?: ExtraSpasmFieldsVersion
  convertedFrom?: EventType
  privateKeyType?: EventPrivateKeyType
  cryptography?: EventProtocolCryptography
  hashes?: HashesObject
  previousEvent?: string | number
  sequence?: number
  powNonce?: string
  license?: string
  language?: string
}

export interface SpasmEventMetaSigned extends SpasmEventMeta {
  privateKeyType: EventPrivateKeyType
  // cryptography is a bit unclear, so for now it's optional
  cryptography?: EventProtocolCryptography
}

export interface SpasmEvent {
  meta?: SpasmEventMeta
  spasmVersion?: SpasmVersion
  spasmId?: string | number
  eventId?: string | number
  dbId?: number | string
  rootEvent?: string
  parentEvent?: string
  action?: string
  title?: string
  content?: string
  source?: string
  timestamp?: number
  dbTimestamp?: number | string
  author?: string
  category?: string
  links?: LinksObject
  keywords?: string[] | string
  tags?: any[][]
  media?: EventMedia
  referencedEvents?: string[]
  referencedAuthors?: string[]
  extra?: any
  originalEventObject?: UnknownPostOrEvent
  originalEventString?: string
  reactions?: EventReactions
  comments?: any[]
  signature?: string
}

export interface SpasmEventSigned extends SpasmEvent {
  meta: SpasmEventMetaSigned
  eventId: string | number
  author: string
  signature: string
}

export interface SpasmEventSignedOpened extends SpasmEventSigned {
  originalEventObject: DmpEvent | NostrSpasmEventSignedOpened
}

export interface SpasmEventSignedClosed extends SpasmEventSigned {
  originalEventString: string
}

export interface StandardizedEvent {
  signedString?: string
  signature?: string
  signer?: string
  target?: string
  action?: string
  title?: string
  text?: string
  signedDate?: string
}

export interface SpasmSource {
  name?: string
  uiUrl?: string
  apiUrl?: string
  query?: string
  showSource?: boolean
}

export class IgnoreWhitelistFor {
  action: {
    post: boolean
    reply: boolean
    react: boolean
    moderate: boolean
  }

  constructor() {
    this.action = {
      post: false,
      reply: false,
      react: false,
      moderate: false
    }
  }
}

export type EventType =
  "DmpEvent" |
  "DmpEventSignedClosed" |
  "DmpEventSignedOpened" |
  "NostrEvent" |
  "NostrEventSignedOpened" |
  "NostrSpasmEvent" |
  "NostrSpasmEventSignedOpened" |
  "SpasmEvent" |
  "unknown"

export type EventInfoType = EventType | "Post"

export interface EventInfo {
  type: EventInfoType | false
  hasSignature: boolean
  baseProtocol: EventBaseProtocol | false
  privateKeyType: EventPrivateKeyType | false
  isSpasmCompatible: boolean
  hasExtraSpasmFields: boolean
  license: string | false
  // originalEvent: UnknownEvent
}

export type WebType = "web2" | "web3"

export type EventIsSealedUnderKeyName = "signed_message" | "signedObject"

// interface Web3Post extends Post {
//   signed_message: string
// }

export interface KnownPostOrEventInfo {
  webType: WebType | false
  eventIsSealed: boolean
  eventIsSealedUnderKeyName: EventIsSealedUnderKeyName | false
  eventInfo: EventInfo | false
}

export type PrivateKeyType = "ethereum" | "nostr"

export type NostrSpasmVersion = "1.0.0" | "2.0.0"

/*
 * SCHEME
 *
event*
├── dbKey                            // database primary key
├── format // TODO protocol?         // "spasm"
├── version                          // "2.0.0"
├── id
├── protocol // TODO original.protocol.name original.id
│   ├── name                         // "spasm"
│   └── version                      // "2.0.0"
├── root #.
│   ├── id #.
│   ├── hosts[] (see host below) #.
│   ├── depth
│   └── event*
├── parent #.
│   ├── id #.
│   ├── hosts[] (see host below) #.
│   ├── depth
│   └── event*
├── action #!                        // post/reply/react/vote/etc!
├── title #!
├── content #!
├── source
├── timestamp #!
├── dbTimestamp
├── author // TODO
├── authors[] #.
│   ├── address #.
│   └── usernames[] // TODO how to verify? zk proof?
│       ├── value
│       ├── protocol
│       └── provider
├── category #.
├── links[] (see link below) #.
├── keywords[] #.
├── tags[] #.
├── medias[] #.
│   ├── hashes[] (see hash below) #.
│   ├── links[] (see link below) #. // TODO links, hosts or both?
│   └── type #.
├── references[] #.
│   ├── id #.
│   ├── hosts[] (see host below) #.
│   └── event*
├── mentions[] #. // TODO same authors
│   ├── address #.
│   └── usernames[] #.
│       ├── value #.
│       ├── protocol #.
│       └── provider #.
├── originalEventObject
├── originalEventString
├── stats // TODO how to make more flexible to changes? eg vote
│   ├── admin
│   │   ├── total
│   │   └── latestTimestamp
│   ├── moderate
│   │   ├── total
│   │   └── latestTimestamp
│   ├── edit
│   │   ├── total
│   │   └── latestTimestamp
│   ├── share
│   │   ├── total
│   │   └── latestTimestamp
│   ├── reply
│   │   ├── total
│   │   └── latestTimestamp
│   ├── vote
│   │   ├── total
│   │   ├── option1
│   │   ├── option2
│   │   ├── (... all options)
│   │   └── latestTimestamp
│   └── react
│       ├── total
│       ├── upvote
│       ├── downvote
│       ├── rocket
│       ├── (... all reactions)
│       └── latestTimestamp
├── sharedBy[]
│   ├── id
│   ├── hosts[] (see host below)
│   └── event*
├── extra
├── meta #. // TODO review
│   ├── spasm
│   │   ├── id
│   │   └── author
│   ├── convertedFrom
│   ├── originalProtocol #. // TODO original.id orig.protocol.name
│   │   ├── name #.
│   │   ├── id #.
│   │   ├── author #.
│   │   ├── version #.
│   │   ├── hasExtraSpasmFields
│   │   └── extraSpasmFieldsVersion
│   ├── privateKey
│   │   └── type
│   ├── cryptography
│   ├── previousEvent #.              // not parent event
│   │   ├── id #.
│   │   ├── hosts[] (see host below) #.
│   │   └── event*
│   ├── sequence #.                  // events sequence
│   ├── pow #.                       // proof-of-work
│   │   ├── nonce #.
│   │   ├── difficulty #.
│   │   └── words[] #.
│   ├── license #.
│   ├── language #.
│   ├── extra
│   └── hashes[] (see hash below) #. // TODO move main? delete?
├── signature
└── children[]
    ├── id
    ├── hosts[] (see host below)
    ├── depth
    └── event*

// TODO add zkProof field?

(deprecated)
└── tree
    ├── parents
    │   ├── rootEvent
    │   └── targetEvent
    ├── children
    │   ├── reactEvents[]
    │   ├── replyEvents[]
    │   ├── voteEvents[]
    │   ├── shareEvents[]
    │   ├── moderateEvents[]
    │   └── adminEvents[]
    └── stats
        ├── rootDepth
        ├── targetDepth
        └── childrenDepth

hash
├── value
├── name
└── meta
    ├── length
    ├── type
    ├── pieceLength
    └── pieces[]

TODO:
host = link

link
├── value
├── protocol
├── origin
├── host
├── pathname
├── search
├── port
├── hash
└── originalProtocolKey

main
├── root #.
│   ├── id #.
│   ├── hosts[] (see host below) #.
├── parent #.
│   ├── id #.
│   ├── hosts[] (see host below) #.
├── action #!
├── title #!
├── content #!
├── timestamp #!
├── authors[] #.
│   ├── address #.
├── category #.
├── links[] (see link below) #.
├── keywords[] #.
├── tags[] #.
├── medias[] #.
│   ├── hashes[] (see hash below) #.
│   ├── links[] (see link below) #.
│   └── type #.
├── references[] #.
│   ├── id #.
│   ├── hosts[] (see host below) #.
├── mentions[] #.
│   ├── address #.
│   └── usernames[] #.
│       ├── value #.
│       ├── protocol #.
│       └── provider #.
├── meta #.
│   ├── originalProtocol #.
│   │   ├── name #.
│   │   ├── id #.
│   │   ├── author #.
│   │   ├── version #.
│   ├── previousEvent #.              // not parent event
│   │   ├── id #.
│   │   ├── hosts[] (see host below) #.
│   ├── sequence #.                  // events sequence
│   ├── pow #.                       // proof-of-work
│   │   ├── nonce #.
│   │   ├── difficulty #.
│   │   └── words[] #.
│   ├── license #.
│   ├── language #.


*/


