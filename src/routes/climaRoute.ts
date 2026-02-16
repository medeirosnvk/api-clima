import { Router } from "express";
import { buscarClimaController } from "../controllers/climaController";

const router = Router();

router.get("/buscar-previsao", buscarClimaController);

export default router;
