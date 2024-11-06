import { sha256 } from "js-sha256-v0"
import {
  isNostrEvent,
  // isNostrEventSignedOpened,
  // isNostrSpasmEvent,
  // isNostrSpasmEventSignedOpened
} from "../identify/identifyEvent.js"
import {
  NostrEvent,
  NostrEventSignedOpened,
  NostrSpasmEvent,
  NostrSpasmEventSignedOpened,
  SpasmEventAddressV2,
  SpasmEventIdV2,
  // CustomConvertToSpasmConfig,
  // SpasmEventChildV2,
  // SpasmEventEnvelopeV2,
  // SpasmEventEnvelopeWithTreeChildV2,
  // SpasmEventEnvelopeWithTreeV2,
  SpasmEventV2,
  UnknownEventV2
} from "../types/interfaces.js"
import {toBeHex} from "../utils/nostrUtils.js"
import {
  getAllNostrSigners,
  isArrayOfStrings,
  // hasValue,
  isArrayWithValues,
  isHex,
  // isObjectWithValues,
  isStringOrNumber,
  toBeLongTimestamp,
  toBeShortTimestamp,
  toBeSpasmEventV2
} from "../utils/utils.js"

// TODO convertManyToNostr()

export const convertToNostr = (
  unknownEvent: UnknownEventV2,
  nostrSpasmVersion: "2.0.0" = "2.0.0"
):
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened |
  null => {
  // Already Nostr event
  if (isNostrEvent(unknownEvent)) {
    return unknownEvent as NostrEvent
  }

  const spasmEventV2: SpasmEventV2 | null =
    toBeSpasmEventV2(unknownEvent)
  if (!spasmEventV2) return null

  if (
    spasmEventV2.type === "SpasmEventV2" &&
    nostrSpasmVersion === "2.0.0"
  ) {
    const NostrSpasmEventV2 =
      convertSpasmEventV2ToNostrSpasmV2(spasmEventV2)
    return NostrSpasmEventV2
  }

  return null
}

export const convertSpasmEventV2ToNostrSpasmV2 = (
  spasmEventV2: SpasmEventV2
):
  NostrEvent |
  NostrEventSignedOpened |
  NostrSpasmEvent |
  NostrSpasmEventSignedOpened |
  null => {

  if (
    !("timestamp" in spasmEventV2) || !spasmEventV2.timestamp ||
    !isStringOrNumber(spasmEventV2.timestamp) ||
    !Number(spasmEventV2.timestamp)
  ) { return null }
  const timestampShort =
    toBeShortTimestamp(Number(spasmEventV2.timestamp))
  if (!timestampShort) return null

  // const nostrEvent: Partial<NostrEventSignedOpened> = {
  const nostrEvent: NostrEvent= {
    // Some Spasm events might have no content
    content: "",
    created_at: timestampShort,
    // Kind and other values might be changed below
    kind: 1,
    id: "",
    pubkey: "",
    tags: [
      // ["spasm_version","2.0.0"],
      // ["nostr_spasm_version", "2.0.0"]
    ]
  }

  // content
  if (
    "content" in spasmEventV2 && spasmEventV2.content &&
    typeof(spasmEventV2.content) === "string"
  ) { nostrEvent.content = spasmEventV2.content }

  // kind
  if (
    "action" in spasmEventV2 && spasmEventV2.action &&
    isStringOrNumber(spasmEventV2.action)
  ) {
    if (spasmEventV2.action === "post") {
      nostrEvent.kind = 1
      nostrEvent.tags?.push(["spasm_action", "post"])
    } else if (spasmEventV2.action === "reply") {
      nostrEvent.kind = 1
      nostrEvent.tags?.push(["spasm_action", "reply"])
    } else if (spasmEventV2.action === "react") {
      nostrEvent.kind = 1
      nostrEvent.tags?.push(["spasm_action", "react"])
    } else if (spasmEventV2.action === "moderate") {
      nostrEvent.kind = 1
      nostrEvent.tags?.push(["spasm_action", "moderate"])
    } else if (String(spasmEventV2.action)) {
      nostrEvent.tags
        ?.push(["spasm_action", String(spasmEventV2.action)])
    }
  }

  const nostrSigners = getAllNostrSigners(spasmEventV2)
  if (
    nostrSigners && isArrayOfStrings(nostrSigners) &&
    nostrSigners[0] && typeof(nostrSigners[0]) === "string" &&
    isHex(nostrSigners[0]) && nostrSigners[0].length === 64
  ) {
    nostrEvent.pubkey = nostrSigners[0]
  }

  // tags
  const timestampLong =
    toBeLongTimestamp(Number(spasmEventV2.timestamp))
  if (timestampLong && String(timestampLong)) {
    nostrEvent.tags?.push(
      ["spasm_timestamp", String(timestampLong)]
    )
  }

  if (
    "license" in spasmEventV2 && spasmEventV2.license &&
    typeof(spasmEventV2.license) === "string"
  ) { nostrEvent.tags?.push(["license", spasmEventV2.license]) }

  nostrEvent.tags?.push(
    ["spasm_version","2.0.0"],
    ["nostr_spasm_version", "2.0.0"]
  )

  if (
    "categories" in spasmEventV2 && spasmEventV2.categories &&
    isArrayWithValues(spasmEventV2.categories)
  ) {
    spasmEventV2.categories.forEach(cat => {
      const categoryTag: string[] = ["spasm_category"]
      if (
        "name" in cat && cat.name && String(cat.name)
      ) {
        // TODO make a proper recursive function for categories
        categoryTag.push(String(cat.name))
        if (
          "sub" in cat && cat.sub &&
          "name" in cat.sub && cat.sub.name &&
          String(cat.sub.name)
        ) {
          categoryTag.push(String(cat.sub.name))
          if (
            "sub" in cat.sub && cat.sub.sub &&
            "name" in cat.sub.sub && cat.sub.sub.name &&
            String(cat.sub.sub.name)
          ) {
            categoryTag.push(String(cat.sub.sub.name))
          }
        }
        nostrEvent.tags?.push(categoryTag)
      }
    })
  }

  if (
    "keywords" in spasmEventV2 && spasmEventV2.keywords &&
    isArrayOfStrings(spasmEventV2.keywords)
  ) {
    spasmEventV2.keywords.forEach(keyword => {
      if (String(keyword)) {
        nostrEvent.tags?.push(["t", String(keyword)])
      }
    })
  }

  if (
    "title" in spasmEventV2 && spasmEventV2.title &&
    typeof(spasmEventV2.title) === "string"
  ) { nostrEvent.tags?.push(["title", spasmEventV2.title]) }

  if ("parent" in spasmEventV2 && spasmEventV2.parent) {
    if (
      spasmEventV2.parent.ids &&
      isArrayWithValues(spasmEventV2.parent.ids)
    ) {
      assembleAndPushIdTagMapped(
        spasmEventV2.parent.ids,
        nostrEvent.tags,
        "parent.ids",
        "0" // Spasm event can only have one parent event
      )
    }
  }

  if ("references" in spasmEventV2 && spasmEventV2.references) {
    spasmEventV2.references.forEach((ref, eventIndex) => {
      if (
        ref.ids && isArrayWithValues(ref.ids) &&
        String(eventIndex)
      ) {
        assembleAndPushIdTagMapped(
          ref.ids,
          nostrEvent.tags,
          "references.ids",
          String(eventIndex)
        )
      }
    })
  }

  if ("mentions" in spasmEventV2 && spasmEventV2.mentions) {
    spasmEventV2.mentions.forEach((mention, mentionIndex) => {
      if (
        mention.addresses &&
        isArrayWithValues(mention.addresses) &&
        String(mentionIndex)
      ) {
        assembleAndPushAddressesTagMapped(
          mention.addresses,
          nostrEvent.tags,
          "mentions.addresses",
          String(mentionIndex)
        )
      }
    })
  }

  if ("authors" in spasmEventV2 && spasmEventV2.authors) {
    spasmEventV2.authors.forEach((author, authorIndex) => {
      if (
        author.addresses &&
        isArrayWithValues(author.addresses) &&
        String(authorIndex)
      ) {
        assembleAndPushAddressesTagMapped(
          author.addresses,
          nostrEvent.tags,
          "authors.addresses",
          String(authorIndex)
        )
      }
    })
  }

  // TODO
  // if (isNostrEvent(nostrEvent)) {
  //   return nostrEvent
  // } else { return null }

  return nostrEvent
}

const assembleAndPushIdTagMapped = (
  ids: SpasmEventIdV2[],
  tags: string[][],
  flag: string = "parent.ids",
  eventIndex: string = "0"
): void => {
  if (!ids || !isArrayWithValues(ids)) { return }
  if (!tags || !Array.isArray(tags)) { return }
  if (!flag) { return }
  if (!String(eventIndex)) { return }

  ids.forEach((id, idIndex) => {
    if (id.value && typeof(id.value) === "string") {
      let value = id.value // original value
      let hosts: string[] = []
      let hostsAsOneString: string = ""
      let relay: string = ""
      let pubkey: string = ""
      let path: string = "parent.ids"
      let action: string = "reply"

      // Event index for parent is always 0 because there
      // can only be one parent event in Spasm event,
      // other events are listed as references.
      // let eventIndex: string = "0"
      let formatName: string = ""
      let formatVersion: string = ""
      let marker: string = ""

      if (flag === "references.ids") {
        path = flag
        action = "mention"
      }

      if (id.format && (
        id.format.name === "nostr-hex" ||
        id.format.name === "nostr-note" ||
        id.format.name === "nostr-nevent"
      )) { value = toBeHex(id.value) }

      if (
        id.pubkey && String(id.pubkey)
      ) {
        pubkey = String(id.pubkey)
        if (
          pubkey.length === 63 && pubkey.startsWith("npub")
        ) { pubkey = toBeHex(pubkey) }
      }

      const { newValue, method, original } =
        convertValueToNostrTagsMapping(value)

      const {
        newValue: newPubkey,
        method: pubkeyMethod,
        original: pubkeyOriginal
      } = convertValueToNostrTagsMapping(pubkey)

      if (id.hosts && isArrayWithValues(id.hosts)) {
        id.hosts.forEach(host => {
          if (
            host.value && typeof(host.value) === "string"
          ) { hosts.push(host.value) }
        })
      }

      if (hosts[0] && typeof(hosts[0]) === "string") {
        relay = hosts[0]
      }

      if (id.marker && String(id.marker)) {
        marker = String(id.marker)
      }

      if (
        id.format && id.format.name &&
        String(id.format.name)
      ) { formatName = String(id.format.name) }

      if (
        id.format && id.format.version &&
        String(id.format.version)
      ) { formatVersion = String(id.format.version) }

      if (isArrayOfStrings(hosts)) {
        hosts.forEach(host => {
          const str = String(host)
          if (str) {
            if (hostsAsOneString.length > 0) {
              hostsAsOneString += ","
              hostsAsOneString += str.trim()
            } else {
              hostsAsOneString = str.trim()
            }
          }
        })
      }

      const finalTag =
        [ "e", newValue, relay, action, newPubkey ]

      // Mapping (extra details about the tag)
      const finalTagMapped = [
        "tags_mapping", // tag name
        "spasm_id_1", // mapping algorithm
        "e", // tag name to map
        newValue, // tag value to map
        "se2", // target event type
        path, // key (path) in SpasmEvent
        String(eventIndex), // event index
        String(idIndex), // id index
        method, // method
        original, // original value
        formatName, // format name
        formatVersion, // format version
        marker, // Spasm marker
        hostsAsOneString, // Spasm hosts
        pubkeyMethod, // pubkey method
        pubkeyOriginal // pubkey original value
      ]

      tags.push(finalTag, finalTagMapped)
    }
  })
}

const assembleAndPushAddressesTagMapped = (
  addresses: SpasmEventAddressV2[],
  tags: string[][],
  flag: string = "mentions.addresses",
  eventIndex: string = "0"
): void => {
  if (!addresses || !isArrayWithValues(addresses)) { return }
  if (!tags || !Array.isArray(tags)) { return }
  if (!flag) { return }
  if (!String(eventIndex)) { return }

  addresses.forEach((address, addressIndex) => {
    if (address.value && typeof(address.value) === "string") {
      let tagName = "p"
      let mapping_algorithm = "spasm_add_1"
      let value = address.value // original value
      let hosts: string[] = []
      let hostsAsOneString: string = ""
      let relay: string = ""
      let path: string = "mentions.addresses"

      // Event index for parent is always 0 because there
      // can only be one parent event in Spasm event,
      // other events are listed as references.
      // let eventIndex: string = "0"
      let formatName: string = ""
      let formatVersion: string = ""
      let marker: string = ""

      if (flag === "mentions.addresses") {
        path = flag
        tagName = "p"
        mapping_algorithm = "spasm_add_1"
      }

      if (flag === "authors.addresses") {
        path = flag
        tagName = "O"
        mapping_algorithm = "spasm_aadd_1"
      }

      if (address.format && (
        address.format.name === "nostr-hex" ||
        address.format.name === "nostr-npub"
      )) { value = toBeHex(address.value) }

      const { newValue, method, original } =
        convertValueToNostrTagsMapping(value, mapping_algorithm)

      if (address.hosts && isArrayWithValues(address.hosts)) {
        address.hosts.forEach(host => {
          if (
            host.value && typeof(host.value) === "string"
          ) { hosts.push(host.value) }
        })
      }

      if (hosts[0] && typeof(hosts[0]) === "string") {
        relay = hosts[0]
      }

      if (address.marker && String(address.marker)) {
        marker = String(address.marker)
      }

      if (
        address.format && address.format.name &&
        String(address.format.name)
      ) { formatName = String(address.format.name) }

      if (
        address.format && address.format.version &&
        String(address.format.version)
      ) { formatVersion = String(address.format.version) }

      if (isArrayOfStrings(hosts)) {
        hosts.forEach(host => {
          const str = String(host)
          if (str) {
            if (hostsAsOneString.length > 0) {
              hostsAsOneString += ","
              hostsAsOneString += str.trim()
            } else {
              hostsAsOneString = str.trim()
            }
          }
        })
      }

      let finalTag: string[] = []
      if (tagName === "p") {
        finalTag = [ "p", newValue, relay ]
      } else if (tagName === "O") {
        finalTag = [ "O", newValue, mapping_algorithm ]
      }

      // Mapping (extra details about the tag)
      const finalTagMapped = [
        "tags_mapping", // tag name
        // "spasm_add_1", // mapping algorithm
        mapping_algorithm, // mapping algorithm
        tagName, // tag name to map
        newValue, // tag value to map
        "se2", // target event type
        path, // key (path) in SpasmEvent
        String(eventIndex), // event index
        String(addressIndex), // address index
        method, // method
        original, // original value
        formatName, // format name
        formatVersion, // format version
        marker, // Spasm marker
        hostsAsOneString, // Spasm hosts
      ]

      tags.push(finalTag, finalTagMapped)
    }
  })
}

const convertValueToNostrTagsMapping = (
  value: string,
  algorithm?: string
): {
  newValue: string,
  method: string,
  original: string
} => {
  let newValue = ""
  let method = ""
  let original = ""
  if (!value) return {newValue, method, original}
  const str = String(value)
  if (!str) return {newValue, method, original}
  if (typeof(str) !== "string") {
    return {newValue, method, original}
  }

  // spasm_author
  if (algorithm === "spasm_aadd_1") {
    method = "slice.13"
    newValue = "spasm_author:" + str
    original = ""

  // Nostr hex
  } else if (
  str.length === 64 && isHex(str)) {
    method = "full"
    newValue = str
    original = ""

  // Ethereum pubkey
  } else if (
    str.length === 42 && str.startsWith("0x") &&
    isHex(str.slice(2))
  ) {
    method = "hex_to_eth_pub_1"
    newValue = str.slice(2) + "657468657265756d2d707562"
    original = ""

  // spasmid01
  } else if (
    str.length === 73 && str.startsWith("spasmid01") &&
    isHex(str.slice(9))
  ) {
    method = "hex_to_spasmid01_1"
    newValue = str.slice(9)
    original = ""

  // Nostr signature 
  } else if (
    str.length === 128 && isHex(str)
  ) {
    method = "slice064"
    newValue = str.slice(0,64)
    original = str

  // Ethereum signature 
  } else if (
    str.length === 132 && str.startsWith("0x") &&
    isHex(str.slice(2))
  ) {
    method = "slice266"
    newValue = str.slice(2,66)
    original = str

  } else {
    const hashed = sha256(str)
    if (
      hashed && hashed.length === 64 &&
      typeof(hashed) === "string"
    ) {
      method = "sha256"
      newValue = sha256(str)
      original = str
    }
  }

  return {newValue, method, original}
}





