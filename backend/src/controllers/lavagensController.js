// backend/src/controllers/lavagensController.js
const pool = require("../db");

// ==========================================================
// Criar nova lavagem
// ==========================================================
const criarLavagem = async (req, res) => {
  const { usuario_id, estacionamento, tipo, preco, data_lavagem, hora } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO lavagens (usuario_id, estacionamento, tipo, preco, data_lavagem, hora)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [usuario_id, estacionamento, tipo, preco, data_lavagem, hora]
    );

    res.status(201).json({
      message: "✅ Lavagem agendada com sucesso!",
      lavagem: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar lavagem:", error);
    res.status(500).json({ message: "Erro ao agendar lavagem." });
  }
};

// ==========================================================
// Listar lavagens de um usuário
// ==========================================================
const listarLavagens = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM lavagens WHERE usuario_id = $1 ORDER BY data_lavagem DESC",
      [usuario_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar lavagens:", error);
    res.status(500).json({ message: "Erro ao listar lavagens." });
  }
};

// ==========================================================
// Cancelar lavagem
// ==========================================================
const cancelarLavagem = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM lavagens WHERE id = $1", [id]);
    res.json({ message: "🗑️ Lavagem cancelada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cancelar lavagem:", error);
    res.status(500).json({ message: "Erro ao cancelar lavagem." });
  }
};

module.exports = { criarLavagem, listarLavagens, cancelarLavagem };
