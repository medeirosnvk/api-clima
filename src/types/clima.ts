export type ParametrosPrevisao = {
  cidade: string;
  data: string;
};

export type Coordenadas = {
  latitude: number;
  longitude: number;
};

export type WeatherCodeInfo = {
  codigo: number;
  descricao: string;
  icone: string;
};

export type ClimaDiario = {
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_sum: number;
  codigo: number;
  descricao: string;
  icone: string;
};

export type RespostaPrevisao = string;
