"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyObject = exports.convertToSpasm = void 0;
var index_js_1 = require("./convert/index.js");
Object.defineProperty(exports, "convertToSpasm", { enumerable: true, get: function () { return index_js_1.convertToSpasm; } });
var index_js_2 = require("./identify/index.js");
Object.defineProperty(exports, "identifyObject", { enumerable: true, get: function () { return index_js_2.identifyObject; } });
__exportStar(require("./utils/index.js"), exports);
//# sourceMappingURL=spasm.js.map