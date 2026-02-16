import express from "express";
import rotas from "./routes/climaRoute";

const PORTA = 3000;

const app = express();

app.use(express.json());

app.use("/status", (req, res) => {
  res.status(200).send("API de clima está funcionando corretamente!");
});

app.use("/api", rotas);

app.listen(PORTA, () => {
  console.log(`API de clima rodando na porta ${PORTA}`);
});
