import { UnknownEventV2, SpasmEventV2, SpasmEventDatabaseV2 } from "./../types/interfaces.js";
export declare const convertManyToSpasmEventDatabase: (unknownEvents: UnknownEventV2[], dbVersion?: string) => SpasmEventDatabaseV2[] | null;
export declare const convertToSpasmEventDatabase: (unknownEvent: UnknownEventV2, dbVersion?: string) => SpasmEventDatabaseV2 | null;
export declare const convertSpasmEventV2ToSpasmEventDatabaseV2: (spasmEvent: SpasmEventV2) => SpasmEventDatabaseV2 | null;
//# sourceMappingURL=convertToSpasmEventDatabase.d.ts.map