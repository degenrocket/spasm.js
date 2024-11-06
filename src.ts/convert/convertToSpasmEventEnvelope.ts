import {
  CustomConvertToSpasmConfig,
  SpasmEventEnvelopeV2,
  SpasmEventV2,
  UnknownEventV2
} from "../types/interfaces.js"
import {hasValue, isObjectWithValues} from "../utils/utils.js"

import { convertToSpasm } from "./convertToSpasm.js"

export const convertManyToSpasmEventEnvelope = (
  unknownEvents: UnknownEventV2[],
  envelopeVersion = "2.0.0"
): SpasmEventEnvelopeV2[] | null => {
  try {
    if (!unknownEvents) return null
    if (!Array.isArray(unknownEvents)) return null
    if (!hasValue(unknownEvents)) return null
    const convertedEvents: SpasmEventEnvelopeV2[] = []
    unknownEvents.forEach(event => {
      const convertedEvent = convertToSpasmEventEnvelope(
        event, envelopeVersion
      )
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
export const convertToSpasmEventEnvelope = (
  unknownEvent: UnknownEventV2,
  envelopeVersion = "2.0.0"
): SpasmEventEnvelopeV2 | null => {
  // Already SpasmEventEnvelopeV2
  if (
    'type' in unknownEvent &&
    unknownEvent.type === "SpasmEventEnvelopeV2"
  ) { return unknownEvent }

  // SpasmEventV2
  let spasmEventV2: SpasmEventV2 | null = null

  if (
    'type' in unknownEvent &&
    unknownEvent.type === "SpasmEventV2"
  ) {
    spasmEventV2 = unknownEvent
  } else {
    const customConfig: CustomConvertToSpasmConfig = {
      to: { spasm: { version: "2.0.0" } }
    }
    spasmEventV2 = convertToSpasm(unknownEvent, customConfig)
  }

  if (!spasmEventV2) return null

  if (envelopeVersion === "2.0.0") {
    const SpasmEventEnvelopeV2 =
      convertSpasmEventV2ToSpasmEventEnvelopeV2(
        spasmEventV2
    )
    return SpasmEventEnvelopeV2
  }

  return null
}

export const convertSpasmEventV2ToSpasmEventEnvelopeV2 = (
  spasmEvent: SpasmEventV2
): SpasmEventEnvelopeV2 | null => {

  if (!isObjectWithValues(spasmEvent)) return null
  
  if (spasmEvent.type !== "SpasmEventV2") return null

  const spasmEventEnvelope: SpasmEventEnvelopeV2 = {
    type: "SpasmEventEnvelopeV2"
  }

  if (spasmEvent.ids) {
    spasmEventEnvelope.ids = spasmEvent.ids
  }

  if (spasmEvent.siblings) {
    spasmEventEnvelope.siblings = spasmEvent.siblings
  }

  if (spasmEvent.db) {
    spasmEventEnvelope.db = spasmEvent.db
  }

  if (spasmEvent.source) {
    spasmEventEnvelope.source = spasmEvent.source
  }

  if (spasmEvent.stats) {
    spasmEventEnvelope.stats = spasmEvent.stats
  }

  if (spasmEvent.sharedBy) {
    spasmEventEnvelope.sharedBy = spasmEvent.sharedBy
  }

 /**
  * SpasmEventEnvelopeV2 is used for sending events to other
  * parties, so it includes siblings, which should be used by
  * a receiver in order to verify and sanitize an event by
  * converting an envelope into a Spasm event.
  * Envelope includes fields like `stats` and 'sharedBy',
  * allowing a receiver to display that info for each event.
  * However, envelope doesn't include other events from a
  * family tree such as parent, root, and children, because
  * that data is not needed e.g. when displaying events in a
  * feed with filters.
  * In order to display children (comments), parent, or root
  * events, SpasmEventEnvelopeWithTreeV2 is used.
  */
  return spasmEventEnvelope
}
