import { sanitizeStringWithDompurify } from "./../utils/utils.js";
export class IgnoreWhitelistFor {
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
export class ConvertToSpasmConfig {
    to;
    from;
    signature;
    xss;
    constructor() {
        this.to = {
            spasm: {
                version: "2.0.0",
                type: "SpasmEventV2",
                id: {
                    versions: ["01"]
                }
            }
        };
        this.from = {
            spasm: { enableEventVerification: true },
            dmp: { enableEventVerification: true },
            nostr: { enableEventVerification: true }
        };
        this.signature = {
            ethereum: { enableVerification: true },
            nostr: { enableVerification: true }
        };
        this.xss = {
            enableSanitization: true,
            sanitizationConfig: new SanitizationConfig()
        };
        this.xss.sanitizationConfig = new SanitizationConfig();
    }
}
export class SanitizationConfig {
    customFunction;
    valueType;
    maxDepth;
    constructor() {
        this.customFunction = sanitizeStringWithDompurify;
        this.valueType = "string",
            this.maxDepth = 100;
    }
}
// export type PartialConvertToSpasmConfig =
//   Partial<Omit<ConvertToSpasmConfig, 'sanitizationConfig'>> &
//   { sanitizationConfig?: Partial<SanitizationConfig> };
//
// export type PartialSanitizationConfig = Partial<SanitizationConfig>;
// Ideas:
// - Short names? SE2 SE2Body SE2Envelope SE2EnvelopeWithTree
//# sourceMappingURL=interfaces.js.map