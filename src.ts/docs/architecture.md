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



```
event.type
event.ids
      id.value
      id.format.name
      id.format.version
      id.hosts
         host.value
         host.marker
event.db.key
event.db.addedTimestamp
event.db.updatedTimestamp
event.db.table
event.root.ids
event.root.hosts
event.root.depth
event.root.event
event.parent.ids
event.parent.hosts
event.parent.depth
event.parent.event
event.action
event.title
event.content
event.source
event.timestamp
event.authors
      author.addresses
             address.value
             address.format.name
             address.format.version
      author.usernames
             username.value
             username.protocol
             username.proof
             username.provider
event.categories
      category.name
      category.sub.name
      category.sub.sub.name
event.tips
      tip.address
      tip.text
      tip.expiration.timestamp
      tip.currency.name
      tip.currency.ticker
      tip.network.name
      tip.network.id
event.hosts
      host.value
      host.marker
event.links
      link.value
      link.marker
event.keywords
event.tags
event.medias
      media.ids
      media.hashes
      media.links
      media.type
event.references
      reference.ids
      reference.hosts
      reference.depth
      reference.event
event.mentions
      mention.addresses
              address.value
              address.format.name
              address.format.version
      mention.usernames
              username.value
              username.protocol
              username.proof
              username.provider
event.proofs
      proof.value
      proof.links
      proof.protocol.name
      proof.protocol.version
event.previousEvent.ids
event.previousEvent.hosts
event.previousEvent.depth
event.previousEvent.event
event.sequence
event.license
event.language
event.extra
event.pows
      pow.nonce
      pow.difficulty
      pow.words
      pow.network.name
      pow.network.id

event.source.name
event.source.uiUrl
event.source.apiUrl
event.source.query
event.source.showSource
event.siblings
      sibling.type
      sibling.ids
      sibling.signedString
      sibling.signatures
      sibling.protocol.name
      sibling.protocol.version
      sibling.protocol.hasExtraSpasmFields
      sibling.protocol.extraSpasmFieldsVersion
      sibling.previousEvent
      sibling.sequence

event.stats
      stat.action
      stat.total
      stat.latestTimestamp
      stat.latestDbTimestamp
      stat.contents
           content.value
           content.total

event.sharedBy.ids
```


```
EventBodyForSpasmid01
- all standardized signed key-value pairs to calculate spasmid01
  - similar to SpasmEventBodyV2, but without type, protocol, pow

SpasmEventBodyV2
- all standardized signed key-value pairs

SpasmEventEnvelopeV2
- ids
- signatures
- siblings with signed strings and objects
- database info
- source
- stats
- sharedBy

SpasmEventEnvelopeWithTreeV2
- ...SpasmEventEnvelopeV2
- children, parent.event, root.event, reference.event

---

SpasmEventEnvelopeExpandedV2
- SpasmEnvelope
- extra meta data for each sibling
- extra data for all key-value pairs

SpasmEventDatabaseV2
- ...SpasmBodyV2
- ...SpasmEnvelopeV2 (without tree)

SpasmEventV2
- ...spasm body expanded
- ...spasm envelope expanded
- ...spasm tree expanded

SpasmEvent
SpasmEventBody
SpasmEventEnvelope
SpasmEventEnvelopeWithTree

SpasmEventTree
SpasmEventDatabase

SpasmEvent
  Body (+expansion)
  Envelope (+expansion)
  Tree (+expansion)

=== submit event ===
Client:
---
+ SpasmEventBody
  + Ethereum & Nostr addresses
! SpasmEventBody > SpasmEventEnvelope (sign)
---
+ NostrEvent
  + Ethereum address (tags)
  + SpasmId (tags) - optional for search in Nostr network
    > NostrEvent > EventBodyForSpasmid01
! NostrEvent > NostrEventSignedOpened (sign)
> NostrEventSignedOpened > SpasmEventEnvelope
---
= SpasmEventEnvelope[] (Dmp + Nostr) = SpasmEventEnvelope (merge)
> SpasmEventEnvelope > server
---
Server:
> SpasmEventEnvelope > SpasmEventDatabase (expand)
> SpasmEventDatabase > database (insert)
----------------
=== get feed ===
Server:
> database > SpasmEventDatabase[] (get)
> SpasmEventDatabase[] > SpasmEventEnvelope[] (compress)
> SpasmEventEnvelope[] > client
---
Client:
> SpasmEventEnvelope[] > SpasmEvent[]
> SpasmEvent[] > feed
----------------
=== get comments/parent/root ===
Server:
> database > SpasmEventEnvelopeWithTree (get)
> SpasmEventEnvelopeWithTree > client
---
Client:
> SpasmEventEnvelopeWithTree > comments/parent/root 
```
