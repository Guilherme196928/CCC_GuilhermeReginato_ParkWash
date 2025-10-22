import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js"; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚗 ParkWash API rodando...");
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar usuários");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
