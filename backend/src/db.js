const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "parkwash",
  password: process.env.PGPASSWORD || "123456",
  port: process.env.PGPORT || 5432,
});

pool
  .connect()
  .then(() => {
    console.log("✅ Conectado ao banco PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao banco:", err.message);
  });

module.exports = pool;
