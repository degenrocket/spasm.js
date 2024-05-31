Signer and Protocol Agnostic Social Media (SPASM)
=================================================

## Overview

The future of social media is agnostic to signing keys, messaging formats, transport protocols and storage infrastructure. However, such design places significant burden on developers, who must maintain a myriad of protocols, formats, and architectures.

This library simplifies the process by encapsulating the complexities of various messaging formats into a single, standardized JSON object. By abstracting the underlying differences between these formats, it provides a unified interface for developers to work with, ensuring consistency and reducing the need for custom handling of each format.

For instance, instead of maintaining three distinct versions of the frontend (UI) and three separate database tables for three different messaging formats, developers can leverage this library to standardize all messages into a single format. This approach simplifies the architecture by consolidating the database tables into one and requiring only a single version of the UI, with minor adjustments as needed.

TypeScript interfaces of JSON objects of messaging formats that can be standardized with this library can be found at `./src.ts/types/interfaces.ts`.

```typescript
export type UnknownEventV2 =
  DmpEvent |
  DmpEventSignedClosed |
  DmpEventSignedOpened |
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened |
  SpasmEventV0 |
  SpasmEventV2 |
  SpasmEventBodyV2 |
  SpasmEventEnvelopeV2 |
  SpasmEventEnvelopeWithTreeV2 |
  SpasmEventDatabaseV2
```

After converting an unknown event to the Spasm event, you can now easily access common properties across most public messaging formats such as:
- `spasmEvent.action`
- `spasmEvent.content`
- `spasmEvent.timestamp`
- `spasmEvent.parent.ids`
- `spasmEvent.parent.ids[0].value`
- `spasmEvent.ids`
- `spasmEvent.ids[0].value`
- `spasmEvent.ids[0].format.name`
- `spasmEvent.authors`
- `spasmEvent.authors[0].addresses[0].value`
- `spasmEvent.authors[0].addresses[0].format.name`
- `spasmEvent.signatures`
- `spasmEvent.signatures[0].value`
- `spasmEvent.signatures[0].pubkey`
- `spasmEvent.signatures[0].format.name`

The Spasm event can be signed with different protocols (e.g., Spasm, Dmp, Nostr), so the original signed events are stored at:
- `spasmEvent.siblings`

See the full list of properties of `SpasmEventV2` at `./src.ts/types/interfaces.ts`.

Here is a schema of the SpasmEventV2 interface:

```
#01  = EventStructureForSpasmid01
SE   = SpasmEvent
Body = SpasmEventBody
Env  = SpasmEventEnvelope
Tree = SpasmEventEnvelopeWithTree
DB   = SpasmEventDatabase

event*
│
├── type                             --- SE Body Env Tree DB
├── protocol             (+ sibling) --- -- Body --- ---- --
│   ├── name                         --- -- Body --- ---- --
│   └── version                      --- -- Body --- ---- --
├── root                             --- SE ---- --- Tree DB
│   ├── ids[]                        --- SE ---- --- Tree DB
│   ├── marker                       --- SE ---- --- Tree DB  
│   ├── depth                        --- SE ---- --- Tree --
│   └── event*                       --- SE ---- --- Tree --
├── parent                           #01 SE Body --- Tree DB
│   ├── ids[]                        #01 SE Body --- Tree DB
│   ├── marker                       #01 SE Body --- Tree DB
│   ├── depth                        --- SE ---- --- Tree --
│   └── event*                       --- SE ---- --- Tree --
├── action                           #01 SE Body --- ---- DB
├── title                            #01 SE Body --- ---- DB
├── content                          #01 SE Body --- ---- DB
├── timestamp                        #01 SE Body --- ---- DB
├── authors[]                        #01 SE Body --- ---- DB
│   ├── addresses[]                  #01 SE Body --- ---- DB
│   │   ├── value                    #01 SE Body --- ---- DB
│   │   ├── format                   #01 SE Body --- ---- DB
│   │   │   ├── name                 #01 SE Body --- ---- DB
│   │   │   └── version              #01 SE Body --- ---- DB
│   │   └── verified                 --- SE ---- --- ---- DB
│   └── usernames[] (eg RSS posts)   #01 SE Body --- ---- DB
│       ├── value                    #01 SE Body --- ---- DB
│       ├── protocol                 #01 SE Body --- ---- DB
│       ├── proof                    #01 SE Body --- ---- DB
│       └── provider                 #01 SE Body --- ---- DB
├── categories[]                     #01 SE Body --- ---- DB
│   ├── name                         #01 SE Body --- ---- DB
│   └── sub (recursive category)     #01 SE Body --- ---- DB
├── tips[]                           #01 SE Body --- ---- DB
│   ├── address                      #01 SE Body --- ---- DB
│   ├── text                         #01 SE Body --- ---- DB
│   ├── expiration                   #01 SE Body --- ---- DB
│   │   └── timestamp                #01 SE Body --- ---- DB
│   ├── currency                     #01 SE Body --- ---- DB
│   │   ├── name                     #01 SE Body --- ---- DB
│   │   └── ticker                   #01 SE Body --- ---- DB
│   └── network                      #01 SE Body --- ---- DB
│       ├── name                     #01 SE Body --- ---- DB
│       └── id                       #01 SE Body --- ---- DB
├── hosts[] (see hosts below)        #01 SE Body --- ---- DB
├── links[] (see link below)         #01 SE Body --- ---- DB
├── keywords[]                       #01 SE Body --- ---- DB
├── tags[]                           #01 SE Body --- ---- DB
├── medias[]                         #01 SE Body --- ---- DB
│   ├── hashes[] (see hash below)    #01 SE Body --- ---- DB
│   ├── links[] (see link below)     #01 SE Body --- ---- DB
│   └── type                         #01 SE Body --- ---- DB
├── references[]                     #01 SE Body --- Tree DB
│   ├── ids[]                        #01 SE Body --- Tree DB
│   ├── marker                       #01 SE Body --- Tree DB
│   └── event*                       --- SE ---- --- Tree --
├── mentions[]                       #01 SE Body --- ---- DB
│   ├── addresses[]                  #01 SE Body --- ---- DB
│   │   ├── value                    #01 SE Body --- ---- DB
│   │   └── format                   #01 SE Body --- ---- DB
│   │       ├── name                 #01 SE Body --- ---- DB
│   │       └── version              #01 SE Body --- ---- DB
│   └── usernames[]                  #01 SE Body --- ---- DB
│       ├── value                    #01 SE Body --- ---- DB
│       ├── protocol                 #01 SE Body --- ---- DB
│       ├── proof                    #01 SE Body --- ---- DB
│       └── provider                 #01 SE Body --- ---- DB
├── proofs[]                         #01 SE Body --- ---- DB
│   ├── value                        #01 SE Body --- ---- DB
│   ├── links[]                      #01 SE Body --- ---- DB
│   └── protocol                     #01 SE Body --- ---- DB
│       ├── name                     #01 SE Body --- ---- DB
│       └── version                  #01 SE Body --- ---- DB
├── previousEvent        (+ sibling) --- -- Body --- ---- --
│   ├── ids[]                        --- -- Body --- ---- --
│   ├── marker                       --- -- Body --- ---- --
│   ├── depth                        --- -- Body --- ---- --
│   └── event*                       --- -- ---- --- ---- --
├── sequence             (+ sibling) --- -- Body --- ---- --
├── license                          #01 SE Body --- ---- DB
├── language                         #01 SE Body --- ---- DB
├── extra                            #01 SE Body --- ---- DB
├── pow                              --- SE Body --- ---- DB
│   ├── nonce                        --- SE Body --- ---- DB
│   ├── difficulty                   --- SE Body --- ---- DB
│   ├── words[]                      --- SE Body --- ---- DB
│   └── network                      --- SE Body --- ---- DB
│       ├── name                     --- SE Body --- ---- DB
│       └── id                       --- SE Body --- ---- DB
│
├── ids[]                            --- SE ---- Env Tree DB
├── signatures[]                     --- SE ---- Env Tree DB
│   ├── value                        --- SE ---- Env Tree DB
│   ├── pubkey                       --- SE ---- Env Tree DB
│   └── format                       --- SE ---- Env Tree DB
│       ├── name                     --- SE ---- Env Tree DB
│       └── version                  --- SE ---- Env Tree DB
│
├── siblings[]                       --- SE ---- Env Tree DB
│   ├── type                         --- SE ---- Env Tree DB
│   ├── signedString                 --- SE ---- Env Tree DB
│   ├── originalObject               --- SE ---- Env Tree DB
│   ├── signatures[]                 --- SE ---- Env Tree DB
│   │   ├── value                    --- SE ---- Env Tree DB
│   │   ├── pubkey                   --- SE ---- Env Tree DB
│   │   └── format                   --- SE ---- Env Tree DB
│   │       ├── name                 --- SE ---- Env Tree DB
│   │       └── version              --- SE ---- Env Tree DB
│   ├── sequence                     --- SE ---- Env Tree DB
│   ├── previousEvent                --- SE ---- Env Tree DB
│   │   ├── ids[]                    --- SE ---- Env Tree DB
│   │   ├── marker                   --- SE ---- Env Tree DB
│   │   ├── depth                    --- SE ---- Env Tree DB
│   │   └── event*                   --- SE ---- --- Tree DB
│   └── protocol                     --- SE ---- Env Tree DB
│       ├── name                     --- SE ---- Env Tree DB
│       ├── version                  --- SE ---- Env Tree DB
│       ├── hasExtraSpasmFields      --- SE ---- Env Tree DB
│       └── extraSpasmFieldsVersion  --- SE ---- Env Tree DB
│
├── db                               --- SE ---- Env Tree DB
│   ├── key                          --- SE ---- Env Tree DB
│   ├── addedTimestamp               --- SE ---- Env Tree DB
│   ├── updatedTimestamp             --- SE ---- Env Tree DB
│   └── table                        --- SE ---- Env Tree DB
├── source                           --- SE ---- Env Tree DB
│   ├── name                         --- SE ---- Env Tree DB
│   ├── uiUrl                        --- SE ---- Env Tree DB
│   ├── apiUrl                       --- SE ---- Env Tree DB
│   ├── query                        --- SE ---- Env Tree DB
│   └── showSource                   --- SE ---- Env Tree DB
├── stats[]                          --- SE ---- Env Tree DB
│   ├── action                       --- SE ---- Env Tree DB
│   ├── total                        --- SE ---- Env Tree DB
│   ├── latestTimestamp              --- SE ---- Env Tree DB
│   ├── latestDbTimestamp            --- SE ---- Env Tree DB
│   └── ...(upvote, downvote, etc.)  --- SE ---- Env Tree DB
├── sharedBy[]                       --- SE ---- Env Tree DB
│   └── ids[]                        --- SE ---- Env Tree DB
│
│   (Envelope with tree)
├── root                             --- SE ---- Env Tree --
│   └── event                        --- SE ---- Env Tree --
├── parent                           --- SE ---- Env Tree --
│   └── event                        --- SE ---- Env Tree --
├── references[]                     --- SE ---- Env Tree --
│   └── event                        --- SE ---- Env Tree --
└── children[]                       --- SE ---- Env Tree --
    └── SE | Env | Tree              --- SE ---- Env Tree --

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

Here is how the event looks like after converting to Spasm V2:

```typescript
const spasmEvent: SpasmEventV2 = {
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

Here is how the event looks like after converting to Spasm V2:

```typescript
const spasmEvent: SpasmEventV2 = {
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
}
```

### Convert RssItem to Spasm

Here is a Spasm event v0 with an RSS item:

```typescript
const event: SpasmEventV0 = {
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

Here is how the event looks like after converting to Spasm V2:

```typescript
const spasmEvent: SpasmEvent = {
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
      usernames: [ { value: "stablepony" } ]
    }
  ],
  categories: [ { name: "defi" } ],
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
  keywords: [ "dark", "forest", "cookies" ],
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
}
```

## License

MIT License
