import { Request, Response } from "express";
import { buscarPrevisaoPorCidadeEData } from "../services/climaService";

export async function buscarClimaController(req: Request, res: Response) {
  try {
    const { cidade, data } = req.query;
    console.log("Parâmetros recebidos:", { cidade, data });

    if (!cidade || !data) {
      return res.status(400).json({
        erro: "Informe cidade e data (YYYY-MM-DD)",
      });
    }

    const resultado = await buscarPrevisaoPorCidadeEData({
      cidade: String(cidade),
      data: String(data),
    });

    console.log("Resultado da previsão:", resultado);

    return res.send(resultado);
  } catch (erro: any) {
    return res.status(500).json({
      erro: erro.message || "Erro interno",
    });
  }
}
