import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

// Serveur accessible de l'extérieur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Serveur lancé sur le port ${PORT}`);
});

const SERVER_URL = 'https://rouelment.onrender.com/ping'; // Ton vrai serveur Render
const SELF_URL = 'https://' + process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + '.repl.co/'; // Auto-ping

// Mini serveur pour Replit
app.get('/', (req, res) => {
  console.log(`[${new Date().toISOString()}] 🔔 Reçu un ping sur / de la part de ${req.ip}`);
  res.send('Ping bot is running');
});


app.listen(PORT, () => {
  console.log(`🌐 Mini serveur lancé sur le port ${PORT}`);
});

// Fonction ping Render
async function pingRender() {
  try {
    const res = await axios.get(SERVER_URL);
    console.log(`[${new Date().toISOString()}] ✅ Ping Render: ${res.status}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ Erreur ping Render:`, err.message);
  }
}

// Fonction ping Replit (self)
async function pingSelf() {
  try {
    const res = await axios.get(SELF_URL);
    console.log(`[${new Date().toISOString()}] 🔁 Auto-ping Replit OK - status: ${res.status}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ⚠️ Auto-ping Replit échoué:`, err.message);
  }
}


// Boucle de ping
async function loop() {
  await pingRender();
  await pingSelf();

  const delay = Math.floor(Math.random() * (7 - 2 + 1) + 2) * 60 * 1000;
  console.log(`🕒 Prochain ping dans ${(delay / 60000).toFixed(1)} minutes...\n`);
  setTimeout(loop, delay);
}

loop();
