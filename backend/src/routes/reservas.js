// backend/src/routes/reservas.js
const express = require("express");
const router = express.Router();
const {
  criarReserva,
  listarReservas,
  listarTodasReservas,  // ✅ adicionado
  cancelarReserva,
} = require("../controllers/reservasController");

// Criar nova reserva
router.post("/", criarReserva);

// Listar TODAS as reservas (Página do Funcionário)
router.get("/all", listarTodasReservas);  // ✅ nova rota

// Listar reservas de um usuário
router.get("/:usuario_id", listarReservas);

// Cancelar reserva
router.delete("/:id", cancelarReserva);

module.exports = router;
