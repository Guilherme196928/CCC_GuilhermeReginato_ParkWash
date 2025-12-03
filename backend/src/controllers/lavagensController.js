const pool = require("../db");
const { sendEmail } = require("../utils/emailService");

const criarLavagem = async (req, res) => {
  const { usuario_id, estacionamento, tipo, preco, data_lavagem, hora } = req.body;

  try {
    const [horaInicio, minutosInicio] = hora.split(":").map(Number);
    const horaDate = new Date(`${data_lavagem}T${hora}:00`);

    const resultExistente = await pool.query(
      `SELECT * FROM lavagens 
       WHERE data_lavagem = $1
       AND hora BETWEEN $2 AND $3`,
      [
        data_lavagem,
        `${horaInicio.toString().padStart(2,'0')}:00`,
        `${(horaInicio+1).toString().padStart(2,'0')}:00`
      ]
    );

    if (resultExistente.rows.length > 0) {
      return res.status(400).json({ message: "❌ Já existe uma lavagem agendada nesse horário. Escolha outro horário." });
    }


    const result = await pool.query(
      `INSERT INTO lavagens (usuario_id, estacionamento, tipo, preco, data_lavagem, hora)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [usuario_id, estacionamento, tipo, preco, data_lavagem, hora]
    );

    const lavagem = result.rows[0];


    const userResult = await pool.query(
      "SELECT nome, email FROM usuarios WHERE id = $1",
      [usuario_id]
    );

    if (userResult.rows.length > 0) {
      const { nome, email } = userResult.rows[0];


      await sendEmail(
        email,
        "📌 Lavagem Agendada",
        `
          <h2>Olá, ${nome}!</h2>
          <p>Sua lavagem foi agendada com sucesso.</p>

          <p><b>Tipo:</b> ${tipo}</p>
          <p><b>Estacionamento:</b> ${estacionamento}</p>
          <p><b>Preço:</b> R$ ${preco}</p>
          <p><b>Data:</b> ${data_lavagem}</p>
          <p><b>Horário:</b> ${hora}</p>

          <p>Obrigado por usar o ParkWash!</p>
        `
      );
    }

    res.status(201).json({
      message: "✅ Lavagem agendada com sucesso!",
      lavagem,
    });
  } catch (error) {
    console.error("❌ Erro ao criar lavagem:", error);
    res.status(500).json({ message: "❌ Erro ao agendar lavagem." });
  }
};



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


const listarTodasLavagens = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.*, 
        u.nome AS nome_usuario,
        u.email AS email_usuario
      FROM lavagens l
      LEFT JOIN usuarios u ON l.usuario_id = u.id
      ORDER BY data_lavagem DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao listar todas as lavagens:", error);
    res.status(500).json({ message: "Erro ao listar lavagens." });
  }
};


module.exports = { 
  criarLavagem, 
  listarLavagens, 
  listarTodasLavagens,    
  cancelarLavagem 
};

