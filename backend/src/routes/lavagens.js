const express = require("express");
const router = express.Router();
const {
  criarLavagem,
  listarLavagens,
  listarTodasLavagens,  
  cancelarLavagem,
} = require("../controllers/lavagensController");


router.post("/", criarLavagem);


router.get("/all", listarTodasLavagens);


router.get("/:usuario_id", listarLavagens);



router.delete("/:id", cancelarLavagem);

module.exports = router;
