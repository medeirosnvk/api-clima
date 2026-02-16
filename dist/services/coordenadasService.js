"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = getCoordinates;
const axios_1 = __importDefault(require("axios"));
async function getCoordinates(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const response = await axios_1.default.get(url);
    if (!response.data.results?.length) {
        throw new Error("Cidade não encontrada");
    }
    const location = response.data.results[0];
    return {
        latitude: location.latitude,
        longitude: location.longitude,
    };
}
//# sourceMappingURL=coordenadasService.js.map