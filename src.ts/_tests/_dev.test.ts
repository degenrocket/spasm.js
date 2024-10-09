import {
  validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent,
  validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse,
  validPostWithNostrReplyToDmpEventConvertedToSpasmV2,
  validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2,
} from "./_events-data.js"
import {
  addEventsToTree,
  copyOf,
} from "../utils/utils.js";
// import {convertToSpasm} from "../convert/convertToSpasm.js";
// import {
//   SpasmEventV2
// } from "../types/interfaces.js";

describe("convertToSpasm() tests for events with parent and root events", () => {
  test("addEventsToTree() should add one comment to an event with a child without an event", () => {
    expect(addEventsToTree(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent),
      [
        copyOf(validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
        copyOf(validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
      ]
    )).toStrictEqual(
      copyOf(validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse),
    );
  });
});
