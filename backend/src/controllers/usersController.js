const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  const { nome, email, telefone, senha } = req.body;

  try {
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Campos obrigatórios: nome, email e senha." });
    }

    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "E-mail já cadastrado!" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, telefone, senha, tipo) VALUES ($1, $2, $3, $4, 'cliente') RETURNING *",
      [nome, email, telefone || null, senhaHash]
    );

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: result.rows[0].id,
        nome: result.rows[0].nome,
        email: result.rows[0].email,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno ao cadastrar usuário." });
  }
};


const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
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


const loginFuncionario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

   
    if (user.tipo !== "funcionario") {
      return res.status(403).json({ error: "Acesso negado. Não é funcionário." });
    }


    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      "chave_secreta_super_segura",
      { expiresIn: "4h" }
    );

    res.json({
      message: "Login de funcionário realizado!",
      token,
      funcionario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo
      }
    });

  } catch (err) {
    console.error("Erro no login funcionário:", err);
    res.status(500).json({ error: "Erro interno" });
  }
};



module.exports = {
  registerUser,
  loginUser,
  loginFuncionario,
};
