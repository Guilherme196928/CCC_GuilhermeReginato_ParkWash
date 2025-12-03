const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  loginFuncionario
} = require("../controllers/usersController");


router.post("/register", registerUser);


router.post("/login", loginUser);


router.post("/loginFuncionario", loginFuncionario);

module.exports = router;
