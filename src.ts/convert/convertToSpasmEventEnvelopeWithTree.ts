import {
  CustomConvertToSpasmConfig,
  SpasmEventEnvelopeV2,
  SpasmEventEnvelopeWithTreeV2,
  SpasmEventV2,
  UnknownEventV2
} from "../types/interfaces.js"
import {hasValue, isObjectWithValues} from "../utils/utils.js"

import { convertToSpasm } from "./convertToSpasm.js"
import { convertToSpasmEventEnvelope } from "./convertToSpasmEventEnvelope"

// Spasm V2
export const convertToSpasmEventEnvelopeWithTree = (
  unknownEvent: UnknownEventV2,
  envelopeVersion = "2.0.0"
): SpasmEventEnvelopeWithTreeV2 | null => {
  // Already SpasmEventEnvelopeV2
  if (
    'type' in unknownEvent &&
    unknownEvent.type === "SpasmEventEnvelopeWithTreeV2"
  ) {
    return unknownEvent
  }

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
      convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2(
        spasmEventV2
    )
    return SpasmEventEnvelopeV2
  }

  return null
}

// TODO add recursion maxDepth
export const convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = (
  spasmEvent: SpasmEventV2
): SpasmEventEnvelopeWithTreeV2 | null => {

  if (!isObjectWithValues(spasmEvent)) return null
  
  if (spasmEvent.type !== "SpasmEventV2") return null

  const spasmEventEnvelope: SpasmEventEnvelopeV2 | null = convertToSpasmEventEnvelope(spasmEvent)

  if (!spasmEventEnvelope) return null

  const spasmEventEnvelopeWithTree: SpasmEventEnvelopeWithTreeV2 = {
    ...spasmEventEnvelope,
    type: "SpasmEventEnvelopeWithTreeV2"
  }

  if (
    "parent" in spasmEvent &&
    spasmEvent.parent &&
    hasValue(spasmEvent.parent) &&
    "event" in spasmEvent.parent &&
    spasmEvent.parent.event &&
    hasValue(spasmEvent.parent.event) &&
    typeof(spasmEvent.parent.event) === "object"
  ) {
    const parentEventAsSpasmEnvelopeWithTree =
      convertToSpasmEventEnvelopeWithTree(
        spasmEvent.parent.event
      )
    if (parentEventAsSpasmEnvelopeWithTree) {
      spasmEventEnvelopeWithTree.parent = {
        ...spasmEvent.parent,
        event: parentEventAsSpasmEnvelopeWithTree
      }
    }
  }

  if (
    "root" in spasmEvent &&
    spasmEvent.root &&
    hasValue(spasmEvent.root) &&
    "event" in spasmEvent.root &&
    spasmEvent.root.event &&
    hasValue(spasmEvent.root.event) &&
    typeof(spasmEvent.root.event) === "object"
  ) {
    const rootEventAsSpasmEnvelopeWithTree =
      convertToSpasmEventEnvelopeWithTree(
        spasmEvent.root.event
      )
    if (rootEventAsSpasmEnvelopeWithTree) {
      spasmEventEnvelopeWithTree.root = {
        ...spasmEvent.root,
        event: rootEventAsSpasmEnvelopeWithTree
      }
    }
  }

  if (
    "children" in spasmEvent &&
    spasmEvent.children &&
    Array.isArray(spasmEvent.children)
  ) {
    spasmEventEnvelopeWithTree.children = spasmEvent.children
  }

  return spasmEventEnvelopeWithTree
}
