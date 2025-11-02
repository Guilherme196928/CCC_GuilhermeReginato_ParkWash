// backend/src/routes/lavagens.js
const express = require("express");
const router = express.Router();
const {
  criarLavagem,
  listarLavagens,
  cancelarLavagem, // ✅ agora está importado
} = require("../controllers/lavagensController");

// Criar nova lavagem
router.post("/", criarLavagem);

// Listar lavagens de um usuário
router.get("/:usuario_id", listarLavagens);

// Cancelar lavagem
router.delete("/:id", cancelarLavagem);

module.exports = router;
