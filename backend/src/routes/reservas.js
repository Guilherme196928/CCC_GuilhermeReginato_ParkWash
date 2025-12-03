const express = require("express");
const router = express.Router();
const {
  criarReserva,
  listarReservas,
  listarTodasReservas,  
  cancelarReserva,
} = require("../controllers/reservasController");


router.post("/", criarReserva);


router.get("/all", listarTodasReservas);  

router.get("/:usuario_id", listarReservas);


router.delete("/:id", cancelarReserva);

module.exports = router;
