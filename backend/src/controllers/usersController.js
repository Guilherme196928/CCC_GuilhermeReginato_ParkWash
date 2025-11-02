
const pool = require("../db");          
const bcrypt = require("bcrypt");       
const jwt = require("jsonwebtoken");   

const registerUser = async (req, res) => {
  const { nome, email, telefone, senha } = req.body;

  try {
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    const senhaHash = await bcrypt.hash(senha || "123456", 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, telefone, senha) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, telefone, senhaHash]
    );

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro ao cadastrar usuário." });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "chave_secreta_super_segura", 
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro ao efetuar login:", error);
    res.status(500).json({ message: "Erro ao efetuar login." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
