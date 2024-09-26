import { SpasmEventEnvelopeV2, SpasmEventV2, UnknownEventV2 } from "../types/interfaces.js";
export declare const convertManyToSpasmEventEnvelope: (unknownEvents: UnknownEventV2[], envelopeVersion?: string) => SpasmEventEnvelopeV2[] | null;
export declare const convertToSpasmEventEnvelope: (unknownEvent: UnknownEventV2, envelopeVersion?: string) => SpasmEventEnvelopeV2 | null;
export declare const convertSpasmEventV2ToSpasmEventEnvelopeV2: (spasmEvent: SpasmEventV2) => SpasmEventEnvelopeV2 | null;
//# sourceMappingURL=convertToSpasmEventEnvelope.d.ts.map