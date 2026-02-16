import axios from "axios";
import { buscarCoordenadas } from "./getCoordenadasService";
import {
  ParametrosPrevisao,
  RespostaPrevisao,
  WeatherCodeInfo,
} from "../types/clima";

const weatherCodeMap: Record<number, { descricao: string; icone: string }> = {
  0: { descricao: "Céu limpo", icone: "☀️" },
  1: { descricao: "Predominantemente limpo", icone: "🌤️" },
  2: { descricao: "Parcialmente nublado", icone: "⛅" },
  3: { descricao: "Nublado", icone: "☁️" },
  45: { descricao: "Nevoeiro", icone: "🌫️" },
  48: { descricao: "Nevoeiro com geada", icone: "🌫️" },
  51: { descricao: "Chuvisco leve", icone: "🌦️" },
  53: { descricao: "Chuvisco moderado", icone: "🌦️" },
  55: { descricao: "Chuvisco intenso", icone: "🌦️" },
  56: { descricao: "Chuvisco congelante leve", icone: "🌧️" },
  57: { descricao: "Chuvisco congelante intenso", icone: "🌧️" },
  61: { descricao: "Chuva leve", icone: "🌧️" },
  63: { descricao: "Chuva moderada", icone: "🌧️" },
  65: { descricao: "Chuva forte", icone: "🌧️" },
  66: { descricao: "Chuva congelante leve", icone: "🌧️" },
  67: { descricao: "Chuva congelante forte", icone: "🌧️" },
  71: { descricao: "Neve leve", icone: "🌨️" },
  73: { descricao: "Neve moderada", icone: "🌨️" },
  75: { descricao: "Neve forte", icone: "🌨️" },
  77: { descricao: "Granizo fino", icone: "🌨️" },
  80: { descricao: "Pancadas de chuva leves", icone: "🌦️" },
  81: { descricao: "Pancadas de chuva moderadas", icone: "🌦️" },
  82: { descricao: "Pancadas de chuva violentas", icone: "🌦️" },
  85: { descricao: "Pancadas de neve leves", icone: "🌨️" },
  86: { descricao: "Pancadas de neve fortes", icone: "🌨️" },
  95: { descricao: "Trovoada", icone: "⛈️" },
  96: { descricao: "Trovoada com granizo leve", icone: "⛈️" },
  99: { descricao: "Trovoada com granizo forte", icone: "⛈️" },
};

function traduzirWeatherCode(codigo: number): WeatherCodeInfo {
  const info = weatherCodeMap[codigo] ?? {
    descricao: "Condição desconhecida",
    icone: "❓",
  };
  return { codigo, ...info };
}

export async function buscarPrevisaoPorCidadeEData({
  cidade,
  data,
}: ParametrosPrevisao): Promise<RespostaPrevisao> {
  const { latitude, longitude } = await buscarCoordenadas(cidade);

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&start_date=${data}` +
    `&end_date=${data}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code` +
    `&timezone=auto`;

  const resposta = await axios.get(url);
  const daily = resposta.data.daily;

  const clima = {
    temperature_2m_max: daily.temperature_2m_max[0],
    temperature_2m_min: daily.temperature_2m_min[0],
    precipitation_sum: daily.precipitation_sum[0],
    ...traduzirWeatherCode(daily.weather_code[0]),
  };

  const mensagem = `Previsão para ${cidade}:

🌡️ Máxima: ${clima.temperature_2m_max}°C
🌡️ Mínima: ${clima.temperature_2m_min}°C

🌧️ Chuva: ${clima.precipitation_sum} mm

${clima.descricao}
${clima.icone}`;

  return mensagem;
}
