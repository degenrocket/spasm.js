"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _events_data_js_1 = require("./_events-data.js");
const utils_js_1 = require("../utils/utils.js");
// import {convertToSpasm} from "../convert/convertToSpasm.js";
// import {
//   SpasmEventV2
// } from "../types/interfaces.js";
describe("convertToSpasm() tests for events with parent and root events", () => {
    test("mergeSpasmEventsV2() should merge events with children", () => {
        // const event1WithoutChildren = validDmpEventSignedClosedConvertedToSpasmV2
        const event1WithOneChild = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmNostrChild;
        const event1WithAnotherChild = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChild;
        const event1WithBothChildren = _events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildren;
        // const test = mergeSpasmEventsV2([
        //   copyOf(event1WithOneChild),
        //   copyOf(event1WithAnotherChild)
        // ])
        // console.log("test:", test)
        // console.log("test.children:", test.children)
        expect((0, utils_js_1.mergeSpasmEventsV2)([
            (0, utils_js_1.copyOf)(event1WithOneChild),
            (0, utils_js_1.copyOf)(event1WithAnotherChild)
        ])).toStrictEqual((0, utils_js_1.copyOf)(event1WithBothChildren));
        // ])).not.toEqual(copyOf(event1WithBothChildren));
    });
});
//# sourceMappingURL=_dev.test.js.map