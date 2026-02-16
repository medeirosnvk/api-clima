# API Clima

API REST para consulta de previsao do tempo por cidade e data, utilizando a [Open-Meteo API](https://open-meteo.com/).

## Tecnologias

- Node.js + TypeScript
- Express 5
- Axios
- [Open-Meteo API](https://open-meteo.com/) (previsao do tempo e geocoding)

## Pre-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm

## Instalacao

```bash
npm install
```

## Executando

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build + producao
npm run build
npm start
```

O servidor inicia na porta **3000** por padrao.

## Endpoints

### Health Check

```
GET /status
```

Retorna `200` com a mensagem:

```
API de clima está funcionando corretamente!
```

---

### Buscar Previsao do Tempo

```
GET /api/buscar-previsao?cidade={cidade}&data={data}
```

#### Query Parameters

| Parametro | Tipo   | Obrigatorio | Descricao                    |
| --------- | ------ | ----------- | ---------------------------- |
| `cidade`  | string | Sim         | Nome da cidade               |
| `data`    | string | Sim         | Data no formato `YYYY-MM-DD` |

#### Exemplo de Requisicao

```
GET /api/buscar-previsao?cidade=São Paulo&data=2026-02-16
```

#### Exemplo de Resposta (200)

```
Previsão para São Paulo:

🌡️ Máxima: 30.5°C
🌡️ Mínima: 20.1°C

🌧️ Chuva: 2.3 mm

Parcialmente nublado
⛅
```

#### Erros

| Status | Corpo                                              |
| ------ | -------------------------------------------------- |
| `400`  | `{ "erro": "Informe cidade e data (YYYY-MM-DD)" }`|
| `500`  | `{ "erro": "<mensagem do erro>" }`                 |

## Testando a API

### curl

```bash
# Health check
curl http://localhost:3000/status

# Buscar previsao
curl "http://localhost:3000/api/buscar-previsao?cidade=Porto%20Alegre&data=2026-02-16"
```

### REST Client (VS Code)

O projeto inclui o arquivo `src/routes/.http` com requisicoes prontas para uso com a extensao [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do VS Code.

1. Instale a extensao **REST Client** no VS Code
2. Inicie o servidor com `npm run dev`
3. Abra o arquivo `src/routes/.http`
4. Clique em **Send Request** acima da requisicao desejada

## Expondo a API com ngrok

O [ngrok](https://ngrok.com/) permite expor a API local para a internet, util para testes externos, integracoes com webhooks ou compartilhar com outras pessoas.

### Instalacao do ngrok

```bash
# macOS (Homebrew)
brew install ngrok

# ou via npm
npm install -g ngrok
```

Apos instalar, autentique-se com seu token (disponivel em [dashboard.ngrok.com](https://dashboard.ngrok.com/)):

```bash
ngrok config add-authtoken SEU_TOKEN_AQUI
```

### Uso

1. Inicie a API normalmente:

```bash
npm run dev
```

2. Em outro terminal, inicie o tunel ngrok apontando para a porta da API:

```bash
ngrok http 3000
```

3. O ngrok exibira uma URL publica como:

```
Forwarding  https://abcd1234.ngrok-free.app -> http://localhost:3000
```

4. Use essa URL para acessar a API externamente:

```bash
curl "https://abcd1234.ngrok-free.app/api/buscar-previsao?cidade=São Paulo&data=2026-02-16"
```

> **Nota:** A URL gerada pelo ngrok muda a cada execucao no plano gratuito. Para URLs fixas, utilize um dominio personalizado no plano pago.

## Estrutura do Projeto

```
src/
├── server.ts                        # Entrada da aplicacao
├── types/
│   └── clima.ts                     # Tipos TypeScript
├── routes/
│   ├── climaRoute.ts                # Definicao das rotas
│   └── .http                        # Requisicoes para REST Client
├── controllers/
│   └── climaController.ts           # Validacao e orquestracao
└── services/
    ├── climaService.ts              # Consulta previsao na Open-Meteo
    └── getCoordenadasService.ts     # Geocoding (cidade -> coordenadas)
```

## Scripts

| Comando         | Descricao                              |
| --------------- | -------------------------------------- |
| `npm run dev`   | Inicia em modo desenvolvimento         |
| `npm run build` | Compila TypeScript para JavaScript     |
| `npm start`     | Executa a versao compilada (producao)  |
