// backend/src/routes/lavagens.js
const express = require("express");
const router = express.Router();
const {
  criarLavagem,
  listarLavagens,
  listarTodasLavagens,  // <-- adicionar
  cancelarLavagem,
} = require("../controllers/lavagensController");

// Criar nova lavagem
router.post("/", criarLavagem);

// Listar TODAS as lavagens (funcionário)
router.get("/all", listarTodasLavagens);

// Listar lavagens de um usuário
router.get("/:usuario_id", listarLavagens);


// Cancelar lavagem
router.delete("/:id", cancelarLavagem);

module.exports = router;
