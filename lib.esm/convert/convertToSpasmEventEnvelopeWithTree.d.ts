import { SpasmEventEnvelopeWithTreeV2, SpasmEventV2, UnknownEventV2 } from "../types/interfaces.js";
export declare const convertManyToSpasmEventEnvelopeWithTree: (unknownEvents: UnknownEventV2[], envelopeVersion?: string) => SpasmEventEnvelopeWithTreeV2[] | null;
export declare const convertToSpasmEventEnvelopeWithTree: (unknownEvent: UnknownEventV2, envelopeVersion?: string, depth?: number, maxDepth?: number) => SpasmEventEnvelopeWithTreeV2 | null;
export declare const convertSpasmEventV2ToSpasmEventEnvelopeWithTreeV2: (spasmEvent: SpasmEventV2, envelopeVersion?: string, depth?: number, maxDepth?: number) => SpasmEventEnvelopeWithTreeV2 | null;
//# sourceMappingURL=convertToSpasmEventEnvelopeWithTree.d.ts.map