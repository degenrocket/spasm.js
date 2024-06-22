import {
  UnknownPostOrEvent, UnknownEvent, NostrSpasmEvent,
  NostrSpasmEventSignedOpened, NostrSpasmVersion,
  LinkObject,
  SpasmEventIdFormatV2,
  SpasmEventAddressFormatV2,
  SpasmEventSignatureFormatV2,
  SpasmEventV2,
  SpasmEventAuthorV2,
  SpasmEventBodyHostV2,
  SpasmEventMediaV2,
  SpasmEventIdV2,
  SpasmEventHashV2,
  SpasmEventLinkV2,
  SpasmEventBodyReferenceV2,
  SpasmEventAddressV2,
  // SpasmEventUsernameV2,
  SpasmEventBodyParentV2
} from "./../types/interfaces.js"

/*
 * Using sha256 from 'js-sha256' npm package, because
 * built-in 'crypto' module works only in a server-side
 * Node.js environment, not on the client-side (browser).
 */
import { sha256 } from 'js-sha256'

// Filter out undefined, null, 0, '', false, NaN, {}, []
// Keep {a: null}, {b: undefined}
// Examples:
// hasValue() // false
// hasValue(undefined)) // false
// hasValue(null) // false
// hasValue(0) // false
// hasValue('') // false
// hasValue(false) // false
// hasValue(NaN) // false
// hasValue([]) // false
// hasValue({}) // false
// hasValue({a:null}) // true
// hasValue({b:undefined}) // true
// hasValue({c:1}) // true
// hasValue(new Date()) // true
// hasValue([0]) // false
// hasValue([null]) // false
// hasValue([undefined]) // false
// hasValue([[undefined], [0], [null, NaN], '']) // false
// hasValue([[undefined], [0], [null, 1], '']) // true
// hasValue([[undefined], 1, [null, NaN], '']) // true
// hasValue([[null], 0, [true, NaN]]) // true
// hasValue([[null], 0, ['hello', NaN]]) // true
export const hasValue = (el?: any) => {
  // Filter out undefined, null, 0, '', false, NaN
  if (!el) return false

  // Filter out an empty object
  if (
    el // <- null and undefined check
    && Object.keys(el).length === 0
    && Object.getPrototypeOf(el) === Object.prototype
  ) {return false}

  // Filter out an empty array
  if (Array.isArray(el) && !el?.length) {return false}

  // Recursively check for at least one value inside an array
  if (Array.isArray(el) && el?.length) {
    let hasAtLeastOneValue: boolean = false
    el.forEach(function (e) {
      if (hasValue(e)) {
        hasAtLeastOneValue = true
      }
    })

    if (hasAtLeastOneValue) {
      return true
    } else {
      // console.error("ERROR. There are no values in the array", el)
      return false
    }
  }

  return true
}

export const isObjectWithValues = (val: any): boolean => {
  if (!val) return false
  if (Array.isArray(val)) return false
  if (typeof(val) !== "object") return false
  if (Object.keys(val).length === 0) return false

  return true
}

export const extractVersion = (
  versionString: string
): string => {
  if (
    !versionString ||
    typeof(versionString) !== "string"
  ) return ""

  if (versionString.startsWith("dmp_v")) {
    return versionString.substring(5)
  }

  return ""
}

export const extractSealedEvent = (
  unknownPostOrEvent: UnknownPostOrEvent
): UnknownEvent | false => {
  if (!isObjectWithValues(unknownPostOrEvent)) return false

  let signedObject: UnknownEvent | false = false

  if (
    unknownPostOrEvent &&
    typeof(unknownPostOrEvent) === "object" &&
    'signed_message' in unknownPostOrEvent &&
    unknownPostOrEvent['signed_message'] &&
    typeof(unknownPostOrEvent['signed_message'] === "string")
  ) {
    signedObject = JSON.parse(unknownPostOrEvent['signed_message'])

  } else if (
    unknownPostOrEvent &&
    typeof(unknownPostOrEvent) === "object" &&
    'signedString' in unknownPostOrEvent &&
    unknownPostOrEvent['signedString'] &&
    typeof(unknownPostOrEvent['signedString'] === "string")
  ) {
    signedObject = JSON.parse(unknownPostOrEvent['signedString'])
  }

  return signedObject
}

export const toBeTimestamp = (time: any): number | undefined => {
 const date = new Date(time);
 const timestamp = date.getTime();

  // Check if the timestamp is NaN, indicating an invalid date
  if (Number.isNaN(timestamp)) {
    return undefined;
  }

  // Optional
  // Standardize the timestamp to 10 characters (seconds)
  // by rounding down the timestamp to the nearest second.
  // if (timestamp.toString().length > 10) {
  //   timestamp = Math.floor(timestamp / 1000) * 1000;
  // }

 return timestamp;
};

export const getNostrSpasmVersion = (
  event: NostrSpasmEvent | NostrSpasmEventSignedOpened,
): NostrSpasmVersion | null => {
  let nostrSpasmVersion: NostrSpasmVersion | null = null

  if (
    event.tags && Array.isArray(event.tags)
  ) {
    event.tags.forEach(function (tag) {
      if (
        Array.isArray(tag) && tag[0] === "nostr_spasm_version"
      ) {
        nostrSpasmVersion = tag[1]
      } else if (
        Array.isArray(tag) && tag[0] === "spasm_version"
      ) {
        nostrSpasmVersion = tag[1]
      }
    })
  }
  return nostrSpasmVersion
}

// Example usage
// getSchemeFromUrl('https://example.com/news') // return 'https'
// getSchemeFromUrl('http://example.com') // return 'http'
// getSchemeFromUrl('ftp://example.com') // return 'ftp'
// getSchemeFromUrl('mailto://...') // return 'mailto'
// getSchemeFromUrl('ipfs://123abc') // return 'ipfs'
// export const getSchemeFromUrl = (url: any) => {
//   if (!url || typeof(url) !== "string") return ""
//   try {
//     const urlObject = new URL(url);
//     return urlObject.protocol.slice(0, -1); // Remove the trailing colon
//   } catch (error) {
//     console.log('Invalid URL:', url);
//     return "";
//   }
// }

export const isValidUrl = (value?: any): boolean => {
  if (!value) return false
  try { 
      // new URL() constructor is less vulnerable to ReDoS attacks
      // because it's a built-it JS function that doesn't use regex
      new URL(value); 
      return true; 
  }
  catch(e) { 
      return false; 
  }
}

export const createLinkObjectFromUrl = (
  url: any,
  key?: any
): LinkObject | null => {
  if (!url || typeof(url) !== "string") return null

  try {
    const urlObject = new URL(url);

    const linkObject: LinkObject = {
      value: url,
      // protocol: urlObject.protocol.slice(0, -1),
      // host: urlObject.host,
      // path: urlObject.pathname,
      // search: urlObject.search,
    }

    if (urlObject.protocol) {
      linkObject.protocol = urlObject.protocol.slice(0, -1)
    }

    if (urlObject.origin) {
      linkObject.origin = urlObject.origin
    }

    if (urlObject.host) {
      linkObject.host = urlObject.host
    }

    if (
      urlObject.pathname &&
      typeof(urlObject.pathname) === "string" // &&
      // urlObject.pathname.length > 1
    ) {
      linkObject.pathname = urlObject.pathname
    }

    if (
      urlObject.search &&
      typeof(urlObject.search) === "string" // &&
      // urlObject.search.length > 1
    ) {
      linkObject.search = urlObject.search
    }

    if (urlObject.port) {
      linkObject.port = urlObject.port
    }

    if (urlObject.hash) {
      linkObject.hash = urlObject.hash
    }

    if (
      key &&
      (typeof(key) === "string" || typeof(key) === "number")
    ) {
      linkObject.originalProtocolKey = key
    }

    return linkObject

  } catch (error) {
    console.log('Invalid URL:', url);
    return null;
  }
}

export const getFormatFromValue = (
  value?: string | number
): SpasmEventIdFormatV2 | SpasmEventSignatureFormatV2 | undefined => {
  let format: SpasmEventIdFormatV2 | undefined =
    undefined

  if (!value) return format
  if (typeof(value) !== "string" && typeof(value) !== "number") {
    return format
  }

  if (typeof(value) === "number") {
    return format = { name: "number" }
  }

  if (value && typeof(value) === "string") {

    // Spasm ID
    if (value.length === 64 + 9 && value.startsWith("spasmid")) {
      const version = value.slice(7,9)
      format = { name: "spasmid", version: version }
      return format
    }

    // Dmp ID (signature)
    if (value.length === 132 && value.startsWith("0x")) {
      format = { name: "ethereum-sig" }
      return format
    }

    // Nostr ID
    if (value.length === 63 && value.startsWith("note")) {
      format = { name: "nostr-note" }
      return format
    }

    if (value.length === 68 && value.startsWith("nevent")) {
      format = { name: "nostr-nevent" }
      return format
    }

    // Spasm signer
    // if (address.length === 64 + 9 && address.startsWith("spasmer")) {
    //   const version = address.slice(7,9)
    //   format = { name: "spasmer", version: version }
    //   return format
    // }

    // Ethereum signer
    if (value.length === 42 && value.startsWith("0x")) {
      format = { name: "ethereum-pubkey" }
      return format
    }

    // Nostr signer
    if (value.length === 63 && value.startsWith("npub")) {
      format = { name: "nostr-npub" }
      return format
    }

    // url
    if (isValidUrl(value)) {
      format = { name: "url" }
      return format
    }

    if (
      value.length === 64 &&
      !value.startsWith("note") &&
      !value.startsWith("nevent") &&
      !value.startsWith("npub")
    ) {
      format = { name: "nostr-hex" }
      return format
    }

  }

  if (typeof(value) === "string") {
    return format = { name: "string" }
  }

  return format
}

export const getFormatFromId = (
  id: string | number
): SpasmEventIdFormatV2 => {
  return getFormatFromValue(id) as SpasmEventIdFormatV2
}

export const getFormatFromAddress = (
  address: string | number
): SpasmEventAddressFormatV2 => {
  return getFormatFromValue(address) as SpasmEventAddressFormatV2
}

export const getFormatFromSignature = (
  address: string | number
): SpasmEventSignatureFormatV2 => {
  return getFormatFromValue(address) as SpasmEventSignatureFormatV2
}

export const getHashOfString = (
  string: string,
  algorithm = "sha256"
): string => {
  if (typeof(string) !== "string") return ""

  if (algorithm === "sha256") {
    return sha256(string)
  }

  return ""
}

// Keep only specified keys in an object.
export const keepTheseKeysInObject = (
  obj: Record<string, any>, keys: string[]
): Partial<Record<string, any>> => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
}

// Keep only specified keys in each object of an array.
export const keepTheseKeysInObjectsInArray = (
  array: Record<string, any>[], keys: string[]
): Partial<Record<string, any>[]> => {
  return array.map(obj => keepTheseKeysInObject(obj, keys));
}

// This function only sorts string and number values.
export const sortArrayOfStringsAndNumbers = (
  array: any[]
): any[] => {
  // Separate values into valid and invalid categories.
  const {
    validValues, invalidValues
  } = array.reduce<{
    validValues: any[]; invalidValues: any[];
  }>(
    (acc, value) => {
      if (
        typeof value === 'string' ||
        typeof value === 'number'
      ) {
        acc.validValues.push(value)
      } else {
        acc.invalidValues.push(value)
      }
      return acc
    },
    { validValues: [], invalidValues: [] }
  )

  // Sort the valid values
  const sortedValidValues = validValues.sort(
    (a, b) => String(a).localeCompare(String(b))
  )

  // Combine sorted valid values with invalid values
  const result = [...sortedValidValues,...invalidValues]

  return result
}

export const sortArrayOfObjects = (
  objects: any[],
  sortBy: string | string[] = ["id"]
): any[] => {
  if (
    !objects ||
    !Array.isArray(objects) ||
    !objects[0]
  ) {
    return []
  }
  // Ensure sortBy is always treated as an array
  const sortedBy = Array.isArray(sortBy)? sortBy : [sortBy]

  // Separate objects into valid and invalid categories based
  // on the existence of the specified property(ies)
  const {
    validObjects, invalidValues
  } = objects.reduce<{
    validObjects: SpasmEventV2[]; invalidValues: any[];
  }>(
    (acc, item) => {
      let isValid: boolean = false

      // Only one prop should exist in item in order
      // to make it a valid item.
      sortedBy.forEach((key) => {
        if (
          typeof(item) === 'object' && item &&
          key in item && item[key] &&
          (
            typeof(item[key]) === "string" ||
            typeof(item[key]) === "number"
          )
        ) {
          isValid = true
        }
      })

      if (isValid) {
          acc.validObjects.push(item as SpasmEventV2);
      } else {
          acc.invalidValues.push(item);
      }
      return acc;
    },
    { validObjects: [], invalidValues: [] }
  );

  // Sort the valid objects by the specified property(ies)
  const sortedValidObjects = validObjects.sort((a, b) => {
    for (const key of sortedBy) {
      const aValue =
        typeof a[key] === 'string'? a[key] : String(a[key]);
      const bValue =
        typeof b[key] === 'string'? b[key] : String(b[key]);
      const compareResult = aValue.localeCompare(bValue);
      if (compareResult!== 0) {
          return compareResult;
      }
    }
    return 0; // Equal
  });

  const sortedInvalidValues = sortArrayOfStringsAndNumbers(
    invalidValues
  )

  // Combine sorted valid objects with invalid objects
  const result = [...sortedValidObjects, ...sortedInvalidValues]

  return result;
}

export const sortAuthorsForSpasmEventV2 = (
  authors: SpasmEventAuthorV2[],
): SpasmEventAuthorV2[] => {

  // Clean and sort addresses
  authors.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'addresses' in author && author.addresses &&
      Array.isArray(author.addresses) &&
      author.addresses[0]
    ) {
      // Clean addresses to keep only  'value' and 'format' keys
      // and remove 'verified' and 'hosts' keys.
      author.addresses = keepTheseKeysInObjectsInArray(
        author.addresses, ["value", "format"]
      ) as SpasmEventAddressV2[]

      // Sort addresses
      author.addresses = sortArrayOfObjects(
        author.addresses, "value"
      )
    }
  })

  // Clean and sort usernames
  authors.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'usernames' in author && author.usernames &&
      Array.isArray(author.usernames) &&
      author.usernames[0]
    ) {
      // There is no need to clean usernames because all fields
      // should be calculated for the Spasm ID 01.

      // Sort usernames
      author.usernames = sortArrayOfObjects(
        author.usernames, "value"
      )
    }
  })


  let authorsWithAddress: SpasmEventAuthorV2[] = []
  // Authors without address are used temporary until we split
  // them further depending on whether they have usernames.
  let authorsWithoutAddress: any[] = []
  let authorsWithoutAddressWithUsername: SpasmEventAuthorV2[] = []
  let authorsWithoutAddressWithoutUsername: any[] = []

  authors.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'addresses' in author && author.addresses &&
      Array.isArray(author.addresses) && author.addresses[0] &&
      author.addresses[0].value &&
      (
        typeof(author.addresses[0].value) === "string" ||
        typeof(author.addresses[0].value) === "number"
      )
    ) {
      authorsWithAddress.push(author)
    } else {
      authorsWithoutAddress.push(author)
    }
  })

  authorsWithoutAddress.forEach(author => {
    if (
      author && typeof(author) === "object" &&
      'usernames' in author && author.usernames &&
      Array.isArray(author.usernames) && author.usernames[0] &&
      author.usernames[0].value &&
      (
        typeof(author.usernames[0].value) === "string" ||
        typeof(author.usernames[0].value) === "number"
      )
    ) {
      authorsWithoutAddressWithUsername.push(author)
    } else {
      authorsWithoutAddressWithoutUsername.push(author)
    }
  })

  // Sort all 3 arrays
  const sortedAuthorsWithAddress: SpasmEventAuthorV2[] =
    sortArrayOfObjectsByKeyValue(
      authorsWithAddress, "addresses"
  ) as SpasmEventAuthorV2[]

  const sortedAuthorsWithoutAddressWithUsername: SpasmEventAuthorV2[] =
    sortArrayOfObjectsByKeyValue(
      authorsWithoutAddressWithUsername, "usernames"
  ) as SpasmEventAuthorV2[]

  const sortedAuthorsWithoutAddressWithoutUsername: any[] =
    sortArrayOfObjects(
      authorsWithoutAddressWithoutUsername, ["id"]
  )

  const result = [
    ...sortedAuthorsWithAddress,
    ...sortedAuthorsWithoutAddressWithUsername,
    ...sortedAuthorsWithoutAddressWithoutUsername
  ]

  return result
}

export const sortAuthorsForSpasmid01 = sortAuthorsForSpasmEventV2

export const sortArrayOfObjectsByKeyValue = (
  objects: SpasmEventAuthorV2[] | SpasmEventMediaV2[],
  key: string
): any[] => {
  const sortedObjects = objects.sort((a, b) => {
    let aValue = ""
    let bValue = ""

    if (
      a[key] && a[key][0] &&
      a[key][0].value
    ) {
      if (typeof(a[key][0].value) === 'string') {
        aValue = a[key][0].value
      } else if ( typeof(a[key][0].value) === 'number') {
        aValue = String(a[key][0].value);
      }
    }

    if (
      b[key] && b[key][0] &&
      b[key][0].value
    ) {
      if (typeof(b[key][0].value) === 'string') {
        bValue = b[key][0].value
      } else if ( typeof(b[key][0].value) === 'number') {
        bValue = String(b[key][0].value);
      }
    }

    const compareResult = aValue.localeCompare(bValue);
    if (compareResult!== 0) {
        return compareResult;
    }

    return 0; // Equal
  });

  return sortedObjects
}

export const sortHostsForSpasmEventV2 = (
  hosts: SpasmEventBodyHostV2[],
): SpasmEventBodyHostV2[] => {
  if (
    !hosts ||
    !Array.isArray(hosts) ||
    !hosts[0]
  ) {
    return hosts
  }

  const sortedHosts: SpasmEventBodyHostV2[] =
    sortArrayOfObjects(
    hosts, "value"
  )
  return sortedHosts
}

export const sortHostsForSpasmid01 = sortHostsForSpasmEventV2

export const sortLinksForSpasmEventV2 = sortHostsForSpasmEventV2

export const sortLinksForSpasmid01 = sortLinksForSpasmEventV2

export const sortMediasForSpasmid01 = (
  medias: any,
): SpasmEventMediaV2[] => {

  if (!medias || !Array.isArray(medias)) return []

  // Clean and sort IDs
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'ids' in media && media.ids &&
      Array.isArray(media.ids) &&
      media.ids[0]
    ) {
      // Clean ids to keep only  'value' key
      media.ids = keepTheseKeysInObjectsInArray(
        media.ids, ["value"]
      ) as SpasmEventIdV2[]

      // Sort ids
      media.ids = sortArrayOfObjects(
        media.ids, "value"
      )
    }
  })

  // Clean and sort hashes
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'hashes' in media && media.hashes &&
      Array.isArray(media.hashes) &&
      media.hashes[0]
    ) {
      // Clean hashes to keep only  'value' key
      media.hashes = keepTheseKeysInObjectsInArray(
        media.hashes, ["value"]
      ) as SpasmEventHashV2[]

      // Sort hashes
      media.hashes = sortArrayOfObjects(
        media.hashes, "value"
      )
    }
  })

  // Clean and sort links
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'links' in media && media.links &&
      Array.isArray(media.links) &&
      media.links[0]
    ) {
      // Clean links to keep only  'value' key
      media.links = keepTheseKeysInObjectsInArray(
        media.links, ["value"]
      ) as SpasmEventLinkV2[]

      // Sort links
      media.links = sortArrayOfObjects(
        media.links, "value"
      )
    }
  })

  // mediasWithIds might also have hashes and links
  let mediasWithIds: SpasmEventMediaV2[] = []
  let mediasWithoutIds: any[] = []
  // mediasWithHashes might also have links, but no ids
  let mediasWithHashes: SpasmEventMediaV2[] = []
  let mediasWithoutIdsHashes: any[] = []
  // mediasWithLinks only has links, but no ids and hashes
  let mediasWithLinks: SpasmEventMediaV2[] = []
  let mediasWithoutIdsHashesLinks: any[] = []

  // Sort medias by ids
  medias.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'ids' in media && media.ids &&
      Array.isArray(media.ids) && media.ids[0] &&
      media.ids[0].value &&
      (
        typeof(media.ids[0].value) === "string" ||
        typeof(media.ids[0].value) === "number"
      )
    ) {
      mediasWithIds.push(media)
    } else {
      mediasWithoutIds.push(media)
    }
  })

  // Sort medias by hashes
  mediasWithoutIds.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'hashes' in media && media.hashes &&
      Array.isArray(media.hashes) && media.hashes[0] &&
      media.hashes[0].value &&
      (
        typeof(media.hashes[0].value) === "string" ||
        typeof(media.hashes[0].value) === "number"
      )
    ) {
      mediasWithHashes.push(media)
    } else {
      mediasWithoutIdsHashes.push(media)
    }
  })

  // Sort medias by links
  mediasWithoutIdsHashes.forEach(media => {
    if (
      media && typeof(media) === "object" &&
      'links' in media && media.links &&
      Array.isArray(media.links) && media.links[0] &&
      media.links[0].value &&
      (
        typeof(media.links[0].value) === "string" ||
        typeof(media.links[0].value) === "number"
      )
    ) {
      mediasWithLinks.push(media)
    } else {
      mediasWithoutIdsHashesLinks.push(media)
    }
  })

  const mediasOther: any[] = mediasWithoutIdsHashesLinks

  // Sort all 3 arrays
  const sortedMediasWithIds: SpasmEventMediaV2[] =
    sortArrayOfObjectsByKeyValue(
      mediasWithIds, "ids"
  ) as SpasmEventMediaV2[]

  const sortedMediasWithHashes: SpasmEventMediaV2[] =
    sortArrayOfObjectsByKeyValue(
      mediasWithHashes, "hashes"
  ) as SpasmEventMediaV2[]

  const sortedMediasWithLinks: SpasmEventMediaV2[] =
    sortArrayOfObjectsByKeyValue(
      mediasWithLinks, "links"
  ) as SpasmEventMediaV2[]

  const sortedMediasOther: any[] =
    sortArrayOfObjects(mediasOther, ["id"])

  const result = [
    ...sortedMediasWithIds,
    ...sortedMediasWithHashes,
    ...sortedMediasWithLinks,
    ...sortedMediasOther
  ]

  return result
}

// Deprecated sortMediasForSpasmEventV2 because we only keep
// a 'value' key to calculate Spasm ID 01.
// export const sortMediasForSpasmid01 = sortMediasforSpasmEventV2

export const sortReferencesForSpasmid01 = (
  references: SpasmEventBodyReferenceV2[]
): SpasmEventBodyReferenceV2[] => {

  if (!references || !Array.isArray(references)) return []

  // Clean and sort IDs
  references.forEach(reference => {
    if (
      reference && typeof(reference) === "object" &&
      'ids' in reference && reference.ids &&
      Array.isArray(reference.ids) &&
      reference.ids[0]
    ) {
      // Clean ids to keep only  'value' key
      reference.ids = keepTheseKeysInObjectsInArray(
        reference.ids, ["value"]
      ) as SpasmEventIdV2[]

      // Sort ids
      reference.ids = sortArrayOfObjects(
        reference.ids, "value"
      )
    }
  })

  // Sort references based on IDs
  const sortedReferences: SpasmEventBodyReferenceV2[] =
    sortArrayOfObjectsByKeyValue(
      references, "ids"
  ) as SpasmEventBodyReferenceV2[]

  return sortedReferences
}

export const sortParentForSpasmid01 = (
  parent: SpasmEventBodyParentV2
): SpasmEventBodyParentV2 => {

  if (!parent || typeof(parent) !== "object") return parent

  // Clean and sort IDs
  if (
    parent && typeof(parent) === "object" &&
    'ids' in parent && parent.ids &&
    Array.isArray(parent.ids) &&
    parent.ids[0]
  ) {
    // Clean ids to keep only 'value' key
    parent.ids = keepTheseKeysInObjectsInArray(
      parent.ids, ["value"]
    ) as SpasmEventIdV2[]

    // Sort ids
    parent.ids = sortArrayOfObjects(
      parent.ids, "value"
    )
  }

  return parent
}

export const sortTagsForSpasmid01 = (
  tags: any[][]
): any[][] => {

  if (!tags || !Array.isArray(tags)) return [[]]
 
 /**
  * Tags are an array of arrays (e.g., Nostr tags).
  * Each tag is an array with any number of elements.
  * Some tags will have the same one-letter first element,
  * so sorting by the first element is not a good approach.
  * Instead, the current sorting logic for spasmid01 is
  * to find the length of the longest tag array (e.g., 10),
  * and start sorting tags by the 10th element, then
  * by the 9th element, and continue until sorting is
  * done by the first element.
  *
  * Each tag is an array of values. However, values inside
  * each tag should not be sorted as it can affect the
  * intention of the event. For example, the order of an
  * element in a Nostr tag array has a meaning.
  */

  const sortTagsByElementNumber = (
    elementNumber: number = 0
  ): void => {
    tags = tags.sort((a, b) => {
      const key = elementNumber
      let aValue = ""
      let bValue = ""

      if (a[key]) {
        if (typeof(a[key]) === 'string') {
          aValue = a[key]
        } else if (typeof(a[key]) === 'number') {
          aValue = String(a[key])
        }
      }

      if (b[key]) {
        if (typeof(b[key]) === 'string') {
          bValue = b[key]
        } else if (typeof(b[key]) === 'number') {
          bValue = String(b[key])
        }
      }

      const compareResult = aValue.localeCompare(bValue);
      if (compareResult!== 0) {
          return compareResult;
      }

      return 0; // Equal
    });
  }

  let longestTagArrayLength = 1

  // Find the longest array (tag) to be used for sorting.
  tags.forEach(tag => {
    if (
      tag && Array.isArray(tag) &&
      tag.length > longestTagArrayLength
    ) {
      longestTagArrayLength = tag.length
    }
  })

  for (let i = longestTagArrayLength; i >= 0; i--) {
    sortTagsByElementNumber(i)
  }

  return tags
}

export const markSpasmEventAddressAsVerified = (
  spasmEvent: SpasmEventV2,
  verifiedAddress: string | number,
  version: string = "2.0.0"
): void => {
  if (version === "2.0.0") {
    if (spasmEvent.authors) {
      spasmEvent.authors.forEach(author => {
        if (author.addresses) {
          author.addresses.forEach(address => {
            if (address.value === verifiedAddress) {
              address.verified = true;
            }
          });
        }
      });
    }
  }
}

