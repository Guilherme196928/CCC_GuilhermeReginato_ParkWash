// backend/src/routes/reservas.js
const express = require("express");
const router = express.Router();
const {
  criarReserva,
  listarReservas,
  cancelarReserva, // ✅ adicionado aqui
} = require("../controllers/reservasController");

// Criar nova reserva
router.post("/", criarReserva);

// Listar reservas de um usuário
router.get("/:usuario_id", listarReservas);

// Cancelar reserva
router.delete("/:id", cancelarReserva);

module.exports = router;
