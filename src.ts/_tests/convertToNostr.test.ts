import {
//   addEventsToTree,
  copyOf, extractSpasmId01, mergeSpasmEventsV2,
} from "../utils/utils.js";
import {convertToSpasm} from "../convert/convertToSpasm.js";
import {convertToNostr} from "../convert/convertToNostr.js";
import {
  validNostrSpasmEvent,
  validSpasmEventBodyV2ReplyWithTwoSigners,
  validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2,
  validSpasmEventBodyV2WithOneNostrSigner,
  validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2
} from "./_events-data.js";

describe("convertToNostr() different tests", () => {
  test("convertToNostr() for single-signer unsigned post event", () => {
    const spasmBodyNostrSigner =
      copyOf(validSpasmEventBodyV2WithOneNostrSigner)
    const spasmBodyNostrSignerConvertedToNostr =
      convertToNostr(spasmBodyNostrSigner)
    const spasmBodyNostrSignerConvertedToSpasmEventV2 =
      convertToSpasm(spasmBodyNostrSigner)
    const spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2 =
      convertToSpasm(spasmBodyNostrSignerConvertedToNostr!)
    const merged = mergeSpasmEventsV2([
      copyOf(spasmBodyNostrSignerConvertedToSpasmEventV2),
      copyOf(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2)
    ])
    const mergedWithDifferent = mergeSpasmEventsV2([
      copyOf(spasmBodyNostrSignerConvertedToSpasmEventV2),
      copyOf(validNostrSpasmEvent)
    ])

    expect(spasmBodyNostrSignerConvertedToNostr).toStrictEqual(
      copyOf(
        validSpasmEventBodyV2WithOneNostrSignerConvertedToNostrSpasmEventV2
      )
    )

    const id1 = extractSpasmId01(spasmBodyNostrSignerConvertedToSpasmEventV2!)
    const id2 = extractSpasmId01(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2!)
    const idMerged = extractSpasmId01(merged!)
    const idDifferent = extractSpasmId01(
      copyOf(validNostrSpasmEvent)
    )

    expect(id1).toStrictEqual(id2)
    expect(id1).toStrictEqual(idMerged)
    expect(id1).not.toEqual(idDifferent)
    expect(merged?.siblings?.length).toStrictEqual(2)
    expect(merged?.siblings?.[0].type)
      .toStrictEqual("SiblingSpasmV2")
    expect(merged?.siblings?.[1].type)
      .toStrictEqual("SiblingNostrSpasmV2")
    expect(
      mergedWithDifferent?.siblings?.length
    ).toStrictEqual(1)
  });

  test("convertToNostr() for single-signer unsigned reply event", () => {
    const spasmBodyNostrSigner =
      copyOf(validSpasmEventBodyV2ReplyWithTwoSigners)
    const spasmBodyNostrSignerConvertedToNostr =
      convertToNostr(spasmBodyNostrSigner)
    const spasmBodyNostrSignerConvertedToSpasmEventV2 =
      convertToSpasm(spasmBodyNostrSigner)
    const spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2 =
      convertToSpasm(spasmBodyNostrSignerConvertedToNostr!)
    const merged = mergeSpasmEventsV2([
      copyOf(spasmBodyNostrSignerConvertedToSpasmEventV2),
      copyOf(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2)
    ])
    const mergedWithDifferent = mergeSpasmEventsV2([
      copyOf(spasmBodyNostrSignerConvertedToSpasmEventV2),
      copyOf(validNostrSpasmEvent)
    ])

    expect(spasmBodyNostrSignerConvertedToNostr).toStrictEqual(
      copyOf(
        validSpasmEventBodyV2ReplyWithTwoSignersConvertedToNostrSpasmEventV2
      )
    )

    const id1 = extractSpasmId01(spasmBodyNostrSignerConvertedToSpasmEventV2!)
    const id2 = extractSpasmId01(spasmBodyNostrSignerConvertedToNostrAndThenToSpasmEventV2!)
    const idMerged = extractSpasmId01(merged!)
    const idDifferent = extractSpasmId01(
      copyOf(validNostrSpasmEvent)
    )

    expect(id1).toStrictEqual(id2)
    expect(id1).toStrictEqual(idMerged)
    expect(id1).not.toEqual(idDifferent)
    expect(merged?.siblings?.length).toStrictEqual(2)
    expect(merged?.siblings?.[0].type)
      .toStrictEqual("SiblingSpasmV2")
    expect(merged?.siblings?.[1].type)
      .toStrictEqual("SiblingNostrSpasmV2")
    expect(
      mergedWithDifferent?.siblings?.length
    ).toStrictEqual(1)
  });
});
