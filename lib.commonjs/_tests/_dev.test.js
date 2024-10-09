"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _events_data_js_1 = require("./_events-data.js");
const utils_js_1 = require("../utils/utils.js");
// import {convertToSpasm} from "../convert/convertToSpasm.js";
// import {
//   SpasmEventV2
// } from "../types/interfaces.js";
describe("convertToSpasm() tests for events with parent and root events", () => {
    test("addEventsToTree() should add one comment to an event with a child without an event", () => {
        expect((0, utils_js_1.addEventsToTree)((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithSpasmDmpChildWithoutEvent), [
            (0, utils_js_1.copyOf)(_events_data_js_1.validPostWithNostrReplyToDmpEventConvertedToSpasmV2),
            (0, utils_js_1.copyOf)(_events_data_js_1.validSpasmWithDmpReplyToDmpEventV0ConvertedToSpasmEventV2)
        ])).toStrictEqual((0, utils_js_1.copyOf)(_events_data_js_1.validDmpEventSignedClosedConvertedToSpasmV2WithTwoChildrenReverse));
    });
});
//# sourceMappingURL=_dev.test.js.map