"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkServer = checkServer;
const os_1 = __importDefault(require("os"));
const axios_1 = __importDefault(require("axios"));
function getHardwareInfo() {
    return {
        hostname: os_1.default.hostname(),
        platform: os_1.default.platform(),
        arch: os_1.default.arch(),
        cpus: os_1.default.cpus().length,
        totalmem: os_1.default.totalmem(),
        freemem: os_1.default.freemem(),
        uptime: os_1.default.uptime(),
    };
}
function checkServer(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hardwareInfo = getHardwareInfo();
            const response = yield axios_1.default.post(apiUrl, hardwareInfo);
            if (!response.data.status) {
                console.error("Unauthorized server. Shutting down.");
                process.exit(1); // 💀 This kills the server
            }
            else {
                console.log("Server validation successful.");
            }
        }
        catch (error) {
            console.error("Server validation failed. Shutting down.");
            console.error(error);
            process.exit(1);
        }
    });
}
