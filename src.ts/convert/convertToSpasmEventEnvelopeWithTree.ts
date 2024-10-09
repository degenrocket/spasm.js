import {
  CustomConvertToSpasmConfig,
  SpasmEventChildV2,
  SpasmEventEnvelopeV2,
  SpasmEventEnvelopeWithTreeChildV2,
  SpasmEventEnvelopeWithTreeV2,
  SpasmEventV2,
  UnknownEventV2
} from "../types/interfaces.js"
import {hasValue, isArrayWithValues, isObjectWithValues} from "../utils/utils.js"

import { convertToSpasm } from "./convertToSpasm.js"
import { convertToSpasmEventEnvelope } from "./convertToSpasmEventEnvelope.js"

export const convertManyToSpasmEventEnvelopeWithTree = (
  unknownEvents: UnknownEventV2[],
  envelopeVersion = "2.0.0"
): SpasmEventEnvelopeWithTreeV2[] | null => {
  try {
    if (!unknownEvents) return null
    if (!Array.isArray(unknownEvents)) return null
    if (!hasValue(unknownEvents)) return null
    const convertedEvents: SpasmEventEnvelopeWithTreeV2[] = []
    unknownEvents.forEach(event => {
      const convertedEvent = convertToSpasmEventEnvelopeWithTree(
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
export const convertToSpasmEventEnvelopeWithTree = (
  unknownEvent: UnknownEventV2,
  envelopeVersion = "2.0.0",
  depth: number = 0,
  maxDepth: number = 50
): SpasmEventEnvelopeWithTreeV2 | null => {
  // Maximum recursion depth to prevent stack overflow
  if (
    typeof(depth) !== "number" ||
    typeof(maxDepth) !== "number"
  ) { return null }
  const maxRecursionDepth = maxDepth ?? 10
  if (depth > maxRecursionDepth) {
    return null
  }

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
        spasmEventV2, envelopeVersion, depth, maxDepth
    )
    return SpasmEventEnvelopeV2
  }

  return null
}

export const convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2 = (
  spasmEvent: SpasmEventV2,
  envelopeVersion = "2.0.0",
  depth: number = 0,
  maxDepth: number = 50
): SpasmEventEnvelopeWithTreeV2 | null => {
  // Maximum recursion depth to prevent stack overflow
  if (
    typeof(depth) !== "number" ||
    typeof(maxDepth) !== "number"
  ) { return null }
  const maxRecursionDepth = maxDepth ?? 10
  if (depth > maxRecursionDepth) {
    return null
  }

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
        spasmEvent.parent.event, envelopeVersion,
        depth + 1, maxDepth
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
        spasmEvent.root.event, envelopeVersion,
        depth + 1, maxDepth
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
    const originalChildren: SpasmEventChildV2[] =
      spasmEvent.children
    const convertedChildren: SpasmEventEnvelopeWithTreeChildV2[] = []

    originalChildren.forEach((originalChild) => {
      if (
        originalChild.event &&
        isObjectWithValues(originalChild.event)
      ) {
        const convertedChildEvent: SpasmEventEnvelopeWithTreeV2 | null =
          convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2(
            originalChild.event, envelopeVersion,
            depth + 1, maxDepth
        )
        if (
          convertedChildEvent &&
          isObjectWithValues(convertedChildEvent)
        ) {
          convertedChildren.push({
            ...originalChild,
            event: convertedChildEvent
          })
        }
      }
    })
    if (isArrayWithValues(convertedChildren)) {
      spasmEventEnvelopeWithTree.children = convertedChildren
    }
  }

  return spasmEventEnvelopeWithTree
}
