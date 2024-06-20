import {
  validDmpEventConvertedToSpasmEventV2,
  validDmpEventSignedOpenedConvertedToSpasmV2,
  validDmpEventSignedClosedConvertedToSpasmV2,
  SpasmEventV2ToTestSpasmid01,
  SpasmEventV2ConvertedToSpasmid01
} from "./_events-data"

import {
  convertSpasmEventV2ToEventForSpasmid01, convertToEventForSpasmid
} from "./../convert/convertToEventForSpasmid"

// template
describe("convertToEventForSpasmid() template tests", () => {
  test("should return true if true", () => {
    expect(true).toStrictEqual(true);
  });
});

// convertToEventForSpasmid()
describe("convertToEventForSpasmid() tests", () => {
  test("should return EventForSpasmid01", () => {
    const input = SpasmEventV2ToTestSpasmid01;
    const output = SpasmEventV2ConvertedToSpasmid01;
    expect(convertToEventForSpasmid(input)).toStrictEqual(output);
  });

  test("Signed and unsigned Dmp events should not be converted to the same EventForSpasmid() because unsigned Dmp events lack authors (signers)", () => {
    const input = validDmpEventConvertedToSpasmEventV2;
    const output = validDmpEventSignedClosedConvertedToSpasmV2;
    expect(convertToEventForSpasmid(input)).not.toStrictEqual(convertToEventForSpasmid(output));
  });

  test("Signed closed and opened Dmp events should be converted to the same EventForSpasmid()", () => {
    const input = validDmpEventSignedOpenedConvertedToSpasmV2;
    const output = validDmpEventSignedClosedConvertedToSpasmV2;
    expect(convertToEventForSpasmid(input)).toStrictEqual(convertToEventForSpasmid(output));
  });
});

