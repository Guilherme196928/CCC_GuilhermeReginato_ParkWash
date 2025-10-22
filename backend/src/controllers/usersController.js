import pool from "../db.js";

// Função para registrar um novo usuário
export const registerUser = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;

    // validação simples
    if (!nome || !email) {
      return res.status(400).json({ message: "Nome e e-mail são obrigatórios" });
    }

    // verifica se o email já existe
    const checkUser = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    // insere no banco
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, telefone]
    );

    res.status(201).json({ message: "Usuário cadastrado com sucesso", user: result.rows[0] });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
