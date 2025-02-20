import {
  EventForSpasmid01,
  SpasmEventV2,
} from "./../types/interfaces.js";

import {
  isObjectWithValues,
  getHashOfString,
  normalizeText
} from "./../utils/utils.js";

import {
  convertToEventForSpasmid
} from "./../convert/convertToEventForSpasmid.js";

export const getSpasmId = (
  spasmEvent: SpasmEventV2,
  idVersion = "01"
): string | null => {
  if (idVersion === "01") {
    return getSpasmId01(spasmEvent)
  }
  return null
}

export const getSpasmId01 = (
  spasmEvent: SpasmEventV2
): string | null => {

  if (!isObjectWithValues(spasmEvent)) return null
  
  if (spasmEvent.type !== "SpasmEventV2") return null

  const eventForSpasmid: EventForSpasmid01 | null =
    convertToEventForSpasmid(spasmEvent, "01")

  if (!eventForSpasmid) return null

  const stringForId = JSON.stringify(eventForSpasmid)

  const normalizedStringForId =
    normalizeText(stringForId)

  // const hash = getHashOfString(stringForId)
  const hash = getHashOfString(normalizedStringForId)

  const spasmId = "spasmid01" + hash

  // TODO write test for double-signed events

  return spasmId
}
