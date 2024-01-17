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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
class HttpClient {
    get(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonFilePath = `../data/courses.json`;
                const res = yield fetch(resource);
                if (res.ok) {
                    const data = yield res.json();
                    return data;
                }
                else {
                    throw new Error(`Failed to fetch data: ${res.status} - ${res.statusText}`);
                }
            }
            catch (err) {
                if (err instanceof Error)
                    throw new Error(`Error fetching data: ${err.message}`);
                throw err;
            }
        });
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.js.map