"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../utils/index");
const _events_data_1 = require("./_events-data");
beforeEach(() => {
    // Spy on console.log and console.error
    // jest.spyOn(console, 'log').mockImplementation(() => {});
    // jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
    // Restore original console.log and console.error after each test
    // jest.restoreAllMocks();
});
describe('convertNpubOrHexAddressToHex function', () => {
    it("should return a valid hex address when a valid npub is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressToHex)(_events_data_1.validNpubAddress1)).toBe(_events_data_1.validHexAddress1);
    });
    it("should return a valid hex address when a valid hex is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressToHex)(_events_data_1.validHexAddress1)).toBe(_events_data_1.validHexAddress1);
    });
    it("should return '' when a too long invalid npub is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressToHex)(_events_data_1.validNpubAddress1 + "1234")
        // convertNpubOrHexAddressToHex("hello")
        ).toBe('');
    });
    it("should return '' when an invalid npub with valid length is passed", () => {
        // Hiding console errors for invalid addresses during tests
        jest.spyOn(console, 'error').mockImplementation(() => { });
        expect((0, index_1.convertNpubOrHexAddressToHex)(_events_data_1.invalidNpubAddress1)).toBe('');
        jest.restoreAllMocks();
    });
    it("should return '' when an array of valid npub addresses is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressToHex)([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2])).toBe('');
    });
    it("should return '' when an object with a valid npub address is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressToHex)({ valid: _events_data_1.validHexAddress1 })).toBe('');
    });
});
describe('convertNpubOrHexAddressesToHex function', () => {
    it("should return an array with one valid hex if one valid npub is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressesToHex)(_events_data_1.validNpubAddress1)).toStrictEqual([_events_data_1.validHexAddress1]);
    });
    it("should return an array with one valid hex if one hex is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressesToHex)(_events_data_1.validHexAddress1)).toStrictEqual([_events_data_1.validHexAddress1]);
    });
    it("should return an array of valid hex if array of valid npubs is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressesToHex)([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2])).toStrictEqual([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2]);
    });
    it("should return an array of valid hex if array of valid hex is passed", () => {
        expect((0, index_1.convertNpubOrHexAddressesToHex)([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2])).toStrictEqual([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2]);
    });
    it("should return an array with a valid hex if an array of valid and invalid hex is passed", () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        expect((0, index_1.convertNpubOrHexAddressesToHex)([_events_data_1.validHexAddress1, _events_data_1.invalidNpubAddress1])).toStrictEqual([_events_data_1.validHexAddress1]);
        jest.restoreAllMocks();
    });
    it("should return an empty array if an array with two invalid hex is passed", () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        expect((0, index_1.convertNpubOrHexAddressesToHex)([_events_data_1.invalidNpubAddress1, _events_data_1.invalidNpubAddress2])).toStrictEqual([]);
        jest.restoreAllMocks();
    });
});
describe('convertHexOrNpubAddressToNpub function', () => {
    it("should return a valid npub address when a valid hex is passed", () => {
        expect((0, index_1.convertHexOrNpubAddressToNpub)(_events_data_1.validHexAddress1)).toBe(_events_data_1.validNpubAddress1);
        expect((0, index_1.toBeNpub)(_events_data_1.validHexAddress1)).toBe(_events_data_1.validNpubAddress1);
    });
    it("should return a valid npub address when a valid npub is passed", () => {
        expect((0, index_1.convertHexOrNpubAddressToNpub)(_events_data_1.validNpubAddress1)).toBe(_events_data_1.validNpubAddress1);
        expect((0, index_1.toBeNpub)(_events_data_1.validNpubAddress1)).toBe(_events_data_1.validNpubAddress1);
    });
    it("should return '' when a too long invalid npub is passed", () => {
        expect((0, index_1.convertHexOrNpubAddressToNpub)(_events_data_1.validNpubAddress1 + "1234")).toBe('');
    });
    it("should return '' when a too long invalid hex is passed", () => {
        expect((0, index_1.convertHexOrNpubAddressToNpub)(_events_data_1.validHexAddress1 + "1234")).toBe('');
    });
    // Looks like any invalid npub can be converted to npub
    // it(
    //   "should return '' when an invalid npub with valid length is passed",
    //   () => {
    //   expect(
    //     convertHexOrNpubAddressToNpub(invalidNpubAddress1)
    //   ).toBe(
    //   ''
    //   );
    // });
    // Looks like any invalid hex can be converted to npub
    // it(
    //   "should return '' when an invalid hex with valid length is passed",
    //   () => {
    //   expect(
    //     convertHexOrNpubAddressToNpub(invalidHexAddress1)
    //   ).toBe(
    //   ''
    //   );
    // });
    it("should return '' when an array of valid npub addresses is passed", () => {
        expect((0, index_1.convertHexOrNpubAddressToNpub)([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2])).toBe('');
    });
    it("should return '' when an object with a valid npub address is passed", () => {
        expect((0, index_1.convertHexOrNpubAddressToNpub)({ valid: _events_data_1.validHexAddress1 })).toBe('');
    });
});
describe('convertHexAddressesToNpub & toBeNpubs function', () => {
    it("should return an array with one valid npub if one valid hex is passed", () => {
        expect((0, index_1.convertHexAddressesToNpub)(_events_data_1.validHexAddress1)).toStrictEqual([_events_data_1.validNpubAddress1]);
        expect((0, index_1.toBeNpubs)(_events_data_1.validHexAddress1)).toStrictEqual([_events_data_1.validNpubAddress1]);
    });
    it("should return an array with one valid npub if one npub is passed", () => {
        expect((0, index_1.convertHexAddressesToNpub)(_events_data_1.validNpubAddress1)).toStrictEqual([_events_data_1.validNpubAddress1]);
        expect((0, index_1.toBeNpubs)(_events_data_1.validNpubAddress1)).toStrictEqual([_events_data_1.validNpubAddress1]);
    });
    it("should return an array of valid npub if array of valid hex is passed", () => {
        expect((0, index_1.convertHexAddressesToNpub)([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2])).toStrictEqual([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2]);
        expect((0, index_1.toBeNpubs)([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2])).toStrictEqual([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2]);
    });
    it("should return an array of valid npub if array of valid npub is passed", () => {
        expect((0, index_1.convertHexAddressesToNpub)([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2])).toStrictEqual([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2]);
        expect((0, index_1.toBeNpubs)([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2])).toStrictEqual([_events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2]);
    });
    // it(
    //   "should return an array with a valid npub if an array of valid and invalid hex is passed",
    //   () => {
    //   expect(
    //     convertHexAddressesToNpub([validHexAddress1, invalidHexAddress2])
    //   ).toStrictEqual(
    //     [validNpubAddress1]
    //   );
    // });
    it("should return an array with a valid npub if an array of valid and invalid hex is passed", () => {
        expect((0, index_1.convertHexAddressesToNpub)([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2 + "12345"])).toStrictEqual([_events_data_1.validNpubAddress1]);
        expect((0, index_1.toBeNpubs)([_events_data_1.validHexAddress1, _events_data_1.validHexAddress2 + "12345"])).toStrictEqual([_events_data_1.validNpubAddress1]);
    });
    // it(
    //   "should return an empty array if an array with two invalid hex is passed",
    //   () => {
    //   expect(
    //     convertHexAddressesToNpub([invalidHexAddress1, invalidHexAddress2])
    //   ).toStrictEqual(
    //     []
    //   );
    // });
    it("should return an empty array if an array with two invalid hex is passed", () => {
        expect((0, index_1.convertHexAddressesToNpub)([_events_data_1.validHexAddress1 + "abc", _events_data_1.validHexAddress2 + "12345"])).toStrictEqual([]);
        expect((0, index_1.toBeNpubs)([_events_data_1.validHexAddress1 + "abc", _events_data_1.validHexAddress2 + "12345"])).toStrictEqual([]);
    });
});
describe('toBeNote function', () => {
    it("should return a valid id-note if one valid id-hex is passed", () => {
        expect((0, index_1.toBeNote)(_events_data_1.validId1Hex)).toStrictEqual(_events_data_1.validId1Note);
        expect((0, index_1.toBeNote)(_events_data_1.validId2Hex)).toStrictEqual(_events_data_1.validId2Note);
        expect((0, index_1.toBeNote)(_events_data_1.validId1Note)).toStrictEqual(_events_data_1.validId1Note);
        expect((0, index_1.toBeNote)(_events_data_1.validId2Note)).toStrictEqual(_events_data_1.validId2Note);
        expect((0, index_1.toBeNote)(_events_data_1.validId1Nevent)).toStrictEqual(_events_data_1.validId1Note);
        expect((0, index_1.toBeNote)(_events_data_1.validId2Nevent)).toStrictEqual(_events_data_1.validId2Note);
    });
});
describe('toBeNotes function', () => {
    it("should return an array of valid notes if valid hexesand nevents and notes are passed", () => {
        expect((0, index_1.toBeNotes)([
            // Npubs will be removed
            _events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2, "123xyz",
            _events_data_1.validId1Hex, _events_data_1.validId1Note, _events_data_1.validId1Nevent,
            _events_data_1.validId2Hex, _events_data_1.validId2Note, _events_data_1.validId2Nevent
        ])).toStrictEqual([
            _events_data_1.validId1Note, _events_data_1.validId1Note, _events_data_1.validId1Note,
            _events_data_1.validId2Note, _events_data_1.validId2Note, _events_data_1.validId2Note
        ]);
    });
});
describe('toBeHex function', () => {
    it("should return a valid id-hex if one valid id-note is passed", () => {
        expect((0, index_1.toBeHex)(_events_data_1.validId1Note)).toStrictEqual(_events_data_1.validId1Hex);
        expect((0, index_1.toBeHex)(_events_data_1.validId2Note)).toStrictEqual(_events_data_1.validId2Hex);
    });
    it("should return a valid id-hex if one valid id-nevent is passed", () => {
        expect((0, index_1.toBeHex)(_events_data_1.validId1Nevent)).toStrictEqual(_events_data_1.validId1Hex);
        expect((0, index_1.toBeHex)(_events_data_1.validId2Nevent)).toStrictEqual(_events_data_1.validId2Hex);
    });
});
describe('toBeHexes function', () => {
    it("should return an array of valid hexes if valid notes and npubs and nevents are passed", () => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        expect((0, index_1.toBeHexes)([
            _events_data_1.validNpubAddress1, _events_data_1.validNpubAddress2,
            _events_data_1.validId1Hex, _events_data_1.validId1Note, _events_data_1.validId1Nevent,
            _events_data_1.validId2Hex, _events_data_1.validId2Note, _events_data_1.validId2Nevent,
            // Invalid ids will be removed
            _events_data_1.invalidId1Note, _events_data_1.invalidId2Note
        ])).toStrictEqual([
            _events_data_1.validHexAddress1, _events_data_1.validHexAddress2,
            _events_data_1.validId1Hex, _events_data_1.validId1Hex, _events_data_1.validId1Hex,
            _events_data_1.validId2Hex, _events_data_1.validId2Hex, _events_data_1.validId2Hex
        ]);
        jest.restoreAllMocks();
    });
});
//# sourceMappingURL=nostrUtils.test.js.map