"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarCoordenadas = buscarCoordenadas;
const axios_1 = __importDefault(require("axios"));
async function buscarCoordenadas(cidade) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1`;
    const resposta = await axios_1.default.get(url);
    if (!resposta.data.results?.length) {
        throw new Error("Cidade não encontrada");
    }
    const localizacao = resposta.data.results[0];
    return {
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
    };
}
//# sourceMappingURL=getCoordenadasService.js.map