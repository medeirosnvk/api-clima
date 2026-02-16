"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarClimaController = buscarClimaController;
const climaService_1 = require("../services/climaService");
async function buscarClimaController(req, res) {
    try {
        const { cidade, data } = req.query;
        console.log("Parâmetros recebidos:", { cidade, data });
        if (!cidade || !data) {
            return res.status(400).json({
                erro: "Informe cidade e data (YYYY-MM-DD)",
            });
        }
        const resultado = await (0, climaService_1.buscarPrevisaoPorCidadeEData)({
            cidade: String(cidade),
            data: String(data),
        });
        console.log("Resultado da previsão:", resultado);
        return res.json(resultado);
    }
    catch (erro) {
        return res.status(500).json({
            erro: erro.message || "Erro interno",
        });
    }
}
//# sourceMappingURL=climaController.js.map