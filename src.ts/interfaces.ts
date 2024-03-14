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
  tickers?: string[] | null // keywords in SpasmEvent
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

export type SpasmVersion = "1.0.0" | string | false

export type EventBaseProtocol = "dmp" | "nostr" | "spasm" | false

export type EventBaseProtocolVersion = "dmp_v0.1.0" | string | false

export type EventPrivateKey = "ethereum" | "nostr" | false

export type EventProtocolCryptography = "schnorr" | "secp256k1" | string | false

export type SpasmAction = Web3MessageAction

export interface HashesObject {
  sha1?: string
  sha256?: string
  infohash?: string
  ipfs?: string
}

export interface LinksObject {
  http?: string
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

export interface SpasmEvent {
  baseProtocol?: EventBaseProtocol
  baseProtocolVersion?: EventBaseProtocolVersion
  hasExtraSpasmFields?: boolean
  spasmVersion?: SpasmVersion
  privateKey?: EventPrivateKey
  cryptography?: EventProtocolCryptography
  spasmId?: string | number
  eventId?: string | number
  dbId?: number | string
  hashes?: HashesObject
  rootEvent?: string
  parentEvent?: string
  action?: string
  title?: string
  content?: string
  source?: string
  timestamp?: number | string
  dbTimestamp?: number | string
  author?: string
  category?: string
  links?: LinksObject
  keywords?: string[] | string
  tags?: any[][]
  media?: EventMedia
  referencedEvents?: string[]
  referencedAuthors?: string[]
  previousEvent?: string | number
  sequence?: number
  license?: string
  extra?: any
  metadata?: any
  language?: string
  originalEventObject?: DmpEvent | NostrSpasmEventSignedOpened
  originalEventString?: string
  reactions?: EventReactions
  comments?: any
  signature?: string
}

export interface SpasmEventSignedOpened extends SpasmEvent {
  signature: string
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
