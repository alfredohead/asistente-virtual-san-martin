const express = require("express");
const cors = require("cors");
const { Telegraf } = require("telegraf");
const app = express();

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.API_KEY;
const bot = new Telegraf(BOT_TOKEN);

const FIREBASE_CONFIG = process.env.FIREBASE_JSON_BASE64;

let firebaseData;
try {
  const decoded = Buffer.from(FIREBASE_CONFIG, "base64").toString("utf8");
  firebaseData = JSON.parse(decoded);
} catch (error) {
  console.error("❌ Error parsing FIREBASE_JSON_BASE64:", error.message);
  process.exit(1); // ❗ termina el proceso si la config no es válida
}

// Aquí podrías inicializar Firebase con `firebaseData` si lo necesitas.

app.get("/", (req, res) => {
  res.send("🟢 Backend activo en Fly.io!");
});

const PORT = process.env.PORT || 3000;
// 👇 Esto es CRÍTICO: escuchar en 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor escuchando en http://0.0.0.0:${PORT}`);
});

