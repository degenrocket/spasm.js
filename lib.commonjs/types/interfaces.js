"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnoreWhitelistFor = void 0;
class IgnoreWhitelistFor {
    action;
    constructor() {
        this.action = {
            post: false,
            reply: false,
            react: false,
            moderate: false
        };
    }
}
exports.IgnoreWhitelistFor = IgnoreWhitelistFor;
// Ideas:
// - Short names? SE2 SE2Body SE2Envelope SE2EnvelopeWithTree
//# sourceMappingURL=interfaces.js.map