"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const climaController_1 = require("../controllers/climaController");
const router = (0, express_1.Router)();
router.get("/buscar-previsao", climaController_1.buscarClimaController);
exports.default = router;
//# sourceMappingURL=climaRoute.js.map