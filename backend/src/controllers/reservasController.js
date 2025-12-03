const pool = require("../db");
const { sendEmail } = require("../utils/emailService");

const criarReserva = async (req, res) => {
  const { usuario_id, estacionamento, data_reserva, hora_entrada, hora_saida } = req.body;

  try {

    const entrada = new Date(`1970-01-01T${hora_entrada}:00`);
    const saida = new Date(`1970-01-01T${hora_saida}:00`);
    let diferencaHoras = (saida - entrada) / 1000 / 60 / 60; 
    if (diferencaHoras < 0) diferencaHoras += 24; 

    const preco = diferencaHoras * 5; 


    const result = await pool.query(
      `INSERT INTO reservas (usuario_id, estacionamento, data_reserva, hora_entrada, hora_saida, preco)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [usuario_id, estacionamento, data_reserva, hora_entrada, hora_saida, preco]
    );

    const reservaCriada = result.rows[0];


    const userResult = await pool.query(
      "SELECT nome, email FROM usuarios WHERE id = $1",
      [usuario_id]
    );
    const usuario = userResult.rows[0];


    const emailHtml = `
      <h2>Olá, ${usuario.nome}!</h2>
      <p>Sua reserva de vaga foi confirmada.</p>
      <p><b>Estacionamento:</b> ${estacionamento}</p>
      <p><b>Data:</b> ${data_reserva}</p>
      <p><b>Entrada:</b> ${hora_entrada}</p>
      <p><b>Saída:</b> ${hora_saida}</p>
      <p><b>Preço:</b> R$ ${preco.toFixed(2)}</p>
      <p>Obrigado por usar o ParkWash!</p>
    `;

    await sendEmail(usuario.email, "📌 Reserva de Vaga Confirmada", emailHtml);

    res.status(201).json({
      message: "✅ Reserva criada com sucesso!",
      reserva: reservaCriada,
    });
  } catch (error) {
    console.error("❌ Erro ao criar reserva:", error);
    res.status(500).json({ message: "❌ Erro ao criar reserva." });
  }
};


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


const cancelarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    res.json({ message: "Reserva cancelada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cancelar reserva:", error);
    res.status(500).json({ message: "Erro ao cancelar reserva." });
  }
};


const listarTodasReservas = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, u.nome AS nome_usuario, u.email AS email_usuario
       FROM reservas r
       JOIN usuarios u ON r.usuario_id = u.id
       ORDER BY r.data_reserva DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar todas as reservas:", error);
    res.status(500).json({ message: "Erro ao listar todas as reservas." });
  }
};




module.exports = { 
  criarReserva, 
  listarReservas, 
  listarTodasReservas,   
  cancelarReserva 
};

