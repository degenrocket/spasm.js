import {
  UnknownEventV2,
  // EventForSpasmid01,
  SpasmEventV2,
  // SpasmEventBodyAuthorV2,
  // SpasmEventBodyHostV2,
  // SpasmEventBodyLinkV2,
  // SpasmEventMentionV2,
  SpasmEventBodyReferenceV2,
  SpasmEventBodyParentV2,
  SpasmEventDatabaseV2,
  CustomConvertToSpasmConfig,
  // SpasmEventIdV2,
} from "./../types/interfaces.js";

import { convertToSpasm } from "./convertToSpasm.js"

import {
  isObjectWithValues,
  keepTheseKeysInObject,
  keepTheseKeysInObjectsInArray,
} from "./../utils/utils.js";

// Spasm V2
export const convertToSpasmEventDatabase = (
  unknownEvent: UnknownEventV2,
  dbVersion = "2.0.0"
): SpasmEventDatabaseV2 | null => {

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

  if (dbVersion === "2.0.0") {
    const spasmEventDatabaseV2 =
      convertSpasmEventV2ToSpasmEventDatabaseV2(
        spasmEventV2
    )
    return spasmEventDatabaseV2
  }

  return null
}

export const convertSpasmEventV2ToSpasmEventDatabaseV2 = (
  spasmEvent: SpasmEventV2
): SpasmEventDatabaseV2 | null => {

  if (!isObjectWithValues(spasmEvent)) return null
  
  if (spasmEvent.type !== "SpasmEventV2") return null

  const spasmEventDatabase: SpasmEventDatabaseV2 = {
    type: "SpasmEventDatabaseV2"
  }

  // if (spasmEvent.root) {
  //   spasmEventDatabase.root = spasmEvent.root
  // }

  if (spasmEvent.parent) {
    // Only 'ids' and 'marker' of a parent are used for Spasm ID
    const cleanParent: SpasmEventBodyParentV2 = 
      keepTheseKeysInObject(
        spasmEvent.parent, ["ids", "marker"]
      ) as SpasmEventBodyParentV2

    spasmEventDatabase.parent = cleanParent
  }

  if (spasmEvent.action) {
    spasmEventDatabase.action = spasmEvent.action
  }

  if (spasmEvent.title) {
    spasmEventDatabase.title = spasmEvent.title
  }

  if (spasmEvent.content) {
    spasmEventDatabase.content = spasmEvent.content
  }

  if (spasmEvent.timestamp) {
    spasmEventDatabase.timestamp = spasmEvent.timestamp
  }

  if (spasmEvent.authors) {
    spasmEventDatabase.authors = spasmEvent.authors
  }

  if (spasmEvent.categories) {
    spasmEventDatabase.categories = spasmEvent.categories
  }

  if (spasmEvent.tips) {
    spasmEventDatabase.tips = spasmEvent.tips
  }

  if (spasmEvent.hosts) {
    spasmEventDatabase.hosts = spasmEvent.hosts
  }

  if (spasmEvent.links) {
    spasmEventDatabase.links = spasmEvent.links
  }

  if (spasmEvent.keywords) {
    spasmEventDatabase.keywords = spasmEvent.keywords
  }

  if (spasmEvent.tags) {
    spasmEventDatabase.tags = spasmEvent.tags
  }

  if (spasmEvent.medias) {
    spasmEventDatabase.medias = spasmEvent.medias
  }

  if (spasmEvent.references) {
    const cleanReferences = keepTheseKeysInObjectsInArray(
      spasmEvent.references, ["ids", "marker"]
    ) as SpasmEventBodyReferenceV2[]

    spasmEventDatabase.references = cleanReferences
  }

  if (spasmEvent.mentions) {
    spasmEventDatabase.mentions = spasmEvent.mentions
  }

  if (spasmEvent.proofs) {
    spasmEventDatabase.proofs = spasmEvent.proofs
  }

  if (spasmEvent.license) {
    spasmEventDatabase.license = spasmEvent.license
  }

  if (spasmEvent.language) {
    spasmEventDatabase.language = spasmEvent.language
  }

  if (spasmEvent.extra) {
    spasmEventDatabase.extra = spasmEvent.extra
  }

  if (spasmEvent.pows) {
    spasmEventDatabase.pows = spasmEvent.pows
  }

  if (spasmEvent.ids) {
    spasmEventDatabase.ids = spasmEvent.ids
  }

  if (spasmEvent.signatures) {
    spasmEventDatabase.signatures = spasmEvent.signatures
  }

  if (spasmEvent.siblings) {
    spasmEventDatabase.siblings = spasmEvent.siblings
  }

  if (spasmEvent.source) {
    spasmEventDatabase.source = spasmEvent.source
  }

  if (spasmEvent.sharedBy) {
    spasmEventDatabase.sharedBy = spasmEvent.sharedBy
  }

 /**
  * SpasmEventDatabaseV2 is used for saving an event into the
  * database, so 'stats' should not be included because they
  * should be calculated separately on each instance even if
  * the instance syncs reactions with other instances (not
  * recommended).
  * Database-related data should not be included either, e.g.,
  * db.key, db.addedTimestamp, updatedTimestamp, db.table.
  */
  // if (spasmEvent.stats) {
  //   spasmEventDatabase.stats = spasmEvent.stats
  // }

  return spasmEventDatabase
}
