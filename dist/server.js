"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const climaRoute_1 = __importDefault(require("./routes/climaRoute"));
const PORTA = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/status", (req, res) => {
    res.status(200).send("API de clima está funcionando corretamente!");
});
app.use("/api", climaRoute_1.default);
app.listen(PORTA, () => {
    console.log(`API de clima rodando na porta ${PORTA}`);
});
//# sourceMappingURL=server.js.map