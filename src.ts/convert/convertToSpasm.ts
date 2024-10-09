import {
  KnownPostOrEventInfo,
  DmpEvent,
  DmpEventSignedClosed,
  DmpEventSignedOpened,
  NostrEvent,
  NostrEventSignedOpened,
  NostrSpasmEvent,
  NostrSpasmEventSignedOpened,
  UnknownEventV1,
  // V2
  UnknownEventV2,
  SpasmEventV2,
  // TODO
  // SpasmEventBodyV2,
  // SpasmEventEnvelopeV2,
  // SpasmEventEnvelopeWithTreeV2,
  // SpasmEventDatabaseV2,
  SpasmEventSiblingV2,
  SiblingDmpSignedV2,
  // SiblingNostrV2,
  SiblingNostrSignedV2,
  SpasmEventReferenceV2,
  SpasmEventLicenseV2,
  SpasmEventActionV2,
  DmpVersion,
  SiblingNostrSpasmV2,
  NostrSpasmVersion,
  SpasmEventIdV2,
  SiblingNostrSpasmSignedV2,
  SpasmEventV0,
  SpasmEventReactionNameV2,
  SiblingNostrV2,
  SiblingWeb2V2,
  SpasmEventMentionV2,
  ConvertToSpasmConfig,
  CustomConvertToSpasmConfig,
  SpasmEventEnvelopeV2,
  SpasmEventAnyV2,
  SpasmEventBodyV2,
  SpasmEventBodySignedClosedV2,
  SpasmEventEnvelopeWithTreeV2,
  SpasmEventDatabaseV2,
  SanitizationConfig,
  CustomSanitizationConfig,
  SpasmEventChildV2,
} from "./../types/interfaces.js";
import {
  // toBeNpub,
  // toBeNote,
  toBeHex
} from "./../utils/nostrUtils.js";
import {
  isObjectWithValues, extractVersion,
  toBeTimestamp, extractSealedEvent, getNostrSpasmVersion,
  createLinkObjectFromUrl, hasValue,
  getFormatFromId, getFormatFromAddress, getFormatFromSignature,
  markSpasmEventAddressAsVerified,
  verifyEthereumSignature,
  sanitizeEvent,
  mergeConfigs,
  extractSignerFromEthereumSignature,
  extractIdByFormat,
  mergeSanitizationConfigs,
  mergeSpasmEventsV2
} from "./../utils/utils.js";
import {
  identifyPostOrEvent,
  isDmpEvent,
  isDmpEventSignedClosed,
  isDmpEventSignedOpened,
  isNostrEvent,
  isNostrEventSignedOpened,
  isNostrSpasmEvent,
  isNostrSpasmEventSignedOpened
} from "./../identify/identifyEvent.js"
import { getSpasmId } from "./getSpasmId.js"
import {
  convertToSpasmEventEnvelopeWithTree
} from "./../convert/convertToSpasmEventEnvelopeWithTree.js"
import { verifyEvent as verifyNostrEvent } from 'nostr-tools-v2'

// const latestSpasmVersion = "2.0.0"

export const convertManyToSpasm = (
  unknownEvents: UnknownEventV2[],
  customConfig?: CustomConvertToSpasmConfig
): SpasmEventV2[] | null => {
  try {
    if (!unknownEvents) return null
    if (!Array.isArray(unknownEvents)) return null
    if (!hasValue(unknownEvents)) return null
    const convertedEvents: SpasmEventV2[] = []
    unknownEvents.forEach(event => {
      const convertedEvent = convertToSpasm(event, customConfig)
      if (convertedEvent) {convertedEvents.push(convertedEvent)}
    })
    if (!hasValue(convertedEvents)) return null
    return convertedEvents
  } catch (err) {
    console.error(err);
    return null
  }
}

// Spasm V2
export const convertToSpasm = (
  unknownEvent: UnknownEventV2,
  customConfig?: CustomConvertToSpasmConfig
): SpasmEventV2 | null => {
  try {
    const defaultConfig = new ConvertToSpasmConfig()
    const config: ConvertToSpasmConfig = mergeConfigs(
      defaultConfig, customConfig || {}
    )

    // First sanitization
    if (config?.xss?.enableSanitization) {
      if (
        ifEventContainsMaliciousCode(
          unknownEvent,
          config.xss.sanitizationConfig
        )
      ) { return null }
    }

    if (config?.to?.spasm?.version === "2.0.0") {
      const standardizedEventV2 = 
        standardizeEventV2(unknownEvent, config.to.spasm.version)

      if (standardizedEventV2) {
        const spasmEventV2: SpasmEventV2 | null =
          assignSpasmId(
            standardizedEventV2, config.to.spasm.id.versions
        )
        
      // An extra sanitization because some strings were parsed
      if (config?.xss?.enableSanitization) {
        if (
          ifEventContainsMaliciousCode(
            unknownEvent,
            config.xss.sanitizationConfig
          )
        ) { return null }
      }

        return spasmEventV2
      }
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const ifEventContainsMaliciousCode = (
  unknownEvent: UnknownEventV2,
  customConfig?: CustomSanitizationConfig
): Boolean => {
  try {
    const defaultConfig = new SanitizationConfig()
    const config: SanitizationConfig = mergeSanitizationConfigs(
      defaultConfig, customConfig || {}
    )

    // Sanitize event
    const sanitizedEvent =
      JSON.parse(JSON.stringify(unknownEvent))
    sanitizeEvent(sanitizedEvent, config)
    // Allow some special characters on the backend (database),
    // because all strings should be sanitized on the frontend
    // before displaying to users.
    const jsonStringOriginal = JSON.stringify(unknownEvent)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      // Below is a special character, not a simple empty space
      .replace(/&nbsp;/g, ' ')
    const jsonStringSanitized = JSON.stringify(sanitizedEvent)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      // Below is a special character, not a simple empty space
      .replace(/&nbsp;/g, ' ')
    if (jsonStringOriginal !== jsonStringSanitized) {
      // An event contains potentially malicious code
      return true
    }
    // Event is safe to use
    return false
  } catch (error) {
    console.error(error)
    // If we're not sure whether an event contains malicious
    // code, it's better to return true for security reasons.
    return true
  }
}

export const assignSpasmId = (
  spasmEventV2: SpasmEventV2,
  spasmIdVersions = ["01"]
): SpasmEventV2 | null => {

  if (!isObjectWithValues(spasmEventV2)) return null

  spasmIdVersions.forEach(spasmIdVersion => {
    const spasmId = getSpasmId(spasmEventV2, spasmIdVersion)
    const alreadyId = extractIdByFormat(
      spasmEventV2, 
      { name: "spasmid", version: "01" }
    )

    if (
      spasmId && typeof(spasmId) === "string" &&
      spasmId !== alreadyId
    ) {
      // Create ids if it's null or undefined
      spasmEventV2.ids ??= [];
      // Prepend the new Spasm ID to an array of other IDs
      spasmEventV2.ids.unshift(
        {
          value: spasmId,
          format: {
            name: "spasmid",
            version: spasmIdVersion
          } 
        }
      )
    }
  })

  return spasmEventV2
}


export const standardizeEventV2 = (
  unknownEvent: UnknownEventV2,
  version = "2.0.0",
  info: KnownPostOrEventInfo | null = null
): SpasmEventV2 | null => {
  if (!isObjectWithValues(unknownEvent)) return null

  // SpasmEventV2, SpasmBodyV2, SpasmEnvelopeV2,
  // SpasmEnvelopeWithTreeV2, SpasmEventDatabaseV2
  if (
    'type' in unknownEvent &&
    typeof(unknownEvent.type) === "string"
  ) {
    if (
      unknownEvent.type === "SpasmEventV2" ||
      unknownEvent.type === "SpasmEventBodyV2" ||
      unknownEvent.type === "SpasmEventEnvelopeV2" ||
      unknownEvent.type === "SpasmEventEnvelopeWithTreeV2" ||
      unknownEvent.type === "SpasmEventDatabaseV2"
    ) {
      return standardizeSpasmEventAnyV2(unknownEvent, version)
    }
  }

  // Non-Spasm events
  return standardizeNonSpasmEventV2(
    unknownEvent as UnknownEventV1, version, info
  )
}

export const standardizeSpasmEventAnyV2 = (
  event: SpasmEventAnyV2,
  version = "2.0.0"
): SpasmEventV2 | null => {
  if (!isObjectWithValues(event)) return null

  if (
    !("type" in event) ||
    !event.type
  ) { return null }

  let standardizedEvent: SpasmEventV2 | null  = {
    type: "SpasmEventV2"
  } as SpasmEventV2;

  if (
    'type' in event &&
    typeof(event.type) === "string"
  ) {
    if (event.type === "SpasmEventV2") {
      standardizedEvent =
        standardizeSpasmEventV2(event, version)
      return standardizedEvent
    } else if (event.type === "SpasmEventBodyV2") {
      // TODO
      // standardizedEvent =
      //   standardizeSpasmEventBodyV2(
      //   event
      // )
    } else if (
      event.type === "SpasmEventBodySignedClosedV2"
    ) {
      // TODO
      // standardizedEvent =
      //   standardizeSpasmEventBodySignedClosedV2(
      //   event
      // )
    } else if (
      event.type === "SpasmEventEnvelopeV2"
    ) {
      standardizedEvent =
        standardizeSpasmEventEnvelopeV2(event, version)
      return standardizedEvent
    } else if (
      event.type === "SpasmEventEnvelopeWithTreeV2"
    ) {
      standardizedEvent =
        standardizeSpasmEventEnvelopeWithTreeV2(event, version)
      return standardizedEvent
    } else if (
      event.type === "SpasmEventDatabaseV2"
    ) {
      standardizedEvent =
        standardizeSpasmEventDatabaseV2(event, version)
      return standardizedEvent
    }
  }

  return null
}

export const standardizeNonSpasmEventV2 = (
  unknownEvent: UnknownEventV1,
  version = "2.0.0",
  info: KnownPostOrEventInfo | null = null
): SpasmEventV2 | null => {
  if (!isObjectWithValues(unknownEvent)) return null

  // If unknown event is not any of V2,
  // then proceed with SpasmEventV0 (Post)
  // and UnknownEventV1 like DpmEvent, NostrSpasmEvent, etc.
  unknownEvent = unknownEvent as UnknownEventV1 | SpasmEventV0
  // Info about post/event might be provided.
  // If not, then we should identify an event.
  if (!info) {
    info = identifyPostOrEvent(unknownEvent)
  }

  if (!info || !info.webType) return null

  let standardizedEvent: SpasmEventV2 | null  = {
    type: "SpasmEventV2"
  } as SpasmEventV2;

  // DmpEvent
  // DMP event without signature
  if (
    info.eventInfo &&
    info.eventInfo.type === "DmpEvent" &&
    info.eventIsSealed === false
  ) {
    if (version === "2.0.0") {
      standardizedEvent = standardizeDmpEventV2(
        unknownEvent as DmpEvent
      )
    }
  }

  // DmpEventSignedClosed
  // DMP event with signature
  if (
    info.eventInfo &&
    info.eventInfo.type === "DmpEventSignedClosed" &&
    info.eventIsSealed === false
  ) {
    if (version === "2.0.0") {
      standardizedEvent = standardizeDmpEventSignedClosedV2(
        unknownEvent as DmpEventSignedClosed
      )
    }
  }

  // DmpEventSignedOpened
  // DMP event with signature after the signed string
  // is parsed and saved as a signed object
  if (
    info.eventInfo &&
    info.eventInfo.type === "DmpEventSignedOpened" &&
    info.eventIsSealed === false
  ) {
    standardizedEvent = standardizeDmpEventSignedOpenedV2(
      unknownEvent as DmpEventSignedOpened
    )
  }

  // NostrEvent
  // Nostr event without signature
  if (
    info.eventInfo &&
    info.eventInfo.type === "NostrEvent" &&
    info.eventIsSealed === false
  ) {
    standardizedEvent = standardizeNostrEventV2(
      unknownEvent as NostrEvent
    )
  }

  // NostrSpasmEvent
  // Nostr event without signature, with extra Spasm fields
  if (
    info.eventInfo &&
    info.eventInfo.type === "NostrSpasmEvent" &&
    info.eventIsSealed === false
  ) {
    standardizedEvent = standardizeNostrSpasmEventV2(
      unknownEvent as NostrSpasmEvent
    )
  }

  // NostrEventSignedOpened
  // Nostr event with signature, without extra Spasm fields
  if (
    info.eventInfo &&
    info.eventInfo.type === "NostrEventSignedOpened" &&
    info.eventIsSealed === false
  ) {
    standardizedEvent = standardizeNostrEventSignedOpenedV2(
      unknownEvent as NostrEventSignedOpened
    )
  }

  // NostrSpasmEventSignedOpened
  // Nostr event with signature and extra Spasm fields
  if (
    info.eventInfo &&
    info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
    info.eventIsSealed === false
  ) {
    standardizedEvent = standardizeNostrSpasmEventSignedOpenedV2(
      unknownEvent as NostrSpasmEventSignedOpened
    )
  }

  // SpasmEventV0 with sealed DMP event with signature
  // (received e.g. via SPASM module)
  if (
    info.eventInfo &&
    info.eventInfo.type === "DmpEventSignedClosed" &&
    info.eventIsSealed === true
  ) {
    standardizedEvent = standardizeSpasmDmpEventSignedClosedV0_V2(
      unknownEvent as SpasmEventV0
    )
  }

  // SpasmEventV0 with sealed Nostr event with signature
  // (received e.g. via SPASM module)
  if (
    info.eventInfo &&
    info.eventInfo.type === "NostrEventSignedOpened" &&
    info.eventIsSealed === true
  ) {
    standardizedEvent = standardizeSpasmNostrEventSignedOpenedV0_V2(
      unknownEvent as SpasmEventV0
    )
  }

  // SpasmEventV0 with sealed Nostr Spasm event with signature
  // (received e.g. via SPASM module)
  if (
    info.eventInfo &&
    info.eventInfo.type === "NostrSpasmEventSignedOpened" &&
    info.eventIsSealed === true
  ) {
    standardizedEvent = standardizeSpasmNostrSpasmEventSignedOpenedV0_V2(
      unknownEvent as SpasmEventV0
    )
  }

  // SpasmEventV0 with RSS item without signature
  // (received e.g. via RSS module)
  if (
    !info.eventInfo &&
    info.webType === "web2" &&
    info.eventIsSealed === false &&
    info.eventIsSealedUnderKeyName === false
  ) {
    standardizedEvent = standardizeSpasmWithRssItemV0_V2(
      unknownEvent as SpasmEventV0
    )
    if (standardizedEvent) {
      standardizedEvent = addFieldsFromEnvelopeSpasmEventV0_V2(
        unknownEvent as SpasmEventV0, standardizedEvent
      )
    }
  }

  if (
    info.eventInfo &&
    info.eventIsSealed === true &&
    standardizedEvent
  ) {
    standardizedEvent = addFieldsFromEnvelopeSpasmEventV0_V2(
      unknownEvent as SpasmEventV0, standardizedEvent
    )
  }

  return standardizedEvent
}

export const standardizeSpasmEventV2 = (
  event: SpasmEventV2,
  version = "2.0.0"
): SpasmEventV2 | null => {
  if (!isObjectWithValues(event)) return null
  
  // The simplest wait to standardize SpasmEventV2
  // with signature verification and sanitization
  // is to convert it to EnvelopeWithTree and then
  // back to SpasmEventV2

  // Convert to SpasmEventEnvelopeWithTreeV2
  const spasmEventEnvelopeWithTreeV2 =
    convertToSpasmEventEnvelopeWithTree(event, version)

  if (!spasmEventEnvelopeWithTreeV2) return null

  const spasmEvent = standardizeSpasmEventEnvelopeWithTreeV2(
    spasmEventEnvelopeWithTreeV2
  )

  return spasmEvent
}

export const standardizeSpasmEventDatabaseV2 = (
  event: SpasmEventDatabaseV2,
  version = "2.0.0"
): SpasmEventV2 | null => {
  if (!isObjectWithValues(event)) return null
  
  // The simplest wait to standardize SpasmEventDatabaseV2
  // with signature verification and sanitization
  // is to change type to SpasmEventV2, convert it to
  // EnvelopeWithTree and then to SpasmEventV2.
  // Note: make sure to change type to SpasmEventV2
  // to avoid infinite recursion.

  const spasmEventNotYetConverted: SpasmEventV2 = {
    ...event,
    type: "SpasmEventV2"
  }

  // Convert to SpasmEventEnvelopeWithTreeV2
  const spasmEventEnvelopeWithTreeV2 =
    convertToSpasmEventEnvelopeWithTree(
      spasmEventNotYetConverted,
      version
  )

  if (!spasmEventEnvelopeWithTreeV2) return null

  const spasmEvent = standardizeSpasmEventEnvelopeWithTreeV2(
    spasmEventEnvelopeWithTreeV2
  )

  return spasmEvent
}

export const standardizeSpasmEventEnvelopeWithTreeV2 = (
  event: SpasmEventEnvelopeWithTreeV2,
  version = "2.0.0",
): SpasmEventV2 | null => {
  if (!isObjectWithValues(event)) return null

  const spasmEventV2 = standardizeSpasmEventEnvelopeV2(event, version)

  if (!spasmEventV2) return null

  if (
    "children" in event &&
    event.children &&
    Array.isArray(event.children)
  ) {
    event.children.forEach(child => {
      if (child && isObjectWithValues(child)) {
        if (
          'event' in child && child.event &&
          isObjectWithValues(child.event)
        ) {
          const childEventConvertedToSpasmEventV2 =
            convertToSpasm(child.event)
          if (childEventConvertedToSpasmEventV2) {
            const spasmEventChildV2: SpasmEventChildV2 = {
              ...child,
              event: childEventConvertedToSpasmEventV2
            }
            // Create children if it's null or undefined
            spasmEventV2.children ??= []
            spasmEventV2.children?.push(spasmEventChildV2)
          // convertToSpasm() returned null
          } else {
            const { event, ...childWithoutEvent } = child
            const spasmEventChildV2: SpasmEventChildV2 = {
              ...childWithoutEvent
            }
            // Create children if it's null or undefined
            spasmEventV2.children ??= []
            spasmEventV2.children?.push(spasmEventChildV2)
          }
        // child has no event key
        } else {
          const { event, ...childWithoutEvent } = child
          const spasmEventChildV2: SpasmEventChildV2 = {
            ...childWithoutEvent
          }
          // Create children if it's null or undefined
          spasmEventV2.children ??= []
          spasmEventV2.children?.push(spasmEventChildV2)
        }
        // spasmEventV2.children?.push(child)
      }
    })
  }

  if (
    "parent" in event &&
    event.parent &&
    "event" in event.parent &&
    event.parent.event &&
    isObjectWithValues(event.parent.event)
  ) {
    if (
      "parent" in spasmEventV2 &&
      spasmEventV2.parent
    ) {
      const parentEvent = convertToSpasm(event.parent.event)
      if (parentEvent) {
        spasmEventV2.parent.event = parentEvent
      }
    } else if (
      !spasmEventV2.parent
    ) {
      const parentEvent = convertToSpasm(event.parent.event)
      if (parentEvent) {
        spasmEventV2.parent = {
          ...event.parent,
          event: parentEvent
        }
      }
    }
  }

  if (
    "root" in event &&
    event.root &&
    "event" in event.root &&
    event.root.event &&
    isObjectWithValues(event.root.event)
  ) {
    if (
      "root" in spasmEventV2 &&
      spasmEventV2.root
    ) {
      const rootEvent = convertToSpasm(event.root.event)
      if (rootEvent) {
        spasmEventV2.root.event = rootEvent
      }
    } else if (
      !spasmEventV2.root
    ) {
      const rootEvent = convertToSpasm(event.root.event)
      if (rootEvent) {
        spasmEventV2.root = {
          ...event.root,
          event: rootEvent
        }
      }
    }
  }

  return spasmEventV2
}

export const standardizeSpasmEventEnvelopeV2 = (
  event: SpasmEventEnvelopeV2 | SpasmEventEnvelopeWithTreeV2,
  version = "2.0.0",
): SpasmEventV2 | null => {
  if (!isObjectWithValues(event)) return null

  if (
    !("type" in event) ||
    (
      event.type !== "SpasmEventEnvelopeV2" &&
      event.type !== "SpasmEventEnvelopeWithTreeV2"
    )
  ) { return null }

  // Get siblings
  if (
    !("siblings" in event) ||
    !event.siblings ||
    !Array.isArray(event.siblings)
  ) { return null }
  const { siblings } = event

  const spasmEventsV2: SpasmEventV2[] = []

  // Convert siblings to SpasmEventV2
  siblings.forEach(sibling => {
    const spasmEventV2 = standardizeSpasmEventSiblingV2(
      sibling, version
    )
    if (spasmEventV2) { spasmEventsV2.push(spasmEventV2) }
  })
  
  // Merge all SpasmEventV2
  const spasmEventV2 = mergeSpasmEventsV2(spasmEventsV2)

  if (!spasmEventV2) return null

  if ('db' in event && event.db) {
    spasmEventV2.db = event.db
  }

  if ('stats' in event && event.stats) {
    spasmEventV2.stats = event.stats
  }

  if ('source' in event && event.source) {
    spasmEventV2.source = event.source
  }

  if ('sharedBy' in event && event.sharedBy) {
    spasmEventV2.sharedBy = event.sharedBy
  }

  return spasmEventV2
}

export const standardizeSpasmEventSiblingV2 = (
  sibling: SpasmEventSiblingV2,
  version = "2.0.0"
): SpasmEventV2 | null => {
  if (!isObjectWithValues(sibling)) return null

  if (
    !("type" in sibling) ||
    typeof(sibling.type) !== "string"
  ) { return null }

  if (
    sibling.type === "SiblingWeb2V2" &&
    sibling.originalObject
  ) {
    return standardizeNonSpasmEventV2(
      sibling.originalObject as SpasmEventV0, version
    )
  }

  if (
    sibling.type === "SiblingSpasmV2"
  ) {
    if (
    "signedString" in sibling &&
    sibling.signedString &&
    typeof(sibling.signedString) === "string"
    ) {
      const spasmEventBodyV2: SpasmEventBodyV2 =
        JSON.parse(sibling.signedString)
      // TODO add sequence, previousEvent
      return standardizeSpasmEventAnyV2(spasmEventBodyV2)
    }
  }

  if (
    sibling.type === "SiblingSpasmSignedV2"
  ) {
    if (
    "signedString" in sibling &&
    sibling.signedString &&
    typeof(sibling.signedString) === "string" &&
    "signatures" in sibling &&
    Array.isArray(sibling.signatures) &&
    sibling.signatures[0] &&
    sibling.signatures[0].value &&
    typeof(sibling.signatures[0].value) === "string"
    ) {
      // TODO each sibling might have multiple signatures,
      // eg. Spasm protocol signed with Ethereum and Nostr keys.
      // const verifyAllSignaturesOfSibling = (sibling) => {}
      const { signedString } = sibling
      const signature = sibling.signatures[0].value
      const signer = extractSignerFromEthereumSignature(
        signedString, signature
      )
      if (!signer || typeof(signer) !== "string") return null

      const spasmEventBodySignedV2: SpasmEventBodySignedClosedV2 = {
        type: "SpasmEventBodySignedClosedV2",
        signedString, signature, signer
      }

      // TODO add sequence, previousEvent
      return standardizeSpasmEventAnyV2(spasmEventBodySignedV2)
    }
  }

  if (
    sibling.type === "SiblingDmpV2"
  ) {
    if (
    "signedString" in sibling &&
    sibling.signedString &&
    typeof(sibling.signedString) === "string"
    ) {
      const dmpEvent: DmpEvent = JSON.parse(sibling.signedString)
      return standardizeEventV2(dmpEvent)
    }
  }

  if (sibling.type === "SiblingDmpSignedV2") {
    if (
    "signedString" in sibling &&
    sibling.signedString &&
    typeof(sibling.signedString) === "string" &&
    "signatures" in sibling &&
    Array.isArray(sibling.signatures) &&
    sibling.signatures[0] &&
    sibling.signatures[0].value &&
    typeof(sibling.signatures[0].value) === "string"
    ) {
      const { signedString } = sibling
      const signature = sibling.signatures[0].value
      const signer = extractSignerFromEthereumSignature(
        signedString, signature
      )
      if (!signer || typeof(signer) !== "string") return null

      const dmpEventSigned: DmpEventSignedClosed = {
        signedString, signature, signer
      }

      return standardizeNonSpasmEventV2(dmpEventSigned)
    }
  }

  if (
    sibling.type === "SiblingNostrV2" &&
    sibling.originalObject
  ) {
    return standardizeNonSpasmEventV2(
      sibling.originalObject as NostrEvent
    )
  }

  if (
    sibling.type === "SiblingNostrSpasmV2" &&
    sibling.originalObject
  ) {
    return standardizeNonSpasmEventV2(
      sibling.originalObject as NostrSpasmEvent
    )
  }

  if (
    sibling.type === "SiblingNostrSignedV2" &&
    sibling.originalObject
  ) {
    return standardizeNonSpasmEventV2(
      sibling.originalObject as NostrEventSignedOpened
    )
  }

  if (
    sibling.type === "SiblingNostrSpasmSignedV2" &&
    sibling.originalObject
  ) {
    return standardizeNonSpasmEventV2(
      sibling.originalObject as NostrSpasmEventSignedOpened
    )
  }

  return null
}

export const standardizeDmpEventV2 = (
  event: DmpEvent,
): SpasmEventV2 | null => {
  if (!isObjectWithValues(event)) return null

  if (!isDmpEvent(event)) return null

  const protocolVersion: DmpVersion =
    extractVersion(event.version) as DmpVersion

  const spasmEventV2: SpasmEventV2 = {
    type: "SpasmEventV2",
    // action: event.action,
    // title: event.title,
    // content: event.text,
    // timestamp: toBeTimestamp(event.time),
    // license: event.license,
    siblings: [
      {
        type: "SiblingDmpV2",
        protocol: {
          name: "dmp",
          version: protocolVersion
        },
        signedString: JSON.stringify(event),
      }
    ]
  }

  if (event.action) { spasmEventV2.action = event.action }
  if (event.title) { spasmEventV2.title = event.title }
  if (event.text) { spasmEventV2.content = event.text }
  if (event.license) { spasmEventV2.license = event.license }
  if (event.time) {
    spasmEventV2.timestamp = toBeTimestamp(event.time)
  }

  if (event.target) {
    spasmEventV2.parent = {
      ids: [
        {
          value: event.target,
          // Create a new format field only if a
          // format can be determined from a string.
          ...(
            getFormatFromId(event.target)
              ? {format: getFormatFromId(event.target)}
              : {}
          )
        }
      ]
    }
  }

  return spasmEventV2
}

// standardizeDmpEventSignedClosedV2
export const standardizeDmpEventSignedClosedV2 = (
  event: DmpEventSignedClosed,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(event)) return null

  if (!isDmpEventSignedClosed(event)) return null

  if (
    !event.signedString || !event.signature || !event.signer ||
    typeof(event.signedString) !== "string" ||
    typeof(event.signature) !== "string" ||
    typeof(event.signer) !== "string"
  ) return null

  const isEthereumSignatureValid = verifyEthereumSignature(
    event.signedString, event.signature, event.signer
  )

  if (!isEthereumSignatureValid) return null

  const dmpEvent: DmpEvent = JSON.parse(event.signedString)

  const dmpEventConvertedToSpasmV2: SpasmEventV2 | null = standardizeDmpEventV2(dmpEvent)

  if (!dmpEventConvertedToSpasmV2) return null

  const dmpEventSignedClosedConvertedToSpasmV2: SpasmEventV2 = {
    ...dmpEventConvertedToSpasmV2,
    authors: [
      {
        addresses: [
          {
            value: event.signer,
            // Create a new format field only if a
            // format can be determined from a string.
            ...(
              getFormatFromAddress(event.signer)
                ? {format: getFormatFromAddress(event.signer)}
                : {}
            )
            // TODO add a function to verify signatures 
            // verified: true
          }
        ]
      }
    ],
    ids: [
      {
        value: event.signature,
        // Create a new format field only if a
        // format can be determined from a string.
        ...(
          getFormatFromId(event.signature)
            ? {
              format: getFormatFromId(event.signature),
            }
            : {}
        )
      },
    ],
    signatures: [
      {
        value: event.signature,
        pubkey: event.signer,
        // Create a new format field only if a
        // format can be determined from a string.
        ...(
          getFormatFromSignature(event.signature)
            ? {
              format: getFormatFromSignature(event.signature),
            }
            : {}
        )
      }
    ]
  }

  const spasmEventV2: SpasmEventV2 =
    dmpEventSignedClosedConvertedToSpasmV2

  // Add 'verified' flag to the address that was verified
  markSpasmEventAddressAsVerified(spasmEventV2, event.signer)

  if (spasmEventV2) {
    // Create siblings if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??=
      {type:"SiblingDmpSignedV2"} as SiblingDmpSignedV2;
    spasmEventV2.siblings[0] =
      spasmEventV2.siblings[0] as SiblingDmpSignedV2
    spasmEventV2.siblings[0].type = "SiblingDmpSignedV2"
    spasmEventV2.siblings[0].signatures = [
      {
        value: event.signature,
        pubkey: event.signer,
        // Create a new format field only if a
        // format can be determined from a string.
        ...(
          getFormatFromSignature(event.signature)
            ? {
              format: getFormatFromSignature(event.signature),
            }
            : {}
        )
      }
    ]
    spasmEventV2.siblings[0].ids = [
      {
        value: event.signature,
        // Create a new format field only if a
        // format can be determined from a string.
        ...(
          getFormatFromId(event.signature)
            ? {
              format: getFormatFromId(event.signature),
            }
            : {}
        )
      }
    ]
  }

  return spasmEventV2
}

// standardizeDmpEventSignedOpenedV2
export const standardizeDmpEventSignedOpenedV2 = (
  event: DmpEventSignedOpened,
): SpasmEventV2 | null => {
  if (!isObjectWithValues(event)) return null

  if (!isDmpEventSignedOpened(event)) return null

  if (
    !event.signedString || !event.signature || !event.signer ||
    typeof(event.signedString) !== "string" ||
    typeof(event.signature) !== "string" ||
    typeof(event.signer) !== "string"
  ) return null

  const dmpEventSignedClosed: DmpEventSignedClosed = {
    signedString: event.signedString,
    signature: event.signature,
    signer: event.signer
  }

  const DmpEventSignedOpenedConvertedToSpasmV2: SpasmEventV2 | null =
    standardizeDmpEventSignedClosedV2(dmpEventSignedClosed);

  if (!DmpEventSignedOpenedConvertedToSpasmV2) return null

  return DmpEventSignedOpenedConvertedToSpasmV2
}

export const standardizeNostrEventV2 = (
  event: NostrEvent,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(event)) return null

  if (!isNostrEvent(event)) return null

  const spasmEventV2: SpasmEventV2 = {
    type: "SpasmEventV2",
    // action
    content: event.content,
    timestamp: event.created_at,
    authors: [
      {
        addresses: [
          {
            value: toBeHex(event.pubkey),
            format: {
              name: "nostr-hex"
            }
          }
        ]
      }
    ],
    siblings: [
      {
        type: "SiblingNostrV2",
        originalObject: event,
        protocol: {
          name: "nostr",
          // hasExtraSpasmFields: false
        }
      }
    ]
  }

  if (event.id && typeof (event.id) === "string") {
    spasmEventV2.ids = [
      {
        value: toBeHex(event.id),
        format: {
          name: "nostr-hex"
        }
      }
    ],
    // Create siblings if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??= {
      type:"SiblingNostrV2",
      protocol: {
        name: "nostr",
      }
    };
    spasmEventV2.siblings[0] =
      spasmEventV2.siblings[0] as SiblingNostrV2

    spasmEventV2.siblings[0].ids = [
      {
        value: toBeHex(event.id),
        format: {
          name: "nostr-hex"
        }
      }
    ]
  }

  let referencedEvents: SpasmEventReferenceV2[] = []
  let mentionedAuthors: SpasmEventMentionV2[] = []

  if (event.tags && Array.isArray(event.tags)) {
    event.tags.forEach(function (tag) {
      // References
      // ["e", <event-id>, <relay-url>, <marker>]
      if (
        Array.isArray(tag) && tag[0] === "e" &&
        tag[1] && typeof(tag[1]) === 'string'
      ) {
        // <event-id>
        const referencedEvent: SpasmEventReferenceV2 = {
          ids: [
            {
              value: toBeHex(tag[1]),
              // Create a new format field only if a
              // format can be determined from a string.
              ...(
                getFormatFromId(tag[1])
                  ? {format: getFormatFromId(tag[1])}
                  : {}
              )
            }
          ]
        }

        // <relay-url>
        if (tag[2] && typeof (tag[2]) === "string") {
          referencedEvent.ids[0].hosts = [
            { value: tag[2] }
          ]
        }
        
        // <marker>
        if (tag[3] && typeof(tag[3]) === 'string') {
          referencedEvent.marker = tag[3]

          if (tag[3] === 'reply') {
            spasmEventV2.action = 'reply'
          }
        }

        referencedEvents.push(referencedEvent)
      }

      // Mentions
      // ["p", <event-id>, <relay-url>, <marker>]
      if (
        Array.isArray(tag) && tag[0] === "p" &&
        tag[1] && typeof(tag[1]) === 'string'
      ) {
        // <pubkey>
        const mentionedAuthor: SpasmEventMentionV2 = {
          addresses: [
            {
              value: toBeHex(tag[1]),
              // Create a new format field only if a
              // format can be determined from a string.
              ...(
                getFormatFromAddress(tag[1])
                  ? {format: getFormatFromAddress(tag[1])}
                  : {}
              )
            }
          ]
        }

        // <relay-url>
        if (tag[2] && typeof (tag[2]) === "string") {
          // Create addresses if it's null or undefined
          mentionedAuthor.addresses ??= []
          mentionedAuthor.addresses[0].hosts = [
            { value: tag[2] }
          ]
        }
        
        // <marker>
        if (tag[3] && typeof(tag[3]) === 'string') {
          mentionedAuthor.marker = tag[3]
        }

        mentionedAuthors.push(mentionedAuthor)
      }
    });
  }

  if (
    mentionedAuthors &&
    mentionedAuthors[0] &&
    hasValue(mentionedAuthors)
  ) {
      // spasmEventV2.mentions ??= [];
      spasmEventV2.mentions = mentionedAuthors
  }

  if (referencedEvents && referencedEvents[0]) {
    // The first reference is always assigned as a parent
    // while all other references are assigned as references.
    spasmEventV2.parent = referencedEvents[0]

    const restOfReferencedEvents = referencedEvents.slice(1)

    if (
      restOfReferencedEvents &&
      hasValue(restOfReferencedEvents) &&
      restOfReferencedEvents[0]
    ) {
      // TODO write tests for multiple references
      // spasmEventV2.references ??= [];
      spasmEventV2.references = restOfReferencedEvents
    }
  }

  if (!spasmEventV2.action && event.kind === 1) {
    // Kind 1 event without referenced events is usually "post"
    if (!event.tags || !hasValue(spasmEventV2.parent)) {
      spasmEventV2.action = "post"
    // It's usually a reply if any other event is referenced
    } else if (hasValue(spasmEventV2.parent)) {
      spasmEventV2.action = "reply"
    }
  }

  return spasmEventV2
}

// standardizeNostrSpasmEventV2
export const standardizeNostrSpasmEventV2 = (
  event: NostrSpasmEvent,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(event)) return null

  if (!isNostrSpasmEvent(event)) return null

  const spasmEventV2: SpasmEventV2 | null = standardizeNostrEventV2(event)

  if (!spasmEventV2) return null

  let extraFieldsSpasmVersion: NostrSpasmVersion | null =
    getNostrSpasmVersion(event)
  let spasmTarget: string = ""
  let spasmAction: SpasmEventActionV2 | null = null
  let spasmTitle: string | null = null
  let license: SpasmEventLicenseV2 | null = null

  if (event.tags &&
      Array.isArray(event.tags)
  ) {
    event.tags.forEach(function (tag) {
      // if (Array.isArray(tag) && tag[0] === "spasm_version") {
      //   extraFieldsSpasmVersion = tag[1]
      // }

      if (Array.isArray(tag) && tag[0] === "spasm_target") {
        spasmTarget = tag[1]
      }

      if (Array.isArray(tag) && tag[0] === "spasm_action") {
        spasmAction = tag[1]
      }

      if (Array.isArray(tag) && tag[0] === "spasm_title") {
        spasmTitle = tag[1]
      }

      if (Array.isArray(tag) && tag[0] === "license") {
        license = tag[1]
      }
    });
  }

  if (license) { spasmEventV2.license = license }
  if (spasmAction) { spasmEventV2.action = spasmAction }
  if (spasmTitle) { spasmEventV2.title = spasmTitle }

  if (spasmTarget && typeof(spasmTarget) === "string") {
    // Create parent if it's null or undefined
    spasmEventV2.parent ??= { ids: [] };
    const parentId: SpasmEventIdV2 = {
      value: spasmTarget,
      format: getFormatFromId(spasmTarget)
    }
    spasmEventV2.parent.ids.push(parentId)
  }

  if (
    spasmTarget || spasmAction ||
    spasmTitle || extraFieldsSpasmVersion
  ) {
    // Create siblings if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??=
      {type:"SiblingNostrSpasmV2"} as SiblingNostrSpasmV2;
    spasmEventV2.siblings[0] =
      spasmEventV2.siblings[0] as SiblingNostrSpasmV2
    spasmEventV2.siblings[0].type = "SiblingNostrSpasmV2"

    spasmEventV2.siblings[0].protocol.hasExtraSpasmFields = true
    if (extraFieldsSpasmVersion) {
      spasmEventV2.siblings[0]
        .protocol.extraSpasmFieldsVersion = extraFieldsSpasmVersion
    }
  }

  return spasmEventV2
}

// standardizeNostrEventSignedOpenedV2
export const standardizeNostrEventSignedOpenedV2 = (
  event: NostrEventSignedOpened,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(event)) return null

  if (!isNostrEventSignedOpened(event)) return null

  const spasmEventV2: SpasmEventV2 | null = standardizeNostrEventV2(event)

  if (!spasmEventV2) return null

  /**
   * nostr-tools v2 creates a `[Symbol("verified")]: true` on
   * the Nostr object during verification process, which messes
   * up tests, so the deep copy of the object is verified using
   * JSON stringify/parse to make sure that the original Nostr
   * event stays untouched.
   */
  const eventCopy = JSON.parse(JSON.stringify(event))
  const isNostrSignatureValid = verifyNostrEvent(eventCopy)

  if (!isNostrSignatureValid) return null

  if (
    event.sig && typeof(event.sig) &&
    event.pubkey && typeof(event.pubkey) === "string"
  ) {
    // Create signatures if it's null or undefined
    spasmEventV2.signatures ??= [];
    spasmEventV2.signatures.push({
      value: event.sig,
      pubkey: event.pubkey,
      format: { name: "nostr-sig" }
    })

    // Create parent if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??=
      {type:"SiblingNostrSignedV2"} as SiblingNostrSignedV2;
    spasmEventV2.siblings[0] =
      spasmEventV2.siblings[0] as SiblingNostrSignedV2
    spasmEventV2.siblings[0].type = "SiblingNostrSignedV2"

    spasmEventV2.siblings[0].signatures ??= [];
    spasmEventV2.siblings[0].signatures.push({
      value: event.sig,
      pubkey: event.pubkey,
      format: { name: "nostr-sig" }
    })

    // Add 'verified' flag to the address that was verified
    markSpasmEventAddressAsVerified(spasmEventV2, event.pubkey)
  }

  return spasmEventV2
}

// standardizeNostrSpasmEventSignedOpenedV2
export const standardizeNostrSpasmEventSignedOpenedV2 = (
  event: NostrSpasmEventSignedOpened,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(event)) return null

  if (!isNostrSpasmEventSignedOpened(event)) return null

  const spasmEventV2: SpasmEventV2 | null = standardizeNostrSpasmEventV2(event)

  if (!spasmEventV2) return null

  /**
   * nostr-tools v2 creates a `[Symbol("verified")]: true` on
   * the Nostr object during verification process, which messes
   * up tests, so the deep copy of the object is verified using
   * JSON stringify/parse to make sure that the original Nostr
   * event stays untouched.
   */
  const eventCopy = JSON.parse(JSON.stringify(event))
  const isNostrSignatureValid =  verifyNostrEvent(eventCopy)

  if (!isNostrSignatureValid) return null

  if (
    event.sig && typeof(event.sig) &&
    event.pubkey && typeof(event.pubkey) === "string"
  ) {
    // Create signatures if it's null or undefined
    spasmEventV2.signatures ??= [];
    spasmEventV2.signatures.push({
      value: event.sig,
      pubkey: event.pubkey,
      format: { name: "nostr-sig" }
    })

    // Create siblings if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??= {
      type:"SiblingNostrSpasmSignedV2",
      protocol: { name: "nostr" }
    } as SiblingNostrSpasmSignedV2;
    spasmEventV2.siblings[0] =
      spasmEventV2.siblings[0] as SiblingNostrSpasmSignedV2
    spasmEventV2.siblings[0].type = "SiblingNostrSpasmSignedV2"

    spasmEventV2.siblings[0].signatures ??= [];
    spasmEventV2.siblings[0].signatures.push({
      value: event.sig,
      pubkey: event.pubkey,
      format: { name: "nostr-sig" }
    })

    // Add 'verified' flag to the address that was verified
    markSpasmEventAddressAsVerified(spasmEventV2, event.pubkey)
  }

  // NostrSpasm versions prior to 2.0.0 assigned sig as event id
  if (
    event.sig && typeof(event.sig) === "string" &&
    getNostrSpasmVersion(event) === "1.0.0"
  ) {
    // Create ids if it's null or undefined
    spasmEventV2.ids ??= [];

    spasmEventV2.ids.push(
      {
        value: event.sig,
        format: {
          name: "nostr-sig"
        }
      }
    )

    // Create siblings if it's null or undefined
    spasmEventV2.siblings ??= [];
    spasmEventV2.siblings[0] ??= {
      type:"SiblingNostrSpasmSignedV2",
      protocol: { name: "nostr" }
    } as SiblingNostrSpasmSignedV2
    spasmEventV2.siblings[0] =
      spasmEventV2.siblings[0] as SiblingNostrSpasmSignedV2
    spasmEventV2.siblings[0].type = "SiblingNostrSpasmSignedV2"

    spasmEventV2.siblings[0].ids ??= [];
    spasmEventV2.siblings[0].ids.push(
      {
        value: event.sig,
        format: {
          name: "nostr-sig"
        }
      }
    )
  }

  return spasmEventV2
}

// standardizeSpasmDmpEventSignedClosedV0_V2
export const standardizeSpasmDmpEventSignedClosedV0_V2 = (
  spasmEventV0: SpasmEventV0
): SpasmEventV2 | null => {

  if (!isObjectWithValues(spasmEventV0)) return null

  if (
    !('signed_message' in spasmEventV0) ||
    typeof(spasmEventV0.signed_message) !== "string"
  ) {
    return null
  }

  const dmpEvent: DmpEventSignedClosed = {
    signedString: spasmEventV0.signed_message,
    signature: "",
    signer: ""
  }

  if (
    spasmEventV0.signature &&
    typeof(spasmEventV0.signature) === "string"
  ) {
    dmpEvent.signature = spasmEventV0.signature
  }

  if (
    spasmEventV0.signer &&
    typeof(spasmEventV0.signer) === "string"
  ) {
    dmpEvent.signer = spasmEventV0.signer
  }

  const spasmEventV2 =
    standardizeDmpEventSignedClosedV2(dmpEvent)

  return spasmEventV2
}

// standardizeSpasmNostrEventSignedOpenedV0_V2
export const standardizeSpasmNostrEventSignedOpenedV0_V2 =(
  spasmEventV0: SpasmEventV0,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(spasmEventV0)) return null

  if (
    !('signed_message' in spasmEventV0) ||
    typeof(spasmEventV0.signed_message) !== "string"
  ) {
    return null
  }

  // Extract the event
  const event = extractSealedEvent(spasmEventV0)

  return standardizeNostrEventSignedOpenedV2(event as NostrEventSignedOpened)
}

// standardizeSpasmNostrSpasmEventSignedOpenedV0_V2
export const standardizeSpasmNostrSpasmEventSignedOpenedV0_V2 = (
  spasmEventV0: SpasmEventV0,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(spasmEventV0)) return null

  if (
    !('signed_message' in spasmEventV0) ||
    typeof(spasmEventV0.signed_message) !== "string"
  ) {
    return null
  }

  // Extract the event
  const event = extractSealedEvent(spasmEventV0)

  return standardizeNostrSpasmEventSignedOpenedV2(event as NostrSpasmEventSignedOpened)
}

// standardizeSpasmWithRssItemV0_V2
export const standardizeSpasmWithRssItemV0_V2 = (
  spasmEventV0: SpasmEventV0,
): SpasmEventV2 | null => {

  if (!isObjectWithValues(spasmEventV0)) return null

  const spasmEventV2: SpasmEventV2 = {
    type: "SpasmEventV2",
    action: "post",
  }

  if (spasmEventV0.title) {
    spasmEventV2.title = spasmEventV0.title
  }

  if (spasmEventV0.pubdate) {
    spasmEventV2.timestamp = toBeTimestamp(spasmEventV0.pubdate)
  }

  if (spasmEventV0.description) {
    spasmEventV2.content = spasmEventV0.description
  }

  if (spasmEventV0.tags) {
    if (Array.isArray(spasmEventV0.tags)) {
      // Create ids if it's null or undefined
      spasmEventV2.keywords ??= [];
      spasmEventV2.keywords = 
        spasmEventV2.keywords?.concat(spasmEventV0.tags)
    }
  }

  if (spasmEventV0.tickers) {
    if (typeof(spasmEventV0.tickers) === "string") {
      // Create ids if it's null or undefined
      spasmEventV2.keywords ??= [];
      spasmEventV2.keywords.push(spasmEventV0.tickers)
    } else if (Array.isArray(spasmEventV0.tickers)) {
      spasmEventV2.keywords =
        spasmEventV2.keywords?.concat(spasmEventV0.tickers)
    }
  }

  let siblingIds: SpasmEventIdV2[] = []

  if (
    spasmEventV0.url &&
    typeof(spasmEventV0.url) === "string"
  ) {
    // Create ids if it's null or undefined
    spasmEventV2.ids ??= [];
    spasmEventV2.ids.push(
      {
        value: spasmEventV0.url,
        format: {
          name: "url"
        }
      }
    )
    
    siblingIds.push(
      {
        value: spasmEventV0.url,
        format: {
          name: "url"
        }
      }
    )

    // Create links if it's null or undefined
    spasmEventV2.links ??= [];

    const linkObject =
      createLinkObjectFromUrl(spasmEventV0.url)
    if (linkObject) {
      linkObject.originalProtocolKey = "url"
      spasmEventV2.links.push(
        linkObject
      )
    }
  }

  if (spasmEventV0.guid) {
    // Create ids if it's null or undefined
    spasmEventV2.ids ??= [];
    spasmEventV2.ids.push(
      {
        value: spasmEventV0.guid,
        format: {
          name: "guid"
        }
      }
    )

    siblingIds.push(
      {
        value: spasmEventV0.guid,
        format: {
          name: "guid"
        }
      }
    )

    if (typeof(spasmEventV0.guid) === "string") {
      // Create links if it's null or undefined
      spasmEventV2.links ??= [];

      const linkObject =
        createLinkObjectFromUrl(spasmEventV0.guid)
      if (linkObject) {
        linkObject.originalProtocolKey = "guid"
        spasmEventV2.links.push(
          linkObject
        )
      }
    }
  }

  if (spasmEventV0.author) {
    // Create ids if it's null or undefined
    spasmEventV2.authors ??= [];
    spasmEventV2.authors.push(
      {
        usernames: [
          {
            value: spasmEventV0.author
          }
        ]
      }
    )
  }

  // siblings
  // Create siblings if it's null or undefined
  spasmEventV2.siblings ??= [];
  spasmEventV2.siblings[0] ??= {
    type:"SiblingWeb2V2",
    protocol: { name: "web2" }
  } as SiblingWeb2V2
  spasmEventV2.siblings[0] =
    spasmEventV2.siblings[0] as SiblingWeb2V2

  spasmEventV2.siblings[0].type = "SiblingWeb2V2"

  spasmEventV2.siblings[0].protocol = { name: "web2" }

  // Add IDs (e.g., URL and guid) to siblings
  // spasmEventV2.siblings[0].ids ??= [];
  spasmEventV2.siblings[0].ids = siblingIds

  // Destruct spasmEventV0 to exclude children
  // to avoid infinite recursion loop.
  const {
    children, ...originalObjectWithoutChildren
  }: SpasmEventV0 = spasmEventV0

  spasmEventV2.siblings[0].originalObject =
    originalObjectWithoutChildren

  return spasmEventV2
}

// addFieldsFromEnvelopeSpasmEventV0_V2
export const addFieldsFromEnvelopeSpasmEventV0_V2 = (
  spasmEventV0: SpasmEventV0,
  spasmEventV2: SpasmEventV2
): SpasmEventV2 => {

  if (!spasmEventV0) return spasmEventV2
  if (!spasmEventV2) return spasmEventV2

  if (!isObjectWithValues(spasmEventV0)) return spasmEventV2
  if (!isObjectWithValues(spasmEventV2)) return spasmEventV2

  // db.key
  if (spasmEventV0.id) {
    if (typeof(spasmEventV0.id) === "number") {
      // Create db if it's null or undefined
      spasmEventV2.db ??= {};
      spasmEventV2.db.key = spasmEventV0.id
    } else if (
      typeof(spasmEventV0.id) === "string" &&
      Number(spasmEventV0.id)
    ) {
      // Create db if it's null or undefined
      spasmEventV2.db ??= {};
      spasmEventV2.db.key = Number(spasmEventV0.id)
    }
  }

  // db.addedTimestamp
  if (spasmEventV0.added_time) {
    if (typeof(spasmEventV0.added_time) === "number") {
      // Create db if it's null or undefined
      spasmEventV2.db ??= {};
      spasmEventV2.db.addedTimestamp =
        toBeTimestamp(spasmEventV0.added_time)
    } else if (
      typeof(spasmEventV0.added_time) === "string"
    ) {
      // Create db if it's null or undefined
      spasmEventV2.db ??= {};
      spasmEventV2.db.addedTimestamp =
        toBeTimestamp(spasmEventV0.added_time)
    }
  }

  if (spasmEventV0.source && !spasmEventV2.source) {
    spasmEventV2.source = {
      name: spasmEventV0.source
    }
  }

  if (spasmEventV0.category && !spasmEventV2.categories) {
    // Create categories if it's null or undefined
    spasmEventV2.categories ??= [];
    spasmEventV2.categories.push({
      name: spasmEventV0.category
    })
  }

  // Reactions (e.g., upvote, downvote, etc.)
  const addReactions = (reaction: SpasmEventReactionNameV2) => {
    if (
      // 0 is a valid number
      // spasmEventV0[reaction] !== undefined &&
      typeof(spasmEventV0[reaction]) === "number"
    ) {
        // Create reactions if it's null or undefined
        spasmEventV2.stats ??= [];
        spasmEventV2.stats[0] ??= { action: "react" };
        spasmEventV2.stats[0].contents ??= []
        spasmEventV2.stats[0].contents.push({
          value: reaction,
          total: spasmEventV0[reaction]
        })
    }
  }

  const reactions: SpasmEventReactionNameV2[] = [
    "upvote", "downvote",
    "bullish", "bearish",
    "important", "scam",
    "laugh",
    "toxic", "clown", "moon",
    "rocket"
  ]

  reactions.forEach(reaction => {
      addReactions(reaction)
  })

  // "comments_count",
  if (
    // 0 is a valid number
    // spasmEventV0["comments_count"] !== undefined &&
    typeof(spasmEventV0["comments_count"]) === "number"
  ) {
    // Create reactions if it's null or undefined
    spasmEventV2.stats ??= [];
    spasmEventV2.stats.push({
      action: "reply",
      total: spasmEventV0["comments_count"]
    })
  }

  // Comments
  if (
    spasmEventV0.children &&
    Array.isArray(spasmEventV0.children) &&
    spasmEventV0.children.length > 0
  ) {
    const childrenAsSpasmAndNullV2: (SpasmEventV2 | null)[] =
      spasmEventV0.children.map(child => convertToSpasm(child))

    childrenAsSpasmAndNullV2.forEach((event) => {
      if (event !== null) {
        // Create children if it's null or undefined
        spasmEventV2.children ??= [];
        spasmEventV2.children.push(
          {
            ids: event.ids,
            event: event
          }
        )
      }
    })
  }

  return spasmEventV2
}

export const convertToSpasmStatus = (): void => {
  console.log("spasm.js convertToSpasm status: success")
}
