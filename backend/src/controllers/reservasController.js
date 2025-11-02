// backend/src/controllers/reservasController.js
const pool = require("../db");

// ==========================================================
// Criar nova reserva
// ==========================================================
const criarReserva = async (req, res) => {
  const { usuario_id, estacionamento, data_reserva, hora_entrada, hora_saida } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reservas (usuario_id, estacionamento, data_reserva, hora_entrada, hora_saida)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [usuario_id, estacionamento, data_reserva, hora_entrada, hora_saida]
    );

    res.status(201).json({
      message: "✅ Reserva criada com sucesso!",
      reserva: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ message: "Erro ao criar reserva." });
  }
};

// ==========================================================
// Listar reservas de um usuário
// ==========================================================
const listarReservas = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM reservas WHERE usuario_id = $1 ORDER BY data_reserva DESC",
      [usuario_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    res.status(500).json({ message: "Erro ao listar reservas." });
  }
};

// ==========================================================
// Cancelar reserva
// ==========================================================
const cancelarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    res.json({ message: "🗑️ Reserva cancelada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    res.status(500).json({ message: "Erro ao cancelar reserva." });
  }
};

module.exports = { criarReserva, listarReservas, cancelarReserva };
