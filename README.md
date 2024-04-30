Signer and Protocol Agnostic Social Media (SPASM)
=================================================

## Overview

The future of social media is agnostic to signing keys, messaging formats, transport protocols and storage infrastructure. However, such design places significant burden on developers, who must maintain a myriad of protocols, formats, and architectures.

This library simplifies the process by encapsulating the complexities of various messaging formats into a single, standardized JSON object. By abstracting the underlying differences between these formats, it provides a unified interface for developers to work with, ensuring consistency and reducing the need for custom handling of each format.

For instance, instead of maintaining three distinct versions of the frontend (UI) and three separate database tables for three different messaging formats, developers can leverage this library to standardize all messages into a single format. This approach simplifies the architecture by consolidating the database tables into one and requiring only a single version of the UI, with minor adjustments as needed.

TypeScript interfaces of JSON objects of messaging formats that can be standardized with this library can be found at `./src.ts/types/interfaces.ts`.

```typescript
export type UnknownEvent =
  DmpEvent |
  DmpEventSignedClosed |
  DmpEventSignedOpened |
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened |
  SpasmEvent
```

After converting an unknown event to the Spasm event, you can now easily access common properties across most public messaging formats such as:
- `spasmEvent.id`
- `spasmEvent.author`
- `spasmEvent.action`
- `spasmEvent.content`
- `spasmEvent.timestamp`
- `spasmEvent.signature`
- `spasmEvent.target`

The original event will be stored under:
- `spasmEvent.originalEventObject`
- `spasmEvent.originalEventString`

The event metadata can be found under:
- `spasmEvent.meta`

See the full list of properties of `SpasmEvent` at `./src.ts/types/interfaces.ts`.

Here is a schema of the SpasmEventV2 interface:

```
event*
│
│
│   (Body)
├── type
├── protocol (only in Body, but not in Event)
│   ├── name                         // spasm, dmp, nostr
│   └── version                      // 2.0.0, 0.1.0, 1
├── root #. (EnvelopeWithTree, Event, but not in Body)
│   ├── ids[] #.
│   ├── marker #.
│   ├── depth                        // (expanded)
│   └── event*                       // (expanded)
├── parent #.
│   ├── ids[] #.
│   ├── marker #.
│   ├── depth                        // (expanded)
│   └── event*                       // (expanded)
├── action #!                        // post/reply/react/vote/etc!
├── title #!
├── content #!
├── timestamp #!
├── authors[] #.
│   ├── address #.
│   └── usernames[]                  // eg web2 posts (RSS items)
│       ├── value
│       ├── protocol
│       ├── proof
│       └── provider
├── categories[] #.
│   ├── name #.
│   └── sub (recursive category) #.
├── tips[] #.
│   ├── address #.
│   ├── text #.
│   ├── expiration #.
│   │   └── timestamp #.
│   ├── currency #.
│   │   ├── name #.
│   │   └── ticker #.
│   └── network #.
│       ├── name #.
│       └── id #.
├── hosts[] (see hosts below) #.     // can be added to children
├── links[] (see link below) #.
├── keywords[] #.
├── tags[] #.
├── medias[] #.
│   ├── hashes[] (see hash below) #.
│   ├── links[] (see link below) #.
│   └── type #.
├── references[] #.
│   ├── ids[] #.
│   ├── marker #.
│   └── event*                       // (expanded)
├── mentions[] #.
│   ├── address #.
│   └── usernames[] #.
│       ├── value #.
│       ├── protocol #.
│       ├── proof #.
│       └── provider #.
├── proofs[] #.
│   ├── value #.
│   ├── links[] #.
│   └── protocol #.
│       ├── name #.
│       └── version #.
├── previousEvent (Body & Sibling, not in SpasmEvent)
│   ├── ids[] #.
│   ├── marker #.
│   ├── depth                        // (expanded)
│   └── event*                       // (expanded)
├── sequence (Body & Sibling, not in SpasmEvent)
├── license #.
├── language #.
├── extra
├── pow                // proof-of-work (not included in spasmid)
│   ├── nonce
│   ├── difficulty
│   ├── words[]
│   └── network
│       ├── name
│       └── id
│
│   (Envelope)
├── type
├── ids[]
├── signatures
│   ├── value
│   ├── type                             // ethereum, nostr
│   ├── version
│   └── pubkey
│
├── siblings
│   ├── type
│   ├── signedString
│   ├── originalObject
│   ├── signatures[]
│   │   ├── value
│   │   ├── type
│   │   ├── version
│   │   └── pubkey
│   ├── sequence
│   ├── previousEvent
│   │   └── event
│   └── protocol
│       ├── name                         // dmp, spasm, nostr
│       ├── version                      // 0.1.0, 2.0.0, 1
│       ├── hasExtraSpasmFields          // (expanded)
│       └── extraSpasmFieldsVersion      // (expanded)
│
├── db                               // database
│   ├── key                          // database primary key
│   ├── addedTimestamp
│   ├── updatedTimestamp
│   └── table
│
├── source
│   ├── name
│   ├── uiUrl
│   ├── apiUrl
│   ├── query
│   └── showSource
├── stats[]
│   ├── action
│   ├── total
│   ├── latestTimestamp
│   ├── latestDbTimestamp
│   └── ...(upvote, downvote, option1, option2, etc.)
├── sharedBy[]
│   └── ids[]
│
│   (Envelope with tree)
├── type
├── root
│   └── event
├── parent
│   └── event
├── references[]
│   └── event
└── children[]
    └── SpasmEvent | Envelope | EnvelopeWithTree

id
├── value #.
├── format #.
│   ├── name
│   └── version
└── hosts[]

hash
├── value
├── name
├── length
├── type
├── pieceLength
└── pieces[]

link
├── value
├── protocol
├── origin
├── host
├── pathname
├── search
├── port
└── originalProtocolKey

```

### Features

- identify web2 posts and web3 events

- convert web2 posts and web3 events to Spasm event

## Installation

```bash
npm install spasm.js
```

## Usage

#### CommonJS (require)

Option 1. Import separate functions:

```js
const {identifyObject} = require('spasm.js')
const {convertToSpasm} = require('spasm.js')

const event = {
  // some event
}

// Identify the event
const info = identifyObject(event)

// Convert to Spasm
const spasmEvent = convertToSpasm(event)
```

Option 2. Import all functions:

```js
const spasm = require('spasm.js')

const event = {
  // some event
}

// Identify the event
const info = spasm.identifyObject(event)

// Convert to Spasm
const spasmEvent = spasm.convertToSpasm(event)
```

#### ESM (import)

Option 1. Import separate functions:

```js
import {identifyObject} from 'spasm.js'
import {convertToSpasm} from 'spasm.js'

const event = {
  // some event
}

// Identify the event
const info = identifyObject(event)

// Convert to Spasm
const spasmEvent = convertToSpasm(event)
```

Option 2. Import all functions:

```js
import * as spasm from 'spasm.js'

const event = {
  // some event
}

// Identify the event
const info = spasm.identifyObject(event)

// Convert to Spasm
const spasmEvent = spasm.convertToSpasm(event)
```

## Examples

### Convert DmpEventSignedClosed to Spasm

Here is a signed DMP event:

```typescript
const event: DmpEventSignedClosed = {
  signer: "0xf8553015220a857eda377a1e903c9e5afb3ac2fa",
  signature: "0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b",
  signedString: "{\"version\":\"dmp_v0.0.1\",\"time\":\"2022-01-01T22:04:46.178Z\",\"action\":\"post\",\"target\":\"\",\"title\":\"genesis\",\"text\":\"not your keys, not your words\",\"license\":\"MIT\"}"
}
```

Here is the result of `identifyEvent(event)`

```typescript
const output = {
  eventInfo: {
    baseProtocol: "dmp",
    hasExtraSpasmFields: false,
    hasSignature: true,
    isSpasmCompatible: true,
    license: "MIT",
    privateKeyType: "ethereum",
    type: "DmpEventSignedClosed"
  },
  eventIsSealed: false,
  eventIsSealedUnderKeyName: false,
  webType: "web3"
}
```

Here is how the event looks like after converting to Spasm:

```typescript
const spasmEvent: SpasmEvent = {
  meta: {
    baseProtocol: 'dmp',
    baseProtocolVersion: '0.0.1',
    hasExtraSpasmFields: false,
    convertedFrom: 'DmpEventSignedClosed',
    license: 'MIT',
    privateKeyType: 'ethereum'
  },
  spasmVersion: '1.0.0',
  target: '',
  action: 'post',
  title: 'genesis',
  content: 'not your keys, not your words',
  timestamp: 1641074686178,
  originalEventObject: {
    version: 'dmp_v0.0.1',
    time: '2022-01-01T22:04:46.178Z',
    action: 'post',
    target: '',
    title: 'genesis',
    text: 'not your keys, not your words',
    license: 'MIT'
  },
  originalEventString: '{"version":"dmp_v0.0.1","time":"2022-01-01T22:04:46.178Z","action":"post","target":"","title":"genesis","text":"not your keys, not your words","license":"MIT"}',
  id: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b',
  author: '0xf8553015220a857eda377a1e903c9e5afb3ac2fa',
  signature: '0xbd934a01dc3bd9bb183bda807d35e61accf7396c527b8a3d029c20c00b294cf029997be953772da32483b077eea856e6bafcae7a2aff95ae572af25dd3e204a71b'
}
```

### Convert NostrSpasmEventSignedOpened to Spasm

Here is a signed Nostr event with extra Spasm tags:

```typescript
export const event: NostrSpasmEventSignedOpened = {
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
}
```

Here is the result of `identifyEvent(event)`

```typescript
const output = {
  eventInfo: {
    baseProtocol: "nostr",
    hasExtraSpasmFields: true,
    hasSignature: true,
    isSpasmCompatible: true,
    license: "SPDX-License-Identifier: CC0-1.0",
    privateKeyType: "nostr",
    type: "NostrSpasmEventSignedOpened"
  },
  eventIsSealed: false,
  eventIsSealedUnderKeyName: false,
  webType: "web3"
}
```

Here is how the event looks like after converting to Spasm:

```typescript
const spasmEvent: SpasmEvent = {
  meta: {
    baseProtocol: 'nostr',
    baseProtocolId: 'db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651',
    hasExtraSpasmFields: true,
    extraSpasmFieldsVersion: '1.0.0',
    convertedFrom: 'NostrSpasmEventSignedOpened',
    privateKeyType: 'nostr'
    license: 'SPDX-License-Identifier: CC0-1.0]',
  },
  spasmVersion: '1.0.0',
  id: 'db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1'
  action: 'post',
  title: 'Nostr Spasm genesis',
  content: 'Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.',
  timestamp: 1705462957,
  author: 'npub195ke7xdf3efncf6spe0s26322mdcl6frj0n6yy6akcadxqzgdapqjsm60y',
  originalEventObject: {
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
  },
  originalEventString: '{"kind":1,"created_at":1705462957,"tags":[["license","SPDX-License-Identifier: CC0-1.0"],["spasm_version","1.0.0"],["spasm_action","post"],["spasm_title","Nostr Spasm genesis"]],"content":"Walled gardens became prisons, and Spasm is the second step towards tearing down the prison walls.","pubkey":"2d2d9f19a98e533c27500e5f056a2a56db8fe92393e7a2135db63ad300486f42","id":"db300d320853b25b57fa03c586d18f69ad9786ec5e21114253fc3762b22a5651","sig":"db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1"}',
  signature: 'db60516accfc025582bf556e3c7660c89e3982d2a656201aaea4189c6d3e3779b202c60302e55ad782ca711df20550384516abe4d7387470bc83ac757ed8f0f1'
}
```

### Convert RssItem to Spasm

Here is a post with an RSS item:

```typescript
const event: Post = {
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
```

Here is the result of `identifyEvent(event)`

```typescript
const output = {
  eventInfo: false,
  eventIsSealed: false,
  eventIsSealedUnderKeyName: false,
  webType: "web2"
}
```

Here is how the event looks like after converting to Spasm:

```typescript
const spasmEvent: SpasmEvent = {
  meta: {
    hasExtraSpasmFields: false,
    convertedFrom: "unknown",
  },
  spasmVersion: "1.0.0",
  id: "https://thedefiant.io/starknet-unveils-token-launch-plans",
  dbId: 7188,
  action: "post",
  title: "Starknet Unveils Token Launch Plans ",
  content: "Ethereum Layer 2 network Starknet has allocated 900M STRK tokens to an airdrop rewarding past and present users’ contributions....",
  source: "thedefiant.io",
  timestamp: 1702061789000,
  category: "defi",
  links: {
    http: "https://thedefiant.io/starknet-unveils-token-launch-plans",
    guid: "https://thedefiant.io/starknet-unveils-token-launch-plans"
  },
  reactions: {
    upvote: 3,
    downvote: null,
    bullish: 2,
    bearish: 0,
    important: null,
    scam: 1,
    comments_count: 3
  }
}
```

## License

MIT License
