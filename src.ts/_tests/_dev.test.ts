import {
  validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild,
  validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild,
  validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren,
} from "./_events-data.js"
import {
  copyOf, mergeSpasmEventsV2,
  // mergeSpasmEventsV2
} from "../utils/utils.js";
// import {convertToSpasm} from "../convert/convertToSpasm.js";
// import {
//   SpasmEventV2
// } from "../types/interfaces.js";

describe("convertToSpasm() tests for events with parent and root events", () => {
  test("mergeSpasmEventsV2() should merge events with children", () => {
    // const event1WithoutChildren = validDmpEventSignedClosedConvertedToSpasmV2
    const event1WithOneChild = validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild
    const event1WithAnotherChild = validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild
    const event1WithBothChildren = validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren
    // const test = mergeSpasmEventsV2([
    //   copyOf(event1WithOneChild),
    //   copyOf(event1WithAnotherChild)
    // ])
    // console.log("test:", test)
    // console.log("test.children:", test.children)
    expect(mergeSpasmEventsV2([
      copyOf(event1WithOneChild),
      copyOf(event1WithAnotherChild)
    ])).toStrictEqual(copyOf(event1WithBothChildren));
    // ])).not.toEqual(copyOf(event1WithBothChildren));
  });
});
