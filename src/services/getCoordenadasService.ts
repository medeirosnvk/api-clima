import axios from "axios";
import { Coordenadas } from "../types/clima";

export async function buscarCoordenadas(cidade: string): Promise<Coordenadas> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1`;

  const resposta = await axios.get(url);

  if (!resposta.data.results?.length) {
    throw new Error("Cidade não encontrada");
  }

  const localizacao = resposta.data.results[0];

  return {
    latitude: localizacao.latitude,
    longitude: localizacao.longitude,
  };
}
