See the full list of properties of `SpasmEvent` at `./src.ts/types/interfaces.ts`.

Here is a schema of the SpasmEventV2 interface:

```
#01  = EventForSpasmid01
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
├── root                             --- SE ---- --- Tree --
│   ├── ids[]                        --- SE ---- --- Tree --
│   ├── marker                       --- SE ---- --- Tree --  
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
│   │   ├── hosts[]                  --- SE Body --- ---- DB
│   │   └── verified                 --- SE ---- --- ---- DB
│   ├── usernames[] (eg RSS posts)   #01 SE Body --- ---- DB
│   │   ├── value                    #01 SE Body --- ---- DB
│   │   ├── protocol                 #01 SE Body --- ---- DB
│   │   ├── proof                    #01 SE Body --- ---- DB
│   │   └── provider                 #01 SE Body --- ---- DB
│   └── marker                       #01 SE Body --- ---- DB
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
│   │   ├── format                   #01 SE Body --- ---- DB
│   │   │   ├── name                 #01 SE Body --- ---- DB
│   │   │   └── version              #01 SE Body --- ---- DB
│   │   └── hosts[]                  --- SE Body --- ---- DB
│   ├── usernames[]                  #01 SE Body --- ---- DB
│   │   ├── value                    #01 SE Body --- ---- DB
│   │   ├── protocol                 #01 SE Body --- ---- DB
│   │   ├── proof                    #01 SE Body --- ---- DB
│   │   └── provider                 #01 SE Body --- ---- DB
│   └── marker                       #01 SE Body --- ---- DB
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
├── pows            (only 1 in body) --- SE Body --- ---- DB
│   ├── marker                       --- SE Body --- ---- DB
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
├── db*                              --- SE ---- Env Tree DB
│   ├── key*                         --- SE ---- Env Tree DB
│   ├── addedTimestamp*              --- SE ---- Env Tree DB
│   ├── updatedTimestamp*            --- SE ---- Env Tree DB
│   └── table*                       --- SE ---- Env Tree DB
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
  - similar to SpasmEventBodyV2, but without type, protocol, pows

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
- children[n].event, parent.event, root.event, references[n].event

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
