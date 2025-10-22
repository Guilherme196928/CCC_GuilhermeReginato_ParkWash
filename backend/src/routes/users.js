import express from "express";
import { registerUser } from "../controllers/usersController.js";

const router = express.Router();

// Rota de cadastro de usuário
router.post("/register", registerUser);

// Exporta as rotas
export default router;
