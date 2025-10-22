import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import usersRoutes from "./routes/users.js"; 

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("🚗 ParkWash API rodando...");
});

app.use("/api/users", usersRoutes);

app.get("/api/dbstatus", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "✅ Banco conectado", time: result.rows[0].now });
  } catch (err) {
    console.error("Erro de conexão com o banco:", err);
    res.status(500).json({ status: "❌ Erro ao conectar ao banco" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
