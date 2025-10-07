import { pool } from "../db.js";

// Listar usuários
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// Criar novo usuário
export const createUser = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
