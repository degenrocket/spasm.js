import { NostrEvent, NostrEventSignedOpened, NostrSpasmEvent, NostrSpasmEventSignedOpened, SpasmEventV2, UnknownEventV2 } from "../types/interfaces.js";
export declare const convertToNostr: (unknownEvent: UnknownEventV2, nostrSpasmVersion?: "2.0.0") => NostrEvent | NostrEventSignedOpened | NostrSpasmEvent | NostrSpasmEventSignedOpened | null;
export declare const convertSpasmEventV2ToNostrSpasmV2: (spasmEventV2: SpasmEventV2) => NostrEvent | NostrEventSignedOpened | NostrSpasmEvent | NostrSpasmEventSignedOpened | null;
//# sourceMappingURL=convertToNostr.d.ts.map