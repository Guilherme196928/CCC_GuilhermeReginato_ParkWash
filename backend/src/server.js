// backend/src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");

const userRoutes = require("./routes/users");
const reservasRoutes = require("./routes/reservas");
const lavagensRoutes = require("./routes/lavagens");

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // 👈 Permite o front acessar
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/reservas", reservasRoutes);
app.use("/api/lavagens", lavagensRoutes);

// Teste simples
app.get("/", (req, res) => {
  res.send("🚗 ParkWash API rodando com sucesso!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Conectado ao banco PostgreSQL");
    console.log(`✅ Servidor rodando na porta ${PORT}`);
  } catch (err) {
    console.error("❌ Erro ao conectar ao banco:", err.message);
  }
});
